"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Chip, Skeleton } from "@heroui/react";
import { Bookmark, TrashBin, ArrowRight, BookOpen } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { getBookmarkedBooks, toggleBookmarkAction } from "@/lib/api/bookmarks";
import Link from "next/link";

export default function BookmarkGalleryView({ currentUser }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    // Initial Data Fetch
    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!currentUser?.email) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await getBookmarkedBooks(currentUser.email);
                setBooks(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load bookmarks:", error);
                toast.error("Failed to load bookmarks.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, [currentUser?.email]);

    // Handle Remove Bookmark from Gallery
    const handleRemove = async (bookId) => {
        if (!currentUser?.email) return;

        setDeletingId(bookId);
        try {
            const res = await toggleBookmarkAction(currentUser.email, bookId);
            if (res && !res.bookmarked) {
                setBooks((prev) => prev.filter((book) => book._id !== bookId));
                toast.success("Ebook removed from bookmarks.");
            } else {
                toast.error("Could not remove bookmark.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to remove bookmark.");
        } finally {
            setDeletingId(null);
        }
    };

    // 1. Loading Skeleton State
    if (loading) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <Skeleton className="h-8 w-48 rounded-lg mb-2" />
                    <Skeleton className="h-4 w-72 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div
                            key={n}
                            className="rounded-2xl border border-border-main bg-bg-secondary p-4 space-y-4"
                        >
                            <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                            <Skeleton className="h-5 w-3/4 rounded-lg" />
                            <Skeleton className="h-4 w-1/2 rounded-lg" />
                            <div className="flex gap-2 pt-2">
                                <Skeleton className="h-9 flex-1 rounded-xl" />
                                <Skeleton className="h-9 w-9 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 2. Empty State (যখন কোনো বুকমার্ক থাকবে না)
    if (books.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full rounded-3xl border border-dashed border-border-main bg-bg-secondary p-8 sm:p-14 text-center flex flex-col items-center justify-center my-6"
            >
                <div className="size-16 rounded-2xl bg-bg-primary border border-border-main flex items-center justify-center text-text-secondary mb-4 shadow-sm">
                    <Bookmark className="size-8 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">
                    No Bookmarked Ebooks Yet
                </h3>
                <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
                    Explore our collection and click the bookmark icon on any ebook to save it here for later reading.
                </p>
                <Link
                    href="/ebooks"
                    className="inline-flex items-center justify-center gap-2 font-medium rounded-xl text-white shadow-md bg-brand-primary hover:bg-brand-primary/90 transition-colors px-5 py-2.5 text-sm"
                >
                    <ArrowRight className="size-4" />
                    Explore Ebooks
                </Link>
            </motion.div>
        );
    }

    // 3. Bookmark Gallery View
    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border-main">
                <div>
                    <h1 className="text-2xl font-black text-text-primary tracking-tight">
                        Bookmarked Ebooks
                    </h1>
                    <p className="text-sm text-text-secondary">
                        Manage your saved titles and jump back into reading anytime.
                    </p>
                </div>
                <Chip variant="flat" color="primary" className="font-semibold text-xs self-start sm:self-auto">
                    {books.length} {books.length === 1 ? "Book" : "Books"} Saved
                </Chip>
            </div>

            {/* Gallery Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence>
                    {books.map((book) => (
                        <motion.div
                            layout
                            key={book._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.25 }}
                            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border-main bg-bg-secondary p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-primary/40"
                        >
                            <div>
                                {/* 3D-styled Aspect Ratio Thumbnail */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-bg-primary border border-border-main/60 mb-4">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10" />
                                    <Image
                                        src={book?.coverImage || "/placeholder.jpg"}
                                        alt={book?.title || "Book Cover"}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {book?.genre && (
                                        <div className="absolute top-2.5 right-2.5 z-20">
                                            <Chip
                                                size="sm"
                                                variant="solid"
                                                className="bg-bg-secondary/90 backdrop-blur-md text-text-primary text-[10px] font-bold uppercase shadow-sm border border-border-main/50"
                                            >
                                                {book.genre}
                                            </Chip>
                                        </div>
                                    )}
                                </div>

                                {/* Title & Metadata */}
                                <div className="space-y-1">
                                    <h3
                                        className="font-bold text-base text-text-primary line-clamp-1 group-hover:text-brand-primary transition-colors"
                                        title={book?.title}
                                    >
                                        {book?.title}
                                    </h3>
                                    <p className="text-xs text-text-secondary line-clamp-1">
                                        By {book?.writerName || "Anonymous Writer"}
                                    </p>
                                </div>

                                {/* Price Tag */}
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase text-text-secondary">
                                        Price
                                    </span>
                                    <span className="text-sm font-black text-accent-success">
                                        {Number(book?.price) === 0 || book?.price === "Free" || !book?.price
                                            ? "Free"
                                            : `$${book?.price}`}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-5 flex items-center gap-2 pt-3 border-t border-border-main">
                                <Link
                                    href={`/ebooks/${book._id}`}
                                    className="flex-1 flex items-center justify-center gap-1.5 font-semibold rounded-xl text-xs text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors py-2"
                                >
                                    View Details
                                    <BookOpen className="size-3.5" />
                                </Link>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="danger"
                                    variant="light"
                                    isLoading={deletingId === book._id}
                                    onPress={() => handleRemove(book._id)}
                                    title="Remove Bookmark"
                                    className="rounded-xl text-red-500 hover:bg-red-500/10"
                                >
                                    {deletingId !== book._id && <TrashBin className="size-4" />}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}