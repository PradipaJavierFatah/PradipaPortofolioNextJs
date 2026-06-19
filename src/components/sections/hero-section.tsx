"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/data";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), { ssr: false });
const Aurora = dynamic(() => import("@/components/ui/Aurora"), { ssr: false });

// Simple Typewriter Hook
const useTypewriter = (words: string[], speed = 100, pause = 1500) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [isPausing, setIsPausing] = useState(false);

    useEffect(() => {
        if (isPausing) return;

        if (subIndex === words[index].length && !reverse) {
            setIsPausing(true);
            const t = setTimeout(() => { setIsPausing(false); setReverse(true); }, pause);
            return () => clearTimeout(t);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const delay = reverse ? 60 : speed + Math.floor(Math.random() * 60);
        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, delay);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, isPausing, speed, pause, words]);

    return words[index].substring(0, subIndex);
};

export function HeroSection() {
    const { t } = useLanguage();
    const typingText = useTypewriter(t.hero.roles, 200, 3000);

    return (
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background -mt-16 py-16 lg:py-20">
            {/* Aurora fills the whole section, sits between bg and content */}
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#0c262d", "#afee07", "#0c262d"]}
                    blend={0.6}
                    amplitude={1.4}
                    speed={0.5}
                />
            </div>

            {/* Desktop: full-height lanyard pinned to the right side of the section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:block absolute inset-y-0 right-0 w-1/2 z-10"
            >
                <Lanyard
                    position={[0, 0, 19]}
                    fov={17}
                    gravity={[0, -40, 0]}
                    frontImage="/images/profileDipa1.jpg"
                    imageFit="cover"
                    lanyardWidth={1}
                    sceneY={5.2}
                    height="100%"
                />
            </motion.div>

            <div className="container relative z-20 px-4">
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
                            <Button size="sm" asChild className="px-5 text-sm sm:text-base bg-primary hover:bg-primary/90 rounded-full group">
                                <Link href={t.links.cv} target="_blank" className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    {t.hero.downloadCV}
                                </Link>
                            </Button>

                            <Button variant="outline" size="sm" className="px-5 text-sm sm:text-base rounded-full border-primary/20 bg-background/50 hover:bg-primary/5 text-foreground backdrop-blur-sm group" asChild>
                                <Link href="/projects" className="flex items-center gap-2">
                                    {t.hero.viewProjects} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile / tablet: inline lanyard (hidden on desktop, handled above) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full h-[450px] sm:h-[540px] lg:hidden"
                    >
                        <Lanyard
                            position={[0, 0, 18]}
                            fov={18}
                            gravity={[0, -40, 0]}
                            frontImage="/images/profileDipa1.jpg"
                            imageFit="cover"
                            lanyardWidth={1}
                            sceneY={4.8}
                            height="100%"
                        />
                    </motion.div>

                    {/* Desktop: empty spacer to keep 2-col grid balanced */}
                    <div className="hidden lg:block" />
                </div>
            </div>
        </section>
    );
}
