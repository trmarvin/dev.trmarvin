// src/app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ManuscriptFrame } from "@/components/layout/ManuscriptFrame";
import { PostBody } from "./PostBody";

export const runtime = "nodejs";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ unwrap
  if (!slug) return notFound();

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      content: true,
      excerpt: true,
      published: true,
      createdAt: true,
    },
  });

  if (!post || !post.published) return notFound();

  const body = post.content?.trim() || post.excerpt?.trim() || "";

  return (
    <ManuscriptFrame
      className="py-2"
      left={
        <nav className="text-sm text-slate-400">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Navigation
              </div>
              <ul className="space-y-1">
                <li>
                  <Link href="/blog" className="hover:text-slate-200">
                    ← Dev Notes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      }
      right={
        <aside className="space-y-6 text-sm text-slate-400">
          <section className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Meta
            </div>
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
              <span>Date</span>
              <span className="tabular-nums text-slate-300">
                {formatDate(post.createdAt)}
              </span>
            </div>
          </section>

          <section className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Feed
            </div>
            <Link href="/rss.xml" className="hover:text-slate-200">
              RSS
            </Link>
          </section>
        </aside>
      }
    >
      <article className="min-w-0">
        <header className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--ink-1)]">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--ink-2)/90">
              {post.excerpt}
            </p>
          ) : null}

          <div className="border-b border-slate-800" />
        </header>

        <div className="mt-8">
          <PostBody content={body} />
        </div>
      </article>
    </ManuscriptFrame>
  );
}
