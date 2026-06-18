"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import {
    Code2, MessageSquare, BrainCircuit, Users,
    Clock, RefreshCw, Flag, Folder, FolderOpen
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { Variants } from "framer-motion";

/* ── Icon definitions ────────────────────────────────────────── */
type LogoDef   = { kind: "logo";   id: string };
type LucideDef = { kind: "lucide"; Component: React.ElementType; color: string };
type IconDef   = LogoDef | LucideDef;

const ICONS: Record<string, IconDef> = {
    /* Tech & tools — real brand logos via Iconify logos set */
    "Python":           { kind: "logo", id: "logos:python" },
    "R":                { kind: "logo", id: "logos:r-lang" },
    "Excel":            { kind: "logo", id: "logos:microsoft-excel" },
    "Looker Studio":    { kind: "logo", id: "logos:google-analytics" },
    "Tableau":          { kind: "logo", id: "logos:tableau-icon" },
    "SQL":              { kind: "logo", id: "logos:postgresql" },
    "MySQL":            { kind: "logo", id: "logos:mysql-icon" },
    "PostgreSQL":       { kind: "logo", id: "logos:postgresql" },
    "C":                { kind: "logo", id: "logos:c" },
    "Java":             { kind: "logo", id: "logos:java" },
    "PHP":              { kind: "logo", id: "logos:php" },
    "HTML":             { kind: "logo", id: "logos:html-5" },
    "CSS":              { kind: "logo", id: "logos:css-3" },
    "JavaScript":       { kind: "logo", id: "logos:javascript" },
    "TypeScript":       { kind: "logo", id: "logos:typescript-icon" },
    "Node.js":          { kind: "logo", id: "logos:nodejs-icon" },
    "Tailwind CSS":     { kind: "logo", id: "logos:tailwindcss-icon" },
    "React":            { kind: "logo", id: "logos:react" },
    "Next.js":          { kind: "logo", id: "logos:nextjs-icon" },
    "Laravel":          { kind: "logo", id: "logos:laravel" },
    "Jira":             { kind: "logo", id: "logos:jira" },
    "Figma":            { kind: "logo", id: "logos:figma" },
    "PowerPoint":       { kind: "logo", id: "logos:microsoft-powerpoint" },
    "Canva":            { kind: "logo", id: "logos:canva" },
    /* Soft skills — abstract lucide icons with brand colours */
    "Communication":    { kind: "lucide", Component: MessageSquare, color: "#0F766E" },
    "Komunikasi":       { kind: "lucide", Component: MessageSquare, color: "#0F766E" },
    "Problem Solving":  { kind: "lucide", Component: BrainCircuit,  color: "#7C3AED" },
    "Pemecahan Masalah":{ kind: "lucide", Component: BrainCircuit,  color: "#7C3AED" },
    "Teamwork":         { kind: "lucide", Component: Users,          color: "#0369A1" },
    "Kerjasama Tim":    { kind: "lucide", Component: Users,          color: "#0369A1" },
    "Time Management":  { kind: "lucide", Component: Clock,          color: "#B45309" },
    "Manajemen Waktu":  { kind: "lucide", Component: Clock,          color: "#B45309" },
    "Adaptability":     { kind: "lucide", Component: RefreshCw,      color: "#0F766E" },
    "Adaptabilitas":    { kind: "lucide", Component: RefreshCw,      color: "#0F766E" },
    "Leadership":       { kind: "lucide", Component: Flag,           color: "#BE123C" },
    "Kepemimpinan":     { kind: "lucide", Component: Flag,           color: "#BE123C" },
};

/* ── Hover variants: outer lifts, inner jiggles ─────────────── */
const outerVariants: Variants = {
    rest:  { scale: 1,    y: 0  },
    hover: { scale: 1.12, y: -8, transition: { type: "spring" as const, stiffness: 400, damping: 15 } },
};
const innerVariants: Variants = {
    rest:  { rotate: 0 },
    hover: { rotate: [-4, 4, -3, 3, 0], transition: { duration: 0.45 } },
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
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
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

                    {/* dotted rule */}
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
                                const def = ICONS[skill];
                                const isLucide = def?.kind === "lucide";
                                const ld = isLucide ? (def as LucideDef) : null;
                                const FallbackIcon = ld?.Component ?? Code2;

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
                                            className="w-full aspect-square rounded-[22%] flex items-center justify-center"
                                            style={{ backgroundColor: ld ? ld.color : "#ffffff" }}
                                            variants={ld ? {
                                                rest:  { boxShadow: `0 4px 14px ${ld.color}44` },
                                                hover: { boxShadow: `0 8px 28px ${ld.color}99` },
                                            } : {
                                                rest:  { boxShadow: "0 2px 10px rgba(0,0,0,0.13)" },
                                                hover: { boxShadow: "0 7px 24px rgba(0,0,0,0.22)" },
                                            }}
                                        >
                                            <motion.span
                                                className="flex items-center justify-center w-[60%] h-[60%]"
                                                variants={innerVariants}
                                            >
                                                {def?.kind === "logo" ? (
                                                    <Icon
                                                        icon={(def as LogoDef).id}
                                                        style={{ width: "100%", height: "100%" }}
                                                    />
                                                ) : (
                                                    <FallbackIcon className="w-full h-full text-white" />
                                                )}
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
