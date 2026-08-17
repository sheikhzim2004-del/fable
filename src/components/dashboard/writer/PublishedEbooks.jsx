"use client";

import { motion } from "framer-motion";
import { CircleCheck } from "@gravity-ui/icons";

const PublishedEbooks = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border-color bg-bg-secondary p-5"
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-text-secondary">Published</p>

                    <h2 className="mt-2 text-3xl font-bold text-text-primary">18</h2>
                </div>

                <div className="rounded-xl bg-accent-success/15 p-3">
                    <CircleCheck className="h-6 w-6 text-accent-success" />
                </div>
            </div>
        </motion.div>
    );
};

export default PublishedEbooks;