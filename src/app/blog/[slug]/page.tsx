import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostBody } from "./PostBody";

export const runtime = "nodejs";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // optional: debug
  // console.log("DEBUG slug:", slug);

  if (!slug) return notFound();

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      content: true,
      excerpt: true,     // helpful fallback
      published: true,
    },
  });

  if (!post || !post.published) return notFound();

  const body = post.content?.trim() || post.excerpt?.trim() || "";

  return (
    <article className="prose prose-invert">
      <h1>{post.title}</h1>
      <PostBody content={body} />
    </article>
  );
}