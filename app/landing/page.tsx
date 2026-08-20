import type { Metadata } from "next";
import CuestionarioForm from "@/components/sections/CuestionarioForm";
import { PREGUNTAS_LANDING } from "@/lib/cuestionarios";

// Ruta oculta: se le pasa al cliente que ya compró el Paquete 1 (Landing Page).
// No se indexa ni sale en el sitemap.
export const metadata: Metadata = {
  title: "Brief de tu landing — 1bite Studio",
  description: "Formulario de arranque para tu landing page.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://1bite.studio/landing" },
};

export default function LandingBriefPage() {
  return (
    <main className="min-h-screen bg-deep-code text-white">
      <CuestionarioForm
        preguntas={PREGUNTAS_LANDING}
        titulo="Brief de tu landing"
        tipo="landing"
        sub="10 bloques. Entre 5 y 8 minutos. Con esto arrancamos el diseño."
        contactoTitulo="¿Con quién coordinamos el proyecto?"
        cta="Enviar el brief"
        okTitulo="Brief recibido."
        okTexto="Con esto arrancamos. Si falta material (textos, fotos o el logo en vectorial) te escribimos por WhatsApp para pedírtelo. La entrega es de 10 a 14 días continuos desde que esté todo completo."
        notaFinal={
          <>
            El paquete incluye 1 página con hasta 8 secciones, 1 idioma, formulario
            de hasta 6 campos, hasta 4 mockups y 2 rondas de revisión.
            <br />
            No incluye: dominio anual, redacción de textos, sesión fotográfica ni
            mantenimiento.
          </>
        }
      />
    </main>
  );
}
