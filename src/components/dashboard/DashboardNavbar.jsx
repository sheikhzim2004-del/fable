"use client";

import {
    Bell,
    Person,
    LayoutSideContentLeft,
} from "@gravity-ui/icons";
import { Button, Dropdown } from "@heroui/react";
import Link from "next/link";

const DashboardNavbar = ({ onMenuClick, user }) => {


    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/90 px-4 backdrop-blur lg:px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu */}
                <Button
                    isIconOnly
                    variant="light"
                    onClick={onMenuClick}
                    className="lg:hidden text-[var(--text-secondary)]"
                >
                    <LayoutSideContentLeft className="h-5 w-5" />
                </Button>

                <div>
                    <h1 className="hidden lg:block text-lg font-bold text-[var(--text-primary)]">
                        Welcome back 👋
                    </h1>
                    <p className="hidden text-xs text-[var(--text-secondary)] lg:block">
                        Manage your books and community
                    </p>
                </div>
            </div>


            {/* Right Section */}
            <div className="flex items-center gap-2">
                {/* Notification */}
                <Button
                    isIconOnly
                    variant="light"
                    className="relative text-[var(--text-secondary)] hover:text-[var(--primary)]"
                >
                    <Bell className="h-5 w-5" />

                    {/* Notification Badge */}
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent-success)]" />
                </Button>

                {/* User Dropdown */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <Link href={"/dashboard/writer/profile"}>
                            <div className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[var(--bg-primary)] cursor-pointer">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                                    <Person className="h-5 w-5" />
                                </div>

                                <div className=" text-left ">
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        {user?.name || "User Name"}
                                    </p>
                                    <p className="text-xs text-[var(--text-secondary)]">
                                        {user?.role || "Not Found"}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </Dropdown.Trigger>
                </Dropdown>
            </div>
        </header>
    );
};

export default DashboardNavbar;