"use client";

import { useEffect, useRef } from "react";

export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, string>) => string;
      remove: (id: string) => void;
    };
  }
}

let scriptLoaded: Promise<void> | null = null;
function loadScript() {
  if (!scriptLoaded) {
    scriptLoaded = new Promise((resolve) => {
      const s = document.createElement("script");
      s.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
  }
  return scriptLoaded;
}

/**
 * Widget Cloudflare Turnstile. Si NEXT_PUBLIC_TURNSTILE_SITE_KEY no está
 * configurada no renderiza nada y el backend tampoco exige el token.
 * El widget inserta el input hidden `cf-turnstile-response` dentro del form.
 */
export default function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!TURNSTILE_SITE_KEY || !el) return;
    let id: string | undefined;
    let cancelado = false;

    // El formulario vive al final de la home: cargar los ~80 KB del script de
    // Turnstile al montar compite con la hidratación y retrasa el primer
    // pintado. Se difiere hasta que el widget se acerca al viewport.
    const montar = () => {
      loadScript().then(() => {
        if (cancelado || !ref.current || !window.turnstile) return;
        id = window.turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
        });
      });
    };

    if (!("IntersectionObserver" in window)) {
      montar();
      return () => {
        cancelado = true;
        if (id && window.turnstile) window.turnstile.remove(id);
      };
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          obs.disconnect();
          montar();
        }
      },
      { rootMargin: "600px 0px" },
    );
    obs.observe(el);

    return () => {
      cancelado = true;
      obs.disconnect();
      if (id && window.turnstile) window.turnstile.remove(id);
    };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={ref} className="min-h-[65px]" />;
}
