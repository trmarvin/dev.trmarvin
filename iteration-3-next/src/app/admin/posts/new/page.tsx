// src/app/admin/posts/new/page.tsx
'use client';

import { useState } from 'react';

export default function NewPostPage() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('Saving…');

        const res = await fetch('/api/admin/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // If your API route checks this header, keep it.
                // Otherwise, remove it.
                'x-admin-token': process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? '',
            },
            body: JSON.stringify({ title, slug, excerpt, content }),
        });

        if (!res.ok) {
            const text = await res.text(); // <-- ALWAYS works, even if not JSON
            setStatus(`Error ${res.status}: ${text || 'No response body'}`);
            return;
        }

        setStatus('Saved!');
        // Optional: clear fields
        // setTitle(''); setSlug(''); setExcerpt(''); setContent('');
    }

    return (
        <main className="max-w-3xl mx-auto py-12">
            <h1 className="text-2xl font-semibold mb-6">New Blog Post</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        className="border rounded px-3 py-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Slug (e.g. <code>my-first-post</code>)
                    </label>
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

                <button type="submit" className="px-4 py-2 rounded bg-black text-white">
                    Publish
                </button>

                {status && <p className="text-sm">{status}</p>}
            </form>
        </main>
    );
}