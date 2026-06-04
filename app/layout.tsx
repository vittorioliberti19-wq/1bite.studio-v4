import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { jsonLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

const DESC =
  "Agencia creativa en Maracaibo, Venezuela. Branding, redes sociales, páginas web, desarrollo de apps, sistemas operativos a la medida y producción audiovisual. Concebimos experiencias indelebles.";

export const metadata: Metadata = {
  metadataBase: new URL("https://1bite.studio"),
  title: {
    default:
      "1bite — Agencia de marketing, branding y desarrollo web en Maracaibo",
    template: "%s · 1bite",
  },
  description: DESC,
  keywords: [
    "agencia de marketing Maracaibo",
    "agencia de publicidad Venezuela",
    "branding Maracaibo",
    "manejo de redes sociales",
    "diseño de páginas web",
    "desarrollo de aplicaciones",
    "desarrollo de sistemas",
    "producción audiovisual",
    "1bite",
    "1bite studio",
  ],
  authors: [{ name: "1bite Studio" }],
  creator: "1bite Studio",
  publisher: "1bite Studio",
  category: "Marketing & Advertising",
  verification: {
    google: "V6-Jm-fg6WKKeXENz1DX2S3egoiG_SFDucsjtiTmBfQ",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "https://1bite.studio",
    siteName: "1bite Studio",
    title: "1bite — Concebimos experiencias indelebles",
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "1bite — Concebimos experiencias indelebles",
    description: DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
