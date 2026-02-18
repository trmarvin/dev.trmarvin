export type TocItem = { id: string; text: string; level: 2 | 3 };

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // keep letters/numbers (incl Hebrew)
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // toggle fenced code blocks
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m2 = trimmed.match(/^##\s+(.+)$/);
    const m3 = trimmed.match(/^###\s+(.+)$/);

    const text = (m2?.[1] ?? m3?.[1])?.trim();
    if (!text) continue;

    const level: 2 | 3 = m2 ? 2 : 3;
    toc.push({ id: slugify(text), text, level });
  }

  return toc;
}
