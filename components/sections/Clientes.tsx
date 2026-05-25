import { clientes } from "@/lib/content";
import OrbitingLogos from "@/components/ui/OrbitingLogos";
import Reveal from "@/components/ui/Reveal";

export default function Clientes() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Reveal>
        <div className="mx-auto mb-4 max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            +150 marcas
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Marcas que <span className="gradient-text">confían</span>
          </h2>
          <p className="mt-4 text-balance text-white/60">
            Marcas que han confiado en nosotros a lo largo de los años —
            clientes actuales y pasados de la agencia.
          </p>
        </div>
      </Reveal>

      <div className="relative mt-6">
        {/* viñeta suave en los bordes del lienzo */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_55%,#000_85%)]" />
        <OrbitingLogos logos={clientes} />
      </div>
    </section>
  );
}
