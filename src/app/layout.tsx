import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const siteUrl = "https://dev.trmarvin.org";
const siteName = "dev.trmarvin";
const defaultTitle = "Tamar Ron Marvin — Developer Portfolio";
const defaultDescription =
  "Projects, writing, and work by Tamar Ron-Marvin.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s · ${siteName}`,
  },
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
    // optional, but nice:
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
    images: [
      {
        url: "/og.png", // we’ll create this
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    // optionally add: apple: "/apple-touch-icon.png"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            {/* Site header */}

            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <a href="/" className="text-sm tracking-tight">
                  <span className="brand-prefix">dev.</span>
                  <span className="brand-name">trmarvin</span>
                </a>


                <nav className="flex items-center gap-5 text-sm font-medium text-slate-300">
                  <a href="/" className="hover:text-accent">
                    Home
                  </a>
                  <a href="/blog" className="hover:text-accent">
                    Blog
                  </a>
                  <a href="/projects" className="hover:text-accent">
                    Projects
                  </a>
                  <a href="/about" className="hover:text-accent">
                    About
                  </a>

                  {/* Theme toggle */}
                  <ThemeToggle />
                </nav>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1">
              <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-6 text-xs text-slate-400">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
                <span>© 2025 Tamar Marvin</span>
                <span className="text-slate-500">
                  Built with Next.js &amp; TypeScript
                </span>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}