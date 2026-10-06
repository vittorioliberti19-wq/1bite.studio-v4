import type { Pregunta } from "./cuestionarios";

// Brief de alcance: las opciones expresan necesidades, no funciones contratadas.
export const PREGUNTAS_MOVILIDAD: Pregunta[] = [
  {
    n: "01", titulo: "Cuéntanos tu idea de movilidad",
    sub: "Solo transporte de pasajeros. Este cuestionario no incluye tiendas, delivery ni servicios del hogar.",
    campos: [
      { t: "text", name: "Nombre del proyecto de movilidad", ph: "Nombre de la app o de tu empresa (puede ser provisional)" },
      { t: "area", name: "Objetivo", ph: "¿A quién quieres transportar y qué haría diferente tu app? Ej.: viajes seguros en mi ciudad con conductores verificados." },
      { t: "text", name: "Pais y ciudades de lanzamiento", ph: "País, ciudad inicial y zonas que quieres cubrir" },
    ],
  },
  {
    n: "02", titulo: "¿Cómo arrancaría la operación?",
    campos: [
      { t: "radio", name: "Modelo de flota", opciones: [
        { v: "Conductores independientes", l: "Conductores independientes que se registran" },
        { v: "Flota propia", l: "Vehículos y conductores de mi empresa" },
        { v: "Mixto", l: "Flota propia y conductores independientes" },
        { v: "Por definir", l: "Necesito ayuda para definirlo" },
      ] },
      { t: "text", name: "Volumen inicial", ph: "Conductores al arrancar y viajes diarios estimados; si aún no lo sabes, indícalo" },
      { t: "text", name: "Horario de operacion", ph: "¿24 horas o un horario específico?" },
    ],
  },
  {
    n: "03", titulo: "¿Qué vehículos ofrecerás?",
    sub: "Marca los que necesitas para el lanzamiento.",
    campos: [{ t: "check", name: "Categorias de vehiculo", opciones: [
      { v: "Carro estandar", l: "Carro estándar" }, { v: "Moto", l: "Moto para pasajeros" },
      { v: "Taxi", l: "Taxi" }, { v: "Premium", l: "Vehículo premium" },
      { v: "Van o SUV", l: "Van o SUV para grupos" },
      { v: "Accesible", l: "Vehículo adaptado para personas con movilidad reducida" },
    ] }, { t: "text", name: "Requisitos del vehiculo", ph: "Otros tipos o requisitos: año mínimo, aire acondicionado, capacidad, etc." }],
  },
  {
    n: "04", titulo: "¿Dónde usarán la app?",
    sub: "Piensa tanto en pasajeros como en conductores.",
    campos: [
      { t: "check", name: "Plataforma", opciones: [
        { v: "iPhone", l: "iPhone / App Store" }, { v: "Android", l: "Android / Google Play" },
        { v: "Web para pedir viajes", l: "También pedir viajes desde una web" },
      ] },
      { t: "radio", name: "Apps por perfil", label: "¿Cómo prefieres separar los perfiles?", opciones: [
        { v: "Separadas", l: "Una app para pasajeros y otra para conductores" },
        { v: "Una app", l: "Una sola app con perfiles distintos" },
        { v: "Asesoria", l: "Prefiero que 1bite me recomiende" },
      ] },
      { t: "text", name: "Idiomas", ph: "Idiomas necesarios; por ejemplo: español" },
    ],
  },
  {
    n: "05", titulo: "¿Qué tipos de viaje necesitas?",
    sub: "Marca lo necesario para la primera versión. Lo demás puede quedar para después.",
    campos: [{ t: "check", name: "Modalidades de viaje", opciones: [
      { v: "Inmediatos", l: "Pedir un viaje para salir ahora" },
      { v: "Programados", l: "Reservar para una fecha y hora" },
      { v: "Varias paradas", l: "Agregar varias paradas" },
      { v: "Otra persona", l: "Pedir un viaje para otra persona" },
      { v: "Aeropuerto", l: "Traslados al aeropuerto" },
      { v: "Interurbanos", l: "Viajes entre ciudades" },
      { v: "Por hora", l: "Contratar un vehículo por horas" },
      { v: "Empresas", l: "Viajes para empresas y sus empleados" },
    ] }, { t: "area", name: "Reglas de reservas y paradas", ph: "Si aplica: anticipación de reservas, máximo de paradas, tiempo de espera y reglas especiales. Puedes escribir «por definir»." }],
  },
  {
    n: "06", titulo: "¿Cómo se asignará el conductor?",
    campos: [{ t: "radio", name: "Asignacion de viajes", opciones: [
      { v: "Automatico cercano", l: "Ofrecer el viaje automáticamente a conductores cercanos" },
      { v: "Ofertas", l: "Recibir ofertas de conductores y dejar que el pasajero elija" },
      { v: "Central", l: "Una central asigna los viajes manualmente" },
      { v: "Mixto", l: "Automático, con apoyo de una central" },
      { v: "Por definir", l: "Necesito asesoría" },
    ] }, { t: "text", name: "Sin conductor disponible", ph: "¿Qué debe pasar si nadie acepta? Ej.: ampliar búsqueda, avisar, cancelar sin cargo." }],
  },
  {
    n: "07", titulo: "¿Cómo se calculará el precio?",
    campos: [
      { t: "radio", name: "Modelo de tarifa", opciones: [
        { v: "Distancia y tiempo", l: "Por distancia y tiempo, con tarifa mínima" },
        { v: "Zonas", l: "Precios fijos por zona o ruta" },
        { v: "Negociado", l: "Precio propuesto por el pasajero o negociado con el conductor" },
        { v: "Por definir", l: "Aún no lo he definido" },
      ] },
      { t: "check", name: "Ajustes de tarifa", label: "¿Qué ajustes necesitas?", opciones: [
        { v: "Demanda", l: "Precio mayor cuando hay mucha demanda" },
        { v: "Espera", l: "Cobro por espera y paradas" },
        { v: "Peajes", l: "Peajes, estacionamiento o recargos de aeropuerto" },
        { v: "Descuentos", l: "Cupones o descuentos" },
      ] },
      { t: "area", name: "Ejemplo de tarifa", ph: "Si tienes tarifas, describe un viaje de ejemplo: recorrido, precio, moneda y cargos. Indica si el precio se fija antes de salir o cambia al terminar." },
    ],
  },
  {
    n: "08", titulo: "¿Cómo pagará el pasajero?",
    campos: [
      { t: "check", name: "Metodos de pago", opciones: [
        { v: "Efectivo", l: "Efectivo" }, { v: "Pago movil", l: "Pago móvil" },
        { v: "Transferencia", l: "Transferencia bancaria" }, { v: "Tarjeta", l: "Tarjeta dentro de la app" },
        { v: "Zelle", l: "Zelle" }, { v: "Saldo", l: "Saldo o billetera en la app" },
        { v: "Corporativo", l: "Cobro a una cuenta de empresa" },
      ] },
      { t: "text", name: "Monedas y tasa", ph: "¿Qué monedas aceptarás? Si usas USD y Bs, ¿qué tasa y en qué momento se fija?" },
      { t: "area", name: "Validacion de pagos", ph: "¿Quién recibe y confirma el pago: conductor o plataforma? ¿Tienes banco o pasarela? ¿Necesitas pagos mixtos o vuelto? No compartas claves ni datos de tarjetas." },
    ],
  },
  {
    n: "09", titulo: "¿Cómo gana dinero tu plataforma?",
    campos: [{ t: "radio", name: "Ingresos de la plataforma", opciones: [
      { v: "Porcentaje", l: "Un porcentaje de cada viaje" },
      { v: "Monto fijo", l: "Un monto fijo por viaje" },
      { v: "Suscripcion", l: "Una suscripción del conductor" },
      { v: "Mixto", l: "Una combinación" },
      { v: "Por definir", l: "Por definir" },
    ] }, { t: "area", name: "Comisiones y liquidaciones", ph: "Porcentaje o monto, cuándo cobra el conductor y cómo pagaría la comisión en viajes en efectivo. ¿Necesitas propinas o bonos?" }],
  },
  {
    n: "10", titulo: "¿Cómo aprobarás a los conductores?",
    sub: "Describe los requisitos; no adjuntes documentos personales en este cuestionario.",
    campos: [{ t: "check", name: "Verificacion del conductor", opciones: [
      { v: "Identidad", l: "Documento de identidad y selfie" },
      { v: "Licencia", l: "Licencia de conducir vigente" },
      { v: "Vehiculo", l: "Documentos y fotos del vehículo" },
      { v: "Seguro", l: "Seguro del vehículo" },
      { v: "Revision", l: "Entrevista, inspección o revisión de antecedentes" },
      { v: "Por definir", l: "Necesito definir el proceso" },
    ] }, { t: "area", name: "Aprobacion y vencimientos", ph: "¿Quién aprueba? ¿Se bloqueará al conductor por documentos vencidos? Agrega otros requisitos o reglas de edad para pasajeros y conductores." }],
  },
  {
    n: "11", titulo: "¿Qué seguridad y comunicación necesitas?",
    campos: [{ t: "check", name: "Seguridad y comunicacion", opciones: [
      { v: "GPS", l: "Seguimiento del vehículo en el mapa" },
      { v: "Compartir", l: "Compartir el viaje con un contacto" },
      { v: "PIN", l: "Código de seguridad para iniciar el viaje" },
      { v: "SOS", l: "Botón de emergencia" },
      { v: "Chat", l: "Chat entre pasajero y conductor" },
      { v: "Llamadas", l: "Llamadas sin mostrar el número personal" },
      { v: "Calificacion", l: "Calificación del pasajero y del conductor" },
    ] }, { t: "area", name: "Respuesta a incidentes", ph: "¿Quién atenderá emergencias y reclamos, por qué canal y en qué horario? ¿Ya cuentas con seguros o asesoría sobre permisos de transporte?" }],
  },
  {
    n: "12", titulo: "¿Qué pasa cuando un viaje no sale bien?",
    campos: [{ t: "area", name: "Cancelaciones y ausencias", ph: "¿Cuándo puede cancelar cada parte? ¿Cobrarías por cancelar tarde, no presentarse o hacer esperar? Si no está definido, indícalo." },
      { t: "area", name: "Reembolsos y soporte", ph: "¿Cómo resolverás cobros incorrectos, devoluciones, objetos olvidados y reclamos? ¿Quién toma la decisión?" }],
  },
  {
    n: "13", titulo: "¿Qué necesitas controlar desde administración?",
    campos: [{ t: "check", name: "Panel administrativo", opciones: [
      { v: "Viajes", l: "Ver viajes activos e historial" },
      { v: "Conductores", l: "Aprobar, suspender y administrar conductores" },
      { v: "Tarifas", l: "Cambiar tarifas, comisiones y zonas" },
      { v: "Finanzas", l: "Conciliar pagos, saldos y liquidaciones" },
      { v: "Soporte", l: "Atender reclamos y alertas" },
      { v: "Reportes", l: "Reportes de viajes, ingresos y desempeño" },
      { v: "Roles", l: "Accesos separados para operación, soporte y finanzas" },
    ] }, { t: "text", name: "Equipo administrativo e integraciones", ph: "¿Cuántas personas lo administrarán? ¿Debe conectarse a algún sistema actual?" }],
  },
  {
    n: "14", titulo: "¿Qué recibirá el usuario después del viaje?",
    campos: [{ t: "check", name: "Comprobantes y avisos", opciones: [
      { v: "Resumen app", l: "Resumen del viaje dentro de la app" },
      { v: "Recibo email", l: "Recibo por correo con recorrido y desglose del pago" },
      { v: "PDF", l: "Comprobante descargable en PDF" },
      { v: "Push", l: "Notificaciones del estado del viaje" },
      { v: "WhatsApp SMS", l: "Avisos por WhatsApp o SMS" },
    ] }, { t: "text", name: "Facturacion", ph: "¿Necesitas factura fiscal o solo recibo? Indica país y sistema de facturación, si aplica." }],
  },
  {
    n: "15", titulo: "¿Qué tienes listo y qué falta?",
    campos: [{ t: "check", name: "Recursos disponibles", opciones: [
      { v: "Marca", l: "Nombre, logo y colores" }, { v: "Disenos", l: "Diseños o prototipo" },
      { v: "Operacion", l: "Conductores o una operación funcionando" },
      { v: "Cuentas tiendas", l: "Cuentas de desarrollador de Apple y Google" },
    ] }, { t: "area", name: "Referencias y diferencias", ph: "¿Qué te gusta de Uber u otras apps y qué cambiarías? Puedes pegar enlaces y describir lo que aún falta." }],
  },
  {
    n: "16", titulo: "Definamos la primera versión",
    sub: "Marcar una función no la incluye automáticamente en una cotización. Usaremos tus respuestas para definir alcance, fases y costos.",
    campos: [
      { t: "area", name: "Prioridades de lanzamiento", ph: "Tus 3 funciones indispensables para lanzar y qué dejarías para una segunda etapa" },
      { t: "text", name: "Urgencia", ph: "Fecha deseada de lanzamiento y si es flexible" },
      { t: "text", name: "Presupuesto disponible", ph: "Presupuesto aproximado y moneda, o «necesito una propuesta»" },
      { t: "radio", name: "Operacion despues del lanzamiento", label: "¿Cómo piensas mantener la app?", opciones: [
        { v: "1bite", l: "Quiero soporte y mantenimiento de 1bite" },
        { v: "Equipo propio", l: "Tengo equipo técnico propio" },
        { v: "Por definir", l: "Necesito conocer las opciones y costos recurrentes" },
      ] },
    ],
  },
];
