"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/lib/data";

interface Contribution {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsData {
    total: Record<string, number>;
    contributions: Contribution[];
}

interface GitHubUser {
    public_repos: number;
    followers: number;
    following: number;
}

const GITHUB_USERNAME = SITE_CONFIG.socials.github.split("/").pop() ?? "PradipaJavierFatah";

const LEVEL_CLASSES: Record<number, string> = {
    0: "bg-border/80",
    1: "bg-lime-200 dark:bg-lime-900/80",
    2: "bg-lime-400 dark:bg-lime-700",
    3: "bg-lime-500",
    4: "bg-primary",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildWeekGrid(contributions: Contribution[], year: number, isCurrentYear: boolean): Contribution[][] {
    const map = new Map(contributions.map((c) => [c.date, c]));
    const weeks: Contribution[][] = [];

    if (isCurrentYear) {
        // Rolling 52 weeks up to today
        const now = new Date();
        const startSunday = new Date(now);
        startSunday.setDate(now.getDate() - now.getDay() - 52 * 7);
        const cursor = new Date(startSunday);
        for (let week = 0; week < 53; week++) {
            const days: Contribution[] = [];
            for (let day = 0; day < 7; day++) {
                const dateStr = formatDate(cursor);
                days.push(map.get(dateStr) ?? { date: dateStr, count: 0, level: 0 });
                cursor.setDate(cursor.getDate() + 1);
            }
            weeks.push(days);
        }
    } else {
        // Full calendar year: Jan 1 → Dec 31
        const jan1 = new Date(year, 0, 1);
        const dec31 = new Date(year, 11, 31);
        // Start from the Sunday on or before Jan 1
        const startSunday = new Date(jan1);
        startSunday.setDate(jan1.getDate() - jan1.getDay());
        const cursor = new Date(startSunday);
        while (cursor <= dec31) {
            const days: Contribution[] = [];
            for (let day = 0; day < 7; day++) {
                const dateStr = formatDate(cursor);
                const inYear = cursor.getFullYear() === year;
                days.push(
                    inYear
                        ? (map.get(dateStr) ?? { date: dateStr, count: 0, level: 0 })
                        : { date: "", count: 0, level: 0 }
                );
                cursor.setDate(cursor.getDate() + 1);
            }
            weeks.push(days);
        }
    }

    return weeks;
}

function getMonthLabels(weeks: Contribution[][]) {
    const labels: Array<{ label: string; col: number }> = [];
    let lastMonth = -1;
    weeks.forEach((week, col) => {
        const firstWithDate = week.find((d) => d.date !== "");
        if (!firstWithDate) return;
        const month = new Date(firstWithDate.date).getMonth();
        if (month !== lastMonth) {
            labels.push({ label: MONTHS[month], col });
            lastMonth = month;
        }
    });
    return labels;
}

function formatContribDate(dateStr: string): string {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

interface TooltipState {
    x: number;
    y: number;
    text: string;
}

export function GitHubContributions() {
    const [contribData, setContribData] = useState<ContributionsData | null>(null);
    const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const [contribRes, userRes] = await Promise.all([
                    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                ]);
                if (contribRes.ok) {
                    const data: ContributionsData = await contribRes.json();
                    setContribData(data);
                    // Default to the most recent year with contributions
                    const years = Object.keys(data.total).map(Number).sort((a, b) => b - a);
                    if (years.length > 0) setSelectedYear(years[0]);
                }
                if (userRes.ok) setGithubUser(await userRes.json());
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const currentYear = new Date().getFullYear();
    const isCurrentYear = selectedYear === currentYear;
    const availableYears = contribData
        ? Object.keys(contribData.total).map(Number).sort((a, b) => b - a)
        : [];
    const totalForYear = contribData?.total?.[selectedYear] ?? 0;
    const weeks = contribData
        ? buildWeekGrid(contribData.contributions, selectedYear, isCurrentYear)
        : [];
    const monthLabels = weeks.length > 0 ? getMonthLabels(weeks) : [];

    return (
        <section className="container py-12 md:py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-base tracking-tight">GitHub Activity</span>
                        <Link
                            href={SITE_CONFIG.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                            @{GITHUB_USERNAME} ↗
                        </Link>
                    </div>
                    {!isLoading && contribData && (
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-bold text-primary tabular-nums leading-none">
                                {totalForYear.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                contributions in {selectedYear}
                            </span>
                        </div>
                    )}
                </div>

                {/* Stats + year selector row */}
                <div className="flex items-center justify-between mb-5">
                    {isLoading ? (
                        <div className="h-4 w-44 bg-muted rounded animate-pulse" />
                    ) : githubUser ? (
                        <div className="flex gap-5 text-sm">
                            <span>
                                <strong className="font-semibold tabular-nums">{githubUser.public_repos}</strong>
                                <span className="text-muted-foreground ml-1">repos</span>
                            </span>
                            <span>
                                <strong className="font-semibold tabular-nums">{githubUser.followers}</strong>
                                <span className="text-muted-foreground ml-1">followers</span>
                            </span>
                            <span>
                                <strong className="font-semibold tabular-nums">{githubUser.following}</strong>
                                <span className="text-muted-foreground ml-1">following</span>
                            </span>
                        </div>
                    ) : (
                        <div />
                    )}

                    {/* Year selector */}
                    {!isLoading && availableYears.length > 1 && (
                        <div className="flex items-center gap-1">
                            {availableYears.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                                        selectedYear === year
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Heatmap */}
                <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-5">
                    {isLoading ? (
                        <div className="animate-pulse">
                            <div className="h-2 w-28 bg-muted rounded mb-3" />
                            <div className="flex gap-[3px]">
                                {Array.from({ length: 53 }).map((_, wi) => (
                                    <div key={wi} className="flex-1 flex flex-col gap-[3px]">
                                        {Array.from({ length: 7 }).map((_, di) => (
                                            <div key={di} className="w-full aspect-square rounded-[2px] bg-muted" />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : weeks.length > 0 ? (
                        <motion.div
                            key={selectedYear}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-x-auto"
                        >
                            <div className="flex flex-col min-w-[560px]">
                                {/* Month labels */}
                                <div className="flex mb-[4px] pl-[26px]">
                                    {weeks.map((_, wi) => {
                                        const found = monthLabels.find((m) => m.col === wi);
                                        return (
                                            <div key={wi} className="flex-1 text-[9px] text-muted-foreground leading-none min-w-0 truncate">
                                                {found?.label ?? ""}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Grid */}
                                <div className="flex">
                                    {/* Day labels */}
                                    <div className="flex flex-col gap-[3px] pr-1 pt-px w-[26px] flex-shrink-0">
                                        {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                                            <div key={i} className="flex-1 min-h-[10px] text-[9px] text-muted-foreground flex items-center">
                                                {label}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Week columns */}
                                    <div className="flex flex-1 gap-[3px]">
                                        {weeks.map((week, wi) => (
                                            <div key={wi} className="flex-1 flex flex-col gap-[3px]">
                                                {week.map((day, di) => (
                                                    <div
                                                        key={di}
                                                        className={`w-full aspect-square rounded-[2px] transition-transform duration-100 hover:scale-110 cursor-default ${LEVEL_CLASSES[day.level]}`}
                                                        onMouseEnter={(e) => {
                                                            if (!day.date) return;
                                                            const text = day.count === 0
                                                                ? `No contributions on ${formatContribDate(day.date)}`
                                                                : `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatContribDate(day.date)}`;
                                                            setTooltip({ x: e.clientX, y: e.clientY, text });
                                                        }}
                                                        onMouseMove={(e) => {
                                                            if (!day.date) return;
                                                            setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev);
                                                        }}
                                                        onMouseLeave={() => setTooltip(null)}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex items-center justify-end gap-1.5 mt-2.5">
                                    <span className="text-[9px] text-muted-foreground">Less</span>
                                    {([0, 1, 2, 3, 4] as const).map((level) => (
                                        <div key={level} className={`w-[10px] h-[10px] rounded-[2px] flex-shrink-0 ${LEVEL_CLASSES[level]}`} />
                                    ))}
                                    <span className="text-[9px] text-muted-foreground">More</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-6">
                            Could not load contribution data.
                        </p>
                    )}
                </div>
            </motion.div>

            {/* Custom tooltip — fixed to viewport, follows mouse */}
            {tooltip && (
                <div
                    className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium shadow-lg whitespace-nowrap"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 36,
                        transform: "translateX(-50%)",
                    }}
                >
                    {tooltip.text}
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-foreground rotate-45" />
                </div>
            )}
        </section>
    );
}
