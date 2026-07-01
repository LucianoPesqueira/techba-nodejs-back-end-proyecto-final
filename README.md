# 🎮 API RESTfull

Api Rest de una tienda donde pueda administrar los recursos como Leer, Crear, Actualizar y Eliminar informacion sobre los productos, con manejo de errores, resguardando la informacion en una base de datos en la nube mediante el servicio Firestore de Firebase, e implementando validaciones estrictas con JsonWebToken.

Se manejan los errores de la siguiente manera:

- _404_: para rutas no definidas
- _401_ y _403_: para errores de autenticacion
- _400_ y _500_: cuando las peticiones contienen errores o servicioes externos de datos no responden

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js / Express.js
- **Dependencias:** express, cors, dotenv, firebase, jsonwebtoken, jest supertest
- **Base de datos:** Firebase Firestore
- **Pruebas:** Jest / Supertest

---

## 🔌 Rutas

- **products.routes.js**:
  - **GET /api/products** devuelve todos los productos
  - **GET /api/products/:id** devuelve el producto con el ID indicado.
  - **POST /api/products/create** recibe en el cuerpo (body) de la petición la informacion sobre el nuevo producto para ser guardado en el servicio de datos en la nube.
  - **Delete /api/products/:id** elimina el producto con el ID indicado.
- **auth.routes.js:**
  - **POST /auth/login** recibe las credenciales de usuario en el cuerpo (body) de la petición y devuelve el Bearer token si son válidas o un error de autenticación en caso contrario.

---

## 📋 Endpoints de la API

### 1. Obtener todos los productos

Retorna un listado completo con todos los videosjuegos disponibles.

- **URL:** `/api/products`
- **Método:** `GET`
- **Autenticacion Requerida:** No
- **Respuesta Exitosa (`200 OK`):**

```JSON
[
  {
    "id": "h0jR79aU8muGzUkehpnq",
    "title": "LEGO Batman: Legacy of The Dark Knight",
    "description": "Videojuego de acción y aventura en mundo abierto...",
    "price": 50.0,
    "category": ["Acción", "Acción y aventura"]
  }
]
```

**Respuesta de Error:**

- `500 Internal Server Error`: **Error interno al intentar obtener el producto.**

---

### 2. Obtener un producto por ID

Busca y extrae los detalles específicos de un único videojuego utilizando su identificador único de base de datos.

- **URL:** `/api/products/:id`
- **Método:** `GET`
- **Autenticación Requerida:** No
- **Respuesta Exitosa (`200 OK`):**

```JSON
{
  "id": "h0jR79aU8muGzUkehpnq",
  "title": "LEGO Batman: Legacy of The Dark Knight",
  "description": "LEGO Batman: Legacy of the Dark Knight es un videojuego de acción...",
  "price": 50.0,
  "category": ["Acción", "Acción y aventura"]
}
```

**Respuesta de Error:**

- **`404 Not Found`**: Producto con ID ${id} no encontrado.
- `500 Internal Server Error`: Error interno al intentar obtener el producto.

---

### 3. Crear un nuevo producto

Registra un videojuego en la base de datos. Valida tipos de datos y valores positivos en el precio.

- **URL:** `/api/products`
- **Método:** `POST`
- **Autenticación Requerida:** Sí (Bearer Token)
- **Cuerpo de la Petición (`req.body`):**

  ```json
  {
    "title": "Metro 2039",
    "description": "Videojuego de acción-shooter narrativo posapocalíptico.",
    "price": 50.0,
    "category": ["Shooter", "Supervivencia"]
  }
  ```

- **Respuesta Exitosa (`201 Created`):**

  ```json
  {
    "id": "abc123XYZ",
    "title": "Metro 2039",
    "description": "Videojuego de acción-shooter narrativo posapocalíptico.",
    "price": 50.0,
    "category": ["Shooter", "Supervivencia"]
  }
  ```

- **Respuestas de Error:**
  - `422 Unprocessable Entity`:

  ```JSON
  {
    "message": "El titulo debe ser de tipo texto y no estar vacío"
  }
  ```

  \*(Mensajes según el campo inválido: `"La descripcion debe ser de tipo texto y no estar vacío"`, `"El precio debe ser un número positivo"`, `"La categoria debe ser un arreglo de textos"`)\*
  - `500 Internal Server Error`: Error interno al intentar obtener el producto.
  - `401 Unauthorized:`Token de autenticación ausente o inválido.

---

### 4. Actualizar un producto por ID

Modifica las propiedades de un videojuego existente en la colección

- **URL:** `/api/products/:id`
- **Método:** `PUT` / `PATCH`
- **Autenticación Requerida:** Sí (`Bearer <token>`)
- **Cuerpo de la Petición (`req.body`):**

```JSON
{
  "title": "Producto test actualizado",
  "description": "Descripcion actualizada",
  "price": 2000,
  "category": ["Nueva categoria"]
}
```

- **Respuesta Exitosa (`200 OK`):**

```JSON
{
  "message": "Producto actualizado correctamente",
  "product": {
    "id": "h0jR79aU8muGzUkehpnq",
    "title": "Producto test actualizado",
    "description": "Descripcion actualizada",
    "price": 2000,
    "category": ["Nueva categoria"]
  }
}
```

- **Respuestas de Error:**
  - (`422` / `404`): Maneja los mismos criterios de error de datos que el método de creación (`422`) o devuelve un `404` si el identificador no existe en Firestore.
  - `500 Internal Server Error`: Error interno al intentar obtener el producto.
  - `401 Unauthorized:`Token de autenticación ausente o inválido.

---

### 5. Eliminar un producto

Remueve permanentemente un videojuego de la colección por su identificador único de base de datos.

- **URL:** `/api/products/:id`
- **Método:** `DELETE`
- **Autenticación Requerida:** Sí (`Bearer <token>`)
- **Respuesta Exitosa (`200 OK`):**

```JSON
{
  "message": "Producto eliminado correctamente",
  "product": {
    "id": "h0jR79aU8muGzUkehpnq",
    "title": "Producto test actualizado",
    "description": "Descripción de prueba",
    "price": 2000,
    "category": ["Acción"]
  }
}
```

**Respuesta de Error:**

- **`404 Not Found`**: Producto no encontrado.
- `500 Internal Server Error`: Error interno al intentar obtener el producto.

---

## 🔐 Autenticator

- **Instalar JWT:** `npm install jsonwebtoken`
- **Crear un middleware de autenticación**
- **Controlador de login:** validar la identidad del usuario y devolver un `Bearer Token`

---

## 🧪 Ejecución de Pruebas Integrales

- **Instalar jest / supertest:** `npm install -D jest supertest`
- **Ejecutar los test:**

```Shell
npm test
```

---

## 📦 package.json

```Shell
{
  "scripts": {
    ...
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "firebase": "^12.15.0",
    "jsonwebtoken": "^9.0.3"
  },
  "devDependencies": {
    "jest": "^30.4.2",
    "supertest": "^7.2.2"
  }
}
```
