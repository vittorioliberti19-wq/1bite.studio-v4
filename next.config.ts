import type { NextConfig } from "next";
import path from "node:path";

// 'unsafe-eval' solo en dev (HMR de Turbopack lo necesita); prod va sin eval
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // 'unsafe-inline': scripts inline de Next + JSON-LD; sin nonce hasta migrar a middleware
  // challenges.cloudflare.com: Turnstile (captcha forms contacto/vacantes)
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://challenges.cloudflare.com`,
  "frame-src https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  // unsplash: placeholders de la categoría Fotos en /galeria
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self' data:",
  "media-src 'self'",
  // supabase: forms de contacto/vacantes; vitals: Speed Insights
  "connect-src 'self' https://atxmxihxboswsewdbdgz.supabase.co https://vitals.vercel-insights.com",
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
      // URLs del sitio viejo indexadas en Google (404 en GSC)
      {
        source: "/nuestros-proyectos",
        destination: "/trabajos",
        permanent: true,
      },
      {
        source: "/1bitecircle",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cv",
        destination: "/",
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
