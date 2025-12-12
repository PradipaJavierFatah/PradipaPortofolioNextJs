"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/data";

export function ContactSection() {
    return (
        <section id="contact" className="container py-20 md:py-32">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center gap-4 text-center rounded-2xl bg-primary/5 p-8 md:p-16 border border-primary/10"
            >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Let&apos;s Work Together
                </h2>
                <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8 mb-4">
                    I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/contact" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> Say Hello
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}
