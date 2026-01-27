import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";
import { MarkdownPreview } from "@/components/admin/MarkdownPreview";

export const runtime = "nodejs";

type Params = { slug: string };
type Ctx = { params: Params | Promise<Params> };

export default async function ProjectPage({ params }: Ctx) {
  const { slug } = await Promise.resolve(params);
  if (!slug) return notFound();

  const project = await prisma.project.findUnique({
    where: { slug },
    select: {
      title: true,
      summary: true,
      content: true,
      year: true,
      role: true,
      status: true,
      techStack: true,
      updatedAt: true,
    },
  });

  if (!project) return notFound();

  const body = (
    project.content?.trim() ||
    project.summary?.trim() ||
    ""
  ).trim();

  return (
    <ManuscriptFrame
      className="py-2"
      left={
        <nav className="text-sm text-[color:var(--ink-2)]">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
                Navigation
              </div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-[color:var(--link)]"
                  >
                    ← Projects
                  </Link>
                </li>
              </ul>
            </div>

            {/* Placeholder — later we can compute real TOC server-side */}
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
                On this page
              </div>
              <div className="text-xs text-[color:var(--ink-3)]">
                (TOC coming soon)
              </div>
            </div>
          </div>
        </nav>
      }
      right={
        <aside className="space-y-6 text-sm text-[color:var(--ink-2)]">
          <section className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
              Meta
            </div>

            <div className="space-y-2">
              {project.year ? (
                <div className="flex items-baseline justify-between border-b border-[color:var(--border)] pb-2">
                  <span>Year</span>
                  <span className="tabular-nums text-[color:var(--ink-1)]">
                    {project.year}
                  </span>
                </div>
              ) : null}

              {project.status ? (
                <div className="flex items-baseline justify-between border-b border-[color:var(--border)] pb-2">
                  <span>Status</span>
                  <span className="text-[color:var(--ink-1)]">
                    {project.status}
                  </span>
                </div>
              ) : null}

              {project.role ? (
                <div className="flex items-baseline justify-between border-b border-[color:var(--border)] pb-2">
                  <span>Role</span>
                  <span className="text-[color:var(--ink-1)]">
                    {project.role}
                  </span>
                </div>
              ) : null}
            </div>
          </section>

          {project.techStack?.length ? (
            <section className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-[color:var(--ink-3)]">
                Stack
              </div>

              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-[color:var(--border)] bg-[var(--surface-1)] px-2.5 py-1 text-xs text-[color:var(--ink-2)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      }
    >
      <article className="min-w-0">
        <header className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--ink-1)]">
            {project.title}
          </h1>

          {project.summary ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--ink-2)]">
              {project.summary}
            </p>
          ) : null}

          <div className="border-b border-[color:var(--border)]" />
        </header>

        <div className="mt-8">
          {body ? (
            <MarkdownPreview content={body} />
          ) : (
            <p className="text-sm text-[color:var(--ink-3)]">No content yet.</p>
          )}
        </div>
      </article>
    </ManuscriptFrame>
  );
}
