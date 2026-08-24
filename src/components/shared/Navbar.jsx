"use client";

// প্রয়োজনীয় React hooks এবং Next.js utilities
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Animation এর জন্য framer-motion
import { motion, AnimatePresence } from "framer-motion";

// Gravity UI icons — লোগো, হ্যামবার্গার মেনু, রেজিস্টার বাটনের আইকন
import { Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";




export default function Navbar() {
    // বর্তমান route পাওয়া হচ্ছে active link হাইলাইট করার জন্য
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending } = useSession();
    // console.log("Session data in Navbar:", session, "Is session pending:", isPending);
    const user = session?.user;
    const role = user?.role;
    console.log("role user", role)
    

    const dashboardRoutes = role === "admin" ? "/dashboard/admin" : role === "writer" ? "/dashboard/writer" : role === "reader" ? "/dashboard/reader" : "/login";
    // নেভিগেশন লিংকগুলোর তালিকা — এখান থেকে লিংক যোগ/বাদ দেওয়া যাবে
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Browse Ebooks", href: "/ebooks" },
        { label: "Dashboard", href: dashboardRoutes },
    ];


    // মোবাইল হ্যামবার্গার মেনু খোলা/বন্ধ আছে কিনা তার state
    const [isOpen, setIsOpen] = useState(false);



    //dashboard route এ গেলে navbar হাইড করার জন্য চেক
    if (pathname.includes("dashboard")) {
        return null;
    }


    // কোন লিংকটা এখন active সেটা চেক করার ফাংশন
    const isActive = (href) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);


    // লগআউট হ্যান্ডলার
    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    toast.success("Logged out successfully!");
                },
            },
        });
    };

    return (
        // ===== Header wrapper: sticky + blur ব্যাকগ্রাউন্ড =====
        <header className="sticky top-0 z-50 border-b border-border-main bg-bg-secondary/80 backdrop-blur-md">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* ===== লোগো / সাইট নাম — ক্লিক করলে হোমপেজে যাবে ===== */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-text-primary"
                    onClick={() => setIsOpen(false)}
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
                    <span className="text-3xl font-extrabold tracking-tight text-text-primary">
                        Fab<span className="text-brand-primary">le</span>
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-secondary ml-1 animate-pulse" />
                    </span>
                </Link>
                {/* ===== ডেস্কটপ নেভিগেশন লিংক (মোবাইলে হাইড থাকবে) ===== */}
                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${isActive(link.href)
                                ? "text-text-primary"
                                : "text-text-secondary hover:text-text-primary"
                                }`}
                        >
                            {link.label}
                            {/* Active route হলে পিছনে একটা animated pill/background দেখাবে */}
                            {isActive(link.href) && (
                                <motion.span
                                    layoutId="active-nav-pill"
                                    className="absolute inset-0 -z-10 rounded-md bg-brand-primary/15"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* ===== ডানপাশের Login/Register বাটন (static, কোনো auth state নেই) ===== */}
                <div className="hidden items-center gap-3 md:flex">
                    {user ?
                        <>
                            HI, {user.name}!
                            <button onClick={handleLogout} className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors hover:border-2 hover:border-brand-primary rounded-md px-4 py-2">
                                LogOut
                            </button>
                        </>
                        :
                        <>
                            <Link
                                href="/login"
                                className="text-text-secondary *:hover:text-text-primary transition-colors text-center rounded-md px-4 py-2 cursor-pointer"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-brand-primary rounded-xl px-4 py-2 font-medium text-white hover:bg-brand-primary/90 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Register
                            </Link>
                        </>}
                </div>

                {/* ===== মোবাইল হ্যামবার্গার আইকন (শুধু মোবাইলে দেখাবে) ===== */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-md text-text-primary md:hidden"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
                </button>
            </nav>

            {/* ===== মোবাইল মেনু — hamburger এ ক্লিক করলে slide-down animation এ খুলবে ===== */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-border-main bg-bg-secondary md:hidden"
                    >
                        <div className="flex flex-col gap-1 px-4 py-4">
                            {/* মোবাইল ভিউতে নেভিগেশন লিংক */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`rounded-md px-4 py-3 text-base font-medium ${isActive(link.href)
                                        ? "bg-brand-primary/15 text-text-primary"
                                        : "text-text-secondary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* মোবাইল ভিউতে Login/Register বাটন */}
                            <div className="mt-3 flex flex-col gap-2 border-t border-border-main pt-3">
                                {user ?
                                    <>
                                        HI, {user.name}!
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors *:hover:border-2 hover:border-brand-primary rounded-md px-4 py-2"
                                        >
                                            LogOut
                                        </button>
                                    </>
                                    :
                                    <Link
                                        href="/login"
                                        className="text-text-secondary *:hover:text-text-primary transition-colors text-center rounded-md px-4 py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>}
                                <Link
                                    href="/register"
                                    className="bg-brand-primary text-white text-center rounded-xl px-4 py-2 font-medium hover:bg-brand-primary/90 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
