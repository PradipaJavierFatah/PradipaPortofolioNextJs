
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
        <main className="relative flex min-h-screen flex-col bg-background space-y-16 sm:space-y-32 overflow-hidden">
            {/* GLOBAL SQUIGGLE PATTERN */}
            <div 
                className="absolute inset-0 opacity-[0.07] pointer-events-none -z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-50 200 C 50 50, 150 50, 200 200 S 350 350, 450 200' stroke='%23afee07' stroke-width='40' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundSize: '800px 800px'
                }}
            />

            <HeroSection />
            <BioInterests />
            <ExperienceSection />
            <SkillsSection />
            <FeaturedProjects variant="marquee" showViewAll={true} />
            <SocialConnect />
            <ContactSection />
        </main>
    );
}


