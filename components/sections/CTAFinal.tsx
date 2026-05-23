import FluidBackground from "@/components/ui/FluidBackground";

export default function CTAFinal() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden px-6 py-32 text-center md:py-48"
    >
      <FluidBackground src="/fondos/fondo-4.png" />
      <h2 className="text-balance text-4xl font-bold md:text-7xl">
        ¿Listo para empezar?
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-white/70">
        Cuéntanos de tu marca y te armamos la propuesta.
      </p>
      <a
        href="https://instagram.com/1bite.studio"
        data-cursor
        className="mt-12 inline-block rounded-full bg-white px-10 py-4 font-medium text-[color:var(--deep-code)] transition hover:scale-105"
      >
        Comienza tu proyecto
      </a>
    </section>
  );
}
