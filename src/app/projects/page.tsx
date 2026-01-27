import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";

export const metadata: Metadata = {
  title: "Projects · Tamar Marvin",
  description: "A curated selection of things I’ve built.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Tamar Marvin",
    description: "A curated selection of things I’ve built.",
    url: "/projects",
  },
};

export default async function ProjectsIndexPage() {
  const projects = await prisma.project.findMany({
    orderBy: { year: "desc" },
    select: {
      slug: true,
      title: true,
      year: true,
      summary: true,
      role: true, // ✅ exists per your error screenshot
    },
  });

  const hasProjects = projects.length > 0;
  const featured = hasProjects ? projects[0] : null;
  const rest = hasProjects ? projects.slice(1) : [];

  return (
    <ManuscriptFrame
      className="py-2"
      left={
        <nav className="text-sm text-[color:var(--ink-2)]">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
              Contents
            </div>
            <ul className="space-y-1">
              <li>
                <a className="hover:text-[color:var(--link)]" href="#featured">
                  Featured
                </a>
              </li>
              <li>
                <a className="hover:text-[color:var(--link)]" href="#index">
                  Index
                </a>
              </li>
            </ul>
          </div>
        </nav>
      }
      right={
        <aside className="space-y-6 text-sm text-[color:var(--ink-2)]">
          <section className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
              About
            </div>
            <p className="leading-relaxed">
              A curated selection of shipped work, systems, and experiments.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
              Stats
            </div>
            <div className="flex items-baseline justify-between border-b border-[color:var(--border)] pb-2">
              <span>Projects</span>
              <span className="tabular-nums text-[color:var(--ink-1)]">
                {projects.length}
              </span>
            </div>
          </section>
        </aside>
      }
    >
      <section className="min-w-0">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--ink-1)]">
            Projects
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--ink-2)]">
            A curated selection of things I’ve built.
          </p>
        </header>

        {!hasProjects ? (
          <p className="mt-10 text-sm text-[color:var(--ink-3)]">
            No projects yet — add a Project in your database and they will show
            up here.
          </p>
        ) : (
          <div className="mt-10 space-y-10">
            {/* FEATURED (uses your schema fields only) */}
            <section id="featured" className="space-y-4">
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
                  Featured
                </h2>
              </div>

              {featured ? (
                <article className="group rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
                  <div className="grid gap-3">
                    <header className="grid gap-1">
                      <h3 className="text-base font-semibold text-[var(--ink-1)]">
                        <Link
                          href={`/projects/${featured.slug}`}
                          className="hover:text-[color:var(--link)]"
                        >
                          {featured.title}
                        </Link>
                      </h3>

                      {featured.summary ? (
                        <p className="text-sm text-[var(--ink-2)]">
                          {featured.summary}
                        </p>
                      ) : null}
                    </header>

                    <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[var(--ink-2)]">
                      <div>
                        <dt className="uppercase tracking-wider text-[var(--ink-3)]">
                          Year
                        </dt>
                        <dd className="mt-0.5 tabular-nums">
                          {featured.year ?? ""}
                        </dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-wider text-[var(--ink-3)]">
                          Role
                        </dt>
                        <dd className="mt-0.5">{featured.role ?? ""}</dd>
                      </div>
                    </dl>

                    <footer className="mt-3 flex gap-4 text-sm">
                      <Link
                        href={`/projects/${featured.slug}`}
                        className="text-[var(--link)] hover:underline"
                      >
                        Case study
                      </Link>
                    </footer>
                  </div>
                </article>
              ) : null}
            </section>

            {/* INDEX */}
            <section id="index" className="space-y-4">
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="text-xs font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
                  Index
                </h2>
                <span className="text-xs text-[color:var(--ink-3)]">
                  newest first
                </span>
              </div>

              <ol className="divide-y border-y border-[color:var(--border)]">
                {rest.map((p) => (
                  <li key={p.slug} className="py-5">
                    <article className="grid gap-2 lg:grid-cols-[120px_minmax(0,1fr)] lg:gap-6">
                      <div className="text-xs tabular-nums text-[color:var(--ink-3)]">
                        {p.year ?? ""}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-medium text-[color:var(--ink-1)]">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="hover:text-[color:var(--link)]"
                          >
                            {p.title}
                          </Link>
                        </h3>

                        {p.summary ? (
                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[color:var(--ink-2)]">
                            {p.summary}
                          </p>
                        ) : null}

                        {p.role ? (
                          <p className="mt-1 text-xs text-[color:var(--ink-3)]">
                            {p.role}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        )}
      </section>
    </ManuscriptFrame>
  );
}
