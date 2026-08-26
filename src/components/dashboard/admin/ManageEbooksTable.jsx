"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, Chip, Button } from "@heroui/react";
import {
    TrashBin,
    Eye,
    EyeSlash,
    BookOpen,
    TriangleExclamation,
    Layers
} from "@gravity-ui/icons";
import { deleteBook, updateBookStatus } from "@/lib/api/books";

// status er upor base kore color map
const statusColorMap = {
    published: "success",
    unpublished: "warning",
    draft: "default",
};

export default function ManageEbooksTable({ initialBooks = [] }) {
    const [books, setUsersBooks] = useState(initialBooks);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // 1. Status toggle dialog open korar handler
    const handleOpenToggleModal = (book) => {
        setSelectedBook(book);
        setIsToggleModalOpen(true);
    };

    // 2. Delete dialog open korar handler
    const handleOpenDeleteModal = (book) => {
        setSelectedBook(book);
        setIsDeleteModalOpen(true);
    };

    // 3. Status publish / unpublish toggle confirmation
    const handleConfirmStatusToggle = async () => {
        if (!selectedBook) return;
        setLoading(true);

        const updatedStatus = selectedBook.status === "published" ? "unpublished" : "published";

        try {
            await updateBookStatus(selectedBook._id, updatedStatus)
            console.log(`Toggle book status ${selectedBook._id} to ${updatedStatus}`);

            // Local state optimistic update
            setUsersBooks((prev) =>
                prev.map((b) =>
                    b._id === selectedBook._id ? { ...b, status: updatedStatus } : b
                )
            );

            setIsToggleModalOpen(false);
            setSelectedBook(null);
        } catch (error) {
            console.error("Status update error:", error);
        } finally {
            setLoading(false);
        }
    };

    // 4. Book delete confirmation
    const handleConfirmDelete = async () => {
        if (!selectedBook) return;
        setLoading(true);

        try {
            await deleteBook(selectedBook._id)
            console.log(`Delete ebook ${selectedBook._id}`);

            // Local state theke delete kora
            setUsersBooks((prev) => prev.filter((b) => b._id !== selectedBook._id));

            setIsDeleteModalOpen(false);
            setSelectedBook(null);
        } catch (error) {
            console.error("Delete book error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-6 space-y-6">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                        Manage All Ebooks
                    </h2>
                    <p className="text-sm text-text-secondary">
                        Review uploaded books, change publishing visibility, or remove listings.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Chip variant="flat" color="primary" className="font-semibold">
                        Total Ebooks: {books.length}
                    </Chip>
                </div>
            </div>

            {/* HeroUI Table with Framer Motion wrapper */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border-main bg-bg-secondary p-2 shadow-sm overflow-hidden"
            >
                <Table className="min-w-full">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Ebooks management table" className="w-full">
                            <Table.Header className="border-b border-border-main bg-bg-primary/50 text-xs font-bold uppercase text-text-secondary">
                                <Table.Column isRowHeader className="py-3.5 px-4 text-left">Ebook Info</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Writer</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Price</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Status</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-right">Actions</Table.Column>
                            </Table.Header>

                            <Table.Body
                                items={books}
                                emptyContent="No ebooks found in database."
                                className="divide-y divide-border-main"
                            >
                                {(book) => (
                                    <Table.Row
                                        key={book._id || book.id}
                                        className="transition-colors hover:bg-bg-primary/40"
                                    >
                                        {/* Book cover & title */}
                                        <Table.Cell className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                {book?.coverImage || book?.image ? (
                                                    <img
                                                        src={book?.coverImage || book?.image}
                                                        alt={book?.title || "Book"}
                                                        className="size-10 rounded-lg object-cover ring-1 ring-border-main"
                                                    />
                                                ) : (
                                                    <div className="size-10 rounded-lg flex items-center justify-center bg-brand-primary/10 text-brand-primary ring-1 ring-border-main">
                                                        <BookOpen className="size-5" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-semibold text-text-primary line-clamp-1 max-w-[200px] sm:max-w-xs">
                                                        {book?.title || "Untitled Book"}
                                                    </p>
                                                    <span className="text-[11px] text-text-secondary block">
                                                        Category: {book?.genre || "General"}
                                                    </span>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* Writer Name */}
                                        <Table.Cell className="py-4 px-4 text-sm text-text-secondary font-medium">
                                            {book?.writerName || book?.author || "Unknown Writer"}
                                        </Table.Cell>

                                        {/* Price */}
                                        <Table.Cell className="py-4 px-4 text-sm font-semibold text-text-primary">
                                            {book?.price === 0 || book?.price === "0" || book?.isFree
                                                ? "Free"
                                                : `$${book?.price}`}
                                        </Table.Cell>

                                        {/* Status Chip */}
                                        <Table.Cell className="py-4 px-4">
                                            <Chip
                                                variant="flat"
                                                size="sm"
                                                color={statusColorMap[book?.status?.toLowerCase()] || "default"}
                                                className="font-semibold capitalize text-xs tracking-wide"
                                            >
                                                {book?.status || "unpublished"}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Actions */}
                                        <Table.Cell className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Publish / Unpublish Toggle button */}
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color={book?.status === "published" ? "warning" : "success"}
                                                    onPress={() => handleOpenToggleModal(book)}
                                                    className="rounded-lg font-medium text-xs gap-1.5 h-8 px-3"
                                                    startContent={
                                                        book?.status === "published" ? (
                                                            <EyeSlash className="size-3.5" />
                                                        ) : (
                                                            <Eye className="size-3.5" />
                                                        )
                                                    }
                                                >
                                                    {book?.status === "published" ? "Unpublish" : "Publish"}
                                                </Button>

                                                {/* Delete button */}
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="danger"
                                                    onPress={() => handleOpenDeleteModal(book)}
                                                    className="rounded-lg font-medium text-xs gap-1.5 h-8 px-3"
                                                    startContent={<TrashBin className="size-3.5" />}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </motion.div>

            {/* Toggle Status Modal */}
            <AnimatePresence>
                {isToggleModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-2xl border border-border-main bg-bg-secondary p-6 shadow-2xl space-y-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                                    <Layers className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary">Change Ebook Visibility</h3>
                                    <p className="text-xs text-text-secondary">Update publishing status</p>
                                </div>
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed">
                                Are you sure you want to{" "}
                                <strong className="text-text-primary uppercase">
                                    {selectedBook?.status === "published" ? "Unpublish" : "Publish"}
                                </strong>{" "}
                                the ebook titled <strong className="text-text-primary">{selectedBook?.title}</strong>?
                            </p>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="bordered"
                                    onPress={() => setIsToggleModalOpen(false)}
                                    className="rounded-xl border-border-main font-medium text-xs"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color={selectedBook?.status === "published" ? "warning" : "success"}
                                    isLoading={loading}
                                    onPress={handleConfirmStatusToggle}
                                    className="rounded-xl font-semibold text-xs text-white"
                                >
                                    Confirm {selectedBook?.status === "published" ? "Unpublish" : "Publish"}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-2xl border border-border-main bg-bg-secondary p-6 shadow-2xl space-y-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-danger/10 text-danger">
                                    <TriangleExclamation className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary">Delete Ebook</h3>
                                    <p className="text-xs text-text-secondary">This action is irreversible</p>
                                </div>
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed">
                                Are you sure you want to permanently delete{" "}
                                <strong className="text-text-primary">"{selectedBook?.title}"</strong> by{" "}
                                <span className="text-text-primary">{selectedBook?.writerName || selectedBook?.author}</span>?
                            </p>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="bordered"
                                    onPress={() => setIsDeleteModalOpen(false)}
                                    className="rounded-xl border-border-main font-medium text-xs"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="danger"
                                    isLoading={loading}
                                    onPress={handleConfirmDelete}
                                    className="rounded-xl font-semibold text-xs text-white"
                                >
                                    Confirm Delete
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}