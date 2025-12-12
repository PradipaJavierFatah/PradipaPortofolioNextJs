"use client";

import { FeaturedProjects } from "@/components/sections/featured-projects";
import { useLanguage } from "@/lib/language-context";

export function ProjectsClient() {
    const { t } = useLanguage();

    return (
        <div className="container py-20 lg:py-32">
            <div className="max-w-2xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6">
                    {t.projectsPage?.title || "Projects"}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {t.projectsPage?.description || "A collection of projects."}
                </p>
            </div>

            <div className="-mt-20">
                <FeaturedProjects variant="grid" />
            </div>
        </div>
    );
}
