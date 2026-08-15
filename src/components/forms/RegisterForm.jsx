"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Check,
    Eye,
    EyeSlash,
    Lock,
    Person,
    Sparkles,
} from "@gravity-ui/icons";
import { toast } from "react-toastify";

import {  signUp } from "@/lib/auth-client";

export default function RegisterForm() {
    // ==========================================================
    // FORM STATE
    // ==========================================================

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // ==========================================================
    // UI STATE
    // ==========================================================

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // ==========================================================
    // HANDLE INPUT CHANGE
    // ==========================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================================
    // FORM SUBMIT
    // ==========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        // --------------------------------------------------------
        // BASIC FRONTEND VALIDATION
        // --------------------------------------------------------

        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        if (!email.trim()) {
            toast.error("Please enter your email.");
            return;
        }

        if (!password) {
            toast.error("Please enter your password.");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (!confirmPassword) {
            toast.error("Please confirm your password.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            // ======================================================
            // BETTER AUTH SIGN UP
            // ======================================================

            const { data, error } = await signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
                callbackURL: "/dashboard",
            });

            // ------------------------------------------------------
            // BETTER AUTH ERROR
            // ------------------------------------------------------

            if (error) {
                toast.error(
                    error.message || "Unable to create your account."
                );

                return;
            }

            // ------------------------------------------------------
            // SUCCESS
            // ------------------------------------------------------

            if (data) {
                toast.success("Account created successfully!");

                // Clear form after successful registration
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                // ----------------------------------------------------
                // If your Better Auth config uses autoSignIn: false,
                // you can redirect to login here.
                //
                // Example:
                // window.location.href = "/login";
                // ----------------------------------------------------
            }
        } catch (error) {
            console.error("Registration error:", error);

            toast.error(
                error?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[var(--bg-primary)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            {/* ======================================================
          BACKGROUND DECORATION
      ====================================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Indigo Glow */}
                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-[var(--primary)]/10 blur-3xl"
                />

                {/* Cyan Glow */}
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl"
                />

                {/* Subtle Grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
                        backgroundSize: "45px 45px",
                    }}
                />
            </div>

            {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

            <div className="relative mx-auto flex max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl lg:grid-cols-2">
                    {/* ==================================================
              LEFT SIDE - BRAND / VISUAL
          ================================================== */}

                    <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-10 lg:flex lg:min-h-[620px] lg:flex-col lg:justify-between">
                        {/* Decorative circles */}

                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

                        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

                        {/* Floating glow */}

                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.15, 0.25, 0.15],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                            }}
                            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"
                        />

                        {/* =================================================
                BRAND
            ================================================== */}

                        <div className="relative z-10">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                                    <BookOpen className="h-6 w-6" />
                                </span>

                                <span className="text-2xl font-extrabold text-white">
                                    Fable
                                </span>
                            </Link>
                        </div>

                        {/* =================================================
                CENTER MESSAGE
            ================================================== */}

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                                    <Sparkles className="h-4 w-4" />

                                    Join the community
                                </div>

                                <h1 className="max-w-md text-4xl font-extrabold leading-tight text-white xl:text-5xl">
                                    Your next great story starts here.
                                </h1>

                                <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
                                    Create your Fable account and discover a beautiful
                                    community of readers, writers, and unforgettable
                                    stories.
                                </p>
                            </motion.div>

                            {/* Benefits */}

                            <div className="mt-8 space-y-3">
                                {[
                                    "Discover thousands of ebooks",
                                    "Build your personal library",
                                    "Share stories with other readers",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-white/85"
                                    >
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                                            <Check className="h-3 w-3" />
                                        </span>

                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* =================================================
                LEFT BOTTOM
            ================================================== */}

                        <p className="relative z-10 text-xs text-white/50">
                            Read. Share. Connect.
                        </p>
                    </div>

                    {/* ==================================================
              RIGHT SIDE - REGISTER FORM
          ================================================== */}

                    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.55,
                                ease: "easeOut",
                            }}
                            className="w-full max-w-md"
                        >
                            {/* =================================================
                  MOBILE LOGO
              ================================================== */}

                            <div className="mb-8 flex items-center justify-center lg:hidden">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                >
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg shadow-[var(--primary)]/20">
                                        <BookOpen className="h-5 w-5" />
                                    </span>

                                    <span className="text-xl font-extrabold text-[var(--text-primary)]">
                                        Fable
                                    </span>
                                </Link>
                            </div>

                            {/* =================================================
                  FORM HEADER
              ================================================== */}

                            <div className="mb-8 text-center lg:text-left">
                                <p className="mb-2 text-sm font-semibold text-[var(--primary)]">
                                    Welcome to Fable
                                </p>

                                <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                                    Create your account
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                    Join Fable and start your reading journey today.
                                </p>
                            </div>

                            {/* =================================================
                  REGISTER FORM
              ================================================== */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* =================================================
                    NAME
                ================================================== */}

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
                                    >
                                        Full name
                                    </label>

                                    <div className="relative">
                                        <Person className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            autoComplete="name"
                                            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] py-3.5 pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                        />
                                    </div>
                                </div>

                                {/* =================================================
                    EMAIL
                ================================================== */}

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]"
                                        >
                                            <rect
                                                x="3"
                                                y="5"
                                                width="18"
                                                height="14"
                                                rx="2"
                                            />

                                            <path d="m3 7 9 6 9-6" />
                                        </svg>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] py-3.5 pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                        />
                                    </div>
                                </div>

                                {/* =================================================
                    PASSWORD
                ================================================== */}

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />

                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="At least 8 characters"
                                            autoComplete="new-password"
                                            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] py-3.5 pl-11 pr-12 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                        />

                                        {/* Show / Hide Password */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                                        >
                                            {showPassword ? (
                                                <EyeSlash className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>

                                    <p className="mt-2 text-xs text-[var(--text-secondary)]">
                                        Use at least 8 characters for your password.
                                    </p>
                                </div>

                                {/* =================================================
    CONFIRM PASSWORD
================================================= */}

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
                                    >
                                        Confirm password
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]"
                                        />

                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Re-enter your password"
                                            autoComplete="new-password"
                                            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] py-3.5 pl-11 pr-12 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword((prev) => !prev)
                                            }
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide confirm password"
                                                    : "Show confirm password"
                                            }
                                            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeSlash className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {/* =================================================
                    SUBMIT BUTTON
                ================================================== */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create account

                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* =================================================
                  LOGIN LINK
              ================================================== */}

                            <div className="mt-7 text-center">
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-bold text-[var(--primary)] transition-colors hover:text-[var(--secondary)]"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                            {/* =================================================
                  TERMS
              ================================================== */}

                            <p className="mt-6 text-center text-xs leading-5 text-[var(--text-secondary)]">
                                By creating an account, you agree to our{" "}
                                <Link
                                    href="/privacy-policy"
                                    className="underline underline-offset-2 hover:text-[var(--primary)]"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}