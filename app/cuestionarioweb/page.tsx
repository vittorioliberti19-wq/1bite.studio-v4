import type { Metadata } from "next";
import CuestionarioForm from "@/components/sections/CuestionarioForm";
import { PREGUNTAS_WEB } from "@/lib/cuestionarios";

// Ruta oculta: se comparte por WhatsApp, no debe indexarse ni salir en el sitemap.
export const metadata: Metadata = {
  title: "Cotiza tu web — 1bite Studio",
  description: "Cuestionario rápido para cotizar tu proyecto web.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://1bite.studio/cuestionarioweb" },
};

export default function CuestionarioWebPage() {
  return (
    <main className="min-h-screen bg-deep-code text-white">
      <CuestionarioForm
        preguntas={PREGUNTAS_WEB}
        titulo="Cotiza tu web"
        tipo="web"
      />
    </main>
  );
}
