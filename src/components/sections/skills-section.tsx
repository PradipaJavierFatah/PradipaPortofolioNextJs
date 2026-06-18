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
import { Code2, MessageSquare, BrainCircuit, Users, Clock, RefreshCw, Flag, Folder, FolderOpen } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function SkillsSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"data" | "dev" | "design" | "soft">("dev");

    const iconMap: Record<string, React.ElementType> = {
        "Python": SiPython,
        "R": FaRProject,
        "Excel": RiFileExcel2Fill,
        "Looker Studio": SiGoogleanalytics,
        "Tableau": SiTableau,
        "SQL": SiPostgresql,
        "MySQL": SiMysql,
        "C": SiCplusplus,
        "Java": FaJava,
        "PHP": SiPhp,
        "HTML": SiHtml5,
        "CSS": SiCss3,
        "JavaScript": SiJavascript,
        "TypeScript": SiTypescript,
        "Node.js": SiNodedotjs,
        "Tailwind CSS": SiTailwindcss,
        "React": SiReact,
        "Next.js": SiNextdotjs,
        "Laravel": SiLaravel,
        "Jira": SiJira,
        "Figma": SiFigma,
        "PowerPoint": BiSolidSlideshow,
        "Canva": SiCanva,
        "Communication": MessageSquare, "Komunikasi": MessageSquare,
        "Problem Solving": BrainCircuit, "Pemecahan Masalah": BrainCircuit,
        "Teamwork": Users, "Kerjasama Tim": Users,
        "Time Management": Clock, "Manajemen Waktu": Clock,
        "Adaptability": RefreshCw, "Adaptabilitas": RefreshCw,
        "Leadership": Flag, "Kepemimpinan": Flag,
    };

    const getIcon = (name: string): React.ElementType => iconMap[name] ?? Code2;

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

            {/* Section header */}
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

            {/* ── Folder UI ── */}
            <motion.div
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {/* Folder tabs */}
                <div className="flex gap-1 overflow-x-auto pb-0">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={[
                                    "relative flex items-center gap-2 px-4 sm:px-6 py-2.5",
                                    "rounded-t-xl text-sm font-medium whitespace-nowrap flex-shrink-0",
                                    "transition-all duration-200 select-none",
                                    /* active tab has no bottom border — merges with card body */
                                    isActive
                                        ? "bg-card border-t border-l border-r border-border text-foreground z-10 -mb-px"
                                        : "bg-muted/50 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/70",
                                ].join(" ")}
                            >
                                {isActive
                                    ? <FolderOpen className="w-4 h-4 text-primary" />
                                    : <Folder className="w-4 h-4" />}
                                {tab.label}

                                {/* active indicator dot */}
                                {isActive && (
                                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Folder body */}
                <div className="border border-border bg-card rounded-b-2xl rounded-tr-2xl p-5 sm:p-7">

                    {/* inner paper texture line at top */}
                    <div className="w-full h-px bg-border/40 mb-6" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
                        >
                            {currentSkills.map((skill, index) => {
                                const Icon = getIcon(skill);
                                return (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.22, delay: index * 0.04 }}
                                        className={[
                                            "group relative flex flex-col items-center gap-2.5 p-3 pt-4",
                                            "rounded-xl bg-background",
                                            "border border-border/60",
                                            "hover:border-primary/50 hover:bg-primary/5",
                                            "hover:-translate-y-1 hover:shadow-md",
                                            "transition-all duration-200 cursor-default",
                                        ].join(" ")}
                                    >
                                        {/* tiny dog-ear fold top-right */}
                                        <span className="absolute top-0 right-0 w-4 h-4 overflow-hidden">
                                            <span className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-l-[16px] border-t-border/60 border-l-transparent group-hover:border-t-primary/40 transition-colors" />
                                        </span>

                                        <span className="text-[28px] leading-none text-muted-foreground group-hover:text-primary transition-colors">
                                            <Icon />
                                        </span>

                                        <span className="text-[11px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight break-words w-full">
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
