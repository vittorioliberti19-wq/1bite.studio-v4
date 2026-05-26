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

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return <>{children}</>;
}
