import { Router } from "express";

import { getAllProducts } from "../controllers/products.controller.js";

const router = Router();

//prefijo: /api/products
router.get("/", getAllProducts);

export default router;
