/**
 * @file layout.tsx
 * @description Root layout component with Google Fonts and comprehensive Open Graph metadata
 * @module app/layout
 */

import type { Metadata, Viewport } from "next";
import { inter, fraunces, jetbrainsMono } from "./fonts";
import "./globals.css";

const siteUrl = process.env.SITE_URL || "https://sanidhya.vercel.app";

export const viewport: Viewport = {
  themeColor: "#060604",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sanidhya | AI Engineer & Full-Stack Systems Architect",
    template: "%s | Sanidhya",
  },
  description:
    "Personal portfolio showcasing physical neural networks, aerodynamic surrogate models, bi-temporal Postgres extensions, and LLM agent execution tracing.",
  keywords: [
    "Sanidhya",
    "AI Engineer",
    "Full-Stack Developer",
    "PINN",
    "PostgreSQL",
    "LLM Agents",
    "TypeScript",
    "Next.js",
    "Kaggle Expert",
  ],
  authors: [{ name: "Sanidhya" }],
  creator: "Sanidhya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Sanidhya | AI Engineer & Full-Stack Systems Architect",
    description:
      "Personal portfolio showcasing physical neural networks, aerodynamic surrogate models, bi-temporal Postgres extensions, and LLM agent execution tracing.",
    siteName: "Sanidhya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanidhya | AI Engineer & Full-Stack Systems Architect",
    description:
      "Personal portfolio showcasing physical neural networks, aerodynamic surrogate models, bi-temporal Postgres extensions, and LLM agent execution tracing.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
