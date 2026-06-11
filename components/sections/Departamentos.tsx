"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { depts } from "@/lib/content";

// Fondo del card: imagen de trabajo real; con varias, crossfade cada 4s.
function DeptMedia({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);
  if (!images.length) return null;
  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`Trabajo de ${title} de 1bite`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* velo para que número y texto sigan legibles sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
    </>
  );
}

export default function Departamentos() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const t = track.current;
      if (!t) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        // progreso (0..1) que centra cada card en el viewport
        const cardEls = gsap.utils.toArray<HTMLElement>(
          t.querySelectorAll("[data-dept]"),
        );
        // distancia = centrar el ÚLTIMO card (scrollWidth ignora la cola en flex)
        const distance = () => {
          const last = cardEls[cardEls.length - 1];
          if (!last) return 0;
          return Math.max(
            0,
            last.offsetLeft + last.offsetWidth / 2 - window.innerWidth / 2,
          );
        };
        const snapPoints = () => {
          const dist = distance();
          if (dist <= 0) return [0];
          const pts = cardEls.map((el) =>
            gsap.utils.clamp(
              0,
              1,
              (el.offsetLeft + el.offsetWidth / 2 - window.innerWidth / 2) /
                dist,
            ),
          );
          return [0, ...pts];
        };
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            // recorrido = distancia del track (ya incluye cola para centrar el 5to)
            end: () => "+=" + distance(),
            // scrub:true sigue a Lenis 1:1 (más barato que el lerp extra de scrub:1)
            scrub: true,
            pin: true,
            anticipatePin: 1,
            // se detiene centrando cada card (intro + 5 departamentos, hasta Audiovisual)
            snap: {
              snapTo: (v) => {
                const pts = snapPoints();
                return pts.reduce((best, p) =>
                  Math.abs(p - v) < Math.abs(best - v) ? p : best,
                );
              },
              duration: 0.25,
              ease: "power1.inOut",
            },
          },
        });
        // recalcula cuando todo cargó
        const r = setTimeout(() => ScrollTrigger.refresh(), 300);
        return () => {
          clearTimeout(r);
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="departamentos" ref={root} className="relative overflow-hidden">
      <div
        ref={track}
        className="flex flex-col gap-6 px-6 py-24 will-change-transform md:h-screen md:flex-row md:items-center md:gap-10 md:px-[8vw] md:py-0"
      >
        <div className="shrink-0 md:w-[32vw] md:pr-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Lo que hacemos
          </p>
          <h2 className="mt-4 text-5xl font-bold leading-none md:text-7xl">
            Branding
            <br />
            Social
            <br />
            Web
            <br />
            Apps
            <br />
            Audiovisual
          </h2>
          <p className="mt-6 text-white/60 md:max-w-xs">
            Cinco departamentos, un solo sistema para hacer crecer tu marca.
          </p>
        </div>

        {depts.map((d, i) => (
          <Link
            key={d.id}
            href="/galeria"
            data-cursor
            data-dept
            aria-label={`${d.title} — ver galería de trabajos`}
            className="hover-borde-firma group relative shrink-0 rounded-3xl bg-white/10 p-[1.5px] md:h-[62vh] md:w-[28vw]"
          >
            <article className="relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#070707] p-8 md:p-10">
              {/* glow decorativo: hidden hasta hover para no pintar blur a opacity 0 */}
              <div
                className="absolute -inset-px -z-10 hidden opacity-0 blur-3xl transition duration-500 group-hover:block group-hover:opacity-30"
                style={{ background: "var(--grad-firma)" }}
              />
              <DeptMedia images={d.images} title={d.title} />
              <span className="relative z-10 text-6xl font-bold text-white/25">
                0{i + 1}
              </span>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold md:text-4xl">{d.title}</h3>
                <p className="mt-3 text-sm text-white/70">{d.desc}</p>
              </div>
            </article>
          </Link>
        ))}

        {/* cola final para que "Audiovisual" (5to) llegue al centro antes de soltar el pin */}
        <div aria-hidden className="hidden shrink-0 md:block md:w-[42vw]" />
      </div>
    </section>
  );
}
