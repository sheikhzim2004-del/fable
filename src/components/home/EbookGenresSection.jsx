"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import {
    Compass,
    BookOpen,
    Ghost,
    Heart,
    HourglassEnd,
    Sparkles,
    ShieldCheck,
    Cpu
} from "@gravity-ui/icons";

const genres = [
    {
        name: "Fiction",
        slug: "fiction",
        icon: BookOpen,
        count: "120+ Books",
        color: "from-blue-500/20 to-indigo-500/10 text-blue-500",
    },
    {
        name: "Romance",
        slug: "romance",
        icon: Heart,
        count: "70+ Books",
        color: "from-rose-500/20 to-pink-500/10 text-rose-500",
    },
    {
        name: "Technology & Code",
        slug: "technology",
        icon: Cpu,
        count: "110+ Books",
        color: "from-emerald-500/20 to-teal-500/10 text-emerald-500",
    },
     {
        name: "History",
        slug: "history",
        icon: HourglassEnd,
        count: "60+ Books",
        color: "from-cyan-500/20 to-blue-500/10 text-cyan-500",
    },
    {
        name: "Mystery & Thriller",
        slug: "mystery",
        icon: Compass,
        count: "85+ Books",
        color: "from-amber-500/20 to-orange-500/10 text-amber-500",
    },
    {
        name: "Fantasy & Magic",
        slug: "fantasy",
        icon: Sparkles,
        count: "95+ Books",
        color: "from-purple-500/20 to-pink-500/10 text-purple-500",
    },
    {
        name: "Horror & Dark",
        slug: "horror",
        icon: Ghost,
        count: "45+ Books",
        color: "from-red-500/20 to-zinc-500/10 text-red-500",
    },
    {
        name: "Self-Growth",
        slug: "self-help",
        icon: ShieldCheck,
        count: "90+ Books",
        color: "from-teal-500/20 to-cyan-500/10 text-teal-500",
    },
];

export default function EbookGenresSection() {
    return (
        <section className="relative w-full overflow-hidden bg-[var(--bg-primary)] py-16 sm:py-24">
            <div className="relative mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mx-auto max-w-xl space-y-3 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3.5 py-1.5 shadow-sm"
                    >
                        <Compass className="size-3.5 text-[var(--secondary)]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                            Categories
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
                    >
                        Explore by <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Genre</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="text-sm sm:text-base text-[var(--text-secondary)]"
                    >
                        Dive into your preferred worlds. Select a category to instantly browse tailored collections.
                    </motion.p>
                </div>

                {/* Genres Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
                    {genres.map((genre, index) => {
                        const Icon = genre.icon;

                        return (
                            <motion.div
                                key={genre.slug}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -4 }}
                                className="h-full"
                            >
                                <Link href={`/ebooks?genre=${genre.slug}`} className="block h-full">
                                    <Card className="group relative flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-center transition-all duration-300 hover:border-[var(--primary)]/60 hover:shadow-xl hover:shadow-[var(--primary)]/10">

                                        {/* Icon Wrapper */}
                                        <div className={`mb-3 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${genre.color} border border-current/10 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                                            <Icon className="size-6 text-current" />
                                        </div>

                                        {/* Genre Name */}
                                        <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary)]">
                                            {genre.name}
                                        </h3>

                                        {/* Books Count */}
                                        <span className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
                                            {genre.count}
                                        </span>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}