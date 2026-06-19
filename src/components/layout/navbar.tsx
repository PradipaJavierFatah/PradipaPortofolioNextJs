"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { t, locale, toggleLanguage } = useLanguage();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { href: "/", label: t.nav.home },
        { href: "/projects", label: t.nav.projects },
        { href: "/contact", label: t.nav.contact },
    ];

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full h-16 flex justify-center items-center px-4 pointer-events-none">
            {/* Liquid glass pill */}
            <div className={cn(
                "pointer-events-auto relative flex items-center gap-1 rounded-full px-2 h-11",
                "transition-all duration-500 ease-out",
                "bg-gradient-to-b from-white/[0.12] to-white/[0.05]",
                "backdrop-blur-2xl backdrop-saturate-200",
                "border border-white/[0.18]",
                "shadow-[0_2px_16px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.06)]",
                scrolled && "from-white/[0.16] to-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.06)]"
            )}>
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/10 transition-colors"
                    onClick={handleLogoClick}
                >
                    <div className="relative h-7 w-7 rounded-full overflow-hidden ring-1 ring-white/20">
                        <Image src="/images/Favicon_Black.png" alt="Logo" fill className="object-cover dark:hidden" />
                        <Image src="/images/Favicon_White.png" alt="Logo" fill className="object-cover hidden dark:block" />
                    </div>
                    <span className="hidden sm:inline-block text-sm font-semibold tracking-tight">Pradipa Javier Fatah</span>
                </Link>

                {/* Divider */}
                <div className="hidden md:block h-4 w-px bg-white/20 mx-1" />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-0.5">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200",
                                pathname === link.href
                                    ? "text-foreground"
                                    : "text-foreground/60 hover:text-foreground hover:bg-white/10"
                            )}
                        >
                            {pathname === link.href && (
                                <motion.span
                                    layoutId="pill-active"
                                    className="absolute inset-0 rounded-full bg-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{link.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Divider */}
                <div className="hidden md:block h-4 w-px bg-white/20 mx-1" />

                {/* Controls */}
                <div className="flex items-center gap-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleLanguage}
                        className="h-8 w-8 rounded-full text-foreground/60 hover:text-foreground hover:bg-white/10"
                        title={locale === "en" ? "Switch to Indonesian" : "Switch to English"}
                    >
                        <span className="text-xs font-bold">{locale === "en" ? "ID" : "EN"}</span>
                    </Button>

                    <ThemeToggle />

                    {/* Mobile toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-8 w-8 rounded-full text-foreground/60 hover:text-foreground hover:bg-white/10 md:hidden"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <X className="h-4 w-4" />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <Menu className="h-4 w-4" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>

                {/* Mobile dropdown — absolutely below pill */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className={cn(
                                "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2",
                                "min-w-[180px] rounded-2xl px-2 py-2",
                                "bg-gradient-to-b from-white/[0.14] to-white/[0.07]",
                                "backdrop-blur-2xl backdrop-saturate-200",
                                "border border-white/[0.18]",
                                "shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]"
                            )}
                        >
                            <nav className="flex flex-col gap-0.5">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150",
                                            pathname === link.href
                                                ? "bg-white/[0.14] text-foreground"
                                                : "text-foreground/60 hover:text-foreground hover:bg-white/10"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
