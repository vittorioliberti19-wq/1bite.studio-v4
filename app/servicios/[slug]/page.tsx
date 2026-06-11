import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import { servicios, getServicio } from "@/lib/servicios";
import { WHATSAPP_URL } from "@/lib/content";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, SITE } from "@/lib/seo";

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicio(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/servicios/${s.slug}` },
    openGraph: {
      title: `${s.nombre} · 1bite`,
      description: s.metaDescription,
      url: `${SITE}/servicios/${s.slug}`,
    },
  };
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getServicio(slug);
  if (!s) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      serviceJsonLd({
        name: s.metaTitle,
        description: s.metaDescription,
        slug: s.slug,
      }),
      faqJsonLd(s.faqs),
      breadcrumbJsonLd([
        { name: "Inicio", url: SITE },
        { name: "Servicios", url: `${SITE}/servicios` },
        { name: s.nombre, url: `${SITE}/servicios/${s.slug}` },
      ]),
    ],
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">
            Servicios · {s.nombre}
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {s.h1}
          </h1>
          <p className="mt-6 text-xl text-white/70 md:text-2xl">{s.lead}</p>
        </Reveal>

        <Reveal>
          <div className="mt-12 space-y-5 text-lg leading-relaxed text-white/80">
            {s.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-16 mb-6 text-2xl font-bold md:text-3xl">
            Qué incluye
          </h2>
          <ul className="space-y-3">
            {s.incluye.map((it, i) => (
              <li key={i} className="flex gap-3 text-white/80">
                <span className="gradient-text font-bold">→</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="mt-16 mb-6 text-2xl font-bold md:text-3xl">
            Lo que ganas
          </h2>
          <ul className="space-y-3">
            {s.resultados.map((r, i) => (
              <li key={i} className="flex gap-3 text-white/80">
                <span className="gradient-text font-bold">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="mt-16 mb-6 text-2xl font-bold md:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {s.faqs.map((f, i) => (
              <div key={i}>
                <h3 className="font-semibold text-white">{f.q}</h3>
                <p className="mt-2 text-white/70">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 rounded-2xl border border-white/10 p-8 text-center">
            <p className="text-2xl font-bold md:text-3xl">
              ¿Listo para tu proyecto de {s.nombre.toLowerCase()}?
            </p>
            <p className="mt-3 text-white/60">
              Cuéntanos qué necesitas. Te respondemos por WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              data-cursor
              className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Comienza
            </a>
          </div>
        </Reveal>

        <Reveal>
          <nav className="mt-16 border-t border-white/10 pt-8">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
              Otros servicios
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/70">
              {servicios
                .filter((o) => o.slug !== s.slug)
                .map((o) => (
                  <Link
                    key={o.slug}
                    href={`/servicios/${o.slug}`}
                    className="hover:text-white"
                  >
                    {o.nombre}
                  </Link>
                ))}
            </div>
          </nav>
        </Reveal>
      </article>

      <Footer />
    </main>
  );
}
