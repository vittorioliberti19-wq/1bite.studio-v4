import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import { posts, getPost } from "@/lib/blog";
import { WHATSAPP_URL } from "@/lib/content";
import { articleJsonLd, SITE } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.description,
      url: `${SITE}/blog/${p.slug}`,
      publishedTime: p.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const schema = articleJsonLd({
    title: p.title,
    description: p.description,
    slug: p.slug,
    date: p.date,
  });

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />

      <article className="mx-auto max-w-2xl px-6 pb-24 pt-36 md:pt-44">
        <Reveal>
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white"
          >
            ← Blog
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
            {p.dateLabel} · {p.readingMin} min de lectura
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            {p.title}
          </h1>
        </Reveal>

        <Reveal>
          <div className="mt-12 space-y-5 text-lg leading-relaxed text-white/80">
            {p.body.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2
                    key={i}
                    className="pt-6 text-2xl font-bold text-white md:text-3xl"
                  >
                    {b.text}
                  </h2>
                );
              if (b.type === "ul")
                return (
                  <ul key={i} className="space-y-2">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="gradient-text font-bold">→</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 rounded-2xl border border-white/10 p-8 text-center">
            <p className="text-xl font-bold md:text-2xl">
              ¿Hablamos de tu proyecto?
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              data-cursor
              className="mt-5 inline-block rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Comienza
            </a>
          </div>
        </Reveal>
      </article>

      <Footer />
    </main>
  );
}
