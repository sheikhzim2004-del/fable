"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, TrashBin, CircleCheck, CircleXmark } from "@gravity-ui/icons";
import { Table, Chip, Button, AlertDialog } from "@heroui/react";
import Link from "next/link";
import { deleteBook } from "@/lib/api/books";
import { toast } from "react-toastify";

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
  const [books, setBooks] = useState(initialBooks || []);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Status toggle handler
  const handleTogglePublish = (id) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book._id !== id) return book;
        const newStatus = book.status === "published" ? "unpublished" : "published";
        return { ...book, status: newStatus };
      })
    );
  };

  // Delete book handler
  const handleDelete = async () => {
    if (!selectedBook?._id) return;

    try {
      setDeleting(true);
      const res = await deleteBook(selectedBook._id);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      setBooks((prev) => prev.filter((book) => book._id !== selectedBook._id));
      toast.success("Ebook deleted successfully!");
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete ebook");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-2">
        <div />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Manage Ebooks</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage your ebooks, publishing status and actions.</p>
        </div>
        <Button className="w-full rounded-xl bg-brand-primary px-5 font-semibold text-white sm:w-auto">
          <Link href={"/dashboard/writer/ebooks/add"}>Add New Ebook</Link>
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
                          <Link href={`/dashboard/writer/ebooks/edit/${book._id}`}>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="secondary"
                              aria-label={`Edit ${book.title}`}
                              className="text-text-secondary hover:text-brand-primary"
                            >
                              <Pencil className="size-4" />
                            </Button>
                          </Link>

                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleTogglePublish(book._id)}
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
                            onClick={() => setSelectedBook(book)}
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
                        <p className="mt-1 text-sm text-text-secondary">You have not added any ebooks yet.</p>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* HeroUI AlertDialog Implementation */}
      <AlertDialog
        isOpen={!!selectedBook}
        onOpenChange={(open) => {
          if (!open) setSelectedBook(null);
        }}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px] border border-border-color bg-bg-secondary text-text-primary">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-text-primary">
                  Delete ebook permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-sm text-text-secondary">
                  This will permanently delete <strong className="text-text-primary">{selectedBook?.title}</strong> and all of its data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  onClick={() => setSelectedBook(null)}
                  disabled={deleting}
                  className="text-text-secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-danger text-white"
                >
                  {deleting ? "Deleting..." : "Delete Ebook"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </motion.section>
  );
}