import type { MetadataRoute } from "next";

// Permite a todos los crawlers, incluyendo bots de IA (búsqueda generativa).
const AI_BOTS = [
  "GPTBot", // OpenAI / ChatGPT
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User",
  "ClaudeBot", // Anthropic / Claude
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "Bingbot",
  "Amazonbot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/cuestionarioweb"] },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/cuestionarioweb"],
      })),
    ],
    sitemap: "https://1bite.studio/sitemap.xml",
    host: "https://1bite.studio",
  };
}
