import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vocal Burst",
};

export default function VocalBurstLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
