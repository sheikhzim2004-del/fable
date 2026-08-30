"use client";

import { motion } from "framer-motion";

// const books = [
//     {
//         title: "The Lost World",
//         price: "$10",
//         status: "Published",
//     },
//     {
//         title: "Dark Moon",
//         price: "$8",
//         status: "Draft",
//     },
//     {
//         title: "Ocean Story",
//         price: "$12",
//         status: "Published",
//     },
// ];

const RecentEbooks = ({books}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-border-color bg-bg-secondary p-5"
        >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
                Recent Ebooks
            </h3>

            <div className="space-y-3">
                {books.map((book, index) => (
                    <div
                        key={index}
                        className="flex justify-between rounded-xl bg-bg-primary p-3"
                    >
                        <div>
                            <p className="text-text-primary font-medium">{book.title}</p>
                            <p className="text-sm text-text-secondary">${book.price}</p>
                        </div>

                        <span className="text-sm text-accent-success">
                            {book.status}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentEbooks;