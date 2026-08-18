"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Turnstile, { TURNSTILE_SITE_KEY } from "@/components/ui/Turnstile";
import GradientBar from "@/components/ui/GradientBar";

const SUPABASE_FN =
  process.env.NEXT_PUBLIC_SUPABASE_FN ??
  "https://atxmxihxboswsewdbdgz.supabase.co/functions/v1";
const CUESTIONARIO_ENDPOINT =
  process.env.NEXT_PUBLIC_CUESTIONARIO_ENDPOINT ??
  `${SUPABASE_FN}/cuestionario-submit`;

type Estado = "idle" | "enviando" | "ok" | "error";

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus-visible:ring-2 focus-visible:ring-[#08E1F4]/60";

const optCls =
  "flex cursor-pointer items-start gap-3 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 transition hover:border-white/30 has-[:checked]:border-[#08e1f4]/70 has-[:checked]:bg-[#08e1f4]/[0.07]";

/* Definición declarativa del cuestionario: 9 bloques. */
type Campo =
  | { t: "radio" | "check"; name: string; opciones: { v: string; l: string; d?: string }[] }
  | { t: "text"; name: string; ph: string; tipo?: string }
  | { t: "area"; name: string; ph: string };

type Pregunta = { n: string; titulo: string; sub?: string; campos: Campo[] };

const PREGUNTAS: Pregunta[] = [
  {
    n: "01",
    titulo: "¿Qué vendes y a quién?",
    sub: "En una línea, como se lo dirías a un amigo.",
    campos: [
      { t: "area", name: "Que vende", ph: "Ej: repuestos industriales a empresas petroleras del Zulia" },
    ],
  },
  {
    n: "02",
    titulo: "¿Qué necesitas que haga la web?",
    sub: "Marca todo lo que aplique.",
    campos: [
      {
        t: "check",
        name: "Objetivo",
        opciones: [
          { v: "Vender productos online", l: "Vender productos online", d: "catálogo, carrito, pedidos" },
          { v: "Que me contacten / pidan cotizacion", l: "Que me contacten o pidan cotización" },
          { v: "Presencia institucional", l: "Presencia institucional, verse serio" },
          { v: "Mostrar portafolio o trabajos", l: "Mostrar portafolio o trabajos" },
          { v: "Agendar citas o reservas", l: "Agendar citas o reservas" },
          { v: "Un sistema interno", l: "Un sistema interno", d: "manejar clientes, pedidos, datos" },
        ],
      },
    ],
  },
  {
    n: "03",
    titulo: "¿Es web nueva o ya tienes una?",
    campos: [
      {
        t: "radio",
        name: "Nueva o rediseno",
        opciones: [
          { v: "Nueva, desde cero", l: "Nueva, desde cero" },
          { v: "Ya tengo, quiero rehacerla", l: "Ya tengo, quiero rehacerla" },
          { v: "Ya tengo, solo mejoras", l: "Ya tengo, solo mejoras" },
        ],
      },
      { t: "text", name: "Web actual", ph: "Si tienes, pega el link: https://", tipo: "url" },
    ],
  },
  {
    n: "04",
    titulo: "Si vas a vender online, ¿cómo quieres cobrar?",
    sub: "Si no vendes online, salta a la 05.",
    campos: [
      {
        t: "check",
        name: "Cobro",
        opciones: [
          { v: "Pedido por WhatsApp, pago manual", l: "Pedido por WhatsApp", d: "el pago se coordina aparte: Bs, Zelle, efectivo" },
          { v: "Tarjeta internacional (Stripe)", l: "Tarjeta internacional", d: "Stripe — vendo a USA o afuera" },
          { v: "Pago movil / transferencia venezolana", l: "Pago móvil o transferencia venezolana" },
          { v: "No vendo online", l: "No vendo online" },
        ],
      },
      { t: "text", name: "Cantidad de productos", ph: "¿Cuántos productos aprox.?" },
    ],
  },
  {
    n: "05",
    titulo: "¿Algo de esto lo necesitas?",
    sub: "Estas son las cosas que más cambian el presupuesto.",
    campos: [
      {
        t: "check",
        name: "Complejidad",
        opciones: [
          { v: "Login de usuarios / area privada", l: "Login de usuarios o área privada" },
          { v: "Panel para administrar el contenido", l: "Panel para administrar el contenido yo mismo" },
          { v: "Conectarse con un sistema que ya uso", l: "Conectarse con un sistema que ya uso", d: "ERP, Profit, Saint, CRM, facturación" },
          { v: "Blog", l: "Blog" },
          { v: "Version en ingles u otro idioma", l: "Versión en inglés u otro idioma" },
          { v: "Nada de esto", l: "Nada de esto" },
        ],
      },
    ],
  },
  {
    n: "06",
    titulo: "¿Cómo está tu marca?",
    campos: [
      {
        t: "radio",
        name: "Marca",
        opciones: [
          { v: "Logo y manual listos", l: "Logo y manual de marca listos" },
          { v: "Tengo logo, nada mas", l: "Tengo logo, nada más" },
          { v: "El logo esta debil", l: "El logo está débil, hay que rehacerlo" },
          { v: "No tengo marca todavia", l: "No tengo marca todavía" },
        ],
      },
    ],
  },
  {
    n: "07",
    titulo: "¿Textos y fotos los tienes?",
    campos: [
      {
        t: "radio",
        name: "Contenido",
        opciones: [
          { v: "Todo listo: textos y fotos", l: "Todo listo: textos y fotos" },
          { v: "Tengo fotos, faltan los textos", l: "Tengo fotos, faltan los textos" },
          { v: "Tengo textos, faltan las fotos", l: "Tengo textos, faltan las fotos" },
          { v: "No tengo nada, necesito ayuda", l: "No tengo nada, necesito ayuda" },
        ],
      },
    ],
  },
  {
    n: "08",
    titulo: "¿Para cuándo la necesitas?",
    campos: [
      {
        t: "radio",
        name: "Urgencia",
        opciones: [
          { v: "Ya, lo antes posible", l: "Ya, lo antes posible" },
          { v: "Proximo mes o dos", l: "Próximo mes o dos" },
          { v: "Fecha fija (evento, lanzamiento)", l: "Tengo fecha fija", d: "evento, lanzamiento, feria" },
          { v: "Sin apuro, estoy cotizando", l: "Sin apuro, estoy cotizando" },
        ],
      },
    ],
  },
];

export default function CuestionarioWeb() {
  const formRef = useRef<HTMLFormElement>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [msg, setMsg] = useState("");
  const [avance, setAvance] = useState(0);

  const totalBloques = useMemo(() => PREGUNTAS.length + 1, []);

  function recalcular() {
    const form = formRef.current;
    if (!form) return;
    let hechos = 0;
    for (const bloque of form.querySelectorAll("[data-bloque]")) {
      // El bloque de contacto solo cuenta completo con nombre y correo,
      // que son los que el backend exige.
      if (bloque.hasAttribute("data-bloque-contacto")) {
        const req = bloque.querySelectorAll<HTMLInputElement>("input[required]");
        if ([...req].every((c) => c.value.trim() !== "")) hechos++;
        continue;
      }
      const controles = bloque.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input, textarea",
      );
      for (const c of controles) {
        const marcado =
          c instanceof HTMLInputElement && (c.type === "checkbox" || c.type === "radio")
            ? c.checked
            : c.value.trim() !== "";
        if (marcado) {
          hechos++;
          break;
        }
      }
    }
    setAvance(Math.round((hechos / totalBloques) * 100));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Sin token no vale la pena el round-trip: el backend lo rechaza y el
    // usuario perdía el contexto. Se avisa en el sitio sin tocar el formulario.
    if (TURNSTILE_SITE_KEY && !String(fd.get("cf-turnstile-response") ?? "").trim()) {
      setEstado("error");
      setMsg("Falta la verificación de seguridad. Espera unos segundos a que termine y vuelve a enviar.");
      return;
    }

    setEstado("enviando");
    setMsg("");
    try {
      const res = await fetch(CUESTIONARIO_ENDPOINT, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error)
        throw new Error(data?.error || "No se pudo enviar. Intenta de nuevo.");
      setEstado("ok");
      formRef.current?.reset();
    } catch (err) {
      setEstado("error");
      // Reiniciar el captcha permite reintentar conservando las respuestas.
      window.turnstile?.reset?.();
      const bruto = err instanceof Error ? err.message : "Error inesperado.";
      setMsg(
        bruto.includes("anti-bot")
          ? "La verificación de seguridad expiró. Se reinició sola: espera un momento y vuelve a enviar. Tus respuestas siguen aquí."
          : bruto,
      );
    }
  }

  if (estado === "ok") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <p className="gradient-text text-3xl font-semibold">Recibido.</p>
        <p className="mt-4 text-white/70">
          Tenemos tu brief. Revisamos el alcance y te escribimos con una propuesta.
          Si el proyecto lo amerita, te proponemos una llamada de 20 minutos primero.
        </p>
        <a
          href="/"
          className="mt-8 inline-block text-sm text-[#08e1f4] transition hover:text-white"
        >
          Volver a 1bite.studio
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pb-32">
      {/* Encabezado */}
      <header className="border-b border-white/10 py-12 text-center">
        {/* Lockup: wordmark sin barra + GradientBar del sistema + servicios.
            No se usa 1bite-white-tagline.png porque su barra trae tapas
            blancas en los extremos. */}
        <a
          href="/"
          aria-label="1bite Studio"
          data-cursor
          className="mx-auto block w-[236px] sm:w-[268px]"
        >
          <Image
            src="/logos/1bite-white-nobar.png"
            alt="1bite"
            width={2872}
            height={1140}
            priority
            className="h-auto w-full"
          />
          <GradientBar className="mt-3" />
          <p className="mt-2.5 whitespace-nowrap text-center text-[9.5px] uppercase tracking-[0.22em] text-white/85">
            Branding · Social · Web · Apps
          </p>
        </a>
        <h1 className="gradient-text mt-10 text-4xl font-semibold tracking-tight sm:text-5xl">
          Cotiza tu web
        </h1>
        <p className="mt-3 text-sm text-white/60">
          9 preguntas. Menos de 2 minutos.
        </p>
        <div className="mt-7 h-[2px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full transition-[width] duration-500"
            style={{ width: `${avance}%`, background: "var(--grad-firma)" }}
          />
        </div>
      </header>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        onInput={recalcular}
        onChange={recalcular}
      >
        {PREGUNTAS.map((p) => (
          <section key={p.n} data-bloque className="border-b border-white/10 py-8">
            <p className="text-[11px] tracking-[0.2em] text-white/40">{p.n}</p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight">{p.titulo}</h2>
            {p.sub && <p className="mt-1 text-[13.5px] text-white/55">{p.sub}</p>}

            <div className="mt-5 grid gap-2.5">
              {p.campos.map((c) => {
                if (c.t === "area")
                  return (
                    <textarea
                      key={c.name}
                      name={c.name}
                      placeholder={c.ph}
                      rows={3}
                      className={inputCls}
                    />
                  );
                if (c.t === "text")
                  return (
                    <input
                      key={c.name}
                      type={c.tipo ?? "text"}
                      name={c.name}
                      placeholder={c.ph}
                      className={inputCls}
                    />
                  );
                return c.opciones.map((o) => (
                  <label key={o.v} className={optCls}>
                    <input
                      type={c.t === "check" ? "checkbox" : "radio"}
                      name={c.name}
                      value={o.v}
                      className="mt-[3px] h-4 w-4 shrink-0 accent-[#08e1f4]"
                    />
                    <span className="text-[15px] leading-snug">
                      {o.l}
                      {o.d && (
                        <small className="mt-0.5 block text-[12.5px] text-white/45">
                          {o.d}
                        </small>
                      )}
                    </span>
                  </label>
                ));
              })}
            </div>
          </section>
        ))}

        {/* 09 — captura de contacto */}
        <section
          data-bloque
          data-bloque-contacto
          className="border-b border-white/10 py-8"
        >
          <p className="text-[11px] tracking-[0.2em] text-white/40">09</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight">
            ¿A quién le mandamos la propuesta?
          </h2>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <input name="nombre" required placeholder="Tu nombre *" className={inputCls} />
            <input name="empresa" placeholder="Empresa o marca" className={inputCls} />
            <input
              name="email"
              type="email"
              required
              placeholder="Correo *"
              className={inputCls}
            />
            <input name="telefono" placeholder="WhatsApp" className={inputCls} />
          </div>
          <textarea
            name="Notas"
            rows={3}
            placeholder="¿Algo más que debamos saber? (opcional)"
            className={`${inputCls} mt-2.5`}
          />
        </section>

        <div className="pt-7">
          <Turnstile />
          {estado === "error" && (
            <p className="mb-4 text-sm text-[#fd6648]">{msg}</p>
          )}
          <LiquidButton
            type="submit"
            disabled={estado === "enviando"}
            className="w-full"
          >
            {estado === "enviando" ? "Enviando…" : "Enviar y recibir propuesta"}
          </LiquidButton>
          <p className="mt-5 text-center text-[13px] leading-relaxed text-white/50">
            Con esto te mandamos una propuesta con alcance y precio.
            <br />
            Si el proyecto es grande, te proponemos una llamada de 20 min primero.
          </p>
        </div>
      </form>
    </div>
  );
}
