"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Logo único que arranca grande y centrado (hero) y, al hacer scroll,
 * vuela hacia arriba-izquierda encogiéndose hasta el lugar del header.
 * No hay otro logo en el nav: este es el que aterriza ahí.
 */
export default function FlyingLogo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const ASPECT = 1302 / 3020; // alto/ancho del logo

    const ctx = gsap.context(() => {
      const setStart = () => {
        const w = window.innerWidth;
        const startW = Math.min(w * 0.56, 560);
        gsap.set(el, {
          left: w / 2,
          top: window.innerHeight * 0.46,
          width: startW,
          xPercent: -50,
          yPercent: -50,
        });
      };
      setStart();

      gsap.to(el, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: () => window.innerHeight * 0.85,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        ease: "none",
        // posición final = donde va el logo del header
        left: () => {
          const pad = window.innerWidth < 768 ? 24 : 48;
          const endW = window.innerWidth < 768 ? 78 : 104;
          return pad + endW / 2;
        },
        top: 16 + ((window.innerWidth < 768 ? 78 : 104) * ASPECT) / 2,
        width: () => (window.innerWidth < 768 ? 78 : 104),
      });

      ScrollTrigger.addEventListener("refreshInit", setStart);
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[60]">
      <Image
        src="/logos/1bite-white.png"
        alt="1bite"
        width={3020}
        height={1302}
        priority
        className="h-auto w-full"
      />
    </div>
  );
}
