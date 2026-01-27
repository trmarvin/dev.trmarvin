"use client";

import { useEffect, useMemo, useState } from "react";
import { MarkdownPreview } from "./MarkdownPreview";

type ProjectPayload = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  year: string; // keep as string for input
  role: string;
  status: string;
  techStack: string; // comma-separated in UI
};

type ProjectEditorProps = {
  mode: "create" | "edit";
  projectId?: number;
  initial?: Partial<ProjectPayload>;
};

export function ProjectEditor({
  mode,
  projectId,
  initial,
}: ProjectEditorProps) {
  const [form, setForm] = useState<ProjectPayload>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    summary: initial?.summary ?? "",
    content: initial?.content ?? "",
    year: initial?.year ?? "",
    role: initial?.role ?? "",
    status: initial?.status ?? "",
    techStack: initial?.techStack ?? "",
  });

  const [statusMsg, setStatusMsg] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Auto-generate slug on create (gentle; stops once user edits slug)
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  useEffect(() => {
    if (mode !== "create") return;
    if (slugTouched) return;
    const s = form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setForm((prev) => ({ ...prev, slug: s }));
  }, [form.title, mode, slugTouched]);

  const preview = useMemo(() => {
    // Combine summary + body nicely (optional)
    const parts = [];
    if (form.summary.trim()) parts.push(form.summary.trim(), "");
    if (form.content.trim()) parts.push(form.content.trim());
    return parts.join("\n");
  }, [form.summary, form.content]);

  function update<K extends keyof ProjectPayload>(
    key: K,
    val: ProjectPayload[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function save() {
    setSaving(true);
    setStatusMsg("");

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim() || null,
      content: form.content.trim() || null,
      year: form.year.trim() ? Number(form.year.trim()) : null,
      role: form.role.trim() || null,
      status: form.status.trim() || null,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/projects", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/projects/${projectId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatusMsg(data?.error ? String(data.error) : "Save failed");
        setSaving(false);
        return;
      }

      setStatusMsg("Saved.");

      // On create, redirect to edit page
      if (mode === "create" && data?.project?.id) {
        window.location.href = `/admin/projects/${data.project.id}`;
        return;
      }

      setSaving(false);
    } catch (e: any) {
      setStatusMsg(e?.message ?? "Save failed");
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-50">
            {mode === "create" ? "New Project" : "Edit Project"}
          </h1>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>

        {statusMsg ? (
          <p className="text-sm text-slate-300">{statusMsg}</p>
        ) : null}

        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Title
            </span>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Slug
            </span>
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update("slug", e.target.value);
              }}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Year
              </span>
              <input
                value={form.year}
                onChange={(e) => update("year", e.target.value)}
                inputMode="numeric"
                className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Status
              </span>
              <input
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Role
            </span>
            <input
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Tech stack (comma-separated)
            </span>
            <input
              value={form.techStack}
              onChange={(e) => update("techStack", e.target.value)}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
              placeholder="Next.js, Prisma, Tailwind…"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Summary
            </span>
            <textarea
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
              rows={3}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Content (Markdown)
            </span>
            <textarea
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              rows={18}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-100"
              placeholder="Write the case study here…"
            />
          </label>
        </div>
      </section>

      {/* Preview */}
      <section className="min-w-0">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xs uppercase tracking-widest text-slate-400">
            Preview
          </h2>
          <span className="text-xs text-slate-600">
            Markdown + syntax highlighting
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <MarkdownPreview content={preview || "_(Nothing to preview yet.)_"} />
        </div>
      </section>
    </div>
  );
}
