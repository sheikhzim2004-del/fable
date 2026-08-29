"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Moon, Sun } from "@gravity-ui/icons";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="size-9" />; // Layout shift prevent korar jonno

    const isDark = theme === "dark";

    return (
        <Button
            isIconOnly
            variant="flat"
            size="sm"
            className="rounded-xl border border-border-main bg-bg-secondary text-text-primary hover:bg-bg-primary"
            onPress={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle Theme"
        >
            {isDark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-slate-700" />}
        </Button>
    );
}