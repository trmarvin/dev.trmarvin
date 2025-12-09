// components/Markdown.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type MarkdownProps = {
    children: string;
    className?: string;
};

export function Markdown({ children, className }: MarkdownProps) {
    return (
        <ReactMarkdown
            className={className}
            components={{
                code(codeProps) {
                    const { children, className, inline, ...rest } = codeProps as any;
                    const match = /language-(\w+)/.exec(className || "");

                    if (!inline && match) {
                        return (
                            <SyntaxHighlighter
                                style={oneDark as any}
                                language={match[1]}
                                PreTag="div"
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        );
                    }

                    return (
                        <code className={className} {...rest}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
}
