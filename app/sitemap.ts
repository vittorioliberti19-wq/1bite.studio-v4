import type { MetadataRoute } from "next";
import { servicios } from "@/lib/servicios";
import { posts } from "@/lib/blog";

const SITE = "https://1bite.studio";

// Fecha real del último cambio de contenido por ruta. NO usar `new Date()`:
// un timestamp de build idéntico en 12 URLs hace que Google descarte el lastmod
// como señal. Actualizar a mano cuando se edite el contenido de la ruta.
const ACTUALIZADO = {
  home: "2026-07-19",
  servicios: "2026-06-11",
  galeria: "2026-07-04",
} as const;

// El índice del blog se fecha con el post más reciente (el array no está ordenado).
const ultimoPost = posts.reduce(
  (max, p) => (p.date > max ? p.date : max),
  posts[0].date,
);

// /trabajos queda fuera del sitemap mientras esté en noindex (ver su page.tsx).
export default function sitemap(): MetadataRoute.Sitemap {
  const base: MetadataRoute.Sitemap = [
    {
      url: SITE,
      lastModified: new Date(ACTUALIZADO.home),
      images: [`${SITE}/opengraph-image`],
    },
    { url: `${SITE}/servicios`, lastModified: new Date(ACTUALIZADO.servicios) },
    {
      url: `${SITE}/galeria`,
      lastModified: new Date(ACTUALIZADO.galeria),
      images: [
        `${SITE}/galeria/branding/brand-01.webp`,
        `${SITE}/galeria/webs/web-01.webp`,
        `${SITE}/galeria/posters/reel-02.webp`,
      ],
    },
    { url: `${SITE}/blog`, lastModified: new Date(ultimoPost) },
  ];

  const serviceUrls: MetadataRoute.Sitemap = servicios.map((s) => ({
    url: `${SITE}/servicios/${s.slug}`,
    lastModified: new Date(ACTUALIZADO.servicios),
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...base, ...serviceUrls, ...postUrls];
}
