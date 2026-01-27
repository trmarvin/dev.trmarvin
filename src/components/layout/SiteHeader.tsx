// src/components/layout/SiteHeader.tsx
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { MarginaliaToggle } from "../MarginaliaToggle";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-sm tracking-wide">
            <span className="font-medium text-[var(--brand)] tracking-wide">
              DEV.
            </span>
            <span className="font-semibold text-[var(--ink-1)] tracking-tight">
              TRMARVIN
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/projects"
              className="text-[color:var(--ink-2)] hover:text-[color:var(--brand)] transition-colors"
            >
              Work
            </Link>

            <Link
              href="/stack"
              className="text-[color:var(--ink-2)] hover:text-[color:var(--brand)] transition-colors"
            >
              Stack
            </Link>

            <Link
              href="/blog"
              className="text-[color:var(--ink-2)] hover:text-[color:var(--brand)] transition-colors"
            >
              <span className="hidden sm:inline">Dev Notes</span>
              <span className="sm:hidden">Notes</span>
            </Link>

            <Link
              href="/about"
              className="text-[color:var(--ink-2)] hover:text-[color:var(--brand)] transition-colors"
            >
              About
            </Link>

            <Link
              href="/work"
              className="text-[color:var(--ink-2)] hover:text-[color:var(--brand)] transition-colors"
            >
              <span className="hidden sm:inline">Work with Me</span>
              <span className="sm:hidden">Hire</span>
            </Link>

            <MarginaliaToggle />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
