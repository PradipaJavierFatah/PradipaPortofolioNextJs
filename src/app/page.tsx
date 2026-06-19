
import { HeroSection } from "@/components/sections/hero-section";
import { LazySections } from "@/components/lazy-sections";

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col bg-background">
            {/* GLOBAL SQUIGGLE PATTERN */}
            <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none -z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-50 200 C 50 50, 150 50, 200 200 S 350 350, 450 200' stroke='%23afee07' stroke-width='40' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundSize: '800px 800px'
                }}
            />

            <HeroSection />
            <LazySections />
        </main>
    );
}


