import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1bite — Concebimos experiencias indelebles",
  description:
    "Agencia creativa en Maracaibo. Branding · Social · Web · Apps. Concebimos experiencias indelebles.",
  openGraph: {
    title: "1bite",
    description:
      "Concebimos experiencias indelebles. Branding · Social · Web · Apps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-[family-name:var(--font-display)]">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
