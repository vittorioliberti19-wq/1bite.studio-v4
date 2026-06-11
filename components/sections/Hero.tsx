"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShaderBackground from "@/components/ui/shader-background";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { WHATSAPP_URL } from "@/lib/content";

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
        onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener")}
        className="hero-tag hero-fade mt-12 font-medium text-white"
      >
        Comienza
      </LiquidButton>

      {/* h1 visible (mismo diseño del strip); la marca completa queda en sr-only */}
      <h1 className="hero-fade absolute bottom-8 text-xs font-normal uppercase tracking-[0.25em] text-white/70">
        <span className="sr-only">
          1bite — Concebimos experiencias indelebles:{" "}
        </span>
        Branding · Social · Web · Apps · Audiovisual
        <span className="mt-2 block text-[10px] tracking-[0.3em] text-white/50">
          Agencia creativa en Maracaibo, Venezuela
        </span>
      </h1>
    </section>
  );
}
