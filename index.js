import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import productsRouter from "./src/routes/products.router.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/products", productsRouter);

//configuro un middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
