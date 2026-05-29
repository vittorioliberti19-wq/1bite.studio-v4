"use client";

import { useRef, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { WHATSAPP_URL } from "@/lib/content";

const VACANTE_ENDPOINT =
  process.env.NEXT_PUBLIC_VACANTE_ENDPOINT ??
  "https://atxmxihxboswsewdbdgz.supabase.co/functions/v1/vacante-submit";

const PUESTOS = [
  "Diseñador gráfico",
  "Director de arte",
  "Community manager",
  "Audiovisual",
  "Content creator",
];

type Estado = "idle" | "enviando" | "ok" | "error";

export default function Contacto() {
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
      if (!res.ok || data?.error) {
        throw new Error(data?.error || "No se pudo enviar. Intenta de nuevo.");
      }
      setEstado("ok");
      formRef.current?.reset();
    } catch (err) {
      setEstado("error");
      setMsg(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40";

  return (
    <section
      id="contacto"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-28 md:py-36"
    >
      <div className="grid gap-14 md:grid-cols-2">
        {/* Info de contacto */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Contacto
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-white md:text-5xl">
            Hablemos de tu
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--grad-firma)" }}
            >
              próximo proyecto
            </span>
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            Escríbenos por WhatsApp o correo. Respondemos rápido y sin vueltas.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              data-cursor
              className="block text-white/80 transition hover:text-white"
            >
              WhatsApp · +1 786 906 3354
            </a>
            <a
              href="mailto:hola@1bite.studio"
              data-cursor
              className="block text-white/80 transition hover:text-white"
            >
              hola@1bite.studio
            </a>
            <a
              href="https://instagram.com/1bite.studio"
              target="_blank"
              rel="noopener"
              data-cursor
              className="block text-white/80 transition hover:text-white"
            >
              @1bite.studio
            </a>
            <p className="text-white/50">Maracaibo, Venezuela</p>
          </div>
        </div>

        {/* Formulario de vacantes */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Vacantes
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Únete al equipo
          </h3>
          <p className="mt-2 text-sm text-white/55">
            Elige el puesto y carga tu información. La revisamos con calma.
          </p>

          {estado === "ok" ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
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
          ) : (
            <form ref={formRef} onSubmit={onSubmit} className="mt-7 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Puesto
                </label>
                <select
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
                  className={inputCls}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Correo"
                  className={inputCls}
                />
              </div>

              <input
                name="telefono"
                placeholder="Teléfono / WhatsApp (opcional)"
                className={inputCls}
              />

              <textarea
                name="mensaje"
                rows={3}
                placeholder="Cuéntanos algo sobre ti (opcional)"
                className={`${inputCls} resize-none`}
              />

              <input
                name="enlaces"
                placeholder="Enlaces de trabajos (Behance, portfolio, IG…)"
                className={inputCls}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    CV (PDF/imagen) *
                  </label>
                  <input
                    name="cv"
                    type="file"
                    required
                    accept=".pdf,image/jpeg,image/png,image/webp"
                    className="block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-white/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Portafolio (si aplica)
                  </label>
                  <input
                    name="portafolio"
                    type="file"
                    accept=".pdf,image/jpeg,image/png,image/webp"
                    className="block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-white/20"
                  />
                </div>
              </div>

              {estado === "error" && (
                <p className="text-sm text-[#FD6648]">{msg}</p>
              )}

              <LiquidButton
                type="submit"
                size="lg"
                disabled={estado === "enviando"}
                className="mt-2 w-full font-medium text-white"
              >
                {estado === "enviando" ? "Enviando…" : "Enviar postulación"}
              </LiquidButton>
              <p className="text-center text-[11px] text-white/35">
                Tu información llega directo a nuestro equipo de RRHH.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
