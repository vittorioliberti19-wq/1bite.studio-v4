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
  modified?: string; // Fecha de revisión sustancial; conserva la publicación original
  dateLabel: string;
  readingMin: number;
  body: Block[];
  /** slugs de servicios a los que enlaza el post, con anchor descriptivo */
  servicios?: { slug: string; anchor: string }[];
};

export const posts: Post[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web-en-venezuela",
    modified: "2026-10-29",
    title: "¿Cuánto cuesta una página web en Venezuela en 2026?",
    metaTitle: "¿Cuánto cuesta una página web en Venezuela en 2026?",
    description:
      "Qué determina el costo de una página web en Venezuela: alcance, diseño, pagos, contenido y mantenimiento. Guía para comparar cotizaciones.",
    date: "2026-06-04",
    dateLabel: "4 de junio, 2026",
    readingMin: 5,
    servicios: [
      { slug: "paginas-web", anchor: "diseño de páginas web en Maracaibo" },
    ],
    body: [
      {
        type: "p",
        text: "No hay una tarifa universal para una página web. Una landing para una campaña, un sitio corporativo y una tienda con pagos parten de alcances distintos. Esta guía sirve para preparar una solicitud de propuesta y comparar lo que cada proveedor incluye; no reemplaza una cotización para tu proyecto.",
      },
      { type: "h2", text: "De qué depende el precio" },
      {
        type: "p",
        text: "Al comparar propuestas, la cantidad de páginas no basta para entender el alcance. Revisa estos factores junto con las condiciones de cada proveedor:",
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
      { type: "h2", text: "Cómo cambia el presupuesto según el tipo de sitio" },
      {
        type: "p",
        text: "Una landing para campaña, un sitio corporativo y una tienda con pagos requieren entregables diferentes. Para compararlos, pide una propuesta detallada: páginas y secciones, diseño, contenido, integraciones, pruebas, capacitación, soporte y costos recurrentes. Un número sin ese desglose no permite contrastar dos alcances.",
      },
      { type: "h2", text: "Cuidado con lo barato (y con lo carísimo)" },
      {
        type: "p",
        text: "El precio por sí solo no demuestra calidad. Compara el alcance, las pruebas, la propiedad del código y el soporte incluidos. Pide que separen la inversión inicial de dominio, alojamiento, servicios externos y mantenimiento, para conocer el costo de operar la web.",
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
    modified: "2026-10-29",
    title:
      "¿Cuánto cuesta un logo en Venezuela en 2026? (y cuándo necesitas más que un logo)",
    metaTitle: "¿Cuánto cuesta un logo en Venezuela en 2026?",
    description:
      "Cómo preparar una cotización de logo o identidad visual: alcance, entregables, derechos y revisiones para comparar propuestas sin asumir tarifas de mercado.",
    date: "2026-06-11",
    dateLabel: "11 de junio, 2026",
    readingMin: 4,
    servicios: [
      { slug: "branding", anchor: "branding e identidad de marca en Maracaibo" },
    ],
    body: [
      {
        type: "p",
        text: "No existe una tarifa universal para un logo en Venezuela. Antes de comparar propuestas, define si necesitas solo un identificador visual o una identidad con sistema, aplicaciones y guía de uso. Esta guía explica qué solicitar; no presenta rangos de mercado ni tarifas de 1bite.",
      },
      { type: "h2", text: "Por qué los precios varían tanto" },
      {
        type: "ul",
        items: [
          "Investigación, estrategia o revisión de referencias: confirma si están dentro del alcance.",
          "Propuestas y revisiones: acuerda cuántas incluye el proceso y cómo se aprueban.",
          "Entregables: especifica versiones del logo, archivos vectoriales, paleta, tipografías, aplicaciones y manual si lo necesitas.",
        ],
      },
      { type: "h2", text: "El error más caro: comprar el logo dos veces" },
      {
        type: "p",
        text: "El riesgo no es un precio bajo o alto por sí mismo, sino contratar sin definir usos y entregables. Antes de aprobar, revisa el logo en los tamaños y canales que realmente usarás, y deja por escrito qué sucede si se requieren ajustes fuera de las revisiones acordadas.",
      },
      { type: "h2", text: "¿Logo o branding? Cómo saber cuál necesitas" },
      {
        type: "p",
        text: "Un logo puede cubrir una necesidad puntual de identificación. Si también necesitas definir tono, jerarquías visuales, aplicaciones y reglas para que varias personas comuniquen de forma consistente, pide una propuesta de identidad o branding. La decisión depende de tus canales, equipo y objetivos; no de una tarifa genérica.",
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
        text: "En 1bite podemos revisar tu contexto y preparar una propuesta con alcance, entregables y condiciones. El precio se define según el alcance y las condiciones de tu proyecto.",
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
    modified: "2026-10-29",
    title: "¿Cuánto cuesta un video corporativo en Maracaibo en 2026?",
    metaTitle: "Cuánto cuesta un video corporativo en Maracaibo 2026",
    description:
      "Cómo cotizar un video corporativo en Maracaibo: guion, rodaje, edición, derechos de uso y entregables que debes comparar antes de contratar.",
    date: "2026-07-19",
    dateLabel: "19 de julio, 2026",
    readingMin: 5,
    servicios: [
      { slug: "produccion-audiovisual", anchor: "producción audiovisual en Maracaibo" },
    ],
    body: [
      {
        type: "p",
        text: "El costo de un video corporativo depende del alcance de producción. Para comparar propuestas en Maracaibo, solicita el mismo guion o brief, duración, jornadas de rodaje y formatos de entrega. Esta guía explica qué debe incluir una cotización; no presenta una tarifa universal ni un estudio de precios del mercado.",
      },
      {
        type: "h2",
        text: "Define el alcance antes de pedir precio",
      },
      {
        type: "p",
        text: "Una entrevista, un recorrido de instalaciones y una campaña con actores requieren equipos y tiempos distintos. Define duración final, cantidad de piezas, locaciones, jornadas, participantes y versiones verticales u horizontales. Solicita el desglose de preproducción, rodaje, edición, música y derechos de uso para comparar propuestas equivalentes.",
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
        text: "Un freelancer, una productora y una agencia pueden estructurar el trabajo de formas distintas. En vez de asumir qué modelo conviene por precio, compara quién responde por dirección, guion, rodaje, edición, coordinación, licencias y aprobaciones. Una agencia puede además coordinar el video con otros entregables de marca cuando ese sea el alcance contratado.",
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
        text: "Pide un desglose de jornadas, equipo, rondas de corrección y formatos de entrega (horizontal, vertical, con o sin subtítulos). Si dos propuestas difieren, revisa qué cubre cada una: preproducción, rodaje, edición, licencias y derechos de reutilización. Confirma por escrito las condiciones antes de decidir.",
      },
      {
        type: "p",
        text: "Si estás por producir tu primer video corporativo o quieres uno que realmente conecte con tu marca y no quede como un video más, escríbele a 1bite — coordinamos la producción audiovisual completa, desde el guion hasta la edición final.",
      },
    ],
  },
    {
    "slug": "cuanto-cuesta-una-app-movil-en-venezuela",
    modified: "2026-10-29",
    servicios: [{ slug: "desarrollo-apps", anchor: "Desarrollo de apps en Maracaibo" }],
    "title": "¿Cuánto cuesta una app móvil en Venezuela en 2026?",
    "metaTitle": "Cuánto cuesta una app móvil en Venezuela 2026",
    "description": "Guía para cotizar una app móvil en Venezuela: funcionalidades, integraciones, pruebas, publicación y mantenimiento que determinan el presupuesto.",
    "date": "2026-08-24",
    "dateLabel": "24 de agosto, 2026",
    "readingMin": 6,
    "body": [
      {
        "type": "p",
        "text": "Para cotizar una app móvil en Venezuela necesitas definir qué hará, quién la usará y con qué sistemas se conectará. Aquí explicamos cómo preparar ese alcance y comparar propuestas. El presupuesto se calcula por proyecto; estas orientaciones no representan un estudio de tarifas del mercado."
      },
      {
        "type": "h2",
        "text": "Alcance según el tipo de app"
      },
      {
        "type": "ul",
        "items": [
          "App informativa: define las pantallas, el contenido y si necesita funcionar sin conexión.",
          "App con cuentas de usuario: incluye autenticación, base de datos, permisos y notificaciones en el alcance.",
          "Marketplace o delivery: especifica pagos, geolocalización, roles, pedidos y panel de administración.",
          "App empresarial: documenta las integraciones con ERP, requisitos de seguridad, migraciones y soporte."
        ]
      },
      {
        "type": "p",
        "text": "Solicita una propuesta que separe diseño, desarrollo, pruebas, publicación y costos recurrentes. Compara también los criterios de aceptación, la propiedad del código y las condiciones de soporte."
      },
      {
        "type": "h2",
        "text": "Qué factores mueven el precio de verdad"
      },
      {
        "type": "ul",
        "items": [
          "Tecnología y plataformas: define si el alcance cubre iOS, Android o ambas, y cómo se mantendrá cada una.",
          "Backend y datos: documenta usuarios, permisos, información que se guardará, paneles e integraciones necesarias.",
          "Pagos e integraciones: identifica proveedores, flujos, pruebas y responsables antes de compararlos en una propuesta.",
          "Publicación: confirma cuentas, activos, requisitos de revisión y quién acompaña el proceso de tiendas.",
          "Soporte posterior: acuerda por separado el período, las correcciones, actualizaciones y funciones futuras."
        ]
      },
      {
        "type": "h2",
        "text": "Errores comunes al cotizar una app en Venezuela"
      },
      {
        "type": "p",
        "text": "Sin un documento de funcionalidades, cada proveedor asume algo distinto y las cotizaciones no son comparables. Revisa trabajos publicados, solicita pruebas y acuerda quién mantendrá la app. Los cambios de los sistemas operativos y de las tiendas pueden exigir actualizaciones; no hay un plazo universal en el que una app deje de funcionar."
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
    {
    "slug": "cuanto-cuesta-un-community-manager-en-maracaibo",
    "modified": "2026-10-29",
    "title": "¿Cuánto cuesta un community manager en Maracaibo en 2026?",
    "metaTitle": "Cuánto cuesta un community manager en Maracaibo",
    "description": "Qué hace un community manager y cómo solicitar una propuesta: comunidad, entregables, responsabilidades y límites frente a la gestión integral de una agencia.",
    "date": "2026-09-21",
    "dateLabel": "21 de septiembre, 2026",
    "readingMin": 5,
    "body": [
      {
        "type": "p",
        "text": "Un community manager y una gestión integral de redes no son lo mismo. Un community manager se enfoca en la comunidad y la operación diaria de los canales acordados; una agencia puede sumar estrategia, contenido, producción y coordinación de especialistas. El costo se define por alcance y condiciones, no por una tarifa universal de mercado."
      },
      {
        "type": "h2",
        "text": "Define el alcance del community manager"
      },
      {
        "type": "p",
        "text": "Antes de pedir una cotización, deja claro qué parte de la operación asumirá la persona y qué aportará tu equipo. Por ejemplo:"
      },
      {
        "type": "ul",
        "items": [
          "Canales, horario de atención, idioma y protocolo para comentarios, mensajes y situaciones sensibles.",
          "Volumen de publicaciones o programación que realmente quedará bajo su responsabilidad.",
          "Escalamiento de ventas, reclamos y preguntas técnicas: quién responde y en qué plazo.",
          "Reporte: métricas, período, responsables y decisiones que se tomarán con esa información."
        ]
      },
      {
        "type": "p",
        "text": "Pide el alcance por escrito y no compares montos sin comparar responsabilidades, disponibilidad y entregables. Esta página no publica rangos de mercado ni tarifas de 1bite."
      },
      {
        "type": "h2",
        "text": "Qué incluye (y qué no) el servicio de community manager"
      },
      {
        "type": "p",
        "text": "Aquí nace el 80 % de las confusiones. Un community manager en sentido estricto gestiona la comunidad: publica, responde mensajes y comentarios, y modera. Pero muchos negocios esperan además que haga cosas que son otros oficios:"
      },
      {
        "type": "ul",
        "items": [
          "Diseño gráfico de las piezas: confirma si está dentro del alcance o si lo aporta otro rol.",
          "Fotografía y video: especifica preproducción, sesión, edición y derechos de uso si los necesitas.",
          "Pauta publicitaria: separa presupuesto de medios, configuración y gestión; no los confundas con moderación de comunidad.",
          "Estrategia y análisis: define si el rol solo ejecuta un plan existente o también lo construye y revisa."
        ]
      },
      {
        "type": "p",
        "text": "Antes de comparar propuestas, solicita por escrito cantidad de publicaciones, canales, horario de atención, protocolo de respuestas, responsables de contenido y formato de reporte. Así comparas el mismo alcance, no etiquetas parecidas."
      },
      {
        "type": "h2",
        "text": "Freelance vs. agencia: cuándo conviene cada uno"
      },
      {
        "type": "p",
        "text": "Un profesional independiente puede encargarse del alcance acordado directamente. Antes de contratar, valida disponibilidad, sustitución, acceso a cuentas, proceso de aprobación y continuidad si la persona no puede atender."
      },
      {
        "type": "p",
        "text": "Una agencia puede coordinar community management con estrategia, diseño, producción o pauta cuando esos servicios estén especificados. Pide el organigrama de trabajo, el responsable de cada entregable y los límites de cada servicio; gestión de agencia no equivale automáticamente a solo community management."
      },
      {
        "type": "h2",
        "text": "Errores comunes al contratar"
      },
      {
        "type": "ul",
        "items": [
          "Elegir solo por precio, sin comparar el alcance y la capacidad de respuesta.",
          "No definir un objetivo y una métrica que permita revisarlo con el tiempo.",
          "No pedir reportes. Si nadie te muestra números, no sabes si la inversión funciona.",
          "Entregar las cuentas sin acceso propio. Tú debes ser siempre el administrador de tus perfiles, nunca el proveedor.",
          "No acordar período de revisión, condiciones de salida y entrega de activos al terminar."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo decidir cuánto invertir"
      },
      {
        "type": "p",
        "text": "Parte de un objetivo de negocio, el alcance necesario para operarlo y los recursos que tu equipo puede aportar. Luego solicita una propuesta que separe community management, contenido, producción y pauta si aplican. No hay una fórmula universal de inversión ni una promesa de resultados."
      },
      {
        "type": "p",
        "text": "Si necesitas una propuesta, 1bite puede documentar qué parte corresponde a community management y qué parte a gestión integral, con entregables y condiciones. El precio se define según las responsabilidades y los entregables acordados."
      }
    ]
  },
    {
    "slug": "cuanto-cuesta-gestion-de-redes-sociales-en-maracaibo",
    "modified": "2026-10-29",
    "title": "¿Cuánto cuesta la gestión de redes sociales en Maracaibo en 2026?",
    "metaTitle": "Gestión de redes sociales en Maracaibo: qué comparar",
    "description": "Cómo solicitar y comparar una propuesta de gestión de redes sociales: estrategia, contenido, producción, comunidad y pauta como alcances separados.",
    "date": "2026-10-19",
    "dateLabel": "19 de octubre, 2026",
    "readingMin": 6,
    "body": [
      {
        "type": "p",
        "text": "La gestión de redes sociales puede reunir estrategia, contenido, producción, community management y pauta, pero no son un paquete universal. Esta guía te ayuda a pedir una propuesta comparable según el alcance que necesitas; no presenta rangos de mercado ni tarifas de 1bite."
      },
      {
        "type": "h2",
        "text": "Qué cubre (y qué no) la gestión de redes sociales"
      },
      {
        "type": "p",
        "text": "Gestión de redes sociales no es solo publicar. La propuesta debe indicar cuáles de estos componentes incluye: estrategia de contenido, calendario editorial, diseño o edición, copy, programación, community management y reporte. La pauta y la producción audiovisual deben aparecer como alcances separados, con responsables y condiciones claras."
      },
      {
        "type": "ul",
        "items": [
          "Estrategia: objetivos, audiencias, pilares y proceso de aprobación.",
          "Contenido: piezas, formatos, copy, calendario, responsables y material que aporta cada parte.",
          "Comunidad: atención de comentarios y mensajes, horarios, respuestas aprobadas y escalamiento.",
          "Pauta y producción: presupuesto de medios, gestión, sesiones, edición, licencias y derechos de uso."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo comparar propuestas sin asumir tarifas"
      },
      {
        "type": "p",
        "text": "Solicita que cada propuesta enumere entregables, frecuencia, responsables, canales, procesos de aprobación y período. Después compárala con las mismas preguntas: qué se produce, quién atiende la comunidad, qué métricas se reportan y qué costos externos quedan fuera."
      },
      {
        "type": "p",
        "text": "Separa el presupuesto que se invierte en plataformas de la gestión de campañas y del contenido orgánico. Confirma titularidad de cuentas, acceso, objetivos, reportes y condiciones de facturación antes de contratar."
      },
      {
        "type": "h2",
        "text": "Qué mueve el precio hacia arriba o hacia abajo"
      },
      {
        "type": "ul",
        "items": [
          "Cantidad de piezas, formatos y canales incluidos.",
          "Origen del material: archivos del cliente, sesión de foto, video o producción adicional.",
          "Cobertura de community management: horarios, protocolos y escalamiento.",
          "Nivel de estrategia, análisis, aprobaciones y coordinación con otros proveedores.",
          "Pauta: objetivos, presupuesto de medios, configuración, optimización y reporte."
        ]
      },
      {
        "type": "h2",
        "text": "Errores comunes al contratar"
      },
      {
        "type": "p",
        "text": "Evita comparar solo por precio o por cantidad de publicaciones. Revisa derechos de uso y acceso a archivos, titularidad de cuentas, responsables de aprobación y qué ocurrirá con los activos si cambia el proveedor. Si falta una base de marca, indícalo para decidir si forma parte del alcance o si debe resolverse antes."
      },
      {
        "type": "p",
        "text": "En 1bite podemos preparar una propuesta que separe gestión de redes, community management, producción y pauta según el alcance solicitado. Cada propuesta detalla el alcance, los entregables y las condiciones del proyecto."
      }
    ]
  },
  // __CRON_BLOG_INSERT__ — el cron de macgia (~/blog-1bite) inserta posts nuevos
  // encima de esta línea. No borrar ni mover este marcador.
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
