import { prisma } from '@/lib/prisma';
import { deletePost } from './actions';

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">Posts</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 flex justify-between">
            <div>
              <div className="font-medium">{post.title}</div>
              <div className="text-sm text-neutral-600">{post.slug}</div>
            </div>

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