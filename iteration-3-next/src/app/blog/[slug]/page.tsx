import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type BlogPostPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: BlogPostPageProps
): Promise<Metadata> {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
        select: { title: true },
    });

    if (!post) {
        return { title: "Post not found – dev.trmarvin" };
    }

    return { title: `${post.title} – dev.trmarvin` };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) {
        notFound();
    }

    return (
        <article className="space-y-6">
            <header className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
                    Blog post
                </p>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {post.title}
                </h1>
                {post.excerpt && (
                    <p className="max-w-2xl text-sm text-slate-300">{post.excerpt}</p>
                )}
            </header>

            <section className="prose prose-invert max-w-none">
                <p>{post.content}</p>
            </section>
        </article>
    );
}
