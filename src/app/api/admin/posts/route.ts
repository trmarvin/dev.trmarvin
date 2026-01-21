// src/app/api/admin/posts/route.ts
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
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  try {
    const { title, slug, excerpt, content } = await req.json();

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt ?? "",
        content: content ?? "",
        published: true,
      },
    });

    return NextResponse.json({ ok: true, post }, { status: 201 });
  } catch (err: any) {
    // Slug uniqueness conflict (if you have a unique constraint)
    if (err?.code === "P2002") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
