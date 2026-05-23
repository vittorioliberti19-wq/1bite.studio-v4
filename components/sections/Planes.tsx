import { planes } from "@/lib/content";
import PlanCard from "@/components/cards/PlanCard";
import Reveal from "@/components/ui/Reveal";

export default function Planes() {
  return (
    <section id="planes" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Planes</h2>
          <p className="mt-3 text-white/60">Elige cómo construimos tu marca.</p>
        </div>
      </Reveal>
      <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
        {planes.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="h-full">
            <PlanCard {...p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
