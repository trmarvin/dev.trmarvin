import Link from "next/link";

type ProjectFeaturedCardProps = {
  title: string;
  summary?: string | null;
  stack?: string | null;
  focus?: string | null;
  slug: string;
  href?: string | null; // external site url (optional)
};

export function ProjectFeaturedCard({
  title,
  summary,
  stack,
  focus,
  slug,
  href,
}: ProjectFeaturedCardProps) {
  return (
    <article className="group rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
      <div className="grid gap-3">
        <header className="grid gap-1">
          <h3 className="text-base font-semibold text-[var(--ink-1)]">
            {title}
          </h3>
          {summary ? (
            <p className="text-sm text-[var(--ink-2)]">{summary}</p>
          ) : null}
        </header>

        {stack || focus ? (
          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[var(--ink-2)]">
            {stack ? (
              <div>
                <dt className="uppercase tracking-wider text-[var(--ink-3)]">
                  Stack
                </dt>
                <dd className="mt-0.5">{stack}</dd>
              </div>
            ) : null}
            {focus ? (
              <div>
                <dt className="uppercase tracking-wider text-[var(--ink-3)]">
                  Focus
                </dt>
                <dd className="mt-0.5">{focus}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <footer className="mt-3 flex gap-4 text-sm">
          <Link
            href={`/projects/${slug}`}
            className="text-[var(--link)] hover:underline"
          >
            Case study
          </Link>
          {href ? (
            <a
              href={href}
              className="text-[var(--link)] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Visit site
            </a>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
