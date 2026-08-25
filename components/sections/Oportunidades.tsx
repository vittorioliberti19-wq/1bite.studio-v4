"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Turnstile from "@/components/ui/Turnstile";
import GradientBar from "@/components/ui/GradientBar";
import {
  DISPONIBILIDADES,
  EXPERIENCIAS,
  HERRAMIENTAS,
  MODALIDADES,
  PERFILES,
} from "@/lib/perfiles";

const SUPABASE_FN =
  process.env.NEXT_PUBLIC_SUPABASE_FN ??
  "https://atxmxihxboswsewdbdgz.supabase.co/functions/v1";
const VACANTE_ENDPOINT =
  process.env.NEXT_PUBLIC_VACANTE_ENDPOINT ?? `${SUPABASE_FN}/vacante-submit`;

type Estado = "idle" | "enviando" | "ok" | "error";

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus-visible:ring-2 focus-visible:ring-[#08E1F4]/60";

const optCls =
  "flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.03] px-3.5 py-2.5 text-sm transition hover:border-white/30 has-[:checked]:border-[#08e1f4]/70 has-[:checked]:bg-[#08e1f4]/[0.07]";

const fileCls =
  "block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-white/20";

function Bloque({
  n,
  titulo,
  sub,
  children,
}: {
  n: string;
  titulo: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/10 py-8">
      <p className="text-[11px] tracking-[0.2em] text-white/40">{n}</p>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight">{titulo}</h2>
      {sub && <p className="mt-1 text-[13.5px] text-white/55">{sub}</p>}
      <div className="mt-5 grid gap-3">{children}</div>
    </section>
  );
}

export default function Oportunidades() {
  const formRef = useRef<HTMLFormElement>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [msg, setMsg] = useState("");
  const [perfil, setPerfil] = useState("");
  const [enlaces, setEnlaces] = useState<string[]>([""]);

  const herramientas = perfil ? (HERRAMIENTAS[perfil] ?? []) : [];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setMsg("");
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch(VACANTE_ENDPOINT, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error)
        throw new Error(data?.error || "No se pudo enviar. Intenta de nuevo.");
      setEstado("ok");
      formRef.current?.reset();
      setPerfil("");
      setEnlaces([""]);
    } catch (err) {
      setEstado("error");
      setMsg(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <p className="gradient-text text-3xl font-semibold">
          Postulación recibida.
        </p>
        <p className="mt-4 text-white/70">
          Tu CV ya está con nuestro equipo de RRHH. Si tu perfil encaja con una
          vacante abierta —o con una que se abra pronto— te escribimos.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            data-cursor
            onClick={() => setEstado("idle")}
            className="text-sm text-white/70 underline underline-offset-4 transition hover:text-white"
          >
            Enviar otra postulación
          </button>
          <a
            href="/"
            className="text-sm text-[#08e1f4] transition hover:text-white"
          >
            Volver a 1bite.studio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pb-32">
      <header className="border-b border-white/10 py-12 text-center">
        {/* Lockup: wordmark sin barra + GradientBar del sistema.
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
          Trabaja con nosotros
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Déjanos tu CV y tu portafolio. Guardamos tu perfil en nuestra base de
          talento y te contactamos cuando abra una vacante que encaje.
        </p>
      </header>

      <form ref={formRef} onSubmit={onSubmit}>
        <Bloque
          n="01"
          titulo="¿Qué perfil eres?"
          sub="Elige el que mejor te describe."
        >
          <select
            name="puesto"
            required
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
            aria-label="Perfil"
            className={inputCls}
          >
            <option value="" disabled>
              Selecciona un perfil…
            </option>
            {PERFILES.map((p) => (
              <option key={p} value={p} className="bg-[#001422]">
                {p}
              </option>
            ))}
          </select>
          {perfil === "Otro" && (
            <input
              name="puesto_otro"
              required
              placeholder="¿Qué haces? Ej: productor de eventos"
              aria-label="Especifica tu perfil"
              className={inputCls}
            />
          )}
        </Bloque>

        <Bloque n="02" titulo="¿Cómo te contactamos?">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="nombre"
              required
              placeholder="Nombre completo"
              aria-label="Nombre completo"
              className={inputCls}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Correo"
              aria-label="Correo"
              className={inputCls}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="telefono"
              placeholder="Teléfono / WhatsApp"
              aria-label="Teléfono o WhatsApp"
              className={inputCls}
            />
            <input
              name="ciudad"
              placeholder="Ciudad y país"
              aria-label="Ciudad y país"
              className={inputCls}
            />
          </div>
        </Bloque>

        <Bloque n="03" titulo="¿Cómo quieres trabajar?">
          <div className="grid gap-2.5 sm:grid-cols-3">
            {MODALIDADES.map((m) => (
              <label key={m} className={optCls}>
                <input
                  type="radio"
                  name="modalidad"
                  value={m}
                  className="accent-[#08e1f4]"
                />
                {m}
              </label>
            ))}
          </div>
        </Bloque>

        <Bloque n="04" titulo="¿Cuánta experiencia tienes en ese rol?">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {EXPERIENCIAS.map((x) => (
              <label key={x} className={optCls}>
                <input
                  type="radio"
                  name="experiencia"
                  value={x}
                  className="accent-[#08e1f4]"
                />
                {x}
              </label>
            ))}
          </div>
        </Bloque>

        {herramientas.length > 0 && (
          <Bloque
            n="05"
            titulo="¿Qué manejas?"
            sub="Marca todo lo que domines de verdad."
          >
            <div className="grid gap-2.5 sm:grid-cols-2">
              {herramientas.map((h) => (
                <label key={h} className={optCls}>
                  <input
                    type="checkbox"
                    name="herramientas"
                    value={h}
                    className="accent-[#08e1f4]"
                  />
                  {h}
                </label>
              ))}
            </div>
          </Bloque>
        )}

        <Bloque
          n={herramientas.length > 0 ? "06" : "05"}
          titulo="Disponibilidad y aspiración"
          sub="La aspiración es en USD mensuales. Sé realista, nos ahorra tiempo a los dos."
        >
          <div className="grid gap-2.5 sm:grid-cols-2">
            {DISPONIBILIDADES.map((d) => (
              <label key={d} className={optCls}>
                <input
                  type="radio"
                  name="disponibilidad"
                  value={d}
                  className="accent-[#08e1f4]"
                />
                {d}
              </label>
            ))}
          </div>
          <input
            name="aspiracion_usd"
            inputMode="numeric"
            placeholder="Aspiración mensual en USD (ej: 350)"
            aria-label="Aspiración salarial mensual en USD"
            className={inputCls}
          />
        </Bloque>

        <Bloque
          n={herramientas.length > 0 ? "07" : "06"}
          titulo="Tu trabajo"
          sub="El CV es obligatorio. PDF, JPG, PNG o WEBP."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cv"
                className="mb-1.5 block text-xs text-white/60"
              >
                CV *
              </label>
              <input
                id="cv"
                name="cv"
                type="file"
                required
                accept=".pdf,image/jpeg,image/png,image/webp"
                className={fileCls}
              />
            </div>
            <div>
              <label
                htmlFor="portafolio"
                className="mb-1.5 block text-xs text-white/60"
              >
                Portafolio (si aplica)
              </label>
              <input
                id="portafolio"
                name="portafolio"
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp"
                className={fileCls}
              />
            </div>
          </div>
          <div className="grid gap-2.5">
            <p className="text-xs text-white/60">
              Enlaces a tu trabajo. Agrega los que quieras: Behance, Drive,
              YouTube, Vimeo, TikTok, IG, LinkedIn, GitHub…
            </p>
            {enlaces.map((valor, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  name="enlaces"
                  value={valor}
                  onChange={(e) =>
                    setEnlaces((prev) =>
                      prev.map((v, j) => (j === i ? e.target.value : v)),
                    )
                  }
                  placeholder={
                    i === 0
                      ? "https://behance.net/tu-perfil"
                      : "https://youtube.com/watch?v=…"
                  }
                  aria-label={`Enlace ${i + 1}`}
                  className={inputCls}
                />
                {enlaces.length > 1 && (
                  <button
                    type="button"
                    data-cursor
                    aria-label={`Quitar enlace ${i + 1}`}
                    onClick={() =>
                      setEnlaces((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="shrink-0 rounded-lg border border-white/15 px-3 py-2.5 text-sm text-white/60 transition hover:border-white/35 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              data-cursor
              onClick={() => setEnlaces((prev) => [...prev, ""])}
              className="justify-self-start text-sm text-[#08e1f4] transition hover:text-white"
            >
              + Agregar otro enlace
            </button>
          </div>
        </Bloque>

        <Bloque
          n={herramientas.length > 0 ? "08" : "07"}
          titulo="¿Algo más que debamos saber?"
          sub="Opcional. Una nota corta basta."
        >
          <textarea
            name="mensaje"
            rows={4}
            placeholder="Cuéntanos por qué quieres entrar a 1bite."
            aria-label="Mensaje"
            className={inputCls}
          />
        </Bloque>

        <div className="pt-8">
          <Turnstile />
          {estado === "error" && (
            <p className="mb-3 text-sm text-[#FD6648]">{msg}</p>
          )}
          <LiquidButton
            type="submit"
            size="lg"
            disabled={estado === "enviando"}
            className="w-full font-medium text-white"
          >
            {estado === "enviando" ? "Enviando…" : "Enviar postulación"}
          </LiquidButton>
          <p className="mt-3 text-center text-[11px] text-white/60">
            Tu información llega directo a nuestro equipo de RRHH y no se
            comparte con terceros.
          </p>
        </div>
      </form>
    </div>
  );
}
