"use client";

import GradientBar from "@/components/ui/GradientBar";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { waUrl, type Plan } from "@/lib/content";

// "The Studio 4" en los features enlaza a su web (estudio propio)
function linkStudio4(f: string) {
  const marca = "The Studio 4";
  const i = f.indexOf(marca);
  if (i === -1) return f;
  return (
    <>
      {f.slice(0, i)}
      <a
        href="https://thestudio4.io"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-white/30 underline-offset-2 transition hover:text-white hover:decoration-white"
        onClick={(e) => e.stopPropagation()}
      >
        {marca}
      </a>
      {f.slice(i + marca.length)}
    </>
  );
}

export default function PlanCard({
  cat,
  name,
  tagline,
  features,
  destacado,
  badge,
}: Plan) {
  return (
    <div
      data-cursor
      className={`relative h-full rounded-[2rem] p-[1.5px] transition duration-500 ${
        destacado ? "borde-firma-animado" : "bg-white/[0.12] hover-borde-firma"
      }`}
    >
      <div className="flex h-full flex-col rounded-[2rem] bg-[color:var(--deep-code)] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/85">
          {cat}
        </p>
        {badge && (
          <p
            className="mt-3 w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black"
            style={{ background: "var(--grad-firma)" }}
          >
            {badge}
          </p>
        )}
        <h3 className="mt-2 text-2xl font-bold">{name}</h3>
        <p className="mt-1 text-sm text-white/60">{tagline}</p>
        <GradientBar className="my-6" />
        <ul className="flex-1 space-y-3 text-sm text-white/80">
          {features.map((f) => (
            <li key={f} className="flex gap-2">
              <span style={{ color: "var(--cyber-cyan)" }}>›</span>
              <span>{linkStudio4(f)}</span>
            </li>
          ))}
        </ul>
        <LiquidButton
          size="lg"
          onClick={() =>
            window.open(
              waUrl(`Hola 1bite, me interesa el plan ${name} (${cat}).`),
              "_blank",
              "noopener",
            )
          }
          className="mt-8 w-full font-medium text-white"
        >
          Quiero este plan
        </LiquidButton>
        <button
          data-cursor
          onClick={() =>
            window.open(
              waUrl(
                `Hola 1bite, ¿me envían el detalle completo del plan ${name} (${cat})?`,
              ),
              "_blank",
              "noopener",
            )
          }
          className="mt-3 text-xs text-white/50 underline-offset-4 transition hover:text-white hover:underline"
        >
          Pide el detalle completo
        </button>
      </div>
    </div>
  );
}
