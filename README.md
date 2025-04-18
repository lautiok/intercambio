# Intercambia - Sistema de Autenticación

## Descripción General

Este documento describe el sistema de autenticación implementado en el proyecto Intercambia, una plataforma que ofrece funcionalidades de registro, inicio de sesión, verificación de sesiones, recuperación de contraseñas y control de acceso basado en roles.

## Características Principales

- **Registro de usuarios**: Creación de cuentas con validación de datos.
- **Inicio de sesión seguro**: Autenticación con email y contraseña.
- **Protección contra ataques de fuerza bruta**: Sistema de bloqueo de intentos fallidos.
- **Recuperación de contraseña**: Proceso completo con tokens JWT y correos electrónicos.
- **Control de sesiones**: Verificación de tokens y manejo de cookies.
- **Control de acceso basado en roles**: Diferentes niveles de permisos (admin, user).
- **Validación de datos**: Implementación de validadores con Zod.

## Arquitectura

El sistema de autenticación está estructurado en:

### Backend (TypeScript + Express + MongoDB)

- **Controladores**: Manejo de lógica de autenticación (`auth.controllers.ts`)
- **Rutas**: Endpoints para las operaciones de autenticación (`auth.routes.ts`)
- **Middleware**: 
  - Validación de datos con Zod
  - Control de sesiones
  - Verificación de roles
- **Servicios**: Lógica de negocio para usuarios y login
- **Repositorios**: Acceso a datos y operaciones CRUD

### Frontend (Next.js + React)

- **Context API**: Gestión de estado de autenticación global (`authContext.tsx`)
- **API Clients**: Funciones para interactuar con el backend (`authApi.ts`)
- **Hooks personalizados**: Para la verificación de autenticación

## Flujos de Autenticación

### Registro de Usuario

1. El cliente envía datos del usuario (nombre, email, contraseña, etc.)
2. Se validan los datos con Zod
3. Se verifica que el email no esté registrado
4. Se encripta la contraseña con bcrypt
5. Se crea el nuevo usuario en la base de datos
6. Se devuelve respuesta exitosa

### Inicio de Sesión

1. El cliente envía email y contraseña
2. Se verifica si hay intentos fallidos desde la IP del cliente
3. Se busca al usuario en la base de datos
4. Se compara la contraseña con la versión encriptada
5. Se genera un token JWT con información del usuario
6. Se establece una cookie HTTP-only con el token
7. Se registra el inicio de sesión exitoso

### Recuperación de Contraseña

1. El usuario solicita recuperación con su email
2. Se verifica que el email exista en la base de datos
3. Se genera un token JWT con tiempo de expiración
4. Se envía un correo con enlace de recuperación al usuario
5. El usuario accede al enlace y establece nueva contraseña
6. Se verifica el token y se actualiza la contraseña

### Verificación de Sesión

1. Se extrae el token JWT de las cookies
2. Se verifica la validez del token
3. Se decodifica para obtener la información del usuario
4. Se confirma que el usuario existe en la base de datos
5. Se retorna la información del usuario autorizado

## Seguridad

- **Contraseñas**: Almacenadas con hash utilizando bcrypt
- **Tokens**: JWT con tiempo de expiración (1 día)
- **Cookies**: HTTP-only para prevenir ataques XSS
- **Protección contra fuerza bruta**: Bloqueo temporal después de múltiples intentos fallidos
- **Validación**: Esquemas Zod para validar todas las entradas de datos

## Endpoints API

### Autenticación

| Ruta | Método | Descripción | Middleware |
|------|--------|-------------|------------|
| `/auth/register` | POST | Registro de nuevos usuarios | Validación Zod |
| `/auth/login` | POST | Inicio de sesión | Validación Zod |
| `/auth/logout` | POST | Cierre de sesión | - |
| `/auth/verify` | POST | Verificación de token | - |
| `/auth/forgot-password` | POST | Solicitud de recuperación | Validación Zod |
| `/auth/reset-password` | POST | Establecer nueva contraseña | Validación Zod |
| `/auth/login/consult` | GET | Consulta de registros de login | Sesión, Rol Admin |

## Uso en Frontend

### Contexto de Autenticación

El proyecto utiliza un contexto de React para gestionar el estado de autenticación:

```typescript
// Ejemplo de uso del contexto de autenticación
import { useAuth } from "@/context/authContext";

function MyComponent() {
  const { user, login, logout, loading, error } = useAuth();
  
  const handleLogin = async (email, password) => {
    const success = await login(email, password);
    if (success) {
      // Redirigir o mostrar mensaje de éxito
    }
  };
  
  return (
    <div>
      {user ? (
        <button onClick={logout}>Cerrar sesión</button>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
}
```

### Verificación de Sesión

```typescript
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedPage() {
  const { user, isCheckingAuth } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isCheckingAuth && !user) {
      router.push("/auth/login");
    }
  }, [user, isCheckingAuth, router]);
  
  if (isCheckingAuth) {
    return <div>Cargando...</div>;
  }
  
  return <div>Contenido protegido</div>;
}
```

## Validación de Datos

El sistema utiliza Zod para la validación de datos en las solicitudes:

### Ejemplos de Esquemas

```typescript
// Esquema de registro
export const registerSchema = z.object({
    email: z.string().email({
        message: "El email debe ser válido",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
    password_dos: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
    institutional: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
});
```

## Configuración

Para una implementación completa, se requiere configurar:

1. Variables de entorno para JWT_SECRET y HASH_SALT
2. Configuración de MongoDB para almacenamiento de usuarios
3. Configuración de NodeMailer para el envío de correos
4. Variables de entorno para URLs de frontend (recuperación de contraseña)

## Contribuir

Si deseas contribuir al sistema de autenticación, por favor:

1. Asegúrate de mantener las validaciones de seguridad existentes
2. Escribe pruebas para cualquier nueva funcionalidad
3. Sigue los estándares de código TypeScript actuales
4. Documenta cualquier cambio en este README
