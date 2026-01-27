import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";

function formatDate(d: Date) {
  // Simple + stable. If you want locale-based later, we can swap to Intl.DateTimeFormat.
  const iso = d.toISOString().slice(0, 10); // YYYY-MM-DD
  return iso;
}

export default async function BlogIndexPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      createdAt: true,
    },
  });

  return (
    <ManuscriptFrame
      className="py-2"
      left={
        <nav className="text-sm text-slate-400">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Contents
            </div>
            <ul className="space-y-1">
              <li>
                <a className="hover:text-slate-200" href="#notes">
                  Notes
                </a>
              </li>
              {/* Keep these anchors even if empty for now — you’ll thank yourself later */}
              <li>
                <a className="hover:text-slate-200" href="#topics">
                  Topics
                </a>
              </li>
              <li>
                <a className="hover:text-slate-200" href="#feed">
                  Feed
                </a>
              </li>
            </ul>
          </div>
        </nav>
      }
      right={
        <aside className="space-y-6 text-sm text-slate-400">
          <section className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Dev Notes
            </div>
            <p className="leading-relaxed">
              Builds, bugs, small systems, and occasional explainers.
            </p>
          </section>

          <section className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Stats
            </div>
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
              <span>Posts</span>
              <span className="tabular-nums text-slate-300">
                {posts.length}
              </span>
            </div>
          </section>

          <section id="feed" className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Feed
            </div>
            <Link
              href="/rss.xml"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-slate-50"
            >
              RSS <span className="text-slate-600">→</span>
            </Link>
          </section>
        </aside>
      }
    >
      <section className="min-w-0">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
            Dev Notes
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400/90">
            Notes from the dev side of my life — builds, bugs, and experiments.
          </p>
        </header>

        <div className="mt-10">
          <div className="mb-4 flex items-baseline justify-between gap-6">
            <h2
              id="notes"
              className="text-xs font-medium uppercase tracking-widest text-slate-500"
            >
              Index
            </h2>
            {/* Optional: later swap this for a real filter UI */}
            <span className="text-xs text-slate-600">newest first</span>
          </div>

          <ol className="divide-y divide-slate-800 border-y border-slate-800">
            {posts.map((post) => (
              <li key={post.slug} className="py-5">
                <article className="grid gap-2 lg:grid-cols-[120px_minmax(0,1fr)] lg:gap-6">
                  <div className="text-xs tabular-nums text-slate-500">
                    {formatDate(post.createdAt)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="min-w-0 text-base font-medium text-slate-500">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-white"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.excerpt ? (
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-400">
                        {post.excerpt}
                      </p>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ol>

          {/* Placeholder section for later */}
          <div id="topics" className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Topics
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              (Coming soon: tags / filters / series.)
            </p>
          </div>
        </div>
      </section>
    </ManuscriptFrame>
  );
}
