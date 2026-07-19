import Nav from "@/components/sections/Nav";
import FlyingLogo from "@/components/ui/FlyingLogo";
import Hero from "@/components/sections/Hero";
import Promesa from "@/components/sections/Promesa";
import Departamentos from "@/components/sections/Departamentos";
import Clientes from "@/components/sections/Clientes";
import Ventaja from "@/components/sections/Ventaja";
import BlogStrip from "@/components/sections/BlogStrip";
import Planes from "@/components/sections/Planes";
import Proceso from "@/components/sections/Proceso";
import CTAFinal from "@/components/sections/CTAFinal";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/sections/Footer";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
  return (
    <main className="flex-1">
      <Nav flyingLogo />
      <FlyingLogo />
      <Hero />
      <Promesa />
      <Departamentos />
      <Clientes />
      <Ventaja />
      <Planes />
      <Proceso />
      {/* CTA + Contacto comparten un solo fondo de blobs, sin corte */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <BackgroundGradientAnimation
            interactive={false}
            blendingValue="screen"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <CTAFinal />
        <Contacto />
      </div>
      <BlogStrip />
      <Footer />
    </main>
  );
}
