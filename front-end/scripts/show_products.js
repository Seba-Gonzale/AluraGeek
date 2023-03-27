import client_service from "../api/client_service.js";
import {
  createElemItem,
  createElemCategory,
} from "../util/publicHtmlTemplates.js";
import loader from "../util/loader.js";

(async function showAllProductsForCategory() {
  const sectionProductos = document.querySelector("[data-productos]");
  loader.showIn(sectionProductos);

  try {
    // Obtenemos la lista de categorías del servidor
    const categorys = await client_service.getServerData("/categorys");
    loader.removeFrom(sectionProductos);

    categorys.forEach(async (category) => {
      // Traemos la lista de productos de cada categoría
      const elem_category = createElemCategory(category.name);
      const elem_productsList =
        elem_category.querySelector(".productos__lista");
      sectionProductos.appendChild(elem_category);

      loader.showIn(elem_productsList);

      const products = await client_service.getServerData(
        `/products?categoryId=${category.id}`
      );

      products.forEach((p) => {
        const elem_item = createElemItem(p.image, p.name, p.price);
        elem_productsList.appendChild(elem_item);
      });

      loader.removeFrom(elem_productsList);
      // Añadimos element_category al elemento del DOM data-products
    });
  } catch (err) {
    console.log(err);
  }
})();
