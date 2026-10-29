import type { Metadata } from "next";
import Link from "next/link";
import CuestionarioForm from "@/components/sections/CuestionarioForm";
import { PREGUNTAS_METRO_RENT } from "@/lib/cuestionario-metro-rent";

export const metadata: Metadata = {
  title: "Metro Rent · Define tu plataforma inmobiliaria",
  description: "Cuestionario de 1bite para definir la web de Metro Rent y presupuestar reservas y aplicación móvil por fases.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://1bite.studio/metro-rent" },
};

const accesos = [
  ["01", "Negocio"], ["08", "Usuarios"], ["19", "Búsqueda y contactos"],
  ["27", "Dominio y correo"], ["29", "Estadías cortas"], ["33", "App móvil"], ["35", "Prioridades"],
];

export default function MetroRentPage() {
  return <main className="min-h-screen bg-deep-code text-white">
    <CuestionarioForm
      preguntas={PREGUNTAS_METRO_RENT}
      titulo="Metro Rent"
      tipo="web"
      empresaInicial="Metro Rent"
      proyecto="Metro Rent · Plataforma inmobiliaria · Brief v1"
      draftKey="1bite:metro-rent:brief:v1"
      sub="Definamos la plataforma que tu negocio necesita. 35 temas + tus datos. Puedes responder por partes y escribir «por definir» donde necesites asesoría."
      introduccion={<>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#08e1f4]/25 bg-[#08e1f4]/[0.04] p-5"><p className="text-xs uppercase tracking-[0.16em] text-[#08e1f4]">Fase 1 · Web</p><p className="mt-2 text-base font-medium">Tu catálogo inmobiliario</p><p className="mt-2 text-sm leading-relaxed text-white/65">Publicación autoadministrable de inmuebles en venta y alquiler de larga duración.</p></div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5"><p className="text-xs uppercase tracking-[0.16em] text-white/70">Fase 2 · A cotizar aparte</p><p className="mt-2 text-base font-medium">Reservas y app móvil</p><p className="mt-2 text-sm leading-relaxed text-white/65">Estadías cortas en inmuebles amoblados y aplicación para iPhone y Android, como módulos separados.</p></div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-white/65">Elige una opción cuando corresponda, marca varias funciones si las necesitas y explica los detalles en los campos de texto. Estas respuestas nos ayudan a cotizar; no contratan funciones ni servicios.</p>
        <nav aria-label="Temas del cuestionario" className="mt-5 flex flex-wrap gap-2">{accesos.map(([n, label]) => <a key={n} href={`#tema-${n}`} className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/75 transition hover:border-[#08e1f4]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#08e1f4]">{label}</a>)}</nav>
      </>}
      contactoTitulo="¿Con quién coordinamos la propuesta de Metro Rent?"
      cta="Enviar respuestas de Metro Rent"
      notaFinal={<>
        Usaremos tus respuestas para preparar el alcance y presupuesto por fases. El borrador se guarda solo en este navegador; no incluye un envío a 1bite hasta que confirmes aquí.
        <br />No compartas contraseñas, códigos de acceso ni documentos personales.
        <br /><Link href="/privacidad" className="underline underline-offset-4">Política de privacidad</Link>
      </>}
      okTitulo="Recibimos las respuestas de Metro Rent."
      okTexto="El equipo de 1bite revisará el alcance de la web, las prioridades y los módulos futuros para preparar la propuesta. Te contactaremos por los datos que compartiste."
    />
  </main>;
}
