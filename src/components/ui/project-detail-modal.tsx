"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User2, GitBranch, TrendingUp, Globe, Github, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
    labels: {
        role: string;
        workflow: string;
        impact: string;
        viewProject: string;
        viewCode: string;
        confidentialMsg: string;
    };
}

export function ProjectDetailModal({ project, onClose, labels }: ProjectDetailModalProps) {
    const isConfidential = project?.link === "CONFIDENTIAL";

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ type: "spring", damping: 28, stiffness: 320 }}
                        className="fixed left-[50%] top-[50%] z-[101] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] max-h-[90vh] overflow-y-auto border border-primary/10 bg-background shadow-2xl rounded-xl"
                    >
                        {/* Project Image */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 672px"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 text-muted-foreground">
                                    <GitBranch className="h-12 w-12 opacity-20" />
                                </div>
                            )}

                            {/* Gradient overlay for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

                            {/* Badge */}
                            {project.badge && (
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg border border-red-600">
                                        {project.badge}
                                    </span>
                                </div>
                            )}

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-10 rounded-full bg-background/70 backdrop-blur-sm p-2 opacity-80 hover:opacity-100 transition-opacity ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Title & Description */}
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="bg-[#0c262d] text-primary hover:bg-[#0c262d]/80 text-[10px] px-2 py-0.5 border border-primary/20"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
                                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                            </div>

                            <div className="h-px bg-border" />

                            {/* Role */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-md bg-primary/10 p-1.5">
                                        <User2 className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-primary">{labels.role}</span>
                                </div>
                                <p className="text-sm text-foreground pl-8">{project.role}</p>
                            </div>

                            {/* Workflow */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-md bg-primary/10 p-1.5">
                                        <GitBranch className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-primary">{labels.workflow}</span>
                                </div>
                                <ol className="relative space-y-3 pl-8 border-l border-primary/20 ml-[1.1rem]">
                                    {project.workflow.map((step, i) => (
                                        <li key={i} className="relative pl-4">
                                            <span className="absolute -left-[1.15rem] flex h-5 w-5 items-center justify-center rounded-full bg-[#0c262d] text-primary text-[9px] font-bold border border-primary/30">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm text-muted-foreground">{step}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Impact */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-md bg-primary/10 p-1.5">
                                        <TrendingUp className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-primary">{labels.impact}</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-8 leading-relaxed">{project.impact}</p>
                            </div>

                            <div className="h-px bg-border" />

                            {/* Actions */}
                            <div className="flex gap-3 flex-wrap items-center">
                                {isConfidential ? (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Lock className="h-4 w-4 text-primary" />
                                        <span>{labels.confidentialMsg}</span>
                                    </div>
                                ) : (
                                    <>
                                        <Button size="sm" asChild className="h-8 text-xs">
                                            <Link href={project.link} target="_blank" className="flex items-center gap-2">
                                                <Globe className="h-3 w-3 text-emerald-500" />
                                                {labels.viewProject}
                                            </Link>
                                        </Button>
                                        {project.github && project.github !== "#" && (
                                            <Button size="sm" variant="outline" asChild className="h-8 text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/50">
                                                <Link href={project.github} target="_blank" className="flex items-center gap-2">
                                                    <Github className="h-3 w-3 text-lime-500" />
                                                    {labels.viewCode}
                                                </Link>
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
