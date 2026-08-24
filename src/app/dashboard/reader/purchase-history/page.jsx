import React from "react";
import PurchaseHistoryTable from "@/components/dashboard/reader/PurchaseHistoryTable";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/session";
import { getUserPurchases } from "@/lib/actions/payment";

export const dynamic = "force-dynamic";

export default async function ReaderPurchaseHistoryPage() {
    // 1. user session fetch
    const user = await getUserSession();
    // console.log("user identity", user)

    // user na thakle login page e jabe
    if (!user) {
        redirect("/login");
    }

    // 2. user id diye purchase data fetch kora
    const userId = user?.id;
    let purchases = [];
    
    try {
        purchases = await getUserPurchases(userId);
        console.log("purchase user by pay", purchases)
    } catch (error) {
        console.error("Error fetching purchases:", error);
    }

    return (
        <main className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-4 sm:p-6 lg:p-8">
            <PurchaseHistoryTable 
                purchases={purchases || []} 
                user={user} 
            />
        </main>
    );
}