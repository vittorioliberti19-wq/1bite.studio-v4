import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md md:px-12">
      <Link
        href="/"
        className="flex items-center"
        data-cursor
        aria-label="1bite inicio"
      >
        <Image
          src="/logos/1bite-white.png"
          alt="1bite"
          width={3018}
          height={1301}
          priority
          className="h-7 w-auto"
        />
      </Link>
      <div className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-white/80 md:flex">
        <a href="/#departamentos">Servicios</a>
        <a href="/#planes">Planes</a>
        <Link href="/trabajos">Trabajos</Link>
        <a href="/#contacto">Contacto</a>
      </div>
      <a
        href="/#contacto"
        className="rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white hover:text-[color:var(--deep-code)]"
        data-cursor
      >
        Comienza
      </a>
    </nav>
  );
}
