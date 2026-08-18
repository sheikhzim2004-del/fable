'use client';

import React from 'react';
import { Card } from '@heroui/react';

export default function BookCardSkeleton() {
    return (
        <Card className="flex flex-col justify-between w-full overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] animate-pulse">
            {/* Cover Skeleton */}
            <div className="aspect-[3/4] w-full bg-[var(--border-color)]/50" />

            {/* Header Skeleton */}
            <div className="px-4 pt-3.5 pb-1 space-y-2">
                <div className="h-3 w-1/3 rounded bg-[var(--border-color)]/60" />
                <div className="h-4.5 w-3/4 rounded bg-[var(--border-color)]/80" />
                <div className="space-y-1 mt-2">
                    <div className="h-2.5 w-full rounded bg-[var(--border-color)]/50" />
                    <div className="h-2.5 w-4/5 rounded bg-[var(--border-color)]/50" />
                </div>
            </div>

            {/* Content / Price Skeleton */}
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="h-6 w-16 rounded bg-[var(--border-color)]/60" />
                <div className="h-4 w-12 rounded bg-[var(--border-color)]/40" />
            </div>

            {/* Footer / Button Skeleton */}
            <div className="p-3 pt-0">
                <div className="h-9 w-full rounded-xl bg-[var(--border-color)]/70" />
            </div>
        </Card>
    );
}