import { clientes } from "@/lib/content";
import { Marquee } from "@/components/ui/marquee";
import Reveal from "@/components/ui/Reveal";

// Gama firma 1bite — los cuadros ciclan el gradiente de la marca
const BRAND_GRADS = [
  "linear-gradient(135deg, #08E1F4 0%, #086BFC 100%)",
  "linear-gradient(135deg, #086BFC 0%, #AC31FB 100%)",
  "linear-gradient(135deg, #AC31FB 0%, #ED2E97 100%)",
  "linear-gradient(135deg, #ED2E97 0%, #FD6648 100%)",
  "linear-gradient(135deg, #FD6648 0%, #08E1F4 100%)",
];

const FILAS = 4;
const porFila = Math.ceil(clientes.length / FILAS);

function LogoTile({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl p-5 md:h-28 md:w-48"
      style={{ background: BRAND_GRADS[index % BRAND_GRADS.length] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}

export default function Clientes() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Reveal>
        <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            +150 marcas
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Marcas que <span className="gradient-text">confían</span>
          </h2>
          <p className="mt-4 text-balance text-white/60">
            Marcas que han confiado en nosotros a lo largo de los años —
            clientes actuales y pasados de la agencia.
          </p>
        </div>
      </Reveal>

      <div className="relative flex flex-col gap-2">
        {/* fade en los bordes laterales */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent md:w-48" />
        {Array.from({ length: FILAS }, (_, fila) => (
          <Marquee
            key={fila}
            speed="slow"
            reverse={fila % 2 === 1}
            pauseOnHover
            repeat={3}
            className="[--gap:8px]"
          >
            {clientes
              .slice(fila * porFila, (fila + 1) * porFila)
              .map((src, i) => (
                <LogoTile key={src} src={src} index={fila * porFila + i} />
              ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
