"use client";

import { useEffect, useRef, useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";

type Cat = "fotos" | "reels" | "webs" | "branding";
type Media = { cat: Cat; src: string; type?: "video"; poster?: string };

// Placeholders verticales (9:16) de Unsplash para FOTOS — Vitto los reemplaza luego.
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=540&h=960&fit=crop`;

const FOTOS: Media[] = [
  "1696086152504-4843b2106ab4",
  "1583656346517-4716a62e27b7",
  "1684790369514-f292d2dffc11",
  "1696086152508-1711cc7bcc9d",
  "1632168844625-b22d7b1053c0",
  "1740711152088-88a009e877bb",
  "1631984564919-1f6b2313a71c",
  "1648688135643-2716ec8f4b24",
].map((id) => ({ cat: "fotos" as const, src: U(id) }));

// reel-01 (supermercado) retirado. 02..37 = 1bite, 38..61 = thestudio4 + 1pixel.
const REELS: Media[] = Array.from({ length: 60 }, (_, i) => {
  const n = String(i + 2).padStart(2, "0");
  return {
    cat: "reels" as const,
    type: "video" as const,
    src: `/galeria/reels/reel-${n}.mp4`,
    poster: `/galeria/posters/reel-${n}.webp`,
  };
});

const WEBS: Media[] = Array.from({ length: 16 }, (_, i) => ({
  cat: "webs" as const,
  src: `/galeria/webs/web-${String(i + 1).padStart(2, "0")}.webp`,
}));

const BRANDING: Media[] = Array.from({ length: 24 }, (_, i) => ({
  cat: "branding" as const,
  src: `/galeria/branding/brand-${String(i + 1).padStart(2, "0")}.webp`,
}));

// Intercala categorías para que "Todo" se vea variado.
function interleave(...lists: Media[][]): Media[] {
  const out: Media[] = [];
  const max = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < max; i++) {
    for (const l of lists) if (i < l.length) out.push(l[i]);
  }
  return out;
}

const MEDIA = interleave(REELS, BRANDING, WEBS, FOTOS);

const TABS: { value: string; label: string }[] = [
  { value: "all", label: "Todo" },
  { value: "fotos", label: "Fotos" },
  { value: "reels", label: "Reels" },
  { value: "webs", label: "Webs" },
  { value: "branding", label: "Branding" },
];

// Video que solo carga/reproduce cuando entra al viewport (perf: nada de 37 videos a la vez).
function ReelTile({ m }: { m: Media }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // Fija src imperativo antes de play() — evita play sobre <video> sin fuente.
          if (!el.src) {
            el.src = m.src;
            // play al tener datos (play() inmediato sobre src recién puesto se rechaza).
            el.addEventListener("canplay", () => el.play().catch(() => {}), {
              once: true,
            });
          }
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [m.src]);

  return (
    <video
      ref={ref}
      poster={m.poster}
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
    />
  );
}

export default function GaleriaGrid() {
  const [active, setActive] = useState("all");

  return (
    <section className="mx-auto flex min-h-[140vh] w-full max-w-6xl flex-col items-center gap-10 px-6 pb-28 pt-36 md:pt-44">
      {/* control segmentado Todo / Fotos / Reels / Webs / Branding */}
      <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1.5 backdrop-blur">
        {TABS.map((t) => {
          const on = active === t.value;
          return (
            <button
              key={t.value}
              data-cursor
              onClick={() => setActive(t.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium uppercase tracking-[0.15em] transition ${
                on
                  ? "text-[color:var(--deep-code)]"
                  : "text-white/70 hover:text-white"
              }`}
              style={on ? { background: "var(--grad-firma)" } : undefined}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <FlipReveal
        className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
        keys={[active]}
        showClass="block"
        hideClass="hidden"
      >
        {MEDIA.map((m, i) => (
          <FlipRevealItem key={i} flipKey={m.cat}>
            <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-white/5">
              {m.type === "video" ? (
                <ReelTile m={m} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.src}
                  alt={m.cat}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.2em] text-white/80">
                {m.cat}
              </span>
            </div>
          </FlipRevealItem>
        ))}
      </FlipReveal>
    </section>
  );
}
