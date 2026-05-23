import Link from "next/link";
import { trabajos } from "@/lib/content";
import WorkCard from "@/components/cards/WorkCard";
import Reveal from "@/components/ui/Reveal";

export default function PruebaSocial() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-4xl font-bold md:text-5xl">Trabajos</h2>
          <Link
            href="/trabajos"
            data-cursor
            className="text-xs uppercase tracking-[0.2em] text-white/70 underline-offset-4 hover:underline"
          >
            Ver todos
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {trabajos.map((t, i) => (
          <div key={t.id} className={i % 2 === 1 ? "md:mt-16" : ""}>
            <WorkCard marca={t.marca} tipo={t.tipo} img={t.img} />
          </div>
        ))}
      </div>
    </section>
  );
}
