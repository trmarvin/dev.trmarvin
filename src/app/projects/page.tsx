// src/app/projects/page.tsx
import Link from "next/link";
import { projects } from "@/lib/projects";
import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@prisma/client";

export default async function ProjectsIndexPage() {
    const projects: Project[] = await prisma.project.findMany({
        orderBy: { year: "desc" },
    });

    if (projects.length === 0) {
        return (
            <section className="space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                        Projects
                    </h1>
                    <p className="max-w-xl text-slate-300/90">
                        A curated selection of things I’ve built.
                    </p>
                </header>

                <p className="text-sm text-slate-400/90">
                    No projects yet – add a Project in your database and they will show up
                    here.
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                    Projects
                </h1>
                <p className="max-w-xl text-slate-300/90">
                    A curated selection of things I’ve built.
                </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}