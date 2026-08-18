"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, Button, Chip } from "@heroui/react";
import { ShoppingBag, Eye, Lock } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function EbookCard({ book, isSold = false }) {
    const router = useRouter();
    const { user } = useAuth() || { user: null };

    const {
        _id,
        title,
        description,
        price,
        genre,
        coverImage,
        writerName = "Anonymous Author",
        createdAt,
    } = book;

    // Formatted date string
    const publishedDate = new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    const handlePurchase = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.info("Please login to purchase this ebook", {
                icon: <Lock className="text-secondary" />,
            });
            router.push(`/login?redirect=/ebooks/${_id}`);
            return;
        }

        if (isSold) {
            toast.warning("This book has already been purchased.");
            return;
        }

        router.push(`/checkout/${_id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
        >
            <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-color bg-bg-secondary transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">

                {/* === Visual & Badges === */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-primary">
                    <Image
                        src={coverImage || "https://i.ibb.co/Y7QQM9w7/300px.jpg"}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        priority={false}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Genre Badge */}
                    <div className="absolute left-2.5 top-2.5 z-10">
                        <Chip
                            size="sm"
                            variant="soft"
                            className="border border-border-color/60 bg-bg-secondary/80 font-medium capitalize text-text-primary backdrop-blur-md"
                        >
                            {genre}
                        </Chip>
                    </div>

                    {/* Sold / Purchase Status Badge */}
                    {isSold && (
                        <div className="absolute right-2.5 top-2.5 z-10">
                            <span className="rounded-md bg-danger/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                                Sold
                            </span>
                        </div>
                    )}

                    {/* Quick View Floating Action */}
                    <Link
                        href={`/ebooks/${_id}`}
                        className="absolute bottom-3 right-3 z-10 flex size-9 translate-y-2 items-center justify-center rounded-xl border border-border-color bg-bg-secondary/90 text-text-primary opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-white"
                        aria-label="View ebook details"
                    >
                        <Eye className="size-4" />
                    </Link>
                </div>

                {/* === Header: Title & Author === */}
                <Card.Header className="flex flex-col gap-1 p-4 pb-1">
                    <Link href={`/ebooks/${_id}`} className="group-hover:text-primary">
                        <Card.Title className="line-clamp-1 text-base font-bold text-text-primary transition-colors">
                            {title}
                        </Card.Title>
                    </Link>
                    <Card.Description className="flex items-center justify-between text-xs text-text-secondary">
                        <span className="truncate font-medium">{writerName}</span>
                        <span className="text-[11px] opacity-80">{publishedDate}</span>
                    </Card.Description>
                </Card.Header>

                {/* === Content: Excerpt === */}
                <Card.Content className="flex-1 px-4 py-2">
                    <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">
                        {description}
                    </p>
                </Card.Content>

                {/* === Footer: Price & Checkout Trigger === */}
                <Card.Footer className="flex items-center justify-between border-t border-border-color/60 p-4 pt-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                            Price
                        </span>
                        <span className="text-base font-extrabold text-accent-success">
                            {Number(price) === 0 ? "Free" : `৳ ${price}`}
                        </span>
                    </div>

                    <Button
                        size="sm"
                        onPress={handlePurchase}
                        disabled={isSold}
                        className={`gap-1.5 rounded-xl font-semibold transition-all ${isSold
                                ? "bg-bg-primary text-text-secondary opacity-60 cursor-not-allowed"
                                : "bg-primary text-white shadow-md shadow-primary/20 hover:opacity-95"
                            }`}
                    >
                        <ShoppingBag className="size-3.5" />
                        <span>{isSold ? "Unavailable" : "Buy Now"}</span>
                    </Button>
                </Card.Footer>
            </Card>
        </motion.div>
    );
}