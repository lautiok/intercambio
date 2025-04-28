# Intercambia - Backend

## Descripción

Backend del proyecto Intercambia desarrollado con Express y TypeScript. Proporciona una API RESTful para la gestión de usuarios, libros, intercambios y todas las funcionalidades principales de la plataforma de intercambio de libros para instituciones educativas.

## Tecnologías

- **Node.js**: Entorno de ejecución.
- **TypeScript**: Lenguaje principal.
- **Express**: Framework web.
- **MongoDB**: Base de datos.
- **JWT**: Autenticación basada en tokens.
- **Zod**: Validación de datos.
- **Nodemailer**: Envío de correos electrónicos.
- **Swagger**: Documentación API.
- **Multer**: Gestión de carga de archivos (imágenes de libros).

## Estructura del Proyecto

```
backend/
├── src/
│   ├── app.ts                  # Punto de entrada de la aplicación
│   ├── config/                 # Configuraciones (MongoDB, nodemailer, etc.)
│   ├── controllers/            # Controladores para las rutas
│   │   ├── auth.controllers.ts # Controladores de autenticación
│   │   ├── books.controllers.ts # Controladores de libros
│   │   ├── institucional.controllers.ts # Controladores de instituciones
│   │   └── users.controllers.ts # Controladores de usuarios
│   ├── middleware/             # Middleware personalizado
│   ├── models/                 # Modelos de Mongoose
│   │   ├── books.models.ts     # Modelo de libros
│   │   ├── institucional.models.ts # Modelo de instituciones
│   │   ├── login.models.ts     # Modelo de registros de login
│   │   └── users.models.ts     # Modelo de usuarios
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
   UPLOAD_DIR=uploads/books
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

## Funcionalidades Principales

### 1. Sistema de Autenticación

#### Características
- Registro de usuarios con validación de correo institucional
- Inicio de sesión con token JWT
- Protección contra ataques de fuerza bruta
- Recuperación de contraseña mediante correo electrónico
- Validación de sesiones activas
- Control de acceso basado en roles (admin, user)

#### Endpoints de Autenticación

| Ruta | Método | Descripción | Middleware |
|------|--------|-------------|------------|
| `/auth/register` | POST | Registro de nuevos usuarios | Validación Zod |
| `/auth/login` | POST | Inicio de sesión | Validación Zod |
| `/auth/logout` | POST | Cierre de sesión | - |
| `/auth/verify` | POST | Verificación de token | - |
| `/auth/forgot-password` | POST | Solicitud de recuperación | Validación Zod |
| `/auth/reset-password` | POST | Establecer nueva contraseña | Validación Zod |
| `/auth/login/consult` | GET | Consulta de registros de login | Sesión, Rol Admin |

### 2. Gestión de Libros

#### Características
- Registro de nuevos libros con información detallada
- Carga de imágenes de libros
- Categorización por asignatura, curso o categoría
- Sistema de estados (disponible, pendiente, intercambiado)
- Búsqueda y filtrado avanzado

#### Endpoints de Libros

| Ruta | Método | Descripción | Middleware |
|------|--------|-------------|------------|
| `/books` | GET | Obtener todos los libros disponibles | - |
| `/books/:id` | GET | Obtener detalles de un libro | - |
| `/books` | POST | Crear nuevo libro | Sesión, Validación Zod |
| `/books/:id` | PUT | Actualizar información de libro | Sesión, Propietario |
| `/books/:id` | DELETE | Eliminar libro | Sesión, Propietario |
| `/books/upload` | POST | Subir imagen de libro | Sesión, Multer |
| `/books/search` | GET | Buscar libros por criterios | - |
| `/books/user/:userId` | GET | Obtener libros de un usuario | - |
| `/books/category/:category` | GET | Filtrar por categoría | - |

### 3. Sistema de Intercambios

#### Características
- Solicitudes de intercambio entre usuarios
- Gestión de propuestas (aceptar/rechazar)
- Coordinación del intercambio físico
- Confirmación y registro de intercambios completados
- Historial de intercambios por usuario

#### Endpoints de Intercambios

| Ruta | Método | Descripción | Middleware |
|------|--------|-------------|------------|
| `/exchange/request` | POST | Solicitar intercambio | Sesión, Validación Zod |
| `/exchange/:id/accept` | PUT | Aceptar solicitud | Sesión, Propietario |
| `/exchange/:id/reject` | PUT | Rechazar solicitud | Sesión, Propietario |
| `/exchange/:id/complete` | PUT | Marcar como completado | Sesión, Participante |
| `/exchange/user` | GET | Obtener intercambios del usuario | Sesión |
| `/exchange/:id` | GET | Obtener detalles de intercambio | Sesión, Participante |

### 4. Gestión de Instituciones

#### Características
- Registro de instituciones educativas
- Validación de dominios de correo institucionales
- Estadísticas por institución
- Administración de usuarios por institución

#### Endpoints de Instituciones

| Ruta | Método | Descripción | Middleware |
|------|--------|-------------|------------|
| `/institucional` | GET | Listar instituciones registradas | - |
| `/institucional/:id` | GET | Obtener detalles de institución | - |
| `/institucional` | POST | Registrar nueva institución | Sesión, Rol Admin |
| `/institucional/:id` | PUT | Actualizar institución | Sesión, Rol Admin |
| `/institucional/domains` | GET | Listar dominios autorizados | - |
| `/institucional/stats/:id` | GET | Estadísticas de institución | Sesión, Rol Admin |

### 5. Gestión de Usuarios

#### Características
- Perfiles de usuario
- Historial de actividad
- Gestión de preferencias
- Sistema de reputación basado en intercambios completados

#### Endpoints de Usuarios

| Ruta | Método | Descripción | Middleware |
|------|--------|-------------|------------|
| `/users/profile` | GET | Obtener perfil del usuario actual | Sesión |
| `/users/profile` | PUT | Actualizar perfil | Sesión, Validación Zod |
| `/users/:id/reputation` | GET | Ver reputación de usuario | - |
| `/users/history` | GET | Historial de actividad | Sesión |

## Middleware

### Validación con Zod

El sistema utiliza middleware de validación basado en Zod para verificar los datos de entrada:

```typescript
// Ejemplo de esquema de validación para libros
export const bookSchema = z.object({
    title: z.string().min(2, {
        message: "El título debe tener al menos 2 caracteres",
    }),
    author: z.string().min(2, {
        message: "El autor debe tener al menos 2 caracteres",
    }),
    isbn: z.string().optional(),
    condition: z.enum(["nuevo", "como_nuevo", "buen_estado", "aceptable"]),
    description: z.string().min(10, {
        message: "La descripción debe tener al menos 10 caracteres",
    }),
    category: z.string(),
    course: z.string().optional(),
});
```

### Control de Sesiones

Middleware para verificar si el usuario está autenticado:

```typescript
// Uso en rutas
router.post("/books", checkSession, validateSchema(bookSchema), createBook);
```

### Control de Roles

Middleware para verificar el rol del usuario:

```typescript
// Ejemplo de uso
checkRole("admin")
```

### Verificación de Propiedad

Middleware para verificar si el usuario es propietario del recurso:

```typescript
// Ejemplo de uso
checkOwnership("bookId")
```

## Gestión de Archivos

Para la carga de imágenes de libros, se utiliza Multer:

```typescript
// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_DIR || 'uploads/books');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        // Validar tipos de archivo
        const fileTypes = /jpeg|jpg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Formato de archivo no válido. Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
    }
});

// Uso en rutas
router.post('/books/upload', checkSession, upload.single('image'), uploadBookImage);
```

## Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT almacenados en cookies HTTP-only
- Protección contra ataques de fuerza bruta
- Validación estricta de datos de entrada
- Control de acceso basado en roles
- Sanitización de entradas para prevenir inyecciones
- Rate limiting para prevenir abusos
- Validación de dominios de correo institucionales

## Documentación API

La API está documentada con Swagger y disponible en la ruta `/api-docs` cuando el servidor está en ejecución.

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
- **multer**: Gestión de carga de archivos
- **swagger-jsdoc/swagger-ui-express**: Documentación API
- **cors**: Configuración de CORS para seguridad
- **helmet**: Protección con cabeceras HTTP
- **express-rate-limit**: Limitación de solicitudes

## Contacto

Para más información o soporte, contactar al equipo de desarrollo de Intercambia.
