// Structured data (JSON-LD) — clave para SEO clásico y para búsqueda con IA
// (ChatGPT, Perplexity, Claude, Google AI Overviews leen este schema).
export const SITE = "https://1bite.studio";
const ORG_ID = `${SITE}/#organization`;

const services = [
  "Branding e identidad de marca",
  "Manejo de redes sociales",
  "Diseño y desarrollo de páginas web",
  "Desarrollo de aplicaciones móviles y web",
  "Desarrollo de sistemas operativos a la medida",
  "Producción audiovisual",
];

export const organizationJsonLd = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "1bite Studio",
  alternateName: "1bite",
  url: SITE,
  logo: `${SITE}/logos/1bite-white.png`,
  image: `${SITE}/opengraph-image`,
  slogan: "Concebimos experiencias indelebles",
  description:
    "Agencia creativa en Maracaibo: branding, redes sociales, páginas web, apps, sistemas operativos y producción audiovisual.",
  foundingDate: "2016",
  knowsLanguage: ["es", "en"],
  priceRange: "$$",
  telephone: "+17869063354",
  areaServed: [
    { "@type": "City", name: "Maracaibo" },
    { "@type": "Country", name: "Venezuela" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Maracaibo",
    addressRegion: "Zulia",
    addressCountry: "VE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 10.6427, longitude: -71.6125 },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "ventas",
    telephone: "+17869063354",
    availableLanguage: ["es", "en"],
    areaServed: "VE",
  },
  sameAs: ["https://www.instagram.com/1bite.studio"],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s },
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios 1bite",
    itemListElement: services.map((s) => ({
      "@type": "OfferCatalog",
      name: s,
    })),
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationJsonLd,
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "1bite Studio",
      inLanguage: "es",
      publisher: { "@id": ORG_ID },
    },
  ],
};

// Helpers de schema por página -----------------------------------------------

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    url: `${SITE}/servicios/${opts.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Maracaibo" },
      { "@type": "Country", name: "Venezuela" },
    ],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    inLanguage: "es",
    url: `${SITE}/blog/${opts.slug}`,
    image: `${SITE}/opengraph-image`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
