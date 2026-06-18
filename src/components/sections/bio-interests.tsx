"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function BioInterests() {
    const { t } = useLanguage();

    return (
        <section className="container py-20 px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* Left: Bio Text */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                        {t.interests.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        {t.about.bio1}
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t.about.bio2}
                    </p>
                </motion.div>

                {/* Right: Venn Diagram */}
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/*
                     * Three-circle Venn diagram — SVG so circles overlap cleanly.
                     *
                     * Layout (viewBox 0 0 400 405):
                     *   Technology : cx=200 cy=140 r=120  → label at (200, 76)
                     *   Business   : cx=128 cy=270 r=120  → label at (90, 358)
                     *   Product    : cx=272 cy=270 r=120  → label at (310, 358)
                     *   INNOVATION badge centred at (200, 219) — inside triple-overlap zone
                     */}
                    <svg
                        viewBox="0 0 400 405"
                        className="w-full max-w-[420px]"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Venn diagram: Technology, Business, Product — at the intersection: Innovation"
                    >
                        {/* ── Circles ─────────────────────────────────── */}

                        {/* Technology — top, teal */}
                        <circle
                            cx="200" cy="140" r="120"
                            fill="rgba(16,163,127,0.38)"
                            stroke="rgba(16,163,127,0.82)"
                            strokeWidth="2"
                        />

                        {/* Business — bottom-left, amber */}
                        <circle
                            cx="128" cy="270" r="120"
                            fill="rgba(202,138,4,0.38)"
                            stroke="rgba(202,138,4,0.82)"
                            strokeWidth="2"
                        />

                        {/* Product — bottom-right, crimson */}
                        <circle
                            cx="272" cy="270" r="120"
                            fill="rgba(185,28,28,0.38)"
                            stroke="rgba(185,28,28,0.82)"
                            strokeWidth="2"
                        />

                        {/* ── Labels ───────────────────────────────────── */}

                        {/* Technology — upper non-overlapping zone */}
                        <text
                            x="200" y="76"
                            textAnchor="middle"
                            fill="#6ee7b7"
                            fontSize="15"
                            fontWeight="700"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                            {t.interests.diagram.tech}
                        </text>

                        {/* Business — lower-left non-overlapping zone */}
                        <text
                            x="90" y="360"
                            textAnchor="middle"
                            fill="#fde047"
                            fontSize="15"
                            fontWeight="700"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                            {t.interests.diagram.biz}
                        </text>

                        {/* Product — lower-right non-overlapping zone */}
                        <text
                            x="310" y="360"
                            textAnchor="middle"
                            fill="#fca5a5"
                            fontSize="15"
                            fontWeight="700"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                            {t.interests.diagram.prod}
                        </text>

                        {/* ── INNOVATION badge — triple-overlap centroid ── */}
                        <rect
                            x="128" y="202"
                            width="144" height="34"
                            rx="17"
                            fill="hsl(193,58%,8%)"
                            stroke="rgba(175,238,7,0.35)"
                            strokeWidth="1.5"
                        />
                        <text
                            x="200" y="224"
                            textAnchor="middle"
                            fill="#afee07"
                            fontSize="11.5"
                            fontWeight="800"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                            letterSpacing="2.5"
                        >
                            {t.interests.diagram.innovation.toUpperCase()}
                        </text>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
