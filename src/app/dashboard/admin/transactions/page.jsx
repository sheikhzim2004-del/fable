export const dynamic = "force-dynamic";

import TransactionsTable from "@/components/dashboard/admin/TransactionsTable";
import { getAllTransactions } from "@/lib/actions/payment";

export default async function AdminTransactionsPage() {
    const transactions =await getAllTransactions()
    console.log("transaction payment", transactions)

    return (
        <div>
            <TransactionsTable initialTransactions={transactions} />
        </div>
    );
}