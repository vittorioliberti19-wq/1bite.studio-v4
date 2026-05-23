"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { depts } from "@/lib/content";

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
        const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            // más recorrido = más scroll para ver los 4 puntos sin que se sienta brusco
            end: () => "+=" + distance() * 1.15,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // se detiene en cada card (intro + 4 departamentos)
            snap: {
              snapTo: 1 / depts.length,
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
        className="flex flex-col gap-6 px-6 py-24 md:h-screen md:flex-row md:items-center md:gap-10 md:px-[8vw] md:py-0"
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
          </h2>
          <p className="mt-6 text-white/60 md:max-w-xs">
            Cuatro departamentos, un solo sistema para hacer crecer tu marca.
          </p>
        </div>

        {depts.map((d, i) => (
          <article
            key={d.id}
            data-cursor
            className="group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-white/30 md:h-[62vh] md:w-[28vw] md:p-10"
          >
            <div
              className="absolute -inset-px -z-10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-30"
              style={{ background: "var(--grad-firma)" }}
            />
            <span className="text-6xl font-bold text-white/15">0{i + 1}</span>
            <div>
              <h3 className="text-3xl font-bold md:text-4xl">{d.title}</h3>
              <p className="mt-3 text-sm text-white/70">{d.desc}</p>
            </div>
          </article>
        ))}

        {/* spacer final para que "Apps" llegue al centro antes de soltar el pin */}
        <div aria-hidden className="hidden shrink-0 md:block md:w-[24vw]" />
      </div>
    </section>
  );
}
