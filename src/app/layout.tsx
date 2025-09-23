// @ts-nocheck
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project PKM - AI Powered Development",
  description: "Platform untuk menemukan, mempelajari, dan menggunakan tools AI terbaik.",
  icons: {
    icon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>`,
  },
  keywords: ["Project PKM", "AI", "Artificial Intelligence", "Next.js", "React", "Mahasiswa", "Teknologi"],
  authors: [{ name: "Tim Project PKM" }],
  openGraph: {
    title: "Project PKM - AI Powered Development",
    description: "Platform untuk menemukan, mempelajari, dan menggunakan tools AI terbaik.",
    url: "https://project-pkm-ai.vercel.app", // Ganti dengan URL jika sudah ada
    siteName: "Project PKM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project PKM - AI Powered Development",
    description: "Platform untuk menemukan, mempelajari, dan menggunakan tools AI terbaik.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
