/* Definición declarativa de los cuestionarios de calificación de leads.
   La UI vive en components/sections/CuestionarioForm.tsx: acá solo el contenido. */

export type Campo =
  | { t: "radio" | "check"; name: string; opciones: { v: string; l: string; d?: string }[] }
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
