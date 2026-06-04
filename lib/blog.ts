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
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
