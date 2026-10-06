import type { Metadata } from "next";
import Link from "next/link";
import CuestionarioForm from "@/components/sections/CuestionarioForm";
import { PREGUNTAS_MOVILIDAD } from "@/lib/cuestionario-movilidad";

export const metadata: Metadata = {
  title: "Tu app de movilidad — 1bite Studio",
  description: "Define con 1bite tu aplicación de transporte de pasajeros: operación, conductores, pagos y alcance de lanzamiento.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://1bite.studio/cuestionariomovilidad" },
};

export default function CuestionarioMovilidadPage() {
  return (
    <main className="min-h-screen bg-deep-code text-white">
      <CuestionarioForm
        preguntas={PREGUNTAS_MOVILIDAD}
        titulo="Tu app de movilidad"
        tipo="app"
        sub="Transporte de pasajeros, a tu medida. 16 temas + tus datos · Aproximadamente 15 minutos. Si algo no está definido, indícalo o déjalo en blanco."
        contactoTitulo="¿Con quién conversamos sobre el proyecto?"
        cta="Enviar mi proyecto de movilidad"
        notaFinal={
          <>
            Usaremos tus respuestas para evaluar el proyecto y contactarte.
            No compartas contraseñas ni documentos personales. Este formulario no contrata servicios.
            <br />
            <Link href="/privacidad" className="underline underline-offset-4">Política de privacidad</Link>
          </>
        }
        okTitulo="Recibimos tu proyecto de movilidad."
        okTexto="El equipo de 1bite revisará tus respuestas para definir contigo la primera versión, las fases y la propuesta. Te contactaremos por los datos que compartiste."
      />
    </main>
  );
}
