"use client";

import { motion } from "framer-motion";
import { Book } from "@gravity-ui/icons";

const TotalEbooks = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border-color bg-bg-secondary p-5 shadow-sm"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-text-secondary">Total Ebooks</p>

                    <h2 className="mt-2 text-3xl font-bold text-text-primary">24</h2>
                </div>

                <div className="rounded-xl bg-brand-primary/15 p-3">
                    <Book className="h-6 w-6 text-brand-primary" />
                </div>
            </div>
        </motion.div>
    );
};

export default TotalEbooks;