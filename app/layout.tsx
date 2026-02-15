import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Suspense } from "react";

import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const siteUrl = "https://soundcn.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "soundcn - Free Sound Effects for Modern Web Apps",
    template: "%s | soundcn",
  },
  description:
    "700+ curated UI sound effects for modern web apps. Browse, preview, and install sounds with a single command. Free and open source.",
  keywords: [
    "sound effects",
    "UI sounds",
    "web app sounds",
    "notification sounds",
    "click sounds",
    "shadcn",
    "react sounds",
    "nextjs sounds",
    "free sound effects",
    "open source sounds",
  ],
  authors: [{ name: "soundcn" }],
  creator: "soundcn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "soundcn",
    title: "soundcn - Free Sound Effects for Modern Web Apps",
    description:
      "700+ curated UI sound effects for modern web apps. Browse, preview, and install sounds with a single command.",
    images: [
      {
        url: "/hero-dark.png",
        width: 2896,
        height: 944,
        alt: "soundcn - Free Sound Effects for Modern Web Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "soundcn - Free Sound Effects for Modern Web Apps",
    description:
      "700+ curated UI sound effects for modern web apps. Browse, preview, and install sounds with a single command.",
    images: ["/hero-dark.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1b2e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
          <Suspense fallback={<>...</>}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
        <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
