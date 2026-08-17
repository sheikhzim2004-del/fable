import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log("From Seller Dashboard", session);

    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};