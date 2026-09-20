import type { NextConfig } from "next";
import path from "node:path";

// 'unsafe-eval' solo en dev (HMR de Turbopack lo necesita); prod va sin eval
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // 'unsafe-inline': scripts inline de Next + JSON-LD; sin nonce hasta migrar a middleware
  // challenges.cloudflare.com: Turnstile (captcha forms contacto/vacantes)
  // Google Ads base tag: https://developers.google.com/tag-platform/security/guides/csp
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://challenges.cloudflare.com https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net`,
  "frame-src https://challenges.cloudflare.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src https://www.google-analytics.com https://region1.google-analytics.com 'self' data: blob: https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.google.co.ve",
  "font-src 'self' data:",
  "media-src 'self'",
  // supabase: forms de contacto/vacantes; vitals: Speed Insights
  "connect-src https://www.google-analytics.com https://region1.google-analytics.com 'self' https://atxmxihxboswsewdbdgz.supabase.co https://vitals.vercel-insights.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.google.co.ve https://ad.doubleclick.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // sin upgrade-insecure-requests: HSTS ya fuerza https en prod y la directiva
  // rompe WebKit/Safari en http://localhost (sube recursos a https → TLS error)
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    // www → apex: evita contenido duplicado en Google (GSC 2026-07-18)
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.1bite.studio" }],
        destination: "https://1bite.studio/:path*",
        permanent: true,
      },
      { source: "/opengraph-image", destination: "/opengraph-image.png", permanent: true },
      // URLs del sitio viejo indexadas en Google (404 en GSC)
      {
        source: "/nuestros-proyectos",
        destination: "/galeria",
        permanent: true,
      },
      {
        source: "/1bitecircle",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cv",
        destination: "/oportunidades",
        permanent: true,
      },
      {
        source: "/hagamos-realidad-tus-ideas",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
