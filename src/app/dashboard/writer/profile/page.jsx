import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBooksByWriter, getWriterSales } from "@/lib/api/books";
import WriterProfileClient from "@/components/dashboard/writer/WriterProfileClient";

export default async function WriterProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    // Fetch writer's summary stats
    const books = (await getBooksByWriter(user?.id)) || [];
    const { totalSales = 0 } = (await getWriterSales(user?.id)) || {};

    const stats = {
        totalBooks: books.length,
        publishedBooks: books.filter((b) => b.status === "published").length,
        totalSales,
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-8">
            <WriterProfileClient user={user} stats={stats} />
        </div>
    );
}