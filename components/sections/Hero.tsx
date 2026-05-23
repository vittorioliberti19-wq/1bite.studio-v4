"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FluidBackground from "@/components/ui/FluidBackground";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // intro
      gsap.from(".hero-logo", {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".hero-tag", {
        y: 24,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".hero-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.2,
        ease: "back.out(2)",
      });

      // scroll cinemático: pin + zoom del logo + zoom del fondo + fade
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        },
      });
      tl.to(".hero-logo", { scale: 2.4, opacity: 0, ease: "none" }, 0)
        .to(".hero-tag", { opacity: 0, y: -40, ease: "none" }, 0)
        .to(".hero-dots", { opacity: 0, y: -60, ease: "none" }, 0)
        .to(".hero-bg", { scale: 1.35, ease: "none" }, 0)
        .to(".hero-scrollcue", { opacity: 0, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <h1 className="sr-only">1bite — Concebimos experiencias indelebles</h1>

      <div className="hero-bg absolute inset-0 -z-10">
        <FluidBackground
          src="/fondos/fondo-1.png"
          priority
          objectPosition="center 60%"
        />
      </div>

      {/* puntos degradados descendentes (del manual de marca) */}
      <div className="hero-dots mb-6 flex flex-col items-center gap-3">
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

      <Image
        src="/logos/1bite-white.png"
        alt="1bite"
        width={3018}
        height={1301}
        priority
        className="hero-logo w-[78vw] max-w-3xl"
      />

      <p className="hero-tag mt-8 max-w-xl text-balance text-base uppercase tracking-[0.35em] text-white/80 md:text-xl">
        Concebimos experiencias indelebles
      </p>
      <a
        href="#contacto"
        data-cursor
        className="hero-tag mt-12 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:scale-105"
      >
        Comienza
      </a>

      <span className="hero-scrollcue absolute bottom-8 text-xs uppercase tracking-[0.3em] text-white/40">
        Scroll · Branding · Social · Web · Apps
      </span>
    </section>
  );
}
