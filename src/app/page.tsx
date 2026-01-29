import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";
import { prisma } from "@/lib/prisma";

function Mark() {
  return (
    <span
      aria-hidden
      className="inline-block w-6 h-6 bg-[color:var(--brand-500)] mr-2"
    />
  );
}

function MarkSmall() {
  return (
    <span
      aria-hidden
      className="inline-block w-2 h-2 bg-[color:var(--brand-500)] mr-2"
    />
  );
}

function LeftRail() {
  return (
    <div className="contents lg:[&>*]:col-start-1">
      {/* Existing Contents nav */}
      <div className="row-start-1 text-xs leading-6 text-[color:var(--ink-3)]">
        <div className="mb-3 font-medium text-[color:var(--ink-2)]">
          Contents
        </div>
        <ul className="space-y-1">
          <li>
            <a href="#stack">Current Stack</a>
          </li>
          <li>
            <a href="#work">Selected Work</a>
          </li>
          <li>
            <a href="#throughline">Through-line</a>
          </li>
        </ul>
      </div>

      {/* LEFT RAIL IMAGE — aligned to Through-line */}
      <div className="row-start-6 mt-2">
        <figure className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
          <img
            src="/images/keyboard.jpg"
            alt=""
            className="h-40 w-full object-cover opacity-85"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  );
}

