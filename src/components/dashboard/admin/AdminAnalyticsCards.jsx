"use client";

import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import {
    CreditCard,
    ArrowUpRight
} from '@gravity-ui/icons';

// ১. সংখ্যা অ্যানিমেশন কম্পোনেন্ট
export function CountUp({ value, duration = 1.4, prefix = '', decimals = 0 }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(0, Number(value) || 0, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(v),
        });
        return () => controls.stop();
    }, [value, duration]);

    const formatted = decimals
        ? display.toFixed(decimals)
        : Math.round(display).toLocaleString('en-US');

    return (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            {prefix}
            {formatted}
        </span>
    );
}

// ২. ছোট স্ট্যাট কার্ড কম্পোনেন্ট
export function StatCard({ icon: Icon, label, value, prefix, trend, accent, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl border p-5 bg-card bg-[#131B2E] border-slate-800"
        >
            {/* spine accent */}
            <span
                className="absolute left-0 top-0 h-full w-1"
                style={{ backgroundColor: accent }}
            />

            {/* bookmark ribbon corner */}
            <span
                className="absolute right-5 top-0 h-7 w-5 opacity-90"
                style={{
                    backgroundColor: accent,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                }}
            />

            <div className="flex items-start justify-between">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl">
                    <span
                        className="absolute inset-0 rounded-xl opacity-[0.15]"
                        style={{ backgroundColor: accent }}
                    />
                    {Icon && <Icon className="size-5" style={{ color: accent }} />}
                </div>

                {trend && (
                    <span
                        className="flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--accent-success, #22c55e) 15%, transparent)',
                            color: 'var(--accent-success, #22c55e)',
                        }}
                    >
                        <ArrowUpRight className="size-3.5" />
                        {trend}%
                    </span>
                )}
            </div>

            <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                <CountUp value={value} prefix={prefix} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
                {label}
            </p>
        </motion.div>
    );
}

// ৩. রেভিনিউ চার্ট কার্ড কম্পোনেন্ট
export function RevenueHeroCard({ totalRevenue: totalRevenue, avgOrder = 24.60, growthRate = 18.9, transactions = 52340 }) {
    const bars = [42, 58, 50, 74, 63, 91, 78];
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border p-6 md:p-7 bg-card bg-[#131B2E] border-slate-800"
        >
            <span
                className="absolute left-0 top-0 h-full w-1"
                style={{ backgroundColor: 'var(--accent-success, #22c55e)' }}
            />
            <span
                className="absolute right-7 top-0 h-7 w-5 opacity-90"
                style={{
                    backgroundColor: 'var(--accent-success, #22c55e)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                }}
            />

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl">
                            <span
                                className="absolute inset-0 rounded-xl opacity-[0.15]"
                                style={{ backgroundColor: 'var(--accent-success, #22c55e)' }}
                            />
                            <CreditCard className="size-5" style={{ color: 'var(--accent-success, #22c55e)' }} />
                        </div>
                        <span
                            className="rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{
                                backgroundColor: 'color-mix(in srgb, var(--accent-success, #22c55e) 15%, transparent)',
                                color: 'var(--accent-success, #22c55e)',
                            }}
                        >
                            This month
                        </span>
                    </div>

                    <p className="mt-5 text-sm text-muted-foreground">
                        Total Revenue
                    </p>
                    <p className="mt-1 text-4xl font-bold tracking-tight md:text-[2.75rem] text-foreground">
                        <CountUp value={totalRevenue} prefix="$" />
                    </p>

                    <div className="mt-5 flex flex-wrap gap-6">
                        <div>
                            <p className="text-xs text-muted-foreground">Avg. order value</p>
                            <p className="mt-0.5 text-base font-semibold text-foreground">
                                ${avgOrder}
                            </p>
                        </div>
                        <div className="border-l border-border pl-6">
                            <p className="text-xs text-muted-foreground">Growth rate</p>
                            <p className="mt-0.5 text-base font-semibold text-success">
                                +{growthRate}%
                            </p>
                        </div>
                        <div className="border-l border-border pl-6">
                            <p className="text-xs text-muted-foreground">Transactions</p>
                            <p className="mt-0.5 text-base font-semibold text-foreground">
                                {transactions?.toLocaleString('en-US')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* mini bar chart */}
                <div className="flex items-end gap-2.5 self-stretch md:self-end">
                    {bars.map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div
                                className="flex h-24 w-6 items-end overflow-hidden rounded-md"
                                style={{ backgroundColor: 'color-mix(in srgb, var(--accent-success, #22c55e) 12%, transparent)' }}
                            >
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.7, delay: 0.6 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full rounded-md"
                                    style={{ backgroundColor: 'var(--accent-success, #22c55e)' }}
                                />
                            </div>
                            <span className="text-[11px] text-muted-foreground">
                                {days[i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}