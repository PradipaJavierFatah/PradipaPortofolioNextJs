
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";

import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ContactSection } from "@/components/sections/contact-section";
import { SocialConnect } from "@/components/sections/social-connect";
import { BioInterests } from "@/components/sections/bio-interests";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-background">
            <HeroSection />
            <BioInterests />
            <ExperienceSection />
            <SkillsSection />
            <FeaturedProjects variant="marquee" />
            <SocialConnect />
            <ContactSection />
        </main>
    );
}


