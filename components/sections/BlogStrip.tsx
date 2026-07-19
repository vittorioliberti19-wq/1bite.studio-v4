import Link from "next/link";
import { posts } from "@/lib/blog";
import Reveal from "@/components/ui/Reveal";

export default function BlogStrip() {
  const recientes = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Del blog
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Ideas que <span className="gradient-text">venden</span>
            </h2>
          </div>
          <Link
            data-cursor
            href="/blog"
            className="shrink-0 text-sm text-white/60 underline-offset-4 transition hover:text-white hover:underline"
          >
            Ver todos →
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {recientes.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1} className="h-full">
            <Link
              data-cursor
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-white/25"
            >
              <p className="text-xs text-white/45">
                {p.dateLabel} · {p.readingMin} min
              </p>
              <h3 className="mt-3 flex-1 text-lg font-bold leading-snug">
                {p.title}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm text-white/60">
                {p.description}
              </p>
              <p className="mt-5 text-xs text-white/50 group-hover:text-white">
                Leer artículo →
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
