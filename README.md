# Enterprise Asset Management System (Full Stack)

Este repositorio contiene una plataforma eCommerce de escala industrial con un stack profesional: Next.js 16, NestJS, Prisma, PostgreSQL y Stripe.

## 🚀 Estado del Proyecto (Finalizado)

✅ **Backend (Completado)**
- **Auth System**: Registro y Login con encriptación **bcrypt** y **JWT**.
- **Persistencia**: PostgreSQL mediante Prisma ORM con **500 activos** industriales generados.
- **Pagos**: Integración de **Stripe** (API Real) para procesamiento de pagos.
- **Seguridad**: Gestión de secretos mediante variables de entorno (.env).

✅ **Frontend (Completado)**
- **UI Industrial**: Estética "Dark Tech" con bordes de 45px y Framer Motion.
- **Puente Real**: Conexión total con el servicio de NestJS (Auth & Products).
- **Checkout Protocol**: Flujo de pago real redirigido a la pasarela segura de Stripe.
- **Performance**: Optimizado con Next.js 16 y Turbopack.

## 🛠️ Tecnologías
- **Frontend**: Next.js 16, Tailwind CSS, Framer Motion.
- **Backend**: NestJS, Prisma ORM, JWT, Bcrypt, Stripe SDK.
- **Infraestructura**: Docker (PostgreSQL).

## 💾 Comandos de Inicio
```powershell
# 1. Iniciar Base de Datos
docker-compose up -d

# 2. Iniciar Backend (Puerto 3001)
cd backend && npm run start:dev

# 3. Iniciar Frontend (Puerto 3000)
cd frontend && npm run dev
```