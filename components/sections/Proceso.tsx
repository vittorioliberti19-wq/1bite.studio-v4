import { proceso } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

export default function Proceso() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="mb-16 text-4xl font-bold md:text-5xl">
          Cómo trabajamos
        </h2>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-3">
        {proceso.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.12}>
            <div>
              <span className="gradient-text text-5xl font-bold">{p.n}</span>
              <h3 className="mt-3 text-2xl font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-white/70">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
