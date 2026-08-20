/* Definición declarativa de los cuestionarios de calificación de leads.
   La UI vive en components/sections/CuestionarioForm.tsx: acá solo el contenido. */

export type Campo =
  // `label` rotula el grupo cuando un bloque tiene dos listas seguidas y una
  // pegada a la otra se leería como continuación de la anterior.
  | { t: "radio" | "check"; name: string; label?: string; opciones: { v: string; l: string; d?: string }[] }
  | { t: "text"; name: string; ph: string; tipo?: string }
  | { t: "area"; name: string; ph: string };

export type Pregunta = { n: string; titulo: string; sub?: string; campos: Campo[] };

export const PREGUNTAS_WEB: Pregunta[] = [
  {
    n: "01",
    titulo: "¿Qué vendes y a quién?",
    sub: "En una línea, como se lo dirías a un amigo.",
    campos: [
      { t: "area", name: "Que vende", ph: "Ej: repuestos industriales a empresas petroleras del Zulia" },
    ],
  },
  {
    n: "02",
    titulo: "¿Qué necesitas que haga la web?",
    sub: "Marca todo lo que aplique.",
    campos: [
      {
        t: "check",
        name: "Objetivo",
        opciones: [
          { v: "Vender productos online", l: "Vender productos online", d: "catálogo, carrito, pedidos" },
          { v: "Que me contacten / pidan cotizacion", l: "Que me contacten o pidan cotización" },
          { v: "Presencia institucional", l: "Presencia institucional, verse serio" },
          { v: "Mostrar portafolio o trabajos", l: "Mostrar portafolio o trabajos" },
          { v: "Agendar citas o reservas", l: "Agendar citas o reservas" },
          { v: "Un sistema interno", l: "Un sistema interno", d: "manejar clientes, pedidos, datos" },
        ],
      },
    ],
  },
  {
    n: "03",
    titulo: "¿Es web nueva o ya tienes una?",
    campos: [
      {
        t: "radio",
        name: "Nueva o rediseno",
        opciones: [
          { v: "Nueva, desde cero", l: "Nueva, desde cero" },
          { v: "Ya tengo, quiero rehacerla", l: "Ya tengo, quiero rehacerla" },
          { v: "Ya tengo, solo mejoras", l: "Ya tengo, solo mejoras" },
        ],
      },
      { t: "text", name: "Web actual", ph: "Si tienes, pega el link: https://", tipo: "url" },
    ],
  },
  {
    n: "04",
    titulo: "Si vas a vender online, ¿cómo quieres cobrar?",
    sub: "Si no vendes online, salta a la 05.",
    campos: [
      {
        t: "check",
        name: "Cobro",
        opciones: [
          { v: "Pedido por WhatsApp, pago manual", l: "Pedido por WhatsApp", d: "el pago se coordina aparte: Bs, Zelle, efectivo" },
          { v: "Tarjeta internacional (Stripe)", l: "Tarjeta internacional", d: "Stripe — vendo a USA o afuera" },
          { v: "Pago movil / transferencia venezolana", l: "Pago móvil o transferencia venezolana" },
          { v: "No vendo online", l: "No vendo online" },
        ],
      },
      { t: "text", name: "Cantidad de productos", ph: "¿Cuántos productos aprox.?" },
    ],
  },
  {
    n: "05",
    titulo: "¿Algo de esto lo necesitas?",
    sub: "Estas son las cosas que más cambian el presupuesto.",
    campos: [
      {
        t: "check",
        name: "Complejidad",
        opciones: [
          { v: "Login de usuarios / area privada", l: "Login de usuarios o área privada" },
          { v: "Panel para administrar el contenido", l: "Panel para administrar el contenido yo mismo" },
          { v: "Conectarse con un sistema que ya uso", l: "Conectarse con un sistema que ya uso", d: "ERP, Profit, Saint, CRM, facturación" },
          { v: "Blog", l: "Blog" },
          { v: "Version en ingles u otro idioma", l: "Versión en inglés u otro idioma" },
          { v: "Nada de esto", l: "Nada de esto" },
        ],
      },
    ],
  },
  {
    n: "06",
    titulo: "¿Cómo está tu marca?",
    campos: [
      {
        t: "radio",
        name: "Marca",
        opciones: [
          { v: "Logo y manual listos", l: "Logo y manual de marca listos" },
          { v: "Tengo logo, nada mas", l: "Tengo logo, nada más" },
          { v: "El logo esta debil", l: "El logo está débil, hay que rehacerlo" },
          { v: "No tengo marca todavia", l: "No tengo marca todavía" },
        ],
      },
    ],
  },
  {
    n: "07",
    titulo: "¿Textos y fotos los tienes?",
    campos: [
      {
        t: "radio",
        name: "Contenido",
        opciones: [
          { v: "Todo listo: textos y fotos", l: "Todo listo: textos y fotos" },
          { v: "Tengo fotos, faltan los textos", l: "Tengo fotos, faltan los textos" },
          { v: "Tengo textos, faltan las fotos", l: "Tengo textos, faltan las fotos" },
          { v: "No tengo nada, necesito ayuda", l: "No tengo nada, necesito ayuda" },
        ],
      },
    ],
  },
  {
    n: "08",
    titulo: "¿Para cuándo la necesitas?",
    campos: [
      {
        t: "radio",
        name: "Urgencia",
        opciones: [
          { v: "Ya, lo antes posible", l: "Ya, lo antes posible" },
          { v: "Proximo mes o dos", l: "Próximo mes o dos" },
          { v: "Fecha fija (evento, lanzamiento)", l: "Tengo fecha fija", d: "evento, lanzamiento, feria" },
          { v: "Sin apuro, estoy cotizando", l: "Sin apuro, estoy cotizando" },
        ],
      },
    ],
  },
];


