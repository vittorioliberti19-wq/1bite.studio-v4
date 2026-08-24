export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string; // ISO
  dateLabel: string;
  readingMin: number;
  body: Block[];
  /** slugs de servicios a los que enlaza el post, con anchor descriptivo */
  servicios?: { slug: string; anchor: string }[];
};

export const posts: Post[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web-en-venezuela",
    title: "¿Cuánto cuesta una página web en Venezuela en 2026?",
    metaTitle: "¿Cuánto cuesta una página web en Venezuela en 2026?",
    description:
      "Te explicamos de qué depende el precio de una página web en Venezuela, los rangos reales según el tipo de sitio y cómo evitar pagar de más o de menos.",
    date: "2026-06-04",
    dateLabel: "4 de junio, 2026",
    readingMin: 5,
    servicios: [
      { slug: "paginas-web", anchor: "diseño de páginas web en Maracaibo" },
    ],
    body: [
      {
        type: "p",
        text: "Es la primera pregunta que nos hace casi todo el que escribe: ¿cuánto me cuesta una página web? Y la respuesta honesta es: depende. No es lo mismo una landing para una campaña que un sitio corporativo o una tienda con pagos. Acá te explicamos de qué depende el precio para que sepas qué estás pagando y por qué.",
      },
      { type: "h2", text: "De qué depende el precio" },
      {
        type: "p",
        text: "El costo de una web no se mide en cantidad de páginas, se mide en complejidad. Estos son los factores que más mueven la aguja:",
      },
      {
        type: "ul",
        items: [
          "El tipo de sitio: landing, sitio corporativo, blog o tienda en línea.",
          "Si es diseño a la medida o sobre una plantilla genérica.",
          "Funciones especiales: pagos, reservas, login de usuarios, integraciones.",
          "Si incluye creación de contenido y fotografía o tú lo aportas.",
          "El SEO técnico y la optimización de velocidad desde el día uno.",
        ],
      },
      { type: "h2", text: "Rangos reales por tipo de sitio" },
      {
        type: "p",
        text: "Una landing page de una sola sección, pensada para una campaña, es la opción más económica. Un sitio corporativo con varias páginas, blog y formularios sube de precio porque hay más diseño y más estructura. Una tienda en línea con pagos y manejo de inventario es la inversión más alta, porque es prácticamente un sistema. Lo importante: pide siempre una propuesta detallada, no un número suelto.",
      },
      { type: "h2", text: "Cuidado con lo barato (y con lo carísimo)" },
      {
        type: "p",
        text: "Una web de 50 dólares hecha en un fin de semana casi siempre sale cara: lenta, sin aparecer en Google y sin nadie que te responda cuando se cae. Del otro lado, pagar miles por funciones que no vas a usar tampoco tiene sentido. Lo correcto es invertir en lo que tu negocio realmente necesita hoy, sobre una base que pueda crecer mañana.",
      },
      { type: "h2", text: "Qué deberías exigir siempre" },
      {
        type: "ul",
        items: [
          "Diseño responsive que se vea bien en celular.",
          "Velocidad de carga optimizada.",
          "SEO técnico: sitemap, datos estructurados y etiquetas correctas.",
          "Que la web sea tuya, con acceso a tu dominio y tu hosting.",
        ],
      },
      {
        type: "p",
        text: "En 1bite diseñamos y programamos páginas web a la medida, optimizadas para Google desde el primer día y pensadas para vender. Si quieres una propuesta clara para tu caso, escríbenos y conversamos sin compromiso.",
      },
    ],
  },
  {
    slug: "branding-vs-logo",
    title:
      "Branding vs. logo: por qué tu marca necesita más que un diseño bonito",
    metaTitle: "Branding vs. logo: la diferencia que cambia tu negocio",
    description:
      "Un logo no es una marca. Te explicamos la diferencia entre logo y branding y por qué confundirlos te hace perder clientes y dinero.",
    date: "2026-06-04",
    dateLabel: "4 de junio, 2026",
    readingMin: 4,
    servicios: [
      { slug: "branding", anchor: "branding e identidad de marca en Maracaibo" },
    ],
    body: [
      {
        type: "p",
        text: "Mucha gente nos pide “un logo” cuando en realidad lo que necesita es una marca. Y no es lo mismo. Confundir las dos cosas es una de las razones más comunes por las que un negocio bueno se ve mediocre y termina compitiendo por precio. Vamos a aclararlo.",
      },
      { type: "h2", text: "Qué es un logo" },
      {
        type: "p",
        text: "El logo es un símbolo: el dibujo y el nombre con el que te identifican. Es importante, sí, pero es solo una pieza. Por sí solo, un logo no dice cómo hablas, qué prometes ni por qué deberían elegirte a ti. Un logo bonito sobre un negocio sin estrategia sigue siendo un negocio sin estrategia.",
      },
      { type: "h2", text: "Qué es el branding" },
      {
        type: "p",
        text: "El branding es todo el sistema: la estrategia, la personalidad, los colores, las tipografías, el tono con el que escribes, cómo te ves en redes y cómo te ves en la calle. Es la sensación que deja tu marca cada vez que alguien la toca. El logo vive dentro del branding, no al revés.",
      },
      { type: "h2", text: "Por qué importa para tu bolsillo" },
      {
        type: "ul",
        items: [
          "Una marca coherente sube el valor percibido: puedes cobrar más.",
          "Te reconocen sin tener que leer el nombre, y eso vende.",
          "Tu equipo deja de improvisar: todos comunican igual.",
          "Construyes confianza, y la confianza es lo que cierra ventas.",
        ],
      },
      {
        type: "h2",
        text: "La señal de que necesitas branding, no solo un logo",
      },
      {
        type: "p",
        text: "Si cada diseño tuyo se ve distinto, si no sabes explicar en una frase qué te hace diferente, o si compites solo bajando el precio, no te falta un logo: te falta marca. Ahí es donde el branding cambia el juego.",
      },
      {
        type: "p",
        text: "En 1bite construimos marcas desde la estrategia, no desde el dibujo. Si sientes que tu negocio vale más de lo que aparenta, hablemos: te ayudamos a que tu imagen esté a la altura.",
      },
    ],
  },
  {
    slug: "como-elegir-agencia-de-marketing-en-maracaibo",
    title:
      "Cómo elegir una agencia de marketing en Maracaibo (sin equivocarte)",
    metaTitle: "Cómo elegir una agencia de marketing en Maracaibo",
    description:
      "Guía honesta para escoger agencia de marketing en Maracaibo: qué preguntar, qué señales de alerta mirar y cómo comparar propuestas antes de firmar.",
    date: "2026-06-11",
    dateLabel: "11 de junio, 2026",
    readingMin: 5,
    servicios: [
      { slug: "branding", anchor: "branding en Maracaibo" },
      { slug: "redes-sociales", anchor: "gestión de redes sociales" },
    ],
    body: [
      {
        type: "p",
        text: "En Maracaibo hay de todo: agencias con años de trayectoria, freelancers talentosos, y también gente que compró un celular con buena cámara la semana pasada y ya se llama agencia. El problema es que desde afuera todos se ven parecidos en Instagram. Esta guía es para que sepas qué mirar antes de entregarle tu marca (y tu plata) a alguien.",
      },
      { type: "h2", text: "Primero: define qué necesitas de verdad" },
      {
        type: "p",
        text: "No es lo mismo necesitar contenido para redes que necesitar una marca completa o una página web que venda. Muchos negocios contratan “manejo de redes” cuando su problema real es que no tienen identidad de marca, y ningún post bonito arregla eso. Antes de cotizar, ten claro tu objetivo: ¿vender más? ¿verte profesional? ¿lanzar algo nuevo?",
      },
      { type: "h2", text: "Qué preguntarle a cualquier agencia" },
      {
        type: "ul",
        items: [
          "Pide casos reales de clientes en Maracaibo o Venezuela, con resultados, no solo diseños bonitos.",
          "Pregunta quién va a producir tu contenido: ¿tienen equipo propio de foto y video o subcontratan?",
          "Pide la propuesta por escrito, con entregables y frecuencia claros.",
          "Pregunta qué pasa si quieres salirte: contratos eternos son una señal de alerta.",
          "Verifica que sus propias redes y su propia web estén al nivel que te prometen.",
        ],
      },
      { type: "h2", text: "Señales de alerta" },
      {
        type: "p",
        text: "Desconfía de quien te promete resultados garantizados en semanas, de quien cobra demasiado barato (alguien termina pagando esa diferencia, y sueles ser tú con calidad), y de quien no te hace preguntas sobre tu negocio antes de cotizar. Una agencia seria primero entiende, después propone.",
      },
      { type: "h2", text: "Local vs. remoto: ¿importa que sea de Maracaibo?" },
      {
        type: "p",
        text: "Para producción de contenido, sí: alguien tiene que ir a tu local, conocer tu producto y grabar. Una agencia con equipo en Maracaibo te resuelve eso sin logística complicada. Para web o branding puro, la distancia pesa menos, pero la cercanía sigue ayudando: las mejores marcas salen de conversaciones, no de formularios.",
      },
      {
        type: "p",
        text: "En 1bite llevamos desde 2016 construyendo marcas en Maracaibo, con más de 150 clientes y equipo propio de estrategia, producción audiovisual y desarrollo. Si estás comparando opciones, escríbenos: te damos una propuesta clara y tú decides.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-un-logo-en-venezuela",
    title:
      "¿Cuánto cuesta un logo en Venezuela en 2026? (y cuándo necesitas más que un logo)",
    metaTitle: "¿Cuánto cuesta un logo en Venezuela en 2026?",
    description:
      "Rangos reales de precio de un logo en Venezuela, por qué varían tanto, y cómo saber si lo que tu negocio necesita es un logo o una marca completa.",
    date: "2026-06-11",
    dateLabel: "11 de junio, 2026",
    readingMin: 4,
    servicios: [
      { slug: "branding", anchor: "branding e identidad de marca en Maracaibo" },
    ],
    body: [
      {
        type: "p",
        text: "“¿Cuánto me cobras por un logo?” es de las preguntas que más recibimos. Y la respuesta corta es: en Venezuela un logo puede costar desde 20 dólares hasta varios miles. La diferencia no es capricho, es qué estás comprando realmente. Acá te lo desglosamos para que compares con criterio.",
      },
      { type: "h2", text: "Por qué los precios varían tanto" },
      {
        type: "ul",
        items: [
          "Un logo de 20-50 dólares suele ser una plantilla adaptada o un diseño sin investigación: rápido, pero genérico.",
          "Un logo profesional (rango medio) incluye proceso: estudio de tu competencia, propuestas, revisiones y archivos finales en todos los formatos.",
          "Un sistema de identidad completo incluye además paleta, tipografías, usos correctos e incorrectos y manual de marca: lo que hace que tu negocio se vea coherente en todos lados.",
        ],
      },
      { type: "h2", text: "El error más caro: comprar el logo dos veces" },
      {
        type: "p",
        text: "Lo vemos constantemente: un negocio paga un logo barato para salir del paso, crece, y al año tiene que pagar un rebranding completo porque aquel logo no funciona en redes, no se lee pequeño, o se parece al de la competencia. Lo barato terminó costando el doble, más el costo invisible de un año viéndose amateur.",
      },
      { type: "h2", text: "¿Logo o branding? Cómo saber cuál necesitas" },
      {
        type: "p",
        text: "Si estás arrancando y solo necesitas identificarte, un buen logo con archivos correctos puede bastar. Pero si ya tienes un negocio andando, compites contra marcas establecidas o quieres cobrar más caro que el promedio, necesitas branding: el sistema completo que hace que te reconozcan y confíen en ti. Te lo explicamos a fondo en nuestro artículo de branding vs. logo.",
      },
      { type: "h2", text: "Qué exigir siempre, pagues lo que pagues" },
      {
        type: "ul",
        items: [
          "Archivos editables y en vectores (no solo un PNG).",
          "Versiones para fondo claro y oscuro.",
          "Cesión clara de los derechos del diseño.",
          "Al menos una ronda de revisiones incluida.",
        ],
      },
      {
        type: "p",
        text: "En 1bite diseñamos identidades de marca en Maracaibo desde 2016, desde la estrategia hasta el manual. Si quieres saber qué le conviene a tu negocio (y cuánto cuesta en tu caso), escríbenos y te orientamos sin compromiso.",
      },
    ],
  },
  {
    slug: "redes-sociales-para-negocios-en-maracaibo",
    title:
      "Redes sociales para negocios en Maracaibo: qué está funcionando en 2026",
    metaTitle: "Redes sociales para negocios en Maracaibo (2026)",
    description:
      "Qué tipo de contenido está vendiendo para negocios locales en Maracaibo en 2026, los errores más comunes y cuándo conviene delegar tus redes a una agencia.",
    date: "2026-06-11",
    dateLabel: "11 de junio, 2026",
    readingMin: 5,
    servicios: [
      { slug: "redes-sociales", anchor: "gestión de redes sociales para negocios" },
    ],
    body: [
      {
        type: "p",
        text: "En Maracaibo casi todo el mundo descubre negocios por Instagram y TikTok antes que por cualquier otro canal. Eso es una oportunidad enorme y a la vez una trampa: como todos publican, ya no basta con publicar. Esto es lo que estamos viendo que funciona (y lo que ya no) para negocios locales en 2026.",
      },
      { type: "h2", text: "Lo que ya no funciona" },
      {
        type: "ul",
        items: [
          "Publicar por publicar: el feed lleno de artes genéricos con frases motivacionales.",
          "Solo flyers de promociones: la gente sigue cuentas que le aportan, no catálogos.",
          "Comprar seguidores: los números inflados matan tu alcance real.",
          "Copiar el contenido de la competencia sin una voz propia.",
        ],
      },
      { type: "h2", text: "Lo que sí está vendiendo" },
      {
        type: "p",
        text: "Video corto y real: el detrás de cámara de tu negocio, el producto usándose, el equipo hablando como habla la gente de verdad. Las cuentas locales que más crecen en Maracaibo son las que se sienten cercanas y se ven profesionales al mismo tiempo. Esa combinación —cercanía con calidad de producción— es exactamente lo difícil de lograr solo con un celular y buenas intenciones.",
      },
      { type: "h2", text: "La frecuencia importa menos que la consistencia" },
      {
        type: "p",
        text: "Mejor tres publicaciones buenas por semana, todas las semanas, que diez una semana y silencio el mes siguiente. El algoritmo premia la constancia, y tu audiencia también: una cuenta abandonada transmite negocio abandonado.",
      },
      { type: "h2", text: "¿Cuándo conviene delegar a una agencia?" },
      {
        type: "ul",
        items: [
          "Cuando llevas meses publicando y no se traduce en clientes.",
          "Cuando no tienes tiempo: el dueño atendiendo el negocio Y las redes termina haciendo mal las dos cosas.",
          "Cuando tu marca se ve inconsistente: cada post parece de una empresa distinta.",
          "Cuando vas a lanzar algo y necesitas que salga bien a la primera.",
        ],
      },
      {
        type: "p",
        text: "En 1bite manejamos redes de negocios en Maracaibo con estrategia, producción audiovisual propia y un equipo que vive aquí y entiende cómo compra la gente aquí. Si quieres que tus redes vendan en serio, escríbenos y te armamos un plan.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-un-video-corporativo-en-maracaibo",
    title: "¿Cuánto cuesta un video corporativo en Maracaibo en 2026?",
    metaTitle: "Cuánto cuesta un video corporativo en Maracaibo 2026",
    description:
      "Precios reales de producción audiovisual en Maracaibo: qué factores mueven el costo de un video corporativo y cómo evitar pagar de más.",
    date: "2026-07-19",
    dateLabel: "19 de julio, 2026",
    readingMin: 5,
    servicios: [
      { slug: "produccion-audiovisual", anchor: "producción audiovisual en Maracaibo" },
    ],
    body: [
      {
        type: "p",
        text: "Si ya pediste cotizaciones para un video corporativo en Maracaibo, seguro notaste algo raro: un freelancer te dice 80 dólares y una productora te dice 1200. Ninguno miente, pero casi ninguno te explica por qué. Este artículo te da los rangos reales del mercado venezolano y los factores que realmente mueven el precio.",
      },
      {
        type: "h2",
        text: "Rangos de mercado en Venezuela",
      },
      {
        type: "p",
        text: "Para un video corporativo institucional o promocional de 1 a 3 minutos, con guion, grabación de un día y edición profesional, el mercado venezolano se mueve entre 150 y 600 dólares. Producciones más elaboradas —con actores, locaciones múltiples, dron, animación o varios días de rodaje— suben de 700 a 2000 dólares o más. Un video de testimoniales simples o entrevista a cámara fija puede quedar en 80-150 dólares si el cliente ya tiene guion y no necesita locación adicional. Estos números varían según si contratas freelancer, estudio pequeño o productora con equipo completo.",
      },
      {
        type: "h2",
        text: "Qué mueve el precio de verdad",
      },
      {
        type: "ul",
        items: [
          "Días de rodaje: cada día extra de locación, equipo y talento suma directamente al costo total.",
          "Guion y pre-producción: un video improvisado sale barato pero se nota; guion trabajado con storyboard cuesta más pero rinde mejor.",
          "Equipo usado: cámara de celular bien iluminada no es lo mismo que cámara cinema con lentes, gimbal y dron.",
          "Edición y post-producción: color grading, motion graphics, animación 2D/3D y sonido diseñado suben el precio proporcional a las horas de edición.",
          "Talento en cámara: actores o presentadores profesionales agregan honorarios aparte de la producción.",
          "Uso y distribución: un video solo para redes cuesta menos que uno pensado para pauta paga o para TV, porque cambian los formatos y entregables.",
        ],
      },
      {
        type: "h2",
        text: "Freelancer vs. productora vs. agencia",
      },
      {
        type: "p",
        text: "El freelancer suele ser la opción más económica: una sola persona graba, edita y a veces también dirige. Funciona bien para videos simples, testimoniales o contenido de redes sociales. El límite aparece cuando necesitas dirección de arte, guion trabajado o coordinación de varias personas en set — ahí un freelancer solo se satura y la calidad cae. La productora dedicada da equipo completo (director, camarógrafo, editor) y mejor control de calidad, pero cobra acorde. La agencia creativa como 1bite entra en un punto intermedio: coordina la producción audiovisual dentro de una estrategia de marca más amplia, así el video no queda suelto sino conectado con tu identidad visual y tus redes.",
      },
      {
        type: "h2",
        text: "Errores comunes al presupuestar un video",
      },
      {
        type: "ul",
        items: [
          "No pedir guion antes de grabar: sin guion se graba de más, se edita de más y el resultado se siente disperso.",
          "Comparar cotizaciones sin comparar entregables: un precio bajo puede no incluir corrección de color, música con licencia o formatos verticales para redes.",
          "Subestimar el tiempo de edición: un video de 1 minuto bien editado puede tomar más horas de post-producción que de rodaje.",
          "No preguntar por derechos de uso: música, stock footage y voces en off a veces tienen licencias limitadas que encarecen el uso comercial extendido.",
          "Grabar sin pensar en el destino final: un video para Instagram Reels necesita otro encuadre y ritmo que uno para la web corporativa.",
        ],
      },
      {
        type: "h2",
        text: "Cómo saber si el precio que te dieron es justo",
      },
      {
        type: "p",
        text: "Pide siempre desglose: cuántos días de rodaje, qué equipo se usa, cuántas rondas de corrección incluye la edición y en qué formatos entregan el video final (horizontal, vertical, con o sin subtítulos). Si dos cotizaciones difieren mucho, casi siempre es porque una incluye pre-producción seria y la otra no. También pregunta si el precio incluye los derechos de la música y si puedes reutilizar el material en distintas plataformas sin costo adicional.",
      },
      {
        type: "p",
        text: "Si estás por producir tu primer video corporativo o quieres uno que realmente conecte con tu marca y no quede como un video más, escríbele a 1bite — coordinamos la producción audiovisual completa, desde el guion hasta la edición final.",
      },
    ],
  },
    {
    "slug": "cuanto-cuesta-una-app-movil-en-venezuela",
    "title": "¿Cuánto cuesta una app móvil en Venezuela en 2026?",
    "metaTitle": "Cuánto cuesta una app móvil en Venezuela 2026",
    "description": "Precios reales de desarrollo de apps móviles en Venezuela: rangos por tipo de app, factores que suben el costo y cómo evitar sobrepagar.",
    "date": "2026-08-24",
    "dateLabel": "24 de agosto, 2026",
    "readingMin": 6,
    "body": [
      {
        "type": "p",
        "text": "Si estás cotizando una app móvil en Venezuela, seguro ya notaste algo raro: unos te cobran 800 dólares, otros 15,000, y ninguno explica por qué. La diferencia no es magia, es alcance. Aquí te desglosamos qué determina el precio real de una app en el mercado venezolano de 2026."
      },
      {
        "type": "h2",
        "text": "Rangos de precio según tipo de app"
      },
      {
        "type": "ul",
        "items": [
          "App simple (catálogo, portafolio, informativa sin backend complejo): USD 1,500 – 4,000",
          "App con backend propio (login, base de datos, notificaciones push): USD 4,000 – 10,000",
          "App tipo marketplace o delivery (pagos, geolocalización, múltiples roles de usuario): USD 10,000 – 25,000+",
          "App enterprise o con integraciones complejas (ERP, IA, múltiples plataformas de pago): desde USD 20,000 en adelante"
        ]
      },
      {
        "type": "p",
        "text": "Estos rangos son de mercado general en Latinoamérica ajustado a Venezuela, donde los costos de desarrollo suelen ser más bajos que en EE.UU. o Europa pero el nivel de calidad varía muchísimo entre proveedores."
      },
      {
        "type": "h2",
        "text": "Qué factores mueven el precio de verdad"
      },
      {
        "type": "ul",
        "items": [
          "Nativa vs multiplataforma: React Native o Flutter (una sola app para iOS y Android) suele costar menos que desarrollar nativo por separado en Swift y Kotlin.",
          "Backend y base de datos: si la app necesita guardar usuarios, pedidos o inventario en tiempo real, el backend puede costar tanto como el frontend.",
          "Integraciones de pago: Zelle, PayPal, pasarelas locales o criptomonedas cada una suma trabajo de desarrollo y pruebas.",
          "Publicación en tiendas: cuenta de desarrollador de Apple (pago anual) y Google Play (pago único), más el proceso de revisión que puede tardar semanas.",
          "Mantenimiento post-lanzamiento: actualizaciones de sistema operativo, corrección de bugs y nuevas funciones no están incluidas en el desarrollo inicial salvo que lo acuerdes."
        ]
      },
      {
        "type": "h2",
        "text": "Errores comunes al cotizar una app en Venezuela"
      },
      {
        "type": "p",
        "text": "El más caro es no tener un alcance definido antes de pedir cotización: si le pides precio a tres desarrolladores sin un documento de funcionalidades, cada uno asume cosas distintas y las cifras no son comparables. Otro error es elegir al más barato sin revisar apps que ya haya publicado — hay muchos freelancers cobrando poco que entregan apps sin pruebas, que se caen con la primera actualización de iOS o Android. También pasa mucho que el cliente no presupuesta el mantenimiento: una app que nadie actualiza deja de funcionar en 12 a 18 meses cuando Apple o Google cambian sus requisitos."
      },
      {
        "type": "h2",
        "text": "MVP vs app completa: por dónde empezar"
      },
      {
        "type": "p",
        "text": "Si es tu primera app, no arranques con todas las funciones que imaginaste. Un MVP (producto mínimo viable) con lo esencial te permite validar que la gente realmente la usa antes de invertir en funciones avanzadas. Esto reduce el costo inicial y te da datos reales para decidir qué construir después, en vez de adivinar."
      },
      {
        "type": "h2",
        "text": "Cómo elegir con quién trabajar"
      },
      {
        "type": "ul",
        "items": [
          "Pide ver apps publicadas de verdad en App Store o Play Store, no solo mockups en Figma",
          "Pregunta quién queda con el código fuente y las cuentas de desarrollador al terminar",
          "Confirma si el precio incluye publicación en tiendas o es un costo aparte",
          "Verifica que tengan experiencia con el tipo específico de app que necesitas (no es lo mismo un catálogo que un marketplace con pagos)"
        ]
      },
      {
        "type": "p",
        "text": "En 1bite Studio desarrollamos apps móviles a la medida del negocio, desde el MVP hasta la publicación en las tiendas. Si tienes una idea y quieres saber qué alcance tiene sentido para tu presupuesto, escríbenos y lo revisamos juntos."
      }
    ]
  },
  // __CRON_BLOG_INSERT__ — el cron de macgia (~/blog-1bite) inserta posts nuevos
  // encima de esta línea. No borrar ni mover este marcador.
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
