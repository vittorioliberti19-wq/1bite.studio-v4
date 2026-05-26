"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WorkCard({
  marca,
  tipo,
  img,
}: {
  marca: string;
  tipo: string;
  img: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // parallax fuerte: la imagen se desplaza dentro del marco
      gsap.fromTo(
        imgWrap.current,
        { yPercent: -16 },
        {
          yPercent: 16,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      // zoom + reveal al entrar
      gsap.fromTo(
        root.current,
        { scale: 0.92, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 88%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      data-cursor
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
    >
      {/* contenedor sobredimensionado para que el parallax no muestre bordes */}
      <div
        ref={imgWrap}
        className="absolute inset-0 -top-[16%] h-[132%] will-change-transform"
      >
        <Image
          src={img}
          alt={marca}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="scale-110 object-cover transition duration-700 group-hover:scale-125"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-5 left-5">
        <p className="text-xl font-bold">{marca}</p>
        <p className="text-sm text-white/70">{tipo}</p>
      </div>
    </div>
  );
}
