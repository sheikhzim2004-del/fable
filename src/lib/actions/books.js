'use server'


const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const creatBook = async (newBookData) => {
    try {
        const res = await fetch(`${baseUrl}/api/books`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBookData)
        })

        return res.json();

    } catch (error) {
        return { error: error.message || "Something went wrong" };
    }
}