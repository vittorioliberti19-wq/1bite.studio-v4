"use client";

import Image from "next/image";
import { memo, useEffect, useMemo, useRef } from "react";

interface RingConfig {
  radius: number;
  count: number;
  duration: number;
  reverse?: boolean;
  color: string;
}

// gama firma 1bite completa: cyan → azul → morado → magenta → coral
const BRAND = ["#08e1f4", "#086bfc", "#ac31fb", "#ed2e97", "#fd6648"];

interface OrbitingLogosProps {
  logos: string[];
  /** diámetro base del lienzo en px (desktop). Se escala fluido en pantallas chicas. */
  size?: number;
  className?: string;
}

// Reparte los logos en anillos crecientes (los de afuera cargan más).
function buildRings(total: number): RingConfig[] {
  const radii = [108, 172, 236, 300, 364, 428, 492, 556];
  const baseDur = [40, 54, 48, 66, 60, 78, 72, 90];
  const weights = [0.55, 0.8, 1, 1.05, 1.1, 1.1, 1.15, 1.25];

  const sumW = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => Math.round((w / sumW) * total));
  // ajusta para que sume exactamente total
  let diff = total - raw.reduce((a, b) => a + b, 0);
  for (let i = raw.length - 1; diff !== 0 && i >= 0; i--) {
    const step = diff > 0 ? 1 : -1;
    raw[i] += step;
    diff -= step;
  }

  return radii.map((radius, i) => ({
    radius,
    count: Math.max(raw[i], 0),
    duration: baseDur[i],
    reverse: i % 2 === 1,
    color: BRAND[i % BRAND.length],
  }));
}

const Ring = memo(function Ring({
  config,
  logos,
}: {
  config: RingConfig;
  logos: string[];
}) {
  const { radius, count, duration, reverse, color } = config;
  const d = radius * 2;
  const oc = { "--oc": color } as React.CSSProperties;

  return (
    <>
      {/* pista del anillo, teñida con un color firma 1bite */}
      <div
        className="orbit-path absolute left-1/2 top-1/2 rounded-full"
        style={{
          ...oc,
          width: d,
          height: d,
          marginLeft: -radius,
          marginTop: -radius,
          animationDelay: `${(radius % 7) * 0.35}s`,
        }}
      />
      {/* anillo que rota */}
      <div
        className="orbit-spin absolute left-1/2 top-1/2 h-0 w-0"
        style={{
          ...oc,
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {logos.map((src, idx) => {
          const angle = count > 0 ? (idx / count) * 360 : 0;
          return (
            <div
              key={src}
              className="absolute h-0 w-0"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px)`,
              }}
            >
              {/* contrarrotación: cancela el giro del anillo → logo siempre derecho */}
              <div
                className="orbit-counter absolute h-0 w-0"
                style={{
                  animationDuration: `${duration}s`,
                  animationDirection: reverse ? "normal" : "reverse",
                }}
              >
                <div
                  style={{ transform: `rotate(${-angle}deg)` }}
                  className="absolute h-0 w-0"
                >
                  <div
                    data-cursor
                    className="group/logo absolute grid h-14 w-[5.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-white/[0.02] p-2 ring-1 ring-white/5 transition-[transform,background,box-shadow] duration-300 hover:scale-[1.35] hover:bg-white/[0.07] hover:shadow-[0_0_26px_color-mix(in_srgb,var(--oc)_45%,transparent)]"
                  >
                    <Image
                      src={src}
                      alt=""
                      width={80}
                      height={44}
                      loading="lazy"
                      draggable={false}
                      className="h-auto max-h-9 w-auto max-w-[64px] object-contain opacity-45 transition-opacity duration-300 group-hover/logo:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});

function OrbitingLogos({
  logos,
  size = 1180,
  className = "",
}: OrbitingLogosProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Pausa la animación cuando la órbita sale del viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.dataset.active = "false";
    const io = new IntersectionObserver(
      ([e]) => {
        el.dataset.active = e.isIntersecting ? "true" : "false";
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rings = useMemo(() => {
    const cfg = buildRings(logos.length);
    let cursor = 0;
    return cfg.map((c, i) => {
      const slice = logos.slice(cursor, cursor + c.count);
      cursor += c.count;
      return { key: i, config: c, logos: slice };
    });
  }, [logos]);

  return (
    <div
      ref={rootRef}
      className={`orbit-root relative mx-auto aspect-square overflow-hidden ${className}`}
      style={{ width: `min(94vw, ${size}px)` }}
    >
      <div
        className="orbit-stage absolute left-1/2 top-1/2"
        style={{
          width: size,
          height: size,
          transform: `translate(-50%, -50%) scale(min(1, calc(94vw / ${size}px)))`,
          transformOrigin: "center",
        }}
      >
        {/* centro: logo 1bite */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="relative grid h-32 w-32 place-items-center">
            <div className="absolute inset-0 rounded-full bg-cyber-cyan/25 blur-2xl" />
            <div className="absolute inset-2 rounded-full bg-synth-wave/20 blur-3xl" />
            <Image
              src="/logos/1bite-white.png"
              alt="1bite Studio"
              width={150}
              height={60}
              priority
              className="relative z-10 h-auto w-24 object-contain"
            />
          </div>
        </div>

        {rings.map((r) => (
          <Ring key={r.key} config={r.config} logos={r.logos} />
        ))}
      </div>
    </div>
  );
}

export default memo(OrbitingLogos);
