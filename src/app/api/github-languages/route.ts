import { NextResponse } from "next/server";

const GITHUB_USERNAME = "PradipaJavierFatah";

const LANG_COLORS: Record<string, string> = {
    "JavaScript":       "#f1e05a",
    "TypeScript":       "#3178c6",
    "Python":           "#3572A5",
    "Java":             "#b07219",
    "PHP":              "#4F5D95",
    "HTML":             "#e34c26",
    "CSS":              "#563d7c",
    "SCSS":             "#c6538c",
    "C++":              "#f34b7d",
    "C":                "#555555",
    "C#":               "#178600",
    "Go":               "#00ADD8",
    "Rust":             "#dea584",
    "Ruby":             "#701516",
    "Swift":            "#F05138",
    "Kotlin":           "#A97BFF",
    "Dart":             "#00B4AB",
    "Shell":            "#89e051",
    "Vue":              "#41b883",
    "Svelte":           "#ff3e00",
    "R":                "#198CE7",
    "Jupyter Notebook": "#DA5B0B",
};

// Cache this route for 1 hour on Vercel's edge
export const revalidate = 3600;

export async function GET() {
    const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
    };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
        { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
        return NextResponse.json([], { status: 200 });
    }

    const repos: Array<{ fork: boolean; language: string | null; size: number }> =
        await res.json();

    const counts: Record<string, number> = {};
    for (const repo of repos) {
        if (repo.fork || repo.size === 0 || !repo.language) continue;
        counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    }

    if (Object.keys(counts).length === 0) {
        return NextResponse.json([]);
    }

    const top5 = Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const top5Total = top5.reduce((s, [, c]) => s + c, 0);

    const result = top5.map(([name, count]) => ({
        name,
        percentage: Math.round((count / top5Total) * 1000) / 10,
        color: LANG_COLORS[name] ?? "#8b8b8b",
    }));

    return NextResponse.json(result);
}
