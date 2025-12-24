import type { Project } from "@prisma/client";
import { ContentCard } from "@/components/ui/ContentCard";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const {
        slug,
        title,
        summary,
        status,
        year,
        role,
        techStack,
    } = project;

    return (
        <ContentCard
            href={`/projects/${slug}`}
            title={title}
            description={summary ?? undefined}
            // badge is just a string, which matches your current ContentCard props
            badge={status ?? undefined}
            // only show tags if there are any
            tags={techStack && techStack.length > 0 ? techStack : undefined}
            meta={
                <>
                    {role && <span>{role}</span>}
                    {year && <span>{year}</span>}
                </>
            }
        />
    );
}