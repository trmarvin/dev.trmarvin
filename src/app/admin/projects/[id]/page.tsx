import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export const runtime = "nodejs";

type Params = { id: string };
type Ctx = { params: Params | Promise<Params> };

export default async function EditProjectPage({ params }: Ctx) {
  const { id } = await Promise.resolve(params);
  const projectId = Number(id);
  if (!projectId || Number.isNaN(projectId)) return notFound();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      content: true,
      year: true,
      role: true,
      status: true,
      techStack: true,
    },
  });

  if (!project) return notFound();

  return (
    <section className="space-y-6">
      <ProjectEditor
        mode="edit"
        projectId={project.id}
        initial={{
          title: project.title,
          slug: project.slug,
          summary: project.summary ?? "",
          content: project.content ?? "",
          year: project.year?.toString() ?? "",
          role: project.role ?? "",
          status: project.status ?? "",
          techStack: project.techStack?.join(", ") ?? "",
        }}
      />
    </section>
  );
}
