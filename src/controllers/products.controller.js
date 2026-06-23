import { getProducts } from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await getProducts();
  res.json(products);
};
