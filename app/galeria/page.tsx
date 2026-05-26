import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import CTAFinal from "@/components/sections/CTAFinal";
import GaleriaGrid from "@/components/sections/GaleriaGrid";

export const metadata: Metadata = {
  title: "Galería — 1bite",
  description: "Fotos, reels, webs y branding de 1bite Studio.",
};

export default function Galeria() {
  return (
    <main className="flex-1">
      <Nav />
      <GaleriaGrid />
      <CTAFinal />
      <Footer />
    </main>
  );
}
