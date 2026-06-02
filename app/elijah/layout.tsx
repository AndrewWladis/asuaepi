import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lego Elijah Mandel: The Game",
  description: "Press SPACE to start.",
  robots: { index: false, follow: false },
};

export default function ElijahLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
