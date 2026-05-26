"use client";

import { ShaderAnimation } from "@/components/ui/shader-animation";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function CTAFinal() {
  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden px-6 py-32 text-center md:py-48"
    >
      <ShaderAnimation className="absolute inset-0 -z-10 h-full w-full" />
      {/* oscurece el shader para que el texto resalte */}
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <h2 className="text-balance text-4xl font-bold md:text-7xl">
        ¿Listo para empezar?
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-white/70">
        Cuéntanos de tu marca y te armamos la propuesta.
      </p>
      <LiquidButton
        size="xxl"
        data-cursor
        onClick={() =>
          window.open(
            "https://instagram.com/1bite.studio",
            "_blank",
            "noopener,noreferrer",
          )
        }
        className="mt-12 font-medium text-white"
      >
        Comienza tu proyecto
      </LiquidButton>
    </section>
  );
}
