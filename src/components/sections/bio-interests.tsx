"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function BioInterests() {
    const { t } = useLanguage();

    return (
        <section className="container py-20 px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Bio Text */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                        {t.interests.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        {t.about.bio1}
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t.about.bio2}
                    </p>
                </motion.div>

                {/* Right: Venn Diagram Visualization */}
                <div className="relative flex items-center justify-center h-[400px]">
                    <motion.div
                        className="relative w-[300px] h-[300px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Circle 1: Technology (Top) */}
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-blue-500/30 border-2 border-blue-500/50 backdrop-blur-sm flex items-start justify-center pt-8 z-10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="font-bold text-blue-600 dark:text-blue-300 transform -translate-y-2">{t.interests.diagram.tech}</span>
                        </motion.div>

                        {/* Circle 2: Business (Bottom Left) */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-500/30 border-2 border-amber-500/50 backdrop-blur-sm flex items-end justify-start pb-10 pl-8 z-10"
                            animate={{ x: [0, -5, 0], y: [0, 5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <span className="font-bold text-amber-600 dark:text-amber-300 transform translate-y-2 -translate-x-2">{t.interests.diagram.biz}</span>
                        </motion.div>

                        {/* Circle 3: Product (Bottom Right) */}
                        <motion.div
                            className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-red-500/30 border-2 border-red-500/50 backdrop-blur-sm flex items-end justify-end pb-10 pr-8 z-10"
                            animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <span className="font-bold text-red-600 dark:text-red-300 transform translate-y-2 translate-x-2">{t.interests.diagram.prod}</span>
                        </motion.div>

                        {/* Center Intersection: Innovation */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] text-center z-20">
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="bg-white dark:bg-zinc-900 border border-primary/20 shadow-xl px-4 py-2 rounded-full"
                            >
                                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-red-600">
                                    {t.interests.diagram.innovation}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
