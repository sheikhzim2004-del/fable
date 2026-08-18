import ManageEbooks from '@/components/dashboard/ManageEbooks';
import { getBooks } from '@/lib/api/books';
import React from 'react';

const WriterEbooksPage = async() => {

    const bookId = "book_123"
    const books = await getBooks(bookId)
    console.log("books", books)
    return <ManageEbooks books={books}></ManageEbooks>

    return (
        <div>
            <h1>Writer Ebooks</h1>
        </div>
    );
};

export default WriterEbooksPage;