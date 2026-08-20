'use client';

import React, { useState, useMemo } from 'react';
import EbookCard from '@/components/ebooks/EbookCard';
import BookFilter from '@/components/ebooks/BookFilter';
import EbookPagination from './EbookPagination';
import BookCardSkeleton from '@/components/ebooks/BookCardSkeleton';
import { getBooks } from '@/lib/api/books';
import { SlidersVertical } from '@gravity-ui/icons';

const DEFAULT_FILTERS = {
    search: '',
    genre: 'all',
    priceRange: 'all',
    sortBy: 'newest',
};

// server theke asha data gula props hishebe ashbe
export default function BrowseEbooksClient({
    initialBooks = [],
    initialTotalPages = 1,
    currentPageNumber = 1
}) {
    const [books, setBooks] = useState(initialBooks);
    const [page, setPage] = useState(currentPageNumber);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    // page change korar handler function
    const handlePageChange = async (newPage) => {
        if (newPage === page || newPage < 1 || newPage > totalPages) return;

        setPage(newPage);
        setLoading(true);

        try {
            const data = await getBooks(newPage, 8);
            setBooks(data?.books || []);
            setTotalPages(data?.totalPages || 1);
        } catch (err) {
            console.error('Page data load korte problem hoyeche:', err);
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // dynamic filtering ebong sorting logic
    const filteredBooks = useMemo(() => {
        return books
            .filter((book) => {
                // 1. search filter (title ebong description check korbe)
                const matchSearch =
                    filters.search.trim() === '' ||
                    book.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
                    book.description?.toLowerCase().includes(filters.search.toLowerCase());

                // 2. genre filter
                const matchGenre =
                    filters.genre === 'all' ||
                    book.genre?.toLowerCase() === filters.genre.toLowerCase();

                // 3. price filter (takar poriman check korbe)
                const bookPrice = Number(book.price) || 0;
                let matchPrice = true;
                if (filters.priceRange === 'free') matchPrice = bookPrice === 0;
                else if (filters.priceRange === 'paid') matchPrice = bookPrice > 0;
                else if (filters.priceRange === 'under500') matchPrice = bookPrice < 500;
                else if (filters.priceRange === '500plus') matchPrice = bookPrice >= 500;

                return matchSearch && matchGenre && matchPrice;
            })
            .sort((a, b) => {
                // 4. sorting logic
                if (filters.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
                if (filters.sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
                if (filters.sortBy === 'price-low') return (Number(a.price) || 0) - (Number(b.price) || 0);
                if (filters.sortBy === 'price-high') return (Number(b.price) || 0) - (Number(a.price) || 0);
                if (filters.sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
                return 0;
            });
    }, [books, filters]);

    const handleReset = () => setFilters(DEFAULT_FILTERS);

    return (
        <>
            {/* search ebong filter bar */}
            <BookFilter
                filters={filters}
                setFilters={setFilters}
                onReset={handleReset}
            />

            {/* koyta boi pawa gelo tar counter */}
            <div className="mb-4 flex items-center justify-between text-xs sm:text-sm text-[var(--text-secondary)]">
                <span>
                    Showing <strong className="text-[var(--text-primary)]">{filteredBooks.length}</strong> of{' '}
                    {books.length} ebooks on this page
                </span>
            </div>

            {/* loading thakle skeleton dekhabe, na hole books grid */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <BookCardSkeleton key={idx} />
                    ))}
                </div>
            ) : (
                /* responsive grid: mobile e 2ta, tab e 3ta, desktop e 4ta */
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <EbookCard key={book._id} book={book} isPurchased={false} />
                        ))
                    ) : (
                        /* search kore kichu na pawa gele empty state */
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
            )}

            {/* pagination controls */}
            <EbookPagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}