export const PREGUNTAS_APP: Pregunta[] = [
  {
    n: "01",
    titulo: "¿Qué tiene que hacer la app?",
    sub: "En dos líneas: qué problema resuelve y a quién se lo resuelve.",
    campos: [
      {
        t: "area",
        name: "Que hace la app",
        ph: "Ej: que mis choferes reciban pedidos y el cliente vea dónde va su envío",
      },
    ],
  },
  {
    n: "02",
    titulo: "¿Quién la va a usar?",
    campos: [
      {
        t: "check",
        name: "Usuarios",
        opciones: [
          { v: "Clientes finales (publico general)", l: "Clientes finales", d: "público general que la descarga" },
          { v: "Mi equipo interno", l: "Mi equipo interno", d: "empleados, vendedores, técnicos" },
          { v: "Aliados o proveedores", l: "Aliados o proveedores" },
          { v: "Varios perfiles con permisos distintos", l: "Varios perfiles con permisos distintos", d: "cada quien ve cosas diferentes" },
        ],
      },
    ],
  },
  {
    n: "03",
    titulo: "¿Dónde tiene que funcionar?",
    sub: "Si no estás seguro, marca la última opción.",
    campos: [
      {
        t: "check",
        name: "Plataforma",
        opciones: [
          { v: "iPhone (App Store)", l: "iPhone", d: "publicada en el App Store" },
          { v: "Android (Play Store)", l: "Android", d: "publicada en Google Play" },
          { v: "Sistema web (se entra por el navegador)", l: "Sistema web", d: "se entra por el navegador, sin descargar nada" },
          { v: "No se, necesito asesoria", l: "No sé, necesito asesoría" },
        ],
      },
    ],
  },
  {
    n: "04",
    titulo: "¿Qué tiene que poder hacer por dentro?",
    sub: "Marca todo lo que aplique. Esto es lo que más pesa en el presupuesto.",
    campos: [
      {
        t: "check",
        name: "Funciones",
        opciones: [
          { v: "Cuentas de usuario / registro y login", l: "Cuentas de usuario", d: "registro, login, recuperar clave" },
          { v: "Pagos dentro de la app", l: "Pagos dentro de la app" },
          { v: "Chat entre usuarios", l: "Chat entre usuarios" },
          { v: "Mapas y ubicacion en tiempo real", l: "Mapas y ubicación en tiempo real", d: "rastreo, rutas, choferes" },
          { v: "Notificaciones push", l: "Notificaciones push" },
          { v: "Subir fotos o archivos", l: "Subir fotos o archivos" },
          { v: "Agenda, turnos o reservas", l: "Agenda, turnos o reservas" },
          { v: "Panel de administracion", l: "Panel de administración", d: "para que tú controles todo desde la web" },
          { v: "Reportes y estadisticas", l: "Reportes y estadísticas" },
          { v: "Escaneo de codigos QR o de barras", l: "Escaneo de QR o código de barras" },
          { v: "Funciona sin internet", l: "Funciona sin internet", d: "modo offline" },
          { v: "Inteligencia artificial", l: "Inteligencia artificial" },
        ],
      },
    ],
  },
  {
    n: "05",
    titulo: "¿Cómo genera dinero?",
    campos: [
      {
        t: "radio",
        name: "Modelo de negocio",
        opciones: [
          { v: "Suscripcion mensual", l: "Suscripción mensual" },
          { v: "Comision por transaccion", l: "Comisión por transacción", d: "cobro un % de cada venta o servicio" },
          { v: "Pago unico por descargarla", l: "Pago único por descargarla" },
          { v: "Gratis: es herramienta interna", l: "Gratis, es herramienta interna", d: "no vende, hace más eficiente al equipo" },
          { v: "Todavia no lo defino", l: "Todavía no lo defino" },
        ],
      },
    ],
  },
  {
    n: "06",
    titulo: "¿En qué punto está hoy?",
    campos: [
      {
        t: "radio",
        name: "Punto de partida",
        opciones: [
          { v: "Solo es una idea", l: "Solo es una idea" },
          { v: "Tengo el flujo o los diseños", l: "Tengo el flujo o los diseños hechos" },
          { v: "Hay una version funcionando que hay que mejorar", l: "Hay una versión funcionando que hay que mejorar" },
          { v: "Existe pero hay que rehacerla desde cero", l: "Existe pero hay que rehacerla desde cero" },
        ],
      },
      { t: "text", name: "App o sistema actual", ph: "Si ya existe, pega el link o el nombre en la tienda" },
    ],
  },
  {
    n: "07",
    titulo: "¿Se tiene que conectar con algo que ya usas?",
    sub: "Las integraciones son lo que más alarga un proyecto.",
    campos: [
      {
        t: "check",
        name: "Integraciones",
        opciones: [
          { v: "Sistema administrativo o ERP", l: "Sistema administrativo o ERP", d: "Profit, Saint, Odoo, SAP" },
          { v: "Pasarela de pago", l: "Pasarela de pago", d: "Stripe, pago móvil, banco" },
          { v: "WhatsApp", l: "WhatsApp" },
          { v: "Base de datos o sistema propio que ya tengo", l: "Base de datos o sistema que ya tengo" },
          { v: "Nada, arranca de cero", l: "Nada, arranca de cero" },
        ],
      },
    ],
  },
  {
    n: "08",
    titulo: "¿Para cuándo la necesitas?",
    campos: [
      {
        t: "radio",
        name: "Urgencia",
        opciones: [
          { v: "Ya, lo antes posible", l: "Ya, lo antes posible" },
          { v: "En los proximos 3 meses", l: "En los próximos 3 meses" },
          { v: "Fecha fija (lanzamiento, temporada)", l: "Tengo fecha fija", d: "lanzamiento, temporada, licitación" },
          { v: "Sin apuro, estoy explorando", l: "Sin apuro, estoy explorando" },
        ],
      },
      {
        t: "radio",
        name: "Presupuesto",
        opciones: [
          { v: "Quiero arrancar con lo minimo y crecer", l: "Arrancar con lo mínimo y crecer" },
          { v: "Tengo presupuesto asignado", l: "Tengo presupuesto asignado" },
          { v: "Prefiero que me propongan", l: "Prefiero que me propongan" },
        ],
      },
    ],
  },
];


