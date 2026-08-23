import ReaderDashboard from '@/components/dashboard/reader/ReaderDashboard';
import { getUserPurchases } from '@/lib/actions/payment';
import { getBooks } from '@/lib/api/books';
import { getUserSession } from '@/lib/session';
import React from 'react';

const readerDashboardHomePage = async() => {

    const user = await getUserSession()
    const userId = user?.id;
    // console.log("uesrid", userId)
    const purchases = await getUserPurchases(userId);

    const {books: recommendedBooks} = await getBooks(1, 3, "published")



    return (
        <div>
            <ReaderDashboard 
            user={user}
            purchases={purchases}
            recommendedBooks={recommendedBooks}
            ></ReaderDashboard>
        </div>
    );
};

export default readerDashboardHomePage;