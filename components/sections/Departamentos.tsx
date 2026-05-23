import { depts } from "@/lib/content";
import DeptCard from "@/components/cards/DeptCard";
import Reveal from "@/components/ui/Reveal";

export default function Departamentos() {
  return (
    <section
      id="departamentos"
      className="mx-auto max-w-6xl px-6 py-24 md:py-32"
    >
      <Reveal>
        <h2 className="mb-12 text-center text-xs uppercase tracking-[0.4em] text-white/60">
          Branding · Social · Web · Apps
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {depts.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.1}>
            <DeptCard title={d.title} desc={d.desc} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