function RightRail() {
  return (
    <div className="contents lg:[&>*]:col-start-3 text-sm leading-6 text-[color:var(--ink-2)] font-[serif]">
      <div className="row-start-1">
        <div className="mb-3 text-xs uppercase tracking-wide text-[color:var(--ink-3)] font-sans">
          Marginalia
        </div>
      </div>
      <div className="row-start-1 pt-8">
        <p style={{ fontFamily: "var(--font-serif)" }}>
          Information architecture is not polish; it’s epistemology.
        </p>
      </div>

      <div className="row-start-3 pt-8">
        <p style={{ fontFamily: "var(--font-serif)" }}>
          Stacks change. They are tools for the fundamentals.
        </p>
        <p style={{ fontFamily: "var(--font-serif)" }}>
          Like bits of type, these tools create meaning: digitally instead of
          emchanically.
        </p>
      </div>

      <div className="row-start-4 pt-40 mt-6 text-xs text-[color:var(--ink-3)] leading-relaxed">
        <p style={{ fontFamily: "var(--font-serif)" }}>
          Image credits: Photo by{" "}
          <a href="https://unsplash.com/@fabiosbruun?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Fabio Santaniello Bruun
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/black-alphabetical-wall-decor-Y6tGu-OH8lA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
          ; Photo by{" "}
          <a href="https://unsplash.com/@giorgiotrovato?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Giorgio Trovato
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/a-close-up-of-a-keyboard-with-the-letters-y-and-y-on-it-z4bTGTTBpSI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
      </div>

      <div className="row-start-6 pt-8">
        <p style={{ fontFamily: "var(--font-serif)" }}>
          A through-line connects the dots, giving structure and meaning.
        </p>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const featured = await prisma.project.findMany({
    where: { featured: true },
    orderBy: [{ featuredOrder: "asc" }, { year: "desc" }],
    take: 3,
    select: {
      slug: true,
      title: true,
      summary: true,
      techStack: true,
      role: true,
      status: true,
      repoUrl: true,
      liveUrl: true,
    },
  });
  return (
    <ManuscriptFrame
      left={<LeftRail />}
      right={<RightRail />}
      className="py-6"
      alignRailsToContent
      stickyRails={false}
    >
      <div className="contents lg:[&>*]:col-start-2">
        {/* ROW 1: HERO */}
        <section className="row-start-1">
          <div className="space-y-1.5">
            <h1 className="text-5xl leading-tight text-[color:var(--gray-600)]">
              <Mark />
              Tamar Ron Marvin
            </h1>
            <p className="text-[color:var(--ink-2)]">
              Full-Stack Developer · Information Architect · Systems Thinker
            </p>
          </div>
        </section>

        {/* ROW 2: RULE 1 */}
        <div className="row-start-2 py-2">
          <div className="rule" />
        </div>

        <section id="stack" className="row-start-3 pt-2">
          <div className="grid items-start gap-6 md:grid-cols-2 md:gap-8">
            {/* LEFT: stack text */}
            <div className="min-w-0 flex items-start gap-4">
              <span
                aria-hidden
                className="select-none text-4xl font-semibold leading-none text-[color:var(--brand-500)] opacity-80 mt-0.5"
              >
                S
              </span>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-[color:var(--ink-3)]">
                  Current Stack
                </h2>

                <ul className="mt-4 space-y-2 text-[color:var(--ink-2)]">
                  <li>TypeScript · Node.js</li>
                  <li>React · Next.js</li>
                  <li>Prisma · PostgreSQL</li>
                  <li>Tailwind · Redux Toolkit (as needed)</li>
                </ul>

                <div className="mt-4">
                  <a
                    href="/stack"
                    className="text-[color:var(--brand)] hover:text-[color:var(--brand-500)] transition-colors"
                  >
                    All my tools &amp; technologies
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: image */}
            <div className="min-w-0 md:max-w-[360px] md:justify-self-end md:-mt-6">
              <figure className="aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
                <img
                  src="/images/typeface.jpg"
                  alt=""
                  className="w-full w-full object-cover opacity-95"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* ROW 4: WORK */}
        <div className="row-start-4 py-2">
          <div className="rule w-full opacity-60" />
        </div>
        <section id="work" className="row-start-4 pt-8">
          <span
            aria-hidden
            className="
        text-4xl font-semibold leading-none
        text-[color:var(--brand-500)]
        opacity-80
        mt-0.5
        select-none
      "
          >
            W
          </span>
          <h2 className="text-sm uppercase tracking-wide text-[color:var(--ink-3)]">
            Selected Work
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {featured.map((p, idx) => (
              <article
                key={p.slug}
                className={[
                  "group rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5",
                  idx === 0 ? "md:col-span-2" : "",
                ].join(" ")}
              >
                <div className="grid gap-3">
                  <header className="grid gap-1">
                    <h3 className="text-base font-semibold text-[var(--ink-1)]">
                      {p.title}
                    </h3>
                    {p.summary ? (
                      <p className="text-sm text-[var(--ink-2)]">{p.summary}</p>
                    ) : null}
                  </header>

                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[var(--ink-2)]">
                    <div>
                      <dt className="uppercase tracking-wider text-[var(--ink-3)]">
                        Stack
                      </dt>
                      <dd className="mt-0.5">
                        {p.techStack?.length ? p.techStack.join(" · ") : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-wider text-[var(--ink-3)]">
                        Focus
                      </dt>
                      <dd className="mt-0.5">{p.role ?? p.status ?? "—"}</dd>
                    </div>
                  </dl>

                  <footer className="mt-3 flex gap-4 text-sm">
                    <a
                      href={`/projects/${p.slug}`}
                      className="text-[var(--link)] hover:underline"
                    >
                      Case study
                    </a>

                    {p.repoUrl ? (
                      <a
                        href={p.repoUrl}
                        className="text-[var(--link)] hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    ) : null}

                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        className="text-[var(--link)] hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit site
                      </a>
                    ) : null}
                  </footer>
                </div>
              </article>
            ))}

            {featured.length === 0 ? (
              <p className="text-sm text-[color:var(--ink-3)]">
                No featured projects yet — mark some as featured in admin.
              </p>
            ) : null}
          </div>
        </section>

        {/* ROW 5: RULE 2 */}
        <div className="row-start-5 py-6">
          <div className="rule" />
        </div>

        {/* ROW 6: THROUGHLINE */}
        <section id="throughline" className="row-start-6 pt-2">
          <span
            aria-hidden
            className="
        text-4xl font-semibold leading-none
        text-[color:var(--brand-500)]
        opacity-80
        mt-0.5
        select-none
      "
          >
            T
          </span>
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr]">
            <div>
              <h2 className="text-sm uppercase tracking-wide text-[color:var(--ink-3)]">
                Through-line
              </h2>
              <p className="mt-4 text-[color:var(--ink-1)]">
                I build thoughtfully structured, beautifully designed,
                functional online homes and web apps.
              </p>
            </div>

            <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
              <div className="text-xs uppercase tracking-wide text-[color:var(--ink-3)]">
                <MarkSmall />
                Now
              </div>
              <p className="mt-2 text-sm text-[color:var(--ink-2)]">
                Rebuilding trmarvin.org + shipping SeforimTracker.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ManuscriptFrame>
  );
}
