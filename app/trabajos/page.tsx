import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import WorkCard from "@/components/cards/WorkCard";
import Reveal from "@/components/ui/Reveal";
import { trabajos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trabajos",
  description:
    "Proyectos destacados de 1bite Studio: branding, redes sociales, páginas web, apps y producción audiovisual para marcas en Maracaibo y Venezuela.",
  alternates: { canonical: "/trabajos" },
  openGraph: {
    title: "Trabajos · 1bite",
    description: "Proyectos destacados de 1bite Studio.",
    url: "https://1bite.studio/trabajos",
  },
};

export default function Trabajos() {
  return (
    <main className="flex-1">
      <Nav />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:pt-44">
        <Reveal>
          <h1 className="mb-12 text-5xl font-bold md:text-7xl">Trabajos</h1>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {trabajos.map((t, i) => (
            <Link
              key={t.id}
              href="/galeria"
              className={i % 2 === 1 ? "block md:mt-16" : "block"}
            >
              <WorkCard marca={t.marca} tipo={t.tipo} img={t.img} />
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
