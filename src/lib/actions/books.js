'use server'


const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const creatBook = async (bookData) => {
    try {
        const res = await fetch(`${baseUrl}/api/books`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })

        return res.json();

    } catch (error) {
        return { error: error.message || "Something went wrong" };
    }
}


export const updateBook = async (id, updatedData) => {
    try {
        const res = await fetch(`${baseUrl}/api/books/${id}`, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
    } catch (error) {
        console.error(error);
        return { error: error.message || "Something went wrong" };
    }
}


//mutation data in next doc web