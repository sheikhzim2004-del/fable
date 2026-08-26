'use client'
import {
    Persons,
    Pencil,
    BookOpen,
    ShoppingBag,
    Bookmark
} from '@gravity-ui/icons';
// ধাপ ১ এর কম্পোনেন্টগুলো ইমপোর্ট করুন
import { StatCard, RevenueHeroCard } from './AdminAnalyticsCards';

export default function AdminDashboardAnalyticsOverview({ analyticsData }) {

     const totalRevenue = analyticsData?.totalRevenue;
    // console.log("total revenue", totalRevenue)
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const cards = [
        {
            icon: Persons,
            label: 'Total Users',
            value: analyticsData?.totalUsersCount || 0,
            trend: 12.4,
            accent: 'var(--primary, #4F46E5)',
        },
        {
            icon: Pencil,
            label: 'Total Writers',
            value: analyticsData?.totalWritersCount || 0,
            trend: 8.1,
            accent: 'var(--secondary, #0284C7)',
        },
        {
            icon: BookOpen,
            label: 'Total eBooks',
            value: analyticsData?.totalBooksCount || 8921,
            trend: 5.6,
            accent: 'var(--accent-warning, #f59e0b)',
        },
        {
            icon: ShoppingBag,
            label: 'eBooks Sold',
            value: analyticsData?.totalSoldBooksCount || 52340,
            trend: 18.9,
            accent: 'var(--accent-success, #10B981)',
        },
    ];

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground font-serif">
                    Good morning, Admin
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {today} · Here&apos;s what&apos;s happening on Fable today.
                </p>
            </div>

            {/* Section label */}
            <div className="flex items-center gap-2">
                <Bookmark className="size-4 text-primary" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Analytics Overview
                </h2>
            </div>

            {/* Small stat cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((c, i) => (
                    <StatCard key={c.label} index={i} {...c} />
                ))}
            </div>

            {/* Revenue hero card */}
            <RevenueHeroCard totalRevenue={totalRevenue}/>
        </div>
    );
}