"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";

type Cat = "reels" | "webs" | "branding";
type Media = { cat: Cat; src: string; type?: "video"; poster?: string };

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

const WEBS: Media[] = Array.from({ length: 32 }, (_, i) => ({
  cat: "webs" as const,
  src: `/galeria/webs/web-${String(i + 1).padStart(2, "0")}.webp`,
}));

const BRANDING: Media[] = Array.from({ length: 131 }, (_, i) => ({
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

const MEDIA = interleave(REELS, BRANDING, WEBS);

const TABS: { value: string; label: string }[] = [
  { value: "all", label: "Todo" },
  { value: "reels", label: "Reels" },
  { value: "webs", label: "Webs" },
  { value: "branding", label: "Branding" },
];

// No video request until the visitor chooses to watch a reel.
function ReelTile({ m, prioridad }: { m: Media; prioridad: boolean }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="h-full w-full">
      <Image
        src={m.poster!}
        alt="Reel del portafolio de 1bite"
        width={540}
        height={960}
        sizes="(max-width: 767px) 50vw, 33vw"
        loading={prioridad ? "eager" : "lazy"}
        fetchPriority={prioridad ? "high" : "auto"}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      {playing ? (
        <ReelVideo m={m} />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Reproducir reel del portafolio"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-black/60 text-xl">▶</span>
          <span className="rounded-full bg-black/70 px-3 py-1 text-xs">Ver reel</span>
        </button>
      )}
    </div>
  );
}

function ReelVideo({ m }: { m: Media }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.1 });
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    observer.observe(video);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={m.src}
      poster={m.poster}
      controls
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label="Reel del portafolio de 1bite"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

// Montar los 231 tiles de una vez saturaba el hilo principal (Lighthouse no
// llegaba a medir: el CPU nunca quedaba ocioso). Se renderizan por tandas y se
// amplía al llegar al final del grid.
const TANDA = 24;

export default function GaleriaGrid() {
  const [active, setActive] = useState("all");
  const [limite, setLimite] = useState(TANDA);
  const centinela = useRef<HTMLDivElement>(null);

  const filtered = active === "all" ? MEDIA : MEDIA.filter((item) => item.cat === active);

  // El centinela solo se arma después de que el usuario se mueva. Sin esta
  // condición se dispara en cascada con la página quieta (la sección mide
  // 140vh, así que el centinela nace dentro del margen) y termina bajando toda
  // la galería sin que nadie la haya pedido.
  const [huboScroll, setHuboScroll] = useState(false);
  useEffect(() => {
    if (huboScroll) return;
    const marcar = () => setHuboScroll(true);
    const opts = { once: true, passive: true } as const;
    // Layout/Flip changes can generate scroll events without user intent.
    // Clicking a filter must not arm the next batch during its animation.
    const withKeyboard = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) marcar();
    };
    window.addEventListener("wheel", marcar, opts);
    window.addEventListener("touchmove", marcar, opts);
    window.addEventListener("keydown", withKeyboard);
    return () => {
      window.removeEventListener("wheel", marcar);
      window.removeEventListener("touchmove", marcar);
      window.removeEventListener("keydown", withKeyboard);
    };
  }, [huboScroll]);

  useEffect(() => {
    const el = centinela.current;
    if (!el || !huboScroll || limite >= filtered.length) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting)
          setLimite((n) => Math.min(n + TANDA, filtered.length));
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [limite, huboScroll, filtered.length]);

  const visibles = filtered.slice(0, limite);

  return (
    <section className="mx-auto flex min-h-[140vh] w-full max-w-6xl flex-col items-center gap-10 px-6 pb-28 pt-36 md:pt-44">
      <header className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold md:text-5xl">Trabajos de 1bite Studio</h1>
        <p className="mt-5 text-base leading-relaxed text-white/70">
          Explora nuestra selección de branding, diseño web y producción audiovisual.
          Desde Maracaibo, Venezuela, conectamos la identidad de cada marca con sus experiencias digitales y su contenido.
        </p>
        <nav aria-label="Servicios de la galería" className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/80 underline underline-offset-4">
          <Link href="/servicios/branding">Identidad de marca</Link>
          <Link href="/servicios/paginas-web">Diseño de páginas web</Link>
          <Link href="/servicios/produccion-audiovisual">Producción audiovisual</Link>
        </nav>
      </header>
      {/* control segmentado Todo / Reels / Webs / Branding */}
      <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1.5 backdrop-blur">
        {TABS.map((t) => {
          const on = active === t.value;
          return (
            <button
              key={t.value}
              data-cursor
              aria-pressed={on}
              onClick={() => { setActive(t.value); setLimite(TANDA); setHuboScroll(false); }}
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
        {visibles.map((m, i) => (
          <FlipRevealItem
            key={m.src}
            flipKey={m.cat}
            className={active === "all" || active === m.cat ? "block" : "hidden"}
          >
            <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-white/5">
              {m.type === "video" ? (
                <ReelTile m={m} prioridad={i === 0} />
              ) : (
                <Image
                  src={m.src}
                  alt={`Trabajo de ${m.cat} del portafolio de 1bite`}
                  width={540}
                  height={960}
                  sizes="(max-width: 767px) 50vw, 33vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="pointer-events-none absolute bottom-3 left-3 text-xs uppercase tracking-[0.2em] text-white/80">
                {m.cat}
              </span>
            </div>
          </FlipRevealItem>
        ))}
      </FlipReveal>

      {limite < filtered.length && (
        <div ref={centinela} aria-hidden className="h-px w-full" />
      )}
    </section>
  );
}
