"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ArrowUpFromLine } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

import {
    Form,
    Fieldset,
    Label,
    Input,
    TextField,
    TextArea,
    Select,
    ListBox,
    Button,
    FieldError,
} from "@heroui/react";

import Image from "next/image";
import { updateBook } from "@/lib/actions/books";

const genres = [
    {
        id: "fiction",
        label: "Fiction",
    },
    {
        id: "romance",
        label: "Romance",
    },
    {
        id: "technology",
        label: "Technology",
    },
    {
        id: "history",
        label: "History",
    },
    {
        id: "education",
        label: "Education",
    },
];

export default function UpdateEbookForm({ book }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: book.title || "",
        writerName: book.writerName || book?.writer || book?.author || "",
        description: book.description || "",
        price: book.price || "",
        genre: book.genre || "",
        coverImage: book.coverImage || "",
    });

    const [imageUploading, setImageUploading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);

        setFormData((prev) => ({
            ...prev,
            coverImage: preview,
        }));

        try {
            setImageUploading(true);

            const imageData = new FormData();
            imageData.append("image", file);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
                {
                    method: "POST",
                    body: imageData,
                }
            );

            const data = await res.json();

            if (!data.success) {
                throw new Error("Image upload failed");
            }

            setFormData((prev) => ({
                ...prev,
                coverImage: data.data.url,
            }));
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed");
        } finally {
            setImageUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.writerName ||
            !formData.description ||
            !formData.price ||
            !formData.genre ||
            !formData.coverImage
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (imageUploading) {
            toast.error("Please wait, image is still uploading...");
            return;
        }

        try {
            setUpdating(true);

            const res = await updateBook(book._id, formData);

            if (res.error) {
                toast.error(res.error);
                return;
            }

            toast.success("Ebook updated successfully!");

            router.push("/dashboard/writer/ebooks");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update ebook");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="mx-auto max-w-4xl rounded-3xl border border-border-color bg-bg-secondary p-6 shadow-xl"
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">
                    Update Ebook
                </h1>

                <p className="mt-2 text-text-secondary">
                    Update your ebook information and cover image.
                </p>
            </div>

            <Form onSubmit={handleSubmit} className="space-y-6">
                <Fieldset>
                    <Fieldset.Legend>Ebook Information</Fieldset.Legend>

                    <TextField
                        isRequired
                        value={formData.title}
                        onChange={(value) =>
                            handleChange("title", value)
                        }
                    >
                        <Label>Ebook Title</Label>

                        <Input placeholder="Enter ebook title" />

                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        value={formData.writerName}
                        onChange={(value) =>
                            handleChange("writerName", value)
                        }
                    >
                        <Label>Writer Name</Label>

                        <Input placeholder="Enter your name" />

                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        value={formData.description}
                        onChange={(value) =>
                            handleChange("description", value)
                        }
                    >
                        <Label>Full Description</Label>

                        <TextArea
                            placeholder="Write complete ebook content description..."
                            rows={8}
                        />

                        <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <TextField
                            isRequired
                            value={String(formData.price)}
                            onChange={(value) =>
                                handleChange("price", value)
                            }
                        >
                            <Label>Price ($)</Label>

                            <Input
                                type="number"
                                placeholder="10"
                            />
                        </TextField>

                        <Select
                            selectedKey={formData.genre}
                            onSelectionChange={(value) =>
                                handleChange("genre", value)
                            }
                        >
                            <Label>Genre</Label>

                            <Select.Trigger>
                                <Select.Value placeholder="Select genre" />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox>
                                    {genres.map((genre) => (
                                        <ListBox.Item
                                            key={genre.id}
                                            id={genre.id}
                                        >
                                            {genre.label}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </Fieldset>

                <Fieldset>
                    <Fieldset.Legend>Cover Image</Fieldset.Legend>

                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-color bg-bg-primary p-8 transition hover:border-brand-primary">
                        <ArrowUpFromLine className="h-8 w-8 text-brand-primary" />

                        <span className="mt-3 text-sm text-text-secondary">
                            Change Ebook Cover
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageUpload}
                        />
                    </label>

                    {formData.coverImage && (
                        <Image
                            height={400}
                            width={300}
                            src={formData.coverImage}
                            alt="Ebook cover preview"
                            className="mt-5 h-48 w-36 rounded-xl object-cover"
                        />
                    )}
                </Fieldset>

                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onPress={() =>
                            router.push("/dashboard/writer/ebooks")
                        }
                        className="w-full rounded-xl py-3"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={imageUploading || updating}
                        className="w-full rounded-xl bg-brand-primary py-3 font-semibold text-white hover:opacity-90"
                    >
                        {updating
                            ? "Updating..."
                            : imageUploading
                                ? "Uploading..."
                                : "Update Ebook"}
                    </Button>
                </div>
            </Form>
        </motion.div>
    );
}