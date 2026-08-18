import ManageEbooks from '@/components/dashboard/ManageEbooks';
import { getBooksByWriter } from '@/lib/api/books';
import { auth } from '@/lib/auth'; // actual auth setup path
import { headers } from 'next/headers';

const WriterEbooksPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const books = await getBooksByWriter(session?.user?.id);

    // console.log("books:", JSON.stringify(books, null, 2));

    return <ManageEbooks books={books ?? []} />;
};

export default WriterEbooksPage;