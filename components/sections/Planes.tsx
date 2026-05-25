import { planes } from "@/lib/content";
import PlanCard from "@/components/cards/PlanCard";
import Reveal from "@/components/ui/Reveal";
import FluidBackground from "@/components/ui/FluidBackground";
import Parallax from "@/components/ui/Parallax";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Planes() {
  return (
    <section id="planes" className="relative overflow-hidden">
      <Parallax speed={0.15} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 scale-125 opacity-50">
          <FluidBackground src="/fondos/fondo-wide-3.png" />
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
        <div className="grid h-full grid-cols-1 items-start gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
          {planes.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <PlanCard {...p} />
            </Reveal>
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
}
