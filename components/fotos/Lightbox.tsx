"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type LightboxItem = { id: string; url: string; nombre: string };

type Props = {
  items: LightboxItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  /** acciones extra (corazón, descarga) para la foto visible */
  acciones?: (item: LightboxItem) => ReactNode;
  /** bloque bajo la foto (p. ej. la nota del cliente) */
  extra?: (item: LightboxItem) => ReactNode;
};

const btnCls =
  "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08E1F4]/70 disabled:opacity-30";

export default function Lightbox({
  items,
  index,
  onIndex,
  onClose,
  acciones,
  extra,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const total = items.length;
  const item = items[index];
  const hayAnterior = index > 0;
  const haySiguiente = index < total - 1;

  // bloqueo de scroll + foco inicial + devolver foco al cerrar
  useEffect(() => {
    const previo = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflowPrevio = html.style.overflow;
    html.style.overflow = "hidden";
    cerrarRef.current?.focus();
    return () => {
      html.style.overflow = overflowPrevio;
      previo?.focus?.();
    };
  }, []);

  // teclado: ←/→/Esc + trap de foco
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // escribiendo una nota: las flechas mueven el cursor, Esc solo sale del campo
      const escribiendo =
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement;
      if (escribiendo && e.key !== "Tab") {
        if (e.key === "Escape") (e.target as HTMLElement).blur();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && hayAnterior) {
        e.preventDefault();
        onIndex(index - 1);
      } else if (e.key === "ArrowRight" && haySiguiente) {
        e.preventDefault();
        onIndex(index + 1);
      } else if (e.key === "Tab" && rootRef.current) {
        const f = rootRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], textarea:not([disabled])",
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, hayAnterior, haySiguiente, onClose, onIndex]);

  // precarga de las vecinas para que el paso sea instantáneo
  useEffect(() => {
    for (const i of [index - 1, index + 1]) {
      const it = items[i];
      if (it) new Image().src = it.url;
    }
  }, [index, items]);

  if (!item) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      // Lenis no debe mover la página de fondo mientras el visor está abierto
      data-lenis-prevent
      className="fixed inset-0 z-[90] flex flex-col bg-black"
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-[max(12px,env(safe-area-inset-top))] sm:px-6">
        <p
          className="min-w-0 truncate text-xs text-white/55"
          aria-live="polite"
        >
          <span className="tabular-nums text-white/80">
            {index + 1} / {total}
          </span>
          <span className="mx-2 text-white/25">·</span>
          {item.nombre}
        </p>
        <button
          ref={cerrarRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className={btnCls}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          toque.current = t ? { x: t.clientX, y: t.clientY } : null;
        }}
        onTouchEnd={(e) => {
          const ini = toque.current;
          toque.current = null;
          if (!ini) return;
          const t = e.changedTouches[0];
          if (!t) return;
          const dx = t.clientX - ini.x;
          const dy = t.clientY - ini.y;
          if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
          if (dx < 0 && haySiguiente) onIndex(index + 1);
          else if (dx > 0 && hayAnterior) onIndex(index - 1);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- host remoto R2, sin optimizador */}
        <img
          key={item.id}
          src={item.url}
          alt={item.nombre}
          draggable={false}
          className="max-h-full max-w-full select-none object-contain [-webkit-touch-callout:none]"
        />

        <button
          type="button"
          onClick={() => onIndex(index - 1)}
          disabled={!hayAnterior}
          aria-label="Foto anterior"
          className={`${btnCls} absolute left-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M15 5l-7 7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onIndex(index + 1)}
          disabled={!haySiguiente}
          aria-label="Foto siguiente"
          className={`${btnCls} absolute right-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {extra?.(item)}

      {/* barra inferior: flechas en móvil + acciones */}
      <div className="flex items-center justify-center gap-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
        <button
          type="button"
          onClick={() => onIndex(index - 1)}
          disabled={!hayAnterior}
          aria-label="Foto anterior"
          className={`${btnCls} sm:hidden`}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M15 5l-7 7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {acciones?.(item)}
        <button
          type="button"
          onClick={() => onIndex(index + 1)}
          disabled={!haySiguiente}
          aria-label="Foto siguiente"
          className={`${btnCls} sm:hidden`}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
