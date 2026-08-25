import type { Metadata } from "next";
import CuestionarioForm from "@/components/sections/CuestionarioForm";
import { PREGUNTAS_ECOMMERCE } from "@/lib/cuestionarios";

// Ruta oculta: se comparte por WhatsApp, no debe indexarse ni salir en el sitemap.
export const metadata: Metadata = {
  title: "Cotiza tu tienda online — 1bite Studio",
  description: "Cuestionario rápido para cotizar tu tienda online.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://1bite.studio/cuestionarioecommerce" },
};

export default function CuestionarioEcommercePage() {
  return (
    <main className="min-h-screen bg-deep-code text-white">
      <CuestionarioForm
        preguntas={PREGUNTAS_ECOMMERCE}
        titulo="Cotiza tu tienda online"
        tipo="ecommerce"
        sub="13 bloques. Entre 4 y 6 minutos. Con esto cotizamos sin adivinar."
      />
    </main>
  );
}
