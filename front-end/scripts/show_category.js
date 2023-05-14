import client_service from "../api/client_service.js";
import {
  createElemItem,
  createElemCategory,
  createElemError,
} from "../utils/publicHtmlTemplates.js";
import loader from "../utils/loader.js";

const params = new URLSearchParams(location.search);

async function showProductsFromACategory() {
  const sectionProductos = document.querySelector("[data-productos]");
  loader.showIn(sectionProductos);

  try {
    // Obtenemos la lista de categorías del servidor
    const category = (
      await client_service.getServerData(
        `/categorys?id=${params.get("categoryId")}`
      )
    )[0];
    loader.removeFrom(sectionProductos);

    const elem_category = createElemCategory(category.name);
    const elem_productsList = elem_category.querySelector(".productos__lista");
    sectionProductos.appendChild(elem_category);

    loader.showIn(elem_productsList);

    const products = await client_service.getServerData(
      `/products?categoryId=${category.id}`
    );

    products.forEach((p) => {
      const elem_item = createElemItem(p.image, p.name, p.price, p.id);
      elem_productsList.appendChild(elem_item);
    });

    loader.removeFrom(elem_productsList);
    // Añadimos element_category al elemento del DOM data-products
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      sectionProductos.innerHTML = "";
      sectionProductos.appendChild(createElemError());
    }
  }
}

showProductsFromACategory();
