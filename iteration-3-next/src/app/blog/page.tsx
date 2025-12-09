import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Post } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/blog/BlogCard";

export default async function BlogIndexPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },                // only published posts
        orderBy: { createdAt: "desc" },            // newest first
        select: {
            slug: true,
            title: true,
            excerpt: true,                              // if you have this field
            createdAt: true,                         // we’ll use later for date display
        },
    });

    return (
        <section className="space-y-6">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                    Blog
                </h1>
                <p className="max-w-xl text-sm text-slate-300/90">
                    Notes from the dev side of my life – builds, bugs, and experiments.
                </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                    <BlogCard
                        key={post.slug}
                        post={{
                            slug: post.slug,
                            title: post.title,
                            excerpt: post.excerpt,
                            // we’ll hook createdAt into meta soon
                        }}
                    />
                ))}
            </div>
        </section>
    );
}