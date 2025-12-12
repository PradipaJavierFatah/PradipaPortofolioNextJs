"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    SiPython, SiCplusplus, SiTypescript, SiJavascript, SiMysql,
    SiReact, SiNextdotjs, SiTailwindcss, SiFigma,
    SiNodedotjs, SiPostgresql, SiPhp, SiHtml5, SiCss3, SiJira, SiCanva,
    SiTableau, SiGoogleanalytics
} from "react-icons/si";
import { FaJava, FaRProject } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { BiSolidSlideshow } from "react-icons/bi";
import { Code2, MessageSquare, BrainCircuit, Users, Clock, RefreshCw, Flag } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";

// Data Structure for Skills with Icons
// Move this inside the component or make dynamic if we want to translate Category Titles
// For now, we'll keep the structure but translate titles dynamically

export function SkillsSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'data' | 'dev' | 'design' | 'soft'>('dev');

    // Icon Mapping
    const iconMap: Record<string, any> = {
        "Python": SiPython,
        "R": FaRProject,
        "Excel": RiFileExcel2Fill,
        "Looker Studio": SiGoogleanalytics, // Approximation
        "Tableau": SiTableau,
        "SQL": SiPostgresql, // or SiMysql
        "C": SiCplusplus, // Approximation for C
        "Java": FaJava,
        "PHP": SiPhp,
        "HTML": SiHtml5,
        "CSS": SiCss3,
        "JavaScript": SiJavascript,
        "Tailwind CSS": SiTailwindcss,
        "Jira": SiJira,
        "Figma": SiFigma,
        "PowerPoint": BiSolidSlideshow, // Need to import
        "Canva": SiCanva,
        // Soft Skills (ID/EN Mapping)
        "Communication": MessageSquare, "Komunikasi": MessageSquare,
        "Problem Solving": BrainCircuit, "Pemecahan Masalah": BrainCircuit,
        "Teamwork": Users, "Kerjasama Tim": Users,
        "Time Management": Clock, "Manajemen Waktu": Clock,
        "Adaptability": RefreshCw, "Adaptabilitas": RefreshCw,
        "Leadership": Flag, "Kepemimpinan": Flag
    };

    const getIcon = (name: string) => {
        const Icon = iconMap[name] || Code2; // Default to Code2 if not found
        return Icon;
    };

    const tabs = [
        { id: 'data', label: t.skills.categories.data },
        { id: 'dev', label: t.skills.categories.dev },
        { id: 'design', label: t.skills.categories.design },
        { id: 'soft', label: t.skills.categories.soft },
    ] as const;

    const currentSkills = activeTab === 'data' ? t.skills.dataList :
        activeTab === 'dev' ? t.skills.devList :
            activeTab === 'design' ? t.skills.designList :
                t.skills.softList;

    return (
        <section id="skills" className="container py-20 px-4">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {t.skills.title}
                </h2>
                <p className="text-muted-foreground max-w-[42rem] sm:text-xl">
                    {t.skills.description}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "outline"}
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-full px-8 ${activeTab === tab.id ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''} transition-all duration-300`}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Skills Grid */}
            <motion.div
                key={activeTab} // Triggers animation on tab change
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
            >
                {currentSkills.map((skill: string, index: number) => {
                    const Icon = getIcon(skill);
                    return (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group flex flex-col items-center justify-center p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-lg hover:border-orange-500/30 hover:bg-orange-500/5 transition-all text-center gap-4 cursor-default"
                        >
                            <div className="p-4 rounded-full bg-background group-hover:bg-background/80 shadow-inner text-4xl text-muted-foreground group-hover:text-orange-500 transition-colors">
                                <Icon />
                            </div>
                            <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                {skill}
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
