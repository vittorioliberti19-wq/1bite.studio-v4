// Contacto — todos los CTA "Comienza" abren WhatsApp.
export const WHATSAPP_URL =
  "https://wa.me/17869063354?text=" +
  encodeURIComponent("Hola 1bite, quiero empezar un proyecto.");

export const depts = [
  {
    id: "branding",
    title: "Branding",
    desc: "Sistemas de marca estratégicos, memorables y coherentes.",
  },
  {
    id: "social",
    title: "Social",
    desc: "Contenido que vende. Producción profesional + estrategia.",
  },
  {
    id: "web",
    title: "Web",
    desc: "Sitios y experiencias digitales de alto impacto.",
  },
  {
    id: "apps",
    title: "Apps",
    desc: "Productos y automatizaciones a la medida.",
  },
  {
    id: "audiovisual",
    title: "Audiovisual",
    desc: "Video, fotografía y producción que cuenta tu historia.",
  },
] as const;

export type Plan = {
  id: string;
  cat: string;
  name: string;
  tagline: string;
  features: string[];
  destacado?: boolean;
};

export const planes: Plan[] = [
  {
    id: "elite",
    cat: "Social Media",
    name: "Plan Élite",
    tagline: "Para negocios listos a invertir en alto impacto.",
    features: [
      "8 publicaciones + 8 reels al mes",
      "30 historias diseñadas + 60 orgánicas",
      "Producción audiovisual + uso de drone",
      "4h de estudio en The Studio 4",
      "WhatsApp Business + campañas IG / FB / Google",
    ],
  },
  {
    id: "enterprise",
    cat: "Social Media",
    name: "Plan Enterprise",
    tagline: "Estrategia profunda + automatización avanzada.",
    destacado: true,
    features: [
      "Todo lo del Plan Élite",
      "10–12 reels al mes + 8h de estudio",
      "Plan de Mercadeo 360 trimestral",
      "Automatización con ManyChat",
      "8 diseños de material POP al mes",
    ],
  },
  {
    id: "esencial",
    cat: "Branding",
    name: "Tier Esencial",
    tagline: "Manual de identidad corporativa.",
    features: [
      "Identidad visual base + logo (3 propuestas)",
      "Personalidad de marca",
      "Papelería corporativa",
      "Aplicaciones físicas",
      "Manual de comunicaciones",
    ],
  },
  {
    id: "estrategico",
    cat: "Branding",
    name: "Tier Estratégico",
    tagline: "Sistema de marca completo en 5 bloques.",
    destacado: true,
    features: [
      "Fundamentos estratégicos",
      "Personalidad verbal",
      "Sistema visual completo (WCAG AA)",
      "Aplicaciones digitales + físicas",
      "Gobernanza de marca",
    ],
  },
];

export type Trabajo = { id: string; marca: string; tipo: string; img: string };

export const trabajos: Trabajo[] = [
  {
    id: "maraplus",
    marca: "MaraPlus",
    tipo: "Social Media",
    img: "/fondos/fondo-2.webp",
  },
  {
    id: "lapiu",
    marca: "La Piu",
    tipo: "Branding + Social",
    img: "/fondos/fondo-3.webp",
  },
  {
    id: "ciao",
    marca: "Ciao",
    tipo: "Producción + Social",
    img: "/fondos/fondo-4.webp",
  },
];

export const proceso = [
  { n: "01", t: "Moodboard", d: "Propuesta inicial de cómo se verá tu marca." },
  {
    n: "02",
    t: "Producción",
    d: "Equipos de producción audiovisual + contenido orgánico.",
  },
  { n: "03", t: "Entrega", d: "Sistema entregado con presentación ejecutiva." },
] as const;

// 153 logos de clientes (recoloreados a blanco, en /public/logos/clientes)
export const clientes: string[] = Array.from(
  { length: 153 },
  (_, i) => `/logos/clientes/${String(i + 1).padStart(3, "0")}.webp`,
);
