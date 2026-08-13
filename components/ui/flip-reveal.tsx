"use client";

import { ComponentProps, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

type FlipRevealItemProps = {
  flipKey: string;
} & ComponentProps<"div">;

export const FlipRevealItem = ({ flipKey, ...props }: FlipRevealItemProps) => {
  return <div data-flip={flipKey} {...props} />;
};

type FlipRevealProps = {
  keys: string[];
  showClass?: string;
  hideClass?: string;
} & ComponentProps<"div">;

export const FlipReveal = ({
  keys,
  hideClass = "",
  showClass = "",
  ...props
}: FlipRevealProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const primeraVez = useRef(true);

  const isShow = (key: string | null) =>
    !!key && (keys.includes("all") || keys.includes(key));

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const items = gsap.utils.toArray<HTMLDivElement>(["[data-flip]"]);
      const state = Flip.getState(items);

      items.forEach((item) => {
        const key = item.getAttribute("data-flip");
        if (isShow(key)) {
          item.classList.add(showClass);
          item.classList.remove(hideClass);
        } else {
          item.classList.remove(showClass);
          item.classList.add(hideClass);
        }
      });

      // En el primer montaje no hay transición que animar: los tiles ya están
      // donde deben. Animarlos igual disparaba `absolute: true`, que los saca
      // del flujo, colapsa el alto del grid y genera todo el CLS de la página.
      if (primeraVez.current) {
        primeraVez.current = false;
        return;
      }

      Flip.from(state, {
        duration: 0.6,
        scale: true,
        ease: "power1.inOut",
        // amount = stagger TOTAL repartido entre todos los items; un valor
        // por-item (0.05) con 200+ tiles alargaba el flip ~12s y los tiles
        // absolutos volaban sobre el CTA/footer.
        stagger: { amount: 0.4 },
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
            },
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 0.8 }),
      });
    },

    { scope: wrapperRef, dependencies: [keys] },
  );

  return <div {...props} ref={wrapperRef} />;
};
