import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "./actions";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="max-w-3xl mx-auto py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link href="/admin/posts/new" className="underline">
          New post
        </Link>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 flex justify-between">
            <Link href={`/admin/posts/${post.id}`} className="block">
              <div className="font-medium">{post.title}</div>
              <div className="text-sm text-neutral-600">{post.slug}</div>
              <div className="text-xs text-neutral-500">
                {post.published ? "Published" : "Draft"}
              </div>
            </Link>

            <form action={deletePost}>
              <input type="hidden" name="id" value={post.id} />
              <button className="text-red-600 hover:underline">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
