// Contacto — todos los CTA "Comienza" abren WhatsApp.
export const waUrl = (mensaje: string) =>
  "https://wa.me/17869063354?text=" + encodeURIComponent(mensaje);

export const WHATSAPP_URL = waUrl("Hola 1bite, quiero empezar un proyecto.");

export type Dept = {
  id: string;
  title: string;
  desc: string;
  /** fondos del card; con varias hace slideshow */
  images: string[];
  /** video de fondo del card (gana sobre images) */
  video?: string;
  poster?: string;
};

export const depts: Dept[] = [
  {
    id: "branding",
    title: "Branding",
    desc: "Sistemas de marca estratégicos, memorables y coherentes.",
    images: [
      "/galeria/branding/brand-130.webp",
      "/galeria/branding/brand-131.webp",
    ],
  },
  {
    id: "social",
    title: "Social",
    desc: "Contenido que vende. Producción profesional + estrategia.",
    images: [],
    video: "/galeria/reels/reel-04.mp4",
    poster: "/galeria/posters/reel-04.webp",
  },
  {
    id: "web",
    title: "Web",
    desc: "Sitios y experiencias digitales de alto impacto.",
    images: [
      "/galeria/webs/web-27.webp",
      "/galeria/webs/web-28.webp",
      "/galeria/webs/web-29.webp",
      "/galeria/webs/web-30.webp",
      "/galeria/webs/web-31.webp",
    ],
  },
  {
    id: "apps",
    title: "Apps",
    desc: "Productos y automatizaciones a la medida.",
    images: ["/galeria/webs/web-32.webp"],
  },
  {
    id: "audiovisual",
    title: "Audiovisual",
    desc: "Video, fotografía y producción que cuenta tu historia.",
    images: [],
    video: "/galeria/reels/reel-06.mp4",
    poster: "/galeria/posters/reel-06.webp",
  },
];

export type Plan = {
  id: string;
  cat: string;
  /** grupo del selector de Planes (tab) */
  grupo: "social" | "branding" | "gastro" | "web" | "logo";
  name: string;
  tagline: string;
  features: string[];
  destacado?: boolean;
  /** chip promocional (sin montos ni %) */
  badge?: string;
};

export const grupoPlanes: { value: Plan["grupo"]; label: string }[] = [
  { value: "social", label: "Social Media" },
  { value: "branding", label: "Branding" },
  { value: "gastro", label: "Gastro" },
  { value: "web", label: "Web" },
  { value: "logo", label: "Logo" },
];

