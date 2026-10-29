# Cuestionario Metro Rent — 29 de octubre de 2026

- Publicar `/metro-rent` en 1bite.studio con marca 1bite y sin indexación.
- Recoger alcance de catálogo inmobiliario autoadministrable y fase 2 de estadías cortas/app. Selecciones simples o múltiples y texto libre según la pregunta; dominio, registrador, hosting y correos incluidos.
- Reutilizar el motor y recepción existente de cuestionarios (CRM; aviso interno ya configurado). Identificar proyecto Metro Rent y precargar empresa.
- Borrador opcional en este navegador, recuperable tras recargar; borrar al confirmar envío. No almacenar CAPTCHA en el borrador.
- Comprobar móvil/escritorio, selección simple, límite Top 5, persistencia local, errores y reintento, payload completo y formulario anterior. Build y publicación solo por push a main; verificar despliegue y URL pública.

## Validación previa a publicación

- `npm run build` aprobado, ruta estática `/metro-rent` generada.
- TypeScript y ESLint dirigido aprobados.
- 12/12 pruebas Playwright en Chromium escritorio y WebKit móvil: contenido, noindex, marca, selección simple/múltiple, límite Top 5, borrador, exclusión de CAPTCHA del borrador, reintento, confirmación con ID y compatibilidad del cuestionario web anterior.
- Capturas revisadas en ambos tamaños; sin desbordamiento horizontal.
- Las pruebas locales interceptan CAPTCHA y recepción: no crean clientes ni envían correo real. Se reutiliza sin cambios `cuestionario-submit`, cuya versión desplegada guarda el detalle en CRM y tiene avisos internos ya configurados.
- Cuestionario identificado como proyecto Metro Rent y origen cuestionario_web. No se añade al menú ni al sitemap.
