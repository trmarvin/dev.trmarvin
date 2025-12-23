export default function HomePage() {
  return (
    <section className="space-y-10">
      {/* Hero */}
      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-300">
          dev.trmarvin
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Full-stack developer, writer, and inveterate builder.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed sm:text-base">
          Hello World—I'm Tamar, a developer with a background in scholarship,
          rabbinics, and design. This is my development lab: projects in
          JavaScript, Node, React, Next.js, and beyond, plus the occasional
          deep dive into code, craft, and learning.</p>

        <p className="max-w-2xl text-sm leading-relaxed sm:text-base">
          I’ve been tinkering online since the <a href="https://lynx.invisible-island.net/">Lynx</a> era.
          I still love the weirdness of the early internet but as a techno-optimist,
          I look forward to the possibilities of the future web. After a career in
          academia, I’m now focused on web development — especially learning tools
          that make complex ideas feel approachable and resonant.</p>
      </div>

      {/* Highlights */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-slate-50">
            Current focus
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Iteration 3 of dev.trmarvin (Next.js + TypeScript), a seforim
            management app for my bootcamp final project, building my content-rich
            scholarly site with Strapi, and ongoing work on
            Kosher World Kitchen, my family's hobby blog.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-slate-50">
            What you&apos;ll find here
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Project write-ups, experiments with full-stack architectures, and
            notes on learning: Pythong, JavaScript, React/Redux, Next.js, CSS,
            and design systems.
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-50">Jump in</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="/blog"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1.5 text-slate-200 hover:border-accent-400 hover:text-accent-200"
          >
            Read the blog
          </a>
          <a
            href="/projects"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1.5 text-slate-200 hover:border-accent-400 hover:test-accent-200"
          >
            Explore projects
          </a>
          <a
            href="https://trmarvin.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1.5 text-slate-200 hover:border-accent-400 hover:text-accent-200"
          >
            Visit trmarvin.org
          </a>

        </div>
      </div>
    </section>
  );
}
