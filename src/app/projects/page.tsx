import type { Metadata } from "next";
import { ProjectsClient } from "@/components/pages/projects-client";

export const metadata: Metadata = {
    title: "Projects | Pradipa Javier Fatah",
    description: "A showcase of my technical projects and experiments.",
};

export default function ProjectsPage() {
    return <ProjectsClient />;
}
