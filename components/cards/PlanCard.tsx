"use client";

import GradientBar from "@/components/ui/GradientBar";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { WHATSAPP_URL, type Plan } from "@/lib/content";

export default function PlanCard({
  cat,
  name,
  tagline,
  features,
  destacado,
}: Plan) {
  return (
    <div
      data-cursor
      className={`relative h-full rounded-[2rem] p-[1.5px] transition duration-500 hover:scale-[1.02] ${
        destacado ? "borde-firma-animado" : "bg-white/[0.12] hover-borde-firma"
      }`}
    >
      <div className="flex h-full flex-col rounded-[2rem] bg-[color:var(--deep-code)] p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          {cat}
        </p>
        <h3 className="mt-2 text-2xl font-bold">{name}</h3>
        <p className="mt-1 text-sm text-white/60">{tagline}</p>
        <GradientBar className="my-6" />
        <ul className="flex-1 space-y-3 text-sm text-white/80">
          {features.map((f) => (
            <li key={f} className="flex gap-2">
              <span style={{ color: "var(--cyber-cyan)" }}>›</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <LiquidButton
          size="lg"
          onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener")}
          className="mt-8 w-full font-medium text-white"
        >
          Quiero este plan
        </LiquidButton>
      </div>
    </div>
  );
}
