
// src/app/(public)/ebooks/page.jsx

import React, { Suspense } from 'react';
import BrowseEbooksClient from '@/components/ebooks/BrowseEbooksClient';
import BookCardSkeleton from '@/components/ebooks/BookCardSkeleton';
import { getAllBooks } from '@/lib/api/books'; // আপনার আসল API ফাংশন
import { CircleExclamation } from '@gravity-ui/icons';

// প্রতিবার রিয়েল-টাইম ডেটা পাওয়ার জন্য
export const dynamic = 'force-dynamic';

export default async function BrowseEbooksPage() {
    let books = [];
    let error = null;

    try {
        // সরাসরি সার্ভার সাইড থেকে আপনার ডেটাবেজের আসল বইগুলো ফেচ করা হচ্ছে
        const data = await getAllBooks();
        books = Array.isArray(data) ? data : [];
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

                {/* সার্ভার থেকে ডেটা আনতে এরর হলে */}
                {error ? (
                    <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/10 text-center my-12 flex flex-col items-center">
                        <CircleExclamation className="w-8 h-8 text-red-500 mb-2" />
                        <p className="font-semibold text-[var(--text-primary)]">{error}</p>
                    </div>
                ) : (
                    /* লোডিংয়ের সময় স্কেলেটন দেখাবে, ডেটা চলে আসলে ক্লায়েন্ট কম্পোনেন্টে পাস করবে */
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                {Array.from({ length: 8 }).map((_, idx) => (
                                    <BookCardSkeleton key={idx} />
                                ))}
                            </div>
                        }
                    >
                        <BrowseEbooksClient initialBooks={books} />
                    </Suspense>
                )}

            </div>
        </main>
    );
}















// 'use client';

// import React, { useState, useEffect } from 'react';
// import BookCardSkeleton from '@/components/ebooks/BookCardSkeleton';
// import { CircleExclamation } from '@gravity-ui/icons';
// import EbookCard from '@/components/ebooks/EbookCard';
// import { getAllBooks } from '@/lib/api/books';

// export default function BrowseEbooksPage() {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function loadBooks() {
//             try {
//                 setLoading(true);

//                 // ১. await দিয়ে ডেটা রিসিভ করা
//                 const data = await getAllBooks();

//                 // ২. স্টেট আপডেট করা
//                 setBooks(data || []);
//             } catch (err) {
//                 console.error("Error loading books:", err);
//                 setError('Failed to load ebooks. Please try again later.');
//             } finally {
//                 // ৩. লোডিং স্টেট বন্ধ করা
//                 setLoading(false);
//             }
//         }

//         loadBooks();
//     }, []);

//     return (
//         <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//             <div className="max-w-7xl mx-auto">

//                 {/* Page Header */}
//                 <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
//                     <div>
//                         <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">
//                             Browse <span className="text-[var(--primary)]">Ebooks</span>
//                         </h1>
//                         <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
//                             Discover stories, technical guides, and educational masterpieces.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Error State */}
//                 {error && (
//                     <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/10 text-center my-12 flex flex-col items-center">
//                         <CircleExclamation className="w-8 h-8 text-red-500 mb-2" />
//                         <p className="font-semibold text-[var(--text-primary)]">{error}</p>
//                     </div>
//                 )}

//                 {/* Responsive Grid: 2 columns (Mobile), 3 columns (Tablet), 4 columns (Desktop) */}
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//                     {loading ? (
//                         Array.from({ length: 8 }).map((_, idx) => (
//                             <BookCardSkeleton key={idx} />
//                         ))
//                     ) : (
//                         books.map((book) => (
//                             <EbookCard
//                                 key={book._id}
//                                 book={book}
//                                 isPurchased={false}
//                             />
//                         ))
//                     )}
//                 </div>

//             </div>
//         </main>
//     );
// }