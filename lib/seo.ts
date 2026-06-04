// Structured data (JSON-LD) — clave para SEO clásico y para búsqueda con IA
// (ChatGPT, Perplexity, Claude, Google AI Overviews leen este schema).
const SITE = "https://1bite.studio";

const services = [
  "Branding e identidad de marca",
  "Manejo de redes sociales",
  "Diseño y desarrollo de páginas web",
  "Desarrollo de aplicaciones móviles y web",
  "Desarrollo de sistemas operativos a la medida",
  "Producción audiovisual",
];

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE}/#organization`,
      name: "1bite Studio",
      alternateName: "1bite",
      url: SITE,
      slogan: "Concebimos experiencias indelebles",
      description:
        "Agencia creativa en Maracaibo: branding, redes sociales, páginas web, apps, sistemas operativos y producción audiovisual.",
      foundingDate: "2016",
      knowsLanguage: ["es", "en"],
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
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "1bite Studio",
      inLanguage: "es",
      publisher: { "@id": `${SITE}/#organization` },
    },
  ],
};
