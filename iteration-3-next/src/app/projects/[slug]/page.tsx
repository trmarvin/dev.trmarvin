export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Project } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type ProjectPageProps = {
    params: { slug: string };
};

// --- Data helper -------------------------------------------------------------

async function getProject(slug: string): Promise<Project | null> {
    return prisma.project.findFirst({
        where: { slug },
    });
}

// --- Metadata ---------------------------------------------------------------

export async function generateMetadata(
    { params }: ProjectPageProps
): Promise<Metadata> {
    const project = await getProject(params.slug);

    if (!project) {
        return {
            title: "Project not found | Tamar Marvin",
        };
    }

    const title = `${project.title} – Project Case Study | Tamar Marvin`;
    const description =
        project.summary ??
        "Case study from the developer portfolio of Tamar Marvin.";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

// --- Page -------------------------------------------------------------------

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProject(params.slug);

    if (!project) {
        notFound();
    }

    const {
        title,
        summary,
        status,
        year,
        role,
        techStack,
        content,
    } = project;

    const statusColors: Record<string, string> = {
        live: "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
        "in-progress": "border-amber-400/70 bg-amber-500/10 text-amber-100",
        archived: "border-slate-500/60 bg-slate-700/40 text-slate-200",
        featured: "border-cyan-400/70 bg-cyan-500/10 text-cyan-100",
    };

    const badgeClass =
        status && statusColors[status] ? statusColors[status] : statusColors["featured"];

    return (
        <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-0">
            {/* Back link */}
            <div>
                <Link
                    href="/projects"
                    className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-cyan-300"
                >
                    <span className="mr-1.5">←</span>
                    All projects
                </Link>
            </div>

            {/* Header section */}
            <header className="space-y-4">
                <div className="flex flex-wrap items-start gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                        {title}
                    </h1>

                    {status && (
                        <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${badgeClass}`}
                        >
                            {status}
                        </span>
                    )}
                </div>

                {summary && (
                    <p className="max-w-2xl text-sm leading-relaxed text-slate-300/90">
                        {summary}
                    </p>
                )}

                <dl className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300/90">
                    {role && (
                        <div className="flex items-center gap-1.5">
                            <dt className="font-semibold text-slate-200">Role</dt>
                            <dd>{role}</dd>
                        </div>
                    )}
                    {year && (
                        <div className="flex items-center gap-1.5">
                            <dt className="font-semibold text-slate-200">Year</dt>
                            <dd>{year}</dd>
                        </div>
                    )}
                    {techStack && techStack.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <dt className="font-semibold text-slate-200">Tech</dt>
                            <dd className="flex flex-wrap gap-1.5">
                                {techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-slate-600/70 bg-slate-900/70 px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-200/90"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    )}
                </dl>
            </header>

            {/* Body content */}
            <section className="space-y-6">
                {content ? (
                    <article className="space-y-4 text-sm leading-relaxed text-slate-200">
                        {content
                            .split(/\n{2,}/) // split on blank lines → simple paragraphs
                            .map((block, index) => (
                                <p key={index}>{block.trim()}</p>
                            ))}
                    </article>
                ) : (
                    <p className="text-sm text-slate-400/90">
                        Case study coming soon. In the meantime, this project is included
                        in the grid on the{" "}
                        <Link
                            href="/projects"
                            className="underline decoration-slate-500 underline-offset-2 hover:text-cyan-300 hover:decoration-cyan-500"
                        >
                            projects page
                        </Link>
                        .
                    </p>
                )}
            </section>
        </main>
    );
}