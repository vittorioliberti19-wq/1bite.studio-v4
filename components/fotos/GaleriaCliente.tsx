"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import GradientBar from "@/components/ui/GradientBar";
import { waUrl } from "@/lib/content";
import Lightbox, { type LightboxItem } from "./Lightbox";
import {
  ApiError,
  borrarSesion,
  enviarSeleccion,
  guardarSesion,
  leerSesion,
  marcarFavorita,
  obtenerFotos,
  obtenerInfo,
  pedirAcceso,
  urlDescarga,
  type Entrega,
  type Foto,
  type FotosRespuesta,
  type GaleriaInfo,
  type GaleriaMeta,
  type Sesion,
} from "./api";

type Vista = "cargando" | "no_existe" | "error" | "gate" | "galeria";
type Filtro = "todas" | "favoritas";
type Visor = { lista: "fotos" | "entregas"; ids: string[]; index: number };
type Aviso = { id: number; texto: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const AYUDA_WA = waUrl(
  "Hola 1bite, tengo una pregunta sobre mi galería de fotos.",
);

const btnPrimario =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08E1F4]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-40";
const btnSecundario =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08E1F4]/70 disabled:cursor-not-allowed disabled:opacity-40";
const anillo =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08E1F4]/70";

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));
const ratio = (f: Pick<Foto, "ancho" | "alto">) =>
  f.ancho > 0 && f.alto > 0
    ? Math.min(Math.max(f.ancho / f.alto, 0.3), 4)
    : 0.8;
const plural = (n: number, uno: string, varios: string) =>
  `${n} ${n === 1 ? uno : varios}`;

