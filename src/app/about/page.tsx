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
          with over time. Organizing is my stress relief. But it's all for a
          higher end: understanding, innovation, and knowledge production.
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
              href="https://www.linkedin.com/in/trmarvin/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              href="https://www.instagram.com/tamar.marvin/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
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
              My work sits at the intersection of software engineering,
              information architecture, and knowledge design. I’m particularly
              interested in content-heavy, mission-aligned projects that require
              systemic, architectural solutions.
            </p>

            <p>
              Although my first career was in academia, I’ve been tinkering
              online since the{" "}
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
              web. In my own projects, I try to bridge my scholarly training
              with modern development tools, building digital knowledge
              platforms that make Jewish learning and other complex bodies of
              knowledge more accessible, navigable, and alive.
            </p>

            <p>
              When I’m not coding, I enjoy writing - my first book is making its
              way to publication in 2027 or 2028 - and spend time with fiber
              arts and mixed media/collage. I’m an inveterate learner, always
              seeking to expand my knowledge and skills in technology as well as
              humanities, arts, and traditional Jewish learning. I am based in
              Israel, which I love exploring with my family.
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
              href="https://www.linkedin.com/in/trmarvin/"
              className="text-[color:var(--link)] hover:underline"
              target="_blank"
              rel="me noreferrer"
            >
              LinkedIn
            </a>
            <span className="text-[color:var(--ink-3)]">·</span>
            <a
              href="https://www.instagram.com/tamar.marvin/"
              className="text-[color:var(--link)] hover:underline"
              target="_blank"
              rel="me noreferrer"
            >
              Instagram
            </a>
          </div>
        </section>
      </div>
    </ManuscriptFrame>
  );
}
