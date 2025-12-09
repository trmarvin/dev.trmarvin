// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { getProjectBySlug } from "@/lib/projects";

type Props = { params: { slug: string } };

export default async function ProjectPage({ params }: Props) {
    const project = await getProjectBySlug(params.slug);
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
