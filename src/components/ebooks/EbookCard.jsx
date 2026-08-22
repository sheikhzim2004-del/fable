"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Chip } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";

export default function EbookCard({ book, isSold = false }) {

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



    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
        >
            <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-color bg-bg-secondary transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 p-0 sm:p-4">

                {/* === Visual & Badges === */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-bg-primary shadow-[4px_6px_12px_rgba(0,0,0,0.4),8px_12px_24px_rgba(0,0,0,0.10)] border-r-2 border-b-2 border-white/10 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 z-10" />
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

                    <Link
                        href={`/ebooks/${book?._id}`}
                        className="flex items-center gap-1.5 px-6 py-3 rounded text-xs font-semibold bg-brand-primary/90  hover:bg-brand-primary text-white transition-all shadow-sm"
                    >
                        <Eye className="size-5" />
                        <span>View Details</span>
                    </Link>
                </Card.Footer>
            </Card>
        </motion.div>
    );
}