"use client";

import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { WHATSAPP_URL } from "@/lib/content";

export default function CTAFinal() {
  return (
    <section
      id="contacto"
      className="relative px-6 pt-32 pb-12 text-center md:pt-48 md:pb-16"
    >
      <h2 className="text-balance text-4xl font-bold md:text-7xl">
        ¿Listo para <span className="gradient-text">empezar?</span>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-white/70">
        Cuéntanos de tu marca y te armamos la propuesta.
      </p>
      <LiquidButton
        size="xxl"
        data-cursor
        onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener")}
        className="mt-12 font-medium text-white"
      >
        Comienza tu proyecto
      </LiquidButton>
    </section>
  );
}
