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
    const hero = document.querySelector<HTMLElement>("[data-hero-logo-origin]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // El elemento se dimensiona en su tamaño inicial (startW) vía CSS width fijo
    // y SOLO animamos transform (translate + scale). Nunca tocamos layout props.

    let measure = () => {};
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

      measure = () => {
        const w = window.innerWidth;
        const heroBounds = hero?.getBoundingClientRect();
        const startW = Math.min(w * 0.42, 420);
        const endW = w < 768 ? 78 : 104;
        const pad = w < 768 ? 24 : 48;
        const endH = endW * (1140 / 2872);
        geo.startW = startW;
        // El shader está centrado en el hero, no en el viewport visible de Safari.
        // scrollY conserva ese origen al refrescar ScrollTrigger a mitad del vuelo.
        geo.startX = heroBounds ? heroBounds.left + heroBounds.width / 2 : w / 2;
        geo.startY = heroBounds
          ? heroBounds.top + window.scrollY + heroBounds.height / 2
          : window.innerHeight / 2;
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
        if (reducedMotion) {
          gsap.set(el, {
            x: geo.endX - geo.startX,
            y: geo.endY - geo.startY,
            scale: geo.scale,
          });
        }
      };
      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);

      // prefers-reduced-motion: logo directo en el header (estado final), sin vuelo
      if (reducedMotion) {
        gsap.set(".flying-bar", { opacity: 1 });
        return;
      }

      gsap.fromTo(el, { x: 0, y: 0, scale: 1 }, {
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

      // La raya degradada solo aparece cuando el logo aterriza en el header.
      gsap.fromTo(
        ".flying-bar",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: () => window.innerHeight * 0.62,
            end: () => window.innerHeight * 0.85,
            scrub: true,
          },
        },
      );

    }, ref);

    return () => {
      // ctx.revert() no toca el bus global de ScrollTrigger.
      ScrollTrigger.removeEventListener("refreshInit", measure);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label="1bite inicio"
      data-cursor
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="fixed z-[60] cursor-pointer will-change-transform"
      // estado inicial vía CSS para evitar flash gigante antes de que GSAP mida
      // (coincide con el centro del hero de 100vh antes de medir su geometría)
      style={{
        width: "min(42vw, 420px)",
        left: "50%",
        top: "50vh",
        transform: "translate(-50%, -50%)",
        transformOrigin: "50% 50%",
      }}
    >
      <Image
        src="/logos/1bite-white-nobar.png"
        alt="1bite"
        width={2872}
        height={1140}
        priority
        sizes="(max-width: 1000px) 42vw, 420px"
        className="h-auto w-full"
      />
      <div
        aria-hidden
        className="flying-bar absolute left-0 top-full mt-[10px] h-[8px] w-full rounded-full opacity-0"
        style={{ background: "var(--grad-firma)" }}
      />
    </div>
  );
}
