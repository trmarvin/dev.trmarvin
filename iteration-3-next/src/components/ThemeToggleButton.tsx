"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
        rounded-full 
        px-2 py-1 
        text-sm 
        text-ink-2 
        bg-surface-2 
        border border-border 
        shadow-xs 
        hover:bg-surface-3 
        transition-colors 
      "
        >
            {theme === "dark" ? (
                // Sun icon
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                >
                    <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                    <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 16.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm9-6a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5H20a.75.75 0 01.75.75zm-16.5 0a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm12.364-7.364a.75.75 0 011.061 1.061L17.03 7.53a.75.75 0 11-1.06-1.06l1.894-1.894zm-10.728 10.728a.75.75 0 011.061 1.061L6.302 17.03a.75.75 0 11-1.06-1.06l1.894-1.894zm12.364 1.894a.75.75 0 00-1.061-1.061l-1.894 1.894a.75.75 0 101.06 1.06l1.895-1.893zM7.364 6.302A.75.75 0 106.302 7.364L8.196 9.258a.75.75 0 101.06-1.06L7.364 6.302z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                // Moon icon
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                >
                    <path d="M21.752 15.002a.75.75 0 00-.917-.544A7.5 7.5 0 0110.5 4.165a.75.75 0 00-.917-.917A9 9 0 1021.208 15.92a.75.75 0 00.544-.918z" />
                </svg>
            )}
        </button>
    );
}