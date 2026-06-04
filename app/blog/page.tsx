import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import { posts } from "@/lib/blog";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Marketing, branding y web para tu negocio",
  description:
    "Ideas claras sobre branding, redes sociales, páginas web y crecimiento de marca para empresas en Venezuela. Sin tecnicismos, al grano.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · 1bite",
    description:
      "Ideas claras sobre branding, redes, web y crecimiento de marca en Venezuela.",
    url: `${SITE}/blog`,
  },
};

export default function BlogIndex() {
  return (
    <main className="flex-1">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44">
        <Reveal>
          <h1 className="text-5xl font-bold md:text-7xl">Blog</h1>
          <p className="mt-6 text-xl text-white/70">
            Ideas claras sobre marca, contenido y negocio. Sin relleno.
          </p>
        </Reveal>

        <div className="mt-16 space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block bg-black p-8 transition hover:bg-white/[0.03]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                {p.dateLabel} · {p.readingMin} min
              </p>
              <h2 className="mt-3 text-2xl font-bold group-hover:gradient-text">
                {p.title}
              </h2>
              <p className="mt-3 text-white/60">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
