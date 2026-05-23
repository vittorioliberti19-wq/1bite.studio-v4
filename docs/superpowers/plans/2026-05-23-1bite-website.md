# 1bite.studio Website V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la web nueva de 1bite Studio (rebrand 2026) como funnel de ventas one-page + página `/trabajos`, premium Apple-fluid + interactividad Cuberto, en Next.js, verificada con Playwright.

**Architecture:** Next.js (App Router) + Tailwind. Smooth scroll con Lenis, animaciones con GSAP ScrollTrigger + Framer Motion, cursor custom. Fondos vidrio fluido como `next/image` con parallax. Sin backend de pago (v1 solo visual; CTAs placeholder). Verificación visual con Playwright (no unit tests — proyecto visual).

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP, Lenis, Framer Motion, Playwright.

---

## File Structure

```
app/
  layout.tsx              Root: fonts, <SmoothScroll>, <CustomCursor>, metadata
  page.tsx                Home one-page: ensambla secciones del funnel
  trabajos/page.tsx       Página de trabajos destacados
  globals.css             Tailwind + tokens de marca (vars CSS paleta)
components/
  providers/SmoothScroll.tsx   Wrapper Lenis
  ui/CustomCursor.tsx          Cursor estilo Cuberto
  ui/GradientBar.tsx           Barra gradiente firma
  ui/Reveal.tsx                Wrapper scroll-reveal (Framer Motion)
  ui/FluidBackground.tsx       Fondo vidrio fluido + parallax
  sections/Nav.tsx
  sections/Hero.tsx
  sections/Promesa.tsx
  sections/Departamentos.tsx   4 DeptCard
  sections/PruebaSocial.tsx    preview trabajos + logos clientes
  sections/Planes.tsx          4 PlanCard
  sections/Proceso.tsx         timeline
  sections/CTAFinal.tsx        LeadCTA
  sections/Footer.tsx
  cards/DeptCard.tsx
  cards/PlanCard.tsx
  cards/WorkCard.tsx
lib/
  content.ts              Data: depts, planes (sin precio), trabajos, proceso
public/
  logos/                  PNGs del wordmark (desde assets/logos)
  fondos/                 PNGs vidrio fluido (desde assets/fondos)
tests/
  visual.spec.ts          Playwright: home + /trabajos, desktop+mobile
playwright.config.ts
```

---

## Task 1: Scaffold Next.js + Tailwind + deps

**Files:**

- Create: proyecto Next en `~/Projects/1bite.studio`
- Modify: `app/globals.css`, `tailwind.config.ts`

- [ ] **Step 1: Crear app Next (sin sobrescribir docs/assets)**

```bash
cd ~/Projects/1bite.studio
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint --use-npm --yes
```

Si `create-next-app` se queja de carpeta no vacía: crear en `/tmp/1bite-next` y copiar todo menos `docs/`, `assets/`, `.git/`.

- [ ] **Step 2: Instalar libs de animación + Playwright**

```bash
npm i gsap lenis framer-motion
npm i -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 3: Mover assets a public/**

```bash
mkdir -p public/logos public/fondos
cp assets/logos/*.png public/logos/
cp assets/fondos/*.png public/fondos/
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build OK sin errores.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js + Tailwind + animation deps + assets"
```

---

## Task 2: Tokens de marca + globals

**Files:**

- Modify: `app/globals.css`

- [ ] **Step 1: Definir variables CSS de la paleta + gradiente firma + base oscura**

```css
@import "tailwindcss";

:root {
  --deep-code: #001422;
  --white: #ffffff;
  --cyber-cyan: #08e1f4;
  --neon-pulse: #086bfc;
  --synth-wave: #ac31fb;
  --hyper-pink: #ed2e97;
  --glitch-coral: #fd6648;
  --grad-firma: linear-gradient(
    90deg,
    var(--cyber-cyan),
    var(--neon-pulse),
    var(--synth-wave),
    var(--hyper-pink),
    var(--glitch-coral)
  );
}

html,
body {
  background: var(--deep-code);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
}

* {
  cursor: none;
} /* habilita cursor custom; fallback en mobile via media query */

