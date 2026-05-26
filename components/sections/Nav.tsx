"use client";

import Link from "next/link";
import Image from "next/image";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function Nav({ flyingLogo = false }: { flyingLogo?: boolean }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-[color:var(--deep-code)]/85 px-6 py-4 md:px-12">
      {flyingLogo ? (
        // en el home el logo lo provee <FlyingLogo/> (vuela del centro al header)
        <span aria-hidden className="block h-7 w-[78px] md:w-[104px]" />
      ) : (
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
      )}
      <div className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-white/80 md:flex">
        <a href="/#departamentos">Servicios</a>
        <a href="/#planes">Planes</a>
        <Link href="/trabajos">Trabajos</Link>
        <a href="/#contacto">Contacto</a>
      </div>
      <LiquidButton
        size="sm"
        data-cursor
        onClick={() => {
          window.location.href = "/#contacto";
        }}
        className="text-white"
      >
        Comienza
      </LiquidButton>
    </nav>
  );
}
