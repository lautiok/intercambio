# Intercambia - Frontend

## Descripción

Frontend del proyecto Intercambia desarrollado con Next.js y React. Esta aplicación proporciona la interfaz de usuario para la plataforma Intercambia, incluyendo el sistema de autenticación, gestión de usuarios y todas las funcionalidades principales.

## Tecnologías

- **Next.js 15**: Framework React con renderizado híbrido.
- **React 19**: Biblioteca para interfaces de usuario.
- **TypeScript**: Tipado estático para JavaScript.
- **Axios**: Cliente HTTP para comunicación con API.
- **React Hook Form**: Manejo de formularios.
- **React Hot Toast**: Notificaciones elegantes.
- **Lucide React**: Iconos modernos y personalizables.

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/                    # Clientes API y configuración Axios
│   ├── app/                    # Rutas y páginas de Next.js
│   │   ├── auth/               # Páginas de autenticación (login, registro, etc.)
│   │   └── [otras rutas]/      # Demás rutas de la aplicación
│   ├── components/             # Componentes React reutilizables
│   ├── context/                # Contextos de React (AuthContext, etc.)
│   ├── hooks/                  # Hooks personalizados (useAuthCheck, etc.)
│   └── layout/                 # Componentes de layout y estructura
│       ├── heroAuth/           # Layout específico para páginas de autenticación
│       └── [otros layouts]/    # Otros layouts de la aplicación
├── public/                     # Archivos estáticos
├── .next/                      # Archivos generados por Next.js (no editar)
├── next.config.ts              # Configuración de Next.js
└── package.json                # Dependencias y scripts
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd intercambia/frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env.local` en la raíz:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

4. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Crea una versión optimizada para producción.
- `npm start`: Inicia la aplicación en modo producción.
- `npm run lint`: Ejecuta el linter para verificar errores.

## Sistema de Autenticación en Frontend

### Contexto de Autenticación

El proyecto utiliza React Context API para manejar el estado de autenticación global:

```jsx
// Importar el contexto
import { useAuth } from "@/context/authContext";

// Usar el contexto en componentes
function MyComponent() {
  const { user, login, logout, loading, error } = useAuth();
  
  // Lógica del componente
}
```

El contexto de autenticación (`authContext.tsx`) proporciona:

- Estado del usuario actual
- Funciones para login, registro, logout
- Estado de carga y errores
- Funciones para recuperación de contraseña
- Verificación de autenticación

### Flujos de Autenticación

#### Registro

```jsx
const { register, loading, error } = useAuth();

const handleRegister = async (userData) => {
  try {
    await register(userData);
    // Redirección o notificación
  } catch (err) {
    // Manejo de errores
  }
};
```

#### Inicio de Sesión

```jsx
const { login, loading, error } = useAuth();

const handleLogin = async (email, password) => {
  const success = await login(email, password);
  if (success) {
    // Redirección o notificación
  }
};
```

#### Verificación de Sesión

El hook `useAuthCheck` se puede utilizar para proteger rutas:

```jsx
import { useAuthCheck } from "@/hooks/useAuthCheck";

function ProtectedComponent() {
  const { user, isLoading } = useAuthCheck();
  
  if (isLoading) return <Loading />;
  if (!user) return <Redirect to="/auth/login" />;
  
  return <ProtectedContent />;
}
```

#### Recuperación de Contraseña

```jsx
const { forgetPassword } = useAuth();

const handleForgotPassword = async (email) => {
  const success = await forgetPassword(email);
  if (success) {
    // Mostrar mensaje de éxito
  }
};
```

### Comunicación con API

El proyecto utiliza Axios para comunicarse con el backend:

```typescript
// Configuración base de Axios
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default instance;
```

Los servicios API se encuentran en `src/api/`:

```typescript
// Ejemplo de servicio API de autenticación
export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post("auth/login", {
    email,
    password,
  });
  return response.data;
};
```

## Componentes Principales

### Layouts

- **HeroAuth**: Layout específico para páginas de autenticación, con diseño atractivo.

### Páginas de Autenticación

- **Login**: Formulario de inicio de sesión
- **Register**: Formulario de registro
- **ForgotPassword**: Solicitud de recuperación de contraseña
- **ResetPassword**: Establecimiento de nueva contraseña

## Rutas Protegidas

Para proteger rutas que requieren autenticación:

```jsx
'use client'

import { useAuthCheck } from "@/hooks/useAuthCheck";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { user, isCheckingAuth } = useAuthCheck();
  
  if (isCheckingAuth) {
    return <div>Cargando...</div>
  }
  
  if (!user && !isCheckingAuth) {
    redirect('/auth/login');
  }
  
  return (
    <div>
      <h1>Contenido protegido</h1>
    </div>
  );
}
```

## Formularios

El proyecto utiliza React Hook Form para el manejo de formularios:

```jsx
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    // Lógica de envío
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>Este campo es requerido</span>}
      
      <input type="password" {...register("password", { required: true })} />
      {errors.password && <span>Este campo es requerido</span>}
      
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
```

## Notificaciones

Para mostrar mensajes al usuario, se utiliza React Hot Toast:

```jsx
import toast from "react-hot-toast";

// Mostrar notificación de éxito
toast.success("¡Operación exitosa!");

// Mostrar notificación de error
toast.error("Ha ocurrido un error");
```

## Estilos

El proyecto utiliza CSS modules para el estilo de componentes:

```jsx
import styles from './component.module.css';

export default function Component() {
  return <div className={styles.container}>Contenido</div>;
}
```

## Desarrollo

### Agregar Nuevas Páginas

1. Crea una nueva carpeta en `src/app/` con el nombre de la ruta.
2. Agrega un archivo `page.tsx` dentro de la carpeta con el componente de la página.

### Agregar Nuevos Componentes

1. Crea un nuevo archivo en `src/components/` con el nombre del componente.
2. Importa y utiliza el componente donde sea necesario.

### Agregar Nuevos Contextos

1. Crea un nuevo archivo en `src/context/` con el nombre del contexto.
2. Crea un provider y un hook personalizado para acceder al contexto.
3. Envuelve la aplicación o componentes específicos con el provider.

## Dependencias Principales

- **next**: Framework React para aplicaciones web
- **react/react-dom**: Biblioteca para interfaces de usuario
- **axios**: Cliente HTTP para comunicación con API
- **react-hook-form**: Manejo de formularios
- **react-hot-toast**: Sistema de notificaciones
- **lucide-react**: Biblioteca de iconos

## Contacto

Para más información o soporte, contactar al equipo de desarrollo de Intercambia.
