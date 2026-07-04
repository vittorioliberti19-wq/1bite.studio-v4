"use client";

import { useEffect, useState } from "react";
import { planes, waUrl } from "@/lib/content";

type Opcion = { label: string; next?: string; plan?: string };
type Nodo = { pregunta: string; opciones: Opcion[] };

const NODOS: Record<string, Nodo> = {
  start: {
    pregunta: "¿Qué necesita tu negocio hoy?",
    opciones: [
      { label: "Construir mi marca", next: "marca" },
      { label: "Redes sociales", next: "redes" },
      { label: "Una página web", next: "web" },
      { label: "Solo un logo", next: "logo" },
    ],
  },
  marca: {
    pregunta: "¿Tu negocio es gastronómico (restaurante, café, delivery)?",
    opciones: [
      { label: "Sí, es gastro", next: "gastro" },
      { label: "No, otro rubro", next: "marcaNivel" },
    ],
  },
  gastro: {
    pregunta: "¿Abres con delivery e Instagram como canal principal?",
    opciones: [
      { label: "Sí, a full", plan: "gastro-premium" },
      { label: "Algo más sencillo", plan: "gastro-esencial" },
    ],
  },
  marcaNivel: {
    pregunta: "¿Qué tan profundo quieres llegar?",
    opciones: [
      { label: "Identidad esencial lista para usar", plan: "esencial" },
      {
        label: "Sistema de marca completo con estrategia",
        plan: "estrategico",
      },
    ],
  },
  redes: {
    pregunta: "¿Qué nivel de producción buscas?",
    opciones: [
      { label: "Alto impacto para crecer fuerte", plan: "elite" },
      { label: "Máxima producción + automatización", plan: "enterprise" },
    ],
  },
  web: {
    pregunta: "¿Qué tipo de web necesitas?",
    opciones: [
      { label: "Una landing para lanzar o captar", plan: "web-landing" },
      { label: "Sitio corporativo completo", plan: "web-corporativo" },
      { label: "Tienda online", plan: "web-ecommerce" },
    ],
  },
  logo: {
    pregunta: "¿Ya tienes el nombre de tu marca?",
    opciones: [
      { label: "Sí, ya tengo nombre", plan: "logo" },
      { label: "No, también necesito el nombre", plan: "logo-naming" },
    ],
  },
};

export default function QuizPlanes() {
  const [abierto, setAbierto] = useState(false);
  const [nodo, setNodo] = useState("start");
  const [resultado, setResultado] = useState<string | null>(null);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  const cerrar = () => {
    setAbierto(false);
    setNodo("start");
    setResultado(null);
  };

  const plan = resultado ? planes.find((p) => p.id === resultado) : null;
  const actual = NODOS[nodo];

  return (
    <>
      <button
        data-cursor
        onClick={() => setAbierto(true)}
        className="rounded-full px-7 py-3 text-sm font-semibold text-[color:var(--deep-code)] shadow-lg transition hover:scale-105"
        style={{ background: "var(--grad-firma)" }}
      >
        ¿No sabes cuál elegir? Haz el test
      </button>

      {abierto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Test: qué plan necesito"
          className="fixed inset-0 z-[80] flex items-center justify-center p-6"
        >
          <button
            aria-label="Cerrar"
            onClick={cerrar}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="borde-firma-animado relative w-full max-w-md rounded-3xl p-[1.5px]">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-[#070707] p-8">
              <button
                data-cursor
                onClick={cerrar}
                aria-label="Cerrar test"
                className="absolute right-5 top-4 text-2xl leading-none text-white/50 hover:text-white"
              >
                ×
              </button>

              {!plan ? (
                <>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                    ¿Qué plan necesito?
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{actual.pregunta}</h3>
                  <div className="mt-6 flex flex-col gap-3">
                    {actual.opciones.map((o) => (
                      <button
                        key={o.label}
                        data-cursor
                        onClick={() =>
                          o.plan ? setResultado(o.plan) : setNodo(o.next!)
                        }
                        className="rounded-2xl border border-white/15 px-5 py-3 text-left text-sm text-white/85 transition hover:border-white/40 hover:bg-white/5"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                    Tu plan ideal · {plan.cat}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{plan.tagline}</p>
                  <ul className="mt-5 space-y-2 text-sm text-white/80">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex gap-2">
                        <span style={{ color: "var(--cyber-cyan)" }}>›</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waUrl(
                      `Hola 1bite, hice el test en la web y mi plan ideal es ${plan.name} (${plan.cat}). Quiero más información.`,
                    )}
                    target="_blank"
                    rel="noopener"
                    data-cursor
                    className="mt-7 block rounded-full bg-white px-6 py-3 text-center font-semibold text-black transition hover:opacity-90"
                  >
                    Hablemos de este plan
                  </a>
                  <button
                    data-cursor
                    onClick={() => {
                      setNodo("start");
                      setResultado(null);
                    }}
                    className="mt-3 w-full text-center text-xs text-white/50 hover:text-white"
                  >
                    Repetir el test
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
