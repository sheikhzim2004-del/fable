import TotalEbooks from "@/components/dashboard/writer/TotalEbooks";
import PublishedEbooks from "@/components/dashboard/writer/PublishedEbooks";
import UnpublishedEbooks from "@/components/dashboard/writer/UnpublishedEbooks";
import TotalSales from "@/components/dashboard/writer/TotalSales";
import RecentEbooks from "@/components/dashboard/writer/RecentEbooks";
import RecentSales from "@/components/dashboard/writer/RecentSales";
import { getBooksByWriter, getWriterSales } from "@/lib/api/books";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function WriterDashboard() {

  const session = await auth.api.getSession({ headers: await headers() });
  const writerId = session?.user?.id;

  const books = await getBooksByWriter(writerId);
  const { sales, totalSales } = await getWriterSales(writerId);

  const publishedCount = books.filter((b) => b.status === "published").length;
  const unpublishedCount = books.filter((b) => b.status === "unpublished").length;

  const recentBooks = [...books].reverse().slice(0, 5);
  const recentSales = sales.slice(0, 5);

  return (
    <div className="space-y-6 mx-4">
      <h1 className="text-3xl font-bold text-text-primary text-center mt-4">
        Writer Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <TotalEbooks count={books.length}/>
        <PublishedEbooks count={publishedCount}/>
        <UnpublishedEbooks count={unpublishedCount}/>
        <TotalSales amount={totalSales}/>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <RecentEbooks books={recentBooks}/>
        <RecentSales sales={recentSales}/>
      </div>
    </div>
  );
}