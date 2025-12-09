import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prisma } from "@/lib/prisma";   // Adjust this path to however your project organizes Prisma
import type { Post } from "@prisma/client";

export default async function BlogIndexPage() {
    const posts: Post[] = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="max-w-3xl mx-auto py-12">
            <h1 className="text-3xl font-semibold mb-6">Blog</h1>

            {posts.length === 0 && <p>No posts yet.</p>}

            <ul className="space-y-4">
                {posts.map((post: Post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.slug}`} className="text-lg font-medium">
                            {post.title}
                        </Link>
                        {post.excerpt && (
                            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}
