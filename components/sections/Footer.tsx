import Link from "next/link";
import GradientBar from "@/components/ui/GradientBar";
import { servicios } from "@/lib/servicios";

export default function Footer() {
  return (
    <footer className="px-6 py-16">
      <GradientBar className="mb-8" />
      <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-white/50">
        1bite es una agencia de marketing, branding y desarrollo web en
        Maracaibo, Venezuela. Concebimos experiencias indelebles desde 2016.
      </p>
      <nav className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-white/50">
        <Link href="/servicios" className="hover:text-white">
          Servicios
        </Link>
        {servicios.map((s) => (
          <Link
            key={s.slug}
            href={`/servicios/${s.slug}`}
            className="hover:text-white"
          >
            {s.nombre}
          </Link>
        ))}
        <Link href="/trabajos" className="hover:text-white">
          Trabajos
        </Link>
        <Link href="/blog" className="hover:text-white">
          Blog
        </Link>
        <Link href="/#planes" className="hover:text-white">
          Planes
        </Link>
        <Link href="/#contacto" className="hover:text-white">
          Contacto
        </Link>
      </nav>
      <div className="relative flex flex-col items-center gap-4 text-sm text-white/60 md:flex-row md:justify-between">
        <p>© 2026 1bite Studio · Maracaibo, Venezuela</p>
        {/* servicios centrados en la página (alineados con el botón glass) */}
        <p className="text-xs uppercase tracking-[0.2em] md:absolute md:left-1/2 md:-translate-x-1/2">
          Branding · Social · Web · Apps · Audiovisual
        </p>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com/1bite.studio" data-cursor>
            @1bite.studio
          </a>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            build v14
          </span>
        </div>
      </div>
    </footer>
  );
}
