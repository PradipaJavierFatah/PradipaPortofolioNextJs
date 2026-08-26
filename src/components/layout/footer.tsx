"use client";

import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container flex items-center justify-center h-24 py-10 md:py-0">
                <p className="text-center text-sm leading-loose text-muted-foreground">
                    &copy; 2026 Pradipa Javier Fatah. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
