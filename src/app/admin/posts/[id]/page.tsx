"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);

  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setStatus(null);

      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = (await res.json()) as { post: Post };
      const post = data.post;

      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt ?? "");
      setContent(post.content ?? "");
      setPublished(post.published);

      setLoading(false);
    }

    if (id) load();
  }, [id]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setStatus("Saving…");

    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "GET",
      credentials: "same-origin",
      body: JSON.stringify({ title, slug, excerpt, content, published }),
    });

    if (!res.ok) {
      const text = await res.text();
      setStatus(`Error ${res.status}: ${text || "No response body"}`);
      setLoading(false);
      return;
    }

    const data = (await res.json()) as { post: Post };
    const post = data.post;

    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt ?? "");
    setContent(post.content ?? "");
    setPublished(post.published);

    setLoading(false);

    setStatus("Saved!");
    setSaving(false);

    // Optional: refresh server components that read Prisma directly (like the list page)
    router.refresh();
  }

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto py-12">
        <p>Loading…</p>
      </main>
    );
  }

  if (!loading && status?.startsWith("Error")) {
    return (
      <main className="max-w-3xl mx-auto py-12">
        <p className="text-sm">{status}</p>
        <button
          className="underline mt-4"
          onClick={() => router.push("/admin/posts")}
        >
          Back
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Edit Post</h1>
        <button
          className="underline"
          onClick={() => router.push("/admin/posts")}
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Excerpt</label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Content (Markdown)
          </label>
          <textarea
            className="border rounded px-3 py-2 w-full font-mono text-sm"
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Published
        </label>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>

        {status && <p className="text-sm">{status}</p>}
      </form>
    </main>
  );
}
