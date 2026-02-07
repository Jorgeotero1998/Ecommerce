Este repositorio contiene una plataforma eCommerce de escala industrial. Utiliza un stack profesional con **Next.js 16** en el frontend y **NestJS + Prisma + PostgreSQL** en el backend, todo bajo una arquitectura modular.

📁 **Estructura del Proyecto**

```text
ecomerce/
├── backend/           # API REST (NestJS) -> Puerto 3001
│   ├── src/           # Auth, Users, Products y lógica de servidor
│   ├── prisma/        # Schema PostgreSQL (Prisma Client)
│   └── .env           # Config DB & JWT
├── frontend/          # UI Industrial (Next.js 16) -> Puerto 3000
│   ├── src/app/       # SPA funcional con Framer Motion
│   └── ...
└── docker-compose.yml # PostgreSQL Container
🚀 Estado Actual del Proyecto

✅ Backend (Completado)
Auth System: Registro y Login funcionales con validación de identidad.

Seguridad: Emisión de tokens JWT para sesiones protegidas.

Persistencia: Conexión total a PostgreSQL mediante Prisma ORM.

Estructura de Productos: Módulo de productos (Controller, Service, DTOs) creado y listo para recibir datos.

Infraestructura: Base de datos persistente mediante Docker.

Endpoints Operativos: POST /auth/register, POST /auth/login, GET /users.

✅ Frontend (UI & Client Logic Completada)
Interfaz de Alta Ingeniería: Estética de paneles modulares "Dark Tech" con bordes de 45px.

Filtros Inteligentes: Buscador en tiempo real y "Price Ceiling" (slider) funcionales con useMemo.

Carrito Persistente: Gestión de activos guardada en localStorage.

Checkout Protocol: Flujo de pago simulado en 3 pasos (Cart -> Payment -> Success).

Responsive Sidebar: Panel de parámetros optimizado para evitar cortes visuales.

📝 Próximos Pasos (Pendiente)

Puente Frontend-Backend: Conectar el "Auth Gateway" del frontend con el servicio de NestJS para usar el login real.

Sincronización de Productos: Hacer que el frontend consuma el endpoint de productos de NestJS en lugar de datos estáticos.

Encriptación: Asegurar contraseñas con bcrypt en el proceso de registro.

Pagos Reales: Integrar el API de Stripe/PayPal en el flujo de checkout.

💾 Comandos de Inicio Rápido

PowerShell
# Iniciar DB
docker-compose up -d

# Backend
cd backend && npm run start:dev

# Frontend
cd frontend && npm run dev
'@ [System.IO.File]::WriteAllText($readmePath, $readmeContent, [System.Text.Encoding]::UTF8)
