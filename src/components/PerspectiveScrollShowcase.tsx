"use client";

import { useRef, useEffect } from "react";
import { motion, useTransform, useSpring, MotionValue, useMotionValue } from "framer-motion";

export interface Project {
    title: string;
    tags: string[];
    bgText: string;
    src: string;
}

interface PerspectiveScrollShowcaseProps {
    projects: Project[];
}

const BackgroundText = ({
    text,
    index,
    progress
}: {
    text: string;
    index: number;
    progress: MotionValue<number>;
}) => {
    // Hard step swap exactly at halfway points
    const opacity = useTransform(progress, (p) => {
        return (p >= index - 0.5 && p < index + 0.5) ? 1 : 0;
    });

    // Smooth scroll translation based on local progress
    const x = useTransform(progress, (p) => {
        const localP = p - index;
        return `${localP * -30}%`;
    });

    return (
        <motion.div
            style={{ opacity, x }}
            className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none"
        >
            <h1 className="text-[15vw] font-black text-white/10 uppercase tracking-tighter mix-blend-overlay">
                {text}
            </h1>
        </motion.div>
    );
};

const ProjectCard = ({
    project,
    index,
    progress,
}: {
    project: Project;
    index: number;
    progress: MotionValue<number>;
}) => {
    // Instantly flip visibility at exactly 180 degree points (x.5 progress)
    const opacity = useTransform(progress, (p) => {
        return (p >= index - 0.5 && p < index + 0.5) ? 1 : 0;
    });

    return (
        <motion.div
            style={{ opacity }}
            className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl"
        >
            <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover opacity-90"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

            {/* Metadata Overlay */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex flex-col gap-3 w-full">
                <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                    {project.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm sm:text-base font-medium text-white border border-white/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function PerspectiveScrollShowcase({ projects }: PerspectiveScrollShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = useMotionValue(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const maxProgress = Math.max(0, projects.length - 1);

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const current = progress.get();
            // Sensitivity tuned so ~1 scroll chunk completes 1 rotation perfectly
            let next = current + e.deltaY * 0.0015;
            next = Math.max(0, Math.min(maxProgress, next));
            progress.set(next);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const current = progress.get();
            let next = current + deltaY * 0.003;
            next = Math.max(0, Math.min(maxProgress, next));
            progress.set(next);
        };

        // Use passive: false so we have permission to cancel native scroll
        el.addEventListener("wheel", handleWheel, { passive: false });
        el.addEventListener("touchstart", handleTouchStart, { passive: false });
        el.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            el.removeEventListener("wheel", handleWheel);
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
        };
    }, [progress, projects.length]);

    const springProgress = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Calculate global rotation (1 progress unit = 360 degrees)
    // This causes each image mapped sequentially to have 1 full 360 rotation cycle forward and backwards
    const rotateX = useTransform(springProgress, (p) => p * 360);

    // Calculate synchronized scaling (shrinks to 0.7x exactly midway through a flip at 180 degrees)
    const scale = useTransform(springProgress, (p) => {
        // Math.sin(p * PI) creates a pulsating rhythm perfectly synced with the 180 degree flip
        return 1 - Math.abs(Math.sin(p * Math.PI)) * 0.3;
    });

    if (!projects || projects.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center [perspective:1200px]"
        >
            {/* Background Marquee Texts */}
            {projects.map((project, i) => (
                <BackgroundText
                    key={`bg-${i}`}
                    index={i}
                    progress={springProgress}
                    text={project.bgText}
                />
            ))}

            {/* 3D Canvas */}
            <motion.div
                style={{
                    rotateX,
                    scale,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-[90%] max-w-6xl aspect-[4/3] sm:aspect-[16/9] shadow-[0_0_100px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing"
            >
                {projects.map((project, i) => (
                    <ProjectCard
                        key={`card-${i}`}
                        index={i}
                        progress={springProgress}
                        project={project}
                    />
                ))}
            </motion.div>
        </div>
    );
}
