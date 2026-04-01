import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";

import { AppProviders } from "@/components/layout/AppProviders";
import "./globals.css";

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Second Brain OS",
  description: "Stop collecting. Start executing.",
  manifest: "/manifest.json",
};

const themeInitScript = `
(() => {
  const stored = localStorage.getItem("sbos-theme");
  const parsed = stored ? JSON.parse(stored) : null;
  const preferred = parsed?.state?.theme;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = systemDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", preferred ?? defaultTheme);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-ink">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
