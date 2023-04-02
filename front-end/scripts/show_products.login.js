import client_service from "../api/client_service.js";
import loader from "../util/loader.js";
import {
  createElemItem,
  createElemCategory,
  createElemError,
} from "../util/adminHtmlTemplates.js";

// Cantidad de items a mostrar
const SHOW_ITEMS = 12;
// desde que posición comenzar a traer los items
let count = 0;

async function fetchProductsFromServer(p_elem_productsList) {
  const products = await client_service.getServerData(
    `/products?_start=${count}&_limit=${SHOW_ITEMS}`
  );

  products.forEach((p) => {
    const elem_item = createElemItem(p.image, p.name, p.price, p.id);
    p_elem_productsList.appendChild(elem_item);
    count++;
  });
}

(async function showAllProducts() {
  const sectionProductos = document.querySelector("[data-productos]");
  // Creamos una categoria llamada 'All' para insertar ahí los items
  const elem_category = createElemCategory("All");
  sectionProductos.appendChild(elem_category);

  const elem_productsList = elem_category.querySelector(".productos__lista");
  loader.showIn(elem_productsList);

  try {
    // pasamos el elemento html que será la lista contenedora de los datos de cada producto del servidor
    await fetchProductsFromServer(elem_productsList);

    loader.removeFrom(elem_productsList);

    // Asignacion de eventos a los botones "ver mas" y "ver menos"
    const elemButton_verMas = sectionProductos.querySelector(
      ".productos__button--ver-mas"
    );
    elemButton_verMas.addEventListener("click", () => {
      fetchProductsFromServer(elem_productsList);
    });

    const elemButton_verMenos = sectionProductos.querySelector(
      ".productos__button--ver-menos"
    );
    elemButton_verMenos.addEventListener("click", () => {
      let i = 0;
      while (count > SHOW_ITEMS && i < SHOW_ITEMS) {
        elem_productsList.lastChild.remove();
        count--;
        i++;
      }
    });

    // Boton que nos dirije a la pagina de Agregar Producto
    const elemButton_agregarProducto = sectionProductos.querySelector(
      ".productos__button--agregar-producto"
    );
    elemButton_agregarProducto.addEventListener("click", () => {
      window.location.href = "../pages/add-product.html";
    });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      sectionProductos.innerHTML = "";
      sectionProductos.appendChild(createElemError());
    }
  }
})();
