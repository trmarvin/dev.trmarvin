"use client";

import { useEffect, useMemo, useState } from "react";
import { MarkdownPreview } from "./MarkdownPreview";

type ProjectPayload = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  year: string;
  role: string;
  status: string;
  techStack: string;

  featured: boolean;
  featuredOrder: string;
  repoUrl: string;
  liveUrl: string;
};

type ProjectEditorProps = {
  mode: "create" | "edit";
  projectId?: number;
  initial?: Partial<ProjectPayload>;
};

function normalizeInitial(initial?: Partial<ProjectPayload>): ProjectPayload {
  return {
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    summary: initial?.summary ?? "",
    content: initial?.content ?? "",
    year: initial?.year ?? "",
    role: initial?.role ?? "",
    status: initial?.status ?? "",
    techStack: initial?.techStack ?? "",

    featured: initial?.featured ?? false,
    featuredOrder: initial?.featuredOrder ?? "",
    repoUrl: initial?.repoUrl ?? "",
    liveUrl: initial?.liveUrl ?? "",
  };
}

export function ProjectEditor({
  mode,
  projectId,
  initial,
}: ProjectEditorProps) {
  const normalizedInitial = useMemo(() => normalizeInitial(initial), [initial]);

  const [form, setForm] = useState<ProjectPayload>(() =>
    normalizeInitial(initial),
  );

  const [statusMsg, setStatusMsg] = useState("");
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

  // ✅ Robust sync for edit mode:
  // - runs when initial changes
  // - also runs when projectId changes (route change / fast refresh)
  useEffect(() => {
    if (mode !== "edit") return;

    // Helpful debug (client-side only)
    // eslint-disable-next-line no-console
    console.log("ProjectEditor sync", { projectId, initial });

    setForm(normalizedInitial);
    setSlugTouched(true);
  }, [mode, projectId, normalizedInitial, initial]);

  const preview = useMemo(() => {
    const parts: string[] = [];
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

      featured: !!form.featured,
      featuredOrder: form.featuredOrder.trim()
        ? Number(form.featuredOrder.trim())
        : null,
      repoUrl: form.repoUrl.trim() || null,
      liveUrl: form.liveUrl.trim() || null,
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
          {/* Title */}
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

          {/* Slug */}
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

          {/* Year / Status */}
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

          {/* Featured / order */}
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950 px-3 py-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm text-slate-200">Featured</span>
            </label>

            <label className="grid gap-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Featured order
              </span>
              <input
                value={form.featuredOrder}
                onChange={(e) => update("featuredOrder", e.target.value)}
                inputMode="numeric"
                className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                placeholder="1"
              />
            </label>
          </div>

          {/* Repo / Live */}
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Repo URL
              </span>
              <input
                value={form.repoUrl}
                onChange={(e) => update("repoUrl", e.target.value)}
                className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                placeholder="https://github.com/…"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Live URL
              </span>
              <input
                value={form.liveUrl}
                onChange={(e) => update("liveUrl", e.target.value)}
                className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
                placeholder="https://…"
              />
            </label>
          </div>

          {/* Role */}
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

          {/* Tech stack */}
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

          {/* Summary */}
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

          {/* Content */}
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
