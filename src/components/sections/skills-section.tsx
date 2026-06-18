"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiPython, SiCplusplus, SiTypescript, SiJavascript, SiMysql,
    SiReact, SiNextdotjs, SiTailwindcss, SiFigma,
    SiNodedotjs, SiPostgresql, SiPhp, SiHtml5, SiCss3, SiJira, SiCanva,
    SiTableau, SiGoogleanalytics, SiLaravel
} from "react-icons/si";
import { FaJava, FaRProject } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { BiSolidSlideshow } from "react-icons/bi";
import {
    Code2, MessageSquare, BrainCircuit, Users,
    Clock, RefreshCw, Flag, Folder, FolderOpen
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { Variants } from "framer-motion";

/* ── Brand colours per skill ───────────────────────────────── */
const SKILL_BG: Record<string, string> = {
    "Python":           "#3572A5",
    "R":                "#198CE7",
    "JavaScript":       "#F0DB4F",
    "TypeScript":       "#3178C6",
    "React":            "#23272f",
    "Next.js":          "#111111",
    "Node.js":          "#215732",
    "HTML":             "#E34F26",
    "CSS":              "#1572B6",
    "PHP":              "#4F5D95",
    "Java":             "#007396",
    "C":                "#5C6BC0",
    "MySQL":            "#00618A",
    "SQL":              "#336791",
    "PostgreSQL":       "#336791",
    "Laravel":          "#FF2D20",
    "Tailwind CSS":     "#0ea5e9",
    "Figma":            "#1E1E1E",
    "Jira":             "#0052CC",
    "Canva":            "#00C4CC",
    "Excel":            "#1D6F42",
    "Tableau":          "#E97627",
    "PowerPoint":       "#B7472A",
    "Looker Studio":    "#4285F4",
    /* Soft skills */
    "Communication":    "#0F766E", "Komunikasi":       "#0F766E",
    "Problem Solving":  "#7C3AED", "Pemecahan Masalah":"#7C3AED",
    "Teamwork":         "#0369A1", "Kerjasama Tim":    "#0369A1",
    "Time Management":  "#B45309", "Manajemen Waktu":  "#B45309",
    "Adaptability":     "#0F766E", "Adaptabilitas":    "#0F766E",
    "Leadership":       "#BE123C", "Kepemimpinan":     "#BE123C",
};

/* Skills whose background is light → use dark icon text */
const DARK_ICON = new Set(["JavaScript", "Excel", "Tableau"]);

/* ── Icon map ──────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
    "Python": SiPython, "R": FaRProject,
    "Excel": RiFileExcel2Fill, "Looker Studio": SiGoogleanalytics,
    "Tableau": SiTableau, "SQL": SiPostgresql, "MySQL": SiMysql,
    "C": SiCplusplus, "Java": FaJava, "PHP": SiPhp,
    "HTML": SiHtml5, "CSS": SiCss3,
    "JavaScript": SiJavascript, "TypeScript": SiTypescript,
    "Node.js": SiNodedotjs, "Tailwind CSS": SiTailwindcss,
    "React": SiReact, "Next.js": SiNextdotjs, "Laravel": SiLaravel,
    "Jira": SiJira, "Figma": SiFigma,
    "PowerPoint": BiSolidSlideshow, "Canva": SiCanva,
    "Communication": MessageSquare, "Komunikasi": MessageSquare,
    "Problem Solving": BrainCircuit, "Pemecahan Masalah": BrainCircuit,
    "Teamwork": Users, "Kerjasama Tim": Users,
    "Time Management": Clock, "Manajemen Waktu": Clock,
    "Adaptability": RefreshCw, "Adaptabilitas": RefreshCw,
    "Leadership": Flag, "Kepemimpinan": Flag,
};

/* ── Hover variants: outer lifts, inner jiggles ─────────────── */
const outerVariants: Variants = {
    rest:  { scale: 1,    y: 0  },
    hover: { scale: 1.12, y: -8, transition: { type: "spring" as const, stiffness: 400, damping: 15 } },
};
const innerVariants: Variants = {
    rest:  { rotate: 0 },
    hover: {
        rotate: [-4, 4, -3, 3, 0],
        transition: { duration: 0.45 },
    },
};

export function SkillsSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"data" | "dev" | "design" | "soft">("dev");

    const tabs = [
        { id: "data",   label: t.skills.categories.data },
        { id: "dev",    label: t.skills.categories.dev },
        { id: "design", label: t.skills.categories.design },
        { id: "soft",   label: t.skills.categories.soft },
    ] as const;

    const currentSkills: string[] =
        activeTab === "data"   ? t.skills.dataList   :
        activeTab === "dev"    ? t.skills.devList     :
        activeTab === "design" ? t.skills.designList  :
                                 t.skills.softList;

    return (
        <section id="skills" className="container py-20 px-4">

            {/* Header */}
            <motion.div
                className="flex flex-col items-center gap-4 text-center mb-12"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {t.skills.title}
                </h2>
                <p className="text-muted-foreground max-w-[42rem] sm:text-xl">
                    {t.skills.description}
                </p>
            </motion.div>

            {/* ── Folder shell ── */}
            <motion.div
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {/* Folder tabs */}
                <div className="flex gap-1 overflow-x-auto">
                    {tabs.map((tab) => {
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={[
                                    "relative flex items-center gap-2 px-4 sm:px-6 py-2.5 flex-shrink-0",
                                    "rounded-t-xl text-sm font-medium whitespace-nowrap",
                                    "transition-all duration-200 select-none",
                                    active
                                        ? "bg-card border-t border-l border-r border-border text-foreground z-10 -mb-px"
                                        : "bg-muted/50 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/70",
                                ].join(" ")}
                            >
                                {active
                                    ? <FolderOpen className="w-4 h-4 text-primary" />
                                    : <Folder className="w-4 h-4" />}
                                {tab.label}
                                {active && (
                                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Folder body */}
                <div className="border border-border bg-card rounded-b-2xl rounded-tr-2xl p-5 sm:p-8">

                    {/* dotted grid paper texture */}
                    <div
                        className="w-full h-px mb-6 opacity-40"
                        style={{ background: "repeating-linear-gradient(90deg, hsl(var(--border)) 0, hsl(var(--border)) 4px, transparent 4px, transparent 16px)" }}
                    />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-x-4 gap-y-6"
                        >
                            {currentSkills.map((skill, i) => {
                                const Icon = ICON_MAP[skill] ?? Code2;
                                const bg  = SKILL_BG[skill] ?? "#374151";
                                const darkIcon = DARK_ICON.has(skill);

                                return (
                                    <motion.div
                                        key={skill}
                                        className="flex flex-col items-center gap-2 cursor-default"
                                        initial={{ opacity: 0, scale: 0.6, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 280,
                                            damping: 20,
                                            delay: i * 0.045,
                                        }}
                                        variants={outerVariants}
                                        whileHover="hover"
                                    >
                                        {/* Icon tile */}
                                        <motion.div
                                            className="w-full aspect-square rounded-[22%] flex items-center justify-center shadow-lg"
                                            style={{
                                                backgroundColor: bg,
                                                /* coloured glow on hover via CSS var trick */
                                            }}
                                            variants={{
                                                rest:  { boxShadow: `0 4px 14px ${bg}33` },
                                                hover: { boxShadow: `0 8px 28px ${bg}88` },
                                            }}
                                        >
                                            <motion.span
                                                className={[
                                                    "text-[28px] leading-none",
                                                    darkIcon ? "text-gray-800" : "text-white",
                                                ].join(" ")}
                                                variants={innerVariants}
                                            >
                                                <Icon />
                                            </motion.span>
                                        </motion.div>

                                        {/* Label */}
                                        <span className="text-[11px] font-medium text-center text-muted-foreground leading-tight line-clamp-2 w-full px-0.5">
                                            {skill}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
}
