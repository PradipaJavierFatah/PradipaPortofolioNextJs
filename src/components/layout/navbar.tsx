"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { t, locale, toggleLanguage } = useLanguage();

    const links = [
        { href: "/", label: t.nav.home },
        // { href: "/about", label: t.nav.about },
        { href: "/projects", label: t.nav.projects },
        { href: "/contact", label: t.nav.contact },
    ];

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-bold text-xl flex items-center gap-2"
                    onClick={handleLogoClick}
                >
                    {/* Hide full name on mobile to save space */}
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border/10">
                        {/* Light Mode Logo (Black) */}
                        <Image
                            src="/images/Favicon_Black.png"
                            alt="Logo"
                            fill
                            className="object-cover dark:hidden"
                        />
                        {/* Dark Mode Logo (White) */}
                        <Image
                            src="/images/Favicon_White.png"
                            alt="Logo"
                            fill
                            className="object-cover hidden dark:block"
                        />
                    </div>
                    {/* Hide full name on mobile to save space */}
                    <span className="hidden sm:inline-block">Pradipa Javier Fatah</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative",
                                pathname === link.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-[1.35rem] left-0 right-0 h-1 bg-primary rounded-t-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}

                    {/* Divider */}
                    <div className="h-6 w-px bg-border" />

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleLanguage}
                            className="relative overflow-hidden"
                            title={locale === 'en' ? "Switch to Indonesian" : "Ganti ke Bahasa Indonesia"}
                        >
                            <span className="sr-only">Toggle Language</span>
                            {/* Simple text or icon toggle */}
                            <span className={cn("text-xs font-bold transition-all", locale === 'en' ? "opacity-100 scale-100" : "opacity-0 absolute scale-0")}>ID</span>
                            <span className={cn("text-xs font-bold transition-all", locale === 'id' ? "opacity-100 scale-100" : "opacity-0 absolute scale-0")}>EN</span>
                            <Globe className="h-[1.2rem] w-[1.2rem] absolute opacity-20" />
                        </Button>
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleLanguage}
                    >
                        <span className="text-xs font-bold">{locale === 'en' ? 'ID' : 'EN'}</span>
                    </Button>
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden border-b bg-background"
                >
                    <nav className="flex flex-col p-4 gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-muted",
                                    pathname === link.href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    );
}
