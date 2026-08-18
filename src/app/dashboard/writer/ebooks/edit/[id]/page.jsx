import { getBookById } from "@/lib/api/books";
import UpdateEbookForm from "@/components/dashboard/UpdateEbookForm";
import { notFound } from "next/navigation";

const EditEbookPage = async ({ params }) => {
    const { id } = await params;

    const book = await getBookById(id);

    if (!book) {
        notFound();
    }

    return <UpdateEbookForm book={book} />;
};

export default EditEbookPage;