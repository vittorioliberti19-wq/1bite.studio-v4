/**
 * Perfiles de talento de la agencia y sus herramientas.
 * Fuente única para /oportunidades. Debe coincidir con PUESTOS en la
 * Edge Function `vacante-submit` (app1bite) — si cambias uno, cambia el otro.
 */

export const PERFILES = [
  "Community manager",
  "Social media",
  "Diseñador gráfico",
  "Director de arte",
  "Audiovisual",
  "Editor de video",
  "Fotógrafo",
  "Content creator",
  "Copywriter",
  "Paid media / Ads",
  "Desarrollo web",
  "Administración / contabilidad",
  "Ventas",
  "Chofer / logística",
  "Otro",
] as const;

export type Perfil = (typeof PERFILES)[number];

export const MODALIDADES = ["Presencial", "Híbrido", "Remoto"] as const;

export const EXPERIENCIAS = [
  "Menos de 1 año",
  "1 a 3 años",
  "3 a 5 años",
  "Más de 5 años",
] as const;

export const DISPONIBILIDADES = [
  "Inmediata",
  "En 2 semanas",
  "En 1 mes",
  "A convenir",
] as const;

const GENERALES = ["Notion", "Trello / ClickUp", "Google Workspace", "Canva"];

/** Herramientas sugeridas por perfil. Se muestran al elegir el puesto. */
export const HERRAMIENTAS: Record<string, string[]> = {
  "Community manager": [
    "Meta Business Suite",
    "Metricool",
    "Hootsuite",
    "Canva",
    "CapCut",
    "Notion",
  ],
  "Social media": [
    "Meta Business Suite",
    "Metricool",
    "TikTok Studio",
    "Canva",
    "CapCut",
    "Figma",
  ],
  "Diseñador gráfico": [
    "Illustrator",
    "Photoshop",
    "InDesign",
    "Figma",
    "After Effects",
    "Canva",
  ],
  "Director de arte": [
    "Illustrator",
    "Photoshop",
    "Figma",
    "InDesign",
    "After Effects",
    "Midjourney / IA generativa",
  ],
  Audiovisual: [
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Cámara DSLR / mirrorless",
    "Iluminación",
    "Audio / micrófonos",
  ],
  "Editor de video": [
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "CapCut",
    "Final Cut Pro",
    "Motion graphics",
  ],
  Fotógrafo: [
    "Lightroom",
    "Photoshop",
    "Cámara DSLR / mirrorless",
    "Iluminación de estudio",
    "Retoque de producto",
  ],
  "Content creator": [
    "CapCut",
    "Guion / storytelling",
    "Cámara / celular",
    "Presentación en cámara",
    "Canva",
  ],
  Copywriter: [
    "SEO",
    "Guiones para video",
    "Email marketing",
    "Storytelling de marca",
    "IA (ChatGPT / Claude)",
  ],
  "Paid media / Ads": [
    "Meta Ads",
    "Google Ads",
    "TikTok Ads",
    "Google Analytics",
    "Píxel / eventos",
    "Looker Studio",
  ],
  "Desarrollo web": [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    "WordPress",
    "Shopify",
    "Supabase / SQL",
  ],
  "Administración / contabilidad": [
    "Excel / Sheets avanzado",
    "Facturación",
    "Cuentas por cobrar",
    "Nómina",
    "Software contable",
  ],
  Ventas: [
    "CRM",
    "Prospección en frío",
    "Cierre de ventas",
    "Presentaciones",
    "WhatsApp Business",
  ],
  "Chofer / logística": [
    "Licencia de conducir vigente",
    "Vehículo propio",
    "Moto propia",
    "Rutas de Maracaibo",
    "Manejo de inventario",
  ],
  Otro: GENERALES,
};
