import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facial Expression",
};

export default function FacialExpressionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
