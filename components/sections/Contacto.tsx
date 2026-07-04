"use client";

import { useRef, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { WHATSAPP_URL } from "@/lib/content";

const SUPABASE_FN =
  process.env.NEXT_PUBLIC_SUPABASE_FN ??
  "https://atxmxihxboswsewdbdgz.supabase.co/functions/v1";
const VACANTE_ENDPOINT =
  process.env.NEXT_PUBLIC_VACANTE_ENDPOINT ?? `${SUPABASE_FN}/vacante-submit`;
const CONTACTO_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACTO_ENDPOINT ?? `${SUPABASE_FN}/contacto-submit`;

const PUESTOS = [
  "Diseñador gráfico",
  "Director de arte",
  "Community manager",
  "Audiovisual",
  "Content creator",
];

const TEL = "+17869063354";

type Estado = "idle" | "enviando" | "ok" | "error";

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus-visible:ring-2 focus-visible:ring-[#08E1F4]/60";

/* ---------- Formulario de contacto general (→ gerencia + CRM) ---------- */
function ContactoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setMsg("");
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch(CONTACTO_ENDPOINT, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error)
        throw new Error(data?.error || "No se pudo enviar. Intenta de nuevo.");
      setEstado("ok");
      formRef.current?.reset();
    } catch (err) {
      setEstado("error");
      setMsg(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p
          className="text-lg font-semibold"
          style={{
            backgroundImage: "var(--grad-firma)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ¡Mensaje enviado!
        </p>
        <p className="mt-2 text-sm text-white/60">
          Gracias por escribirnos. Te respondemos pronto.
        </p>
        <button
          type="button"
          data-cursor
          onClick={() => setEstado("idle")}
          className="mt-5 text-sm text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="nombre"
          required
          placeholder="Nombre"
          aria-label="Nombre"
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
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="telefono"
          placeholder="Teléfono (opcional)"
          aria-label="Teléfono (opcional)"
          className={inputCls}
        />
        <input
          name="empresa"
          placeholder="Empresa / marca (opcional)"
          aria-label="Empresa o marca (opcional)"
          className={inputCls}
        />
      </div>
      <textarea
        name="mensaje"
        rows={4}
        placeholder="Cuéntanos qué necesitas"
        aria-label="Mensaje"
        className={`${inputCls} resize-none`}
      />
      {estado === "error" && <p className="text-sm text-[#FD6648]">{msg}</p>}
      <LiquidButton
        type="submit"
        size="lg"
        disabled={estado === "enviando"}
        className="w-full font-medium text-white"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar mensaje"}
      </LiquidButton>
    </form>
  );
}

/* ---------- Formulario de vacantes (→ RRHH) ---------- */
function VacanteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [msg, setMsg] = useState("");

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
    } catch (err) {
      setEstado("error");
      setMsg(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p
          className="text-lg font-semibold"
          style={{
            backgroundImage: "var(--grad-firma)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ¡Postulación recibida!
        </p>
        <p className="mt-2 text-sm text-white/60">
          Gracias por aplicar. Te contactamos si encajas con el perfil.
        </p>
        <button
          type="button"
          data-cursor
          onClick={() => setEstado("idle")}
          className="mt-5 text-sm text-white/70 underline underline-offset-4 transition hover:text-white"
        >
          Enviar otra postulación
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="puesto" className="mb-1.5 block text-xs text-white/60">
          Puesto
        </label>
        <select
          id="puesto"
          name="puesto"
          required
          defaultValue=""
          className={inputCls}
        >
          <option value="" disabled>
            Selecciona un puesto…
          </option>
          {PUESTOS.map((p) => (
            <option key={p} value={p} className="bg-[#001422]">
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
      <input
        name="telefono"
        placeholder="Teléfono / WhatsApp (opcional)"
        aria-label="Teléfono o WhatsApp (opcional)"
        className={inputCls}
      />
      <input
        name="enlaces"
        placeholder="Enlaces de trabajos (Behance, portfolio, IG…)"
        aria-label="Enlaces de trabajos"
        className={inputCls}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cv" className="mb-1.5 block text-xs text-white/60">
            CV (PDF/imagen) *
          </label>
          <input
            id="cv"
            name="cv"
            type="file"
            required
            accept=".pdf,image/jpeg,image/png,image/webp"
            className="block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-white/20"
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
            className="block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-white/20"
          />
        </div>
      </div>
      {estado === "error" && <p className="text-sm text-[#FD6648]">{msg}</p>}
      <LiquidButton
        type="submit"
        size="lg"
        disabled={estado === "enviando"}
        className="w-full font-medium text-white"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar postulación"}
      </LiquidButton>
      <p className="text-center text-[11px] text-white/60">
        Tu información llega directo a nuestro equipo de RRHH.
      </p>
    </form>
  );
}

export default function Contacto() {
  return (
    <section id="contacto" className="relative scroll-mt-28 pt-10 pb-28 md:pt-12 md:pb-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Contacto
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] text-white md:text-5xl">
          Hablemos de tu{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--grad-firma)" }}
          >
            próximo proyecto
          </span>
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Contacto general */}
          <div className="relative rounded-3xl border border-white/20 bg-black/70 p-7 md:p-9">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={4}
            />
            <h3 className="text-2xl font-semibold text-white">Escríbenos</h3>
            <p className="mt-2 mb-6 text-sm text-white/55">
              Cuéntanos sobre tu marca y armamos la propuesta.
            </p>
            <ContactoForm />
          </div>

          {/* Vacantes */}
          <div className="relative rounded-3xl border border-white/20 bg-black/70 p-7 md:p-9">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={4}
            />
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Vacantes
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Únete al equipo
            </h3>
            <p className="mt-2 mb-6 text-sm text-white/55">
              Elige el puesto y carga tu información. La revisamos con calma.
            </p>
            <VacanteForm />
          </div>
        </div>

        {/* Canales de contacto clickeables */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
          <a
            href="mailto:gerencia@1bite.studio"
            data-cursor
            className="text-white/70 transition hover:text-white"
          >
            gerencia@1bite.studio
          </a>
          <a
            href="mailto:administracion@1bite.studio"
            data-cursor
            className="text-white/70 transition hover:text-white"
          >
            administracion@1bite.studio
          </a>
          <a
            href={`tel:${TEL}`}
            data-cursor
            className="text-white/70 transition hover:text-white"
          >
            +1 786 906 3354
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            data-cursor
            className="text-white/70 transition hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href="https://instagram.com/1bite.studio"
            target="_blank"
            rel="noopener"
            data-cursor
            className="text-white/70 transition hover:text-white"
          >
            @1bite.studio
          </a>
          <span className="text-white/60">Maracaibo, Venezuela</span>
        </div>

        {/* App Store — centrado, más grande que el del footer */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://apps.apple.com/us/app/1bite/id6782481903"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            aria-label="Descarga 1bite en el App Store"
            className="transition hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/app-store-badge.svg"
              alt="Download on the App Store"
              className="h-12 w-auto md:h-14"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
