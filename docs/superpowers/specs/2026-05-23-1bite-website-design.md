# 1bite.studio — Diseño Web V1 (Rebrand 2026)

**Fecha:** 2026-05-23
**Estado:** Aprobado por Vittorio. Listo para plan de implementación.

## Objetivo

Web nueva desde 0 para 1bite Studio (agencia creativa, Maracaibo). Aplica el rebrand 2026.
La web funciona como **funnel de ventas** que convierte visitantes en leads / clientes.

V1 = **solo diseño visual** (web hermosa, production-grade). CTAs son placeholders.
Integración de pago (Stripe) se hace en una fase posterior bajo modelo **híbrido**.

## Decisiones tomadas

- **Arquitectura de pago (futuro, NO en v1):** Híbrido. Checkout rápido en la web (sin login) vía Stripe Checkout; gestión recurrente (suscripción, facturas, compra de logos) redirige a **app1bite** (perfil del cliente, Supabase + Stripe Customer Portal). Una sola fuente de verdad del cliente.
- **Alcance v1:** Solo diseño visual. Sin backend de pago aún.
- **Stack:** Next.js + Vercel. GSAP + Lenis (smooth scroll) + Framer Motion. Tailwind CSS.
- **Vibe:** Apple Vision Pro (scroll cinemático, negro, vidrio fluido, mucho aire) + Cuberto (cursor custom, motion jugoso, tipografía gigante). Premium base + interactividad bold. Acentos neón solo en hero/planes/CTA.
- **Estructura:** Home one-page (funnel) + página dedicada `/trabajos`.

## Branding (rebrand 2026)

### Paleta

| Nombre       | HEX       | Uso                       |
| ------------ | --------- | ------------------------- |
| Deep Code    | `#001422` | Fondo base (casi negro)   |
| Bright White | `#FFFFFF` | Texto principal           |
| Cyber Cyan   | `#08E1F4` | Acento / inicio gradiente |
| Neon Pulse   | `#086BFC` | Acento azul               |
| Synth Wave   | `#AC31FB` | Acento morado             |
| Hyper Pink   | `#ED2E97` | Acento magenta            |
| Glitch Coral | `#FD6648` | Acento / fin gradiente    |

Gradiente firma: cyan → azul → morado → magenta → coral.

### Logo

- Wordmark `1bite` (negro sobre claro / blanco sobre oscuro).
- Punto de la "i" con anillo degradado.
- Barra gradiente bajo el wordmark.
- Variantes con tagline: "CONCEBIMOS EXPERIENCIAS INDELEBLES" y "BRANDING · SOCIAL · WEB · APPS".
- Assets en `assets/logos/` (12 PNG) y fondos vidrio fluido en `assets/fondos/` (8 PNG).

### Verbal

- Tagline: **Concebimos experiencias indelebles**.
- Departamentos: **Branding · Social · Web · Apps**.
- Est. 2016. Maracaibo, Venezuela. IG @1bite.studio.

## Servicios a mostrar (planes SIN precio)

### Social Media

- **Plan Élite** — negocios con base, contenido de alto impacto. 8 posts, 8 reels, 30 historias diseñadas, +60 orgánicas, Facebook, 6 reels TikTok, 4h The Studio 4, drone, 4 POP, 2 email mkt, WhatsApp Business, stickers, estadísticas, campañas IG/FB/Google Ads.
- **Plan Enterprise** — estrategia profunda + automatización (ManyChat). Todo lo de Élite + 10-12 reels, 8h estudio, 8 POP, Plan Mercadeo 360 trimestral, ManyChat.

### Branding Corporativo

- **Tier Esencial** — manual de identidad: identidad visual base, personalidad de marca, papelería, aplicaciones físicas, manual de comunicaciones.
- **Tier Estratégico** — sistema de marca completo en 5 bloques: fundamentos estratégicos, personalidad verbal, sistema visual completo (WCAG AA), aplicaciones digitales+físicas, gobernanza.

> NOTA: nunca mostrar precios en la web. Los PDFs internos los tienen; la web solo describe y lleva al CTA.

## Estructura del funnel (one-page)

1. **HERO** — fondo vidrio fluido animado, wordmark `1bite` + punto degradado, "Concebimos experiencias indelebles", CTA primario "Comienza".
2. **PROMESA** — texto display gigante con scroll-reveal. Por qué tu marca necesita esto. Engancha.
3. **4 DEPARTAMENTOS** — Branding · Social · Web · Apps. Cards interactivas, hover neón.
4. **PRUEBA SOCIAL** — preview de trabajos destacados (3-4) + logos de clientes + métricas. Link → `/trabajos`.
5. **PLANES** — Élite · Enterprise · Esencial · Estratégico. Cards estilo "SIM card" del PDF (borde gradiente), sin precio, comparativa, CTA por plan.
6. **PROCESO** — moodboard → producción → entrega. Timeline. Genera confianza.
7. **CTA FINAL** — captura de lead / "Comienza tu proyecto". (placeholder; futuro: checkout híbrido).
8. **FOOTER** — IG @1bite.studio, Maracaibo Venezuela, depts, © 2026.

### Página `/trabajos`

Galería de casos destacados (MaraPlus, La Piu, etc.). Grid con hover/motion. Cada caso: marca, qué se hizo, visuales.

## Componentes / unidades (cada una con un propósito claro)

- `FluidBackground` — render de fondos vidrio fluido (imagen + parallax/animación sutil). Reutilizable en hero y transiciones.
- `CustomCursor` — cursor estilo Cuberto (sigue mouse, crece sobre interactivos).
- `SmoothScroll` — wrapper Lenis.
- `Reveal` — wrapper de scroll-reveal (Framer Motion / GSAP ScrollTrigger).
- `GradientBar` — barra gradiente firma (reutilizable bajo títulos/logo).
- `DeptCard` — card de departamento con hover neón.
- `PlanCard` — card SIM-style borde gradiente, sin precio, lista de features, CTA.
- `WorkPreview` / `WorkGrid` — preview en home + grid en /trabajos.
- `ProcessTimeline` — pasos del proceso.
- `LeadCTA` — bloque de captura/CTA final.
- `Nav` / `Footer`.

## Verificación

- Build/lint/typecheck de Next.js sin errores.
- **Playwright**: levantar dev server, navegar `/` y `/trabajos`, screenshots desktop + mobile, confirmar: hero visible, fondos fluidos cargan, 4 depts, 4 planes sin precio, links funcionan, sin errores de consola, responsive correcto.

## Fuera de alcance (v1)

- Stripe Checkout / webhooks / Customer Portal.
- Login / dashboard de cliente.
- Integración real con app1bite / Supabase.
- Compra de logos funcional.
- Backend / formularios que envían (CTA es placeholder visual).
