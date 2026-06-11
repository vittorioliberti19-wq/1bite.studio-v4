"use client";

import { useState } from "react";
import { planes, grupoPlanes, type Plan } from "@/lib/content";
import PlanCard from "@/components/cards/PlanCard";
import QuizPlanes from "@/components/ui/QuizPlanes";

export default function PlanesGrid() {
  const [grupo, setGrupo] = useState<Plan["grupo"]>("social");
  const visibles = planes.filter((p) => p.grupo === grupo);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <div
          role="tablist"
          aria-label="Categorías de planes"
          className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1.5"
        >
          {grupoPlanes.map((g) => {
            const on = grupo === g.value;
            return (
              <button
                key={g.value}
                role="tab"
                aria-selected={on}
                data-cursor
                onClick={() => setGrupo(g.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition ${
                  on
                    ? "text-[color:var(--deep-code)]"
                    : "text-white/70 hover:text-white"
                }`}
                style={on ? { background: "var(--grad-firma)" } : undefined}
              >
                {g.label}
              </button>
            );
          })}
        </div>
        <QuizPlanes />
      </div>

      <div className="flex flex-1 flex-wrap items-stretch justify-center gap-4 overflow-y-auto">
        {visibles.map((p) => (
          <div key={p.id} className="w-full sm:w-[320px] lg:w-[280px]">
            <PlanCard {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}
