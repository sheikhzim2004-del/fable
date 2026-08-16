import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";


export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    console.log("From Seller Dashboard", session);

    // if (session?.user?.plan !== "free") {
    //     return NextResponse.redirect(new URL("/pricing", request.url));
    // }

    if (!session) {
        return NextResponse.redirect(new URL("/register", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
    ]
};