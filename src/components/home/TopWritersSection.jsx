"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { Medal, Flame } from "@gravity-ui/icons";

export default function TopWritersSection({ writers = [] }) {
    const writersList = Array.isArray(writers) ? writers : [];

    const defaultAuthorImage = "https://i.ibb.co.com/Y4GsWh90/f093616966f89ad84bbb2f5c80989d22.jpg";

    return (
        <section className="relative w-full overflow-hidden bg-[var(--bg-primary)] py-16 sm:py-24">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-r from-[var(--primary)]/10 via-[var(--secondary)]/10 to-transparent blur-[120px] rounded-full" />

            <div className="relative mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-xl space-y-3 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3.5 py-1.5 shadow-sm"
                    >
                        <Medal className="size-3.5 text-amber-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                            Hall of Fame
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
                    >
                        Top <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Authors</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="text-sm sm:text-base text-[var(--text-secondary)]"
                    >
                        Meet our most celebrated creators with record-breaking digital sales.
                    </motion.p>
                </div>

                {/* 3 Writers Grid */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                    {writersList.map((writer, index) => {
                        const name = writer.name || writer.writerName || "Featured Author";
                        const totalSold = writer.totalSales || writer.salesCount || "500+";

                        // Profile Image Check with fallback
                        const writerImg = writer.image || writer.avatar || writer.photoURL;
                        const validImage = (writerImg && typeof writerImg === "string" && writerImg.trim() !== "")
                            ? writerImg
                            : defaultAuthorImage;

                        const rankStyles = [
                            "border-amber-500/40 bg-amber-500/15 text-amber-500",
                            "border-slate-400/40 bg-slate-400/15 text-slate-400",
                            "border-amber-700/40 bg-amber-700/15 text-amber-600",
                        ];

                        return (
                            <motion.div
                                key={writer._id || index}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                whileHover={{ scale: 1.04, y: -5 }}
                                className="h-full"
                            >
                                <Card className="relative flex flex-col items-center rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-center shadow-lg transition-all duration-300 hover:border-[var(--primary)]/60 hover:shadow-2xl hover:shadow-[var(--primary)]/10">

                                    {/* Rank Badge */}
                                    <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-0.5 text-xs font-black shadow-sm ${rankStyles[index] || rankStyles[0]}`}>
                                        #{index + 1}
                                    </span>

                                    {/* Profile Image */}
                                    <div className="relative mb-4 mt-2 size-24">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] opacity-40 blur-md animate-pulse" />
                                        <div className="relative size-full overflow-hidden rounded-full border-2 border-[var(--primary)] shadow-md ring-2 ring-[var(--bg-secondary)]">
                                            <Image
                                                src={validImage}
                                                alt={name}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Name & Bio */}
                                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                                        {name}
                                    </h3>

                                    <p className="mt-1 line-clamp-1 text-xs text-[var(--text-secondary)]">
                                        {writer.bio || "Bestselling independent storyteller"}
                                    </p>

                                    {/* Total Sales */}
                                    <div className="mt-5 flex w-full items-center justify-between border-t border-[var(--border-color)]/70 pt-4 text-xs">
                                        <span className="font-medium text-[var(--text-secondary)]">Total Sold:</span>
                                        <span className="flex items-center gap-1 font-extrabold text-[var(--accent-success)]">
                                            <Flame className="size-3.5 text-amber-500" />
                                            {totalSold} copies
                                        </span>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}