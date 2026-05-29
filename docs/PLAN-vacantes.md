# Plan — Contacto + Vacantes (web 1bite.studio) + módulo RRHH (app1bite)

Objetivo: sección Contacto en la web con info + formulario de Vacantes. Postulaciones
(CV/portafolio/enlaces) se guardan en Supabase (proyecto 1bite-agency) y se ven en un
módulo nuevo **RRHH / Postulaciones** dentro de app1bite, debajo de Usuarios. Notifica a
rrhh@1bite.studio.

Supabase: proyecto `atxmxihxboswsewdbdgz` (1bite-agency). Org id `00000000-0000-0000-0000-000000000001`.

## Puestos

Diseñador gráfico · Director de arte · Community manager · Audiovisual · Content creator

## Pasos

### A. Supabase (1bite-agency)

- [x] Migración `postulaciones`: tabla + RLS (select/update solo admin/ceo/rrhh de la org; insert solo service role).
- [x] Bucket privado `postulaciones` + policy storage select para admin/ceo/rrhh.
- [x] Edge Function `vacante-submit` (público, verify_jwt=false, CORS \*): valida, sube CV/portafolio (service role), inserta fila, email best-effort a rrhh@1bite.studio (Resend).

### B. Web 1bite.studio

- [x] `sections/Contacto.tsx` (id="contacto"): info de contacto + form Vacantes (puesto select, nombre/email/teléfono/mensaje, CV req, portafolio opc, enlaces). POST multipart a la Edge Function.
- [x] Insertar Contacto en `app/page.tsx` antes de CTAFinal. Nav "Contacto" → scroll #contacto.
- [x] Env `NEXT_PUBLIC_VACANTE_ENDPOINT` = URL de la función.

### C. app1bite

- [x] Página `/admin/postulaciones` (server, gate admin/ceo/rrhh): lista + signed URLs CV/portafolio + estado.
- [x] Componente tabla + cambio de estado (nuevo/revisado/contactado/descartado).
- [x] Sidebar: link "Postulaciones" bajo Usuarios (admin), en bloque Gestión y en sección RRHH.

## Notas

- Email leg requiere `RESEND_API_KEY` como secret de la Edge Function (Vercel ya lo tiene, Supabase no necesariamente). Si falta, la postulación igual se guarda; solo no manda correo.
- CVs privados → signed URLs (no público).
