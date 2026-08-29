import Link from "next/link";
import { ArrowLeft, BookOpen } from "@gravity-ui/icons";
import { getBookById } from "@/lib/api/books";
import EbookDetailsClient from "@/components/ebooks/EbookDetailsClient";
import { getUserSession } from "@/lib/session";
import { checkPurchaseStatus } from "@/lib/actions/payment";

export default async function EbookDetailsPage({ params }) {
    const { id } = await params;
    const book = await getBookById(id);
    const user = await getUserSession();

    // function ta call kore status newa hosse
    const isPurchased = user?.id ? await checkPurchaseStatus(user.id, id) : false;

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
            currentUser={user || null} 
            isPurchased={isPurchased}
        />
    );
}