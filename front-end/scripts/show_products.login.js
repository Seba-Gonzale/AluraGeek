import client_service from "../api/client_service.js";
import loader from "../util/loader.js";
import {
  createElemItem,
  createElemCategory,
} from "../util/adminHtmlTemplates.js";

const SHOW_ITEMS = 12;
let count = 0;

async function fetchProductsFromServer(p_elem_productsList) {
  try {
    const products = await client_service.getServerData(
      `/products?_start=${count}&_limit=${SHOW_ITEMS}`
    );

    products.forEach((p) => {
      const elem_item = createElemItem(p.image, p.name, p.price);
      p_elem_productsList.appendChild(elem_item);
    });
    return false;
  } catch (error) {
    console.log(error);

    return true;
  }
}

(async function showAllProducts() {
  const sectionProductos = document.querySelector("[data-productos]");
  // Creamos una categoria llamada 'All' para insertar ahí los items
  const elem_category = createElemCategory("All");
  const elem_productsList = elem_category.querySelector(".productos__lista");
  sectionProductos.appendChild(elem_category);
  loader.showIn(elem_productsList);

  try {
    while (await fetchProductsFromServer(elem_productsList)) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    loader.removeFrom(elem_productsList);

    const elemButton_verMas = sectionProductos.querySelector(
      ".productos__button--ver-mas"
    );
    elemButton_verMas.addEventListener("click", () => {
      count += SHOW_ITEMS;
      fetchProductsFromServer(elem_productsList);
    });

    const elemButton_verMenos = sectionProductos.querySelector(
      ".productos__button--ver-menos"
    );
    elemButton_verMenos.addEventListener("click", () => {
      if (count >= SHOW_ITEMS) {
        count -= SHOW_ITEMS;
        for (let i = 0; i < SHOW_ITEMS; i++) {
          elem_productsList.lastChild.remove();
        }
      }
    });

    const elemButton_agregarProducto = sectionProductos.querySelector(
      ".productos__button--agregar-producto"
    );
    elemButton_agregarProducto.addEventListener("click", () => {
      location.href = "../pages/agregar-producto.html";
    });
  } catch (err) {
    console.log(err);
  }
})();
