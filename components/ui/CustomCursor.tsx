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
    // Delegación en document: cubre elementos creados después del montaje
    // (menú móvil, modales, tiles paginados, navegación cliente).
    const SEL = "a, button, [data-cursor]";
    const over = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(SEL)) el.classList.add("cursor--grow");
    };
    const out = (e: MouseEvent) => {
      const from = (e.target as Element | null)?.closest?.(SEL);
      if (!from) return;
      const to = e.relatedTarget as Element | null;
      if (!to || !from.contains(to)) el.classList.remove("cursor--grow");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
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
