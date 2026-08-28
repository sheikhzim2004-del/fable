export const dynamic = "force-dynamic";

import AdminDashboardAnalyticsOverview from "@/components/dashboard/admin/AdminDashboardAnalyticsOverview";
import MonthlySalesBarChart from "@/components/dashboard/admin/MonthlySalesBarChart";
import StraightAnglePieChart from "@/components/dashboard/admin/StraightAnglePieChart";
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
    if (Array.isArray(totalSoldBooks)) {
        for (let i = 0; i < totalSoldBooks.length; i++) {
            const item = totalSoldBooks[i];
            totalRevenue = totalRevenue + Number(item?.price) || 0;
        }
    }

    let genreCounts = {};
    if (Array.isArray(books)) {
        for (let i = 0; i < books?.length; i++) {
            const book = books[i];
            const genre = book?.genre || "Uncategorized";
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        }
    }

    const genrePieData = [];
    const genreKeys = Object.keys(genreCounts); // genre gular array

    for (let i = 0; i < genreKeys.length; i++) {
        const genreName = genreKeys[i];
        genrePieData.push({
            name: genreName,
            value: genreCounts[genreName]
        });
    }

    //2. bar chart er month list jar upor depend kore kon mashe koto sell fixed kora hobe
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlySalesMap = {};

    for (let i = 0; i < months.length; i++) {
        monthlySalesMap[months[i]] = 0;
    }

    // 3. transaction loop kore mash onujayi mot selse add kora
    if (Array.isArray(totalSoldBooks)) {
        for (let i = 0; i < totalSoldBooks.length; i++) {
            const tx = totalSoldBooks[i];

            // transaction date theke masher name ber kora(createdAt or paymentDate)
            const date = new Date(tx?.createdAt || tx?.date || Date.now());
            const monthIndex = date.getMonth(); // 0 to 11
            const monthName = months[monthIndex];

            //mot bikrir taka ba shongkha add (price / amount)
            const saleAmount = Number(tx?.price || tx?.amount || 1);
            monthlySalesMap[monthName] = (monthlySalesMap[monthName] || 0) + saleAmount;
        }
    }

    // 4. Recharts-er jonno final array creat
    const monthlySalesData = [];
    for (let i = 0; i < months.length; i++) {
        monthlySalesData.push({
            name: months[i],
            sales: monthlySalesMap[months[i]]
        });
    }

    // console.log("genreCount", genreCount)
    // console.log("total revenue", totalRevenue)

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
                <StraightAnglePieChart chartData={genrePieData}></StraightAnglePieChart>
                <MonthlySalesBarChart monthlySalesData={monthlySalesData}></MonthlySalesBarChart>
            </div>
        </div>
    );
}