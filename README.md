# Backend - DevLabs Task Management

Este es el backend de una aplicación de gestión de tareas, desarrollado utilizando **Node.js**, **Express**, y **Sequelize** para interactuar con la base de datos. La aplicación permite realizar operaciones CRUD sobre tareas, y se conecta con el frontend para gestionar y visualizar las tareas de los usuarios.

## Características

- API RESTful para gestión de tareas.
- Conexión con una base de datos PostgreSQL usando **Sequelize**.
- Validación de datos de entrada utilizando **Zod** (opcional).
- Manejo de errores y respuestas consistentes en la API.
- Autenticación de usuarios utilizando OAuth2.

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución para JavaScript en el backend.
- **Express** - Framework web para Node.js para crear la API.
- **Sequelize** - ORM para interactuar con la base de datos PostgreSQL.
- **PostgreSQL** - Sistema de gestión de bases de datos.
- **Zod** (opcional) - Para la validación de datos.
- **OAuth2** - Para la autenticación de usuarios.

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu_usuario/devlabs-task-backend.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd devlabs-task-backend
   ```

3. Instala las dependencias utilizando **npm** o **yarn**:

   - Usando npm:

     ```bash
     npm install
     ```

   - Usando yarn:

     ```bash
     yarn install
     ```

## Ejecución

Para ejecutar el servidor en modo de desarrollo, puedes usar el siguiente comando:

- Usando npm:

  ```bash
  npm start
  ```

- Usando yarn:

  ```bash
  yarn start
  ```

Esto iniciará el servidor en `http://localhost:5000`.

## Endpoints de la API

### **GET /api/todos?userId=<userId>**

Obtiene todas las tareas de un usuario autenticado.

**Parámetros**:

- `userId`: El ID del usuario (proporcionado por el frontend tras la autenticación).

**Respuesta de éxito**:

```json
[
  {
    "id": 1,
    "title": "Tarea 1",
    "userId": "google-oauth2|103697667772800746321",
    "createdAt": "2024-12-18T12:34:56Z",
    "updatedAt": "2024-12-18T12:34:56Z"
  },
  ...
]
```

### **POST /api/todos**

Crea una nueva tarea para un usuario autenticado.

**Cuerpo de la solicitud**:

```json
{
  "title": "Descripción de la tarea",
  "userId": "google-oauth2|103697667772800746321"
}
```

**Respuesta de éxito**:

```json
{
  "id": 1,
  "title": "Descripción de la tarea",
  "userId": "google-oauth2|103697667772800746321",
  "createdAt": "2024-12-18T12:34:56Z",
  "updatedAt": "2024-12-18T12:34:56Z"
}
```

### **PUT /api/todos/:id**

Actualiza una tarea existente.

**Cuerpo de la solicitud**:

```json
{
  "title": "Nueva descripción de la tarea"
}
```

**Respuesta de éxito**:

```json
{
  "id": 1,
  "title": "Nueva descripción de la tarea",
  "userId": "google-oauth2|103697667772800746321",
  "createdAt": "2024-12-18T12:34:56Z",
  "updatedAt": "2024-12-18T12:34:56Z"
}
```

### **DELETE /api/todos/:id**

Elimina una tarea.

**Respuesta de éxito**:

- Código de estado `204` (sin contenido).