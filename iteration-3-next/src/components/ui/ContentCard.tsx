"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface ContentCardProps {
    href?: string;
    title: string;
    description?: string;
    meta?: ReactNode;      // e.g. date, reading time, role
    tags?: string[];       // e.g. ["Next.js", "TypeScript"]
    badge?: string;        // e.g. "In progress"
    className?: string;
}

export function ContentCard({
    href,
    title,
    description,
    meta,
    tags,
    badge,
    className = "",
}: ContentCardProps) {
    const baseClasses =
        "group relative flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 shadow-lg shadow-slate-900/40 transition-transform duration-150 hover:-translate-y-0.5 hover:border-cyan-400/70 hover:shadow-xl hover:shadow-slate-900/60";

    const Wrapper: React.ElementType = href ? Link : "div";
    const wrapperProps = href ? { href } : {};

    return (
        <Wrapper
            {...wrapperProps}
            className={`${baseClasses} ${className} ${href ? "cursor-pointer no-underline" : ""}`}
        >
            <div className="flex items-start gap-2">
                <h3 className="text-base font-semibold tracking-tight text-slate-50">
                    {title}
                </h3>
                {badge && (
                    <span className="ml-auto inline-flex items-center rounded-full border border-cyan-400/60 bg-cyan-500/10 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-200">
                        {badge}
                    </span>
                )}
            </div>

            {description && (
                <p className="text-sm leading-relaxed text-slate-300/90">
                    {description}
                </p>
            )}

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-slate-600/70 bg-slate-900/70 px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-200/90"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {meta && (
                <div className="mt-3 flex flex-wrap gap-2 text-[0.72rem] font-medium text-slate-400/90">
                    {meta}
                </div>
            )}

            {/* subtle focus ring for keyboard nav */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-cyan-400/70 ring-offset-2 ring-offset-slate-950 transition group-focus-visible:ring" />
        </Wrapper>
    );
}