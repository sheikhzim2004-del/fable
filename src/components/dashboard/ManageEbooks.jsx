"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, TrashBin, CircleCheck, CircleXmark } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { Table, Chip, Button, AlertDialog } from "@heroui/react";
import Link from "next/link";

const columns = [
    { id: "title", name: "Title" },
    { id: "price", name: "Price" },
    { id: "status", name: "Status" },
    { id: "actions", name: "Actions" },
];

const statusColorMap = {
    published: "success",
    unpublished: "warning",
};

export default function ManageEbooks({ books: initialBooks }) {
    const [books, setBooks] = useState(initialBooks);
    const [deleteBook, setDeleteBook] = useState(null);

    const handleDelete = () => {
        if (!deleteBook) return;
        setBooks((prev) => prev.filter((book) => book._id !== deleteBook._id));
        toast.success(`"${deleteBook.title}" deleted successfully.`);
        setDeleteBook(null);
    };

    const handleTogglePublish = (id) => {
        setBooks((prev) =>
            prev.map((book) => {
                if (book._id !== id) return book;
                const newStatus = book.status === "published" ? "unpublished" : "published";
                toast.success(newStatus === "published" ? "Ebook published successfully." : "Ebook unpublished successfully.");
                return { ...book, status: newStatus };
            })
        );
    };

    const handleEdit = (book) => {
        toast.info(`Editing "${book.title}"`);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full"
        >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-2">
                <div></div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Manage Ebooks</h1>
                    <p className="mt-1 text-sm text-text-secondary">Manage your ebooks, publishing status and actions.</p>
                </div>
                <Button className="w-full rounded-xl bg-brand-primary px-5 font-semibold text-white sm:w-auto">
                    <Link href={'/dashboard/writer/ebooks/add'}>
                        Add New Ebook
                    </Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border-color bg-bg-secondary shadow-sm">
                <Table>
                    <Table.ScrollContainer className="overflow-x-auto">
                        <Table.Content aria-label="Manage ebooks table" className="min-w-[700px]">
                            <Table.Header className="bg-bg-primary">
                                {columns.map((column) => (
                                    <Table.Column
                                        key={column.id}
                                        id={column.id}
                                        isRowHeader={column.id === "title"}
                                        className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary"
                                    >
                                        {column.name}
                                    </Table.Column>
                                ))}
                            </Table.Header>

                            <Table.Body>
                                <Table.Collection items={books}>
                                    {(book) => (
                                        <Table.Row key={book._id} className="border-t border-border-color transition-colors hover:bg-bg-primary/60">
                                            <Table.Cell className="px-5 py-4">
                                                <div className="max-w-[280px]">
                                                    <p className="truncate font-medium text-text-primary">{book.title}</p>
                                                    <p className="mt-0.5 text-xs text-text-secondary">Ebook</p>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-5 py-4">
                                                <span className="font-medium text-text-primary">৳ {book.price}</span>
                                            </Table.Cell>
                                            <Table.Cell className="px-5 py-4">
                                                <Chip color={statusColorMap[book.status]} size="sm" variant="soft" className="capitalize">
                                                    {book.status}
                                                </Chip>
                                            </Table.Cell>
                                            <Table.Cell className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="secondary"
                                                        aria-label={`Edit ${book.title}`}
                                                        onPress={() => handleEdit(book)}
                                                        className="text-text-secondary hover:text-brand-primary"
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onPress={() => handleTogglePublish(book._id)}
                                                        className="gap-1.5"
                                                    >
                                                        {book.status === "published" ? (
                                                            <>
                                                                <CircleXmark className="size-4" />
                                                                Unpublish
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CircleCheck className="size-4" />
                                                                Publish
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="secondary"
                                                        aria-label={`Delete ${book.title}`}
                                                        onPress={() => setDeleteBook(book)}
                                                        className="text-danger hover:bg-danger/10"
                                                    >
                                                        <TrashBin className="size-4" />
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Collection>

                                {books.length === 0 && (
                                    <Table.Row>
                                        <Table.Cell colSpan={4} className="px-5 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-brand-primary/10">
                                                    <CircleXmark className="size-6 text-brand-primary" />
                                                </div>
                                                <h3 className="font-semibold text-text-primary">No ebooks found</h3>
                                                <p className="mt-1 text-sm text-text-secondary">You haven't added any ebooks yet.</p>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            <AlertDialog isOpen={!!deleteBook} onOpenChange={(open) => { if (!open) setDeleteBook(null); }}>
                <AlertDialog.Backdrop />
                <AlertDialog.Container>
                    <AlertDialog.Dialog>
                        <AlertDialog.Header>
                            <AlertDialog.Icon />
                            <AlertDialog.Heading>Delete Ebook?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            Are you sure you want to delete <strong>{deleteBook?.title}</strong>? This action cannot be undone.
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button variant="secondary" onPress={() => setDeleteBook(null)}>Cancel</Button>
                            <Button className="bg-danger text-white" onPress={handleDelete}>Delete Ebook</Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog>
        </motion.section>
    );
}
