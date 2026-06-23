import dotenv from "dotenv";
dotenv.config();

import express from "express";

import productsRouter from "./src/routes/products.router.js";

const app = express();

app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
