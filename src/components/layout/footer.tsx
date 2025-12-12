"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container flex items-center justify-center h-24 py-10 md:py-0">
                <p className="text-center text-sm leading-loose text-muted-foreground">
                    &copy; 2025 Pradipa Javier Fatah. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
