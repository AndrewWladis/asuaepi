import type { Metadata } from "next";
import { Geist, Oswald } from "next/font/google";
import { GingerCodeListener } from "./components/GingerCodeListener";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alpha Epsilon Pi | ASU",
  description:
    "Alpha Epsilon Pi at Arizona State University. Brotherhood, leadership, and tradition since our charter in 1951.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${oswald.variable} font-sans antialiased`}
      >
        <GingerCodeListener />
        {children}
      </body>
    </html>
  );
}
