import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function requireAdmin() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin")?.value === "1";
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const projects = await prisma.project.findMany({
    orderBy: [{ year: "desc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const data = await req.json();

  const title = String(data.title ?? "").trim();
  const slug = String(data.slug ?? "").trim();
  if (!title || !slug) {
    return NextResponse.json(
      { error: "title and slug are required" },
      { status: 400 },
    );
  }

  const techStack: string[] = Array.isArray(data.techStack)
    ? data.techStack.map((s: unknown) => String(s).trim()).filter(Boolean)
    : String(data.techStack ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  const featured = Boolean(data.featured);

  const featuredOrder =
    data.featuredOrder === null ||
    data.featuredOrder === undefined ||
    data.featuredOrder === ""
      ? null
      : Number(data.featuredOrder);

  const repoUrl = data.repoUrl ? String(data.repoUrl).trim() : null;
  const liveUrl = data.liveUrl ? String(data.liveUrl).trim() : null;

  const created = await prisma.project.create({
    data: {
      title,
      slug,
      summary: data.summary ? String(data.summary) : null,
      content: data.content ? String(data.content) : null,
      year:
        data.year === null || data.year === undefined || data.year === ""
          ? null
          : Number(data.year),
      role: data.role ? String(data.role) : null,
      status: data.status ? String(data.status) : null,
      techStack,

      featured,
      featuredOrder,
      repoUrl,
      liveUrl,
    },
  });

  return NextResponse.json({ project: created }, { status: 201 });
}