function formatoPeso(bytes: number) {
  if (!bytes || bytes < 0) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1
    ? `${mb.toLocaleString("es-VE", { maximumFractionDigits: 1 })} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatoFecha(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("es-VE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

/* ───────────────────────── carga ───────────────────────── */

type Resultado =
  | { tipo: "abortado" | "no_existe" | "error"; info?: GaleriaInfo }
  | { tipo: "gate" | "expirada"; info?: GaleriaInfo }
  | { tipo: "galeria"; info?: GaleriaInfo; ses: Sesion; datos: FotosRespuesta };

function resultadoError(e: unknown, signal?: AbortSignal): Resultado {
  if (signal?.aborted) return { tipo: "abortado" };
  if (e instanceof ApiError && e.status === 401) return { tipo: "expirada" };
  if (e instanceof ApiError && e.status === 404) return { tipo: "no_existe" };
  return { tipo: "error" };
}

/** /fotos con la sesión → galería; 401 → sesión expirada (vuelve al gate). */
async function cargarFotos(slug: string, ses: Sesion, signal?: AbortSignal): Promise<Resultado> {
  try {
    const datos = await obtenerFotos(slug, ses.token, signal);
    return { tipo: "galeria", ses, datos };
  } catch (e) {
    return resultadoError(e, signal);
  }
}

/** Info pública (404 = no existe) y, si hay token guardado, directo a las fotos. */
async function cargarInicio(slug: string, signal?: AbortSignal): Promise<Resultado> {
  let info: GaleriaInfo;
  try {
    info = await obtenerInfo(slug, signal);
  } catch (e) {
    return resultadoError(e, signal);
  }
  const ses = leerSesion(slug);
  if (!ses) return { tipo: "gate", info };
  return { ...(await cargarFotos(slug, ses, signal)), info };
}

/* ───────────────────────── iconos ───────────────────────── */

function IconoCorazon({
  lleno,
  className = "",
}: {
  lleno: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill={lleno ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinejoin="round"
        d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8.1 3.6 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.6 0 5.7 3.6 4.5 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"
      />
    </svg>
  );
}

function IconoDescarga({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

/* ───────────────────────── marco común ───────────────────────── */

function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logos/1bite-white.png"
      alt="1bite"
      width={3018}
      height={1301}
      priority
      className={className}
    />
  );
}

function PiePagina() {
  return (
    <footer className="mt-auto px-4 pb-10 pt-16 sm:px-6">
      <GradientBar className="mx-auto mb-6 max-w-7xl opacity-60" />
      <p className="text-center text-xs tracking-[0.15em] text-white/45">
        1bite Studio ·{" "}
        <Link href="/" className={`rounded hover:text-white ${anillo}`}>
          1bite.studio
        </Link>
      </p>
    </footer>
  );
}

/** Pantalla centrada para cargando / errores / gate. */
function Pantalla({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* halo de marca, puramente decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #ac31fb 0%, #086bfc 45%, transparent 70%)",
        }}
      />
      <main className="relative flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-md text-center">{children}</div>
      </main>
      <PiePagina />
    </div>
  );
}

/* ───────────────────────── gate de correo ───────────────────────── */

function Gate({
  slug,
  info,
  aviso,
  onAcceso,
  onNoExiste,
}: {
  slug: string;
  info: GaleriaInfo | null;
  aviso: string;
  onAcceso: (s: Sesion) => Promise<void>;
  onNoExiste: () => void;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const errorId = useId();
  const inputId = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const limpio = email.trim().toLowerCase();
    if (!EMAIL_RE.test(limpio)) {
      setError("Escribe un correo válido, por ejemplo nombre@gmail.com.");
      return;
    }
    setError("");
    setEnviando(true);
    try {
      const ses = await pedirAcceso(slug, limpio);
      const sesion = { token: ses.token, email: ses.email || limpio };
      guardarSesion(slug, sesion);
      await onAcceso(sesion);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return onNoExiste();
      setError(
        err instanceof ApiError && err.status === 400
          ? "Ese correo no parece válido. Revísalo e inténtalo de nuevo."
          : "No pudimos conectarnos. Revisa tu internet e inténtalo de nuevo.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Pantalla>
      <Logo className="mx-auto mb-10 h-9 w-auto" />
      <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/50">
        Galería privada
      </p>
      <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {info?.titulo || "Tu galería"}
      </h1>
      {info && (info.cliente || info.total_fotos > 0) && (
        <p className="mt-3 text-sm text-white/60">
          {info.cliente && <>Para {info.cliente}</>}
          {info.cliente && info.total_fotos > 0 && (
            <span className="mx-2 text-white/25">·</span>
          )}
          {info.total_fotos > 0 && plural(info.total_fotos, "foto", "fotos")}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-10 text-left">
        <label htmlFor={inputId} className="mb-2 block text-sm text-white/80">
          Ingresa tu correo para ver tus fotos
        </label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="min-h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-base text-white outline-none transition placeholder:text-white/35 focus:border-white/40 focus-visible:ring-2 focus-visible:ring-[#08E1F4]/60 aria-[invalid=true]:border-[#fd6648]/70"
        />
        {(error || aviso) && (
          <p
            id={errorId}
            role="alert"
            className={`mt-2 text-sm ${error ? "text-[#fd6648]" : "text-white/60"}`}
          >
            {error || aviso}
          </p>
        )}
        <button
          type="submit"
          disabled={enviando}
          className={`${btnPrimario} mt-5 w-full`}
        >
          {enviando ? "Entrando…" : "Entrar"}
        </button>
        <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
          Usamos tu correo solo para guardar tus favoritas, así puedes volver
          cuando quieras.
        </p>
      </form>
    </Pantalla>
  );
}

/* ───────────────────────── grilla justificada ───────────────────────── */

function BotonCorazon({
  foto,
  soloLectura,
  onToggle,
  grande = false,
}: {
  foto: Foto;
  soloLectura: boolean;
  onToggle: (id: string) => void;
  grande?: boolean;
}) {
  const etiqueta = foto.favorita
    ? `Quitar ${foto.nombre} de favoritas`
    : `Marcar ${foto.nombre} como favorita`;
  if (grande) {
    // en solo lectura no tiene sentido ofrecer "Marcar favorita"
    if (soloLectura && !foto.favorita) return null;
    return (
      <button
        type="button"
        onClick={() => onToggle(foto.id)}
        disabled={soloLectura}
        aria-pressed={foto.favorita}
        aria-label={etiqueta}
        className={`flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-medium transition ${anillo} disabled:cursor-default ${
          foto.favorita
            ? "bg-[#ed2e97] text-white"
            : "bg-white/10 text-white hover:bg-white/20"
        } ${soloLectura && !foto.favorita ? "opacity-40" : ""}`}
      >
        <IconoCorazon lleno={foto.favorita} className="h-5 w-5" />
        {foto.favorita ? "Favorita" : "Marcar favorita"}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onToggle(foto.id)}
      disabled={soloLectura}
      aria-pressed={foto.favorita}
      aria-label={etiqueta}
      // 44px de área táctil; el círculo visible es de 36px
      className={`group/c absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full ${anillo} disabled:cursor-default ${
        soloLectura && !foto.favorita ? "opacity-0" : ""
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
          foto.favorita
            ? "bg-[#ed2e97] text-white shadow-[0_4px_16px_#ed2e9766]"
            : "bg-black/45 text-white group-hover/c:bg-black/65"
        } ${soloLectura ? "" : "active:scale-90"}`}
      >
        <IconoCorazon lleno={foto.favorita} className="h-[18px] w-[18px]" />
      </span>
    </button>
  );
}

function GrillaFotos({
  fotos,
  soloLectura,
  onToggle,
  onAbrir,
}: {
  fotos: Foto[];
  soloLectura: boolean;
  onToggle: (id: string) => void;
  onAbrir: (i: number) => void;
}) {
  return (
    // Grilla justificada en CSS puro: flex-grow y flex-basis proporcionales al
    // aspect ratio → cada fila llena el ancho sin recortar y respeta el orden.
    // El ::after con grow enorme evita que la última fila se estire.
    <ul className="flex flex-wrap items-start gap-1.5 [--rh:132px] after:grow-[999999] after:content-[''] sm:gap-2 sm:[--rh:200px] lg:[--rh:250px]">
      {fotos.map((f, i) => {
        const ar = ratio(f);
        return (
          <li
            key={f.id}
            className="group relative min-w-0 max-w-full overflow-hidden rounded-md bg-white/[0.05]"
            style={{
              flexGrow: ar * 100,
              flexBasis: `calc(var(--rh) * ${ar})`,
              // filas con pocas fotos no crecen sin límite (recorta un poco con object-cover)
              maxHeight: "calc(var(--rh) * 1.6)",
              aspectRatio: `${ar}`,
            }}
          >
            <button
              type="button"
              onClick={() => onAbrir(i)}
              aria-label={`Ver ${f.nombre} en grande`}
              className={`absolute inset-0 block h-full w-full ${anillo} focus-visible:ring-inset`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- host remoto R2, sin optimizador */}
              <img
                src={f.url}
                alt={f.nombre}
                width={f.ancho || undefined}
                height={f.alto || undefined}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full select-none object-cover transition duration-500 [-webkit-touch-callout:none] group-hover:scale-[1.02]"
              />
            </button>
            <BotonCorazon
              foto={f}
              soloLectura={soloLectura}
              onToggle={onToggle}
            />
          </li>
        );
      })}
    </ul>
  );
}

function FiltroFotos({
  filtro,
  setFiltro,
  favoritas,
}: {
  filtro: Filtro;
  setFiltro: (f: Filtro) => void;
  favoritas: number;
}) {
  return (
    <div
      role="group"
      aria-label="Filtrar fotos"
      className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1"
    >
      {(["todas", "favoritas"] as const).map((f) => (
        <button
          key={f}
          type="button"
          aria-pressed={filtro === f}
          onClick={() => setFiltro(f)}
          className={`min-h-9 rounded-full px-4 text-xs font-medium transition ${anillo} ${
            filtro === f
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          {f === "todas" ? "Todas" : `Mis favoritas (${favoritas})`}
        </button>
      ))}
    </div>
  );
}

