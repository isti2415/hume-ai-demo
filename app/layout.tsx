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
import Footer from "@/components/Footer";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://humeaidemo.vercel.app"),
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
    images: [
      {
        alt: "...",
        width: 1200,
        height: 630,
        url: "/opengraph-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hume AI Demo: Intelligent Web App with Next.js",
    description:
      "An intelligent web application built with Next.js, TypeScript, Tailwind CSS, and the Hume AI React SDK, showcasing the power of AI in modern web development.",
    images: [{ url: "/opengraph-image.jpg" }],
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
          "bg-background text-foreground antialiased",
          urbanist.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Auth>
            <div className="flex flex-col items-center">
              <Nav />
              <div className="-mt-16 pt-24 min-h-screen">{children}</div>
              <Footer/>
            </div>
          </Auth>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
