import type { Metadata } from "next";
import GaleriaCliente from "@/components/fotos/GaleriaCliente";

// Galería privada de cliente: nunca indexar (también bloqueada en robots.ts y fuera del sitemap).
export const metadata: Metadata = {
  title: "Tu galería",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function GaleriaFotos({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <GaleriaCliente slug={slug} />;
}
