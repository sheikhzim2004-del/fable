"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { creatBook } from "@/lib/actions/books";
import { toast } from "react-toastify";
import { Book, Picture, CircleDollar, Tag, ArrowUpFromLine } from "@gravity-ui/icons";

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

export default function AddEbookForm() {

    const initialFormData = {
        title: "",
        description: "",
        price: "",
        genre: "",
        coverImage: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [imageUploading, setImageUploading] = useState(false);


    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // instant local preview
        const preview = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, coverImage: preview }));

        try {
            setImageUploading(true);

            const imageData = new FormData();
            imageData.append("image", file);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
                { method: "POST", body: imageData }
            );

            const data = await res.json();

            if (!data.success) {
                throw new Error("Image upload failed");
            }

            setFormData(prev => ({
                ...prev,
                coverImage: data.data.url,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setImageUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( !formData.title || !formData.description || !formData.price || !formData.genre || !formData.coverImage) {
            toast.error("Please fill all fields");
            return;
        }

        if (imageUploading) {
            toast("Please wait, image is still uploading...")
            return;
        }



        const bookData = {
            ...formData,
            status: "unpublished",
            createdAt: new Date(),
            bookId: "book_123"
        };

        console.log("bookdata", bookData);
        const res = await creatBook(bookData);

        if (res.insertedId) {
            toast.success("Book posted successfully!")
            setFormData(initialFormData);
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
            {/* Header */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">
                    Add New Ebook
                </h1>

                <p className="mt-2 text-text-secondary">
                    Share your knowledge with readers around the world.
                </p>
            </div>

            <Form onSubmit={handleSubmit} className="space-y-6">
                <Fieldset>
                    <Fieldset.Legend>Ebook Information</Fieldset.Legend>

                    {/* Title */}

                    <TextField
                        isRequired
                        value={formData.title}
                        onChange={(value) => handleChange("title", value)}
                    >
                        <Label>Ebook Title</Label>

                        <Input placeholder="Enter ebook title" />

                        <FieldError />
                    </TextField>

                    {/* Description */}

                    <TextField
                        isRequired
                        value={formData.description}
                        onChange={(value) => handleChange("description", value)}
                    >
                        <Label>Full Description</Label>

                        <TextArea
                            placeholder="Write complete ebook content description..."
                            rows={8}
                        />

                        <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Price */}

                        <TextField
                            isRequired
                            value={formData.price}
                            onChange={(value) => handleChange("price", value)}
                        >
                            <Label>Price ($)</Label>

                            <Input type="number" placeholder="10" />
                        </TextField>

                        {/* Genre */}

                        <Select
                            selectedKey={formData.genre}
                            onSelectionChange={(value) => handleChange("genre", value)}
                        >
                            <Label>Genre</Label>

                            <Select.Trigger>
                                <Select.Value placeholder="Select genre" />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox>
                                    {genres.map((genre) => (
                                        <ListBox.Item key={genre.id} id={genre.id}>
                                            {genre.label}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </Fieldset>

                {/* Cover Image */}

                <Fieldset>
                    <Fieldset.Legend>Cover Image</Fieldset.Legend>

                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-color bg-bg-primary p-8 transition hover:border-brand-primary">
                        <ArrowUpFromLine className="h-8 w-8 text-brand-primary" />

                        <span className="mt-3 text-sm text-text-secondary">
                            Upload Ebook Cover
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
                            alt="preview"
                            className="mt-5 h-48 w-36 rounded-xl object-cover"
                        />
                    )}
                </Fieldset>

                {/* Submit */}

                <Button
                    type="submit"
                    disabled={imageUploading}
                    className="w-full rounded-xl bg-brand-primary py-3 font-semibold text-white hover:opacity-90"
                >
                    {imageUploading ? "Uploading..." : "Create Ebook"}
                </Button>
            </Form>
        </motion.div>
    );
}