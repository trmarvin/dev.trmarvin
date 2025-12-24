// src/lib/projects.ts

export type Project = {
    slug: string;
    title: string;
    tagline: string;
    stack: string[];
    summary: string;
    content: string; // markdown body
};

export const projects: Project[] = [
    {
        slug: "kwk",
        title: "Kosher World Kitchen",
        tagline: "Recipe site with custom WordPress block theme & React search grid",
        stack: ["WordPress", "React", "PHP", "REST API"],
        summary:
            "A custom Gutenberg block theme with a React faceted search grid, taxonomy-driven recipe architecture, and performance-focused UX design.",
        content: `
## Overview

Kosher World Kitchen is my custom WordPress block theme plus a React faceted search grid for recipes.

- Custom Gutenberg block theme
- Taxonomy-driven recipe architecture
- React grid powered by the WordPress REST API

\`\`\`tsx
// Example snippet
fetch("/wp-json/kwk/v1/recipes?region=asia")
  .then((res) => res.json())
  .then(setRecipes);
\`\`\`
    `.trim(),
    },
    {
        slug: "dev-trmarvin",
        title: "dev.trmarvin (Iteration 3)",
        tagline:
            "Full-stack portfolio built with Next.js, Prisma, Postgres, and custom CMS.",
        stack: ["Next.js", "Prisma", "Postgres", "TypeScript"],
        summary:
            "A full-stack developer portfolio with a custom blog engine, syntax highlighting, markdown admin UI, and database-backed content system.",
        content: `
## Overview

This iteration of dev.trmarvin is a full-stack Next.js app with a Prisma/Postgres backend.

- App Router + server components
- Prisma for typed DB access
- Markdown-based content with syntax highlighting
    `.trim(),
    },
];

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const project = projects.find((p) => p.slug === slug);
    return project ?? null;
}