import express from "express";
import cors from "cors";

import productsRouter from "./src/routes/products.routes.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

//configuro un middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
