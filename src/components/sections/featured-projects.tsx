"use client";

import { motion } from "framer-motion";
import { FolderGit2, Globe, Github, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { ProjectDetailModal } from "@/components/ui/project-detail-modal";

interface Project {
    title: string;
    description: string;
    role: string;
    workflow: string[];
    impact: string;
    techStack: string[];
    link: string;
    github?: string;
    image?: string;
    badge?: string;
}

interface FeaturedProjectsProps {
    variant?: "grid" | "marquee";
    showViewAll?: boolean;
}

export function FeaturedProjects({ variant = "grid", showViewAll = false }: FeaturedProjectsProps) {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const allProjects = [...t.projects.data, ...t.projects.web, ...t.projects.design] as Project[];

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
                                duration: 50,
                            }}
                            style={{ width: "max-content" }}
                        >
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
                                        eagerLoad
                                        onProjectClick={setSelectedProject}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            ) : (
                // GRID VARIANT
                <div className="space-y-24">
                    {/* Data Section */}
                    {t.projects.data.length > 0 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-border flex-1" />
                                <h3 className="text-xl font-bold bg-[#0c262d] text-primary px-6 py-2 rounded-full border border-primary/20">
                                    {t.projects.categories.data}
                                </h3>
                                <div className="h-px bg-border flex-1" />
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(t.projects.data as Project[]).map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        t={t}
                                        onProjectClick={setSelectedProject}
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
                                <h3 className="text-xl font-bold bg-[#0c262d] text-primary px-6 py-2 rounded-full border border-primary/20">
                                    {t.projects.categories.web}
                                </h3>
                                <div className="h-px bg-border flex-1" />
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(t.projects.web as Project[]).map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        t={t}
                                        onProjectClick={setSelectedProject}
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
                                <h3 className="text-xl font-bold bg-[#0c262d] text-primary px-6 py-2 rounded-full border border-primary/20">
                                    {t.projects.categories.design}
                                </h3>
                                <div className="h-px bg-border flex-1" />
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(t.projects.design as Project[]).map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        t={t}
                                        onProjectClick={setSelectedProject}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* View All Projects Button */}
            {showViewAll && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 flex justify-center"
                >
                    <Button size="lg" asChild className="h-12 px-8 text-base bg-primary hover:bg-primary/90 rounded-full group">
                        <Link href="/projects" className="flex items-center gap-2">
                            {t.projects.viewAll} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>
            )}

            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                labels={{
                    role: t.projects.labels.role,
                    workflow: t.projects.labels.workflow,
                    impact: t.projects.labels.impact,
                    viewProject: t.projects.viewProject,
                    viewCode: t.projects.viewCode,
                    confidentialMsg: t.projects.confidentialMsg,
                }}
            />
        </section>
    );
}

function ProjectCard({
    project,
    index,
    t,
    disableAnimation = false,
    eagerLoad = false,
    onProjectClick,
}: {
    project: Project;
    index: number;
    t: any;
    disableAnimation?: boolean;
    eagerLoad?: boolean;
    onProjectClick?: (project: Project) => void;
}) {
    const isConfidential = project.link === "CONFIDENTIAL";

    const cardContent = (
        <Card
            className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-primary/20 bg-card/50 backdrop-blur-sm cursor-pointer group/card"
            onClick={() => onProjectClick?.(project)}
        >
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        loading={eagerLoad ? "eager" : "lazy"}
                        className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 text-muted-foreground group-hover/card:bg-secondary/30 transition-colors">
                        <FolderGit2 className="h-12 w-12 opacity-20" />
                    </div>
                )}
                {project.badge && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg border border-red-600">
                            {project.badge}
                        </span>
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
                        <Badge key={tag} variant="secondary" className="bg-[#0c262d] text-primary hover:bg-[#0c262d]/80 text-[10px] px-2 py-0.5 border border-primary/20">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <CardFooter
                className="flex gap-2 pt-0 mt-4"
                onClick={(e) => e.stopPropagation()}
            >
                {isConfidential ? (
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 group h-8 text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors"
                        onClick={() => onProjectClick?.(project)}
                    >
                        <div className="flex flex-row items-center justify-center gap-2">
                            <Lock className="h-3 w-3 text-primary" />
                            <span>Confidential</span>
                        </div>
                    </Button>
                ) : (
                    <>
                        <Button size="sm" variant="outline" className="flex-1 group h-8 text-xs" asChild>
                            <Link href={project.link} target="_blank" className="flex flex-row items-center justify-center gap-2">
                                <Globe className="h-3 w-3 text-emerald-500 group-hover:text-emerald-400" />
                                <span>{t.projects.viewProject}</span>
                            </Link>
                        </Button>

                        {project.github && project.github !== "#" && (
                            <Button size="sm" variant="outline" className="flex-1 group h-8 text-xs" asChild>
                                <Link href={project.github} target="_blank" className="flex flex-row items-center justify-center gap-2">
                                    <Github className="h-3 w-3 text-lime-500 group-hover:text-lime-400" />
                                    <span>{t.projects.viewCode}</span>
                                </Link>
                            </Button>
                        )}
                    </>
                )}
            </CardFooter>
        </Card>
    );

    if (disableAnimation) {
        return cardContent;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            {cardContent}
        </motion.div>
    );
}