@media (pointer: coarse) {
  * {
    cursor: auto;
  }
}
```

- [ ] **Step 2: Verificar dev**

Run: `npm run dev` (background), abrir `http://localhost:3000`
Expected: fondo Deep Code oscuro, sin errores de consola.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "style: marca tokens (paleta + gradiente firma) en globals"
```

---

## Task 3: Contenido (data) — depts, planes, trabajos, proceso

**Files:**

- Create: `lib/content.ts`

- [ ] **Step 1: Escribir data tipada (planes SIN precio)**

```ts
export const depts = [
  {
    id: "branding",
    title: "Branding",
    desc: "Sistemas de marca estratégicos, memorables y coherentes.",
  },
  {
    id: "social",
    title: "Social",
    desc: "Contenido que vende. Producción profesional + estrategia.",
  },
  {
    id: "web",
    title: "Web",
    desc: "Sitios y experiencias digitales de alto impacto.",
  },
  {
    id: "apps",
    title: "Apps",
    desc: "Productos y automatizaciones a la medida.",
  },
];

export const planes = [
  {
    id: "elite",
    cat: "Social Media",
    name: "Plan Élite",
    tagline: "Para negocios listos a invertir en alto impacto.",
    features: [
      "8 publicaciones + 8 reels/mes",
      "30 historias diseñadas + 60 orgánicas",
      "Producción audiovisual + drone",
      "4h en The Studio 4",
      "WhatsApp Business + campañas IG/FB/Google",
    ],
  },
  {
    id: "enterprise",
    cat: "Social Media",
    name: "Plan Enterprise",
    tagline: "Estrategia profunda + automatización avanzada.",
    features: [
      "Todo lo de Élite",
      "10-12 reels/mes + 8h estudio",
      "Plan de Mercadeo 360 trimestral",
      "Automatización con ManyChat",
      "8 diseños POP/mes",
    ],
  },
  {
    id: "esencial",
    cat: "Branding",
    name: "Tier Esencial",
    tagline: "Manual de identidad corporativa.",
    features: [
      "Identidad visual base + logo (3 propuestas)",
      "Personalidad de marca",
      "Papelería corporativa",
      "Aplicaciones físicas",
      "Manual de comunicaciones",
    ],
  },
  {
    id: "estrategico",
    cat: "Branding",
    name: "Tier Estratégico",
    tagline: "Sistema de marca completo en 5 bloques.",
    features: [
      "Fundamentos estratégicos",
      "Personalidad verbal",
      "Sistema visual completo (WCAG AA)",
      "Aplicaciones digitales + físicas",
      "Gobernanza de marca",
    ],
  },
];

export const trabajos = [
  {
    id: "maraplus",
    marca: "MaraPlus",
    tipo: "Social Media",
    img: "/fondos/fondo 2.png",
  },
  {
    id: "lapiu",
    marca: "La Piu",
    tipo: "Branding + Social",
    img: "/fondos/fondo 3.png",
  },
  // añadir reales cuando haya imágenes de casos
];

