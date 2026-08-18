'use client';

import React, { useState, useMemo } from 'react';
import EbookCard from '@/components/ebooks/EbookCard';
import BookFilter from '@/components/ebooks/BookFilter';
import { SlidersVertical } from '@gravity-ui/icons';

const DEFAULT_FILTERS = {
    search: '',
    genre: 'all',
    priceRange: 'all',
    sortBy: 'newest',
};

// সার্ভার থেকে আসা আসল বইগুলো 'initialBooks' প্রপস হিসেবে ঢুকবে
export default function BrowseEbooksClient({ initialBooks = [] }) {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    // ডাইনামিক ফিল্টারিং ও সার্চিং লজিক
    const filteredBooks = useMemo(() => {
        return initialBooks
            .filter((book) => {
                // ১. সার্চ ফিল্টার (টাইটেল এবং ডেসক্রিপশন মিলিয়ে দেখবে)
                const matchSearch =
                    filters.search.trim() === '' ||
                    book.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
                    book.description?.toLowerCase().includes(filters.search.toLowerCase());

                // ২. জেনার ফিল্টার
                const matchGenre =
                    filters.genre === 'all' ||
                    book.genre?.toLowerCase() === filters.genre.toLowerCase();

                // ৩. প্রাইস ফিল্টার (টাকা অনুযায়ী ফিল্টার)
                const bookPrice = Number(book.price) || 0;
                let matchPrice = true;
                if (filters.priceRange === 'free') matchPrice = bookPrice === 0;
                else if (filters.priceRange === 'paid') matchPrice = bookPrice > 0;
                else if (filters.priceRange === 'under500') matchPrice = bookPrice < 500;
                else if (filters.priceRange === '500plus') matchPrice = bookPrice >= 500;

                return matchSearch && matchGenre && matchPrice;
            })
            .sort((a, b) => {
                // ৪. সর্টিং লজিক
                if (filters.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
                if (filters.sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
                if (filters.sortBy === 'price-low') return (Number(a.price) || 0) - (Number(b.price) || 0);
                if (filters.sortBy === 'price-high') return (Number(b.price) || 0) - (Number(a.price) || 0);
                if (filters.sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
                return 0;
            });
    }, [initialBooks, filters]);

    const handleReset = () => setFilters(DEFAULT_FILTERS);

    return (
        <>
            {/* সার্চ ও ফিল্টার বার */}
            <BookFilter
                filters={filters}
                setFilters={setFilters}
                onReset={handleReset}
            />

            {/* কতগুলো বই পাওয়া গেল তার কাউন্টার */}
            <div className="mb-4 flex items-center justify-between text-xs sm:text-sm text-[var(--text-secondary)]">
                <span>
                    Showing <strong className="text-[var(--text-primary)]">{filteredBooks.length}</strong> of{' '}
                    {initialBooks.length} ebooks
                </span>
            </div>

            {/* রেসপনসিভ গ্রিড: মোবাইলে ২টা, ট্যাবে ৩টা, ডেক্সটপে ৪টা */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <EbookCard key={book._id} book={book} isPurchased={false} />
                    ))
                ) : (
                    /* সার্চ করে কিছু না পাওয়া গেলে */
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
                        <SlidersVertical className="w-12 h-12 text-[var(--text-secondary)]/40 mb-3" />
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                            No matching ebooks found
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-sm">
                            Try adjusting your search terms or clearing your selected filters.
                        </p>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="mt-4 text-xs font-semibold text-[var(--primary)] hover:underline"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}