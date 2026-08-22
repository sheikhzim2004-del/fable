"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen } from "@gravity-ui/icons";
import EbookCard from "../ebooks/EbookCard";

export default function FeaturedEbooksSection({ books = [] }) {
    const booksList = Array.isArray(books)
        ? books
        : (books?.books || books?.data || []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    };

    return (
        <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-[var(--bg-primary)]">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[var(--primary)]/15 via-[var(--secondary)]/10 to-transparent blur-[120px] rounded-full" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-md shadow-sm"
                        >
                            <Sparkles className="size-3.5 text-[var(--secondary)] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                                Curated Collection
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)]"
                        >
                            Featured <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Masterpieces</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
                        >
                            Handpicked digital releases crafted by independent authors. Read anytime, anywhere with seamless reader support.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 shrink-0"
                    >
                        <Link
                            href="/ebooks"
                            className="inline-flex items-center gap-2 font-semibold text-sm rounded-xl px-5 py-2.5 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all group"
                        >
                            <span>Explore All Books</span>
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                {booksList.length === 0 ? (
                    <div className="text-center py-16 rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
                        <BookOpen className="size-10 mx-auto text-[var(--text-secondary)] mb-3 opacity-60" />
                        <p className="text-base font-semibold text-[var(--text-primary)]">No featured ebooks available right now.</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">Check back soon for latest additions.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    >
                        {booksList.map((book, index) => (
                            <motion.div
                                key={book._id || book.id || index}
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className="h-full"
                            >
                                <EbookCard book={book} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}