"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen,
    Gear,
    Magnifier,
    Person,
    LayoutSideContentLeft,
    Bookmark,
    FilePlus,
    ChartColumn,
    ClockArrowRotateLeft,
    Persons,
    CreditCard,
} from "@gravity-ui/icons";
import { Drawer, Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

const DashboardSidebar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;
    const role = user?.role;


    const navItemsByRole = {

        writerNavItems: [
            // { icon: House, label: "Dashboard", href: "/dashboard/writer" },
            { icon: BookOpen, label: "Manage Ebooks", href: "/dashboard/writer/ebooks" },
            { icon: FilePlus, label: "Add Ebook", href: "/dashboard/writer/ebooks/add" },
            { icon: Bookmark, label: "Bookmarks", href: "/dashboard/writer/bookmarks" },
            { icon: ChartColumn, label: "Sales History", href: "/dashboard/writer/sales" },
            { icon: Person, label: "Profile", href: "/dashboard/writer/profile"},
            { icon: Gear, label: "Settings", href: "/dashboard/writer/settings"},
        ],

        readerNavItems: [
            // { icon: House, label: "Dashboard", href: "/dashboard/user" },
            { icon: Magnifier, label: "Explore Books", href: "/dashboard/reader/explore" },
            { icon: BookOpen, label: "Purchased Ebooks", href: "/dashboard/reader/purchased" },
            { icon: ClockArrowRotateLeft, label: "Purchase History", href: "/dashboard/reader/purchase-history" },
            { icon: Bookmark, label: "Bookmarks", href: "/dashboard/reader/bookmarks" },
            { icon: Person, label: "Profile", href: "/dashboard/reader/profile" },
            { icon: Gear, label: "Settings", href: "/dashboard/reader/settings" },
        ],

        adminNavItems: [
            // { icon: House, label: "Dashboard", href: "/dashboard/admin" },
            { icon: Persons, label: "Manage Users", href: "/dashboard/admin/users" },
            { icon: BookOpen, label: "Manage Ebooks", href: "/dashboard/admin/ebooks" },
            { icon: CreditCard, label: "Transactions", href: "/dashboard/admin/transactions" },
            { icon: Person, label: "Profile", href: "/dashboard/admin/profile" },
            { icon: Gear, label: "Settings", href: "/dashboard/admin/settings" },
        ]
    }
    const menu = navItemsByRole[`${role}NavItems`];

    const navContent = (
        <nav className="flex flex-col gap-2">
            {menu?.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${active
                                ? "bg-[var(--primary)] text-white shadow-md"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        <Icon
                            className={`h-5 w-5 ${active
                                    ? "text-white"
                                    : "text-[var(--text-secondary)] group-hover:text-[var(--primary)]"
                                }`}
                        />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 shrink-0 min-h-screen flex-col border-r border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 mb-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-[var(--text-primary)]">Fable</h2>
                        <p className="text-xs text-[var(--text-secondary)]">Dashboard</p>
                    </div>
                </Link>

                {/* Navigation */}
                {navContent}

                {/* User Card */}
                <div className="mt-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white">
                            <Person className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{user?.name || "User Name"}</p>
                            <p className="text-xs text-[var(--text-secondary)]">{user?.role || "Not Found"}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div className="lg:hidden p-4">
                <Button
                    onClick={() => setOpen(true)}
                    variant="flat"
                    className="bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                    <LayoutSideContentLeft />
                    Menu
                </Button>

                <Drawer isOpen={open} onOpenChange={setOpen} placement="left">
                    <Drawer.Backdrop>
                        <Drawer.Content>
                            <Drawer.Dialog>
                                <Drawer.Header>
                                    <Drawer.Heading>Navigation</Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body>{navContent}</Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
};

export default DashboardSidebar;