// Base URL set kora (Local ebong Live duita-r jonno safe fallback)
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

// 1. user bookmark kora bookgula fetch korar functtion
export const getBookmarkedBooks = async (userEmail) => {
    try {
        if (!userEmail) return [];

        const res = await fetch(`${baseUrl}/api/bookmarks/${userEmail}`, {
            cache: "no-store", // Protibar fresh data anbe
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch bookmarks: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return [];
    }
};

// 2. bookmark toggle (Add / Remove) er function
export const toggleBookmarkAction = async (userEmail, bookId) => {
    try {
        const res = await fetch(`${baseUrl}/api/bookmarks/toggle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail, bookId }),
        });

        if (!res.ok) {
            throw new Error(`Failed to toggle bookmark: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return null;
    }
};