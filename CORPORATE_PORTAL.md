# Portal Corporativo Bihospharma

Área privada para personal: `/personal/login`

## Funciones

- **Acceso**: solo usuarios registrados; registro con código `PORTAL_ACCESS_CODE` (por defecto en desarrollo: `BIHOS2026!`).
- **Tablero de comunicaciones**: publicaciones, reacciones y comentarios (`/personal`). Los administradores publican en `/personal/admin`.
- **Asistencia**: entrada/salida de turno por empleado; reporte admin en `/personal/admin/attendance`.
- **Reloj rápido**: `/personal/reloj` — entrada/salida manual (celulares de la empresa).
- **Control admin**: `/personal/admin/attendance` — estado del equipo, quién está en turno, exportar CSV.

## Configuración local

```bash
cp .env.example .env.local
# Editar .env.local (AUTH_SECRET, SEED_ADMIN_*, PORTAL_ACCESS_CODE)
npm install
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

## Producción

Definir en el servidor: `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, `PORTAL_ACCESS_CODE`.

Tras desplegar: `npm run db:migrate` y `npm run db:seed` (una vez, con credenciales de admin en variables de entorno).
