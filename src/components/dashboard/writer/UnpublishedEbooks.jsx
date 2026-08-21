"use client";

import { motion } from "framer-motion";
import { CircleInfo } from "@gravity-ui/icons";

const UnpublishedEbooks = ({count}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border-color bg-bg-secondary p-5"
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-text-secondary">Unpublished</p>

                    <h2 className="mt-2 text-3xl font-bold text-text-primary">{count}</h2>
                </div>

                <div className="rounded-xl bg-secondary/15 p-3">
                    <CircleInfo className="h-6 w-6 text-secondary" />
                </div>
            </div>
        </motion.div>
    );
};

export default UnpublishedEbooks;