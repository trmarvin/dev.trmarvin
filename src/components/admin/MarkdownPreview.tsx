"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-slate-200 prose-a:no-underline hover:prose-a:underline prose-hr:border-slate-800 prose-blockquote:border-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props: any) {
            const { className, children } = props;
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
              return (
                <div className="not-prose my-6 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 [&_pre]:!bg-transparent [&_code]:!bg-transparent">
                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark as any}
                    customStyle={{
                      margin: 0,
                      backgroundColor: "transparent",
                      padding: "1rem",
                    }}
                    codeTagProps={{
                      style: { backgroundColor: "transparent" as any },
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            }

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
