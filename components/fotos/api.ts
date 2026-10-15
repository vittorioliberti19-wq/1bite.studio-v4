// Cliente de la API pública de galerías (vive en app.1bite.studio, otro dominio).
export const API =
  process.env.NEXT_PUBLIC_GALERIAS_API ?? "https://app.1bite.studio";

export type EstadoGaleria = "seleccion" | "en_edicion" | "entregada";

export type GaleriaInfo = {
  titulo: string;
  cliente: string | null;
  estado: EstadoGaleria;
  limite: number | null;
  total_fotos: number;
};

export type Foto = {
  id: string;
  url: string;
  nombre: string;
  ancho: number;
  alto: number;
  favorita: boolean;
  /** nota del cliente sobre esta foto ("" si no hay) */
  nota: string;
};

export type Entrega = {
  id: string;
  nombre: string;
  url: string;
  /** miniatura ~1200 px; null si el formato no se pudo reducir */
  thumb: string | null;
  size: number;
};

export type GaleriaMeta = {
  titulo: string;
  cliente: string | null;
  estado: EstadoGaleria;
  limite: number | null;
  seleccion_enviada_at: string | null;
};

export type FotosRespuesta = {
  galeria: GaleriaMeta;
  fotos: Foto[];
  entregas: Entrega[];
  mis_favoritas: number;
  nota_general: string;
};

export type Sesion = { token: string; email: string };

/** status 0 = sin conexión / CORS / respuesta ilegible. */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

const base = (slug: string) =>
  `${API}/api/public/galerias/${encodeURIComponent(slug)}`;

async function pedir<T>(
  url: string,
  opts: {
    method?: "GET" | "POST";
    token?: string;
    body?: unknown;
    signal?: AbortSignal;
  } = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";

  let res: Response;
  try {
    res = await fetch(url, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
      cache: "no-store",
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new ApiError(0, "Sin conexión");
  }

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const msg =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : `Error ${res.status}`;
    throw new ApiError(res.status, msg);
  }
  if (data === null) throw new ApiError(0, "Respuesta inválida");
  return data as T;
}

const ESTADOS: EstadoGaleria[] = ["seleccion", "en_edicion", "entregada"];
const estadoValido = (e: unknown): EstadoGaleria =>
  ESTADOS.includes(e as EstadoGaleria) ? (e as EstadoGaleria) : "seleccion";
const limiteValido = (l: unknown) =>
  typeof l === "number" && l > 0 ? l : null;

export async function obtenerInfo(slug: string, signal?: AbortSignal) {
  const d = await pedir<GaleriaInfo>(base(slug), { signal });
  return {
    titulo: String(d.titulo ?? ""),
    cliente: d.cliente ?? null,
    estado: estadoValido(d.estado),
    limite: limiteValido(d.limite),
    total_fotos: Number(d.total_fotos) || 0,
  } satisfies GaleriaInfo;
}

export function pedirAcceso(slug: string, email: string) {
  return pedir<Sesion>(`${base(slug)}/acceso`, {
    method: "POST",
    body: { email },
  });
}

export async function obtenerFotos(
  slug: string,
  token: string,
  signal?: AbortSignal,
) {
  const d = await pedir<FotosRespuesta>(`${base(slug)}/fotos`, {
    token,
    signal,
  });
  const g = d.galeria ?? ({} as GaleriaMeta);
  return {
    galeria: {
      titulo: String(g.titulo ?? ""),
      cliente: g.cliente ?? null,
      estado: estadoValido(g.estado),
      limite: limiteValido(g.limite),
      seleccion_enviada_at: g.seleccion_enviada_at ?? null,
    },
    fotos: Array.isArray(d.fotos)
      ? d.fotos.map((f) => ({ ...f, nota: typeof f.nota === "string" ? f.nota : "" }))
      : [],
    entregas: Array.isArray(d.entregas) ? d.entregas : [],
    mis_favoritas: Number(d.mis_favoritas) || 0,
    nota_general: typeof d.nota_general === "string" ? d.nota_general : "",
  } satisfies FotosRespuesta;
}

export function marcarFavorita(
  slug: string,
  token: string,
  foto_id: string,
  favorita: boolean,
) {
  return pedir<{ mis_favoritas: number }>(`${base(slug)}/favoritos`, {
    method: "POST",
    token,
    body: { foto_id, favorita },
  });
}

/** foto_id null = nota general. Texto vacío borra la nota. */
export function guardarNota(
  slug: string,
  token: string,
  foto_id: string | null,
  texto: string,
) {
  return pedir<{ texto: string }>(`${base(slug)}/notas`, {
    method: "POST",
    token,
    body: { foto_id, texto },
  });
}

export function enviarSeleccion(slug: string, token: string) {
  return pedir<{ estado: EstadoGaleria }>(`${base(slug)}/enviar`, {
    method: "POST",
    token,
  });
}

export const urlDescarga = (slug: string, entregaId: string, token: string) =>
  `${base(slug)}/entregas/${encodeURIComponent(entregaId)}/descargar?token=${encodeURIComponent(token)}`;

// --- sesión en localStorage (puede fallar en modo privado / storage bloqueado) ---
const clave = (slug: string) => `galeria:${slug}`;

export function leerSesion(slug: string): Sesion | null {
  try {
    const raw = localStorage.getItem(clave(slug));
    if (!raw) return null;
    const s = JSON.parse(raw) as Partial<Sesion>;
    return typeof s.token === "string" && s.token
      ? { token: s.token, email: String(s.email ?? "") }
      : null;
  } catch {
    return null;
  }
}

export function guardarSesion(slug: string, s: Sesion) {
  try {
    localStorage.setItem(clave(slug), JSON.stringify(s));
  } catch {
    // sin storage la sesión vive solo en memoria (se pide el correo al recargar)
  }
}

export function borrarSesion(slug: string) {
  try {
    localStorage.removeItem(clave(slug));
  } catch {
    // nada que limpiar
  }
}
