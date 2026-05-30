"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
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
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden py-16 lg:py-20">
            {/* BACKGROUND: Clean, no gradients */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden" />

            <div className="container relative z-10 px-4">
                <div className="grid gap-4 lg:gap-6 lg:grid-cols-2 lg:items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">


                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                        >
                            {t.hero.greeting} <br />
                            <span className="block">
                                {SITE_CONFIG.name}
                            </span>
                            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-3 min-h-[1.2em] sm:min-h-[1.3em]">
                                {t.hero.rolePrefix} <span className="text-primary font-mono">
                                    {typingText}
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="inline-block ml-1 w-1 h-5 sm:h-7 md:h-8 bg-lime-500 align-middle"
                                    />
                                </span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-base text-muted-foreground sm:text-lg max-w-xl lg:max-w-2xl leading-relaxed"
                        >
                            {t.hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-3 w-full justify-center lg:justify-start max-w-md lg:max-w-none"
                        >
                            {/* Download CV */}
                            <Button size="sm" asChild className="px-5 text-sm sm:text-base bg-primary hover:bg-primary/90 rounded-full group">
                                <Link href={t.links.cv} target="_blank" className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    {t.hero.downloadCV}
                                </Link>
                            </Button>

                            {/* View Projects */}
                            <Button variant="outline" size="sm" className="px-5 text-sm sm:text-base rounded-full border-primary/20 bg-background/50 hover:bg-primary/5 text-foreground backdrop-blur-sm group" asChild>
                                <Link href="/projects" className="flex items-center gap-2">
                                    {t.hero.viewProjects} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Profile Photo */}
                    <div className="relative flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            {/* PHOTO CONTAINER */}
                            <div className="relative w-64 sm:w-80 lg:w-96 bg-white p-3 sm:p-4 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] rotate-3 hover:rotate-0 transition-all duration-500 border border-zinc-100">
                                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900/50 ring-1 ring-black/5">
                                    <Image
                                        src="/images/profileDipa1.jpg"
                                        alt="Pradipa Javier Fatah"
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        priority
                                        unoptimized
                                    />
                                </div>
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-white/10" />
                                <div className="absolute bottom-4 left-0 right-0 text-center select-none">
                                    <p className="text-zinc-400 font-serif italic text-sm sm:text-base opacity-40">Pradipa Javier Fatah</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
