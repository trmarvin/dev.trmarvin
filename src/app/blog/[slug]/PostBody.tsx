"use client";
import { Markdown } from "@/components/Markdown";

export function PostBody({ content }: { content: string }) {
  if (!content) {
    return <p className="text-slate-400">No content yet.</p>;
  }
  return <Markdown>{content}</Markdown>;
}