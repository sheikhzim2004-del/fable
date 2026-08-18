'use client';

import React from 'react';
import {
    InputGroup,
    TextField,
    Label,
    Select,
    ListBox,
    Button,
} from '@heroui/react';
import { Magnifier, Xmark, ArrowRotateLeft } from '@gravity-ui/icons';

// ড্রপডাউনের ক্যাটাগরি অপশন
const GENRES = [
    { id: 'all', name: 'All Genres' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'romance', name: 'Romance' },
    { id: 'technology', name: 'Technology' },
    { id: 'history', name: 'History' },
    { id: 'education', name: 'Education' },
];

// প্রাইস রেঞ্জ অপশন
const PRICE_OPTIONS = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free Only (৳ 0)' },
    { id: 'paid', name: 'Paid Ebooks' },
    { id: 'under500', name: 'Under ৳ 500' },
    { id: '500plus', name: '৳ 500 & Above' },
];

// সর্টিং অপশন
const SORT_OPTIONS = [
    { id: 'newest', name: 'Latest Arrivals' },
    { id: 'oldest', name: 'Oldest' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'title-asc', name: 'Title: A to Z' },
];

export default function BookFilter({ filters, setFilters, onReset }) {
    const handleSearchChange = (val) => {
        setFilters((prev) => ({ ...prev, search: val }));
    };

    const handleGenreChange = (keys) => {
        if (!keys) return;
        const selected = typeof keys === "string" ? keys : Array.from(keys)[0];
        console.log("Selected Genre:", selected);
        setFilters((prev) => ({ ...prev, genre: selected || "all" }));
    };

    const handlePriceChange = (keys) => {
        if (!keys) return;
        const selected = typeof keys === "string" ? keys : Array.from(keys)[0];
        setFilters((prev) => ({ ...prev, priceRange: selected || "all" }));
    };

    const handleSortChange = (keys) => {
        if (!keys) return;
        const selected = typeof keys === "string" ? keys : Array.from(keys)[0];
        setFilters((prev) => ({ ...prev, sortBy: selected || "newest" }));
    };

    return (
        <div className="w-full mb-8 p-4 sm:p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">

                {/* ১. সার্চ বার (InputGroup) */}
                <div className="lg:col-span-4">
                    <TextField className="w-full">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">
                            Search Ebooks
                        </Label>
                        <InputGroup className="border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-xl px-3 py-2 flex items-center focus-within:border-[var(--primary)] transition-all">
                            <InputGroup.Prefix className="text-[var(--text-secondary)] mr-2">
                                <Magnifier className="w-4 h-4" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="Search by title or summary..."
                                value={filters.search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none"
                            />
                            {filters.search && (
                                <InputGroup.Suffix className="ml-2">
                                    <button
                                        type="button"
                                        onClick={() => handleSearchChange('')}
                                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                    >
                                        <Xmark className="w-4 h-4" />
                                    </button>
                                </InputGroup.Suffix>
                            )}
                        </InputGroup>
                    </TextField>
                </div>

                {/* ২. জেনার ড্রপডাউন (HeroUI Select) */}
                <div className="lg:col-span-3">
                    <Select
                        selectedKeys={[filters.genre]}
                        onSelectionChange={handleGenreChange}
                        className="w-full"
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">
                            Genre
                        </Label>
                        <Select.Trigger className="w-full flex items-center justify-between border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--primary)]">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-xl shadow-xl z-50">
                            <ListBox className="p-1.5">
                                {GENRES.map((g) => (
                                    <ListBox.Item
                                        key={g.id}
                                        id={g.id}
                                        textValue={g.name}
                                        className="px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] rounded-lg cursor-pointer transition-colors"
                                    >
                                        <Label className="cursor-pointer">{g.name}</Label>
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* ৩. প্রাইস ফিল্টার ড্রপডাউন */}
                <div className="lg:col-span-2">
                    <Select
                        selectedKeys={[filters.priceRange]}
                        onSelectionChange={handlePriceChange}
                        className="w-full"
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">
                            Price
                        </Label>
                        <Select.Trigger className="w-full flex items-center justify-between border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--primary)]">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-xl shadow-xl z-50">
                            <ListBox className="p-1.5">
                                {PRICE_OPTIONS.map((p) => (
                                    <ListBox.Item
                                        key={p.id}
                                        id={p.id}
                                        className="px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] rounded-lg cursor-pointer transition-colors"
                                    >
                                        <Label className="cursor-pointer">{p.name}</Label>
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* ৪. সর্টিং ফিল্টার ড্রপডাউন */}
                <div className="lg:col-span-2">
                    <Select
                        selectedKeys={[filters.sortBy]}
                        onSelectionChange={handleSortChange}
                        className="w-full"
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">
                            Sort By
                        </Label>
                        <Select.Trigger className="w-full flex items-center justify-between border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--primary)]">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-xl shadow-xl z-50">
                            <ListBox className="p-1.5">
                                {SORT_OPTIONS.map((s) => (
                                    <ListBox.Item
                                        key={s.id}
                                        id={s.id}
                                        className="px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] rounded-lg cursor-pointer transition-colors"
                                    >
                                        <Label className="cursor-pointer">{s.name}</Label>
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* ৫. ফিল্টার রিসেট বাটন */}
                <div className="lg:col-span-1">
                    <Button
                        type="button"
                        onClick={onReset}
                        title="Reset Filters"
                        className="w-full h-[42px] rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-danger hover:border-danger/40 transition-all flex items-center justify-center"
                    >
                        <ArrowRotateLeft className="w-4 h-4" />
                    </Button>
                </div>

            </div>
        </div>
    );
}