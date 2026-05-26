"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShaderBackground from "@/components/ui/shader-background";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

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
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <h1 className="sr-only">1bite — Concebimos experiencias indelebles</h1>

      <ShaderBackground className="hero-bg -z-10" />

      {/* espacio reservado: el FlyingLogo (fixed) arranca aquí y vuela al header */}
      <div
        aria-hidden
        className="w-[56vw] max-w-xl"
        style={{ aspectRatio: "2872 / 1140" }}
      />

      <LiquidButton
        size="xl"
        data-cursor
        onClick={() =>
          document
            .querySelector("#contacto")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="hero-tag hero-fade mt-12 font-medium text-white"
      >
        Comienza
      </LiquidButton>

      <span className="hero-fade absolute bottom-8 text-xs uppercase tracking-[0.25em] text-white/70">
        Branding · Social · Web · Apps · Audiovisual
      </span>
    </section>
  );
}
