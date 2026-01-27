import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

type Ctx = { params: { id: string } | Promise<{ id: string }> };

async function requireAdmin() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin")?.value === "1";
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

async function getProjectId(ctx: Ctx) {
  const { id } = await Promise.resolve(ctx.params);
  const projectId = Number(id);
  return projectId && !Number.isNaN(projectId) ? projectId : null;
}

export async function GET(_req: Request, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const projectId = await getProjectId(ctx);
  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PATCH(req: Request, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const projectId = await getProjectId(ctx);
  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const data = await req.json();

  const techStack: string[] | undefined =
    data.techStack === undefined
      ? undefined
      : Array.isArray(data.techStack)
        ? data.techStack.map((s: unknown) => String(s).trim()).filter(Boolean)
        : String(data.techStack ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

  const featured =
    data.featured !== undefined ? Boolean(data.featured) : undefined;

  const featuredOrder =
    data.featuredOrder !== undefined
      ? data.featuredOrder === null || data.featuredOrder === ""
        ? null
        : Number(data.featuredOrder)
      : undefined;

  const repoUrl =
    data.repoUrl !== undefined
      ? data.repoUrl
        ? String(data.repoUrl).trim()
        : null
      : undefined;

  const liveUrl =
    data.liveUrl !== undefined
      ? data.liveUrl
        ? String(data.liveUrl).trim()
        : null
      : undefined;

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      title: data.title !== undefined ? String(data.title) : undefined,
      slug: data.slug !== undefined ? String(data.slug) : undefined,
      summary:
        data.summary !== undefined
          ? data.summary
            ? String(data.summary)
            : null
          : undefined,
      content:
        data.content !== undefined
          ? data.content
            ? String(data.content)
            : null
          : undefined,
      year:
        data.year !== undefined
          ? data.year === null || data.year === ""
            ? null
            : Number(data.year)
          : undefined,
      role:
        data.role !== undefined
          ? data.role
            ? String(data.role)
            : null
          : undefined,
      status:
        data.status !== undefined
          ? data.status
            ? String(data.status)
            : null
          : undefined,
      techStack,

      featured,
      featuredOrder,
      repoUrl,
      liveUrl,
    },
  });

  return NextResponse.json({ project: updated });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const projectId = await getProjectId(ctx);
  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  await prisma.project.delete({ where: { id: projectId } });
  return NextResponse.json({ ok: true });
}
