"use client";

import dynamic from "next/dynamic";

const GitHubContributions = dynamic(
    () => import("@/components/sections/github-contributions").then(m => ({ default: m.GitHubContributions })),
    { ssr: false }
);
const BioInterests = dynamic(
    () => import("@/components/sections/bio-interests").then(m => ({ default: m.BioInterests })),
    { ssr: false }
);
const ExperienceSection = dynamic(
    () => import("@/components/sections/experience-section").then(m => ({ default: m.ExperienceSection })),
    { ssr: false }
);
const SkillsSection = dynamic(
    () => import("@/components/sections/skills-section").then(m => ({ default: m.SkillsSection })),
    { ssr: false }
);
const FeaturedProjects = dynamic(
    () => import("@/components/sections/featured-projects").then(m => ({ default: m.FeaturedProjects })),
    { ssr: false }
);
const SocialConnect = dynamic(
    () => import("@/components/sections/social-connect").then(m => ({ default: m.SocialConnect })),
    { ssr: false }
);
const ContactSection = dynamic(
    () => import("@/components/sections/contact-section").then(m => ({ default: m.ContactSection })),
    { ssr: false }
);

export function LazySections() {
    return (
        <>
            <GitHubContributions />
            <BioInterests />
            <ExperienceSection />
            <SkillsSection />
            <FeaturedProjects variant="marquee" showViewAll={true} />
            <SocialConnect />
            <ContactSection />
        </>
    );
}
