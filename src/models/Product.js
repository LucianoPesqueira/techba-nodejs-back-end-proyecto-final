import db from "../config/firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "digital_games");

// CRUD - Create, Read, Update, Delete

//Read All
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);

    const products = [];

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  } catch (error) {
    console.error("Error en el modelo con Firestore", error);

    throw error;
  }
};

//Read by ID
export const getProductById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }
    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error en el modelo con Firestore", error);

    throw error;
  }
};

//Create
export const createProduct = async (product) => {
  try {
    const productRef = await addDoc(productsCollection, product);

    return {
      id: productRef.id,
      ...product,
    };
  } catch (error) {
    console.error("Error en el modelo con Firestore", error);

    throw error;
  }
};

//Update
export const updateProduct = async (id, product) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    await updateDoc(productRef, product);

    return {
      id,
      ...product,
    };
  } catch (error) {
    console.error("Error en el modelo con Firestore", error);

    throw error;
  }
};

//Delete
export const deleteProduct = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    const deletedProduct = {
      id: snapshot.id,
      ...snapshot.data(),
    };
    await deleteDoc(productRef);

    return deletedProduct;
  } catch (error) {
    console.error("Error en el modelo con Firestore", error);

    throw error;
  }
};
