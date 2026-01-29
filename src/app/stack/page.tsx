// src/app/stack/page.tsx
import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";

export const metadata = {
  title: "Stack | Tamar Marvin",
  description:
    "Tech stack + productivity stack — the tools I use to build, write, and ship.",
};

function LeftRail() {
  return (
    <nav className="text-sm text-[color:var(--ink-2)]">
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
            Contents
          </div>
          <ul className="mt-2 space-y-1">
            <li>
              <a className="hover:text-[color:var(--link)]" href="#tech">
                Tech stack
              </a>
            </li>
            <li>
              <a
                className="hover:text-[color:var(--link)]"
                href="#productivity"
              >
                Productivity stack
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#principles">
                Principles
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
            Jump
          </div>
          <ul className="mt-2 space-y-1">
            <li>
              <a className="hover:text-[color:var(--link)]" href="#frontend">
                Frontend
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#backend">
                Backend
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#data">
                Data
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#tooling">
                Tooling
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function RightRail() {
  return (
    <aside className="space-y-6 text-sm text-[color:var(--ink-2)]">
      <section className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
          Philosophy
        </div>
        <p
          className="leading-relaxed"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Tools are constraints. I choose stacks that keep complexity visible,
          content durable, and iteration fast.
        </p>
      </section>

      <section className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
          Working style
        </div>
        <ul className="space-y-1">
          <li>IA-first: structure before polish.</li>
          <li>Design tokens over one-off styling.</li>
          <li>Small systems that compose.</li>
        </ul>
      </section>
    </aside>
  );
}

function Mark() {
  return (
    <span
      aria-hidden
      className="inline-block h-5 w-5 bg-[color:var(--brand-500)] mr-2"
    />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
      {children}
    </h2>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] px-2.5 py-1 text-xs text-[color:var(--ink-2)]">
      {children}
    </span>
  );
}

function StackBlock({
  id,
  title,
  desc,
  items,
}: {
  id: string;
  title: string;
  desc?: string;
  items: string[];
}) {
  return (
    <section
      id={id}
      className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5"
    >
      <header className="space-y-1">
        <h3 className="text-sm font-semibold text-[color:var(--ink-1)]">
          {title}
        </h3>
        {desc ? (
          <p className="text-sm leading-relaxed text-[color:var(--ink-2)]">
            {desc}
          </p>
        ) : null}
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((x) => (
          <Pill key={x}>{x}</Pill>
        ))}
      </div>
    </section>
  );
}

export default function StackPage() {
  return (
    <ManuscriptFrame
      className="py-6"
      left={<LeftRail />}
      right={<RightRail />}
      alignRailsToContent
      stickyRails={false}
    >
      <div className="contents lg:[&>*]:col-start-2">
        <div className="min-w-0 space-y-10">
          {/* HERO */}
          <section className="min-w-0">
            <header className="space-y-3">
              <h1 className="flex items-center text-3xl font-semibold tracking-tight text-[color:var(--ink-1)]">
                <Mark />
                Stack
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--ink-2)]">
                The tools I use to build software and to think, write, and ship.
                This page is intentionally living + revisable.
              </p>
            </header>
          </section>

          <div className="py-2">
            <div className="rule" />
          </div>

          {/* TECH STACK */}
          <section id="tech" className="min-w-0 space-y-4">
            <SectionTitle>Tech stack</SectionTitle>

            <div className="grid gap-4">
              <StackBlock
                id="frontend"
                title="Frontend"
                desc="Component-first UI with durable styling primitives."
                items={[
                  "TypeScript",
                  "React",
                  "Next.js (App Router)",
                  "Tailwind",
                  "Design tokens",
                ]}
              />

              <StackBlock
                id="backend"
                title="Backend"
                desc="APIs, auth, and pragmatic server logic."
                items={[
                  "Node.js",
                  "Next.js Route Handlers",
                  "Express (as needed)",
                ]}
              />

              <StackBlock
                id="data"
                title="Data"
                desc="Relational by default; schema-driven work."
                items={[
                  "PostgreSQL",
                  "Prisma",
                  "SQL migrations",
                  "Neon (often)",
                ]}
              />

              <StackBlock
                id="tooling"
                title="Tooling"
                desc="Build + deploy + observe."
                items={[
                  "Git/GitHub",
                  "Vercel",
                  "Render (as needed)",
                  "CI basics",
                ]}
              />
            </div>

            <p className="text-xs leading-relaxed text-[color:var(--ink-3)]">
              (Later: add “comfort level” tags, a “currently learning” row, and
              links to relevant projects.)
            </p>
          </section>

          <div className="py-2">
            <div className="rule" />
          </div>

          {/* PRODUCTIVITY STACK */}
          <section id="productivity" className="min-w-0 space-y-4">
            <SectionTitle>Productivity stack</SectionTitle>

            <div className="grid gap-4 md:grid-cols-2">
              <StackBlock
                id="writing"
                title="Writing & publishing"
                desc="Drafting, editing, and long-form workflows."
                items={[
                  "Obsidian",
                  "Google Docs",
                  "Markdown",
                  "Substack (sometimes)",
                ]}
              />

              <StackBlock
                id="research"
                title="Research"
                desc="Sources, citations, and durable notes."
                items={[
                  "Zotero",
                  "PDF annotation",
                  "Reading lists",
                  "Bibliographies",
                ]}
              />

              <StackBlock
                id="ops"
                title="Planning & ops"
                desc="Shipping rhythms and task containers."
                items={[
                  "ClickUp",
                  "Calendar blocks",
                  "Weekly review",
                  "Templates",
                ]}
              />

              <StackBlock
                id="desktop"
                title="Desktop utilities"
                desc="Small helpers that reduce friction."
                items={[
                  "Raycast",
                  "Espanso",
                  "1Password",
                  "Nespresso (critical)",
                ]}
              />
            </div>

            <p className="text-xs leading-relaxed text-[color:var(--ink-3)]">
              (Later: we can split “tools” vs “principles” vs “habits”—your
              systems-thinker side deserves it.)
            </p>
          </section>

          <div className="py-2">
            <div className="rule" />
          </div>

          {/* PRINCIPLES */}
          <section id="principles" className="min-w-0 space-y-4">
            <SectionTitle>Principles</SectionTitle>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
              <ul className="space-y-3 text-sm leading-relaxed text-[color:var(--ink-2)]">
                <li>
                  <span className="text-[color:var(--ink-1)] font-medium">
                    Structure before styling
                  </span>{" "}
                  — clarify the model, navigation, and semantics first.
                </li>
                <li>
                  <span className="text-[color:var(--ink-1)] font-medium">
                    Tokens over one-offs
                  </span>{" "}
                  — a small system of variables beats a pile of exceptions.
                </li>
                <li>
                  <span className="text-[color:var(--ink-1)] font-medium">
                    Durable formats
                  </span>{" "}
                  — Markdown/MDX, stable URLs, and clean data wins long-term.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </ManuscriptFrame>
  );
}
