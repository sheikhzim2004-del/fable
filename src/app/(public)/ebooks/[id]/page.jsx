// src/app/(public)/ebooks/[id]/page.jsx
import Link from "next/link";
import { ArrowLeft, BookOpen } from "@gravity-ui/icons";
import { getBookById } from "@/lib/api/books";
import EbookDetailsClient from "@/components/ebooks/EbookDetailsClient";

export default async function EbookDetailsPage({ params }) {
    const { id } = await params;
    const book = await getBookById(id);

    // Error State: "Ebook not found" for invalid ID
    if (!book || !book._id) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <div className="p-4 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                    <BookOpen className="size-10" />
                </div>
                <h1 className="text-2xl font-bold text-text-primary">Ebook Not Found</h1>
                <p className="mt-2 text-sm text-text-secondary max-w-sm">
                    The ebook you are looking for does not exist, has an invalid ID, or has been removed.
                </p>
                <Link
                    href="/ebooks"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90"
                >
                    <ArrowLeft className="size-4" />
                    <span>Return to Browse</span>
                </Link>
            </div>
        );
    }

    return (
        <EbookDetailsClient
            book={book}
            currentUser={null} // সেশন/auth হ্যান্ডেলিং যুক্ত থাকলে পাস korte hobe (যেমন: session?.user)
            isPurchased={false}
        />
    );
}