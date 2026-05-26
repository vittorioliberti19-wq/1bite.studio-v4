"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FluidBackground from "@/components/ui/FluidBackground";
import Parallax from "@/components/ui/Parallax";

const LINEA_1 = "Tu marca no necesita otro post.".split(" ");
const LINEA_2 = "Necesita una".split(" ");
const LINEA_3 = "que venda por ti.".split(" ");

export default function Promesa() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".promesa-word",
        { opacity: 0.12, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 1,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden py-32 md:py-56">
      <Parallax speed={0.18} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 scale-125 opacity-70">
          <FluidBackground src="/fondos/fondo-wide-2.webp" />
        </div>
      </Parallax>
      <h2 className="mx-auto max-w-5xl px-6 text-3xl font-bold leading-tight md:text-6xl">
        {LINEA_1.map((w, i) => (
          <span key={`a${i}`} className="promesa-word inline-block">
            {w}&nbsp;
          </span>
        ))}{" "}
        {LINEA_2.map((w, i) => (
          <span key={`b${i}`} className="promesa-word inline-block">
            {w}&nbsp;
          </span>
        ))}
        <span className="promesa-word gradient-text inline-block">
          experiencia&nbsp;indeleble&nbsp;
        </span>
        {LINEA_3.map((w, i) => (
          <span key={`c${i}`} className="promesa-word inline-block">
            {w}&nbsp;
          </span>
        ))}
      </h2>
    </section>
  );
}