/* Brief de arranque del Paquete 1 — Landing Page ($1.200).
   No es un cuestionario de venta: el cliente ya compró. Cada bloque existe
   para llenar un ítem del alcance vendido (8 secciones, 1 idioma, formulario
   de 6 campos, 4 mockups) o para cubrir lo que el paquete NO incluye
   (textos, dominio, sesión fotográfica), que es donde se traba la entrega. */
export const PREGUNTAS_LANDING: Pregunta[] = [
  {
    n: "01",
    titulo: "¿Qué vas a promocionar en esta landing?",
    sub: "Una landing = un solo objetivo. Si son dos productos, son dos landings.",
    campos: [
      { t: "text", name: "Producto o servicio", ph: "Nombre exacto como quieres que aparezca" },
      {
        t: "area",
        name: "De que se trata",
        ph: "Ej: curso online de trading para principiantes, 6 semanas, arranca en octubre",
      },
    ],
  },
  {
    n: "02",
    titulo: "¿A quién le habla y qué quieres que haga?",
    sub: "La página completa se diseña alrededor de esta acción.",
    campos: [
      {
        t: "area",
        name: "A quien le habla",
        ph: "Ej: dueños de talleres en Maracaibo, 30 a 55 años, que ya compran repuestos por WhatsApp",
      },
      {
        t: "radio",
        name: "Accion principal",
        opciones: [
          { v: "Escribir por WhatsApp", l: "Que escriba por WhatsApp" },
          { v: "Llenar el formulario", l: "Que llene el formulario y lo contactemos" },
          { v: "Llamar por telefono", l: "Que llame por teléfono" },
          { v: "Registrarse a un evento", l: "Que se registre a un evento o webinar" },
          { v: "Pagar por un link externo", l: "Que pague", d: "por un link externo: Stripe, Zelle, pasarela" },
          { v: "Descargar algo", l: "Que descargue algo", d: "catálogo, PDF, lista de precios" },
        ],
      },
    ],
  },
  {
    n: "03",
    titulo: "¿Qué secciones lleva?",
    sub: "El paquete incluye hasta 8 secciones. Marca las que quieres.",
    campos: [
      {
        t: "check",
        name: "Secciones",
        opciones: [
          { v: "Hero con titular y boton", l: "Hero con titular y botón principal", d: "obligatoria" },
          { v: "Problema o necesidad", l: "El problema que resuelves" },
          { v: "Solucion o propuesta de valor", l: "Tu solución o propuesta de valor" },
          { v: "Caracteristicas o beneficios", l: "Características o beneficios" },
          { v: "Testimonios o casos de exito", l: "Testimonios, casos o pruebas sociales" },
          { v: "Preguntas frecuentes", l: "Preguntas frecuentes" },
          { v: "Precios o planes", l: "Precios o planes" },
          { v: "Llamado a la accion final", l: "Llamado a la acción final" },
          { v: "Galeria de fotos o productos", l: "Galería de fotos o productos" },
          { v: "Mapa o direccion", l: "Mapa o dirección física" },
          { v: "Footer con contacto y redes", l: "Footer con contacto y redes", d: "obligatoria" },
        ],
      },
      {
        t: "area",
        name: "Seccion extra",
        ph: "¿Falta alguna sección que no está en la lista? (opcional)",
      },
    ],
  },
  {
    n: "04",
    titulo: "Los textos, ¿quién los escribe?",
    sub: "El paquete no incluye redacción: los textos los provees tú. Si no los tienes, lo cotizamos aparte.",
    campos: [
      {
        t: "radio",
        name: "Textos",
        opciones: [
          { v: "Ya los tengo listos", l: "Ya los tengo listos, los mando" },
          { v: "Los escribo pero necesito la guia", l: "Los escribo yo, pero necesito que me digan qué va en cada sección" },
          { v: "Quiero que 1bite los redacte", l: "Quiero que 1bite los redacte", d: "se cotiza aparte" },
        ],
      },
      {
        t: "area",
        name: "Mensaje que no puede faltar",
        ph: "¿Qué frase, dato o promesa NO puede faltar en la página?",
      },
    ],
  },
  {
    n: "05",
    titulo: "¿Qué material visual tienes?",
    sub: "El paquete incluye hasta 4 mockups o renders integrados al diseño. La sesión fotográfica no está incluida.",
    campos: [
      {
        t: "check",
        name: "Material visual",
        opciones: [
          { v: "Fotos propias en buena calidad", l: "Fotos propias en buena calidad" },
          { v: "Fotos de celular", l: "Fotos de celular nada más" },
          { v: "Logo en vectorial (AI, SVG, EPS)", l: "Logo en vectorial", d: "AI, SVG, EPS o PDF editable" },
          { v: "Video", l: "Video" },
          { v: "Necesito mockups o renders", l: "Necesito que hagan los mockups o renders", d: "hasta 4 incluidos" },
          { v: "No tengo nada", l: "No tengo nada todavía" },
        ],
      },
      {
        t: "text",
        name: "Link al material",
        ph: "Pega el link de Drive, Dropbox o WeTransfer con el material",
        tipo: "url",
      },
    ],
  },
  {
    n: "06",
    titulo: "¿Cómo está tu marca?",
    campos: [
      {
        t: "radio",
        name: "Marca",
        opciones: [
          { v: "Manual de marca completo", l: "Manual de marca completo", d: "colores, tipografías, uso del logo" },
          { v: "Logo y colores definidos", l: "Logo y colores definidos, sin manual" },
          { v: "Solo el logo", l: "Solo el logo" },
          { v: "Hay que armarla", l: "Hay que armarla", d: "se cotiza aparte" },
        ],
      },
      {
        t: "area",
        name: "Referencias de estilo de marca",
        ph: "Colores, tipografías o el tono que quieres transmitir (serio, cercano, premium, técnico...)",
      },
    ],
  },
  {
    n: "07",
    titulo: "El formulario de contacto",
    sub: "El paquete incluye un formulario de hasta 6 campos. Marca cuáles quieres pedirle al visitante.",
    campos: [
      {
        t: "check",
        name: "Campos del formulario",
        opciones: [
          { v: "Nombre", l: "Nombre" },
          { v: "Correo", l: "Correo" },
          { v: "Telefono o WhatsApp", l: "Teléfono o WhatsApp" },
          { v: "Empresa", l: "Empresa" },
          { v: "Ciudad", l: "Ciudad" },
          { v: "Producto o servicio de interes", l: "Producto o servicio de interés" },
          { v: "Presupuesto", l: "Presupuesto" },
          { v: "Mensaje libre", l: "Mensaje libre" },
        ],
      },
      { t: "text", name: "Correo donde llegan los mensajes", ph: "¿A qué correo deben llegar los formularios?", tipo: "email" },
      { t: "text", name: "WhatsApp del boton", ph: "Número de WhatsApp para el botón (con código de país)" },
    ],
  },
  {
    n: "08",
    titulo: "Dominio e idioma",
    sub: "El dominio anual corre por tu cuenta. El paquete incluye 1 idioma y el deploy con SSL.",
    campos: [
      { t: "text", name: "Dominio", ph: "El dominio que quieres: ejemplo.com" },
      {
        t: "radio",
        name: "Estado del dominio",
        label: "¿Ya tienes el dominio?",
        opciones: [
          { v: "Ya lo tengo comprado", l: "Ya lo tengo comprado" },
          { v: "No lo tengo, necesito que me guien", l: "No lo tengo, necesito que me guíen para comprarlo" },
          { v: "Lo tiene otra persona o proveedor", l: "Lo tiene otra persona o mi proveedor anterior" },
        ],
      },
      {
        t: "radio",
        name: "Idioma",
        label: "¿En qué idioma va la página?",
        opciones: [
          { v: "Espanol", l: "Español" },
          { v: "Ingles", l: "Inglés" },
        ],
      },
    ],
  },
  {
    n: "09",
    titulo: "Referencias y fecha",
    sub: "La entrega es de 10 a 14 días continuos desde que tengamos textos y material.",
    campos: [
      {
        t: "area",
        name: "Referencias que te gustan",
        ph: "Pega 2 o 3 links de páginas que te gusten y di qué te gusta de cada una",
      },
      {
        t: "area",
        name: "Lo que NO quieres",
        ph: "¿Algo que odies? Colores, estilos, páginas de la competencia que no quieres parecer",
      },
      { t: "text", name: "Fecha objetivo", ph: "¿Hay una fecha fija? (lanzamiento, evento, feria)" },
    ],
  },
];
