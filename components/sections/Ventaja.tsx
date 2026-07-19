import Image from "next/image";
import { ventajas, testimonios } from "@/lib/content";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<string, React.ReactNode> = {
  app: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-7 w-7"
    >
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" strokeLinecap="round" />
    </svg>
  ),
  studio: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-7 w-7"
    >
      <rect x="2.5" y="6.5" width="14" height="11" rx="2" />
      <path d="M16.5 10.5l5-2.5v8l-5-2.5" strokeLinejoin="round" />
    </svg>
  ),
  gear: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-7 w-7"
    >
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <circle cx="12" cy="14" r="3.5" />
      <path d="M8 8l1.5-3h5L16 8" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-7 w-7"
    >
      <path
        d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function VentajaCard({ v }: { v: (typeof ventajas)[number] }) {
  const inner = (
    <div className="relative flex h-full flex-col rounded-3xl border border-white/20 bg-black/70 p-7">
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={4}
      />
      <span className="gradient-text">{ICONS[v.icon]}</span>
      <h3 className="mt-4 text-xl font-bold">{v.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
        {v.desc}
      </p>
      {v.logo && (
        <Image
          src={v.logo}
          alt="The Studio 4"
          width={140}
          height={52}
          className="mt-5 h-9 w-auto opacity-80"
        />
      )}
      {v.href && (
        <p className="mt-3 text-xs text-white/50 underline-offset-4 group-hover:text-white group-hover:underline">
          {v.id === "app" ? "Descárgala en el App Store →" : "Conócelo →"}
        </p>
      )}
    </div>
  );
  return v.href ? (
    <a
      data-cursor
      href={v.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function Ventaja() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          La ventaja 1bite
        </p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          Todo <span className="gradient-text">in-house</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/60">
          App, estudio y equipos propios. Menos intermediarios, más control
          sobre cada entrega.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ventajas.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.1} className="h-full">
            <VentajaCard v={v} />
          </Reveal>
        ))}
      </div>

      {/* Testimonios reales */}
      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {testimonios.map((t, i) => (
          <Reveal key={t.nombre} delay={i * 0.12} className="h-full">
            <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <span
                className="text-5xl leading-none bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--grad-firma)" }}
              >
                “
              </span>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.nombre}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.nombre}</p>
                  <p className="text-xs text-white/50">{t.cargo}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
