// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
    // Next 16: params is a Promise
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
                    <p className="case-tagline">{project.tagline}</p>
                    <p className="case-meta">{project.stack.join(" · ")}</p>
                </header>

                <Markdown>{project.content}</Markdown>
            </article>
        </main>
    );
}