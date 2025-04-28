# Intercambia - Plataforma de Intercambio de Libros

## Descripción General

Intercambia es una plataforma innovadora diseñada para facilitar el intercambio de libros entre miembros de instituciones educativas como colegios, universidades y bibliotecas. El proyecto busca fomentar la cultura de compartir recursos educativos, promover la sostenibilidad y crear una comunidad de lectores conectados a través de sus instituciones.

La plataforma está especialmente enfocada en entornos educativos, donde los usuarios pueden intercambiar materiales académicos y literarios de manera sencilla y organizada, utilizando sus credenciales institucionales para garantizar un entorno seguro y confiable.

## Características Principales

### Sistema de Autenticación Institucional
- **Registro con correo institucional**: Verificación automática de dominios autorizados.
- **Verificación de cuentas**: Proceso seguro mediante email u otros medios internos.
- **Acceso controlado**: Solo miembros verificados de instituciones participantes.

### Gestión de Libros
- **Subida de libros**: Los usuarios pueden ofrecer sus libros especificando detalles como título, autor, ISBN, estado físico, fotografías y descripción personalizada.
- **Categorización**: Organización por categoría, curso o asignatura para facilitar la búsqueda.
- **Estado de disponibilidad**: Sistema que marca los libros como "Disponible", "En proceso de intercambio" o "Intercambiado".

### Exploración y Búsqueda
- **Catálogo navegable**: Interfaz intuitiva para explorar libros disponibles.
- **Filtros avanzados**: Búsqueda por categoría, título, autor o institución.
- **Visualización detallada**: Información completa de cada libro con imágenes.

### Sistema de Intercambio
- **Solicitudes personalizadas**: Los usuarios pueden solicitar un libro ofreciendo otro a cambio.
- **Gestión de solicitudes**: Propietarios pueden aceptar o rechazar propuestas de intercambio.
- **Coordinación interna**: Comunicación entre usuarios para acordar la entrega física.
- **Finalización y registro**: Confirmación del intercambio completado y actualización de historial.

### Extras
- **Panel administrativo institucional**: Herramientas para que las instituciones gestionen su comunidad.
- **Estadísticas de uso**: Métricas sobre intercambios y actividad en la plataforma.
- **Validación de usuarios**: Sistema para verificar la pertenencia de usuarios a instituciones.

## Flujos de Usuario

### Registro e Inicio de Sesión
1. Usuario se registra con correo institucional (sistema verifica dominio autorizado)
2. Recibe verificación de cuenta (email u otro medio interno)
3. Accede a su perfil personalizado dentro de la plataforma

### Publicación de Libros
1. Usuario sube un libro para ofrecer al intercambio
2. Completa formulario con título, autor, ISBN, estado, fotografía y descripción
3. Selecciona categoría, curso o asignatura relevante
4. El libro queda registrado como "Disponible" en la base de datos

### Exploración y Solicitud
1. Usuario explora los libros disponibles usando filtros personalizados
2. Al encontrar un libro de interés, envía solicitud de intercambio
3. Selecciona cuál de sus propios libros ofrece a cambio
4. La solicitud queda registrada como "Pendiente" para el propietario

### Gestión de Solicitudes
1. Propietario del libro recibe notificación de solicitud
2. Revisa la oferta y decide aceptar o rechazar
3. Si acepta:
   - Ambos libros cambian a estado "Intercambio acordado"
   - Se habilita una conversación interna para coordinar la entrega
4. Si rechaza:
   - La solicitud se marca como "Rechazada"
   - El solicitante puede buscar otros libros o hacer otras ofertas

### Finalización del Intercambio
1. Tras la entrega física de los libros, usuarios marcan el intercambio como "Completado"
2. Los libros se registran como "Intercambiados" en el sistema
3. Se actualiza el historial de intercambios en cada perfil
4. Sistema genera estadísticas sobre la actividad

## Arquitectura Técnica

El proyecto está dividido en dos componentes principales:

### Backend (Express + TypeScript + MongoDB)
- API RESTful para gestión de usuarios, libros e intercambios
- Sistema robusto de autenticación con JWT
- Validación de datos con Zod
- Arquitectura en capas (controladores, servicios, repositorios)
- Documentación API con Swagger

### Frontend (Next.js + React)
- Interfaz de usuario moderna y responsiva
- Autenticación gestionada con Context API
- Formularios validados con React Hook Form
- Sistema de notificaciones con React Hot Toast
- Componentes reutilizables y layouts estructurados

## Instalación y Despliegue

Para información detallada sobre la instalación y configuración de cada componente, consulte los archivos README específicos en las carpetas:
- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)

## Equipo y Contacto

Intercambia es un proyecto desarrollado como solución innovadora para comunidades educativas. Para más información o soporte, contacte al equipo de desarrollo.

---

*Intercambia - Conectando comunidades a través del conocimiento compartido*