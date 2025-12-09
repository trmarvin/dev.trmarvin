// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { getProjectBySlug } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
    // 👇 unwrap the promise first
    const { slug } = await params;

    const project = await getProjectBySlug(slug);
    if (!project) return notFound();

    return (
        <main className="main">
            <article className="prose">
                <header className="case-header">
                    <p className="case-kicker">Case study</p>
                    <h1>{project.title}</h1>
                    <p className="case-summary">{project.summary}</p>
                </header>

                <Markdown>{project.content}</Markdown>
            </article>
        </main>
    );
}