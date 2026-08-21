"use client";

import { motion } from "framer-motion";
import { CreditCard } from "@gravity-ui/icons";

const TotalSales = ({amount}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border-color bg-bg-secondary p-5"
        >
            <div className="flex justify-between">
                <div>
                    <p className="text-sm text-text-secondary">Total Sales</p>

                    <h2 className="mt-2 text-3xl font-bold text-text-primary">
                        ${amount}
                    </h2>
                </div>

                <div className="rounded-xl bg-brand-primary/15 p-3">
                    <CreditCard className="h-6 w-6 text-brand-primary" />
                </div>
            </div>
        </motion.div>
    );
};

export default TotalSales;