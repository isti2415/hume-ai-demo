import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speech Prosody",
};

export default function SpeechProsodyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}