export const planes: Plan[] = [
  {
    id: "elite",
    cat: "Social Media",
    grupo: "social",
    name: "Plan Élite",
    tagline: "Para negocios listos a invertir en alto impacto.",
    badge: "Descuento con suscripción · pregúntanos",
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
    grupo: "social",
    name: "Plan Enterprise",
    tagline: "Estrategia profunda + automatización avanzada.",
    destacado: true,
    badge: "Descuento con suscripción · pregúntanos",
    features: [
      "Todo lo del Plan Élite",
      "10–12 reels al mes + 8h en The Studio 4",
      "Plan de Mercadeo 360 trimestral",
      "Automatización con ManyChat",
      "8 diseños de material POP al mes",
    ],
  },
  {
    id: "esencial",
    cat: "Branding",
    grupo: "branding",
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
    grupo: "branding",
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
  {
    id: "gastro-esencial",
    cat: "Branding Gastro",
    grupo: "gastro",
    name: "Gastro Esencial",
    tagline: "La identidad completa para abrir tu restaurante.",
    features: [
      "Identidad de marca + concepto gastronómico",
      "Logotipo, paleta y tipografías",
      "Menú principal + carta de bebidas + versión QR",
      "Fachada, uniforme y señalética básica",
      "6 plantillas de Instagram + 4 highlight covers",
    ],
  },
  {
    id: "gastro-premium",
    cat: "Branding Gastro",
    grupo: "gastro",
    name: "Gastro Premium",
    tagline: "Para abrir posicionado: sala + delivery + Instagram.",
    destacado: true,
    features: [
      "Todo lo del Gastro Esencial",
      "Dirección fotográfica de platos completa",
      "Menú completo: delivery, especiales y carta de vinos",
      "Empaque de delivery: bolsa, sticker y tarjeta",
      "12 plantillas IG + Stories + Google My Business",
      "Manual de uso y calendario de publicaciones",
    ],
  },
  {
    id: "web-landing",
    cat: "Web",
    grupo: "web",
    name: "Landing Page",
    tagline: "Una sola página, un solo objetivo.",
    features: [
      "Hasta 8 secciones con scroll vertical",
      "Formulario de contacto + SEO técnico básico",
      "Performance Lighthouse 90+ y responsive",
      "Deploy con SSL incluido",
      "El código fuente es tuyo (repositorio Git)",
    ],
  },
  {
    id: "web-corporativo",
    cat: "Web",
    grupo: "web",
    name: "Sitio Corporativo",
    tagline: "Presencia institucional con múltiples secciones.",
    destacado: true,
    features: [
      "Hasta 6 páginas: home, nosotros, servicios, casos, blog y contacto",
      "SEO completo + Google Analytics + Search Console",
      "CMS ligero opcional para editar tu blog",
      "Sistema de componentes a tu marca",
      "Deploy con SSL + código fuente tuyo",
    ],
  },
  {
    id: "web-ecommerce",
    cat: "Web",
    grupo: "web",
    name: "E-commerce",
    tagline: "Tienda online con carrito y proceso de compra.",
    features: [
      "Catálogo con filtros + hasta 40 productos cargados",
      "Checkout por WhatsApp o con pasarela de pago",
      "Inventario básico + SEO de producto (schema.org)",
      "Emails de confirmación automáticos (pasarela)",
      "Deploy con SSL + código fuente tuyo",
    ],
  },
  {
    id: "logo",
    cat: "Identidad",
    grupo: "logo",
    name: "Logo",
    tagline: "¿Solo necesitas el logo? Empieza por aquí.",
    features: [
      "3 propuestas de logotipo",
      "Versión final en todos los formatos",
      "Tarjetas de presentación",
      "Pieza publicitaria adicional (valla, volante…)",
      "Entrega en 10 días",
    ],
  },
  {
    id: "logo-naming",
    cat: "Identidad",
    grupo: "logo",
    name: "Logo + Naming",
    tagline: "Aún no tienes nombre: lo creamos contigo.",
    destacado: true,
    features: [
      "Naming estratégico + validación conceptual",
      "3 propuestas de logotipo",
      "Versión final en todos los formatos",
      "Tarjetas de presentación + pieza publicitaria",
      "Entrega en 10 días",
    ],
  },
];

/** Ventajas diferenciales (asesoría de mercadeo 2026-07) */
export type Ventaja = {
  id: string;
  title: string;
  desc: string;
  icon: "app" | "studio" | "gear" | "shield";
  /** link externo opcional (ej. The Studio 4) */
  href?: string;
  /** logo opcional dentro del card */
  logo?: string;
};

export const ventajas: Ventaja[] = [
  {
    id: "app",
    title: "App propia",
    desc: "Sigue tu proyecto desde tu teléfono: revisa avances, aprueba artes y descarga tus entregables en la app 1bite.",
    icon: "app",
    href: "https://apps.apple.com/us/app/1bite/id6782481903",
    logo: "/logos/app-store-badge.svg",
  },
  {
    id: "studio",
    title: "Estudio propio",
    desc: "The Studio 4: nuestro estudio de fotografía y producción audiovisual en Torre Delta, Bella Vista. Incluido en tus planes.",
    icon: "studio",
    href: "https://thestudio4.io",
    logo: "/logos/studio4-white.png",
  },
  {
    id: "gear",
    title: "Equipos propios",
    desc: "Cámaras, drone, iluminación y set propios. Producimos todo in-house, sin subcontratar ni depender de terceros.",
    icon: "gear",
  },
];

/** Testimonios reales (web 1bite anterior) */
export type Testimonio = {
  quote: string;
  nombre: string;
  cargo: string;
  avatar: string;
};

export const testimonios: Testimonio[] = [
  {
    quote:
      "En Innoven, donde la calidad y eficiencia son cruciales, 1bite Studio ha sido un aliado excepcional. Su habilidad para capturar nuestra esencia y comunicarla de forma efectiva ha sido clave para conectar con nuestros clientes.",
    nombre: "Raúl Farías",
    cargo: "Director, Innoven",
    avatar: "/testimonios/raul.webp",
  },
  {
    quote:
      "Trabajar con 1bite Studio es siempre una experiencia excepcional. Como especialista en marketing digital, valoro su creatividad, profesionalismo y atención al detalle. Su habilidad para convertir ideas en soluciones impactantes es notable.",
    nombre: "Zalo Kabche",
    cargo: "CEO, Digital Warriors",
    avatar: "/testimonios/zalo.webp",
  },
  {
    quote:
      "Trabajar con 1bite ha sido una experiencia increíble. Su equipo entiende cómo conectar con la audiencia de una manera auténtica y atractiva. ¡Altamente recomendados!",
    nombre: "Patricia Muñoz",
    cargo: "Gerente de Marketing, MaraPlus",
    avatar: "/testimonios/patricia.webp",
  },
];

/** Garantías de trabajo (de la metodología 1bite) */
export const garantias = [
  "2 rondas de corrección incluidas en todo servicio",
  "Presentación ejecutiva que sustenta cada decisión",
  "Si no cumple tus expectativas, devolvemos el 70%",
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

// 153 logos de clientes (recoloreados a blanco, en /public/logos/clientes).
// Los archivos vienen agrupados por marca (ej. Grupo Dar = 025-028), lo que
// los dejaba pegados en el marquee. Permutación determinista con stride 22
// (coprimo con 153) para dispersar las variantes de una misma marca.
const TOTAL_CLIENTES = 153;
// stride 149 (coprimo con 153, inverso 38) → variantes consecutivas de una
// marca caen en filas distintas del marquee (~38 posiciones de separación).
const STRIDE_CLIENTES = 149;
export const clientes: string[] = Array.from(
  { length: TOTAL_CLIENTES },
  (_, i) => {
    const n = ((i * STRIDE_CLIENTES) % TOTAL_CLIENTES) + 1;
    return `/logos/clientes/${String(n).padStart(3, "0")}.webp`;
  },
);
