
import React, { Suspense } from 'react';
import BrowseEbooksClient from '@/components/ebooks/BrowseEbooksClient';
import BookCardSkeleton from '@/components/ebooks/BookCardSkeleton';
import { getBooks } from '@/lib/api/books';
import { CircleExclamation } from '@gravity-ui/icons';

// protibar real-time data pawar jonno
export const dynamic = 'force-dynamic';

export default async function BrowseEbooksPage({ searchParams }) {
    const params = await searchParams;
    const initialPage = parseInt(params?.page) || 1;
    const limit = 8;

    let books = [];
    let totalPages = 1;
    let error = null;

    try {
        // backend theke page ebong limit onushare data fetch kora hocche
        const data = await getBooks(initialPage, limit, "published");
        books = data?.books || [];
        totalPages = data?.totalPages || 1;
    } catch (err) {
        console.error('Server error fetching ebooks:', err);
        error = 'Failed to load ebooks from the server. Please try again later.';
    }

    return (
        <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">
                            Browse <span className="text-[var(--primary)]">Ebooks</span>
                        </h1>
                        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                            Discover stories, technical guides, and educational masterpieces.
                        </p>
                    </div>
                </div>

                {/* Server theke data fetch korte error hole */}
                {error ? (
                    <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/10 text-center my-12 flex flex-col items-center">
                        <CircleExclamation className="w-8 h-8 text-red-500 mb-2" />
                        <p className="font-semibold text-[var(--text-primary)]">{error}</p>
                    </div>
                ) : (
                    /* Initial load-e skeleton dekhabe, pore client component render hobe */
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                {Array.from({ length: 8 }).map((_, idx) => (
                                    <BookCardSkeleton key={idx} />
                                ))}
                            </div>
                        }
                    >
                        <BrowseEbooksClient
                            initialBooks={books}
                            initialTotalPages={totalPages}
                            currentPageNumber={initialPage}
                        />
                    </Suspense>
                )}

            </div>
        </main>
    );
}