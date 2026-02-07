# Ecommerce Project - Industrial Stack (Next.js + NestJS + Prisma + PostgreSQL)

Este repositorio contiene un **proyecto eCommerce** en desarrollo, usando un stack profesional para máxima empleabilidad: Next.js 16 + React Server Components en el frontend y NestJS + Prisma + PostgreSQL en el backend.

---

## 📁 Estructura del proyecto

\\\
ecomerce/
├── backend/              # Backend NestJS
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
├── frontend/             # Frontend Next.js 16
│   ├── src/
│   ├── package.json
│   └── ...
├── .env
├── docker-compose.yml
├── README.md
└── ...
\\\

---

## ⚙️ Stack utilizado

### Backend
- **NestJS**: Framework para Node.js, modular y escalable.
- **TypeScript**: Tipado estricto y desarrollo seguro.
- **Prisma ORM**: Conexión a PostgreSQL y generación de cliente.
- **PostgreSQL**: Base de datos relacional.
- **JWT**: Autenticación segura.

### Frontend
- **Next.js 16**: React + Server Components + TurboPack.
- **React 18**: Librería UI moderna.
- **Shadcn/ui + Framer Motion**: Microinteracciones y componentes UI avanzados.

### DevOps / Otros
- **Docker Compose**: Contenedores para base de datos PostgreSQL.
- **PowerShell Scripts**: Automatización de tareas iniciales.

---

## 🚀 Lo que se hizo hasta ahora

### Backend
1. Configuración de NestJS con módulos:
   - AuthModule → registro y login de usuarios.
   - UsersModule → CRUD básico de usuarios.
   - PrismaModule → conexión a PostgreSQL con Prisma.
2. Creación de la base de datos PostgreSQL usando Docker Compose.
3. Configuración de .env con DATABASE_URL.
4. Migraciones iniciales con Prisma (User model).
5. Servidor NestJS funcionando en http://localhost:3001.
6. Endpoints implementados:
   - POST /auth/register → registrar usuario.
   - POST /auth/login → login con JWT.
   - GET /users → listado de usuarios (solo para prueba).

### Frontend
1. Creación del proyecto Next.js 16.
2. Estructura básica de páginas en /app.
3. Página de login (/login) con formulario.
4. Conexión a backend pendiente (fetch a /auth/login y /auth/register).

---

## 📝 Lo que falta hacer

### Backend
- Añadir validaciones completas en DTOs.
- Implementar encriptación de contraseñas con bcrypt.
- Mejorar manejo de errores y respuestas estándar.
- Añadir tests unitarios y de integración.
- Preparar endpoints adicionales para productos, carrito, órdenes.

### Frontend
- Conectar página de login al backend usando etch o TanStack Query.
- Crear páginas de registro y dashboard.
- Implementar componentes UI con Shadcn/ui y Framer Motion.
- Añadir manejo de estado global (Zustand o React Context).

### DevOps / Deploy
- Configurar Docker completo para backend y frontend.
- Preparar scripts de producción.
- Opcional: despliegue en Vercel (frontend) y Railway / Render (backend + DB).

---

## 💾 Comandos útiles

### Backend
\\\ash
# Instalar dependencias
cd backend
npm install

# Correr servidor
npm run start:dev

# Prisma
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
\\\

### Frontend
\\\ash
cd frontend
npm install
npm run dev
\\\

---

## 🔗 Notas

- Backend corre en \http://localhost:3001\
- Frontend corre en \http://localhost:3000\
- Base de datos PostgreSQL corre en Docker Compose en puerto \5432\.
- Variables de entorno definidas en \.env\.

---

## 📌 Próximos pasos

1. Terminar conexión frontend ↔ backend.
2. Crear CRUD completo de productos y carrito.
3. Añadir autenticación con JWT en frontend.
4. Mejorar UI con Shadcn/ui + Framer Motion.
5. Documentar endpoints con Swagger (NestJS).
6. Añadir tests y preparación para despliegue.

---

## 📂 Referencias

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Prisma ORM Documentation](https://www.prisma.io/docs/)
- [Shadcn/ui](https://shadcn.dev/)
