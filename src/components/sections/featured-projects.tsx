

"use client";

import { motion } from "framer-motion";
import { FolderGit2, Globe, Github, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { ConfidentialModal } from "@/components/ui/confidential-modal";

interface FeaturedProjectsProps {
    variant?: "grid" | "marquee";
}

export function FeaturedProjects({ variant = "grid" }: FeaturedProjectsProps) {
    const { t } = useLanguage();
    const [showConfidential, setShowConfidential] = useState(false);

    // Combine all projects for the marquee view
    const allProjects = [...t.projects.data, ...t.projects.web, ...t.projects.design];

    return (
        <section id="projects" className="container py-20 px-4 overflow-hidden">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {t.projects.title}
                </h2>
                <p className="text-muted-foreground max-w-[42rem] sm:text-xl">
                    {t.projects.description}
                </p>
            </div>

            {variant === "marquee" ? (
                // MARQUEE VARIANT
                <div className="relative w-full">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    <div className="flex overflow-hidden -mx-4 py-4">
                        <motion.div
                            className="flex gap-6 px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 30, // Adjust speed here
                            }}
                            style={{ width: "max-content" }}
                        >
                            {/* Render list twice for seamless loop */}
                            {[...allProjects, ...allProjects].map((project, index) => (
                                <div
                                    key={`${index}-${project.title}`}
                                    className="w-[350px] flex-shrink-0"
                                >
                                    <ProjectCard
                                        project={project}
                                        index={index}
                                        t={t}
                                        disableAnimation
                                        onConfidentialClick={() => setShowConfidential(true)}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            ) : (
                // GRID VARIANT (Existing Categorized Layout)
                <div className="space-y-24">
                    {/* Data Section */}
                    {t.projects.data.length > 0 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-border flex-1" />
                                <h3 className="text-2xl font-bold text-primary px-4 border-x border-primary/20 bg-primary/5 py-1 rounded-full">
                                    {t.projects.categories.data}
                                </h3>
                                <div className="h-px bg-border flex-1" />
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {t.projects.data.map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        t={t}
                                        onConfidentialClick={() => setShowConfidential(true)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Web Section */}
                    {t.projects.web.length > 0 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-border flex-1" />
                                <h3 className="text-2xl font-bold text-primary px-4 border-x border-primary/20 bg-primary/5 py-1 rounded-full">
                                    {t.projects.categories.web}
                                </h3>
                                <div className="h-px bg-border flex-1" />
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {t.projects.web.map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        t={t}
                                        onConfidentialClick={() => setShowConfidential(true)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Design Section */}
                    {t.projects.design.length > 0 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-border flex-1" />
                                <h3 className="text-2xl font-bold text-primary px-4 border-x border-primary/20 bg-primary/5 py-1 rounded-full">
                                    {t.projects.categories.design}
                                </h3>
                                <div className="h-px bg-border flex-1" />
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {t.projects.design.map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        t={t}
                                        onConfidentialClick={() => setShowConfidential(true)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <ConfidentialModal
                isOpen={showConfidential}
                onClose={() => setShowConfidential(false)}
                description={t.projects.confidentialMsg}
            />
        </section>
    );
}

// Reusable Project Card Component
function ProjectCard({ project, index, t, disableAnimation = false, onConfidentialClick }: { project: any, index: number, t: any, disableAnimation?: boolean, onConfidentialClick?: () => void }) {
    const CardContent = (
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="relative aspect-video w-full overflow-hidden bg-muted group">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 text-muted-foreground group-hover:bg-secondary/30 transition-colors">
                        <FolderGit2 className="h-12 w-12 opacity-20" />
                    </div>
                )}
            </div>

            <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-sm mt-2">{project.description}</CardDescription>
            </CardHeader>

            <div className="flex-1 p-6 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 text-[10px] px-2 py-0.5 border border-primary/10">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <CardFooter className="flex gap-2 pt-0 mt-4">
                {project.link === "CONFIDENTIAL" ? (
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 group h-8 text-xs hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/50 transition-colors"
                        onClick={onConfidentialClick}
                    >
                        <div className="flex flex-row items-center justify-center gap-2">
                            <Lock className="h-3 w-3 text-orange-500" />
                            <span>Confidential</span>
                        </div>
                    </Button>
                ) : (
                    <Button size="sm" variant="outline" className="flex-1 group h-8 text-xs" asChild>
                        <Link href={project.link} target="_blank" className="flex flex-row items-center justify-center gap-2">
                            <Globe className="h-3 w-3 text-blue-500 group-hover:text-blue-600" />
                            <span>{t.projects.viewProject}</span>
                        </Link>
                    </Button>
                )}

            </CardFooter>
        </Card>
    );

    if (disableAnimation) {
        return CardContent;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            {CardContent}
        </motion.div>
    );
}
