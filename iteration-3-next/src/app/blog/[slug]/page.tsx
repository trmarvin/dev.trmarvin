import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Markdown } from "@/components/Markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type PostPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
    // ⬅️ unwrap the Promise Next 16 gives you
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) {
        return notFound();
    }

    return (
        <main className="main">
            <article className="prose">
                <header className="post-header">
                    <h1>{post.title}</h1>
                    {/* put publish date + reading time here later */}
                </header>

                {/* however you currently render content */}
                {/* If content is markdown: */}
                {/* <Markdown>{post.content}</Markdown> */}
            </article>
        </main>
    );
}