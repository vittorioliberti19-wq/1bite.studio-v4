import type { Metadata } from "next";
import Oportunidades from "@/components/sections/Oportunidades";

export const metadata: Metadata = {
  title: "Trabaja con nosotros — Oportunidades en 1bite Studio",
  description:
    "Únete al equipo de 1bite Studio. Buscamos community managers, diseñadores, directores de arte, audiovisuales, editores, copywriters y más. Deja tu CV y portafolio.",
  alternates: { canonical: "https://1bite.studio/oportunidades" },
  openGraph: {
    title: "Trabaja con nosotros — 1bite Studio",
    description:
      "Deja tu CV y portafolio. Te contactamos cuando abra una vacante que encaje con tu perfil.",
    url: "https://1bite.studio/oportunidades",
    type: "website",
  },
};

export default function OportunidadesPage() {
  return (
    <main className="min-h-screen bg-deep-code text-white">
      <Oportunidades />
    </main>
  );
}
