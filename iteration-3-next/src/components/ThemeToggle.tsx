"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2 rounded-full border px-3 py-1 text-xs transition-colors"
            style={{
                borderColor: "var(--border)",
                color: "var(--ink-2)",
                backgroundColor: "var(--surface-2)",
            }}
        >
            {theme === "dark" ? "Light" : "Dark"}
        </button>
    );
}