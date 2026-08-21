"use client";

import { motion } from "framer-motion";



const RecentSales = ({sales}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-border-color bg-bg-secondary p-5"
        >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
                Recent Sales
            </h3>

            <div className="space-y-3">
                {sales.map((sale, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center rounded-xl bg-bg-primary p-3"
                    >
                        <div>
                            <p className="font-medium text-text-primary">{sale.title}</p>
                            <p className="text-sm text-text-secondary">{sale.userId}</p>
                        </div>

                        <span className="font-semibold text-accent-success">
                            {sale.price}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentSales;