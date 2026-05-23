"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FluidBackground from "@/components/ui/FluidBackground";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".hero-tag", {
        y: 24,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.from(".hero-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.3,
        ease: "back.out(2)",
      });

      // el fondo hace un leve zoom y la UI se desvanece al bajar
      gsap.to(".hero-fade", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
      gsap.to(".hero-bg", {
        scale: 1.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <h1 className="sr-only">1bite — Concebimos experiencias indelebles</h1>

      <FluidBackground
        className="hero-bg"
        src="/fondos/fondo-wide-1.png"
        priority
        objectPosition="center"
      />

      {/* puntos degradados descendentes (del manual) */}
      <div className="hero-dots hero-fade mb-6 flex flex-col items-center gap-3">
        {[10, 13, 16, 20, 26].map((s, i) => (
          <span
            key={i}
            className="hero-dot rounded-full"
            style={{
              width: s,
              height: s,
              border: "1.5px solid transparent",
              background:
                "linear-gradient(#000,#000) padding-box, var(--grad-firma) border-box",
            }}
          />
        ))}
      </div>

      {/* espacio reservado: el FlyingLogo (fixed) arranca aquí y vuela al header */}
      <div
        aria-hidden
        className="w-[78vw] max-w-3xl"
        style={{ aspectRatio: "3018 / 1301" }}
      />

      <p className="hero-tag hero-fade mt-8 max-w-xl text-balance text-base uppercase tracking-[0.35em] text-white/80 md:text-xl">
        Concebimos experiencias indelebles
      </p>
      <a
        href="#contacto"
        data-cursor
        className="hero-tag hero-fade mt-12 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:scale-105"
      >
        Comienza
      </a>

      <span className="hero-fade absolute bottom-8 text-xs uppercase tracking-[0.3em] text-white/40">
        Scroll · Branding · Social · Web · Apps
      </span>
    </section>
  );
}
