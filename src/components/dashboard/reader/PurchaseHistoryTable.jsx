"use client";

import React from "react";
import { Table, Chip } from "@heroui/react";
import {
    BookOpen,
    Person,
    CircleCheck,
    CircleExclamation,
    ClockArrowRotateLeft
} from "@gravity-ui/icons";

export default function PurchaseHistoryTable({ purchases = [], user }) {

    console.log("purchase", purchases)
    // Tarikh format er jonno
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(new Date(dateString));
    };

    return (
        <div className="w-full space-y-6">
            {/* Header page */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <ClockArrowRotateLeft className="w-5 h-5 text-[var(--secondary)]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                            Billing & Orders
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
                        Purchase <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">History</span>
                    </h1>
                    <p suppressHydrationWarning className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                        {user?.name ? `${user.name}, review your completed ebook orders.` : "Review all your completed ebook transactions."}
                    </p>
                </div>
            </div>

            {/* Table Container */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden shadow-sm">
                <Table className="w-full">
                    <Table.ScrollContainer className="overflow-x-auto">
                        <Table.Content aria-label="Purchase History Table" className="w-full min-w-[650px]">
                            <Table.Header className="bg-[var(--bg-primary)]/70 border-b border-[var(--border-color)]">
                                <Table.Column isRowHeader className="py-4 px-5 text-left text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                                    Ebook Name
                                </Table.Column>
                                <Table.Column className="py-4 px-5 text-left text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                                    Writer
                                </Table.Column>
                                <Table.Column className="py-4 px-5 text-left text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                                    Price
                                </Table.Column>
                                <Table.Column className="py-4 px-5 text-left text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                                    Purchase Date
                                </Table.Column>
                                <Table.Column className="py-4 px-5 text-center text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                                    Status
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {purchases.length === 0 ? (
                                    <Table.Row key="empty-row">
                                        <Table.Cell colSpan={5} className="py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <CircleExclamation className="w-8 h-8 text-[var(--text-secondary)] opacity-50" />
                                                <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                    No purchase records found
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)]">
                                                    Explore our catalog and start reading your favorite ebooks.
                                                </p>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    purchases.map((item, index) => (
                                        <Table.Row
                                            key={item._id || item.transactionId || index}
                                            className="border-b border-[var(--border-color)]/50 hover:bg-[var(--bg-primary)]/40 transition-colors"
                                        >
                                            {/* 1. Ebook name */}
                                            <Table.Cell className="py-4 px-5 font-semibold text-sm text-[var(--text-primary)]">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
                                                        <BookOpen className="w-4 h-4" />
                                                    </div>
                                                    <span className="line-clamp-1 max-w-[200px] sm:max-w-xs" title={item.bookTitle || item.ebookName}>
                                                        {item.title || "Untitled Ebook"}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* 2. Eriter*/}
                                            <Table.Cell className="py-4 px-5 text-sm text-[var(--text-secondary)]">
                                                <div className="flex items-center gap-1.5">
                                                    <Person className="w-3.5 h-3.5 text-[var(--secondary)]" />
                                                    <span>{item.authorName || item.writer || "Unknown Writer"}</span>
                                                </div>
                                            </Table.Cell>

                                            {/* 3. Price */}
                                            <Table.Cell className="py-4 px-5 font-bold text-sm text-[var(--accent-success)]">
                                                {Number(item.price) === 0 ? "Free" : `$${Number(item.price).toFixed(2)}`}
                                            </Table.Cell>

                                            {/* 4. Purchase date */}
                                            <Table.Cell className="py-4 px-5 text-xs font-medium text-[var(--text-secondary)]">
                                                {formatDate(item.purchaseDate || item.createdAt || item.date)}
                                            </Table.Cell>

                                            {/* 5. Status*/}
                                            <Table.Cell className="py-4 px-5 text-center">
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    className="bg-[var(--accent-success)]/15 text-[var(--accent-success)] font-semibold border border-[var(--accent-success)]/30 capitalize text-xs"
                                                >
                                                    <CircleCheck className="w-3.5 h-3.5" />
                                                    {item.status || "Completed"}
                                                </Chip>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                    <Table.Footer className="p-4 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] flex justify-between items-center bg-[var(--bg-primary)]/30">
                        <span>Showing {purchases.length} transactions</span>
                        <span className="font-semibold text-[var(--primary)]">Fable Secure Billing</span>
                    </Table.Footer>
                </Table>
            </div>
        </div>
    );
}