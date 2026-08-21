"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, Chip, Separator } from "@heroui/react";
import {
    PersonFill,
    Calendar,
    ShieldCheck,
    CircleCheck,
} from "@gravity-ui/icons";

export default function WriterProfileClient({ user = {}, stats = {} }) {
    const displayName = user?.name || user?.email?.split("@")[0] || "Author";
    const initialLetter = displayName.charAt(0).toUpperCase();

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "August 2026";

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            {/* PROFILE HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-violet-600/25 via-primary/20 to-pink-600/25 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
                <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-pink-500/20 blur-3xl" />

                <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
                    {/* Avatar */}
                    <div className="relative flex size-24 shrink-0 items-center justify-center rounded-3xl border-2 border-white/20 bg-gradient-to-tr from-primary via-violet-500 to-pink-500 text-4xl font-black text-white shadow-xl shadow-primary/30 sm:size-28 sm:text-5xl">
                        {initialLetter}
                        <div
                            className="absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border-2 border-bg-primary bg-emerald-500 text-white"
                            title="Active Writer"
                        >
                            <CircleCheck className="size-3.5" />
                        </div>
                    </div>

                    {/* User info */}
                    <div className="min-w-0 flex-1 space-y-2.5">
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
                            <h1 className="break-words text-2xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
                                {displayName}
                            </h1>

                            <Chip
                                size="sm"
                                variant="soft"
                                color="accent"
                                className="font-semibold uppercase tracking-wider"
                            >
                                {user?.role || "Writer"}
                            </Chip>

                            <Chip size="sm" variant="soft" color="success" className="font-medium">
                                <CircleCheck className="size-3.5" />
                                Verified Author
                            </Chip>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-text-secondary sm:justify-start">
                            <PersonFill className="size-4 shrink-0" />
                            <span className="break-all">{user?.email || "No email available"}</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-text-secondary sm:justify-start">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="size-3.5" />
                                <strong className="text-text-primary">Joined:</strong>
                                {memberSince}
                            </span>

                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="size-3.5" />
                                <strong className="text-text-primary">Access:</strong>
                                Content Creator
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ACCOUNT INFORMATION */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
            >
                <Card variant="secondary" className="overflow-hidden border border-border-color bg-bg-secondary shadow-xl">
                    <Card.Header className="flex flex-col gap-3 border-b border-border-color p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Card.Title className="text-lg font-bold text-text-primary">
                                Account Credentials & Status
                            </Card.Title>
                            <Card.Description className="mt-1 text-xs text-text-secondary">
                                System authentication & account identifier profile
                            </Card.Description>
                        </div>

                        <Chip size="sm" variant="soft" color="success" className="w-fit font-semibold">
                            <CircleCheck className="size-3.5" />
                            Active Account
                        </Chip>
                    </Card.Header>

                    <Card.Content className="grid grid-cols-1 gap-6 p-6 text-sm md:grid-cols-2">
                        <div className="min-w-0 space-y-1.5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                Account ID
                            </p>
                            <p className="break-all rounded-xl border border-border-color bg-bg-primary p-3 font-mono text-xs text-text-primary">
                                {user?.id || "N/A"}
                            </p>
                        </div>

                        <div className="min-w-0 space-y-1.5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                Registered Email
                            </p>
                            <p className="break-all rounded-xl border border-border-color bg-bg-primary p-3 font-mono text-xs text-text-primary">
                                {user?.email || "N/A"}
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                Assigned Role
                            </p>
                            <div className="flex flex-col gap-2 rounded-xl border border-border-color bg-bg-primary p-3 sm:flex-row sm:items-center sm:justify-between">
                                <span className="font-semibold capitalize text-text-primary">
                                    {user?.role || "Writer"}
                                </span>
                                <span className="text-[11px] font-medium text-emerald-400">
                                    Publishing Permission Granted
                                </span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                Account Verification
                            </p>
                            <div className="flex flex-col gap-2 rounded-xl border border-border-color bg-bg-primary p-3 sm:flex-row sm:items-center sm:justify-between">
                                <span className="font-semibold text-text-primary">Session Authenticated</span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                                    <span className="size-1.5 rounded-full bg-emerald-400" />
                                    Active
                                </span>
                            </div>
                        </div>
                    </Card.Content>

                    <Separator />

                    <Card.Footer className="flex flex-col items-center justify-between gap-3 bg-bg-primary/30 p-6 text-center sm:flex-row sm:text-left">
                        <p className="text-xs text-text-secondary">
                            Publish new ebooks or manage pricing through your dedicated Writer portal.
                        </p>
                        <span className="text-xs font-semibold text-primary">Fable Publishing Platform</span>
                    </Card.Footer>
                </Card>
            </motion.div>
        </div>
    );
}