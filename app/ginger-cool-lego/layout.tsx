import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ginger Cool Saga Sets | Shop",
  description:
    "Parody storefront layout themed around the Ginger Cool Saga. Not affiliated with any toy brand.",
  robots: { index: false, follow: false },
};

export default function GingerCoolLegoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-zinc-900 antialiased">{children}</div>
  );
}
