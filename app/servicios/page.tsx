import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import { servicios } from "@/lib/servicios";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios — Agencia creativa en Maracaibo",
  description:
    "Branding, redes sociales, páginas web, desarrollo de apps, sistemas a la medida y producción audiovisual. Todo lo que tu marca necesita, en un solo lugar.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios · 1bite",
    description:
      "Branding, redes sociales, web, apps, sistemas y audiovisual para empresas en Venezuela.",
    url: `${SITE}/servicios`,
  },
};

export default function ServiciosIndex() {
  return (
    <main className="flex-1">
      <Nav />
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-36 md:pt-44">
        <Reveal>
          <h1 className="text-5xl font-bold md:text-7xl">Servicios</h1>
          <p className="mt-6 max-w-2xl text-xl text-white/70">
            Cinco departamentos, un solo sistema para hacer crecer tu marca.
            Desde la identidad hasta el software que opera tu negocio.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {servicios.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="group block bg-black p-8 transition hover:bg-white/[0.03]"
            >
              <h2 className="text-2xl font-bold group-hover:gradient-text">
                {s.nombre}
              </h2>
              <p className="mt-3 text-white/60">{s.lead}</p>
              <span className="mt-4 inline-block text-sm text-white/40 group-hover:text-white">
                Ver más →
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
