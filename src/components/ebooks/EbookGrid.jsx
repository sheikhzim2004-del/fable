import EbookCard from "@/components/ebooks/EbookCard";

export default function EbookGrid({ books, loading }) {
    if (loading) {
        return (
            <div className="text-center py-16 text-text-secondary font-medium">
                Loading ebooks...
            </div>
        );
    }

    if (!books || books.length === 0) {
        return (
            <div className="text-center py-16 text-text-secondary font-medium">
                No ebooks found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
                <EbookCard key={book._id} book={book} />
            ))}
        </div>
    );
}