import { headers } from "next/headers"
import { auth } from "./auth"

export const getUserSession = async() => {
    const session = await auth.api.getUserSession({
        headers: await headers()
    })
    return session?.user || null;
}