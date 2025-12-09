import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function BlogIndexPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>

            {posts.length === 0 ? (
                <p className="text-sm text-slate-400">No posts yet.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="rounded-lg border border-slate-800 bg-slate-900/40 p-4"
                        >
                            <Link href={`/blog/${post.slug}`} className="block space-y-1">
                                <h2 className="text-base font-semibold text-slate-50">
                                    {post.title}
                                </h2>
                                {post.excerpt && (
                                    <p className="text-sm text-slate-300">{post.excerpt}</p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}