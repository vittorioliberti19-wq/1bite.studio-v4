import type { Metadata } from "next";
import CuestionarioForm from "@/components/sections/CuestionarioForm";
import { PREGUNTAS_ISP } from "@/lib/cuestionarios";

// Ruta oculta: se comparte por WhatsApp, no debe indexarse ni salir en el sitemap.
export const metadata: Metadata = {
  title: "Plataforma digital para tu operadora — 1bite Studio",
  description:
    "Cuestionario para cotizar la plataforma digital de un operador de internet y televisión.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://1bite.studio/cuestionarioisp" },
};

export default function CuestionarioIspPage() {
  return (
    <main className="min-h-screen bg-deep-code text-white">
      <CuestionarioForm
        preguntas={PREGUNTAS_ISP}
        titulo="Tu plataforma digital"
        tipo="isp"
        sub="13 bloques. Entre 5 y 8 minutos. Para operadores de internet y televisión."
        contactoTitulo="¿Con quién coordinamos?"
        cta="Enviar y recibir propuesta"
        okTexto="Tenemos tu brief. Lo revisamos, armamos la propuesta por fases y te escribimos. Si el proyecto lo amerita, te proponemos una llamada de 30 minutos primero."
      />
    </main>
  );
}
