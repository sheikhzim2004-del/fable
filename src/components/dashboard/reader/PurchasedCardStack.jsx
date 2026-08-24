"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Person,
    CircleCheckFill,
    ArrowUpRightFromSquare
} from "@gravity-ui/icons";

export default function PurchasedCardStack({ items = [] }) {
    console.log("book items", items)
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)] p-12 text-center">
                <BookOpen className="h-12 w-12 text-[var(--text-secondary)] opacity-40 mb-4" />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">No Purchased Ebooks Found</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-sm">
                    You haven&apos;t bought any books yet. Explore our catalog to start building your library.
                </p>
                <Button
                    as={Link}
                    href="/ebooks"
                    className="mt-5 rounded-xl bg-[var(--primary)] text-white font-medium shadow-md"
                >
                    Browse Ebooks
                </Button>
            </div>
        );
    }

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-6">
            {/* 3D Stack Viewport */}
            <div className="relative h-[480px] w-full max-w-[340px] sm:max-w-[420px] flex items-center justify-center perspective-[1000px]">
                <AnimatePresence mode="popLayout">
                    {items.map((book, index) => {
                        // স্ট্যাকের মধ্যে পজিশন ক্যালকুলেশন
                        const offset = (index - currentIndex + items.length) % items.length;

                        // স্ক্রিনে সর্বোচ্চ ৩টি কার্ডের ডেপথ দেখাবে
                        if (offset > 2) return null;

                        const isFront = offset === 0;

                        return (
                            <motion.div
                                key={book._id || index}
                                initial={{ scale: 0.85, y: offset * 18, opacity: 0 }}
                                animate={{
                                    scale: 1 - offset * 0.06,
                                    y: offset * 22,
                                    zIndex: items.length - offset,
                                    opacity: 1 - offset * 0.25,
                                    rotateX: offset * -2,
                                }}
                                exit={{
                                    x: -300,
                                    opacity: 0,
                                    scale: 0.7,
                                    transition: { duration: 0.35, ease: "easeInOut" }
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                drag={isFront ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.6}
                                onDragEnd={(e, { offset: dragOffset, velocity }) => {
                                    if (dragOffset.x < -100 || velocity.x < -400) nextCard();
                                    if (dragOffset.x > 100 || velocity.x > 400) prevCard();
                                }}
                                className="absolute top-0 w-full rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing select-none"
                            >
                                {/* ইবুক কভার */}
                                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[var(--bg-primary)] shadow-inner">
                                    <Image
                                        src={book?.coverImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"}
                                        alt={book?.title || "Ebook Cover"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 420px"
                                        priority={isFront}
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[var(--bg-primary)]/80 px-3 py-1 text-xs font-semibold text-[var(--accent-success)] backdrop-blur-md border border-[var(--border-color)]">
                                        <CircleCheckFill className="h-3.5 w-3.5" />
                                        <span>Purchased</span>
                                    </div>
                                </div>

                                {/* বইয়ের ইনফরমেশন */}
                                <div className="mt-4 space-y-2">
                                    <h3 className="line-clamp-1 text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
                                        {book?.title || "Untitled Book"}
                                    </h3>

                                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]">
                                        <Person className="h-3.5 w-3.5 text-[var(--secondary)]" />
                                        <span>{book?.writer || book?.writerName || "Unknown Author"}</span>
                                    </div>
                                </div>

                                {/* অ্যাকশন বাটন / লিংক */}
                                <div className="mt-5 pt-3 border-t border-[var(--border-color)] flex items-center gap-3">
                                    <Button
                                        as={Link}
                                        href={`/ebooks/${book?.bookId || book?._id}`}
                                        className="w-full flex-1 rounded-xl bg-[var(--primary)] font-semibold text-white shadow-md hover:opacity-90 flex items-center justify-center gap-2 py-2.5"
                                    >
                                        <span>View Details</span>
                                        <ArrowUpRightFromSquare className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* কন্ট্রোল বাটন ও কাউন্টার */}
            {items.length > 1 && (
                <div className="mt-14 flex items-center gap-6">
                    <button
                        onClick={prevCard}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors"
                        aria-label="Previous Book"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                        <span className="text-[var(--text-primary)]">{currentIndex + 1}</span> of {items.length}
                    </span>

                    <button
                        onClick={nextCard}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors"
                        aria-label="Next Book"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}