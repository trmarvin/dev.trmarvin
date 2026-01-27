// src/app/blog/[slug]/PostBody.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function PostBody({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-slate-200 prose-a:no-underline hover:prose-a:underline prose-hr:border-slate-800 prose-blockquote:border-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2({ children, ...props }) {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2 id={id} {...props}>
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            const text = String(children);
            const id = slugify(text);
            return (
              <h3 id={id} {...props}>
                {children}
              </h3>
            );
          },

          // NOTE: props typed as any to avoid react-markdown version typing mismatches.
          code(props: any) {
            const { className, children } = props;
            const match = /language-(\w+)/.exec(className || "");

            // fenced code block
            if (match) {
              return (
                <div className="not-prose my-6 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 [&_pre]:!bg-transparent [&_code]:!bg-transparent">
                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark as any}
                    // ✅ let it render a <pre> normally so customStyle actually hits the pre
                    customStyle={{
                      margin: 0,
                      backgroundColor: "transparent",
                      padding: "1rem",
                    }}
                    // ✅ make sure the inner <code> isn't painting a bg either
                    codeTagProps={{
                      style: { backgroundColor: "transparent" as any },
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            }

            // inline code
            return (
              <code className="rounded bg-slate-900 px-1 py-0.5 text-slate-200">
                {children}
              </code>
            );
          },

          a({ href, children, ...props }) {
            const isExternal =
              typeof href === "string" &&
              (href.startsWith("http://") || href.startsWith("https://"));

            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
