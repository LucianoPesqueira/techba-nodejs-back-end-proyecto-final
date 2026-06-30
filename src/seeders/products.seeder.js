import db from "../config/firebase.js";

import { collection, addDoc } from "firebase/firestore";

//coleccion(instancia de la db, nombre de la coleccion)
const productsCollection = collection(db, "digital_games");

const gamesSeeders = [
  {
    title: "LEGO Batman: Legacy of The Dark Knight",
    description:
      "LEGO Batman: Legacy of the Dark Knight es un videojuego de acción y aventura en mundo abierto que invita al jugador a embarcarse en el viaje épico que emprende Bruce Wayne desde que comienza hasta que se convierte en el héroe de Gotham City.",
    price: 50.0,
    category: ["Acción", "Acción y aventura"],
  },
  {
    title: "Hunting Simulator 3",
    description:
      "Hunting Simulator 3 es un videojuego de simulación de caza en mundo abierto que permitirá explorar los paisajes naturales de Colorado y Texas, solo o en grupo, y capturar numerosas especies animales con la ayuda de nuestro fiel perro de caza.",
    price: 38.6,
    category: ["Deportes", "Caza / Pesca"],
  },
  {
    title: "Lords of the Fallen II",
    description:
      "Lords of the Fallen II es un RPG de acción y fantasía oscura que nos invita a recorrer un mundo al borde del colapso donde los reinos de los vivos y los muertos se fusionan en una tierra asolada por dioses caídos.",
    price: 45.6,
    category: ["Rol", "Acción RPG"],
  },
  {
    title: "Metro 2039",
    description:
      "Metro 2039 es la última entrega de una saga de videojuegos de acción-shooter narrativos ambientado en un Moscú posapocalíptico donde el jugador se adentra en un conflicto que amenaza con desgarrar el Metro desde dentro.",
    price: 50.0,
    category: [
      "Acción",
      "Acción y aventura",
      "Primera persona (FPS)",
      "Shooter",
      "Supervivencia",
    ],
  },
  {
    title: "Assassin's Creed Black Flag Resynced",
    description:
      "Assassin's Creed Black Flag Resynced es un videojuego de acción y aventura en mundo abierto de temática pirata que actualiza el clásico con un enfoque más pulido y una ambientación caribeña renovada.",
    price: 69.99,
    category: ["Acción", "Acción y aventura"],
  },
  {
    title: "Call of Duty: Modern Warfare 4",
    description:
      "Call of Duty: Modern Warfare 4 se vende en tiendas como un videojuego de acción-shooter bélico de ambientación militar contemporánea que sitúa al jugador en una guerra desatada en la península de Corea tras una invasión norcoreana que amenaza con desestabilizar el orden global.",
    price: 59.6,
    category: ["Acción", "Primera personsa (FPS)", "Shooter"],
  },
];

// const createGames = () => {
//   gamesSeeders.forEach(async (game) => {
//     await addDoc(productsCollection, game);
//   });
// };
const createGames = async () => {
  try {
    for (const game of gamesSeeders) {
      const docRef = await addDoc(productsCollection, game);
      console.log(`Guardado con exito: "${game.title}", ID: ${docRef.id}`);
    }
    console.log(
      "Los productos fueron cargados correctamente en la base de datos.",
    );
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};

createGames();

//para cargar el array de objetos en la db: node src/seeders/products.seeder.js
