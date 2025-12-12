"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function SocialConnect({ className }: { className?: string }) {
    const { t } = useLanguage();

    const socials = [
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-10 w-10" />,
            description: t.socials.linkedin,
            href: t.links.linkedin,
            backColor: "bg-[#0077b5]", // LinkedIn Blue
            iconColor: "text-[#0077b5]",
            rank: "A"
        },
        {
            name: "Instagram",
            icon: <Instagram className="h-10 w-10" />,
            description: t.socials.instagram,
            href: t.links.instagram,
            backColor: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500", // Insta Gradient
            iconColor: "text-[#E1306C]", // Insta Pink
            rank: "K"
        },
        {
            name: "GitHub",
            icon: <Github className="h-10 w-10" />,
            description: t.socials.github,
            href: t.links.github,
            backColor: "bg-[#1a1a1a]", // GitHub Black
            iconColor: "text-[#1a1a1a]",
            rank: "Q"
        }
    ];

    return (
        <section className={`container py-16 px-4 ${className}`}>
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    {t.socials.title}
                </h2>
                <p className="text-muted-foreground max-w-[42rem]">
                    {t.socials.description}
                </p>
            </div>

            <div className="flex justify-center flex-wrap gap-8 max-w-5xl mx-auto">
                {socials.map((social, index) => (
                    <Link key={social.name} href={social.href} target="_blank" className="block group perspective-1000 w-64 h-96 cursor-pointer">
                        <div className="relative w-full h-full transition-all duration-700 ease-in-out transform-style-3d group-hover:rotate-y-180">

                            {/* Front Face: White Card with Brand Icon */}
                            <div className="absolute inset-0 w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center backface-hidden shadow-xl border-4 border-gray-100">
                                {/* Corner Indices (Top-Left) */}
                                <div className={`absolute top-4 left-4 flex flex-col items-center ${social.iconColor}`}>
                                    <span className="text-2xl font-bold font-mono leading-none">{social.rank}</span>
                                    <div className="scale-75 mt-1">
                                        {social.icon}
                                    </div>
                                </div>

                                {/* Corner Indices (Bottom-Right) - Inverted */}
                                <div className={`absolute bottom-4 right-4 flex flex-col items-center rotate-180 ${social.iconColor}`}>
                                    <span className="text-2xl font-bold font-mono leading-none">{social.rank}</span>
                                    <div className="scale-75 mt-1">
                                        {social.icon}
                                    </div>
                                </div>

                                {/* Center Big Icon */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`p-6 rounded-full bg-gray-50/50 ${social.iconColor}`}
                                >
                                    {/* Clone icon with bigger size */}
                                    <div className="transform scale-[2.5]">
                                        {social.icon}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Back Face: Brand Color Background */}
                            <div className={`absolute inset-0 w-full h-full ${social.backColor} rounded-2xl flex flex-col items-center justify-center backface-hidden rotate-y-180 shadow-xl border-4 border-white/10`}>
                                <h3 className="text-white font-bold text-2xl mb-2">{social.name}</h3>
                                <p className="text-white/90 font-medium mb-6 text-center px-4 text-sm leading-relaxed">
                                    {social.description}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-bold bg-white px-6 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                                    <span className="text-inherit">Visit Profile</span>
                                    <ExternalLink className="h-4 w-4 text-inherit" />
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
