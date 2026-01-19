import { prisma } from "@/lib/prisma";

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      content: true,
    },
  });
}

export async function getAllPosts() {
  return prisma.post.findMany({
    where: { published: true },
    select: {
      slug: true,
      title: true,
      excerpt: true,
    },
  });
}