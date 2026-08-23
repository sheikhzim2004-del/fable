"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import {
    BookOpen,
    Compass,
    ArrowRight,
    Sparkles,
    Bookmark,
    Flame,
} from "@gravity-ui/icons";

export default function ReaderDashboard({ user, purchases=[], recommendedBooks = [] }) {
    // Static demo name — porokale Auth session theke dynamic kore nite hobe
    const userName = user?.name;
    // console.log("user name", userName)

    console.log("purchacses", purchases)
    const purchasesCount = purchases.length;

    // Quick stats card er data
    const stats = [
        { label: "Purchased Books", count: purchasesCount, icon: BookOpen, color: "text-brand-primary" },
        { label: "Bookmarked", count: "5", icon: Bookmark, color: "text-secondary-accent" },
    ];


    return (
        <div className="min-h-screen w-full space-y-8 bg-bg-primary p-4 text-text-primary sm:p-6 lg:p-8">
            {/* 1. Welcome + Quick Start Banner */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-3xl border border-border-color bg-gradient-to-br from-bg-secondary via-bg-secondary to-brand-primary/10 p-6 shadow-lg sm:p-10"
            >
                <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-brand-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-20 h-36 w-36 rounded-full bg-secondary-accent/10 blur-2xl" />

                <div className="relative z-10 max-w-2xl space-y-4">
                    <Chip
                        variant="soft"
                        color="primary"
                        size="sm"
                        className="gap-1.5 border border-brand-primary/30 text-xs font-semibold"
                    >
                        <Sparkles className="size-3.5" />
                        Reader Space
                    </Chip>

                    <h1 className="text-2xl font-black tracking-tight text-text-primary sm:text-4xl">
                        Welcome back, <span className="bg-brand-primary bg-clip-text text-transparent">{userName}</span> 👋
                    </h1>

                    <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                        Ready to continue your reading journey? Pick up right where you left off or discover trending masterpieces today.
                    </p>

                    {/* CTA buttons — Link diye wrap kora, as prop confirm kora nai tai */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link href="/dashboard/reader/purchase-book">
                            <Button className="gap-2 rounded-xl bg-brand-primary font-medium text-white shadow-md shadow-brand-primary/20 transition-all hover:opacity-90">
                                <BookOpen className="size-4" />
                                My Purchased Ebooks
                            </Button>
                        </Link>

                        <Link href="/ebooks">
                            <Button
                                variant="bordered"
                                className="gap-2 rounded-xl border-border-color font-medium text-text-primary hover:border-secondary-accent"
                            >
                                <Compass className="size-4 text-secondary-accent" />
                                Explore Ebooks
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* 2. Quick Overview Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex flex-row items-center justify-between rounded-2xl border border-border-color bg-bg-secondary p-5 shadow-sm"
                        >
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    {item.label}
                                </p>
                                <p className="mt-1 text-2xl font-black text-text-primary">
                                    {item.count}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border-color bg-bg-primary p-3 shadow-inner">
                                <Icon className={`size-6 ${item.color}`} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* 3. Recommended / Trending Ebooks */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Flame className="size-5 text-amber-500" />
                        <h2 className="text-xl font-black tracking-tight text-text-primary">
                            Recommended for You
                        </h2>
                    </div>
                    <Link
                        href="/ebooks"
                        className="flex items-center gap-1 text-xs font-semibold text-secondary-accent hover:underline sm:text-sm"
                    >
                        Browse All <ArrowRight className="size-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {recommendedBooks.map((book) => (
                        <div
                            key={book._id}
                            className="group overflow-hidden rounded-2xl border border-border-color bg-bg-secondary p-4 shadow-sm transition-all duration-300 hover:border-brand-primary/60"
                        >
                            <div className="flex gap-4">
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="h-28 w-20 shrink-0 rounded-xl border border-border-color object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="flex min-w-0 flex-1 flex-col justify-between">
                                    <div>
                                        <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-secondary-accent">
                                            {book.genre}
                                        </span>
                                        <h4 className="mt-0.5 line-clamp-1 text-sm font-bold text-text-primary">
                                            {book.title}
                                        </h4>
                                        <p className="truncate text-xs text-text-secondary">
                                            by {book.author}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-border-color/50 pt-2">
                                        <span className={`text-xs font-bold ${book.isFree ? "text-accent-success" : "text-text-primary"}`}>
                                            {book.price}
                                        </span>
                                        <Link href={`/ebooks/${book._id}`}>
                                            <Button
                                                size="sm"
                                                className="h-7 rounded-lg bg-brand-primary/10 px-3 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                                            >
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}