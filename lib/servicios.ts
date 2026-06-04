export type Servicio = {
  slug: string;
  nombre: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  intro: string[];
  incluye: string[];
  resultados: string[];
  faqs: { q: string; a: string }[];
};

export const servicios: Servicio[] = [
  {
    slug: "branding",
    nombre: "Branding",
    metaTitle: "Branding e identidad de marca en Maracaibo",
    metaDescription:
      "Creamos marcas con estrategia, no solo logos bonitos. Identidad visual, personalidad verbal y manual de marca para empresas en Maracaibo y toda Venezuela.",
    h1: "Branding que tu negocio recuerda y tu cliente reconoce",
    lead: "Una marca no es un logo. Es la razón por la que te eligen a ti y no al de al lado.",
    intro: [
      "En 1bite construimos marcas desde la estrategia. Antes de dibujar una sola línea, entendemos qué vendes, a quién le hablas y qué te hace distinto. De ahí sale una identidad que se sostiene en el tiempo, no una moda que caduca en seis meses.",
      "Trabajamos con negocios de Maracaibo y de toda Venezuela que están arrancando, que quieren reposicionarse o que crecieron más rápido que su imagen. El resultado es un sistema de marca completo y coherente, listo para usar en redes, en la calle y en cualquier punto de contacto con tu cliente.",
    ],
    incluye: [
      "Estrategia de marca: propósito, posicionamiento y diferenciador",
      "Logotipo y sistema visual (colores, tipografías, texturas)",
      "Personalidad verbal: cómo habla tu marca",
      "Papelería y aplicaciones físicas",
      "Manual de marca con reglas claras de uso",
    ],
    resultados: [
      "Te reconocen de un vistazo, sin tener que leer el nombre",
      "Dejas de improvisar: todo tu equipo usa la misma imagen",
      "Subes el valor percibido y puedes cobrar lo que vales",
    ],
    faqs: [
      {
        q: "¿Cuánto tarda un proyecto de branding?",
        a: "Un manual de identidad esencial toma entre 2 y 3 semanas; un sistema de marca completo, entre 4 y 6 semanas, dependiendo de la complejidad y los tiempos de aprobación de tu lado.",
      },
      {
        q: "¿La diferencia entre un logo y branding?",
        a: "El logo es una pieza. El branding es todo el sistema: cómo se ve, cómo habla y cómo se siente tu marca en cada contacto con el cliente. Un logo sin estrategia detrás no construye marca.",
      },
      {
        q: "¿Trabajan con negocios fuera de Maracaibo?",
        a: "Sí. Atendemos clientes en toda Venezuela y en el exterior de forma remota, con reuniones y entregas digitales.",
      },
    ],
  },
  {
    slug: "redes-sociales",
    nombre: "Redes Sociales",
    metaTitle: "Manejo de redes sociales y community manager en Maracaibo",
    metaDescription:
      "Manejo profesional de redes sociales en Maracaibo: estrategia, contenido, producción audiovisual y campañas en Instagram, Facebook y Google que venden.",
    h1: "Redes sociales que venden, no que solo se ven bonitas",
    lead: "Tu marca no necesita otro post. Necesita contenido con estrategia que te traiga clientes.",
    intro: [
      "Manejamos las redes de tu negocio como un canal de venta, no como un álbum de fotos. Cada publicación tiene una razón de ser: atraer, convencer o cerrar. Detrás hay un plan de contenido, producción audiovisual propia y análisis de lo que funciona.",
      "Somos un equipo completo: estrategia, diseño, fotografía, video y pauta. No dependes de un solo freelance que un día desaparece. Producimos desde Maracaibo con estándar profesional y mantenemos tu presencia activa y consistente todos los meses.",
    ],
    incluye: [
      "Plan de contenido mensual alineado a tus objetivos",
      "Publicaciones, reels e historias diseñadas",
      "Producción audiovisual profesional (incluye drone)",
      "Gestión de comunidad y respuestas",
      "Campañas pagadas en Instagram, Facebook y Google",
    ],
    resultados: [
      "Presencia constante sin que tengas que estar encima",
      "Contenido que genera mensajes y ventas, no solo likes",
      "Reportes claros de qué está funcionando y qué no",
    ],
    faqs: [
      {
        q: "¿Qué incluye un plan de redes sociales?",
        a: "Estrategia, calendario de contenido, diseño de publicaciones y reels, producción audiovisual, gestión de comunidad y, según el plan, campañas pagadas. Tenemos planes Élite y Enterprise según el nivel de inversión.",
      },
      {
        q: "¿Producen el contenido o yo les paso el material?",
        a: "Producimos todo. Contamos con equipo de fotografía y video propio, además del estudio The Studio 4 para sesiones. Tú apruebas; nosotros ejecutamos.",
      },
      {
        q: "¿Manejan la pauta publicitaria?",
        a: "Sí. Configuramos y optimizamos campañas en Instagram, Facebook y Google para que cada dólar invertido traiga resultados medibles.",
      },
    ],
  },
  {
    slug: "paginas-web",
    nombre: "Páginas Web",
    metaTitle: "Diseño y desarrollo de páginas web en Maracaibo, Venezuela",
    metaDescription:
      "Diseñamos y programamos páginas web rápidas, optimizadas para Google y pensadas para vender. Sitios corporativos, landing pages y tiendas para empresas en Venezuela.",
    h1: "Páginas web que cargan rápido, salen en Google y venden",
    lead: "Tu web es tu vendedor que trabaja 24/7. Que esté a la altura.",
    intro: [
      "Diseñamos y programamos sitios web a la medida: desde una landing page para una campaña hasta un sitio corporativo completo. No usamos plantillas genéricas; cada proyecto se construye sobre tu marca y tus objetivos de negocio.",
      "Optimizamos cada sitio para velocidad y para buscadores, porque una web bonita que nadie encuentra no sirve de nada. Trabajamos el SEO técnico desde el primer día y dejamos tu sitio listo para aparecer en Google y para ser citado por buscadores con inteligencia artificial.",
    ],
    incluye: [
      "Diseño UX/UI a la medida de tu marca",
      "Desarrollo rápido y optimizado (Next.js / web moderna)",
      "SEO técnico: sitemap, datos estructurados, velocidad",
      "Diseño responsive para celular, tablet y desktop",
      "Integraciones: WhatsApp, formularios, pagos, analítica",
    ],
    resultados: [
      "Apareces en Google cuando tu cliente te busca",
      "Carga en segundos, incluso desde el celular",
      "Conviertes visitas en mensajes y ventas reales",
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta una página web?",
        a: "Depende del alcance: una landing page es más económica que un sitio corporativo o una tienda. Te pasamos una propuesta clara según lo que necesitas, sin costos sorpresa.",
      },
      {
        q: "¿La página queda optimizada para Google?",
        a: "Sí. Entregamos cada sitio con SEO técnico: sitemap, datos estructurados, etiquetas correctas y velocidad optimizada, listo para indexarse y posicionar.",
      },
      {
        q: "¿Puedo editar la web yo mismo después?",
        a: "Según el proyecto, dejamos paneles de edición o nos encargamos del mantenimiento. Lo definimos contigo antes de arrancar.",
      },
    ],
  },
  {
    slug: "desarrollo-apps",
    nombre: "Apps",
    metaTitle: "Desarrollo de aplicaciones móviles y web en Venezuela",
    metaDescription:
      "Desarrollamos apps móviles y web a la medida: productos digitales, automatizaciones y herramientas internas para empresas en Maracaibo y Venezuela.",
    h1: "Apps y productos digitales a la medida de tu negocio",
    lead: "Cuando una plantilla no alcanza, te construimos la herramienta exacta que necesitas.",
    intro: [
      "Desarrollamos aplicaciones móviles y web a la medida: desde el producto digital con el que vas a salir al mercado hasta la herramienta interna que le ahorra horas a tu equipo. Pensamos primero en el problema que resuelve y después en la tecnología.",
      "Trabajamos con stacks modernos y escalables, así tu app crece contigo sin tener que reescribirla en un año. Integramos pagos, automatizaciones y todo lo que tu operación necesite para funcionar sola.",
    ],
    incluye: [
      "Apps móviles (iOS y Android) y aplicaciones web",
      "Automatizaciones que eliminan trabajo manual",
      "Integración con pagos, WhatsApp y servicios externos",
      "Diseño de producto y experiencia de usuario",
      "Mantenimiento y evolución continua",
    ],
    resultados: [
      "Automatizas procesos que hoy te quitan tiempo",
      "Ofreces a tus clientes una experiencia propia",
      "Tienes una herramienta que crece con tu negocio",
    ],
    faqs: [
      {
        q: "¿Hacen apps para iOS y Android?",
        a: "Sí, desarrollamos para ambas plataformas y también aplicaciones web que funcionan desde cualquier navegador, según lo que mejor sirva a tu proyecto.",
      },
      {
        q: "¿Cuánto tarda desarrollar una app?",
        a: "Depende del alcance. Un producto mínimo viable puede estar listo en pocas semanas; un sistema completo toma más. Te damos un cronograma claro tras entender lo que necesitas.",
      },
    ],
  },
  {
    slug: "sistemas",
    nombre: "Sistemas",
    metaTitle: "Desarrollo de sistemas y software a la medida en Venezuela",
    metaDescription:
      "Construimos sistemas operativos internos, ERP y software a la medida para gestionar tu empresa: inventario, ventas, finanzas y operaciones, en Venezuela.",
    h1: "Sistemas a la medida para operar tu empresa sin caos",
    lead: "Deja las hojas de cálculo regadas. Te construimos el sistema que tu operación necesita.",
    intro: [
      "Desarrollamos sistemas operativos internos y software a la medida para empresas que crecieron y ya no caben en una hoja de cálculo. Inventario, ventas, caja, finanzas, nómina, clientes: todo en un solo lugar, conectado y bajo control.",
      "No vendemos un sistema enlatado que toca forzar a tu negocio. Estudiamos cómo trabajas y construimos la herramienta alrededor de tu operación real, multi-sucursal y multi-usuario si hace falta. El resultado es menos errores, menos tiempo perdido y decisiones con datos de verdad.",
    ],
    incluye: [
      "Sistemas de inventario, ventas y punto de venta",
      "Control de caja, finanzas y reportes en tiempo real",
      "Gestión de clientes (CRM) y nómina",
      "Acceso multi-usuario con permisos por rol",
      "Despliegue en la nube, accesible desde cualquier parte",
    ],
    resultados: [
      "Toda tu operación en un solo lugar, no en diez archivos",
      "Reportes al instante para decidir con datos",
      "Menos errores manuales y menos fraude interno",
    ],
    faqs: [
      {
        q: "¿Qué es un sistema a la medida?",
        a: "Es software construido específicamente para tu forma de trabajar, en lugar de un programa genérico al que tienes que adaptarte. Se ajusta a tus procesos, no al revés.",
      },
      {
        q: "¿Sirve para un negocio con varias sucursales?",
        a: "Sí. Diseñamos sistemas multi-sucursal y multi-usuario, con permisos por rol y datos consolidados, para que veas todo el negocio desde un mismo panel.",
      },
    ],
  },
  {
    slug: "produccion-audiovisual",
    nombre: "Audiovisual",
    metaTitle: "Producción audiovisual y fotografía profesional en Maracaibo",
    metaDescription:
      "Producción audiovisual en Maracaibo: video corporativo, fotografía de producto, reels y cobertura de eventos con equipo profesional y uso de drone.",
    h1: "Producción audiovisual que cuenta tu historia y vende tu producto",
    lead: "Las imágenes con las que muestras tu negocio dicen más de ti que cualquier discurso.",
    intro: [
      "Producimos video y fotografía profesional para marcas que quieren verse a la altura de lo que ofrecen. Desde un reel para redes hasta un video corporativo, fotografía de producto o cobertura de un evento, cuidamos cada detalle: luz, dirección, edición y sonido.",
      "Contamos con equipo profesional, uso de drone y el estudio The Studio 4 en Maracaibo para sesiones controladas. No improvisamos: cada producción nace de una idea con intención y termina en piezas listas para publicar y para vender.",
    ],
    incluye: [
      "Video corporativo, institucional y publicitario",
      "Reels y contenido vertical para redes",
      "Fotografía de producto y de marca",
      "Cobertura de eventos",
      "Tomas aéreas con drone y sesiones en estudio",
    ],
    resultados: [
      "Tu marca se ve profesional y confiable",
      "Contenido de calidad para alimentar tus redes",
      "Piezas que comunican valor, no solo que adornan",
    ],
    faqs: [
      {
        q: "¿Tienen estudio propio?",
        a: "Sí, trabajamos con The Studio 4 en Maracaibo para sesiones de foto y video en ambiente controlado, además de producción en locación.",
      },
      {
        q: "¿Hacen tomas con drone?",
        a: "Sí, incluimos tomas aéreas con drone cuando el proyecto lo amerita, para darle a tu contenido una dimensión que la cámara a nivel de piso no logra.",
      },
    ],
  },
];

export function getServicio(slug: string) {
  return servicios.find((s) => s.slug === slug);
}
