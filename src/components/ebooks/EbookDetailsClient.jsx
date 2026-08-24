// src/components/ebooks/EbookDetailsClient.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { Bookmark, ArrowLeft, Lock, BookOpen, ShoppingBag } from "@gravity-ui/icons";
import { toast } from "react-toastify";

export default function EbookDetailsClient({ book, currentUser, isPurchased = false }) {
    const router = useRouter();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const isFree = Number(book?.price) === 0 || book?.price === "Free" || !book?.price;


    // কন্ডিশনাল চেকিং
    const isOwner = currentUser?.id && currentUser?.id === book?.writerId;
    const hasAccess = isFree || isPurchased || isOwner;
    const isSold = book?.status === "unpublished" || isPurchased;

    const handleBookmark = () => {
        if (!currentUser) {
            toast.warn("Please log in to bookmark this ebook!");
            return;
        }
        setIsBookmarked((prev) => !prev);
        toast.success(!isBookmarked ? "Added to your bookmarks!" : "Removed from bookmarks.");
    };

    const handlePurchase = async () => {
        if (!currentUser) {
            toast.info("Please log in to purchase this ebook.");
            router.push(`/login?redirect=/ebooks/${book?._id}`);
            return;
        }

        if (isOwner) {
            toast.error("You cannot purchase your own uploaded ebook.");
            return;
        }

        try {
            loadingCheckout(true);
            const res = await fetch("/api/payment/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ebookId: book._id }),
            });

            const data = await res.json();
            if (data?.url) {
                window.location.href = data.url; // Stripe Checkout Redirect
            } else {
                toast.error(data?.message || "Failed to initialize payment.");
            }
        } catch (err) {
            toast.error("Payment initiation failed. Please try again.");
        } finally {
            setLoadingCheckout(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary py-6 sm:py-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Back navigation */}
                <Link
                    href="/ebooks"
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors mb-6"
                >
                    <ArrowLeft className="size-4" />
                    <span>Back to Browse</span>
                </Link>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Cover Image with 3D Book Styling */}
                    <div className="lg:col-span-5 flex justify-center items-start">
                        <div className="relative aspect-[3/4] w-full max-w-[360px] p-2">
                            <div className="absolute inset-x-2 bottom-1 top-3 translate-x-2 translate-y-2 rounded-r-md bg-slate-300 dark:bg-slate-700 shadow-[6px_8px_16px_rgba(0,0,0,0.45)] border-r-2 border-b-2 border-slate-400/40" />
                            <div className="relative h-full w-full overflow-hidden rounded-l-sm rounded-r-md bg-bg-secondary shadow-[2px_4px_8px_rgba(0,0,0,0.3)]">
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 via-black/15 to-transparent z-10" />
                                <Image
                                    src={book?.coverImage || "/placeholder.jpg"}
                                    alt={book?.title || "Book Cover"}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Book Information Panel */}
                    <div className="flex flex-col gap-5 lg:col-span-7 bg-bg-secondary p-6 sm:p-8 rounded-2xl border border-border-main">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <Chip variant="flat" color="primary" className="uppercase text-xs font-semibold">
                                {book?.genre || "General"}
                            </Chip>
                            <Chip
                                variant="flat"
                                color={book?.status === "sold" ? "danger" : "success"}
                                className="text-xs font-semibold capitalize"
                            >
                                {book?.status || "Available"}
                            </Chip>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                                {book?.title}
                            </h1>
                            <p className="mt-1 text-sm text-text-secondary">
                                Written by{" "}
                                <Link
                                    href={`/writers/${book?.writerId}`}
                                    className="font-medium text-brand-primary hover:underline"
                                >
                                    {book?.writerName || "Anonymous Writer"}
                                </Link>
                                {book?.createdAt && (
                                    <span className="ml-2 text-xs opacity-75 suppressHydrationWarning">
                                        • Uploaded on {new Date(book.createdAt).toLocaleDateString()}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Price Box */}
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-primary border border-border-main">
                            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                                Price:
                            </span>
                            <span className="text-2xl font-black text-accent-success">
                                {Number(book?.price) === 0 ? "Free" : `$${book?.price}`}
                            </span>
                        </div>

                        {/* Actions:Read now/ Purchase and Bookmark */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                            {/* ১. ইউজার লগইন না থাকলে লগইন পেজে পাঠানোর বাটন */}
                            {hasAccess ? (<Button
                                as={Link}
                                href={`/ebooks/${book?._id}/read`}
                                size="lg"
                                color="success"
                                className="w-full sm:flex-1 font-semibold rounded-xl text-white shadow-md"
                                startContent={<BookOpen className="size-4" />}
                            >
                                {isFree ? "Read Now (Free)" : "Read Unlocked Book"}
                            </Button>) : !currentUser ? (
                                <Link
                                    href={`/login?redirect=/ebooks/${book?._id}`}
                                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-xl bg-brand-primary text-white shadow-md transition-all hover:opacity-90 active:scale-95 text-sm"
                                >
                                    <ShoppingBag className="size-4" />
                                    <span>Login to Buy (${book?.price})</span>
                                </Link>
                            ) : (
                                /* ২. ইউজার লগইন থাকলে পেমেন্ট ফর্ম সাবমিট হবে */
                                <form
                                    action="/api/payment/checkout"
                                    method="POST"
                                    className="w-full sm:flex-1"
                                >
                                    <input defaultValue={book?.price} name="price" type="hidden" />
                                    <input defaultValue={book?.title} name="title" type="hidden" />
                                    <input defaultValue={book?._id} name="bookId" type="hidden" />
                                    <input defaultValue={book?.coverImage} name="coverImage" type="hidden"></input>
                                    <input defaultValue={book?.genre} name="genre" type="hidden"></input>
                                    <input defaultValue={book?.writerName || book?.writer || book?.author || "Unknown Writer"} name="writer" type="hidden" />

                                    <Button
                                        type="submit"
                                        size="lg"
                                        color="primary"
                                        isDisabled={isOwner || isSold}
                                        className="w-full font-semibold rounded-xl"
                                    >
                                        <ShoppingBag className="size-4" />
                                        {isOwner
                                            ? "Your Ebook (Cannot Buy)"
                                            : isPurchased
                                                ? "Already Purchased"
                                                : isSold
                                                    ? "Sold Out"
                                                    : "Buy Now"}
                                    </Button>
                                </form>
                            )}

                            {/* বুকমার্ক বাটন */}
                            <Button
                                size="lg"
                                variant={isBookmarked ? "solid" : "bordered"}
                                color={isBookmarked ? "primary" : "default"}
                                onPress={handleBookmark}
                                className="w-full sm:w-auto font-medium rounded-xl border-border-main"
                                startContent={<Bookmark className="size-4" />}
                            >
                                {isBookmarked ? "Bookmarked" : "Bookmark"}
                            </Button>
                        </div>

                        {/* Description & Dynamic Preview Guard */}
                        <div className="pt-4 border-t border-border-main space-y-3">
                            <h2 className="text-base font-bold text-text-primary">Overview & Preview</h2>

                            <div className="relative">
                                {/* বই কেনা থাকলে অথবা রাইটার নিজে হলে পুরো লেখা দেখাবে */}
                                {isPurchased || isOwner || isFree ? (
                                    <div className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">
                                        {book?.description}
                                    </div>
                                ) : (
                                    /* কেনা না থাকলে: প্রিভিউ দেখাবে এবং বাকি অংশ ফেইড/ব্লার হয়ে লক দেখাবে */
                                    <div className="relative">
                                        <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-line line-clamp-4">
                                            {book?.description}
                                        </p>

                                        {/* প্রিভিউ এর নিচের ফেইড আউট ওভারলে */}
                                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-secondary to-transparent" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* লকড মেসেজ ব্যানার */}
                        {!(isPurchased || isOwner || isFree) && (
                            <div className="mt-4 p-4 rounded-xl border border-dashed border-border-main bg-bg-primary flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <Lock className="size-5 text-brand-primary shrink-0" />
                                    <div>
                                        <h4 className="text-xs font-semibold text-text-primary">Content Locked</h4>
                                        <p className="text-[11px] text-text-secondary">
                                            Purchase this ebook to unlock the full story and complete chapters.
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    color="primary"
                                    onPress={handlePurchase}
                                    className="font-medium rounded-lg shrink-0"
                                >
                                    Unlock Now
                                </Button>
                            </div>
                        )}

                        {/* Locked/Unlocked Content Guard */}
                        <div className="mt-4 p-4 rounded-xl border border-dashed border-border-main bg-bg-primary flex items-center gap-3">
                            {isPurchased || isOwner ? (
                                <>
                                    <BookOpen className="size-5 text-accent-success shrink-0" />
                                    <p className="text-xs text-text-primary font-medium">
                                        Full eBook access unlocked. You can now read or download the complete material.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <Lock className="size-5 text-text-secondary shrink-0" />
                                    <p className="text-xs text-text-secondary">
                                        Purchase this ebook to unlock the full reading contents and downloadable resources.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}