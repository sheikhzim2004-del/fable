"use client";

import Link from "next/link";
import {
    ArrowUp,
    Envelope,
    Heart,
} from "@gravity-ui/icons";
import Image from "next/image";
import { usePathname } from "next/navigation";


// ============================================================
// FOOTER QUICK LINKS
// ============================================================

const quickLinks = [
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
];

// ============================================================
// SOCIAL MEDIA ICONS
// These are custom inline SVG icons.
// We are not importing social icons from Gravity UI.
// ============================================================

function FacebookIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1Z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
    );
}

function GithubIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-.2-2.22-1.14-4.56-5.07-4.56-1.12 0-2.03.39-2.75 1.03-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.94c.85 0 1.7.12 2.5.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.26 3.98H6.4L17.8 19.9Z" />
        </svg>
    );
}

// ============================================================
// FOOTER COMPONENT
// ============================================================

export default function Footer() {
    const pathname = usePathname();

    //dashboard route এ গেলে footer হাইড করার জন্য চেক
    if (pathname.includes("dashboard")) {
        return null;
    }


    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
    };

    return (
        // ========================================================
        // FOOTER MAIN WRAPPER
        // ========================================================

        <footer className="relative overflow-hidden border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">

            {/* ------------------------------------------------------
          DECORATIVE BACKGROUND GLOW
          Adds subtle Indigo/Cyan glow to the footer.
      ------------------------------------------------------ */}

            <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />

            <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[var(--secondary)]/10 blur-3xl" />

            {/* ======================================================
          FOOTER CONTENT CONTAINER
      ====================================================== */}

            <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                {/* ====================================================
            TOP FOOTER
            Contains:
            1. Brand information
            2. Quick links
            3. Newsletter
        ==================================================== */}

                <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_1.2fr]">

                    {/* ==================================================
              1. BRAND SECTION
          ================================================== */}

                    <div className="max-w-md">

                        {/* Fable Logo */}
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <span className="flex items-center justify-center rounded-md">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Fable Logo"
                                    width={50}
                                    height={50}
                                    className="pt-2"
                                />
                            </span>

                            <span className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                                Fable
                            </span>
                        </Link>

                        {/* Brand Description */}
                        <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                            A modern digital space where readers can discover, read, and
                            share meaningful stories with a growing community.
                        </p>

                        {/* =================================================
                SOCIAL MEDIA LINKS
                Dummy "#" links for now.
            ================================================== */}

                        <div className="mt-6 flex items-center gap-2">

                            {/* Facebook */}
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                            >
                                <FacebookIcon />
                            </a>

                            {/* Instagram */}
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                            >
                                <InstagramIcon />
                            </a>

                            {/* GitHub */}
                            <a
                                href="#"
                                aria-label="GitHub"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                            >
                                <GithubIcon />
                            </a>

                            {/* X / Twitter */}
                            <a
                                href="#"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                            >
                                <TwitterIcon />
                            </a>

                        </div>
                    </div>

                    {/* ==================================================
              2. QUICK LINKS
          ================================================== */}

                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3">

                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--primary)]"
                                    >
                                        {/* Small hover indicator */}
                                        <span className="h-1 w-1 rounded-full bg-[var(--secondary)] opacity-0 transition-opacity group-hover:opacity-100" />

                                        {link.name}
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    </div>

                    {/* ==================================================
              3. NEWSLETTER SECTION
          ================================================== */}

                    <div>

                        {/* Newsletter Heading */}
                        <div className="flex items-center gap-2">

                            <Envelope className="h-4 w-4 text-[var(--primary)]" />

                            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                                Stay in the loop
                            </h3>

                        </div>

                        {/* Newsletter Description */}
                        <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                            Get the latest books, community updates, and reading
                            recommendations directly in your inbox.
                        </p>

                        {/* =================================================
                NEWSLETTER FORM
                Frontend placeholder only.
            ================================================== */}

                        <form
                            onSubmit={handleNewsletterSubmit}
                            className="mt-5 flex flex-col gap-2 sm:flex-row"
                        >

                            {/* Email Input */}
                            <input
                                type="email"
                                placeholder="Your email address"
                                aria-label="Email address"
                                className="min-w-0 flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                            />

                            {/* Subscribe Button */}
                            <button
                                type="submit"
                                className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary)]/90"
                            >
                                Subscribe
                            </button>

                        </form>

                        {/* Demo Notice */}
                        <p className="mt-3 text-xs text-[var(--text-secondary)]">
                            Frontend demo — no emails are actually collected.
                        </p>
                    </div>
                </div>

                {/* ====================================================
            DIVIDER
        ==================================================== */}

                <div className="my-10 h-px bg-[var(--border-color)]" />

                {/* ====================================================
            BOTTOM FOOTER
            Contains:
            1. Copyright
            2. Small message
            3. Back-to-top button
        ==================================================== */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Copyright */}
                    <p className="text-sm text-[var(--text-secondary)]">
                        © {new Date().getFullYear()} Fable. All rights reserved.
                    </p>

                    {/* Small Brand Message */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span>Made for readers</span>

                        <Heart className="h-4 w-4 text-[var(--secondary)]" />

                        <span>everywhere.</span>
                    </div>

                    {/* =================================================
              BACK TO TOP BUTTON
          ================================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        aria-label="Back to top"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </button>

                </div>
            </div>
        </footer>
    );
}