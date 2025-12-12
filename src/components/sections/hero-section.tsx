"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal, Code2, Database, Cpu, Globe, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/data";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

// Simple Typewriter Hook
const useTypewriter = (words: string[], speed = 100, pause = 1500) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    // Slower, smoother typing
    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : speed, parseInt(Math.random() * 350 as any)));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, speed, words]);

    return words[index].substring(0, subIndex);
};

export function HeroSection() {
    const { t } = useLanguage();
    // Use translated roles
    const typingText = useTypewriter(t.hero.roles, 200, 3000);

    return (
        <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden py-20 lg:py-32">
            {/* 
                BACKGROUND: Softer Moving Gradient 
                Using a large background size and animating the position.
                Colors are shifted to be "softer" (opacity/pastel) but still deep purple context.
             */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                {/* animated gradient blob background */}
                {/* animated gradient blob background - Optimized for Mobile */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 bg-[size:400%_400%] sm:animate-gradient blur-[50px] sm:blur-[100px] opacity-60 sm:opacity-100 will-change-transform" />

                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <div className="container relative z-10 px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col gap-8 text-center lg:text-left items-center lg:items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
                                <BarChart3 className="h-4 w-4" />
                                <span>{t.hero.badge}</span>
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                        >
                            {t.hero.greeting} {SITE_CONFIG.name}. <br />
                            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 min-h-[1.2em] sm:min-h-[1.3em]">
                                {t.hero.rolePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-mono">
                                    {typingText}
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="inline-block ml-1 w-1 h-6 sm:h-8 md:h-10 bg-purple-500 align-middle"
                                    />
                                </span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-muted-foreground sm:text-xl max-w-2xl leading-relaxed"
                        >
                            {t.hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start mt-2"
                        >
                            <Button size="lg" asChild className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full group">
                                <Link href="/projects" className="flex items-center gap-2">
                                    {/* Adjusted gap to ensure consistency */}
                                    {t.hero.viewProjects} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-primary/20 bg-background/50 hover:bg-primary/5 text-foreground backdrop-blur-sm" asChild>
                                <Link href={t.links.cv} target="_blank" className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    {t.hero.downloadCV}
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Profile Photo & Tech Elements */}
                    <div className="relative flex justify-center lg:justify-end">
                        {/* 
                            Tech Orbitals - Simplified/Cleaned up 
                        */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                        >
                            {/* Floating Icons positioned around the circle */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 bg-background/80 p-3 rounded-2xl border border-primary/20 shadow-lg backdrop-blur-md">
                                <Code2 className="h-6 w-6 text-blue-500" />
                            </div>
                            <div className="absolute bottom-0 right-1/4 translate-y-8 bg-background/80 p-3 rounded-2xl border border-primary/20 shadow-lg backdrop-blur-md">
                                <Database className="h-6 w-6 text-purple-500" />
                            </div>
                            <div className="absolute bottom-0 left-1/4 translate-y-8 bg-background/80 p-3 rounded-2xl border border-primary/20 shadow-lg backdrop-blur-md">
                                <BarChart3 className="h-6 w-6 text-green-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative z-10"
                        >
                            {/* 
                                PHOTO CONTAINER
                                Changed from rounded-full to rounded-[2.5rem] (Square with soft corners)
                             */}
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[2.5rem] overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10 rotate-3 hover:rotate-0 transition-transform duration-500">

                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative">
                                    <Image
                                        src="/images/profileDipa2.jpg"
                                        alt="Pradipa Javier Fatah"
                                        fill
                                        className="object-cover scale-[1.35] hover:scale-[1.4] transition-transform duration-500"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Floating "Status" Card attached to the photo */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="absolute -bottom-8 -right-8 bg-card/90 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl flex items-center gap-3"
                            >
                                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</p>
                                    <p className="text-sm font-semibold">{t.hero.status}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
