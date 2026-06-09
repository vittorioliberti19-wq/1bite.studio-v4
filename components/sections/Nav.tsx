"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { WHATSAPP_URL } from "@/lib/content";

const LINKS = [
  { href: "/#departamentos", label: "Servicios" },
  { href: "/#planes", label: "Planes" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Nav({ flyingLogo = false }: { flyingLogo?: boolean }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // menú móvil: Escape cierra (devuelve foco al botón) + trap de foco dentro del panel
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>("a");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-[color:var(--deep-code)]/85 px-6 py-4 md:px-12">
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
      <nav
        aria-label="Navegación principal"
        className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-white/80 md:flex"
      >
        <Link href="/#departamentos">Servicios</Link>
        <Link href="/#planes">Planes</Link>
        <Link href="/trabajos">Trabajos</Link>
        <Link href="/#contacto">Contacto</Link>
      </nav>
      <div className="flex items-center gap-3">
        <LiquidButton
          size="sm"
          data-cursor
          onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener")}
          className="text-white"
        >
          Comienza
        </LiquidButton>
        <button
          ref={btnRef}
          type="button"
          data-cursor
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08E1F4]/70 md:hidden"
        >
          <span
            aria-hidden
            className={`block h-[2px] w-5 bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            aria-hidden
            className={`block h-[2px] w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            aria-hidden
            className={`block h-[2px] w-5 bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* panel móvil */}
      {open && (
        <div
          ref={panelRef}
          id="menu-movil"
          // cierre por delegación en captura: cualquier click en un link cierra el panel
          onClickCapture={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="fixed inset-x-0 top-[60px] bottom-0 z-40 bg-[color:var(--deep-code)]/95 md:hidden"
        >
          <nav
            aria-label="Menú móvil"
            className="flex flex-col gap-7 px-8 pt-12 text-lg uppercase tracking-[0.2em] text-white/90"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08E1F4]/70"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
