"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the trailing glow
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only show custom cursor on devices that support hover (non-touch)
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            setIsVisible(true);
        }

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-normal">
            {/* Trailing Neon Glow */}
            <motion.div
                className="absolute left-0 top-0 h-4 w-4 bg-orange-500/50 dark:bg-orange-500/80 rounded-full blur-md"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />

            {/* Direct Cursor (Figma Arrow) */}
            <motion.div
                className="absolute left-0 top-0"
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
            >
                {/* Figma-style SVG Arrow with Neon Stroke */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] dark:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-colors duration-300"
                >
                    <path
                        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19138L15.6493 12.3673H5.65376Z"
                        className="fill-zinc-100 dark:fill-zinc-950 stroke-orange-600 dark:stroke-orange-500 stroke-[1.5]"
                    />
                </svg>
            </motion.div>
        </div>
    );
}
