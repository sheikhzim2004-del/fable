import ManageEbooksTable from "@/components/dashboard/admin/ManageEbooksTable";
import { getBooks } from "@/lib/api/books";

export default async function AdminManageEbooksPage() {

    const { books } = await getBooks(1, 200, "")
    console.log("all book list get in the console", books)

    return (
        <div>
            <ManageEbooksTable initialBooks={books} />
        </div>
    );
}