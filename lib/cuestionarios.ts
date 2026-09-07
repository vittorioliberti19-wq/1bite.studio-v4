/* Definición declarativa de los cuestionarios de calificación de leads.
   La UI vive en components/sections/CuestionarioForm.tsx: acá solo el contenido. */

export type Campo =
  // `label` rotula el grupo cuando un bloque tiene dos listas seguidas y una
  // pegada a la otra se leería como continuación de la anterior.
  | {
      t: "radio" | "check";
      name: string;
      label?: string;
      /** Solo para `check`: tope de opciones marcables. Al llegar, el resto
          se deshabilita. Sirve para que el cliente no pida más de lo vendido. */
      max?: number;
      opciones: { v: string; l: string; d?: string }[];
    }
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
        max: 8,
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
        max: 6,
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
          { v: "Otro idioma", l: "Otro", d: "escríbelo abajo" },
        ],
      },
      {
        t: "text",
        name: "Cual otro idioma",
        ph: "Si marcaste Otro, ¿cuál idioma? (portugués, italiano, chino...)",
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


/* Cuestionario de calificación para proyectos de ecommerce.
   Más largo que el de web general a propósito: en una tienda el presupuesto
   lo mueven el catálogo (variantes), el cobro, el envío y de dónde sale el
   inventario. Cada bloque existe para cerrar una de esas cuatro incógnitas. */
export const PREGUNTAS_ECOMMERCE: Pregunta[] = [
  {
    n: "01",
    titulo: "¿Qué vendes?",
    sub: "En una línea, como se lo dirías a un amigo.",
    campos: [
      {
        t: "area",
        name: "Que vende",
        ph: "Ej: ropa de mujer al detal, marca propia, entrego en Maracaibo y envío al resto del país",
      },
      {
        t: "radio",
        name: "Tipo de tienda",
        label: "¿Qué tipo de producto es?",
        opciones: [
          { v: "Ropa, calzado o accesorios", l: "Ropa, calzado o accesorios", d: "lleva tallas y colores" },
          { v: "Productos fisicos sin variantes", l: "Productos físicos sin variantes", d: "cada producto es uno solo" },
          { v: "Comida o bebida", l: "Comida o bebida", d: "menú, presentaciones, horarios" },
          { v: "Repuestos, ferreteria o industrial", l: "Repuestos, ferretería o industrial", d: "catálogo grande, códigos" },
          { v: "Servicios o citas", l: "Servicios o citas" },
          { v: "Productos digitales", l: "Productos digitales", d: "cursos, PDF, licencias" },
          { v: "Mezcla de varios", l: "Mezcla de varios" },
        ],
      },
    ],
  },
  {
    n: "02",
    titulo: "¿Qué tan grande es el catálogo?",
    sub: "Aproximado está bien. Esto define cuánto pesa la carga inicial.",
    campos: [
      { t: "text", name: "Cantidad de productos", ph: "¿Cuántos productos aprox.? Ej: 120" },
      { t: "text", name: "Cantidad de categorias", ph: "¿Cuántas categorías o líneas? Ej: 6" },
      {
        t: "radio",
        name: "Quien carga el catalogo",
        label: "¿Quién carga los productos al arrancar?",
        opciones: [
          { v: "Yo o mi equipo", l: "Yo o mi equipo, con el panel" },
          { v: "Quiero que 1bite lo cargue", l: "Quiero que 1bite lo cargue", d: "se cotiza aparte por cantidad" },
          { v: "Tengo un Excel o base para importar", l: "Tengo un Excel o base que se puede importar" },
        ],
      },
    ],
  },
  {
    n: "03",
    titulo: "¿Los productos tienen variantes?",
    sub: "Talla, color, sabor, presentación. Es lo que más complica el inventario.",
    campos: [
      {
        t: "check",
        name: "Variantes",
        opciones: [
          { v: "Tallas", l: "Tallas", d: "S, M, L o numéricas" },
          { v: "Colores", l: "Colores" },
          { v: "Presentacion o tamano", l: "Presentación o tamaño", d: "250 ml, 1 kg, x12" },
          { v: "Sabor o modelo", l: "Sabor, modelo o acabado" },
          { v: "Personalizacion del cliente", l: "El cliente personaliza", d: "grabado, nombre, medida a pedido" },
          { v: "Sin variantes", l: "Sin variantes" },
        ],
      },
      {
        t: "radio",
        name: "Stock por variante",
        label: "¿Necesitas llevar el stock separado por cada variante?",
        opciones: [
          { v: "Si, stock por talla y color", l: "Sí, quiero saber cuántas quedan de cada talla y color" },
          { v: "Solo stock general del producto", l: "Solo el stock general del producto" },
          { v: "No manejo stock en la web", l: "No manejo stock en la web" },
        ],
      },
    ],
  },
  {
    n: "04",
    titulo: "¿Cómo quieres cobrar?",
    sub: "Marca todo lo que aplique. Esto es lo que más mueve el presupuesto.",
    campos: [
      {
        t: "check",
        name: "Cobro",
        opciones: [
          { v: "Pedido por WhatsApp, pago manual", l: "Pedido por WhatsApp", d: "el carrito arma el mensaje, el pago se coordina aparte" },
          { v: "Tarjeta internacional (Stripe)", l: "Tarjeta internacional con Stripe", d: "requiere empresa o cuenta en USA/Panamá" },
          { v: "Pago movil o transferencia venezolana", l: "Pago móvil o transferencia venezolana", d: "el cliente sube el comprobante" },
          { v: "Zelle", l: "Zelle" },
          { v: "Binance o cripto", l: "Binance o cripto" },
          { v: "Punto de venta o efectivo en tienda", l: "Punto de venta o efectivo al retirar" },
          { v: "Pago contra entrega", l: "Pago contra entrega" },
        ],
      },
      {
        t: "radio",
        name: "Confirmacion del pago",
        label: "Cuando entra un pago manual, ¿quién lo confirma?",
        opciones: [
          { v: "Yo lo reviso y apruebo en el panel", l: "Yo lo reviso y lo apruebo en el panel" },
          { v: "Quiero que se verifique automatico", l: "Quiero que se verifique automático", d: "conexión con el banco, se cotiza aparte" },
          { v: "No aplica, todo es con tarjeta", l: "No aplica, todo va con tarjeta" },
        ],
      },
    ],
  },
  {
    n: "05",
    titulo: "¿Cómo entregas?",
    campos: [
      {
        t: "check",
        name: "Entrega",
        opciones: [
          { v: "Delivery propio en mi ciudad", l: "Delivery propio en mi ciudad" },
          { v: "Envio nacional por agencia", l: "Envío nacional por agencia", d: "Zoom, MRW, Tealca, Domesa" },
          { v: "Envio internacional", l: "Envío internacional" },
          { v: "Retiro en tienda", l: "Retiro en tienda" },
          { v: "Producto digital, se descarga", l: "Producto digital, se descarga o se manda por correo" },
        ],
      },
      {
        t: "radio",
        name: "Costo de envio",
        label: "¿Cómo se calcula el costo del envío?",
        opciones: [
          { v: "Tarifa fija", l: "Tarifa fija" },
          { v: "Por zona o ciudad", l: "Por zona o ciudad" },
          { v: "Por peso o tamano", l: "Por peso o tamaño" },
          { v: "Gratis sobre cierto monto", l: "Gratis sobre cierto monto" },
          { v: "Se cotiza aparte con el cliente", l: "Se cotiza aparte con el cliente" },
        ],
      },
    ],
  },
  {
    n: "06",
    titulo: "Precios y moneda",
    campos: [
      {
        t: "radio",
        name: "Moneda",
        opciones: [
          { v: "Solo dolares", l: "Solo dólares" },
          { v: "Solo bolivares", l: "Solo bolívares" },
          { v: "Dolares con conversion a bolivares", l: "Dólares con conversión a bolívares", d: "tasa BCV automática" },
        ],
      },
      {
        t: "check",
        name: "Reglas de precio",
        label: "¿Algo de esto aplica?",
        opciones: [
          { v: "IVA", l: "Hay que mostrar o calcular IVA" },
          { v: "Precio mayorista y detal", l: "Precio distinto para mayoristas y detal" },
          { v: "Cupones o codigos de descuento", l: "Cupones o códigos de descuento" },
          { v: "Ofertas y precios tachados", l: "Ofertas con precio tachado" },
          { v: "Cantidad minima de compra", l: "Cantidad mínima de compra" },
          { v: "Nada de esto", l: "Nada de esto" },
        ],
      },
    ],
  },
  {
    n: "07",
    titulo: "¿Dónde vive tu inventario hoy?",
    sub: "Conectar con un sistema existente es lo que más alarga el proyecto.",
    campos: [
      {
        t: "radio",
        name: "Inventario actual",
        opciones: [
          { v: "En Excel o Google Sheets", l: "En Excel o Google Sheets" },
          { v: "En un sistema administrativo", l: "En un sistema administrativo", d: "Profit, Saint, Odoo, ERP propio" },
          { v: "En un punto de venta", l: "En un punto de venta" },
          { v: "Ya uso el sistema de 1bite", l: "Ya uso el sistema de 1bite", d: "el ERP donde llevas caja, inventario y cierres" },
          { v: "En la cabeza o en un cuaderno", l: "En la cabeza o en un cuaderno" },
          { v: "No manejo inventario", l: "No manejo inventario" },
        ],
      },
      {
        t: "radio",
        name: "Sincronizacion",
        label: "¿La web tiene que sincronizarse con eso?",
        opciones: [
          { v: "Si, en tiempo real", l: "Sí, en tiempo real" },
          { v: "Si, una carga periodica basta", l: "Sí, pero una carga periódica basta" },
          { v: "No, la web maneja su propio inventario", l: "No, la web maneja su propio inventario" },
        ],
      },
    ],
  },
  {
    n: "08",
    titulo: "¿Qué más tiene que hacer la tienda?",
    sub: "Marca todo lo que aplique.",
    campos: [
      {
        t: "check",
        name: "Funciones",
        opciones: [
          { v: "Cuentas de cliente e historial de pedidos", l: "Cuentas de cliente con historial de pedidos" },
          { v: "Favoritos o lista de deseos", l: "Favoritos o lista de deseos" },
          { v: "Resenas y calificaciones", l: "Reseñas y calificaciones" },
          { v: "Buscador con filtros", l: "Buscador con filtros", d: "por talla, color, precio, categoría" },
          { v: "Correos automaticos de pedido", l: "Correos automáticos de confirmación y despacho" },
          { v: "Aviso del pedido por WhatsApp", l: "Aviso del pedido por WhatsApp" },
          { v: "Rastreo del pedido", l: "Que el cliente rastree su pedido" },
          { v: "Reportes de ventas", l: "Reportes de ventas y productos más vendidos" },
          { v: "Blog o contenido", l: "Blog o contenido" },
          { v: "Version en ingles u otro idioma", l: "Versión en inglés u otro idioma" },
          { v: "Varios usuarios administradores", l: "Varios usuarios administradores con permisos distintos" },
        ],
      },
    ],
  },
  {
    n: "09",
    titulo: "¿Ya vendes por algún lado?",
    campos: [
      {
        t: "check",
        name: "Canales actuales",
        opciones: [
          { v: "Instagram o WhatsApp nada mas", l: "Instagram o WhatsApp nada más" },
          { v: "Tienda fisica", l: "Tienda física" },
          { v: "Shopify, WooCommerce o similar", l: "Ya tengo tienda online", d: "Shopify, WooCommerce, Wix, Tiendanube" },
          { v: "Marketplace", l: "Marketplace", d: "Mercado Libre, Amazon, TikTok Shop" },
        ],
      },
      { t: "text", name: "Tienda o perfil actual", ph: "Pega el link de tu tienda o tu Instagram" },
      {
        t: "radio",
        name: "Migracion",
        label: "Si ya tienes tienda, ¿qué quieres hacer?",
        opciones: [
          { v: "Migrar todo a la nueva", l: "Migrar productos y clientes a la nueva" },
          { v: "Empezar limpio", l: "Empezar limpio, sin migrar nada" },
          { v: "No aplica", l: "No aplica" },
        ],
      },
    ],
  },
  {
    n: "10",
    titulo: "Fotos de producto y marca",
    sub: "En una tienda las fotos son la mitad del resultado. Es lo que más traba la entrega.",
    campos: [
      {
        t: "radio",
        name: "Fotos de producto",
        opciones: [
          { v: "Todas listas y en buena calidad", l: "Todas listas y en buena calidad" },
          { v: "Tengo algunas, faltan varias", l: "Tengo algunas, faltan varias" },
          { v: "Solo fotos de celular", l: "Solo fotos de celular" },
          { v: "Necesito sesion fotografica", l: "Necesito sesión fotográfica", d: "se cotiza aparte" },
        ],
      },
      {
        t: "radio",
        name: "Marca",
        label: "¿Cómo está tu marca?",
        opciones: [
          { v: "Logo y manual listos", l: "Logo y manual de marca listos" },
          { v: "Tengo logo, nada mas", l: "Tengo logo, nada más" },
          { v: "El logo esta debil", l: "El logo está débil, hay que rehacerlo" },
          { v: "No tengo marca todavia", l: "No tengo marca todavía" },
        ],
      },
      { t: "text", name: "Link al material", ph: "Link de Drive o Dropbox con fotos y logo", tipo: "url" },
    ],
  },
  {
    n: "11",
    titulo: "¿Quieres que la tienda venga con sistema de gestión por detrás?",
    sub: "1bite ya tiene un ERP funcionando en tiendas reales (La Piu: inventario por talla, caja, cierre diario). La tienda web puede montarse encima en vez de arrancar de cero.",
    campos: [
      {
        t: "radio",
        name: "Backend de gestion",
        opciones: [
          { v: "Si, quiero el sistema completo", l: "Sí, quiero el sistema completo", d: "la web y la administración del negocio en un solo lugar" },
          { v: "Solo la tienda, sin sistema", l: "Solo la tienda web, sin sistema de gestión" },
          { v: "Ya uso el sistema de 1bite", l: "Ya uso el sistema de 1bite", d: "solo hay que conectarle la tienda" },
          { v: "No se, quiero que me expliquen", l: "No sé, quiero que me expliquen la diferencia" },
        ],
      },
      {
        t: "check",
        name: "Modulos de gestion",
        label: "Si te interesa el sistema, ¿qué partes usarías?",
        opciones: [
          { v: "Inventario con tallas y fotos", l: "Inventario con tallas, colores y foto por producto", d: "ya existe, funcionando en tienda" },
          { v: "Caja o punto de venta en tienda fisica", l: "Caja o punto de venta en la tienda física", d: "descuenta el stock de la talla vendida" },
          { v: "Cierre de caja diario", l: "Cierre de caja diario", d: "cuánto entró, en qué moneda, quién vendió" },
          { v: "Clientes y su historial", l: "Ficha de clientes y su historial de compras" },
          { v: "Cuentas por cobrar", l: "Cuentas por cobrar", d: "ventas a crédito, abonos, quién debe" },
          { v: "Gastos y cuentas por pagar", l: "Gastos y cuentas por pagar" },
          { v: "Contabilidad y estados financieros", l: "Contabilidad y estados financieros", d: "libro mayor, ganancia real del mes" },
          { v: "Nomina y comisiones de vendedores", l: "Nómina y comisiones de vendedores" },
          { v: "Tasa BCV o Binance automatica", l: "Tasa BCV o Binance automática" },
          { v: "Reportes y objetivos de venta", l: "Reportes y objetivos de venta" },
          { v: "Varias sucursales o negocios", l: "Varias sucursales o negocios en un mismo panel" },
          { v: "Ninguno por ahora", l: "Ninguno por ahora" },
        ],
      },
      {
        t: "text",
        name: "Personas que usarian el sistema",
        ph: "¿Cuántas personas lo usarían? (cajeras, vendedores, administración)",
      },
    ],
  },
  {
    n: "12",
    titulo: "¿Para cuándo la necesitas?",
    campos: [
      {
        t: "radio",
        name: "Urgencia",
        opciones: [
          { v: "Ya, lo antes posible", l: "Ya, lo antes posible" },
          { v: "Proximo mes o dos", l: "Próximo mes o dos" },
          { v: "Fecha fija (temporada, lanzamiento)", l: "Tengo fecha fija", d: "temporada, lanzamiento, diciembre" },
          { v: "Sin apuro, estoy cotizando", l: "Sin apuro, estoy cotizando" },
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
      {
        t: "area",
        name: "Referencias que te gustan",
        ph: "Pega 2 o 3 links de tiendas que te gusten y di qué te gusta de cada una (opcional)",
      },
    ],
  },
];


/* Cuestionario para operadores de internet y TV (ISP).
   Un ISP no se cotiza como una web: el trabajo real está en el portal del
   suscriptor (pagar, reportar fallas, ver su plan), en pegarse al sistema de
   gestión que ya opera la red (NeoGisp, Mikrowisp, Splynx…) y, si hay TV, en
   una app por cada plataforma de televisor. Cada bloque cierra una de esas. */
export const PREGUNTAS_ISP: Pregunta[] = [
  {
    n: "01",
    titulo: "¿Qué servicios presta la empresa?",
    campos: [
      {
        t: "check",
        name: "Servicios",
        opciones: [
          { v: "Fibra optica al hogar (FTTH)", l: "Fibra óptica al hogar (FTTH)" },
          { v: "Radio enlaces / inalambrico", l: "Radio enlaces o inalámbrico" },
          { v: "Satelite", l: "Satélite" },
          { v: "Laser optico (FSO)", l: "Láser óptico (FSO)" },
          { v: "Enlaces dedicados corporativos", l: "Enlaces dedicados corporativos" },
          { v: "Television o streaming", l: "Televisión o streaming" },
          { v: "Telefonia o VoIP", l: "Telefonía o VoIP" },
          { v: "Datacenter, hosting o nube", l: "Datacenter, hosting o nube" },
        ],
      },
      {
        t: "radio",
        name: "Tipo de cliente",
        label: "¿A quién le vendes principalmente?",
        opciones: [
          { v: "Residencial", l: "Residencial" },
          { v: "Corporativo", l: "Corporativo" },
          { v: "Ambos", l: "Ambos" },
        ],
      },
      { t: "text", name: "Cobertura", ph: "¿En qué ciudades o países operas?" },
      { t: "text", name: "Cantidad de suscriptores", ph: "¿Cuántos suscriptores activos aprox.?" },
    ],
  },
  {
    n: "02",
    titulo: "¿Qué necesitas de nosotros?",
    sub: "Marca todo lo que aplique. Después vemos por dónde arrancar.",
    campos: [
      {
        t: "check",
        name: "Objetivo",
        opciones: [
          { v: "Marca nueva o rediseno de imagen", l: "Marca nueva o rediseño de imagen" },
          { v: "Sitio web corporativo", l: "Sitio web corporativo" },
          { v: "Portal de autogestion del cliente", l: "Portal donde el cliente se autogestiona", d: "ver factura, pagar, reportar fallas" },
          { v: "App movil para los suscriptores", l: "App móvil para los suscriptores" },
          { v: "App de television (OTT)", l: "App de televisión (OTT)" },
          { v: "Manejo de redes sociales", l: "Manejo de redes sociales" },
          { v: "Senaletica y material de oficinas", l: "Señalética y material de oficinas" },
        ],
      },
    ],
  },
  {
    n: "03",
    titulo: "¿Qué sistema opera la red hoy?",
    sub: "Esto define si el portal lee datos reales o hay que cargarlos a mano. Es la pregunta más importante del cuestionario.",
    campos: [
      {
        t: "radio",
        name: "Sistema de gestion",
        opciones: [
          { v: "NeoGisp", l: "NeoGisp" },
          { v: "Mikrowisp", l: "Mikrowisp" },
          { v: "Splynx", l: "Splynx" },
          { v: "Smartolt", l: "Smartolt" },
          { v: "Sistema propio", l: "Un sistema propio" },
          { v: "Excel o manual", l: "Excel o manual" },
          { v: "Otro", l: "Otro", d: "escríbelo abajo" },
        ],
      },
      { t: "text", name: "Cual sistema", ph: "Si marcaste Otro o propio, ¿cuál es?" },
      {
        t: "radio",
        name: "Estado del sistema",
        label: "¿Ya está funcionando o están migrando?",
        opciones: [
          { v: "Ya esta en produccion", l: "Ya está en producción" },
          { v: "Estamos migrando ahora", l: "Estamos migrando ahora mismo" },
          { v: "Todavia lo estamos evaluando", l: "Todavía lo estamos evaluando" },
        ],
      },
      {
        t: "radio",
        name: "API disponible",
        label: "¿Ese sistema tiene API para conectarse?",
        opciones: [
          { v: "Si, con documentacion", l: "Sí, y tenemos la documentación" },
          { v: "Si, pero sin documentacion a mano", l: "Sí, pero no tengo la documentación a mano" },
          { v: "No se, hay que preguntarle al proveedor", l: "No sé, hay que preguntarle al proveedor" },
          { v: "No tiene API", l: "No tiene API" },
        ],
      },
      {
        t: "text",
        name: "Link de la API",
        ph: "Si tienes el link de la documentación de la API, pégalo",
        tipo: "url",
      },
    ],
  },
  {
    n: "04",
    titulo: "¿Qué tiene que poder hacer el cliente solo?",
    sub: "Todo lo que marques aquí es una llamada menos al soporte.",
    campos: [
      {
        t: "check",
        name: "Autogestion",
        opciones: [
          { v: "Ver su factura y su saldo", l: "Ver su factura y su saldo" },
          { v: "Pagar en linea", l: "Pagar en línea" },
          { v: "Subir el comprobante de pago", l: "Subir el comprobante de una transferencia" },
          { v: "Ver su plan y su consumo", l: "Ver su plan contratado y su consumo" },
          { v: "Subir o cambiar de plan", l: "Subir o cambiar de plan" },
          { v: "Reportar una falla y ver el estado", l: "Reportar una falla y seguir el estado" },
          { v: "Agendar visita tecnica", l: "Agendar una visita técnica" },
          { v: "Cambiar la clave del wifi", l: "Cambiar la clave de su wifi" },
          { v: "Historial de pagos y facturas", l: "Descargar su historial de pagos" },
          { v: "Programa de referidos", l: "Programa de referidos" },
          { v: "Contratar el servicio desde cero", l: "Contratar el servicio desde cero", d: "cliente nuevo, sin llamar" },
        ],
      },
    ],
  },
  {
    n: "05",
    titulo: "¿Cómo cobras la mensualidad?",
    campos: [
      {
        t: "check",
        name: "Cobro",
        opciones: [
          { v: "Transferencia o pago movil con comprobante", l: "Transferencia o pago móvil", d: "el cliente sube el comprobante" },
          { v: "Tarjeta internacional (Stripe)", l: "Tarjeta internacional", d: "Stripe u otra pasarela" },
          { v: "Zelle", l: "Zelle" },
          { v: "Cripto o Binance", l: "Cripto o Binance" },
          { v: "Domiciliacion o debito automatico", l: "Domiciliación o débito automático" },
          { v: "Efectivo en oficina o con el cobrador", l: "Efectivo en oficina o con un cobrador" },
        ],
      },
      {
        t: "radio",
        name: "Validacion de pagos",
        label: "Cuando entra una transferencia, ¿cómo se valida hoy?",
        opciones: [
          { v: "Una persona la revisa a mano", l: "Una persona la revisa a mano" },
          { v: "El sistema de gestion la valida", l: "El sistema de gestión la valida", d: "NeoGisp u otro" },
          { v: "Queremos que se valide automatico", l: "Queremos que se valide automático", d: "conciliación contra el banco" },
        ],
      },
      {
        t: "radio",
        name: "Corte por mora",
        label: "¿El corte y la reconexión son automáticos?",
        opciones: [
          { v: "Si, el sistema corta y reconecta solo", l: "Sí, el sistema corta y reconecta solo" },
          { v: "Se hace a mano", l: "Se hace a mano" },
          { v: "Queremos automatizarlo", l: "Queremos automatizarlo" },
        ],
      },
    ],
  },
  {
    n: "06",
    titulo: "Facturación",
    campos: [
      {
        t: "radio",
        name: "Moneda",
        opciones: [
          { v: "Dolares", l: "Dólares" },
          { v: "Bolivares", l: "Bolívares" },
          { v: "Dolares con conversion a bolivares", l: "Dólares con conversión a bolívares", d: "tasa BCV" },
          { v: "Otra moneda", l: "Otra moneda" },
        ],
      },
      {
        t: "check",
        name: "Reglas de facturacion",
        label: "¿Algo de esto aplica?",
        opciones: [
          { v: "Factura fiscal legal", l: "Hay que emitir factura fiscal legal" },
          { v: "IVA", l: "IVA" },
          { v: "Prorrateo al instalar a mitad de mes", l: "Prorrateo cuando se instala a mitad de mes" },
          { v: "Planes con permanencia o contrato", l: "Planes con permanencia o contrato" },
          { v: "Descuentos, promociones o combos", l: "Descuentos, promociones o combos" },
          { v: "Cobro de instalacion o equipos", l: "Cobro aparte de instalación o equipos" },
        ],
      },
    ],
  },
  {
    n: "07",
    titulo: "Atención al cliente",
    campos: [
      {
        t: "check",
        name: "Atencion",
        opciones: [
          { v: "Tickets de soporte", l: "Sistema de tickets de soporte" },
          { v: "WhatsApp integrado", l: "WhatsApp integrado", d: "que el mensaje entre al sistema, no a un celular" },
          { v: "Chatbot con inteligencia artificial", l: "Chatbot con inteligencia artificial" },
          { v: "Base de conocimiento o preguntas frecuentes", l: "Base de conocimiento o preguntas frecuentes" },
          { v: "Avisos de corte o mantenimiento", l: "Avisos de corte o mantenimiento programado" },
          { v: "Mapa de estado de la red", l: "Mapa del estado de la red" },
          { v: "Encuestas de satisfaccion", l: "Encuestas de satisfacción" },
          { v: "Panel para los tecnicos en calle", l: "Panel para los técnicos en calle" },
        ],
      },
      { t: "text", name: "Personas en atencion", ph: "¿Cuántas personas atienden clientes hoy?" },
    ],
  },
  {
    n: "08",
    titulo: "La app móvil de los suscriptores",
    sub: "Si no va a haber app, salta al bloque 09.",
    campos: [
      {
        t: "check",
        name: "Plataformas app",
        opciones: [
          { v: "iPhone (App Store)", l: "iPhone", d: "publicada en el App Store" },
          { v: "Android (Play Store)", l: "Android", d: "publicada en Google Play" },
          { v: "No va a haber app movil", l: "No va a haber app móvil" },
        ],
      },
      {
        t: "check",
        name: "Funciones de la app",
        label: "¿Qué tiene que hacer la app?",
        opciones: [
          { v: "Login y ver su cuenta", l: "Entrar y ver su cuenta" },
          { v: "Pagar desde la app", l: "Pagar desde la app" },
          { v: "Reportar fallas", l: "Reportar fallas" },
          { v: "Notificaciones push", l: "Notificaciones push", d: "cortes, vencimiento, pago recibido" },
          { v: "Test de velocidad", l: "Test de velocidad" },
          { v: "Control del router o wifi", l: "Control del router o del wifi" },
          { v: "Ver la television dentro de la app", l: "Ver la televisión dentro de la misma app" },
        ],
      },
      {
        t: "text",
        name: "App actual",
        ph: "Si ya tienen una app publicada, pega el link o el nombre en la tienda",
      },
    ],
  },
  {
    n: "09",
    titulo: "El servicio de televisión (OTT)",
    sub: "Cada plataforma de televisor es un desarrollo y una cuenta de publicación aparte. Marca solo las que de verdad necesitas.",
    campos: [
      {
        t: "check",
        name: "Plataformas TV",
        opciones: [
          { v: "Android TV y Google TV", l: "Android TV y Google TV" },
          { v: "Apple TV (tvOS)", l: "Apple TV" },
          { v: "Samsung (Tizen)", l: "Samsung", d: "sistema Tizen" },
          { v: "LG (webOS)", l: "LG", d: "sistema webOS" },
          { v: "Roku", l: "Roku" },
          { v: "Amazon Fire TV", l: "Amazon Fire TV" },
          { v: "Navegador web", l: "Verlo por el navegador" },
          { v: "Celular y tablet", l: "Celular y tablet" },
          { v: "No vamos a hacer TV", l: "No vamos a hacer TV" },
        ],
      },
      {
        t: "check",
        name: "Contenido TV",
        label: "¿Qué se va a ver?",
        opciones: [
          { v: "Canales en vivo", l: "Canales en vivo" },
          { v: "Catalogo bajo demanda", l: "Catálogo bajo demanda", d: "películas y series" },
          { v: "Grabacion o volver atras", l: "Grabar o volver atrás en el canal", d: "DVR, catch-up" },
          { v: "Canal propio de la empresa", l: "Canal propio de la empresa" },
        ],
      },
      {
        t: "radio",
        name: "Origen de la senal",
        label: "¿Quién provee la señal y el sistema de video?",
        opciones: [
          { v: "Ya tenemos proveedor de señal", l: "Ya tenemos proveedor de señal y plataforma" },
          { v: "Tenemos la senal, falta la plataforma", l: "Tenemos la señal, falta la plataforma" },
          { v: "No tenemos nada, necesitamos asesoria", l: "No tenemos nada, necesitamos asesoría" },
        ],
      },
      {
        t: "text",
        name: "Proveedor de senal",
        ph: "Si ya tienen proveedor de señal, middleware o CDN, ¿cuál es?",
      },
    ],
  },
  {
    n: "10",
    titulo: "Ventas y clientes nuevos",
    campos: [
      {
        t: "check",
        name: "Ventas",
        opciones: [
          { v: "Mapa de cobertura", l: "Mapa de cobertura en la web" },
          { v: "Verificar factibilidad por direccion", l: "Verificar si hay servicio en una dirección" },
          { v: "Solicitud de instalacion en linea", l: "Solicitud de instalación en línea" },
          { v: "Contrato digital firmado", l: "Contrato digital firmado" },
          { v: "Comparador de planes", l: "Comparador de planes" },
          { v: "Cotizador para empresas", l: "Cotizador para clientes corporativos" },
        ],
      },
    ],
  },
  {
    n: "11",
    titulo: "Marca y contenido",
    sub: "Si están en pleno rebrand, dinos en qué punto va.",
    campos: [
      {
        t: "radio",
        name: "Marca",
        opciones: [
          { v: "Manual de marca completo", l: "Manual de marca completo" },
          { v: "Logo y colores definidos", l: "Logo y colores definidos, sin manual" },
          { v: "Rebrand en curso", l: "Estamos en pleno rebrand" },
          { v: "Hay que armarla", l: "Hay que armarla desde cero" },
        ],
      },
      {
        t: "radio",
        name: "Contenido",
        label: "¿Textos y fotos?",
        opciones: [
          { v: "Todo listo", l: "Todo listo: textos y fotos" },
          { v: "Parcial", l: "Tenemos parte, falta lo demás" },
          { v: "No tenemos nada", l: "No tenemos nada, necesitamos ayuda" },
        ],
      },
      { t: "text", name: "Web actual", ph: "Si tienen web, pega el link: https://", tipo: "url" },
      {
        t: "radio",
        name: "Idiomas",
        label: "¿En cuántos idiomas?",
        opciones: [
          { v: "Solo espanol", l: "Solo español" },
          { v: "Espanol e ingles", l: "Español e inglés" },
          { v: "Mas de dos idiomas", l: "Más de dos idiomas" },
        ],
      },
    ],
  },
  {
    n: "12",
    titulo: "¿Para cuándo y con qué prioridad?",
    sub: "Un proyecto así se entrega por fases. Dinos qué necesitas primero.",
    campos: [
      {
        t: "area",
        name: "Que va primero",
        ph: "¿Qué tiene que estar listo primero? Ej: la imagen nueva y la web, y el portal después",
      },
      {
        t: "radio",
        name: "Urgencia",
        opciones: [
          { v: "Ya, lo antes posible", l: "Ya, lo antes posible" },
          { v: "En los proximos 3 meses", l: "En los próximos 3 meses" },
          { v: "Fecha fija (lanzamiento de la nueva imagen)", l: "Tenemos fecha fija", d: "lanzamiento de la nueva imagen, feria, apertura" },
          { v: "Sin apuro, estamos evaluando", l: "Sin apuro, estamos evaluando" },
        ],
      },
      {
        t: "radio",
        name: "Presupuesto",
        opciones: [
          { v: "Quiero arrancar con lo minimo y crecer", l: "Arrancar por fases y crecer" },
          { v: "Tengo presupuesto asignado", l: "Tenemos presupuesto asignado" },
          { v: "Prefiero que me propongan", l: "Prefiero que nos propongan" },
        ],
      },
      {
        t: "area",
        name: "Referencias que te gustan",
        ph: "¿Hay algún operador cuya web o app te guste? Pega 2 o 3 links (opcional)",
      },
    ],
  },
];
