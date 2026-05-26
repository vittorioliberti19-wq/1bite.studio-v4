"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // posición renderizada (con easing) y target (mouse real)
    let renderX = window.innerWidth / 2;
    let renderY = window.innerHeight / 2;
    let targetX = renderX;
    let targetY = renderY;
    let raf = 0;

    // lerp/easing suave estilo Cuberto
    const EASE = 0.18;
    // umbral en px: por debajo de esto el cursor ya "llegó" y paramos el rAF
    const THRESHOLD = 0.1;

    const render = () => {
      const dx = targetX - renderX;
      const dy = targetY - renderY;

      // si ya llegó, snap exacto, pinta una última vez y corta el loop (idle)
      if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) {
        renderX = targetX;
        renderY = targetY;
        el.style.transform = `translate(${renderX}px, ${renderY}px) translate(-50%, -50%)`;
        raf = 0;
        return;
      }

      renderX += dx * EASE;
      renderY += dy * EASE;
      el.style.transform = `translate(${renderX}px, ${renderY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // reanuda el loop solo si está detenido
      if (!raf) raf = requestAnimationFrame(render);
    };
    const grow = () => el.classList.add("cursor--grow");
    const shrink = () => el.classList.remove("cursor--grow");

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(render);

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor]"),
    );
    targets.forEach((n) => {
      n.addEventListener("mouseenter", grow);
      n.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      targets.forEach((n) => {
        n.removeEventListener("mouseenter", grow);
        n.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-6 w-6 rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 ease-out [&.cursor--grow]:h-14 [&.cursor--grow]:w-14 md:block"
    />
  );
}
