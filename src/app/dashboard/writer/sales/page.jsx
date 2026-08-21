import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getWriterSales } from "@/lib/api/books";
import WriterSalesClient from "@/components/dashboard/writer/WriterSalesClient";

export default async function WriterSalesPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const writerId = session?.user?.id;

    // Fetch sales and revenue data
    const { sales = [], totalSales = 0, count = 0 } = (await getWriterSales(writerId)) || {};

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-8">
            <WriterSalesClient
                initialSales={sales}
                totalRevenue={totalSales}
                totalTransactions={count || sales.length}
            />
        </div>
    );
}