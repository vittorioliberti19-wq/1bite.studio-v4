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

    // El elemento se dimensiona en su tamaño inicial (startW) vía CSS width fijo
    // y SOLO animamos transform (translate + scale). Nunca tocamos layout props.

    const ctx = gsap.context(() => {
      // estado de geometría calculado en refresh; el tween lee de aquí por frame
      const geo = {
        startW: 0,
        startX: 0, // centro X inicial (px)
        startY: 0, // centro Y inicial (px)
        endX: 0, // centro X final (px)
        endY: 0, // centro Y final (px)
        scale: 1, // endW / startW
      };

      const measure = () => {
        const w = window.innerWidth;
        const startW = Math.min(w * 0.56, 560);
        const endW = w < 768 ? 78 : 104;
        const pad = w < 768 ? 24 : 48;
        const endH = endW * (1302 / 3020);
        geo.startW = startW;
        geo.startX = w / 2;
        geo.startY = window.innerHeight * 0.46;
        geo.endX = pad + endW / 2;
        geo.endY = 16 + endH / 2;
        geo.scale = endW / startW;
        // left/top fijan el centro inicial (NO se animan, solo en refresh).
        // El scroll anima únicamente transform (x/y/scale) sobre esta base.
        // ancho fijo via CSS; transformOrigin centro para que scale no desplace
        gsap.set(el, {
          left: geo.startX,
          top: geo.startY,
          width: startW,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      };
      measure();

      gsap.to(el, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: () => window.innerHeight * 0.85,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        ease: "none",
        force3D: true,
        // solo transform: desplazamiento relativo al centro inicial + escala
        x: () => geo.endX - geo.startX,
        y: () => geo.endY - geo.startY,
        scale: () => geo.scale,
      });

      ScrollTrigger.addEventListener("refreshInit", measure);
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[60] will-change-transform"
    >
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
