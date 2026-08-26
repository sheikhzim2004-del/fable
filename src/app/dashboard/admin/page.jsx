import AdminDashboardAnalyticsOverview from "@/components/dashboard/admin/AdminDashboardAnalyticsOverview";
import { getAllTransactions } from "@/lib/actions/payment";
import { getAllUsers, getBooks } from "@/lib/api/books";

export default async function AdminDashboardPage() {

    const users = await getAllUsers();
    const { books } = await getBooks()
    const totalSoldBooks = await getAllTransactions()
    console.log("all books", books)

    //calculate totalusers and totalwriters
    const totalUsersCount = users?.length || 0;
    const totalWritersCount = users?.filter(user => user.role === "writer")?.length || 0;
    const totalBooksCount = books.length || 0;
    const totalSoldBooksCount = totalSoldBooks?.length || 0;

    let totalRevenue = 0;

    if(Array.isArray(totalSoldBooks)){
        for(let i = 0; i < totalSoldBooks.length; i++){
            const item = totalSoldBooks[i];
            totalRevenue = totalRevenue + Number(item?.price) || 0;
        }
    }

    console.log("total revenue", totalRevenue)

    const analyticsData = {
        totalUsersCount: totalUsersCount,
        totalWritersCount: totalWritersCount,
        totalBooksCount: totalBooksCount,
        totalSoldBooksCount: totalSoldBooksCount,
        totalRevenue: totalRevenue,
    }

    return (
        <div className="w-full min-h-screen bg-[var(--bg-primary)]">
            <div className="p-6 max-w-7xl mx-auto">
                <AdminDashboardAnalyticsOverview analyticsData={analyticsData} />
            </div>
        </div>
    );
}