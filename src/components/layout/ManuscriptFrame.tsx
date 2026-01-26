// src/components/layout/ManuscriptFrame.tsx
import type { ReactNode } from "react";

type ManuscriptFrameProps = {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  alignRailsToContent?: boolean;
  stickyRails?: boolean;
};

export function ManuscriptFrame({
  left,
  right,
  children,
  className,
  alignRailsToContent = false,
  stickyRails = true,
}: ManuscriptFrameProps) {
  const StickyWrap = ({ children }: { children: ReactNode }) =>
    stickyRails ? (
      <div className="sticky top-6">{children}</div>
    ) : (
      <>{children}</>
    );

  return (
    <div className={className}>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className={[
            // ✅ hooks for marginalia toggle CSS
            "mf-grid",
            "grid gap-y-8 lg:gap-x-8",
            "lg:grid-cols-[minmax(120px,160px)_minmax(0,920px)_minmax(160px,220px)]",
            // optional: helps row-based alignment feel predictable
            alignRailsToContent ? "lg:auto-rows-min" : "",
          ].join(" ")}
        >
          {/* LEFT */}
          <aside
            className={[
              "mf-left", // ✅ hook
              "hidden lg:block",
              alignRailsToContent ? "lg:contents" : "",
            ].join(" ")}
          >
            {alignRailsToContent ? (
              <div className="contents lg:[&>*]:col-start-1">{left}</div>
            ) : (
              <StickyWrap>{left}</StickyWrap>
            )}
          </aside>

          {/* MAIN */}
          <main
            className={[
              "mf-main", // ✅ hook
              "min-w-0",
              alignRailsToContent ? "lg:contents" : "",
            ].join(" ")}
          >
            {children}
          </main>

          {/* RIGHT */}
          <aside
            className={[
              "mf-right", // ✅ hook
              "hidden lg:block",
              alignRailsToContent ? "lg:contents" : "",
            ].join(" ")}
          >
            {alignRailsToContent ? (
              <div className="contents lg:[&>*]:col-start-3">{right}</div>
            ) : (
              <StickyWrap>{right}</StickyWrap>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
