"use client";

import { useEffect, useState } from "react";

const KEY = "marginalia"; // "on" | "off"

function apply(value: "on" | "off") {
  document.documentElement.dataset.marginalia = value;
}

export function MarginaliaToggle() {
  const [value, setValue] = useState<"on" | "off">("on");

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as "on" | "off" | null) ?? "on";
    setValue(stored);
    apply(stored);
  }, []);

  function toggle() {
    const next = value === "on" ? "off" : "on";
    setValue(next);
    localStorage.setItem(KEY, next);
    apply(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[color:var(--ink-2)] hover:text-[color:var(--brand-500)] transition-colors"
      aria-pressed={value === "on"}
    >
      Marginalia
    </button>
  );
}
