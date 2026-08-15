"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Heart,
    Sparkles,
} from "@gravity-ui/icons";
import Image from "next/image";

const slides = [
    {
        id: 1,
        badge: "Digital Reading Community",
        title: "Fable - Ebook Sharing Platform",
        subtitle:
            "Discover, read, and share amazing ebooks with a community of passionate readers.",
        primaryButton: "Explore Ebooks",
        secondaryButton: "Share Your Book",
    },
    {
        id: 2,
        badge: "Discover Your Next Story",
        title: "Thousands of Stories, One Beautiful Place.",
        subtitle:
            "Find books that match your interests, save your favorites, and build your personal digital library.",
        primaryButton: "Browse Library",
        secondaryButton: "View Collections",
    },
    {
        id: 3,
        badge: "Share • Read • Connect",
        title: "Your Books Deserve to Be Shared.",
        subtitle:
            "Upload your favorite ebooks and connect with readers who love the same stories as you.",
        primaryButton: "Start Sharing",
        secondaryButton: "Learn More",
    },
];

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(nextSlide, 6000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const slide = slides[current];

    return (
        <section
            className="relative overflow-hidden bg-[var(--bg-primary)] py-8 sm:py-12 lg:py-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-[var(--primary)]/10 blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl"
                />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
                        backgroundSize: "45px 45px",
                    }}
                />
            </div>

            {/* =====================================================
          CONTAINER
      ====================================================== */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl">
                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl" />

                    {/* =================================================
              SLIDER CONTENT
          ================================================== */}
                    <div className="grid min-h-[620px] lg:min-h-[590px] lg:grid-cols-2">
                        {/* =================================================
                LEFT CONTENT
            ================================================== */}
                        <div className="relative z-10 flex items-center px-6 py-14 sm:px-10 lg:px-14 xl:px-16">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={slide.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -25 }}
                                    transition={{
                                        duration: 0.55,
                                        ease: "easeOut",
                                    }}
                                    className="w-full max-w-xl"
                                >
                                    {/* Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]"
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        {slide.badge}
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h1
                                        initial={{ opacity: 0, y: 25 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.5 }}
                                        className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    {/* Subtitle */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25, duration: 0.5 }}
                                        className="mt-6 max-w-lg text-base leading-7 text-[var(--text-secondary)] sm:text-lg"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    {/* CTA */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35, duration: 0.5 }}
                                        className="mt-8 flex flex-col gap-3 sm:flex-row"
                                    >
                                        <button
                                            type="button"
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--primary)]/30"
                                        >
                                            {slide.primaryButton}

                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-3.5 font-semibold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                            {slide.secondaryButton}
                                        </button>
                                    </motion.div>

                                    {/* Stats */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-10 flex flex-wrap items-center gap-5 border-t border-[var(--border-color)] pt-6"
                                    >
                                        <div>
                                            <p className="text-xl font-bold text-[var(--text-primary)]">
                                                10K+
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                                Ebooks
                                            </p>
                                        </div>

                                        <div className="h-8 w-px bg-[var(--border-color)]" />

                                        <div>
                                            <p className="text-xl font-bold text-[var(--text-primary)]">
                                                5K+
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                                Readers
                                            </p>
                                        </div>

                                        <div className="h-8 w-px bg-[var(--border-color)]" />

                                        <div>
                                            <p className="text-xl font-bold text-[var(--text-primary)]">
                                                4.9/5
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                                Rating
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* =================================================
                RIGHT VISUAL
            ================================================== */}
                        <div className="relative hidden min-h-[590px] items-center justify-center lg:flex">
                            
                            {/* Small decorative dots */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                }}
                                className="absolute right-28 top-28 h-3 w-3 rounded-full bg-[var(--secondary)]"
                            />

                            <motion.div
                                animate={{
                                    y: [0, 10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                                className="absolute bottom-28 left-24 h-2.5 w-2.5 rounded-full bg-[var(--primary)]"
                            />

                            {/* =================================================
                  MAIN BOOK
              ================================================== */}
                            <div className="relative flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        y: [0, -12, 0],
                                        rotate: [-1, 1, -1],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative flex items-center justify-center"
                                >
                                    {/* ১. মূল বই ইমেজ */}
                                    <Image
                                        src="/images/banner-image.png"
                                        alt="Main Book"
                                        width={600}
                                        height={500}
                                        priority
                                        className="relative object-contain"
                                    />

                                    {/* ২. বইয়ের ঠিক ওপরে ছড়ানো সফট লাইট পিঙ্ক গ্লো (Static Overlay Glow) */}
                                    <div
                                        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-52 rounded-full bg-pink-300/35 blur-3xl pointer-events-none mix-blend-screen z-20"
                                    />

                                    {/* ৩. বইয়ের ভাঁজের মাঝখানে উজ্জ্বল সাদা আলোর কেন্দ্রবিন্দু (Pure White Core Light) */}
                                    <div
                                        className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 rounded-full bg-white/70 blur-xl pointer-events-none mix-blend-screen z-20"
                                    />
                                </motion.div>
                            </div>

                            {/* =================================================
                  FLOATING SHARE CARD
              ================================================== */}
                            <motion.div
                                animate={{
                                    y: [0, -14, 0],
                                    x: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute left-4 top-24 z-30 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondary)]/10">
                                        {/* CSS share symbol */}
                                        <span className="absolute h-2.5 w-2.5 rounded-full bg-[var(--secondary)]" />
                                        <span className="absolute -left-0.5 top-2 h-2.5 w-2.5 rounded-full bg-[var(--secondary)]" />
                                        <span className="absolute -right-0.5 bottom-2 h-2.5 w-2.5 rounded-full bg-[var(--secondary)]" />

                                        <span className="absolute left-1.5 top-[13px] h-0.5 w-5 rotate-[28deg] bg-[var(--secondary)]" />
                                        <span className="absolute left-1.5 bottom-[13px] h-0.5 w-5 -rotate-[28deg] bg-[var(--secondary)]" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                                            Share
                                        </p>

                                        <p className="text-xs text-[var(--text-secondary)]">
                                            With your community
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* =================================================
                  FLOATING LIBRARY CARD
              ================================================== */}
                            <motion.div
                                animate={{
                                    y: [0, 12, 0],
                                    x: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 4.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute bottom-24 right-2 z-30 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-success)]/10">
                                        <BookOpen className="h-5 w-5 text-[var(--accent-success)]" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                                            Your Library
                                        </p>

                                        <p className="text-xs text-[var(--text-secondary)]">
                                            Read anywhere
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* =================================================
                  FLOATING HEART
              ================================================== */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.15, 1],
                                    rotate: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute right-16 top-20 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--secondary)] shadow-lg"
                            >
                                <Heart className="h-5 w-5" />
                            </motion.div>
                        </div>
                    </div>

                    {/* =================================================
              SLIDER CONTROLS
          ================================================== */}
                    <div className="absolute bottom-5 left-5 right-5 z-40 flex items-center justify-between sm:bottom-7 sm:left-10 sm:right-10">
                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {slides.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setCurrent(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${current === index
                                        ? "w-8 bg-[var(--primary)]"
                                        : "w-2 bg-[var(--text-secondary)]/30 hover:bg-[var(--secondary)]"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Previous / Next */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="Previous slide"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="Next slide"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}