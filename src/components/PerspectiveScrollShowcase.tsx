"use client";

import { useRef } from "react";
import { motion, useTransform, useSpring, MotionValue, useScroll } from "framer-motion";

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
    // Hide cards that are more than 1 rotation away from the current view 
    // to avoid coplanar Z-fighting among multiple front-facing cards.
    const visibility = useTransform(progress, (p) => {
        return Math.abs(p - index) <= 1.0 ? "visible" : "hidden";
    });

    return (
        <motion.div
            style={{
                rotateX: index * 180,
                visibility
            }}
            className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.5)] [backface-visibility:hidden]"
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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Calculate global container rotation. 
    // We map the 0-1 scroll progress to (projects.length - 1) * 180 degrees.
    const totalRotation = Math.max(0, projects.length - 1) * 180;
    const rotateX = useTransform(springProgress, [0, 1], [0, totalRotation]);

    // Pass a progress value from 0 to (projects.length - 1) down to the children
    const normalizedProgress = useTransform(springProgress, [0, 1], [0, Math.max(0, projects.length - 1)]);

    if (!projects || projects.length === 0) return null;

    // We make the container height dynamic based on the number of projects.
    // E.g., 3 projects = 300vh tall area.
    const containerHeight = Math.max(projects.length * 100, 100);

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-black"
            style={{ height: `${containerHeight}vh` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center [perspective:1200px]">
                {/* Background Marquee Texts */}
                {projects.map((project, i) => (
                    <BackgroundText
                        key={`bg-${i}`}
                        index={i}
                        progress={normalizedProgress}
                        text={project.bgText}
                    />
                ))}

                {/* 3D Canvas */}
                <motion.div
                    style={{
                        rotateX,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-[90%] max-w-6xl aspect-[4/3] sm:aspect-[16/9] cursor-grab active:cursor-grabbing"
                >
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={`card-${i}`}
                            index={i}
                            progress={normalizedProgress}
                            project={project}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