export const proceso = [
  { n: "01", t: "Moodboard", d: "Propuesta inicial de cómo se verá tu marca." },
  {
    n: "02",
    t: "Producción",
    d: "Equipos de producción audiovisual + contenido.",
  },
  { n: "03", t: "Entrega", d: "Sistema entregado con presentación ejecutiva." },
];
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: content data (depts, planes sin precio, trabajos, proceso)"
```

---

## Task 4: Primitivas UI (SmoothScroll, CustomCursor, GradientBar, Reveal, FluidBackground)

**Files:**

- Create: `components/providers/SmoothScroll.tsx`, `components/ui/CustomCursor.tsx`, `components/ui/GradientBar.tsx`, `components/ui/Reveal.tsx`, `components/ui/FluidBackground.tsx`

- [ ] **Step 1: SmoothScroll (Lenis)**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    let raf: number;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: CustomCursor (Cuberto-style)**

```tsx
"use client";
import { useEffect, useRef } from "react";
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const grow = () => el.classList.add("cursor--grow");
    const shrink = () => el.classList.remove("cursor--grow");
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cursor]").forEach((n) => {
      n.addEventListener("mouseenter", grow);
      n.addEventListener("mouseleave", shrink);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-3 -mt-3 h-6 w-6 rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 [&.cursor--grow]:h-12 [&.cursor--grow]:w-12"
    />
  );
}
```

- [ ] **Step 3: GradientBar**

```tsx
export default function GradientBar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`h-[2px] w-full rounded-full ${className}`}
      style={{ background: "var(--grad-firma)" }}
    />
  );
}
```

- [ ] **Step 4: Reveal (Framer Motion)**

```tsx
"use client";
import { motion } from "framer-motion";
export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: FluidBackground (parallax)**

```tsx
"use client";
import Image from "next/image";
export default function FluidBackground({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(transparent, var(--deep-code) 80%)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 6: Verificar typecheck**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: UI primitives (smooth scroll, cursor, gradient bar, reveal, fluid bg)"
```

---

## Task 5: Layout raíz (fonts + providers + metadata SEO)

**Files:**

- Modify: `app/layout.tsx`

- [ ] **Step 1: Cargar fuente display + envolver con providers + metadata**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "1bite — Concebimos experiencias indelebles",
  description: "Agencia creativa en Maracaibo. Branding · Social · Web · Apps.",
  openGraph: {
    title: "1bite",
    description: "Concebimos experiencias indelebles",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-[family-name:var(--font-display)] antialiased">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

> NOTA: Inter es placeholder. Si el manual define otra fuente (parece geométrica sans estilo Helvetica/Neue Montreal), reemplazar aquí. Confirmar fuente exacta con Vittorio o usar local font.

- [ ] **Step 2: Verificar dev sin errores de consola**

Run: `npm run dev`; abrir localhost:3000
Expected: cursor custom visible, scroll suave.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: root layout (font, providers, SEO metadata)"
```

---

## Task 6: Nav + Hero

**Files:**

- Create: `components/sections/Nav.tsx`, `components/sections/Hero.tsx`

- [ ] **Step 1: Nav fijo translúcido**

```tsx
import Image from "next/image";
import Link from "next/link";
export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md md:px-12">
      <Image
        src="/logos/logo png_Mesa de trabajo 1 copia 11.png"
        alt="1bite"
        width={90}
        height={32}
        className="h-8 w-auto invert"
        priority
      />
      <div className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
        <a href="#departamentos">Servicios</a>
        <a href="#planes">Planes</a>
        <Link href="/trabajos">Trabajos</Link>
        <a href="#contacto">Contacto</a>
      </div>
      <a
        href="#contacto"
        className="rounded-full border border-white/30 px-5 py-2 text-sm"
      >
        Comienza
      </a>
    </nav>
  );
}
```

> El nombre exacto del PNG wordmark blanco/negro se confirma listando `public/logos/`. Ajustar src tras inspección visual.

- [ ] **Step 2: Hero con fondo fluido + wordmark + tagline**

```tsx
import FluidBackground from "@/components/ui/FluidBackground";
import GradientBar from "@/components/ui/GradientBar";
export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <FluidBackground src="/fondos/fondo 1.png" />
      <h1 className="text-[18vw] font-bold leading-none tracking-tight md:text-[12vw]">
        1bite
      </h1>
      <GradientBar className="mt-2 max-w-md" />
      <p className="mt-6 max-w-xl text-balance text-lg uppercase tracking-[0.3em] text-white/80 md:text-2xl">
        Concebimos experiencias indelebles
      </p>
      <a
        href="#contacto"
        className="mt-10 rounded-full bg-white px-8 py-4 font-medium text-[color:var(--deep-code)]"
        data-cursor
      >
        Comienza
      </a>
    </section>
  );
}
```

- [ ] **Step 3: Verificar visual en dev**

Abrir localhost:3000: hero a pantalla completa, fondo fluido, wordmark gigante, CTA.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Nav + Hero con fondo fluido"
```

