import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de 1bite Studio para la aplicación 1Bite (herramienta interna y portal de clientes).",
  alternates: { canonical: "/privacidad" },
  openGraph: {
    title: "Política de privacidad · 1bite",
    description:
      "Cómo 1bite Studio recolecta, usa y protege tus datos en la app 1Bite.",
    url: "https://1bite.studio/privacidad",
  },
};

const UPDATED = "19 de septiembre de 2026";

export default function Privacidad() {
  return (
    <main className="flex-1">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44">
        <Reveal>
          <h1 className="mb-3 text-4xl font-bold md:text-6xl">
            Política de privacidad
          </h1>
        </Reveal>
        <p className="mb-12 text-sm text-white/50">
          Última actualización: {UPDATED}
        </p>

        <div className="space-y-10 text-white/80 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:mb-1 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          <section>
            <h2>Privacidad de la web 1bite.studio</h2>
            <p>
              Con tu permiso, la web utiliza Google Analytics para medir visitas,
              páginas y contactos, y Google Ads para atribuir resultados de los
              anuncios. Puedes aceptar, rechazar o elegir cada categoría en el
              botón Cookies. La elección se guarda en este navegador por 180 días.
              Las etiquetas opcionales no se cargan antes de tu elección.
            </p>
            <p>
              Analytics puede procesar identificadores de cookies, datos del
              navegador y ubicación aproximada. Limitamos sus cookies a 180 días.
              Medimos clics en WhatsApp, teléfono y correo, y formularios de
              contacto que confirman su envío. No enviamos a Analytics nombres,
              correos, teléfonos ni contenido de mensajes. Un clic no confirma
              una conversación o una venta. No activamos personalización de
              anuncios, Google Signals ni grabaciones de sesiones.
            </p>
            <p>
              Puedes retirar el permiso desde Cookies; se eliminan las cookies
              de medición accesibles y se recarga la página para detener las
              etiquetas. Esto no elimina automáticamente datos ya recibidos por
              Google. Consulta{" "}
              <a className="underline" href="https://policies.google.com/technologies/partner-sites">
                cómo Google usa la información de sitios que utilizan sus servicios
              </a>.
            </p>
            <p>
              Los datos que envías en formularios se procesan para responder tu
              solicitud. Supabase recibe esos formularios, Cloudflare Turnstile
              ayuda a prevenir abuso y Vercel aloja la web. Esas funciones
              necesarias siguen disponibles aunque rechaces la medición opcional.
              Para solicitudes de acceso o eliminación, escribe a
              gerencia@1bite.studio. La política de la app se detalla a continuación.
            </p>
          </section>
          <section>
            <p>
              Esta política de privacidad describe cómo Liberti Global Corp,
              operando bajo la marca 1bite Studio («1bite», «nosotros»),
              recolecta, usa y protege la información de los usuarios de la
              aplicación <strong>1Bite</strong> (la «App»). La App es una
              herramienta de uso interno para nuestro equipo y un portal privado
              para nuestros clientes. El acceso es cerrado y requiere inicio de
              sesión con credenciales otorgadas por 1bite.
            </p>
          </section>

          <section>
            <h2>1. Información que recolectamos</h2>
            <p>Para operar la App recolectamos:</p>
            <ul>
              <li>
                <strong>Datos de cuenta y contacto:</strong> nombre, apellido,
                correo electrónico y rol dentro de la organización.
              </li>
              <li>
                <strong>Foto de perfil:</strong> si decides cargar una.
              </li>
              <li>
                <strong>Contenido de trabajo:</strong> publicaciones, imágenes,
                videos, comentarios, mensajes de chat y notas que cargas o
                generas dentro de la plataforma como parte del flujo de trabajo
                de la agencia.
              </li>
              <li>
                <strong>Datos de uso e identificadores técnicos:</strong>{" "}
                registros de inicio de sesión, acciones realizadas dentro de la
                App y datos de diagnóstico para mantener la seguridad y
                estabilidad del servicio.
              </li>
            </ul>
            <p>
              No recolectamos datos de ubicación precisa, contactos del
              dispositivo ni información de salud o financiera personal a través
              de la App.
            </p>
          </section>

          <section>
            <h2>2. Cómo usamos la información</h2>
            <ul>
              <li>Autenticar tu acceso y mantener tu sesión.</li>
              <li>
                Permitir la colaboración interna y la gestión de proyectos entre
                el equipo y los clientes.
              </li>
              <li>Enviar notificaciones relacionadas con tu trabajo.</li>
              <li>
                Garantizar la seguridad, prevenir abusos y depurar errores.
              </li>
            </ul>
            <p>
              <strong>
                No vendemos tus datos ni los usamos para publicidad de terceros.
              </strong>
            </p>
          </section>

          <section>
            <h2>3. Proveedores de servicio</h2>
            <p>
              Para prestar el servicio nos apoyamos en proveedores de
              infraestructura que procesan datos por cuenta nuestra:
            </p>
            <ul>
              <li>
                <strong>Supabase</strong> — base de datos, autenticación y
                almacenamiento de imágenes.
              </li>
              <li>
                <strong>Cloudflare</strong> — almacenamiento de archivos de
                video.
              </li>
              <li>
                <strong>Vercel</strong> — alojamiento de la aplicación.
              </li>
            </ul>
            <p>
              Estos proveedores acceden a los datos únicamente para operar la
              infraestructura y están sujetos a sus propias políticas de
              seguridad.
            </p>
          </section>

          <section>
            <h2>4. Conservación de datos</h2>
            <p>
              Conservamos tu información mientras tu cuenta esté activa o
              mientras sea necesario para los fines descritos. Puedes solicitar
              la eliminación de tu cuenta y de los datos asociados
              escribiéndonos al correo indicado abajo.
            </p>
          </section>

          <section>
            <h2>5. Seguridad</h2>
            <p>
              Aplicamos controles de acceso por roles, cifrado en tránsito y
              reglas de seguridad a nivel de base de datos (RLS) para proteger
              tu información. Ningún sistema es 100% infalible, pero trabajamos
              para resguardar tus datos.
            </p>
          </section>

          <section>
            <h2>6. Tus derechos</h2>
            <p>
              Puedes solicitar acceso, corrección o eliminación de tus datos
              personales. Para ejercer estos derechos, contáctanos.
            </p>
          </section>

          <section>
            <h2>7. Menores</h2>
            <p>
              La App está dirigida a uso profesional y no está destinada a
              menores de edad.
            </p>
          </section>

          <section>
            <h2>8. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política. Publicaremos la versión vigente
              en esta página con su fecha de actualización.
            </p>
          </section>

          <section>
            <h2>9. Contacto</h2>
            <p>
              ¿Dudas sobre tu privacidad? Escríbenos a{" "}
              <a
                href="mailto:gerencia@1bite.studio"
                className="text-[#08E1F4] underline"
              >
                gerencia@1bite.studio
              </a>
              .
            </p>
            <p className="text-sm text-white/50">
              © 2026 Liberti Global Corp · 1bite Studio
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
