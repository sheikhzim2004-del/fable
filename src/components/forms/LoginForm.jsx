"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Eye,
    EyeSlash,
    Lock,
    Sparkles,
} from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { signIn } from "@/lib/auth-client";

export default function LoginForm() {
    // ==========================================
    // FORM STATE
    // ==========================================
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // ==========================================
    // UI STATE
    // ==========================================
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // ==========================================
    // INPUT CHANGE
    // ==========================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // LOGIN SUBMIT
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email.trim()) {
            toast.error("Please enter your email.");
            return;
        }

        if (!password) {
            toast.error("Please enter your password.");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await signIn.email({
                email: email.trim(),
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Invalid credentials.");
                return;
            }

            if (data) {
                toast.success("Login successful!");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[var(--bg-primary)] px-4 py-10 sm:px-6">
            {/* Background Glow */}
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[var(--secondary)]/10 blur-3xl" />

            <div className="relative mx-auto flex max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl lg:grid-cols-2">
                    {/* LEFT SIDE */}
                    <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-10 lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <Link href="/" className="flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
                                    <BookOpen className="h-6 w-6" />
                                </span>
                                <span className="text-2xl font-extrabold text-white">
                                    Fable
                                </span>
                            </Link>
                        </div>

                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
                                <Sparkles className="h-4 w-4" />
                                Welcome Back
                            </div>

                            <h1 className="text-5xl font-extrabold leading-tight text-white">
                                Continue your reading journey.
                            </h1>

                            <p className="mt-5 leading-7 text-white/80">
                                Sign in to access your personal library, saved books and reading community.
                            </p>
                        </div>

                        <p className="text-xs text-white/60">
                            Read. Share. Connect.
                        </p>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <div className="flex items-center justify-center p-6 sm:p-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-md"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">
                                    Welcome back
                                </h2>
                                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                                    Login to your Fable account.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* EMAIL */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                        Email address
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Your password"
                                            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] py-3.5 pl-11 pr-12 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                                        >
                                            {showPassword ? (
                                                <EyeSlash className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
                                >
                                    {loading ? (
                                        "Logging in..."
                                    ) : (
                                        <>
                                            Login
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-7 text-center text-sm text-[var(--text-secondary)]">
                                New to Feble?
                                <Link
                                    href="/register"
                                    className="ml-1 font-bold text-[var(--primary)] hover:text-[var(--secondary)]"
                                >
                                    Create account
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}