import {
  getProducts as getProductsModel,
  getProductById as getProductByIdModel,
  createProduct as createProductModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel,
} from "../models/Product.js";

//---- Obtener todos los productos ----
export const getAllProducts = async (req, res) => {
  try {
    const products = await getProductsModel();
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno al intentar obtener todos los productos",
    });
  }
};

//---- Obtener un producto por id ----
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdModel(id);

    if (!product) {
      return res.status(404).json({
        message: `Producto con ID ${id} no encontrado`,
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno al intentar obtener el producto",
    });
  }
};

//---- Crear nuevo producto ----
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // if (!title || !description || !price || !category) {
    //   return res.status(422).json({
    //     message: "Faltan datos obligatorios",
    //   });
    // }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(422).json({
          message: "El titulo debe ser de tipo texto y no estar vacío",
        });
      }
    }

    if (description !== undefined) {
      if (typeof description !== "string" || description.trim() === "") {
        return res.status(422).json({
          message: "La descripcion debe ser de tipo texto y no estar vacío",
        });
      }
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price <= 0) {
        return res.status(422).json({
          message: "El precio debe ser un número positivo",
        });
      }
    }

    if (category !== undefined) {
      if (!Array.isArray(category)) {
        return res.status(422).json({
          message: "La categoria debe ser un arreglo de textos",
        });
      }
    }

    const newProduct = await createProductModel({
      title,
      description,
      price,
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno al intentar crear el producto",
    });
  }
};

//---- Actualizar producto por id ----
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(422).json({
          message: "El titulo debe ser de tipo texto y no estar vacío",
        });
      }
    }

    if (description !== undefined) {
      if (typeof description !== "string" || description.trim() === "") {
        return res.status(422).json({
          message: "La descripcion debe ser de tipo texto y no estar vacío",
        });
      }
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price <= 0) {
        return res.status(422).json({
          message: "El precio debe ser un número positivo",
        });
      }
    }

    if (category !== undefined) {
      if (!Array.isArray(category)) {
        return res.status(422).json({
          message: "La categoria debe ser un arreglo de textos",
        });
      }
    }

    const updatedProduct = await updateProductModel(id, {
      title,
      description,
      price,
      category,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno al intentar actualizar el producto",
    });
  }
};

//---- Eliminar producto por id ----
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteProductModel(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "Producto eliminado correctamente",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno al intentar eliminar el producto",
    });
  }
};
