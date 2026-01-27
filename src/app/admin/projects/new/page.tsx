import { ProjectEditor } from "@/components/admin/ProjectEditor";

export const runtime = "nodejs";

export default function NewProjectPage() {
  return (
    <section className="space-y-6">
      <ProjectEditor mode="create" />
    </section>
  );
}
