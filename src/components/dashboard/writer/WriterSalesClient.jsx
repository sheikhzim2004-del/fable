"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Table, Chip } from "@heroui/react";
import { Magnifier, ChevronLeft, ChevronRight } from "@gravity-ui/icons";

export default function WriterSalesClient({
    initialSales = [],
    totalRevenue = 0,
    totalTransactions = 0,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const rowsPerPage = 7;

    const filteredSales = useMemo(() => {
        return initialSales.filter((item) => {
            const query = searchQuery.toLowerCase();
            return (
                (item.title && item.title.toLowerCase().includes(query)) ||
                (item.userId && item.userId.toLowerCase().includes(query)) ||
                (item.session_id && item.session_id.toLowerCase().includes(query))
            );
        });
    }, [initialSales, searchQuery]);

    const pages = Math.ceil(filteredSales.length / rowsPerPage) || 1;
    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredSales.slice(start, start + rowsPerPage);
    }, [page, filteredSales]);

    const avgOrderValue = totalTransactions > 0 ? (totalRevenue / totalTransactions).toFixed(2) : 0;

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            {/* === Top Header & Banner === */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-brand-primary/20 bg-gradient-to-r from-violet-600/20 via-brand-primary/20 to-fuchsia-600/20 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
                <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <span className="rounded-full border border-brand-primary/30 bg-brand-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-primary">
                            Analytics &amp; History
                        </span>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
                            Sales &amp; Earnings
                        </h1>
                        <p className="mt-1 text-sm text-text-secondary">
                            Track your book sales, customer orders, and transaction revenues in real-time.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-border-color/60 bg-bg-secondary/80 px-4 py-2.5 backdrop-blur-md transition-colors focus-within:border-brand-primary/50 sm:w-72">
                        <Magnifier className="size-4 shrink-0 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search by book, buyer ID..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1);
                            }}
                            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
                        />
                    </div>
                </div>
            </motion.div>

            {/* === Colorful Stats Metric Cards === */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {/* Card 1: Total Revenue */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-bg-secondary to-bg-secondary p-5 shadow-lg transition-all hover:border-emerald-500/40"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-emerald-400">Total Revenue</span>
                        <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/20 text-lg font-bold text-emerald-400">
                            $
                        </div>
                    </div>
                    <h2 className="mt-1 text-3xl font-black text-text-primary sm:text-4xl">
                        $ {totalRevenue.toLocaleString()}
                    </h2>
                    <p className="mt-1 text-xs text-text-secondary">Gross lifetime income</p>
                </motion.div>

                {/* Card 2: Total Orders */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-bg-secondary to-bg-secondary p-5 shadow-lg transition-all hover:border-sky-500/40"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-sky-400">Total Orders</span>
                        <div className="flex size-9 items-center justify-center rounded-xl bg-sky-500/20 text-sm font-bold text-sky-400">
                            📦
                        </div>
                    </div>
                    <h2 className="mt-1 text-3xl font-black text-text-primary sm:text-4xl">
                        {totalTransactions}
                    </h2>
                    <p className="mt-1 text-xs text-text-secondary">Successful book purchases</p>
                </motion.div>

                {/* Card 3: Avg Order Value */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-bg-secondary to-bg-secondary p-5 shadow-lg transition-all hover:border-violet-500/40"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-violet-400">Avg. Sale Price</span>
                        <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/20 text-sm font-bold text-violet-400">
                            📊
                        </div>
                    </div>
                    <h2 className="mt-1 text-3xl font-black text-text-primary sm:text-4xl">
                        $ {avgOrderValue}
                    </h2>
                    <p className="mt-1 text-xs text-text-secondary">Average revenue per transaction</p>
                </motion.div>
            </div>

            {/* === Transactions Dynamic Data Table === */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="overflow-hidden rounded-3xl border border-border-color bg-bg-secondary shadow-xl"
            >
                <div className="flex items-center justify-between border-b border-border-color p-5">
                    <div>
                        <h2 className="text-lg font-bold text-text-primary">Transaction History</h2>
                        <p className="text-xs text-text-secondary">All purchases linked to your uploaded ebooks</p>
                    </div>
                    <Chip size="sm" color="primary" variant="soft">
                        {filteredSales.length} items
                    </Chip>
                </div>

                <Table>
                    <Table.ScrollContainer className="overflow-x-auto">
                        <Table.Content aria-label="Sales transactions table" className="min-w-[800px]">
                            <Table.Header className="bg-bg-primary/50">
                                <Table.Column id="title" isRowHeader className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                    Ebook Title
                                </Table.Column>
                                <Table.Column id="buyer" className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                    Buyer / User ID
                                </Table.Column>
                                <Table.Column id="session" className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                    Stripe Session
                                </Table.Column>
                                <Table.Column id="status" className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                    Status
                                </Table.Column>
                                <Table.Column id="amount" className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-text-secondary">
                                    Amount
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                <Table.Collection items={paginatedItems}>
                                    {(item) => (
                                        <Table.Row
                                            key={item._id}
                                            className="border-b border-border-color/30 transition-colors hover:bg-bg-primary/40"
                                        >
                                            <Table.Cell className="px-5 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-text-primary">
                                                        {item.title || "Untitled Book"}
                                                    </span>
                                                    <span className="text-[11px] text-text-secondary">
                                                        Book ID: {item.bookId || "N/A"}
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-5 py-4">
                                                <div className="max-w-[180px] truncate rounded-md border border-border-color/40 bg-bg-primary/80 px-2 py-1 font-mono text-xs text-text-secondary sm:max-w-xs">
                                                    {item.userId || "Anonymous Buyer"}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-5 py-4">
                                                <div
                                                    className="max-w-[140px] truncate font-mono text-[11px] text-text-secondary"
                                                    title={item.session_id}
                                                >
                                                    {item.session_id ? `${item.session_id.slice(0, 18)}...` : "Direct/Test"}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-5 py-4">
                                                <Chip size="sm" color="success" variant="soft" className="text-xs capitalize">
                                                    Completed
                                                </Chip>
                                            </Table.Cell>
                                            <Table.Cell className="px-5 py-4 text-right">
                                                <span className="text-base font-extrabold text-emerald-400">
                                                    +$ {Number(item.price || 0).toLocaleString()}
                                                </span>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Collection>

                                {filteredSales.length === 0 && (
                                    <Table.Row>
                                        <Table.Cell colSpan={5} className="px-5 py-12 text-center text-sm text-text-secondary">
                                            No transaction records found.
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>

                {/* Pagination footer */}
                {pages > 1 && (
                    <div className="flex items-center justify-center gap-2 border-t border-border-color p-4">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="flex size-8 items-center justify-center rounded-lg border border-border-color text-text-secondary transition-colors hover:bg-bg-primary disabled:opacity-40"
                        >
                            <ChevronLeft className="size-4" />
                        </button>

                        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page
                                        ? "bg-brand-primary text-white"
                                        : "text-text-secondary hover:bg-bg-primary"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage((p) => Math.min(pages, p + 1))}
                            disabled={page === pages}
                            className="flex size-8 items-center justify-center rounded-lg border border-border-color text-text-secondary transition-colors hover:bg-bg-primary disabled:opacity-40"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
