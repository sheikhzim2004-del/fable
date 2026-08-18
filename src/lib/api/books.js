
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getBooks = async (bookId, status = "unpublished") => {
    const res = await fetch(`${baseUrl}/api/books?bookId=${bookId}&status=${status}`);
    return res.json();
}


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

//all books fetch 
export const getAllBooks = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/books`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching all books:", error);
        return [];
    }
};