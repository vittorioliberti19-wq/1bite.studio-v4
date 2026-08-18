import type { Metadata } from "next";
import CuestionarioForm from "@/components/sections/CuestionarioForm";
import { PREGUNTAS_APP } from "@/lib/cuestionarios";

// Ruta oculta, igual que /cuestionarioweb: se manda por WhatsApp al prospecto.
export const metadata: Metadata = {
  title: "Cotiza tu app — 1bite Studio",
  description: "Cuestionario rápido para cotizar tu app o sistema a la medida.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://1bite.studio/cuestionarioapp" },
};

export default function CuestionarioAppPage() {
  return (
    <main className="min-h-screen bg-deep-code text-white">
      <CuestionarioForm
        preguntas={PREGUNTAS_APP}
        titulo="Cotiza tu app"
        tipo="app"
      />
    </main>
  );
}
