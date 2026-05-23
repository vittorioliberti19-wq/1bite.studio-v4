"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const render = () => {
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const grow = () => el.classList.add("cursor--grow");
    const shrink = () => el.classList.remove("cursor--grow");

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(render);

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor]"),
    );
    targets.forEach((n) => {
      n.addEventListener("mouseenter", grow);
      n.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      targets.forEach((n) => {
        n.removeEventListener("mouseenter", grow);
        n.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-6 w-6 rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 ease-out [&.cursor--grow]:h-14 [&.cursor--grow]:w-14 md:block"
    />
  );
}
