
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getBooks = async (bookId, status="unpublished")=>{
    const res = await fetch(`${baseUrl}/api/books?bookId=${bookId}&status=${status}`);
    return res.json();
}