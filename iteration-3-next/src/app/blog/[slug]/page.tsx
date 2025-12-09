// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { prisma } from '@/lib/prisma';
import { Markdown } from "@/components/Markdown";

interface PostPageProps {
    params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post || !post.published) {
        notFound();
    }

    return (
        <article className="prose prose-invert max-w-3xl mx-auto py-12">
            <h1>{post.title}</h1>
            {post.excerpt && <p className="text-muted-foreground">{post.excerpt}</p>}

            <Markdown>{post.content}</Markdown>

        </article>
    );
}