import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Written Language",
};

export default function WrittenLanguageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}
