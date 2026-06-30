# API RESTfull

## Create Product

method: POST

endpoint: `/api/products`

body:

```JSON
{
  "title": "Producto 1",
  "description": "Descripcion del producto",
  "price": 100,
  "category": ["Ejemplo1", "Ejemplo2"]
}
```

response:

```JSON
{
  "id": 1,
  "title": "Producto 1",
  "description": "Descripcion del producto",
  "price": 100,
  "category": ["Ejemplo1", "Ejemplo2"]
}
```

status: 201

## Error Create Product

method: POST

endpoint: `/api/products`

body:

```JSON
{
  "title": "Producto 1"
}
```

response:

```JSON
{
  "error": "La descripcion debe ser de tipo texto y no estar vacío"
},
{
  "error": "El precio debe ser un número positivo"
},
{
  "error": "La categoria debe ser un arreglo de textos"
}
```

status: 422

## Authenticator

`npm install jsonwebtoken`

## Testing

`npm install -D jest supertest`

#### Run test

`npm test`

## package.json

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
