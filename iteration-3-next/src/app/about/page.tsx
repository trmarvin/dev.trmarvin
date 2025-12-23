// src/app/about/page.tsx

export const metadata = {
    title: "About | Tamar Marvin",
    description:
        "About Tamar Marvin — developer, scholar, and builder of handcrafted knowledge platforms.",
};

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="mb-6 text-3xl font-semibold tracking-tight">
                About
            </h1>

            <div className="prose prose-neutral max-w-none">
                <p>
                    I’m Tamar Marvin — a developer with a background in scholarship,
                    focused on building thoughtful, well-structured digital
                    systems for complex ideas. I am also trained in graphic design
                    and interested in UI/UX.
                </p>

                <p>
                    My work sits at the intersection of software engineering,
                    writing, and knowledge design. I’m particularly interested
                    in content-heavy, mission-aligned projects that require
                    systemic, architectural solutions.
                </p>

                <p>
                    This site is both a portfolio and a working notebook:
                    a place to document projects, experiments, and ideas
                    as they evolve.
                </p>

                <h1>Elswhere</h1>
                <a href="https://github.com/trmarvin">GitHub</a> |
                <a rel="me" href="https://hachyderm.io/@trmarvin">Mastodon (dev)</a> |
                <a rel="me" href="https://babka.social/@trmarvin">Mastodon (writing)</a>
            </div>
        </main>
    );
}