import type { Pregunta } from "./cuestionarios";

// Brief de alcance: cada opción levanta una necesidad para cotizar; no promete
// que una función, integración, costo o fecha quede incluida.
export const PREGUNTAS_METRO_RENT: Pregunta[] = [
  { n: "01", titulo: "Punto de partida", sub: "Cuéntanos qué quieres lograr con Metro Rent.", campos: [
    { t: "area", name: "Objetivo principal", ph: "Ej.: captar propietarios, publicar inmuebles y recibir interesados mejor calificados." },
    { t: "check", name: "Objetivos de negocio", opciones: [{ v: "Vender", l: "Vender inmuebles" }, { v: "Alquiler largo", l: "Alquiler a largo plazo" }, { v: "Captar propietarios", l: "Captar propietarios" }, { v: "Fortalecer marca", l: "Fortalecer marca" }, { v: "Ordenar operacion", l: "Ordenar la operación" }, { v: "Por definir", l: "Por definir" }] },
    { t: "text", name: "Resultado esperado al primer año", ph: "Qué cambiaría si el proyecto funciona bien" },
  ] },
  { n: "02", titulo: "Modelo de catálogo", campos: [
    { t: "radio", name: "Origen de publicaciones", opciones: [{ v: "Propias", l: "Solo inmuebles propios" }, { v: "Agencias", l: "Solo agencias aliadas" }, { v: "Propietarios", l: "Propietarios publican directamente" }, { v: "Mixto", l: "Propios, agencias y propietarios" }, { v: "Por definir", l: "Por definir" }] },
    { t: "check", name: "Quienes gestionan avisos", opciones: [{ v: "Equipo Metro Rent", l: "Equipo Metro Rent" }, { v: "Asesores", l: "Asesores inmobiliarios" }, { v: "Agencias", l: "Agencias aliadas" }, { v: "Propietarios", l: "Propietarios" }] },
    { t: "area", name: "Reglas del marketplace", ph: "Si terceros publican: requisitos, comisiones, zonas o reglas que ya estén decididas. Escribe «por definir» si aplica." },
  ] },
  { n: "03", titulo: "Ciudades y cobertura", campos: [
    { t: "text", name: "Ciudad de lanzamiento", ph: "Ej.: Maracaibo; indica municipios o zonas prioritarias" },
    { t: "text", name: "Otras ciudades previstas", ph: "Ciudades para fase posterior o «ninguna por ahora»" },
    { t: "radio", name: "Cobertura inicial", opciones: [{ v: "Maracaibo", l: "Solo Maracaibo" }, { v: "Zulia", l: "Varias ciudades del Zulia" }, { v: "Nacional", l: "Varias ciudades de Venezuela" }, { v: "Por definir", l: "Por definir" }] },
  ] },
  { n: "04", titulo: "Tipos de inmueble", campos: [
    { t: "check", name: "Inmuebles de lanzamiento", opciones: [{ v: "Apartamentos", l: "Apartamentos" }, { v: "Casas", l: "Casas" }, { v: "Townhouses", l: "Townhouses" }, { v: "Locales", l: "Locales comerciales" }, { v: "Oficinas", l: "Oficinas" }, { v: "Terrenos", l: "Terrenos" }, { v: "Galpones", l: "Galpones" }, { v: "Otro", l: "Otro" }] },
    { t: "text", name: "Tipos o segmentos especiales", ph: "Ej.: lujo, inversión, nuevos proyectos, estudiantes, corporativo" },
    { t: "area", name: "Inmuebles no permitidos", ph: "Tipos, zonas o condiciones que no deben publicarse" },
  ] },
  { n: "05", titulo: "Operación actual", campos: [
    { t: "radio", name: "Estado de la operación", opciones: [{ v: "Operando", l: "Ya operamos con inventario y equipo" }, { v: "Reactivacion", l: "Estamos reactivando la operación" }, { v: "Nueva", l: "Es una operación nueva" }, { v: "Por definir", l: "Por definir" }] },
    { t: "text", name: "Inventario actual aproximado", ph: "Cantidad de inmuebles activos, si la sabes" },
    { t: "area", name: "Flujo actual", ph: "Cómo reciben inmuebles, publican, atienden interesados y cierran hoy" },
  ] },
  { n: "06", titulo: "Ingresos y comisiones", campos: [
    { t: "check", name: "Fuentes de ingreso", opciones: [{ v: "Comision venta", l: "Comisión por venta" }, { v: "Comision alquiler", l: "Comisión por alquiler" }, { v: "Publicacion paga", l: "Publicación paga o planes" }, { v: "Destacados", l: "Avisos destacados" }, { v: "Servicios", l: "Servicios adicionales" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Reglas de cobro", ph: "Porcentajes, montos, quién paga y cuándo; o «por definir»." },
    { t: "text", name: "Facturacion requerida", ph: "País y sistema de facturación, si aplica" },
  ] },
  { n: "07", titulo: "Volumen de lanzamiento", campos: [
    { t: "text", name: "Avisos para lanzamiento", ph: "Cantidad estimada de publicaciones iniciales" },
    { t: "text", name: "Usuarios esperados", ph: "Visitantes, asesores, propietarios o agencias estimados al inicio" },
    { t: "area", name: "Crecimiento esperado", ph: "Metas de inventario, ciudades o usuarios para los próximos 12 meses" },
  ] },
  { n: "08", titulo: "Usuarios y accesos", campos: [
    { t: "check", name: "Perfiles necesarios", opciones: [{ v: "Visitante", l: "Visitante público" }, { v: "Comprador", l: "Comprador o inquilino" }, { v: "Propietario", l: "Propietario" }, { v: "Asesor", l: "Asesor" }, { v: "Agencia", l: "Agencia" }, { v: "Moderador", l: "Moderador" }, { v: "Administrador", l: "Administrador" }] },
    { t: "area", name: "Permisos y privacidad", ph: "Qué puede ver, editar o aprobar cada perfil. Indica información que nunca debe mostrarse públicamente." },
    { t: "text", name: "Equipo interno inicial", ph: "Personas y roles que administrarán la plataforma" },
  ] },
  { n: "09", titulo: "Datos de cada inmueble", campos: [
    { t: "check", name: "Ficha base", opciones: [{ v: "Tipo", l: "Tipo de inmueble" }, { v: "Metros", l: "Metros cuadrados" }, { v: "Habitaciones", l: "Habitaciones y baños" }, { v: "Puestos", l: "Puestos de estacionamiento" }, { v: "Antiguedad", l: "Antigüedad" }, { v: "Estado", l: "Estado del inmueble" }, { v: "Descripcion", l: "Descripción" }] },
    { t: "area", name: "Campos obligatorios", ph: "Datos que deben exigirse antes de publicar un inmueble" },
    { t: "area", name: "Campos especiales", ph: "Ej.: condominio, piso, amoblado, documentos, código interno, coordenadas" },
  ] },
  { n: "10", titulo: "Características y amenidades", campos: [
    { t: "check", name: "Amenidades para filtrar", opciones: [{ v: "Piscina", l: "Piscina" }, { v: "Planta", l: "Planta eléctrica" }, { v: "Agua", l: "Pozo o agua constante" }, { v: "Seguridad", l: "Seguridad" }, { v: "Ascensor", l: "Ascensor" }, { v: "Mascotas", l: "Acepta mascotas" }, { v: "Amoblado", l: "Amoblado" }, { v: "Otro", l: "Otras" }] },
    { t: "area", name: "Otras características", ph: "Lista las que sean importantes para tu mercado" },
    { t: "radio", name: "Formato de amenidades", opciones: [{ v: "Catalogo fijo", l: "Catálogo fijo administrado por Metro Rent" }, { v: "Libre", l: "Texto libre en cada publicación" }, { v: "Mixto", l: "Ambos" }, { v: "Por definir", l: "Por definir" }] },
  ] },
  { n: "11", titulo: "Ubicación y privacidad", campos: [
    { t: "radio", name: "Direccion publica", opciones: [{ v: "Exacta", l: "Dirección exacta" }, { v: "Zona", l: "Solo zona o urbanización" }, { v: "Aproximada", l: "Ubicación aproximada en mapa" }, { v: "Segun propietario", l: "Según autorización del propietario" }, { v: "Por definir", l: "Por definir" }] },
    { t: "check", name: "Datos sensibles", opciones: [{ v: "Telefono oculto", l: "Ocultar teléfono" }, { v: "Email oculto", l: "Ocultar correo" }, { v: "Dueno oculto", l: "Ocultar identidad del dueño" }, { v: "Documentos privados", l: "Documentos solo internos" }] },
    { t: "area", name: "Reglas de ubicación", ph: "Qué se puede mostrar antes y después de que un interesado se identifique" },
  ] },
  { n: "12", titulo: "Precios y moneda", campos: [
    { t: "check", name: "Monedas", opciones: [{ v: "USD", l: "USD" }, { v: "Bs", l: "Bolívares" }, { v: "EUR", l: "EUR" }, { v: "Otra", l: "Otra" }] },
    { t: "radio", name: "Precio visible", opciones: [{ v: "Obligatorio", l: "Siempre obligatorio" }, { v: "Consultar", l: "Permitir «consultar precio»" }, { v: "Segun aviso", l: "Según cada aviso" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Reglas de precio", ph: "Rangos, tasas, gastos adicionales, comisión o reglas de actualización" },
  ] },
  { n: "13", titulo: "Alquiler a largo plazo", campos: [
    { t: "check", name: "Datos del alquiler", opciones: [{ v: "Canon", l: "Canon mensual" }, { v: "Deposito", l: "Depósito" }, { v: "Meses adelantados", l: "Meses adelantados" }, { v: "Duracion", l: "Duración del contrato" }, { v: "Condiciones", l: "Condiciones y requisitos" }, { v: "Disponibilidad", l: "Fecha de disponibilidad" }] },
    { t: "area", name: "Politicas alquiler largo", ph: "Garantías, perfil de inquilino, mascotas, gastos y condiciones especiales" },
    { t: "radio", name: "Solicitud de alquiler", opciones: [{ v: "Contacto", l: "Solo solicitud de contacto" }, { v: "Formulario", l: "Formulario de preselección" }, { v: "Documentos", l: "Solicitud con documentos" }, { v: "Por definir", l: "Por definir" }] },
  ] },
  { n: "14", titulo: "Proyectos inmobiliarios", campos: [
    { t: "radio", name: "Proyectos nuevos", opciones: [{ v: "Si", l: "Sí, deben tener ficha propia" }, { v: "Como inmueble", l: "Solo como publicaciones normales" }, { v: "No", l: "No por ahora" }, { v: "Por definir", l: "Por definir" }] },
    { t: "check", name: "Datos de proyecto", opciones: [{ v: "Unidades", l: "Unidades disponibles" }, { v: "Planos", l: "Planos" }, { v: "Constructora", l: "Constructora" }, { v: "Avance", l: "Avance de obra" }, { v: "Preventa", l: "Preventa y formas de pago" }] },
    { t: "area", name: "Reglas de proyectos", ph: "Qué información, responsables y actualizaciones necesitaría cada proyecto" },
  ] },
  { n: "15", titulo: "Fotos, video y documentos", campos: [
    { t: "check", name: "Material por inmueble", opciones: [{ v: "Fotos", l: "Fotos" }, { v: "Video", l: "Video" }, { v: "Tour", l: "Tour virtual" }, { v: "Planos", l: "Planos" }, { v: "PDF", l: "Documentos o PDF" }, { v: "Antes despues", l: "Antes y después" }] },
    { t: "radio", name: "Quien carga contenido", opciones: [{ v: "Equipo", l: "Equipo Metro Rent" }, { v: "Asesor", l: "Asesor o agencia" }, { v: "Propietario", l: "Propietario" }, { v: "Mixto", l: "Mixto" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Criterios de material", ph: "Cantidad, calidad, marca de agua, orden de fotos o material que debe aprobarse" },
  ] },
  { n: "16", titulo: "Moderación de avisos", campos: [
    { t: "radio", name: "Publicacion", opciones: [{ v: "Manual", l: "Revisión manual antes de publicar" }, { v: "Automatica", l: "Publicación automática" }, { v: "Mixta", l: "Automática con revisión posterior" }, { v: "Por definir", l: "Por definir" }] },
    { t: "check", name: "Estados del aviso", opciones: [{ v: "Borrador", l: "Borrador" }, { v: "Pendiente", l: "Pendiente de revisión" }, { v: "Publicado", l: "Publicado" }, { v: "Pausado", l: "Pausado" }, { v: "Vendido", l: "Vendido o alquilado" }, { v: "Rechazado", l: "Rechazado" }, { v: "Vencido", l: "Vencido" }] },
    { t: "area", name: "Criterios de moderación", ph: "Qué se revisa, quién aprueba y cuándo debe renovarse o vencerse un aviso" },
  ] },
  { n: "17", titulo: "Importación y duplicados", campos: [
    { t: "radio", name: "Inventario existente", opciones: [{ v: "Planilla", l: "Está en Excel o CSV" }, { v: "Portal", l: "Está en otro portal o sistema" }, { v: "Redes", l: "Está disperso en redes" }, { v: "No", l: "No hay inventario para importar" }, { v: "Por definir", l: "Por definir" }] },
    { t: "text", name: "Links o fuentes de importación", ph: "Enlaces, nombres de sistemas o ubicación de la planilla; no compartas claves" },
    { t: "area", name: "Reglas de duplicados", ph: "Cómo identificar el mismo inmueble: código, dirección, dueño, fotos u otro criterio" },
  ] },
  { n: "18", titulo: "Visibilidad y destacados", campos: [
    { t: "check", name: "Formas de destacar", opciones: [{ v: "Portada", l: "En portada" }, { v: "Prioridad", l: "Primero en resultados" }, { v: "Etiqueta", l: "Etiqueta especial" }, { v: "Campana", l: "Campaña temporal" }, { v: "No", l: "No por ahora" }] },
    { t: "area", name: "Reglas de destacados", ph: "Quién decide, duración, si se cobra y cómo se controla" },
    { t: "text", name: "Promociones actuales", ph: "Ofertas, campañas o alianzas que debería reflejar la plataforma" },
  ] },
  { n: "19", titulo: "Búsqueda y filtros", campos: [
    { t: "check", name: "Filtros necesarios", opciones: [{ v: "Operacion", l: "Venta o alquiler" }, { v: "Tipo", l: "Tipo de inmueble" }, { v: "Zona", l: "Zona" }, { v: "Precio", l: "Rango de precio" }, { v: "Metros", l: "Metros" }, { v: "Habitaciones", l: "Habitaciones" }, { v: "Amenidades", l: "Amenidades" }, { v: "Fecha", l: "Fecha de publicación" }] },
    { t: "radio", name: "Mapa en búsqueda", opciones: [{ v: "Si", l: "Sí, con inmuebles en mapa" }, { v: "No", l: "No por ahora" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Orden de resultados", ph: "Ej.: relevancia, más nuevos, menor precio, destacados o reglas propias" },
  ] },
  { n: "20", titulo: "Comparar, guardar y compartir", campos: [
    { t: "check", name: "Herramientas del interesado", opciones: [{ v: "Favoritos", l: "Guardar favoritos" }, { v: "Comparar", l: "Comparar inmuebles" }, { v: "Alertas", l: "Alertas de nuevos avisos" }, { v: "Compartir", l: "Compartir por enlace o WhatsApp" }, { v: "Historial", l: "Historial de vistos" }] },
    { t: "radio", name: "Cuenta para favoritos", opciones: [{ v: "Obligatoria", l: "Cuenta obligatoria" }, { v: "Opcional", l: "Permitir sin cuenta y pedirla después" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Reglas de alertas", ph: "Canal, frecuencia y criterios de las alertas; o «por definir»." },
  ] },
  { n: "21", titulo: "Interesados y leads", campos: [
    { t: "check", name: "Canales de contacto", opciones: [{ v: "Formulario", l: "Formulario" }, { v: "WhatsApp", l: "WhatsApp" }, { v: "Telefono", l: "Llamada telefónica" }, { v: "Email", l: "Correo" }, { v: "Chat", l: "Chat dentro de plataforma" }] },
    { t: "radio", name: "Asignacion de lead", opciones: [{ v: "Asesor aviso", l: "Al asesor del aviso" }, { v: "Central", l: "A una central" }, { v: "Rotativa", l: "Rotativa entre equipo" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Datos para calificar lead", ph: "Qué preguntar antes de enviarlo y qué respuesta o seguimiento esperan" },
  ] },
  { n: "22", titulo: "CRM, visitas y seguimiento", campos: [
    { t: "radio", name: "CRM", opciones: [{ v: "Actual", l: "Ya usamos CRM" }, { v: "Nuevo", l: "Necesitamos CRM o seguimiento" }, { v: "No", l: "No por ahora" }, { v: "Por definir", l: "Por definir" }] },
    { t: "text", name: "CRM o sistema actual", ph: "Nombre y enlace si existe; no compartas usuarios ni claves" },
    { t: "area", name: "Visitas y seguimiento", ph: "Cómo se agenda visita, quién confirma, estados del lead y recordatorios necesarios" },
  ] },
  { n: "23", titulo: "Captación de propietarios", campos: [
    { t: "check", name: "Captacion", opciones: [{ v: "Formulario", l: "Formulario para publicar" }, { v: "Tasacion", l: "Solicitud de tasación" }, { v: "WhatsApp", l: "Contacto por WhatsApp" }, { v: "Llamada", l: "Solicitud de llamada" }, { v: "Agencia", l: "Registro de agencia aliada" }] },
    { t: "area", name: "Datos de captación", ph: "Información mínima para que un propietario o agencia solicite publicar" },
    { t: "area", name: "Proceso posterior", ph: "Quién responde, tiempo esperado, aprobación y documentos que se solicitan fuera de este cuestionario" },
  ] },
  { n: "24", titulo: "Panel y reportes", campos: [
    { t: "check", name: "Indicadores", opciones: [{ v: "Inventario", l: "Inventario activo y vencido" }, { v: "Leads", l: "Leads y fuente" }, { v: "Conversion", l: "Conversión a visita o cierre" }, { v: "Asesores", l: "Desempeño por asesor" }, { v: "Propietarios", l: "Captación de propietarios" }, { v: "Ingresos", l: "Ingresos o comisiones" }] },
    { t: "radio", name: "Acceso a reportes", opciones: [{ v: "Admin", l: "Solo administración" }, { v: "Por rol", l: "Según rol" }, { v: "Propietario", l: "También propietarios o agencias" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Reportes indispensables", ph: "Qué decisiones deben poder tomarse con los reportes" },
  ] },
  { n: "25", titulo: "Marca y contenido", campos: [
    { t: "radio", name: "Identidad visual", opciones: [{ v: "Entregada 1bite", l: "1bite ya entregó la marca" }, { v: "En proceso 1bite", l: "1bite la está desarrollando" }, { v: "Existente", l: "Usar marca existente" }, { v: "Por definir", l: "Por definir" }] },
    { t: "radio", name: "Contenido disponible", opciones: [{ v: "Listo", l: "Textos y fotos listos" }, { v: "Parcial", l: "Material parcial" }, { v: "Ayuda", l: "Necesitamos apoyo de contenido" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Referencias y tono", ph: "Enlaces de referencia, tono de comunicación y qué no debería parecerse a su competencia" },
  ] },
  { n: "26", titulo: "Idiomas y SEO", campos: [
    { t: "check", name: "Idiomas", opciones: [{ v: "Espanol", l: "Español" }, { v: "Ingles", l: "Inglés" }, { v: "Otro", l: "Otro idioma" }] },
    { t: "check", name: "Contenido para buscadores", opciones: [{ v: "Zonas", l: "Páginas por zona" }, { v: "Tipos", l: "Páginas por tipo de inmueble" }, { v: "Blog", l: "Guías o blog" }, { v: "Proyectos", l: "Páginas de proyectos" }, { v: "No", l: "No por ahora" }] },
    { t: "area", name: "Palabras y competidores", ph: "Cómo busca su público y enlaces de competidores o referencias" },
  ] },
  { n: "27", titulo: "Dominio, hosting y correo", sub: "Nunca compartas claves, contraseñas ni códigos de acceso.", campos: [
    { t: "radio", name: "Dominio comprado", opciones: [{ v: "Si", l: "Sí, ya está comprado" }, { v: "No", l: "No" }, { v: "No seguro", l: "No estoy seguro" }] },
    { t: "text", name: "Dominio", ph: "Ej.: metrorent.com.ve o alternativas que consideran" },
    { t: "text", name: "Registrador y titular", ph: "Empresa donde está y nombre de quien figura como titular; nunca contraseñas" },
    { t: "radio", name: "Hosting actual", opciones: [{ v: "Si", l: "Sí, existe hosting" }, { v: "No", l: "No hay hosting" }, { v: "No seguro", l: "No estoy seguro" }] },
    { t: "text", name: "Proveedor hosting y renovacion", ph: "Proveedor, vencimiento aproximado y quién lo administra; nunca claves" },
    { t: "radio", name: "Correos corporativos", opciones: [{ v: "Conservar", l: "Conservar correos actuales" }, { v: "Migrar", l: "Migrar correos actuales" }, { v: "Nuevos", l: "Crear correos nuevos" }, { v: "No", l: "No hay correos corporativos" }, { v: "Por definir", l: "Por definir" }] },
    { t: "text", name: "Proveedor de correo", ph: "Ej.: Google Workspace, Microsoft 365 u otro; y quién lo administra" },
  ] },
  { n: "28", titulo: "Sitio y datos existentes", campos: [
    { t: "radio", name: "Web existente", opciones: [{ v: "Si", l: "Sí, hay sitio web" }, { v: "No", l: "No hay sitio web" }, { v: "No seguro", l: "No estoy seguro" }] },
    { t: "text", name: "Link sitio existente", ph: "URL del sitio, portal, redes o páginas que deben revisarse" },
    { t: "area", name: "Que importar o preservar", ph: "Páginas, textos, SEO, fotos, inventario, formularios o enlaces que no deben perderse" },
  ] },
  { n: "29", titulo: "Fase 2: estadías cortas", sub: "Esta fase se cotiza por separado de venta y alquiler a largo plazo.", campos: [
    { t: "radio", name: "Interes fase estadias cortas", opciones: [{ v: "Si lanzamiento", l: "Sí, desde el lanzamiento" }, { v: "Si despues", l: "Sí, para una fase posterior" }, { v: "No", l: "No por ahora" }, { v: "Por definir", l: "Por definir" }] },
    { t: "check", name: "Perfiles estadias", opciones: [{ v: "Huesped", l: "Huésped" }, { v: "Propietario", l: "Propietario" }, { v: "Anfitrion", l: "Anfitrión o administrador" }, { v: "Operacion", l: "Equipo de operación" }] },
    { t: "area", name: "Modelo de estadías", ph: "Ciudades, tipo de alojamiento, público y cómo se diferenciaría del alquiler largo" },
  ] },
  { n: "30", titulo: "Disponibilidad y precios de estadías", campos: [
    { t: "check", name: "Calendario", opciones: [{ v: "Disponibilidad", l: "Disponibilidad por fechas" }, { v: "Bloqueos", l: "Bloqueos manuales" }, { v: "Minimo", l: "Noches mínimas" }, { v: "Anticipacion", l: "Anticipación mínima o máxima" }, { v: "Sincronizar", l: "Sincronizar con otros calendarios" }] },
    { t: "check", name: "Precios estadias", opciones: [{ v: "Noche", l: "Precio por noche" }, { v: "Temporada", l: "Precios por temporada" }, { v: "Dinamico", l: "Precios dinámicos" }, { v: "Limpieza", l: "Cargo de limpieza" }, { v: "Huesped", l: "Cargo al huésped" }, { v: "Servicio", l: "Comisión de plataforma" }] },
    { t: "area", name: "Reglas de tarifa", ph: "Moneda, impuestos, depósito, descuentos, cargos y quién define las tarifas" },
  ] },
  { n: "31", titulo: "Reservas, pagos y cancelaciones", campos: [
    { t: "check", name: "Reserva", opciones: [{ v: "Solicitud", l: "Solicitud para aprobación" }, { v: "Instantanea", l: "Reserva instantánea" }, { v: "Pago", l: "Cobro al reservar" }, { v: "Deposito", l: "Depósito o garantía" }, { v: "Contrato", l: "Contrato o reglas de alojamiento" }] },
    { t: "check", name: "Pagos estadias", opciones: [{ v: "Tarjeta", l: "Tarjeta" }, { v: "Transferencia", l: "Transferencia" }, { v: "Pago movil", l: "Pago móvil" }, { v: "Zelle", l: "Zelle" }, { v: "Otro", l: "Otro" }] },
    { t: "area", name: "Cancelaciones y reembolsos", ph: "Reglas de cancelación, no show, daños, devoluciones y quién decide excepciones" },
  ] },
  { n: "32", titulo: "Operación de estadías", campos: [
    { t: "check", name: "Tareas operativas", opciones: [{ v: "Checkin", l: "Check-in y check-out" }, { v: "Limpieza", l: "Limpieza" }, { v: "Mantenimiento", l: "Mantenimiento" }, { v: "Llaves", l: "Llaves o acceso" }, { v: "Soporte", l: "Soporte a huésped" }, { v: "Incidentes", l: "Incidentes o daños" }] },
    { t: "check", name: "Confianza", opciones: [{ v: "Verificacion huesped", l: "Verificación de huésped" }, { v: "Reglas", l: "Reglas de la propiedad" }, { v: "Resenas", l: "Reseñas" }, { v: "Calificaciones", l: "Calificaciones mutuas" }] },
    { t: "area", name: "Pago a propietario", ph: "Frecuencia, comisiones, descuentos, reporte y responsable de liquidar al propietario" },
  ] },
  { n: "33", titulo: "App móvil", sub: "La app iOS/Android se cotiza por separado del sistema web.", campos: [
    { t: "radio", name: "Interes en app", opciones: [{ v: "Si lanzamiento", l: "Sí, desde lanzamiento" }, { v: "Si despues", l: "Sí, fase posterior" }, { v: "No", l: "No por ahora" }, { v: "Por definir", l: "Por definir" }] },
    { t: "check", name: "Plataformas app", opciones: [{ v: "iOS", l: "iPhone / App Store" }, { v: "Android", l: "Android / Google Play" }, { v: "Ambas", l: "Ambas plataformas" }, { v: "Por definir", l: "Necesito recomendación" }] },
    { t: "check", name: "Perfiles en app", opciones: [{ v: "Interesado", l: "Comprador, inquilino o huésped" }, { v: "Propietario", l: "Propietario" }, { v: "Asesor", l: "Asesor" }, { v: "Anfitrion", l: "Anfitrión" }, { v: "Operacion", l: "Operación interna" }] },
    { t: "check", name: "Funciones app", opciones: [{ v: "Buscar", l: "Buscar y guardar" }, { v: "Mensajes", l: "Contactar o mensajería" }, { v: "Reservar", l: "Reservar estadía" }, { v: "Push", l: "Notificaciones push" }, { v: "Gestionar", l: "Gestionar avisos o reservas" }] },
    { t: "radio", name: "Cuentas de desarrollador", opciones: [{ v: "Propias", l: "Ya existen cuentas propias" }, { v: "Crear", l: "Hay que crear cuentas" }, { v: "No seguro", l: "No estoy seguro" }, { v: "Por definir", l: "Por definir" }] },
  ] },
  { n: "34", titulo: "Seguridad, soporte e infraestructura", campos: [
    { t: "check", name: "Seguridad", opciones: [{ v: "Login", l: "Registro y recuperación de acceso" }, { v: "Roles", l: "Roles y permisos" }, { v: "Documentos", l: "Documentos privados" }, { v: "Consentimiento", l: "Consentimientos y privacidad" }, { v: "Auditoria", l: "Registro de acciones" }] },
    { t: "check", name: "Operacion tecnica", opciones: [{ v: "Analitica", l: "Analítica de uso" }, { v: "Backups", l: "Respaldo de datos" }, { v: "Exportar", l: "Exportar datos" }, { v: "Soporte", l: "Canal de soporte" }, { v: "Hosting", l: "Hosting administrado" }] },
    { t: "area", name: "Requisitos o restricciones", ph: "Políticas, documentos, cumplimiento, soporte, horario, exportaciones o respaldos requeridos" },
  ] },
  { n: "35", titulo: "Prioridades, presupuesto y decisión", sub: "Con esto se arma alcance por fases. No indica costos ni fechas hasta revisar respuestas.", campos: [
    { t: "check", name: "Top 5 para lanzamiento", max: 5, opciones: [{ v: "Catalogo", l: "Catálogo de inmuebles" }, { v: "Busqueda", l: "Búsqueda y filtros" }, { v: "Leads", l: "Captación de leads" }, { v: "Panel", l: "Panel administrativo" }, { v: "Propietarios", l: "Portal de propietarios" }, { v: "Agencias", l: "Agencias aliadas" }, { v: "SEO", l: "SEO y contenido" }, { v: "Estadias", l: "Estadías cortas" }, { v: "App", l: "App móvil" }] },
    { t: "text", name: "Presupuesto estimado", ph: "Rango y moneda para web, fase 2 y app; o «necesito propuesta por fases»" },
    { t: "text", name: "Fecha objetivo", ph: "Fecha deseada, evento o hito; indica si es flexible" },
    { t: "radio", name: "Quien decide", opciones: [{ v: "Yo", l: "Yo decido" }, { v: "Socios", l: "Decidimos entre socios" }, { v: "Equipo", l: "Lo evalúa un equipo" }, { v: "Cliente", l: "Necesito presentarlo a un cliente" }, { v: "Por definir", l: "Por definir" }] },
    { t: "area", name: "Comentarios finales", ph: "Riesgos, prioridades, preguntas o cualquier detalle que no haya quedado cubierto" },
  ] },
];
