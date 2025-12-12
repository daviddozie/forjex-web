import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://forjex.vercel.app/"),
  title: {
    default: "Forjex",
    template: "%s | Forjex"
  },
  description:
    "Forjex is a powerful CLI tool that helps developers generate new repositories, automate setups, streamline project creation, and generate perfect commit messages.",

  keywords: [
    "Generate new repositories",
    "Forjex",
    "Git automation",
    "commit message generator",
    "developer tools",
    "CLI tools",
    "AI code analysis",
    "open source",
    "Git workflow automation",
  ],

  robots: {
    index: true,
    follow: true,
  },

  authors: [{ name: "Forjex Team" }],
  creator: "Forjex",
  publisher: "Forjex",
  category: "Developer Tools",

  openGraph: {
    type: "website",
    url: "https://forjex.vercel.app/",
    title: "Forjex",
    description:
      "Forjex is a powerful CLI tool that helps developers generate new repositories, automate setups, streamline project creation, and generate perfect commit messages.",
    siteName: "Forjex",
    images: [
      {
        url: "https://ibb.co/8DzXbxH5",
        width: 1200,
        height: 630,
        alt: "Forjex",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Forjex — Automate Your Git Workflow",
    description:
      "AI-powered Git commit generator. Detect, analyze, and commit changes effortlessly.",
    images: ["https://ibb.co/8DzXbxH5"],
    creator: "@forjex",
  },

  alternates: {
    canonical: "https://forjex.vercel.app/",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
