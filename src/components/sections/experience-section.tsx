"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";


import { useLanguage } from "@/lib/language-context";

export function ExperienceSection() {
    const { t } = useLanguage();

    return (
        <section id="experience" className="container py-20 md:py-32 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 text-center mb-16 z-10 relative"
            >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    {t.experience.title}
                </h2>
                <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
                    {t.experience.description}
                </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
                {/* Central Line for Desktop */}
                <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2" />

                {/* Sidebar Line for Mobile */}
                <div className="sm:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

                <div className="space-y-16">
                    {t.experience.list.map((item, index) => (
                        <motion.div
                            key={item.company}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative flex flex-col sm:flex-row gap-8 items-center ${index % 2 === 0 ? "sm:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-8 sm:left-1/2 -ml-[18px] sm:-ml-4 top-0 sm:top-8 w-8 h-8 rounded-full bg-background border-4 border-primary shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>

                            {/* Empty space for alternating layout */}
                            <div className="hidden sm:block flex-1" />

                            {/* Content Card */}
                            <div className="flex-1 w-full pl-16 sm:pl-0">
                                <div className={`relative p-6 sm:p-8 rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-primary/10 transition-shadow ${index % 2 === 0 ? "text-left" : "sm:text-right"}`}>

                                    {/* Arrow connecting to line */}
                                    <div className={`hidden sm:block absolute top-8 w-4 h-4 bg-card border-t border-l border-primary/20 rotate-45 ${index % 2 === 0 ? "-left-2 border-r-0 border-b-0" : "-right-2 border-l-0 border-t-0 border-r border-b"}`} />

                                    <div className={`flex flex-col gap-2 mb-4 ${index % 2 === 0 ? "items-start" : "sm:items-end"}`}>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                            <Calendar className="h-3 w-3" />
                                            {item.period}
                                        </div>
                                        <h3 className="text-2xl font-bold text-foreground">{item.company}</h3>
                                        <span className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                                            <Briefcase className="h-4 w-4" /> {item.role}
                                        </span>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
