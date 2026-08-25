"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Table, Chip } from "@heroui/react";
import {
    Receipt,
    Copy,
    Check,
    ArrowUpRight,
    ShoppingBag,
    CreditCard,
    Calendar
} from "@gravity-ui/icons";

// Transaction type onujayi badge color mapping
const typeColorMap = {
    "publishing fee": "secondary",
    "publishing_fee": "secondary",
    "purchase": "success",
    "refund": "danger",
    "subscription": "primary"
};

export default function TransactionsTable({ initialTransactions = [] }) {
    const [transactions] = useState(initialTransactions);
    const [copiedId, setCopiedId] = useState(null);

    // Transaction ID copy korar handler
    const handleCopyId = (id) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Total revenue calculate kora
    const totalAmount = transactions.reduce(
        (sum, item) => sum + (Number(item?.price) || 0),
        0
    );

    return (
        <div className="m-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                        All Transactions
                    </h2>
                    <p className="text-sm text-text-secondary">
                        Monitor payment logs, book purchases, and writer publishing fees.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Chip variant="flat" color="primary" className="font-semibold">
                        Total Logs: {transactions.length}
                    </Chip>
                    <Chip variant="flat" color="success" className="font-semibold">
                        Total Volume: ${totalAmount.toFixed(2)}
                    </Chip>
                </div>
            </div>

            {/* Table Container */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border-main bg-bg-secondary p-2 shadow-sm overflow-hidden"
            >
                <Table className="min-w-full">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Transactions audit table" className="w-full">
                            <Table.Header className="border-b border-border-main bg-bg-primary/50 text-xs font-bold uppercase text-text-secondary">
                                <Table.Column isRowHeader className="py-3.5 px-4 text-left">
                                    Transaction ID
                                </Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Type</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Writer Name/Email</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Amount</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-right">Date</Table.Column>
                            </Table.Header>

                            <Table.Body
                                items={transactions}
                                emptyContent="No transaction records found."
                                className="divide-y divide-border-main"
                            >
                                {(item) => {
                                    const rawType = (item?.type || "purchase").toLowerCase();
                                    const isPublishFee = rawType.includes("publishing");

                                    return (
                                        <Table.Row
                                            key={item?._id || item?.id || item?.transactionId}
                                            className="transition-colors hover:bg-bg-primary/40"
                                        >
                                            {/* Transaction ID with Copy Button */}
                                            <Table.Cell className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-8 rounded-lg flex items-center justify-center bg-brand-primary/10 text-brand-primary">
                                                        <Receipt className="size-4" />
                                                    </div>
                                                    <div>
                                                        <span className="font-mono text-xs font-semibold text-text-primary">
                                                            {item?.transactionId || item?._id || "TXN-UNKNOWN"}
                                                        </span>
                                                        <span className="text-[10px] text-text-secondary block">
                                                            Gateway: {item?.paymentMethod || "Stripe / Card"}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleCopyId(
                                                                item?.transactionId || item?._id
                                                            )
                                                        }
                                                        className="text-text-secondary hover:text-text-primary transition-colors p-1"
                                                        title="Copy ID"
                                                    >
                                                        {copiedId ===
                                                            (item?.transactionId || item?._id) ? (
                                                            <Check className="size-3.5 text-success" />
                                                        ) : (
                                                            <Copy className="size-3.5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </Table.Cell>

                                            {/* Type */}
                                            <Table.Cell className="py-4 px-4">
                                                <Chip
                                                    variant="flat"
                                                    size="sm"
                                                    color={typeColorMap[rawType] || "default"}
                                                    className="font-semibold capitalize text-xs tracking-wide inline-flex items-center gap-1.5"
                                                >
                                                    {isPublishFee ? (
                                                        <ArrowUpRight className="size-3.5 shrink-0" />
                                                    ) : (
                                                        <ShoppingBag className="size-3.5 shrink-0" />
                                                    )}
                                                    <span>{item?.genre?.replace("_", " ") || "Purchase"}</span>
                                                </Chip>
                                            </Table.Cell>

                                            {/* "Writer" Name */}
                                            <Table.Cell className="py-4 px-4 text-sm text-text-secondary">
                                                <div className="flex items-center gap-1.5">
                                                    <CreditCard className="size-3.5 text-text-secondary/60" />
                                                    <span className="font-medium text-text-primary">
                                                        {item?.writer || item?.email || "guest@fable.com"}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* Amount */}
                                            <Table.Cell className="py-4 px-4">
                                                <span className="text-sm font-bold text-success">
                                                    +${Number(item?.price || 0).toFixed(2)}
                                                </span>
                                            </Table.Cell>

                                            {/* Date */}
                                            <Table.Cell className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5 text-xs text-text-secondary">
                                                    <Calendar className="size-3.5 opacity-70" />
                                                    <span>
                                                        {item?.purchaseDate
                                                            ? new Date(item.purchaseDate).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                }
                                                            )
                                                            : item?.date || "Just now"}
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                }}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </motion.div>
        </div >
    );
}