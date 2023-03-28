import client_service from "../api/client_service.js";
import loader from "../util/loader.js";
import {
  createElemItem,
  createElemCategory,
  createElemError,
  createElemEmpty,
} from "../util/adminHtmlTemplates.js";

const SHOW_ITEMS = 12;

async function fetchProductsFromServer(p_elem_productsList) {
  console.log(p_elem_productsList.children.length);
  console.log(p_elem_productsList.children);
  // const products = await client_service.getServerData(
  //   `/products?_start=${
  //     p_elem_productsList.children.length - 1
  //   }&_limit=${SHOW_ITEMS}`
  // );

  // products.forEach((p) => {
  //   const elem_item = createElemItem(p.image, p.name, p.price);
  //   p_elem_productsList.appendChild(elem_item);
  // });
}

(async function showAllProducts() {
  const sectionProductos = document.querySelector("[data-productos]");
  // Creamos una categoria llamada 'All' para insertar ahí los items
  const elem_category = createElemCategory("All");
  sectionProductos.appendChild(elem_category);

  const elem_productsList = elem_category.querySelector(".productos__lista");
  loader.showIn(elem_productsList);

  try {
    await fetchProductsFromServer(elem_productsList);

    loader.removeFrom(elem_productsList);

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
      if (elem_productsList.children.length >= SHOW_ITEMS) {
        // console.log(elem_productsList.children.length);
        for (
          let i = 0;
          i < elem_productsList.children.length - SHOW_ITEMS;
          i++
        ) {
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
    if (err instanceof TypeError) {
      sectionProductos.innerHTML = "";
      sectionProductos.appendChild(createElemError());
    } else {
      sectionProductos.innerHTML = "";
      sectionProductos.appendChild(createElemEmpty());
    }
  }
})();
