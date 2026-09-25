# 📘 Proyecto Aplicaciones Interactivas - UADE

## Integrantes

- **TOBIAS ARIAS**
- **ALEJANDRO VALENTE**
- **JUAN IGNACIO FORTEZ**

## Descripcion del proyecto

Este proyecto consiste en el desarrollo de una API REST para la gestión de un gimnasio, siendo una solución diseñada para centralizar y reemplazar la carga manual de la información del comercio. Su propósito es permitir que el administrador administre el contenido del sitio (productos, servicios, categorías e información del negocio) desde un único lugar, en lugar de mantener los datos dispersos o actualizarlos recurriendo a alguien externo cada vez que algo cambia.

La API expone los endpoints necesarios para crear, consultar, modificar y eliminar cada entidad del sistema, aplicando las validaciones correspondientes en cada operación. Por otro lado, también ofrece endpoints públicos que no requieren autenticación, de modo que cualquier visitante pueda enviar una consulta a través del formulario de contacto sin necesidad de registrarse. Cada consulta queda registrada en la base de datos y además notificada por correo electrónico al gimnasio.

A través de esta herramienta, el administrador podrá mantener la información de su gimnasio actualizada y ordenada de forma más eficiente. De esta manera, el sistema contribuye a reducir el trabajo manual, minimizar los errores de carga y garantizar la trazabilidad de todos los mensajes recibidos, ya que cada consulta queda asociada a un estado que permite seguir su evolución hasta el momento de la respuesta.

## Funcionalidades

### Gestión de administradores

- Crear cuentas de administrador (nombre, apellido, correo, teléfono y contraseña).
- Iniciar sesión y obtener un token JWT válido por 24 horas.
- Cerrar sesión revocando el token, de modo que el mismo quede inutilizable aunque no haya expirado.
- Recuperar la contraseña mediante un token temporal que expira pasado cierto tiempo.
- Modificar los datos del perfil del administrador autenticado.
- Evitar correos duplicados al registrar un administrador.

### Gestión de publicaciones

- Crear publicaciones de productos y servicios (nombre, descripción, categoría, imágenes y precio).
- Listar y consultar publicaciones, mostrando la categoría asociada a cada una.
- Modificar los datos de una publicación existente.
- Dar de baja publicaciones de forma lógica, sin eliminar el registro de la base de datos.
- Eliminar publicaciones de forma permanente.
- Adjuntar varias imágenes por publicación, tanto por URL como en base64.
- Controlar la disponibilidad de una publicación y marcar cuáles se destacan en el sitio.

### Gestión de categorías

- Crear, listar, modificar y eliminar categorías.
- Garantizar que no existan dos categorías con el mismo nombre.
- Impedir la eliminación de una categoría que todavía tiene publicaciones asociadas.

### Gestión de consultas

- Recibir consultas del formulario de contacto sin necesidad de autenticación (nombre, correo, teléfono, asunto y mensaje).
- Notificar al gimnasio por correo electrónico cada vez que se recibe una consulta nueva.
- Listar todas las consultas recibidas, de la más reciente a la más antigua.
- Modificar el estado de una consulta para hacer seguimiento: **Pendiente**, **Leída** o **Respondida**.
- Eliminar consultas del sistema.

### Información institucional

- Cargar los datos del gimnasio (nombre, descripción, dirección, teléfono, horarios de atención y redes sociales).
- Modificar la información institucional existente.

### Seguridad

- Cifrado de contraseñas mediante bcrypt.
- Autenticación por token JWT en todos los endpoints privados.
- Lista negra de tokens revocados, con limpieza automática de los registros vencidos mediante un índice TTL.
- Actualizaciones mediante lista blanca de campos, evitando la inyección de operadores de MongoDB.

## Estructura

```
├── 📁 controllers/                        # Controladores: validan la entrada y traducen errores a códigos HTTP
│   ├── category.controller.js
│   ├── consulta.controller.js
│   ├── institution.controller.js
│   ├── publicacion.controller.js
│   └── user.controller.js
├── 📁 middlewares/                        # Middlewares de la aplicación
│   └── auth.middleware.js                 # Verificación del token JWT y de la lista negra
├── 📁 models/                             # Esquemas de Mongoose
│   ├── Category.model.js
│   ├── Consulta.model.js
│   ├── Institution.model.js
│   ├── Publicacion.model.js
│   ├── TokenBlacklist.model.js
│   └── User.model.js
├── 📁 routes/                             # Definición de las rutas del servidor
│   ├── api.js                             # Agrupa las rutas de la API
│   ├── index.js                           # Ruta raíz de verificación
│   └── 📁 api/                            # Rutas separadas por recurso
│       ├── category.route.js
│       ├── consulta.route.js
│       ├── institution.route.js
│       ├── publicacion.route.js
│       └── user.route.js
├── 📁 services/                           # Lógica de negocio de cada entidad
│   ├── category.service.js
│   ├── consulta.service.js
│   ├── email.service.js                   # Envío de correos con Nodemailer
│   ├── institution.service.js
│   ├── publicacion.service.js
│   └── user.service.js
├── 📁 scripts/                            # Scripts de inicialización
│   └── 📁 seed/                           # Carga de datos de prueba
│       ├── api.js                         # Cliente HTTP para consumir la API
│       ├── index.js                       # Orquestador de la carga
│       ├── limpiar.js                     # Limpieza de las colecciones
│       └── 📁 data/                       # Datos de prueba
│           ├── categorias.js
│           ├── institucion.js
│           ├── publicaciones.js
│           └── usuarios.js
├── 📁 postman/                            # Pruebas de la API
│   └── Gym-API.postman_collection.json     # Colección con casos válidos y errores
├── 📁 css/                                # Hojas de estilo del sitio
├── 📁 js/                                 # Scripts del sitio
├── 📁 fonts/                              # Tipografías e iconos
├── 📁 images/                             # Imágenes del sitio
├── 📄 index.html                          # Landing page del gimnasio
├── 📄 app.js                              # Punto de entrada del servidor
├── 📄 config.js                           # Conexión a MongoDB
├── 📄 package.json
├── 📄 Link_Web.txt
├── 📄 .env
└── 📄 .gitignore
```
