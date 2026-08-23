import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileClient from "@/components/dashboard/ProfileClient";

export default async function WriterProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;



    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-8">
            <ProfileClient user={user} />
        </div>
    );
}