---

## Task 7: Promesa + Departamentos (DeptCard)

**Files:**

- Create: `components/sections/Promesa.tsx`, `components/sections/Departamentos.tsx`, `components/cards/DeptCard.tsx`

- [ ] **Step 1: Promesa (texto display + reveal)**

```tsx
import Reveal from "@/components/ui/Reveal";
export default function Promesa() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-40">
      <Reveal>
        <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl">
          Tu marca no necesita otro post. Necesita una{" "}
          <span
            style={{
              background: "var(--grad-firma)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            experiencia indeleble
          </span>{" "}
          que venda por ti.
        </h2>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: DeptCard (hover neón)**

```tsx
"use client";
export default function DeptCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div
      data-cursor
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-white/30"
    >
      <div
        className="absolute -inset-px -z-10 opacity-0 blur-2xl transition group-hover:opacity-40"
        style={{ background: "var(--grad-firma)" }}
      />
      <h3 className="text-3xl font-bold">{title}</h3>
      <p className="mt-3 text-white/70">{desc}</p>
    </div>
  );
}
```

- [ ] **Step 3: Departamentos (grid 4)**

```tsx
import { depts } from "@/lib/content";
import DeptCard from "@/components/cards/DeptCard";
import Reveal from "@/components/ui/Reveal";
export default function Departamentos() {
  return (
    <section id="departamentos" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <h2 className="mb-12 text-center text-sm uppercase tracking-[0.4em] text-white/60">
          Branding · Social · Web · Apps
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {depts.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.1}>
            <DeptCard title={d.title} desc={d.desc} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar typecheck + visual**

Run: `npx tsc --noEmit`; revisar localhost.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Promesa + Departamentos (4 dept cards hover neón)"
```

---

## Task 8: Prueba social + WorkCard

**Files:**

- Create: `components/sections/PruebaSocial.tsx`, `components/cards/WorkCard.tsx`

- [ ] **Step 1: WorkCard**

```tsx
import Image from "next/image";
export default function WorkCard({
  marca,
  tipo,
  img,
}: {
  marca: string;
  tipo: string;
  img: string;
}) {
  return (
    <div
      data-cursor
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
    >
      <Image
        src={img}
        alt={marca}
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-5 left-5">
        <p className="text-xl font-bold">{marca}</p>
        <p className="text-sm text-white/70">{tipo}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: PruebaSocial (preview + link /trabajos)**

```tsx
import Link from "next/link";
import { trabajos } from "@/lib/content";
import WorkCard from "@/components/cards/WorkCard";
import Reveal from "@/components/ui/Reveal";
export default function PruebaSocial() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-4xl font-bold md:text-5xl">Trabajos</h2>
          <Link
            href="/trabajos"
            className="text-sm uppercase tracking-widest underline"
          >
            Ver todos
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {trabajos.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1}>
            <WorkCard {...t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: Prueba social (preview trabajos + WorkCard)"
```

---

## Task 9: Planes (PlanCard SIM-style, sin precio)

**Files:**

- Create: `components/sections/Planes.tsx`, `components/cards/PlanCard.tsx`

- [ ] **Step 1: PlanCard borde gradiente (sin precio)**

```tsx
import GradientBar from "@/components/ui/GradientBar";
type Plan = { cat: string; name: string; tagline: string; features: string[] };
export default function PlanCard({ cat, name, tagline, features }: Plan) {
  return (
    <div
      data-cursor
      className="relative rounded-[2rem] p-[1.5px]"
      style={{ background: "var(--grad-firma)" }}
    >
      <div className="flex h-full flex-col rounded-[2rem] bg-[color:var(--deep-code)] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {cat}
        </p>
        <h3 className="mt-2 text-3xl font-bold">{name}</h3>
        <p className="mt-1 text-white/60">{tagline}</p>
        <GradientBar className="my-6" />
        <ul className="space-y-3 text-sm text-white/80">
          {features.map((f) => (
            <li key={f} className="flex gap-2">
              <span style={{ color: "var(--cyber-cyan)" }}>›</span>
              {f}
            </li>
          ))}
        </ul>
        <a
          href="#contacto"
          className="mt-8 rounded-full border border-white/30 py-3 text-center font-medium transition hover:bg-white hover:text-[color:var(--deep-code)]"
        >
          Quiero este plan
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Planes (grid)**

```tsx
import { planes } from "@/lib/content";
import PlanCard from "@/components/cards/PlanCard";
import Reveal from "@/components/ui/Reveal";
export default function Planes() {
  return (
    <section id="planes" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">
          Planes
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {planes.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <PlanCard {...p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar — NINGÚN precio en el DOM**

Run: `npm run dev`; en localhost buscar texto de precios ($, 690, 1000, 1200, 2500). No deben aparecer.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Planes (4 PlanCard SIM-style sin precio)"
```

---

## Task 10: Proceso + CTA final + Footer

**Files:**

- Create: `components/sections/Proceso.tsx`, `components/sections/CTAFinal.tsx`, `components/sections/Footer.tsx`

- [ ] **Step 1: Proceso (timeline)**

```tsx
import { proceso } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
export default function Proceso() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <h2 className="mb-16 text-4xl font-bold md:text-5xl">
          Cómo trabajamos
        </h2>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-3">
        {proceso.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.12}>
            <div>
              <span
                className="text-5xl font-bold"
                style={{
                  background: "var(--grad-firma)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {p.n}
              </span>
              <h3 className="mt-3 text-2xl font-bold">{p.t}</h3>
              <p className="mt-2 text-white/70">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: CTAFinal (lead placeholder)**

```tsx
import FluidBackground from "@/components/ui/FluidBackground";
export default function CTAFinal() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden px-6 py-40 text-center"
    >
      <FluidBackground src="/fondos/fondo 4.png" />
      <h2 className="text-balance text-5xl font-bold md:text-7xl">
        ¿Listo para empezar?
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-white/70">
        Cuéntanos de tu marca y te armamos la propuesta.
      </p>
      <a
        href="https://wa.me/"
        data-cursor
        className="mt-10 inline-block rounded-full bg-white px-10 py-4 font-medium text-[color:var(--deep-code)]"
      >
        Comienza tu proyecto
      </a>
    </section>
  );
}
```

> CTA href placeholder. Confirmar número WhatsApp / destino con Vittorio (futuro: checkout híbrido).

- [ ] **Step 3: Footer**

```tsx
import GradientBar from "@/components/ui/GradientBar";
export default function Footer() {
  return (
    <footer className="px-6 py-16">
      <GradientBar className="mb-8" />
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
        <p>© 2026 1bite Studio · Maracaibo, Venezuela</p>
        <p className="uppercase tracking-widest">
          Branding · Social · Web · Apps
        </p>
        <a href="https://instagram.com/1bite.studio" data-cursor>
          @1bite.studio
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Proceso + CTA final + Footer"
```

---

## Task 11: Ensamblar Home + página /trabajos

**Files:**

- Modify: `app/page.tsx`
- Create: `app/trabajos/page.tsx`

- [ ] **Step 1: Home ensambla el funnel**

```tsx
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Promesa from "@/components/sections/Promesa";
import Departamentos from "@/components/sections/Departamentos";
import PruebaSocial from "@/components/sections/PruebaSocial";
import Planes from "@/components/sections/Planes";
import Proceso from "@/components/sections/Proceso";
import CTAFinal from "@/components/sections/CTAFinal";
import Footer from "@/components/sections/Footer";
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Promesa />
      <Departamentos />
      <PruebaSocial />
      <Planes />
      <Proceso />
      <CTAFinal />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: /trabajos (grid completo)**

```tsx
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import WorkCard from "@/components/cards/WorkCard";
import Reveal from "@/components/ui/Reveal";
import { trabajos } from "@/lib/content";
export default function Trabajos() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-40">
        <h1 className="mb-12 text-6xl font-bold">Trabajos</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {trabajos.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <WorkCard {...t} />
            </Reveal>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build OK, ambas rutas generadas.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: ensamblar Home funnel + página /trabajos"
```

---

## Task 12: Verificación Playwright (desktop + mobile)

**Files:**

- Create: `playwright.config.ts`, `tests/visual.spec.ts`

- [ ] **Step 1: Config Playwright (levanta dev server)**

```ts
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120000,
  },
  use: { baseURL: "http://localhost:3000" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
```

- [ ] **Step 2: Test visual + asserts de funnel + NO precios**

```ts
import { test, expect } from "@playwright/test";

test("home: funnel completo, sin precios, sin errores de consola", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "1bite" }),
  ).toBeVisible();
  await expect(
    page.getByText("Concebimos experiencias indelebles"),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Plan Élite" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Plan Enterprise" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tier Esencial" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tier Estratégico" }),
  ).toBeVisible();
  const body = await page.textContent("body");
  for (const precio of [
    "$690",
    "$1,000",
    "$1,200",
    "$2,500",
    "690",
    "1000",
    "1200",
    "2500",
  ]) {
    expect(body).not.toContain(precio);
  }
  await page.screenshot({ path: "test-results/home.png", fullPage: true });
  expect(errors).toEqual([]);
});

test("trabajos: carga y muestra grid", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Ver todos" }).click();
  await expect(page).toHaveURL(/\/trabajos/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Trabajos" }),
  ).toBeVisible();
  await page.screenshot({ path: "test-results/trabajos.png", fullPage: true });
});
```

- [ ] **Step 3: Correr Playwright**

Run: `npx playwright test`
Expected: ambos tests PASS, desktop+mobile. Screenshots en `test-results/`.
Si falla por precios visibles → revisar que `lib/content.ts` no tenga números de precio.

- [ ] **Step 4: Revisar screenshots**

Leer `test-results/home.png` y `test-results/trabajos.png`. Confirmar visual premium, fondos fluidos, layout responsive. Si feo → iterar estilos (no rompe tests).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "test: verificación visual Playwright (home + trabajos, desktop+mobile)"
```

---

## Task 13: Pulido final + assets reales de logo

**Files:**

- Modify: componentes que referencian PNGs

- [ ] **Step 1: Inspeccionar logos disponibles**

Run: `ls public/logos/`
Identificar visualmente (Read en cada PNG si hace falta): wordmark blanco, wordmark con tagline, punto degradado. Ajustar `src` en Nav/Hero al PNG correcto. El wordmark sobre fondo oscuro necesita versión blanca (o `invert`).

- [ ] **Step 2: Re-verificar Playwright + screenshots**

Run: `npx playwright test`
Expected: PASS. Screenshots se ven correctos (logo nítido, no pixelado/invertido mal).

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "polish: logos reales + ajustes visuales finales"
```

---

## Self-Review (cobertura del spec)

- Hero, Promesa, 4 Depts, Prueba social, Planes, Proceso, CTA, Footer → Tasks 6-11 ✓
- Página /trabajos → Task 11 ✓
- Planes sin precio (Élite/Enterprise/Esencial/Estratégico) → Task 9, verificado Task 12 ✓
- Paleta + gradiente firma → Task 2 ✓
- Fondos vidrio fluido → Task 4 (FluidBackground), usado en Hero/CTA ✓
- Cursor Cuberto + smooth scroll Apple-fluid → Tasks 4-5 ✓
- Next.js + Vercel stack → Task 1 ✓
- Verificación Playwright desktop+mobile → Task 12 ✓
- Fuera de alcance (Stripe, login, app1bite) → respetado, CTAs placeholder ✓

**Pendientes a confirmar con Vittorio durante ejecución:** fuente exacta del manual (Inter es placeholder), nombre del PNG wordmark correcto, destino del CTA (WhatsApp), imágenes reales de casos para /trabajos.
