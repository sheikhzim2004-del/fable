
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// boi fetch korar universal function (browse page ebong dashboard 2 jagay e kaj korbe)
export const getBooks = async (page = 1, limit = 8, status = "") => {
    let url = `${baseUrl}/api/books?page=${page}&limit=${limit}`;

    // status pathale query te add hobe, na pathale shob boi ashbe
    if (status) {
        url += `&status=${status}`;
    }

    const res = await fetch(url, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }
    return await res.json();
};


export const getBooksByWriter = async (writerId) => {
    try {
        const res = await fetch(`${baseUrl}/api/books?writerId=${writerId}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

//id wise book fetch function
export const getBookById = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/api/books/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch book: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


//id wise book delete fetch function
export const deleteBook = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/api/books/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        return res.json();

    } catch (error) {
        console.error(error);

        return {
            error: error.message || "Something went wrong"
        };
    }
};

// boi er status (published/unpublished) update korar helper function
export const updateBookStatus = async (id, status) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl}/api/books/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) {
        throw new Error("Failed to update status");
    }

    return await res.json();
};


export const getWriterSales = async (writerId) => {
    try {
        const res = await fetch(`${baseUrl}/payments/writer/${writerId}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        return res.json();
    } catch (error) {
        console.error(error);
        return { sales: [], totalSales: 0, count: 0 };
    }
};

//latest booklist for feature sectlion
export const getFeaturedEbooks = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/books`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Failed to fetch ebooks. Status: ${res.status}`);
            return [];
        }

        const data = await res.json();

        return data.slice(0, 6);
    } catch (error) {
        console.error("Error fetching featured ebooks:", error);
        return [];
    }
};

export const getTopWriters = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/top-writers`, {
            cache: "no-store",
        });

        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data.slice(0, 3) : [];
    } catch (error) {
        console.error("Error fetching top writers:", error);
        return [];
    }
};