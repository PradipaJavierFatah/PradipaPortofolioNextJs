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
            <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden">
                {/* animated gradient blob background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-lime-500/20 to-teal-500/20 bg-[size:400%_400%] sm:animate-gradient blur-[50px] sm:blur-[100px] opacity-60 sm:opacity-100 will-change-transform" />

                {/* LARGE SQUIGGLES (NeuroPark Pattern) */}
                <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-50 200 C 50 50, 150 50, 200 200 S 350 350, 450 200' stroke='%23afee07' stroke-width='60' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundSize: '600px 600px'
                    }}
                />

                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <div className="container relative z-10 px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col gap-8 text-center lg:text-left items-center lg:items-start">


                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                        >
                            {t.hero.greeting} {SITE_CONFIG.name}. <br />
                            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 min-h-[1.2em] sm:min-h-[1.3em]">
                                {t.hero.rolePrefix} <span className="text-primary font-mono">
                                    {typingText}
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="inline-block ml-1 w-1 h-6 sm:h-8 md:h-10 bg-lime-500 align-middle"
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
                            {/* Download CV - Now Primary Action with Pulse */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Button size="lg" asChild className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full group">
                                    <Link href={t.links.cv} target="_blank" className="flex items-center gap-2">
                                        <Download className="h-4 w-4 animate-bounce" />
                                        {t.hero.downloadCV}
                                    </Link>
                                </Button>
                            </motion.div>

                            {/* View Projects - Now Secondary Outline Action */}
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-primary/20 bg-background/50 hover:bg-primary/5 text-foreground backdrop-blur-sm group" asChild>
                                <Link href="/projects" className="flex items-center gap-2">
                                    {t.hero.viewProjects} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                                <Code2 className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div className="absolute bottom-0 right-1/4 translate-y-8 bg-background/80 p-3 rounded-2xl border border-primary/20 shadow-lg backdrop-blur-md">
                                <Database className="h-6 w-6 text-lime-500" />
                            </div>
                            <div className="absolute bottom-0 left-1/4 translate-y-8 bg-background/80 p-3 rounded-2xl border border-primary/20 shadow-lg backdrop-blur-md">
                                <BarChart3 className="h-6 w-6 text-teal-500" />
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
                            <div className="relative w-72 sm:w-96 bg-white p-3 sm:p-4 pb-16 sm:pb-24 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] rotate-3 hover:rotate-0 transition-all duration-500 border border-zinc-100">
                                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 ring-1 ring-black/5">
                                    <Image
                                        src="/images/profileDipa.jpg"
                                        alt="Pradipa Javier Fatah"
                                        fill
                                        className="object-cover scale-[1.35] hover:scale-[1.4] transition-transform duration-500"
                                        priority
                                    />
                                </div>
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-white/10" />
                                <div className="absolute bottom-4 left-0 right-0 text-center select-none">
                                    <p className="text-zinc-400 font-serif italic text-sm sm:text-base opacity-40">Pradipa Javier Fatah</p>
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
