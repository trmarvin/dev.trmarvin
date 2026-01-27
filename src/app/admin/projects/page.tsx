import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ year: "desc" }, { updatedAt: "desc" }],
    select: { id: true, slug: true, title: true, year: true, updatedAt: true },
  });

  return (
    <section className="space-y-6">
      <header className="flex items-baseline justify-between gap-6">
        <h1 className="text-2xl font-semibold text-slate-50">
          Admin · Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 hover:bg-slate-800"
        >
          New project
        </Link>
      </header>

      <ol className="divide-y divide-slate-800 rounded-xl border border-slate-800">
        {projects.map((p) => (
          <li key={p.id} className="p-4">
            <div className="flex items-baseline justify-between gap-6">
              <div className="min-w-0">
                <div className="text-sm text-slate-400">
                  {p.year ?? ""} <span className="text-slate-600">·</span>{" "}
                  {p.slug}
                </div>
                <div className="truncate text-slate-100">{p.title}</div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-sm text-slate-300 hover:text-white"
                >
                  View
                </Link>
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="text-sm text-slate-300 hover:text-white"
                >
                  Edit
                </Link>
              </div>
            </div>
          </li>
        ))}
        {projects.length === 0 ? (
          <li className="p-4 text-sm text-slate-400">No projects yet.</li>
        ) : null}
      </ol>
    </section>
  );
}
