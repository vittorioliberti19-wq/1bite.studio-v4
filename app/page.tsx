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
    <main className="flex-1">
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
