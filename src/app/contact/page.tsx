"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, User, Mail, MessageSquare, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { sendEmail } from "./actions";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
    const { t } = useLanguage();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("submitting");
        setErrors(null);

        const formData = new FormData(event.currentTarget);

        const result = await sendEmail(null, formData);

        if (result.success) {
            setStatus("success");
            (event.target as HTMLFormElement).reset();
        } else {
            setStatus("error");
            if (result.errors) {
                setErrors(result.errors);
            } else {
                console.error(result.message);
                // Fallback for non-validation errors
                setErrors({ form: [result.message || t.contact.errorMsg] });
            }
        }
    }

    return (
        <div className="container py-20 lg:py-32 max-w-4xl px-4">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    {t.contact.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t.contact.subtitle}
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
            >
                {/* Decorative background element */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl -z-10" />

                <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Input */}
                            <div className="space-y-2 group">
                                <label htmlFor="name" className="text-sm font-semibold flex items-center gap-2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <User className="w-4 h-4" />
                                    {t.contact.name}
                                </label>
                                <div className="relative">
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="John Doe"
                                        className={`flex h-12 w-full rounded-xl border bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${errors?.name ? "border-red-500 ring-red-500/20" : "border-input group-hover:border-primary/50"
                                            }`}
                                    />
                                    {errors?.name && (
                                        <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                                            {errors.name[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2 group">
                                <label htmlFor="email" className="text-sm font-semibold flex items-center gap-2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Mail className="w-4 h-4" />
                                    {t.contact.email}
                                </label>
                                <div className="relative">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className={`flex h-12 w-full rounded-xl border bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${errors?.email ? "border-red-500 ring-red-500/20" : "border-input group-hover:border-primary/50"
                                            }`}
                                    />
                                    {errors?.email && (
                                        <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                                            {errors.email[0]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Subject Input */}
                        <div className="space-y-2 group">
                            <label htmlFor="subject" className="text-sm font-semibold flex items-center gap-2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                <Tag className="w-4 h-4" />
                                {t.contact.subject}
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    placeholder="Project Inquiry"
                                    className={`flex h-12 w-full rounded-xl border bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${errors?.subject ? "border-red-500 ring-red-500/20" : "border-input group-hover:border-primary/50"
                                        }`}
                                />
                                {errors?.subject && (
                                    <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                                        {errors.subject[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="space-y-2 group">
                            <label htmlFor="message" className="text-sm font-semibold flex items-center gap-2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                {t.contact.message}
                            </label>
                            <div className="relative">
                                <textarea
                                    required
                                    name="message"
                                    id="message"
                                    placeholder="Tell me about your project..."
                                    className={`flex min-h-[160px] w-full rounded-xl border bg-background/50 px-4 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none ${errors?.message ? "border-red-500 ring-red-500/20" : "border-input group-hover:border-primary/50"
                                        }`}
                                />
                                {errors?.message && (
                                    <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                                        {errors.message[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons & Status */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                disabled={status === "submitting"}
                            >
                                {status === "submitting" ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        {t.contact.sending}
                                    </span>
                                ) : status === "success" ? (
                                    <span className="flex items-center gap-2 text-green-100">
                                        <CheckCircle2 className="h-5 w-5" />
                                        {t.contact.successMsg}
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Send className="h-5 w-5" />
                                        {t.contact.send}
                                    </span>
                                )}
                            </Button>

                            {/* Global Error/Success Feedback */}
                            {errors?.form && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.form[0]}
                                </motion.div>
                            )}

                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium text-center"
                                >
                                    {t.contact.successMsg}
                                </motion.div>
                            )}
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
