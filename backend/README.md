# Intercambia - Backend

## Descripción

Backend del proyecto Intercambia desarrollado con Express y TypeScript. Proporciona una API RESTful para la gestión de usuarios, autenticación, y las funcionalidades principales de la plataforma.

## Tecnologías

- **Node.js**: Entorno de ejecución.
- **TypeScript**: Lenguaje principal.
- **Express**: Framework web.
- **MongoDB**: Base de datos.
- **JWT**: Autenticación basada en tokens.
- **Zod**: Validación de datos.
- **Nodemailer**: Envío de correos electrónicos.
- **Swagger**: Documentación API.

## Estructura del Proyecto

```
backend/
├── src/
│   ├── app.ts                  # Punto de entrada de la aplicación
│   ├── config/                 # Configuraciones (MongoDB, nodemailer, etc.)
│   ├── controllers/            # Controladores para las rutas
│   ├── middleware/             # Middleware personalizado
│   ├── models/                 # Modelos de Mongoose
│   ├── repositories/           # Acceso a datos
│   ├── routes/                 # Definición de rutas
│   ├── schema/                 # Esquemas de validación Zod
│   ├── server/                 # Configuración del servidor Express
│   ├── service/                # Lógica de negocio
│   ├── types/                  # Definiciones de tipos TypeScript
│   └── utils/                  # Utilidades y funciones auxiliares
├── swagger/                    # Documentación API con Swagger
├── .env                        # Variables de entorno
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Dependencias y scripts
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd intercambia/backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` en la raíz:
   ```
   PORT=5000
   DB_MONGO_URI=mongodb://localhost:27017/intercambia
   JWT_SECRET=tu_secreto_jwt
   SALT_HASH=10
   URL=http://localhost:3000
   nodemiler_user=tu_correo@ejemplo.com
   nodemailer_password=tu_contraseña
   BLOCK_TIME=60000
   ```

4. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm start`: Inicia la aplicación en producción.
- `npm run build`: Compila el código TypeScript.
- `npm run build:watch`: Compila el código TypeScript en modo watch.
- `npm run dev`: Inicia la aplicación en modo desarrollo con hot-reload.

## Sistema de Autenticación

### Características

- Registro de usuarios con validación de campos.
- Inicio de sesión con token JWT.
- Protección contra ataques de fuerza bruta.
- Recuperación de contraseña mediante correo electrónico.
- Validación de sesiones activas.
- Control de acceso basado en roles (admin, user).

### Endpoints de Autenticación

| Ruta | Método | Descripción | Middleware |
|------|--------|-------------|------------|
| `/auth/register` | POST | Registro de nuevos usuarios | Validación Zod |
| `/auth/login` | POST | Inicio de sesión | Validación Zod |
| `/auth/logout` | POST | Cierre de sesión | - |
| `/auth/verify` | POST | Verificación de token | - |
| `/auth/forgot-password` | POST | Solicitud de recuperación | Validación Zod |
| `/auth/reset-password` | POST | Establecer nueva contraseña | Validación Zod |
| `/auth/login/consult` | GET | Consulta de registros de login | Sesión, Rol Admin |

### Flujos de Autenticación

#### Registro de Usuario

1. El cliente envía datos del usuario (nombre, email, contraseña, etc.)
2. Se validan los datos con Zod
3. Se verifica que el email no esté registrado
4. Se encripta la contraseña con bcrypt
5. Se crea el nuevo usuario en la base de datos
6. Se devuelve respuesta exitosa

#### Inicio de Sesión

1. El cliente envía email y contraseña
2. Se verifica si hay intentos fallidos desde la IP del cliente
3. Se busca al usuario en la base de datos
4. Se compara la contraseña con la versión encriptada
5. Se genera un token JWT con información del usuario
6. Se establece una cookie HTTP-only con el token
7. Se registra el inicio de sesión exitoso

#### Recuperación de Contraseña

1. El usuario solicita recuperación con su email
2. Se verifica que el email exista en la base de datos
3. Se genera un token JWT con tiempo de expiración
4. Se envía un correo con enlace de recuperación al usuario
5. El usuario accede al enlace y establece nueva contraseña
6. Se verifica el token y se actualiza la contraseña

#### Verificación de Sesión

1. Se extrae el token JWT de las cookies
2. Se verifica la validez del token
3. Se decodifica para obtener la información del usuario
4. Se confirma que el usuario existe en la base de datos
5. Se retorna la información del usuario autorizado

## Middleware

### Validación con Zod

El sistema utiliza middleware de validación basado en Zod para verificar los datos de entrada:

```typescript
// Ejemplo de esquema de validación
export const loginSchema = z.object({
    email: z.string().email({
        message: "El email debe ser válido",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
});
```

### Control de Sesiones

Middleware para verificar si el usuario está autenticado:

```typescript
// Uso en rutas
router.get("/login/consult", ckeckSession, checkRole("admin"), getLogin);
```

### Control de Roles

Middleware para verificar el rol del usuario:

```typescript
// Ejemplo de uso
checkRole("admin")
```

## Arquitectura

El proyecto sigue una arquitectura en capas:

1. **Rutas**: Definición de endpoints y conexión con controladores.
2. **Controladores**: Manejo de solicitudes HTTP y respuestas.
3. **Servicios**: Lógica de negocio.
4. **Repositorios**: Interacción con la base de datos.

Esta separación permite un mejor mantenimiento y testabilidad del código.

## Documentación API

La API está documentada con Swagger y disponible en la ruta `/api-docs` cuando el servidor está en ejecución.

## Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT almacenados en cookies HTTP-only
- Protección contra ataques de fuerza bruta
- Validación estricta de datos de entrada
- Control de acceso basado en roles

## Desarrollo

### Agregar Nuevas Rutas

1. Crea un nuevo archivo en `src/routes/v1/` para las rutas.
2. Define las rutas con sus controladores correspondientes.
3. Importa y usa el router en `src/server/server.ts`.

### Agregar Nuevos Modelos

1. Crea un nuevo archivo en `src/models/` con la definición del esquema Mongoose.
2. Crea un repositorio correspondiente en `src/repositories/`.
3. Implementa los servicios relacionados en `src/service/`.

## Dependencias Principales

- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **bcrypt**: Encriptación de contraseñas
- **jsonwebtoken**: Implementación de JWT
- **zod**: Validación de esquemas
- **nodemailer**: Envío de correos electrónicos
- **swagger-jsdoc/swagger-ui-express**: Documentación API

## Contacto

Para más información o soporte, contactar al equipo de desarrollo de Intercambia.
