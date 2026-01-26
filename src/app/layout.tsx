// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";

import { Libre_Caslon_Text } from "next/font/google";

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-caslon", // <-- IMPORTANT: unique var name
  display: "swap",
});

const siteUrl = "https://dev.trmarvin.org";
const siteName = "dev.trmarvin";
const defaultTitle = "Tamar Ron Marvin — Developer Portfolio";
const defaultDescription = "Developer | Information Architect | Scholar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s · ${siteName}` },
  description: defaultDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${siteName} RSS` }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: defaultTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={caslon.variable} // <-- makes --font-caslon available
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased bg-[color:var(--bg)] text-[color:var(--ink-1)]">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <header>
              <SiteHeader />
            </header>

            {/* IMPORTANT: root layout should NOT impose max-width */}
            <main className="flex-1">{children}</main>

            <footer className="border-t border-[color:var(--border)] py-6 text-xs text-[color:var(--ink-3)]">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
                <span>© 2026 Tamar Ron Marvin</span>
                <span className="text-[color:var(--ink-3)]">
                  <a href="https://github.com/trmarvin">GitHub</a> ·{"  "}
                  <a href="https://www.linkedin.com/in/trmarvin/">
                    LinkedIn
                  </a> · <a href="/colophon">Colophon</a> · Built with Next.js
                  &amp; TypeScript
                </span>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