function ContadorSeleccion({
  n,
  limite,
}: {
  n: number;
  limite: number | null;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <IconoCorazon lleno className="h-5 w-5 shrink-0 text-[#ed2e97]" />
      <span className="font-semibold tabular-nums" aria-live="polite">
        {limite
          ? `${n} de ${limite}`
          : plural(n, "seleccionada", "seleccionadas")}
      </span>
    </div>
  );
}

/* ───────────────────────── componente principal ───────────────────────── */

export default function GaleriaCliente({ slug }: { slug: string }) {
  const [vista, setVista] = useState<Vista>("cargando");
  const [info, setInfo] = useState<GaleriaInfo | null>(null);
  const [sesion, setSesion] = useState<Sesion | null>(null);
  const [avisoGate, setAvisoGate] = useState("");

  const [galeria, setGaleria] = useState<GaleriaMeta | null>(null);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [misFavoritas, setMisFavoritas] = useState(0);

  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [visor, setVisor] = useState<Visor | null>(null);
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [confirmando, setConfirmando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [recienEnviada, setRecienEnviada] = useState(false);
  const [descarga, setDescarga] = useState<{
    actual: number;
    total: number;
  } | null>(null);

  const pendientes = useRef<Set<string>>(new Set());
  // Generación de sesión: al cambiar de correo o expirar se incrementa y las
  // respuestas en vuelo de la sesión anterior se descartan (no pisan a la nueva).
  const generacion = useRef(0);
  const confirmarRef = useRef<HTMLButtonElement>(null);

  const avisar = useCallback(
    (texto: string) => setAviso({ id: Date.now(), texto }),
    [],
  );

  // Una descarga fallida vuelve aquí con ?error= (el backend redirige en vez
  // de mostrar JSON crudo): se avisa y se limpia la URL.
  useEffect(() => {
    let codigo: string | null = null;
    try {
      const url = new URL(window.location.href);
      codigo = url.searchParams.get("error");
      if (!codigo) return;
      url.searchParams.delete("error");
      window.history.replaceState(null, "", url.pathname + url.search);
    } catch {
      return;
    }
    const textos: Record<string, string> = {
      sesion_vencida: "Tu sesión venció. Ingresa tu correo de nuevo para descargar.",
      no_encontrado: "Esa foto ya no está disponible. Escríbenos si la necesitas.",
    };
    const t = setTimeout(
      () => avisar(textos[codigo!] ?? "No pudimos descargar la foto. Inténtalo de nuevo."),
      0,
    );
    return () => clearTimeout(t);
  }, [avisar]);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 4500);
    return () => clearTimeout(t);
  }, [aviso]);

  useEffect(() => {
    if (confirmando) confirmarRef.current?.focus();
  }, [confirmando]);

  const expirar = useCallback(() => {
    generacion.current++;
    borrarSesion(slug);
    setSesion(null);
    setVisor(null);
    setAvisoGate("Tu sesión expiró. Ingresa tu correo de nuevo para seguir.");
    setVista("gate");
  }, [slug]);

  /** Vuelca a estado el resultado de una carga (inicial, reintento o gate). */
  const aplicar = useCallback(
    (r: Resultado) => {
      if (r.tipo === "abortado") return;
      if (r.info) setInfo(r.info);
      if (r.tipo === "expirada") return expirar();
      if (r.tipo === "galeria") {
        setSesion(r.ses);
        setGaleria(r.datos.galeria);
        setFotos(r.datos.fotos);
        setEntregas(r.datos.entregas);
        setMisFavoritas(r.datos.mis_favoritas);
      }
      setVista(r.tipo);
    },
    [expirar],
  );

  const abrirGaleria = useCallback(
    (ses: Sesion) => cargarFotos(slug, ses).then(aplicar),
    [slug, aplicar],
  );

  useEffect(() => {
    const ctrl = new AbortController();
    cargarInicio(slug, ctrl.signal).then(aplicar);
    return () => ctrl.abort();
  }, [slug, aplicar]);

  /** Refresca en silencio (p. ej. tras un 409: el estado pudo cambiar en el servidor). */
  const refrescar = useCallback(async () => {
    if (!sesion) return;
    const gen = generacion.current;
    try {
      const d = await obtenerFotos(slug, sesion.token);
      if (gen !== generacion.current) return;
      setGaleria(d.galeria);
      setFotos(d.fotos);
      setEntregas(d.entregas);
      setMisFavoritas(d.mis_favoritas);
    } catch (e) {
      if (gen !== generacion.current) return;
      if (e instanceof ApiError && e.status === 401) expirar();
    }
  }, [slug, sesion, expirar]);

  const seleccionAbierta = galeria?.estado === "seleccion";
  const limite = galeria?.limite ?? null;

  async function toggleFavorita(id: string) {
    if (!sesion || !seleccionAbierta || pendientes.current.has(id)) return;
    const foto = fotos.find((f) => f.id === id);
    if (!foto) return;
    const nueva = !foto.favorita;
    if (nueva && limite !== null && misFavoritas >= limite) {
      avisar(
        `Ya elegiste tus ${limite} fotos. Quita una si quieres cambiarla por otra.`,
      );
      return;
    }

    pendientes.current.add(id);
    const gen = generacion.current;
    const aplicar = (fav: boolean) =>
      setFotos((fs) =>
        fs.map((f) => (f.id === id ? { ...f, favorita: fav } : f)),
      );
    aplicar(nueva);
    setMisFavoritas((n) => Math.max(0, n + (nueva ? 1 : -1)));
    try {
      const r = await marcarFavorita(slug, sesion.token, id, nueva);
      if (gen !== generacion.current) return;
      if (typeof r.mis_favoritas === "number") setMisFavoritas(r.mis_favoritas);
    } catch (e) {
      if (gen !== generacion.current) return;
      aplicar(!nueva);
      setMisFavoritas((n) => Math.max(0, n + (nueva ? -1 : 1)));
      if (e instanceof ApiError && e.status === 401) return expirar();
      if (e instanceof ApiError && e.status === 409) {
        avisar(e.message);
        void refrescar();
      } else {
        avisar(
          "No pudimos guardar tu favorita. Revisa tu conexión e inténtalo de nuevo.",
        );
      }
    } finally {
      pendientes.current.delete(id);
    }
  }

  async function enviar() {
    if (!sesion) return;
    const gen = generacion.current;
    setEnviando(true);
    setErrorEnvio("");
    try {
      // Un ♥ todavía en vuelo debe terminar antes de cerrar la selección; si
      // no, el servidor cierra con menos fotos de las que el cliente ve.
      for (let i = 0; i < 100 && pendientes.current.size > 0; i++) await esperar(100);
      if (pendientes.current.size > 0) {
        setErrorEnvio("Aún estamos guardando tus favoritas. Espera un momento e inténtalo de nuevo.");
        return;
      }
      await enviarSeleccion(slug, sesion.token);
      if (gen !== generacion.current) return;
      setGaleria((g) =>
        g
          ? {
              ...g,
              estado: "en_edicion",
              seleccion_enviada_at: new Date().toISOString(),
            }
          : g,
      );
      setConfirmando(false);
      setRecienEnviada(true);
      // el servidor es la verdad: refleja exactamente lo que quedó enviado
      void refrescar();
    } catch (e) {
      if (gen !== generacion.current) return;
      if (e instanceof ApiError && e.status === 401) return expirar();
      if (e instanceof ApiError && e.status === 409) {
        setErrorEnvio(e.message);
        void refrescar();
      } else {
        setErrorEnvio(
          "No pudimos enviar tu selección. Revisa tu conexión e inténtalo de nuevo.",
        );
      }
    } finally {
      setEnviando(false);
    }
  }

  async function descargarTodas() {
    if (!sesion || descarga) return;
    const lista = entregas;
    for (let i = 0; i < lista.length; i++) {
      setDescarga({ actual: i + 1, total: lista.length });
      // el servidor responde con Content-Disposition: attachment → descarga sin salir de la página
      const a = document.createElement("a");
      a.href = urlDescarga(slug, lista[i].id, sesion.token);
      a.rel = "noopener";
      a.download = lista[i].nombre;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (i < lista.length - 1) await esperar(700);
    }
    setDescarga(null);
  }

  function cambiarCorreo() {
    generacion.current++;
    borrarSesion(slug);
    setSesion(null);
    setRecienEnviada(false);
    setConfirmando(false);
    setErrorEnvio("");
    setFiltro("todas");
    setAvisoGate("");
    setVista("gate");
  }

  function reintentar() {
    setVista("cargando");
    void cargarInicio(slug).then(aplicar);
  }

  /* ───────── estados de pantalla completa ───────── */

  if (vista === "cargando") {
    return (
      <Pantalla>
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center gap-6"
        >
          <Logo className="h-9 w-auto animate-pulse" />
          <span className="text-sm text-white/50">Cargando tu galería…</span>
        </div>
      </Pantalla>
    );
  }

  if (vista === "no_existe") {
    return (
      <Pantalla>
        <Logo className="mx-auto mb-10 h-9 w-auto" />
        <h1 className="text-balance text-2xl font-bold sm:text-3xl">
          Esta galería no existe o ya no está disponible
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Revisa que el enlace sea el mismo que te enviamos. Si el problema
          sigue, escríbenos y te ayudamos.
        </p>
        <a
          href={AYUDA_WA}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnSecundario} mt-8`}
        >
          Escribirnos por WhatsApp
        </a>
      </Pantalla>
    );
  }

  if (vista === "error") {
    return (
      <Pantalla>
        <Logo className="mx-auto mb-10 h-9 w-auto" />
        <h1 className="text-2xl font-bold sm:text-3xl">
          No pudimos cargar tu galería
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Puede ser tu conexión a internet o un problema momentáneo de nuestro
          lado. Inténtalo de nuevo en unos segundos.
        </p>
        <button
          type="button"
          onClick={reintentar}
          className={`${btnPrimario} mt-8`}
        >
          Reintentar
        </button>
      </Pantalla>
    );
  }

  if (vista === "gate" || !galeria || !sesion) {
    return (
      <Gate
        slug={slug}
        info={info}
        aviso={avisoGate}
        onAcceso={(s) => abrirGaleria(s)}
        onNoExiste={() => setVista("no_existe")}
      />
    );
  }

  /* ───────── galería ───────── */

  // El layout depende solo del estado: si el equipo reabre la selección con
  // finales ya subidas, el cliente debe volver a ver la barra de envío.
  const hayEntregas = galeria.estado === "entregada";
  const soloLectura = !seleccionAbierta;
  const visibles =
    filtro === "favoritas" ? fotos.filter((f) => f.favorita) : fotos;
  const porId = new Map(fotos.map((f) => [f.id, f]));
  const entregaPorId = new Map(entregas.map((e) => [e.id, e]));
  const faltan = limite !== null ? Math.max(0, limite - misFavoritas) : 0;

  const abrirFotos = (i: number) =>
    setVisor({ lista: "fotos", ids: visibles.map((f) => f.id), index: i });
  const abrirEntregas = (i: number) =>
    setVisor({ lista: "entregas", ids: entregas.map((e) => e.id), index: i });

  const itemsVisor: LightboxItem[] = visor
    ? visor.ids
        .map((id) =>
          visor.lista === "fotos" ? porId.get(id) : entregaPorId.get(id),
        )
        .filter((x): x is Foto | Entrega => !!x)
        // finales: el visor muestra la miniatura; "Descargar" baja el original
        .map((x) => ("thumb" in x && x.thumb ? { ...x, url: x.thumb } : x))
    : [];

  const grillaPruebas = (
    <>
      {visibles.length > 0 ? (
        <GrillaFotos
          fotos={visibles}
          soloLectura={soloLectura}
          onToggle={toggleFavorita}
          onAbrir={abrirFotos}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
          <IconoCorazon
            lleno={false}
            className="mx-auto mb-4 h-8 w-8 text-white/30"
          />
          <p className="text-sm text-white/60">
            {fotos.length === 0
              ? "Todavía no hay fotos en esta galería. Te avisaremos cuando estén listas."
              : seleccionAbierta
                ? "Aún no has marcado favoritas. Toca el corazón en las fotos que más te gusten."
                : "No marcaste favoritas en esta galería."}
          </p>
        </div>
      )}
    </>
  );

  return (
    <div
      className="flex min-h-dvh flex-col"
      // protección cosmética: sin menú contextual sobre las fotos
      onContextMenu={(e) => {
        if (e.target instanceof HTMLImageElement) e.preventDefault();
      }}
    >
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pt-5 sm:px-6">
        <Link
          href="/"
          aria-label="1bite inicio"
          className={`rounded ${anillo}`}
        >
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>
        <div className="flex min-w-0 items-center gap-3 text-xs text-white/50">
          <span className="hidden truncate sm:inline">{sesion.email}</span>
          <button
            type="button"
            onClick={cambiarCorreo}
            className={`min-h-11 shrink-0 rounded px-1 underline-offset-4 hover:text-white hover:underline ${anillo}`}
          >
            Cambiar correo
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        {/* encabezado */}
        <section className="pb-8 pt-12 sm:pb-10 sm:pt-16">
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/50">
            {galeria.estado === "seleccion"
              ? "Elige tus favoritas"
              : galeria.estado === "en_edicion"
                ? "En edición"
                : "Lista para descargar"}
          </p>
          <h1 className="text-balance break-words text-4xl font-bold leading-[1.05] sm:text-6xl">
            {galeria.titulo || "Tu galería"}
          </h1>
          <p className="mt-4 text-sm text-white/60">
            {galeria.cliente && <>Para {galeria.cliente}</>}
            {galeria.cliente && <span className="mx-2 text-white/25">·</span>}
            {plural(fotos.length, "foto", "fotos")}
          </p>
          <GradientBar className="mt-8 max-w-24" />

          {seleccionAbierta && (
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
              Toca el corazón en las fotos que más te gusten
              {limite ? (
                <>
                  : puedes elegir hasta{" "}
                  <strong className="text-white">{limite}</strong>
                </>
              ) : null}
              . Tus favoritas se guardan solas, así que puedes volver cuando
              quieras. Cuando termines, toca{" "}
              <strong className="text-white">Enviar selección</strong>.
            </p>
          )}

          {galeria.estado === "en_edicion" && (
            <div
              role="status"
              className="mt-6 flex max-w-2xl gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
            >
              <span
                aria-hidden
                className="mt-1 h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#08e1f4]"
              />
              <div className="text-sm leading-relaxed">
                <p className="font-medium text-white">
                  {recienEnviada
                    ? "¡Listo! Recibimos tu selección. Te avisaremos cuando tus fotos editadas estén listas."
                    : "Tu selección fue enviada. Estamos editando tus fotos."}
                </p>
                {galeria.seleccion_enviada_at && (
                  <p className="mt-1 text-white/50">
                    Enviada el {formatoFecha(galeria.seleccion_enviada_at)} ·{" "}
                    {plural(misFavoritas, "foto elegida", "fotos elegidas")}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* fotos editadas */}
        {hayEntregas && (
          <section aria-labelledby="titulo-entregas" className="pb-14">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2
                  id="titulo-entregas"
                  className="text-2xl font-bold sm:text-3xl"
                >
                  Tus fotos editadas
                </h2>
                {entregas.length > 0 && (
                  <p className="mt-1 text-sm text-white/50">
                    {plural(entregas.length, "foto lista", "fotos listas")} para
                    descargar en alta resolución
                  </p>
                )}
              </div>
              {entregas.length > 0 && (
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <button
                    type="button"
                    onClick={descargarTodas}
                    disabled={!!descarga}
                    className={btnPrimario}
                  >
                    <IconoDescarga className="h-4 w-4" />
                    {descarga
                      ? `Descargando ${descarga.actual} de ${descarga.total}…`
                      : "Descargar todas"}
                  </button>
                  <p className="text-xs text-white/40">
                    Si tu navegador pregunta, permite descargar varios archivos.
                  </p>
                </div>
              )}
            </div>

            {entregas.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {entregas.map((e, i) => (
                  <li key={e.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => abrirEntregas(i)}
                      aria-label={`Ver ${e.nombre} en grande`}
                      className={`block aspect-[4/5] w-full overflow-hidden rounded-lg bg-white/[0.05] ${anillo}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- host remoto R2, sin optimizador */}
                      <img
                        src={e.thumb ?? e.url}
                        alt={e.nombre}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-full w-full select-none object-cover transition duration-500 [-webkit-touch-callout:none] hover:scale-[1.02]"
                      />
                    </button>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs text-white/70">
                          {e.nombre}
                        </p>
                        {e.size > 0 && (
                          <p className="text-[11px] text-white/40">
                            {formatoPeso(e.size)}
                          </p>
                        )}
                      </div>
                      <a
                        href={urlDescarga(slug, e.id, sesion.token)}
                        download={e.nombre}
                        rel="noopener"
                        aria-label={`Descargar ${e.nombre}`}
                        className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white ${anillo}`}
                      >
                        <IconoDescarga className="h-4 w-4" />
                        Descargar
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center text-sm text-white/60">
                Estamos preparando tus descargas. Vuelve en un rato.
              </div>
            )}
          </section>
        )}

        {/* pruebas: protagonistas en selección/edición, secundarias cuando ya hay entregas */}
        {hayEntregas ? (
          fotos.length > 0 && (
            <details className="group/d border-t border-white/10 pt-6">
              <summary
                className={`flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded text-sm text-white/70 hover:text-white ${anillo} [&::-webkit-details-marker]:hidden`}
              >
                <span>
                  Fotos de la sesión ({fotos.length})
                  {misFavoritas > 0 && (
                    <span className="text-white/40">
                      {" "}
                      · {misFavoritas} elegidas
                    </span>
                  )}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 transition group-open/d:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="pt-6">
                <div className="mb-4">
                  <FiltroFotos
                    filtro={filtro}
                    setFiltro={setFiltro}
                    favoritas={misFavoritas}
                  />
                </div>
                {grillaPruebas}
              </div>
            </details>
          )
        ) : (
          <section aria-label="Fotos de la sesión">
            {/* barra fija: contador, filtro y envío */}
            <div className="sticky top-0 z-30 -mx-4 mb-4 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <div className="flex items-center gap-4">
                  <ContadorSeleccion n={misFavoritas} limite={limite} />
                  {limite !== null && (
                    <div
                      aria-hidden
                      className="hidden h-1 w-28 overflow-hidden rounded-full bg-white/10 sm:block"
                    >
                      <div
                        className="h-full rounded-full transition-[width] duration-300"
                        style={{
                          width: `${Math.min(100, (misFavoritas / limite) * 100)}%`,
                          background: "var(--grad-firma)",
                        }}
                      />
                    </div>
                  )}
                </div>
                {/* en móvil el filtro baja a su propia fila */}
                <div className="order-last w-full sm:order-none sm:w-auto">
                  <FiltroFotos
                    filtro={filtro}
                    setFiltro={setFiltro}
                    favoritas={misFavoritas}
                  />
                </div>
                {seleccionAbierta && !confirmando && (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorEnvio("");
                      setConfirmando(true);
                    }}
                    disabled={misFavoritas === 0}
                    title={
                      misFavoritas === 0
                        ? "Marca al menos una foto para enviar"
                        : undefined
                    }
                    className={`${btnPrimario} min-h-11 px-5`}
                  >
                    Enviar selección
                  </button>
                )}
              </div>

              {seleccionAbierta && confirmando && (
                <div className="mt-3 rounded-xl border border-white/15 bg-white/[0.06] p-4">
                  <p className="text-sm font-medium text-white">
                    ¿Enviar tu selección de{" "}
                    {plural(misFavoritas, "foto", "fotos")}?
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    Después de enviarla ya no podrás cambiar tus favoritas.
                    {faltan > 0 && (
                      <>
                        {" "}
                        Todavía puedes elegir{" "}
                        {plural(faltan, "foto más", "fotos más")}.
                      </>
                    )}
                  </p>
                  {errorEnvio && (
                    <p role="alert" className="mt-2 text-sm text-[#fd6648]">
                      {errorEnvio}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      ref={confirmarRef}
                      type="button"
                      onClick={enviar}
                      disabled={enviando}
                      className={`${btnPrimario} min-h-11 px-5`}
                    >
                      {enviando ? "Enviando…" : "Sí, enviar selección"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmando(false)}
                      disabled={enviando}
                      className={btnSecundario}
                    >
                      Seguir eligiendo
                    </button>
                  </div>
                </div>
              )}
            </div>
            {grillaPruebas}
          </section>
        )}
      </main>

      <PiePagina />

      {/* aviso flotante (409, errores de red) */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-[calc(96px+env(safe-area-inset-bottom))] z-[95] flex justify-center sm:bottom-8"
      >
        {aviso && (
          <p
            key={aviso.id}
            className="pointer-events-auto max-w-md rounded-2xl border border-white/15 bg-[#0b0d14]/95 px-5 py-3 text-center text-sm text-white shadow-2xl backdrop-blur"
          >
            {aviso.texto}
          </p>
        )}
      </div>

      {visor && itemsVisor.length > 0 && (
        <Lightbox
          items={itemsVisor}
          index={Math.min(visor.index, itemsVisor.length - 1)}
          onIndex={(i) => setVisor((v) => (v ? { ...v, index: i } : v))}
          onClose={() => setVisor(null)}
          acciones={(item) => {
            if (visor.lista === "fotos") {
              const f = porId.get(item.id);
              return f ? (
                <BotonCorazon
                  foto={f}
                  soloLectura={soloLectura}
                  onToggle={toggleFavorita}
                  grande
                />
              ) : null;
            }
            return (
              <a
                href={urlDescarga(slug, item.id, sesion.token)}
                download={item.nombre}
                rel="noopener"
                className={`${btnPrimario} min-h-12`}
              >
                <IconoDescarga className="h-4 w-4" />
                Descargar
              </a>
            );
          }}
        />
      )}
    </div>
  );
}
