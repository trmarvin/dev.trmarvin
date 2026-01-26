import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";

function LeftRail() {
  return (
    <div className="text-xs leading-6 text-[color:var(--ink-3)]">
      <div className="mb-3 font-medium text-[color:var(--ink-2)]">Colophon</div>
      <p>
        Here I share how (and why) I built dev.trmarvin. I believe in
        transparency in process and building in public, and hope this
        information is useful to you.
      </p>
    </div>
  );
}

function RightRail() {
  return (
    <div className="text-sm leading-6 py-26 text-[color:var(--ink-2)] font-[serif]">
      <p style={{ fontFamily: "var(--font-serif)" }}>
        Used by printers of early books, colophons recorded information about
        the physical aspects of the book as material object, particularly its
        typesetting.
      </p>
    </div>
  );
}

export default function ColophonPage() {
  return (
    <ManuscriptFrame
      stickyRails={false}
      left={<LeftRail />}
      right={<RightRail />}
      className="py-8"
    >
      <article className="space-y-12">
        {/* TITLE */}
        <header className="space-y-2">
          <h1 className="text-2xl text-[color:var(--brand)]">Colophon</h1>
          <p className="text-[color:var(--ink-2)]">
            On the construction of this site.
          </p>
        </header>

        <div className="row-start-2 py-1">
          <div className="rule" />
        </div>

        {/* SECTION PLACEHOLDERS */}
        <section className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-[color:var(--ink-3)]">
            Site Purpose
          </h2>
          <p className="text-[color:var(--ink-1)]">
            This site is an online home for my work as a developer and
            information architect. It is designed as a place to record{" "}
            <a href="/projects">projects</a> and share <a href="/blog">ideas</a>
            .
          </p>

          <p>
            Rather than functioning as a marketing surface, the site is intended
            to be read, navigated, and revisited — an evolving site rather than
            a static portfolio.
          </p>
        </section>

        <div className="row-start-2 py-1">
          <div className="rule" />
        </div>

        <section className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-[color:var(--ink-3)]">
            Design
          </h2>
          <p className="text-[color:var(--ink-1)]">
            The layout is inspired by editorial and manuscript traditions: a
            central reading column supported by marginal notes, references, and
            asides.
          </p>

          <p>Design decisions prioritize:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>information architecture over ornament</li>
            <li>legibility over density</li>
            <li>structure as a visible, intentional element</li>
          </ul>

          <p>
            Typography, spacing, and rhythm are treated as part of the
            interface, not decoration. Marginalia is used to surface context
            without interrupting the main thread.
          </p>

          <p className="text-sm">
            <strong>Body Typeface:</strong> Helvetica Neue <br />
            <strong>Marginalia Typeface:</strong> Caslon
          </p>
        </section>

        <div className="row-start-2 py-1">
          <div className="rule" />
        </div>

        <section className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-[color:var(--ink-3)]">
            Technology
          </h2>
          <p className="text-[color:var(--ink-1)]">
            This site is built with a modern, deliberately minimal stack:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Next.js (App Router)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>PostgreSQL and Prisma where persistence is required</li>
          </ul>
          <p>
            The system favors clarity, maintainability, and long-term
            adaptability over novelty. It includes a custom-built, lightweight
            admin infrastructure for content management.
          </p>
        </section>

        <div className="row-start-2 py-1">
          <div className="rule" />
        </div>

        <section className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-[color:var(--ink-3)]">
            Status
          </h2>
          <p className="text-[color:var(--ink-1)]">Version 1.2 · 2026</p>
          <p className="text-sm">
            <a href="https://vanilla.dev.trmarvin.org">Version 1.0</a> vanilla
            html/css/js (2025) · <a href="">Version 1.1</a> Node.js/Express
            (2025)
          </p>
        </section>
      </article>
    </ManuscriptFrame>
  );
}
