import PurchasedCardStack from "@/components/dashboard/reader/PurchasedCardStack";
import { BookOpen } from "@gravity-ui/icons";
import { getUserPurchases } from "@/lib/actions/payment";
import { getUserSession } from "@/lib/session";



export default async function PurchasedEbooksPage() {

    const user = await getUserSession()

   console.log("Current User :", user);
    const books = await getUserPurchases(user.id)
    // console.log("find books", books)

    return (
        <div className="space-y-6 p-4 sm:p-8 max-w-5xl mx-auto">
            {/* হেডার */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                    <BookOpen className="h-4 w-4" />
                    <span>Personal Library</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
                    Purchased <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Ebooks</span>
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                    Interactive 3D Stack gallery view of your unlocked reads. Swipe or click to browse.
                </p>
            </div>

            {/* মোশন কার্ড স্ট্যাক */}
            <div className="pt-6">
                <PurchasedCardStack items={books} />
            </div>
        </div>
    );
}
