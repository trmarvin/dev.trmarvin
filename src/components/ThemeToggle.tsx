"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        rounded-full
        border border-[var(--border)]
        px-3 py-1
        text-xs
        text-[color:var(--ink-2)]
        hover:text-[color:var(--brand-500)]
        transition-colors
      "
    >
      {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}
