// src/app/about/page.tsx
import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";

export const metadata = {
  title: "About | Tamar Marvin",
  description:
    "About Tamar Marvin — developer, scholar, and builder of handcrafted knowledge platforms.",
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
              <a className="hover:text-[color:var(--link)]" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--link)]" href="#elsewhere">
                Elsewhere
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
          Note
        </div>
        <p
          className="leading-relaxed"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          I care about structure: how information is organized, read, and lived
          with over time.
        </p>
      </section>

      <section className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
          Links
        </div>
        <ul className="space-y-1">
          <li>
            <a
              className="hover:underline"
              href="https://github.com/trmarvin"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              rel="me"
              href="https://hachyderm.io/@trmarvin"
              target="_blank"
              rel-noreferrer
            >
              Mastodon (dev)
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              rel="me"
              href="https://babka.social/@trmarvin"
              target="_blank"
              rel-noreferrer
            >
              Mastodon (writing)
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
}

export default function AboutPage() {
  return (
    <ManuscriptFrame
      className="py-6"
      left={<LeftRail />}
      right={<RightRail />}
      alignRailsToContent
      stickyRails={false}
    >
      <div className="contents lg:[&>*]:col-start-2">
        {/* ROW 1 */}
        <section id="about" className="row-start-1 min-w-0">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--ink-1)]">
              About
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--ink-2)]">
              Developer, scholar, and builder of handcrafted knowledge
              platforms.
            </p>
          </header>

          <div className="mt-8 space-y-4 text-[color:var(--ink-1)] leading-relaxed">
            <p>
              I’m Tamar Ron Marvin — a developer with a background in
              scholarship, focused on building thoughtful, well-structured
              digital systems for complex ideas. I am also trained in graphic
              design and interested in UI/UX.
            </p>

            <p>
              My work sits at the intersection of software engineering, writing,
              and knowledge design. I’m particularly interested in
              content-heavy, mission-aligned projects that require systemic,
              architectural solutions.
            </p>

            <p>
              I’ve been tinkering online since the{" "}
              <a
                href="https://lynx.invisible-island.net/"
                className="text-[color:var(--link)] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Lynx
              </a>{" "}
              era. I still love the weirdness of the early internet but as a
              techno-optimist, I look forward to the possibilities of the future
              web. After a career in academia, I’m now focused on web
              development — especially learning tools that make complex ideas
              feel approachable and resonant.
            </p>
          </div>
        </section>

        {/* RULE */}
        <div className="row-start-2 py-8">
          <div className="rule" />
        </div>

        {/* ROW 3 */}
        <section id="elsewhere" className="row-start-3 min-w-0">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
            Elsewhere
          </h2>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
            <a
              href="https://github.com/trmarvin"
              className="text-[color:var(--link)] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <span className="text-[color:var(--ink-3)]">·</span>
            <a
              href="https://hachyderm.io/@trmarvin"
              className="text-[color:var(--link)] hover:underline"
              target="_blank"
              rel="me noreferrer"
            >
              Mastodon (dev)
            </a>
            <span className="text-[color:var(--ink-3)]">·</span>
            <a
              href="https://babka.social/@trmarvin"
              className="text-[color:var(--link)] hover:underline"
              target="_blank"
              rel="me noreferrer"
            >
              Mastodon (writing)
            </a>
          </div>
        </section>
      </div>
    </ManuscriptFrame>
  );
}
