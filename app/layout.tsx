import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Nav from "@/components/navigation-menu";
import { Auth } from "@/components/hume/Auth";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Hume AI Demo: Intelligent Web App with Next.js",
    template: "%s - Hume AI Demo",
  },
  description:
    "An intelligent web application built with Next.js, TypeScript, Tailwind CSS, and the Hume AI React SDK, showcasing the power of AI in modern web development.",
  openGraph: {
    title: "Hume AI Demo: Intelligent Web App with Next.js",
    description:
      "An intelligent web application built with Next.js, TypeScript, Tailwind CSS, and the Hume AI React SDK, showcasing the power of AI in modern web development.",
    type: "website",
    url: "https://humeaidemo.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hume AI Demo: Intelligent Web App with Next.js",
    description:
      "An intelligent web application built with Next.js, TypeScript, Tailwind CSS, and the Hume AI React SDK, showcasing the power of AI in modern web development.",
    images: [
      "https://github.com/isti2415/hume-ai-demo/blob/c8df06715b6ca3274b033ee0088a666cc6e01d13/app/opengraph-image.png?raw=true",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background text-foreground antialiased flex flex-col items-center",
          urbanist.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Auth>
            <Nav />
            <div className="mt-8">{children}</div>
          </Auth>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
