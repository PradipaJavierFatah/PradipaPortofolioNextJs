"use client";

import { motion } from "framer-motion";
import { Github, Users, BookOpen, TrendingUp } from "lucide-react";
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

const GITHUB_USERNAME = SITE_CONFIG.socials.github.split("/").pop() ?? "pradipajavier";

const LEVEL_CLASSES: Record<number, string> = {
    0: "bg-border",
    1: "bg-lime-200 dark:bg-lime-900/80",
    2: "bg-lime-400 dark:bg-lime-700",
    3: "bg-lime-500 dark:bg-lime-500",
    4: "bg-primary shadow-[0_0_5px_rgba(175,238,7,0.35)]",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildWeekGrid(contributions: Contribution[]): Contribution[][] {
    const now = new Date();
    // Align to Sunday of current week, then go back 52 full weeks
    const startSunday = new Date(now);
    startSunday.setDate(now.getDate() - now.getDay() - 52 * 7);

    const map = new Map(contributions.map((c) => [c.date, c]));
    const weeks: Contribution[][] = [];
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

    return weeks;
}

function getMonthLabels(weeks: Contribution[][]) {
    const labels: Array<{ label: string; col: number }> = [];
    let lastMonth = -1;
    weeks.forEach((week, col) => {
        const month = new Date(week[0].date).getMonth();
        if (month !== lastMonth) {
            labels.push({ label: MONTHS[month], col });
            lastMonth = month;
        }
    });
    return labels;
}

function formatContribDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function SkeletonHeatmap() {
    return (
        <div className="animate-pulse overflow-x-auto">
            <div className="h-2.5 w-40 bg-muted rounded mb-3" />
            <div className="flex gap-[3px]">
                {Array.from({ length: 53 }).map((_, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, di) => (
                            <div key={di} className="w-[10px] h-[10px] rounded-[2px] bg-muted" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function GitHubContributions() {
    const [contribData, setContribData] = useState<ContributionsData | null>(null);
    const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const [contribRes, userRes] = await Promise.all([
                    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                ]);
                if (contribRes.ok) setContribData(await contribRes.json());
                if (userRes.ok) setGithubUser(await userRes.json());
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const currentYear = new Date().getFullYear().toString();
    const totalContributions = contribData?.total?.[currentYear] ?? 0;
    const weeks = contribData ? buildWeekGrid(contribData.contributions) : [];
    const monthLabels = weeks.length > 0 ? getMonthLabels(weeks) : [];

    return (
        <section className="container py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Github className="w-7 h-7 text-primary" />
                            GitHub Activity
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Live data from{" "}
                            <a
                                href={SITE_CONFIG.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                            >
                                @{GITHUB_USERNAME}
                            </a>
                        </p>
                    </div>

                    {!isLoading && contribData && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="sm:ml-auto flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm w-fit"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="font-bold text-primary">
                                {totalContributions.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                                contributions in {currentYear}
                            </span>
                        </motion.div>
                    )}
                </div>

                {/* Stats Row */}
                {!isLoading && githubUser && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="grid grid-cols-3 gap-3"
                    >
                        {[
                            { icon: BookOpen, label: "Public Repos", value: githubUser.public_repos },
                            { icon: Users, label: "Followers", value: githubUser.followers },
                            { icon: TrendingUp, label: "Following", value: githubUser.following },
                        ].map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="p-3 sm:p-4 rounded-xl border border-border bg-card flex items-center gap-3"
                            >
                                <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                                    <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl font-bold leading-none">{value}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Heatmap */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="rounded-xl border border-border bg-card p-4 sm:p-6"
                >
                    {isLoading ? (
                        <SkeletonHeatmap />
                    ) : weeks.length > 0 ? (
                        <div className="overflow-x-auto">
                            {/* Month labels */}
                            <div className="flex mb-[5px] pl-[28px] min-w-max">
                                {weeks.map((_, wi) => {
                                    const found = monthLabels.find((m) => m.col === wi);
                                    return (
                                        <div key={wi} className="w-[13px] flex-shrink-0 text-[9px] text-muted-foreground leading-none">
                                            {found?.label ?? ""}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Grid */}
                            <div className="flex min-w-max">
                                {/* Day labels */}
                                <div className="flex flex-col gap-[3px] pr-1 pt-px">
                                    {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                                        <div
                                            key={i}
                                            className="h-[10px] w-6 text-[9px] text-muted-foreground flex items-center"
                                        >
                                            {label}
                                        </div>
                                    ))}
                                </div>

                                {/* Week columns */}
                                <div className="flex gap-[3px]">
                                    {weeks.map((week, wi) => (
                                        <div key={wi} className="flex flex-col gap-[3px]">
                                            {week.map((day, di) => (
                                                <div
                                                    key={di}
                                                    className={`w-[10px] h-[10px] rounded-[2px] transition-transform duration-100 hover:scale-125 ${LEVEL_CLASSES[day.level]}`}
                                                    title={
                                                        day.date
                                                            ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatContribDate(day.date)}`
                                                            : ""
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-muted-foreground min-w-max">
                                <span>Less</span>
                                {([0, 1, 2, 3, 4] as const).map((level) => (
                                    <div
                                        key={level}
                                        className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_CLASSES[level]}`}
                                    />
                                ))}
                                <span>More</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Github className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm text-muted-foreground">Could not load contribution data</p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}
