import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";

export const metadata = {
  title: "Work With Me | Tamar Marvin",
  description:
    "Studio Tamar — handcrafted custom sites, thoughtful structure, and content-rich systems.",
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
              <a className="hover:text-[color:var(--link)]" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#packages">
                Packages
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#process">
                Process
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#contact">
                Contact
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
          Fit
        </div>
        <p
          className="leading-relaxed"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Best for content-heavy work: writers, educators, mission-aligned
          orgs—where structure matters as much as visuals.
        </p>
      </section>

      <section className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
          Notes
        </div>
        <ul className="space-y-1">
          <li>Projects priced by scope, not hours.</li>
          <li>USD pricing; detailed quote provided before work begins.</li>
          <li>WordPress maintenance available.</li>
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

export default function WorkWithMePage() {
  return (
    <ManuscriptFrame
      className="py-6"
      left={<LeftRail />}
      right={<RightRail />}
      alignRailsToContent
      stickyRails={false}
    >
      {/* Main column */}
      <div className="contents lg:[&>*]:col-start-2">
        <div className="min-w-0 space-y-10">
          {/* HERO */}
          <section className="min-w-0">
            <header className="space-y-3">
              <h1 className="flex items-center text-3xl font-semibold tracking-tight text-[color:var(--ink-1)]">
                <Mark />
                Work With Me
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--ink-2)]">
                Studio Tamar — handcrafted custom sites, information
                architecture, and systems that make complex ideas feel
                navigable.
              </p>
            </header>
          </section>

          {/* RULE */}
          <div className="py-2">
            <div className="rule" />
          </div>

          {/* SERVICES */}
          <section id="services" className="min-w-0">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
              Services
            </h2>

            <div className="mt-4 grid gap-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
                <h3 className="text-base font-semibold text-[color:var(--ink-1)]">
                  Websites & content systems
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-2)]">
                  Thoughtful site structures, strong typography, and clean
                  builds (WordPress or Next.js) geared for long-term growth.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
                <h3 className="text-base font-semibold text-[color:var(--ink-1)]">
                  Taxonomy & structure
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-2)]">
                  IA-first planning: navigation logic, page hierarchy,
                  categories & tags strategy, future-proofing.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
                <h3 className="text-base font-semibold text-[color:var(--ink-1)]">
                  Design support
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-2)]">
                  Palette + typography pairing, visual direction, asset
                  checklist (not full brand identity / logo design).
                </p>
              </div>
            </div>
          </section>

          {/* PACKAGES */}
          <section id="packages" className="min-w-0">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
              Packages
            </h2>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <article className="group rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
                <header className="grid gap-1">
                  <h3 className="text-base font-semibold text-[color:var(--ink-1)]">
                    WP Quickstart
                  </h3>
                  <p className="text-sm text-[color:var(--ink-2)]">
                    A simple WordPress site using an existing theme—fast, clean,
                    and maintainable.
                  </p>
                </header>
                <p className="mt-3 text-sm text-[color:var(--ink-2)]">
                  Starting at <span className="font-medium">$500</span>.
                </p>
              </article>

              <article className="group rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
                <header className="grid gap-1">
                  <h3 className="text-base font-semibold text-[color:var(--ink-1)]">
                    Custom 2-Page Website (No CMS)
                  </h3>
                  <p className="text-sm text-[color:var(--ink-2)]">
                    A handcrafted Next.js site for a simple professional
                    presence.
                  </p>
                </header>
                <p className="mt-3 text-sm text-[color:var(--ink-2)]">
                  Starting at <span className="font-medium">$1,000</span>.
                </p>
              </article>

              <article className="md:col-span-2 group rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
                <header className="grid gap-1">
                  <h3 className="text-base font-semibold text-[color:var(--ink-1)]">
                    Custom Website with CMS
                  </h3>
                  <p className="text-sm text-[color:var(--ink-2)]">
                    Content-rich site with tailored structure + design system
                    (WordPress or headless CMS with Next.js).
                  </p>
                </header>
                <p className="mt-3 text-sm text-[color:var(--ink-2)]">
                  Starting at <span className="font-medium">$2,500</span>{" "}
                  (scope-dependent).
                </p>
              </article>
            </div>

            <p className="mt-6 text-xs text-[color:var(--ink-3)] leading-relaxed">
              Add-ons available (taxonomy/structure, design support, content
              support, hosting setup, and maintenance).
            </p>
          </section>

          {/* RULE */}
          <div className="py-2">
            <div className="rule" />
          </div>

          {/* PROCESS */}
          <section id="process" className="min-w-0">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
              Process
            </h2>

            <ol className="mt-4 space-y-3 text-sm text-[color:var(--ink-2)]">
              <li>
                <span className="text-[color:var(--ink-1)] font-medium">
                  1) Short intake
                </span>{" "}
                — goals, audience, content, constraints.
              </li>
              <li>
                <span className="text-[color:var(--ink-1)] font-medium">
                  2) Structure + scope
                </span>{" "}
                — sitemap, navigation logic, package fit, quote.
              </li>
              <li>
                <span className="text-[color:var(--ink-1)] font-medium">
                  3) Build + review
                </span>{" "}
                — iterative, with a tight feedback loop.
              </li>
              <li>
                <span className="text-[color:var(--ink-1)] font-medium">
                  4) Launch + handoff
                </span>{" "}
                — deployment + documentation.
              </li>
            </ol>
          </section>

          {/* CONTACT */}
          <section id="contact" className="min-w-0">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
              Contact
            </h2>

            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
              <p className="text-sm text-[color:var(--ink-2)]">
                Want to work together? Send a short note with what you’re
                building and your timeline.
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a
                  href="mailto:trmarvin@gmail.com"
                  className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-[color:var(--ink-1)] hover:bg-[var(--surface-3)]"
                >
                  Email me
                </a>
                <a
                  href="/projects"
                  className="text-[color:var(--link)] hover:underline px-1.5 py-1.5"
                >
                  See projects
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ManuscriptFrame>
  );
}
