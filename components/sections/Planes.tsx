import { garantias } from "@/lib/content";
import PlanesGrid from "@/components/sections/PlanesGrid";
import Reveal from "@/components/ui/Reveal";
import { Sparkles } from "@/components/ui/sparkles";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function Planes() {
  return (
    <section
      id="planes"
      className="relative isolate overflow-hidden pb-24 pt-32 md:pt-40"
    >
      {/* grid de líneas + sparkles cayendo, enmascarados al centro */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <Sparkles
          density={900}
          speed={1}
          color="#08E1F4"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>

      {/* anillo elíptico difuminado con la gama firma */}
      <div className="pointer-events-none absolute inset-x-0 top-[-114px] -z-10 h-[110vh] overflow-hidden">
        <div
          className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] rounded-full opacity-60"
          style={{
            border: "200px solid #086BFC",
            filter: "blur(92px)",
          }}
        />
        <div
          className="absolute left-[-568px] right-[-568px] top-24 h-[2053px] rounded-full opacity-40"
          style={{
            border: "160px solid #AC31FB",
            filter: "blur(110px)",
          }}
        />
      </div>

      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse
            containerClassName="justify-center"
          >
            Planes
          </VerticalCutReveal>
        </h2>
        <p className="mt-3 text-white/60">Elige cómo construimos tu marca.</p>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <PlanesGrid />
      </div>

      <Reveal>
        <div className="mx-auto mt-14 max-w-5xl px-6">
          <div className="relative flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-black/50 px-8 py-6 text-center md:flex-row md:gap-10">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={4}
            />
            {garantias.map((g) => (
              <p
                key={g}
                className="flex items-center gap-2 text-sm text-white/75"
              >
                <span className="gradient-text font-bold">✓</span>
                {g}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
