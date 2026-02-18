"use client";

import * as React from "react";
import type { TocItem } from "@/lib/toc";

export function LeftToc({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(
    toc[0]?.id ?? null,
  );

  React.useEffect(() => {
    if (!toc.length) return;

    const ids = toc.map((t) => t.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    // Prefer "the heading closest to the top" behavior
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        // pick visible headings, then choose the one closest to the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement);

        if (!visible.length) return;

        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          visible.sort(
            (a, b) =>
              a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          );
          setActiveId(visible[0]!.id);
        });
      },
      {
        // This makes a heading become active when it enters the upper portion of the viewport
        root: null,
        threshold: [0.1, 0.25, 0.5],
        rootMargin: "-20% 0px -70% 0px",
      },
    );

    els.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [toc]);

  if (!toc.length) return null;

  return (
    <nav className="space-y-1 text-sm">
      {toc.map((item) => {
        const isActive = item.id === activeId;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveId(item.id)} // immediate feedback on click
            className={[
              "block rounded px-2 py-1 transition",
              item.level === 3 ? "pl-5 text-xs" : "",
              isActive
                ? "bg-white/5 text-[color:var(--ink-1)]"
                : "text-[color:var(--ink-2)] hover:bg-white/5 hover:text-[color:var(--ink-1)]",
            ].join(" ")}
            aria-current={isActive ? "location" : undefined}
          >
            {item.text}
          </a>
        );
      })}
    </nav>
  );
}
