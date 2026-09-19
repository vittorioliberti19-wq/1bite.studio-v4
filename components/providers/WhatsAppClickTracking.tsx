"use client";

import { useEffect } from "react";

type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// One delegated listener covers links, dynamically rendered quiz results and buttons.
// This measures outbound clicks only; it cannot confirm a chat or a qualified lead.
export default function WhatsAppClickTracking({ sendTo }: { sendTo: string }) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      const target = event.target instanceof Element ? event.target : null;
      const control = target?.closest<HTMLAnchorElement | HTMLButtonElement>(
        "a[href], button[data-whatsapp-click]",
      );
      if (!control || control.matches(":disabled")) return;

      const isLink = control instanceof HTMLAnchorElement;
      if (event.type === "auxclick" ? event.button !== 1 || !isLink : event.button !== 0) return;
      if (isLink) {
        const url = new URL(control.href);
        if (url.protocol !== "https:" || !["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) return;
      }

      // Never include the outbound URL: it contains a phone number and chat text.
      const tagWindow = window as TagWindow;
      // Preserve an early click until the base tag initializes.
      tagWindow.dataLayer = tagWindow.dataLayer || [];
      tagWindow.gtag = tagWindow.gtag || function () {
        // Match the Google tag's Arguments-object queue format.
        // eslint-disable-next-line prefer-rest-params
        tagWindow.dataLayer!.push(arguments);
      };
      tagWindow.gtag("event", "conversion", { send_to: sendTo });
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, [sendTo]);

  return null;
}
