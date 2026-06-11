import { garantias } from "@/lib/content";
import PlanesGrid from "@/components/sections/PlanesGrid";
import Reveal from "@/components/ui/Reveal";
import FluidBackground from "@/components/ui/FluidBackground";
import Parallax from "@/components/ui/Parallax";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Planes() {
  return (
    <section id="planes" className="relative overflow-hidden">
      <Parallax speed={0.15} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 scale-125 opacity-50">
          <FluidBackground src="/fondos/fondo-wide-3.webp" />
        </div>
      </Parallax>

      <ContainerScroll
        titleComponent={
          <div className="mb-4 text-center">
            <h2 className="text-4xl font-bold md:text-5xl">Planes</h2>
            <p className="mt-3 text-white/60">
              Elige cómo construimos tu marca.
            </p>
          </div>
        }
      >
        <PlanesGrid />
      </ContainerScroll>

      <Reveal>
        <div className="mx-auto -mt-10 max-w-5xl px-6 pb-24">
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-6 text-center md:flex-row md:gap-10">
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
