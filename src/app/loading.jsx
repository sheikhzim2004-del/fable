"use client";

import { motion } from "framer-motion";
import { BookOpen } from "@gravity-ui/icons";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[999] flex min-h-screen w-full items-center justify-center bg-bg-primary px-4">
            {/* Top indeterminate progress bar — sobar age chokhe porbe j page load hocche */}
            <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-border-main/40">
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full w-1/2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"
                />
            </div>

            <div className="flex flex-col items-center gap-7">
                <div className="relative flex size-28 items-center justify-center sm:size-32">
                    {/* Strong outer glow, breathing */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-brand-primary/40 blur-2xl"
                    />

                    {/* Dual rotating rings — opposite direction, thicker, more visible */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-brand-primary border-r-brand-primary"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-brand-secondary border-l-brand-secondary"
                    />

                    {/* Center badge — book icon "page flip" animation, clearly reading/opening motion */}
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-bg-secondary shadow-xl ring-1 ring-border-main sm:size-16">
                        <motion.div
                            animate={{ rotateY: [0, 180, 360] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <BookOpen className="size-6 text-brand-primary sm:size-7" />
                        </motion.div>
                    </div>
                </div>

                {/* Text with shimmer pulse — clearly says loading, animated opacity */}
                <div className="flex flex-col items-center gap-2">
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-base font-bold tracking-wide text-text-primary sm:text-lg"
                    >
                        Loading Fable
                    </motion.p>

                    <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                animate={{ y: [0, -8, 0], scale: [1, 1.3, 1] }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.18,
                                }}
                                className="size-2 rounded-full bg-brand-primary"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}