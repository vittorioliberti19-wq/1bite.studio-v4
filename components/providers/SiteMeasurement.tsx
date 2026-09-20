"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteMeasurement() {
  const pathname = usePathname();
  useEffect(() => {
    window.dispatchEvent(new Event("site-page-view"));
  }, [pathname]);

  return <Script src="/site-measurement.js" strategy="afterInteractive" />;
}
