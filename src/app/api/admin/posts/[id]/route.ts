import { NextRequest, NextResponse } from "next/server";
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

async function getPostId(ctx: Ctx) {
  const { id } = await ctx.params;
  const postId = Number(id);
  return postId && !Number.isNaN(postId) ? postId : null;
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const postId = await getPostId(ctx);
  if (!postId) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const postId = await getPostId(ctx);
  if (!postId) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const data: Record<string, any> = {};

  // Only validate what the client actually sends
  if ("title" in body) {
    const title = String(body.title ?? "").trim();
    if (!title) {
      return NextResponse.json(
        { error: "title cannot be empty" },
        { status: 400 }
      );
    }
    data.title = title;
  }

  if ("slug" in body) {
    const slug = String(body.slug ?? "").trim();
    if (!slug) {
      return NextResponse.json(
        { error: "slug cannot be empty" },
        { status: 400 }
      );
    }
    data.slug = slug;
  }

  if ("excerpt" in body) data.excerpt = body.excerpt ?? "";
  if ("content" in body) data.content = body.content ?? "";
  if ("published" in body) data.published = !!body.published;

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "No fields provided to update" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data,
    });

    return NextResponse.json({ ok: true, post });
  } catch (err: any) {
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
