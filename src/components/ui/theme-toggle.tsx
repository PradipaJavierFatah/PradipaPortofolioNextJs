"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className={cn("h-8 w-8 rounded-full", className)} />;
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className={cn(
                "relative inline-flex h-8 w-8 items-center justify-center rounded-full",
                "text-foreground/60 hover:text-foreground hover:bg-white/10",
                "transition-all duration-200 focus-visible:outline-none",
                className
            )}
            title={resolvedTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
