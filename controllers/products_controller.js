import client_service from "../services/client_service.js";
import { res } from "../modules/h.lista_productos.js";

async function showProducts() {
  const response_Array = await client_service.getProductos(0);
}

res().then((res) => res.text().then((res) => console.log(res)));

// const ul = fetch("../modules/lista_productos.htm").then((res) => {
//   res.text().then((res) => {
//     console.log(res);
//     document.querySelector("body").insertAdjacentHTML("beforeend", res);
//   });
// });
