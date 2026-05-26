"use client";

import { useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";

type Cat = "fotos" | "reels" | "webs" | "branding";
type Media = { src: string; cat: Cat };

// Placeholders verticales (9:16) de Unsplash — reemplazar por medios reales.
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=540&h=960&fit=crop`;

const MEDIA: Media[] = [
  { src: U("1696086152504-4843b2106ab4"), cat: "fotos" },
  { src: U("1648688135643-2716ec8f4b24"), cat: "reels" },
  { src: U("1631984564919-1f6b2313a71c"), cat: "webs" },
  { src: U("1632168844625-b22d7b1053c0"), cat: "branding" },
  { src: U("1583656346517-4716a62e27b7"), cat: "fotos" },
  { src: U("1596480370804-cff0eed14888"), cat: "reels" },
  { src: U("1740711152088-88a009e877bb"), cat: "webs" },
  { src: U("1696086152508-1711cc7bcc9d"), cat: "branding" },
  { src: U("1684790369514-f292d2dffc11"), cat: "fotos" },
  { src: U("1631984564919-1f6b2313a71c"), cat: "reels" },
  { src: U("1648688135643-2716ec8f4b24"), cat: "webs" },
  { src: U("1632168844625-b22d7b1053c0"), cat: "branding" },
];

const TABS: { value: string; label: string }[] = [
  { value: "all", label: "Todo" },
  { value: "fotos", label: "Fotos" },
  { value: "reels", label: "Reels" },
  { value: "webs", label: "Webs" },
  { value: "branding", label: "Branding" },
];

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt={m.cat}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
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
