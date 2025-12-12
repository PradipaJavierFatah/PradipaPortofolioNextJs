import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/lib/language-context";

import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Pradipa Javier Fatah | Portfolio",
    description: "Portfolio of Pradipa Javier Fatah, an aspiring Software Engineer and Computer Science Student focused on scalable web applications.",

};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.variable, "min-h-screen bg-background font-sans antialiased")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LanguageProvider>
                        <CustomCursor />
                        <Navbar />
                        <div className="flex-1">
                            {children}
                        </div>
                        <Footer />
                        <ScrollToTop />
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
