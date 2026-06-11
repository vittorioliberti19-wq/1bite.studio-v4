import Nav from "@/components/sections/Nav";
import FlyingLogo from "@/components/ui/FlyingLogo";
import Hero from "@/components/sections/Hero";
import Promesa from "@/components/sections/Promesa";
import Departamentos from "@/components/sections/Departamentos";
import Clientes from "@/components/sections/Clientes";
import Planes from "@/components/sections/Planes";
import Proceso from "@/components/sections/Proceso";
import CTAFinal from "@/components/sections/CTAFinal";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Nav flyingLogo />
      <FlyingLogo />
      <Hero />
      <Promesa />
      <Departamentos />
      <Clientes />
      <Planes />
      <Proceso />
      <CTAFinal />
      <Contacto />
      <Footer />
    </main>
  );
}
