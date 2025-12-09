import { ContentCard } from "@/components/ui/ContentCard";

export interface BlogPostCardData {
    slug: string;
    title: string;
    excerpt?: string | null;
    tags?: string[] | null;
    // we'll add date + readingTime later
}

interface BlogCardProps {
    post: BlogPostCardData;
}

export function BlogCard({ post }: BlogCardProps) {
    const tags = post.tags ?? [];

    return (
        <ContentCard
            href={`/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt ?? undefined}
            tags={tags}
            meta={
                <>
                    {/* placeholders – next step will wire date + reading time */}
                    <span>Blog post</span>
                </>
            }
        />
    );
}