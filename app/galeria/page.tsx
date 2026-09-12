import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import GaleriaGrid from "@/components/sections/GaleriaGrid";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const metadata: Metadata = {
  title: "Portafolio de branding, web y audiovisual en Maracaibo",
  description:
    "Portafolio de branding, páginas web y producción audiovisual de 1bite Studio en Maracaibo, Venezuela. Explora nuestra selección de trabajos.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galería · 1bite",
    description: "Branding, páginas web y producción audiovisual de 1bite Studio en Maracaibo.",
    url: "https://1bite.studio/galeria",
  },
};

export default function Galeria() {
  return (
    <main className="flex-1">
      <Nav />
      {/* galería + CTA comparten el fondo de blobs de la marca */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <BackgroundGradientAnimation
            interactive={false}
            blendingValue="screen"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <GaleriaGrid />
        <CTAFinal />
      </div>
      <Footer />
    </main>
  );
}
