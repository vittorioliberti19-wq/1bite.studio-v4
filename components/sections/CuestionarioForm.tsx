"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Turnstile, { TURNSTILE_SITE_KEY } from "@/components/ui/Turnstile";
import GradientBar from "@/components/ui/GradientBar";
import type { Pregunta } from "@/lib/cuestionarios";

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

export type CuestionarioProps = {
  /** Bloques del contenido. El último bloque (contacto) lo pone el motor. */
  preguntas: Pregunta[];
  titulo: string;
  /** Va al CRM como origen: cuestionario_<tipo>. */
  tipo: "web" | "app" | "landing" | "ecommerce" | "isp";
  /** Bajada bajo el título. Por defecto: "N preguntas. Menos de 2 minutos.". */
  sub?: string;
  /** Encabezado del último bloque. */
  contactoTitulo?: string;
  /** Texto del botón de envío. */
  cta?: string;
  /** Letra chica bajo el botón. */
  notaFinal?: React.ReactNode;
  /** Pantalla de confirmación. */
  okTitulo?: string;
  okTexto?: string;
};

export default function CuestionarioForm({
  preguntas,
  titulo,
  tipo,
  sub,
  contactoTitulo = "¿A quién le mandamos la propuesta?",
  cta = "Enviar y recibir propuesta",
  notaFinal,
  okTitulo = "Recibido.",
  okTexto = "Tenemos tu brief. Revisamos el alcance y te escribimos con una propuesta. Si el proyecto lo amerita, te proponemos una llamada de 20 minutos primero.",
}: CuestionarioProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [msg, setMsg] = useState("");
  const [avance, setAvance] = useState(0);
  // Valores marcados de cada grupo con tope, leídos del DOM: los checkboxes
  // no son controlados, pero necesitamos saber a cuál deshabilitar.
  const [marcados, setMarcados] = useState<Record<string, string[]>>({});

  const totalBloques = useMemo(() => preguntas.length + 1, [preguntas]);
  const camposUrl = useMemo(
    () =>
      preguntas.flatMap((p) =>
        p.campos.filter((c) => c.t === "text" && c.tipo === "url").map((c) => c.name),
      ),
    [preguntas],
  );

  // Nombres de los grupos con tope de selección.
  const grupoConTope = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of preguntas)
      for (const c of p.campos)
        if (c.t === "check" && c.max) m.set(c.name, c.max);
    return m;
  }, [preguntas]);

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

    if (grupoConTope.size) {
      const next: Record<string, string[]> = {};
      for (const name of grupoConTope.keys()) {
        next[name] = [
          ...form.querySelectorAll<HTMLInputElement>(
            `input[type="checkbox"][name="${CSS.escape(name)}"]:checked`,
          ),
        ].map((c) => c.value);
      }
      setMarcados(next);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("tipo", tipo);
    for (const name of camposUrl) {
      const v = String(fd.get(name) ?? "").trim();
      if (v && !/^https?:\/\//i.test(v)) fd.set(name, `https://${v}`);
    }

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
        <p className="gradient-text text-3xl font-semibold">{okTitulo}</p>
        <p className="mt-4 text-white/70">{okTexto}</p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-[#08e1f4] transition hover:text-white"
        >
          Volver a 1bite.studio
        </Link>
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
        <Link
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
        </Link>
        <h1 className="gradient-text mt-10 text-4xl font-semibold tracking-tight sm:text-5xl">
          {titulo}
        </h1>
        <p className="mt-3 text-sm text-white/60">
          {sub ?? `${totalBloques} preguntas. Menos de 2 minutos.`}
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
        {preguntas.map((p) => (
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
                      // Sin type="url": la validación nativa bloqueaba el
                      // submit en silencio si faltaba https://. Se normaliza
                      // en onSubmit.
                      type={c.tipo === "url" ? "text" : (c.tipo ?? "text")}
                      inputMode={c.tipo === "url" ? "url" : undefined}
                      name={c.name}
                      placeholder={c.ph}
                      className={inputCls}
                    />
                  );
                const tope = c.t === "check" ? c.max : undefined;
                const puestos = marcados[c.name] ?? [];
                const lleno = tope !== undefined && puestos.length >= tope;

                const grupo = c.opciones.map((o) => {
                  const bloqueada = lleno && !puestos.includes(o.v);
                  return (
                  <label
                    key={o.v}
                    className={`${optCls}${bloqueada ? " cursor-not-allowed opacity-40" : ""}`}
                  >
                    <input
                      type={c.t === "check" ? "checkbox" : "radio"}
                      name={c.name}
                      value={o.v}
                      disabled={bloqueada}
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
                  );
                });

                if (!c.label && tope === undefined) return grupo;
                return (
                  <div key={c.name} className="grid gap-2.5">
                    {(c.label || tope !== undefined) && (
                      <p className="mt-2 flex items-baseline justify-between gap-3 text-[13px] font-medium text-white/70">
                        <span>{c.label}</span>
                        {tope !== undefined && (
                          <span
                            className={
                              lleno ? "text-[#08e1f4]" : "text-white/45"
                            }
                          >
                            {puestos.length} de {tope}
                          </span>
                        )}
                      </p>
                    )}
                    {grupo}
                  </div>
                );
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
          <p className="text-[11px] tracking-[0.2em] text-white/40">
            {String(totalBloques).padStart(2, "0")}
          </p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight">
            {contactoTitulo}
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
            {estado === "enviando" ? "Enviando…" : cta}
          </LiquidButton>
          <p className="mt-5 text-center text-[13px] leading-relaxed text-white/50">
            {notaFinal ?? (
              <>
                Con esto te mandamos una propuesta con alcance y precio.
                <br />
                Si el proyecto es grande, te proponemos una llamada de 20 min primero.
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
