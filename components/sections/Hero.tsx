import FluidBackground from "@/components/ui/FluidBackground";
import GradientBar from "@/components/ui/GradientBar";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <FluidBackground
        src="/fondos/fondo-1.png"
        priority
        objectPosition="center 65%"
      />
      <h1 className="text-[26vw] font-bold leading-none tracking-tighter md:text-[14vw]">
        1bite
      </h1>
      <GradientBar className="mt-4 w-[60vw] max-w-md" />
      <p className="mt-8 max-w-xl text-balance text-base uppercase tracking-[0.35em] text-white/80 md:text-xl">
        Concebimos experiencias indelebles
      </p>
      <a
        href="#contacto"
        data-cursor
        className="mt-12 rounded-full bg-white px-8 py-4 font-medium text-[color:var(--deep-code)] transition hover:scale-105"
      >
        Comienza
      </a>
      <span className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-white/40">
        Branding · Social · Web · Apps
      </span>
    </section>
  );
}
