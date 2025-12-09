// src/app/projects/page.tsx
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
    return (
        <main className="main">
            <section className="prose">
                <h1>Projects</h1>
                <p>
                    Selected projects that showcase my work across front-end, full-stack,
                    and WordPress/React.
                </p>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <article key={project.slug} className="project-card">
                            <h2>
                                <Link href={`/projects/${project.slug}`}>
                                    {project.title}
                                </Link>
                            </h2>
                            <p>{project.summary}</p>
                            <p className="project-meta">
                                {project.stack.join(" · ")}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}