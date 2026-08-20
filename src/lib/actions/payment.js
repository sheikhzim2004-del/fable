
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export const payment = async (data) => {
    const res = await fetch(`${baseUrl}/payment`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    return result;
}

export const checkPurchaseStatus = async (userId, bookId) => {
    if (!userId || !bookId) return false;

    try {
        const res = await fetch(`${baseUrl}/payment/check?userId=${userId}&bookId=${bookId}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return false;
        }

        const data = await res.json();
        return Boolean(data?.isPurchased);
    } catch (error) {
        console.error("Error checking purchase status:", error);
        return false;
    }
};