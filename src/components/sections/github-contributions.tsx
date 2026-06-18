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

interface LanguageStat {
    name: string;
    bytes: number;
    percentage: number;
    color: string;
}

const GITHUB_USERNAME = SITE_CONFIG.socials.github.split("/").pop() ?? "PradipaJavierFatah";

const LEVEL_CLASSES: Record<number, string> = {
    0: "bg-border/80",
    1: "bg-lime-200 dark:bg-lime-900/80",
    2: "bg-lime-400 dark:bg-lime-700",
    3: "bg-lime-500",
    4: "bg-primary",
};

const LANG_COLORS: Record<string, string> = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "Java": "#b07219",
    "PHP": "#4F5D95",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "SCSS": "#c6538c",
    "C++": "#f34b7d",
    "C": "#555555",
    "C#": "#178600",
    "Go": "#00ADD8",
    "Rust": "#dea584",
    "Ruby": "#701516",
    "Swift": "#F05138",
    "Kotlin": "#A97BFF",
    "Dart": "#00B4AB",
    "Shell": "#89e051",
    "Vue": "#41b883",
    "Svelte": "#ff3e00",
    "R": "#198CE7",
    "Jupyter Notebook": "#DA5B0B",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildWeekGrid(contributions: Contribution[], year: number, isCurrentYear: boolean): Contribution[][] {
    const map = new Map(contributions.map((c) => [c.date, c]));
    const weeks: Contribution[][] = [];

    if (isCurrentYear) {
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
        const jan1 = new Date(year, 0, 1);
        const dec31 = new Date(year, 11, 31);
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

async function fetchTopLanguages(): Promise<LanguageStat[]> {
    const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`
    );
    if (!reposRes.ok) return [];

    const repos: Array<{ name: string; fork: boolean }> = await reposRes.json();
    const ownedRepos = repos.filter((r) => !r.fork);

    const langResults = await Promise.all(
        ownedRepos.map(async (repo) => {
            const res = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`
            );
            if (!res.ok) return {} as Record<string, number>;
            return res.json() as Promise<Record<string, number>>;
        })
    );

    const totals: Record<string, number> = {};
    for (const langData of langResults) {
        for (const [lang, bytes] of Object.entries(langData)) {
            totals[lang] = (totals[lang] ?? 0) + bytes;
        }
    }

    const sorted = Object.entries(totals)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const top5Total = sorted.reduce((sum, [, bytes]) => sum + bytes, 0);

    return sorted.map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Math.round((bytes / top5Total) * 1000) / 10,
        color: LANG_COLORS[name] ?? "#8b8b8b",
    }));
}

interface TooltipState {
    x: number;
    y: number;
    text: string;
}

export function GitHubContributions() {
    const [contribData, setContribData] = useState<ContributionsData | null>(null);
    const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
    const [languages, setLanguages] = useState<LanguageStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingLangs, setIsLoadingLangs] = useState(true);
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
                    const years = Object.keys(data.total).map(Number).sort((a, b) => b - a);
                    if (years.length > 0) setSelectedYear(years[0]);
                }
                if (userRes.ok) setGithubUser(await userRes.json());
            } finally {
                setIsLoading(false);
            }
        })();

        // Language fetch is independent — runs in parallel
        fetchTopLanguages()
            .then(setLanguages)
            .finally(() => setIsLoadingLangs(false));
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
        <section className="container py-12 md:py-16 px-4 space-y-5">
            {/* ── Contribution Heatmap ── */}
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

                {/* Stats + year selector */}
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

                {/* Heatmap card */}
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

                                <div className="flex">
                                    <div className="flex flex-col gap-[3px] pr-1 pt-px w-[26px] flex-shrink-0">
                                        {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                                            <div key={i} className="flex-1 min-h-[10px] text-[9px] text-muted-foreground flex items-center">
                                                {label}
                                            </div>
                                        ))}
                                    </div>

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

            {/* ── Top Languages ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-xl border border-border bg-card/60 p-4 sm:p-5"
            >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <span className="font-semibold text-base tracking-tight">Top Languages</span>
                    <span className="text-xs text-muted-foreground">by bytes across all repos</span>
                </div>

                {isLoadingLangs ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-2.5 w-full rounded-full bg-muted" />
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-muted flex-shrink-0" />
                                <div className="h-3 rounded bg-muted flex-1" style={{ width: `${80 - i * 12}%` }} />
                                <div className="h-3 w-8 rounded bg-muted" />
                            </div>
                        ))}
                    </div>
                ) : languages.length > 0 ? (
                    <div className="space-y-4">
                        {/* Stacked color bar */}
                        <div className="flex w-full h-2 rounded-full overflow-hidden gap-[2px]">
                            {languages.map((lang) => (
                                <div
                                    key={lang.name}
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                        width: `${lang.percentage}%`,
                                        backgroundColor: lang.color,
                                    }}
                                    title={`${lang.name} ${lang.percentage}%`}
                                />
                            ))}
                        </div>

                        {/* Language rows */}
                        <div className="space-y-2.5">
                            {languages.map((lang, i) => (
                                <motion.div
                                    key={lang.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.06 }}
                                    className="flex items-center gap-3"
                                >
                                    {/* Color dot */}
                                    <span
                                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: lang.color }}
                                    />

                                    {/* Language name */}
                                    <span className="text-sm font-medium w-28 flex-shrink-0">{lang.name}</span>

                                    {/* Bar */}
                                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: lang.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${lang.percentage}%` }}
                                            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                                        />
                                    </div>

                                    {/* Percentage */}
                                    <span className="text-sm tabular-nums text-muted-foreground w-12 text-right flex-shrink-0">
                                        {lang.percentage.toFixed(1)}%
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        Could not load language data.
                    </p>
                )}
            </motion.div>

            {/* Hover tooltip */}
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
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-foreground rotate-45" />
                </div>
            )}
        </section>
    );
}
