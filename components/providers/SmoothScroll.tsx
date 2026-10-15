"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // prefers-reduced-motion: scroll nativo, sin Lenis (ScrollTrigger funciona igual)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => ScrollTrigger.getAll().forEach((s) => s.kill());
    }

    // lerp 0.11: menos interpolación por frame que 0.09 (más barato) sin perder suavidad
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });

    // sincroniza ScrollTrigger con el scroll suave de Lenis
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // refresca medidas cuando todo cargó (imágenes/fuentes)
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    // <html> es h-full (alto fijo = viewport), así que el ResizeObserver interno
    // de Lenis nunca ve crecer la página. En vistas que cargan contenido después
    // (la galería /fotos tras el correo) Lenis se quedaba con el límite viejo y
    // bloqueaba la rueda. Se observa <body>, que sí crece.
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      gsap.ticker.remove(ticker);
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return <>{children}</>;
}
