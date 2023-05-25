import client_service from "../api/client_service.js";
import {
  createElemItem,
  createElemCategory,
  createElemError,
} from "../utils/publicHtmlTemplates.js";
import loader from "../utils/loader.js";

(async function showAllProductsForCategory() {
  const sectionProductos = document.querySelector("[data-productos]");
  loader.showIn(sectionProductos);

  try {
    // Obtenemos la lista de categorías del servidor
    const categorys = await client_service.getServerData("/categorys");
    loader.removeFrom(sectionProductos);

    categorys.forEach(async (category) => {
      // Traemos la lista de productos de cada categoría
      const products = await client_service.getServerData(
        `/products?categoryId=${category.id}`
      );

      if (products.length !== 0) {
        const elem_category = createElemCategory(category.name);
        const elem_productsList =
          elem_category.querySelector(".productos__lista");
        sectionProductos.appendChild(elem_category);

        loader.showIn(elem_productsList);

        products.forEach((p) => {
          const elem_item = createElemItem(p.image, p.name, p.price, p.id);
          elem_productsList.appendChild(elem_item);
        });

        loader.removeFrom(elem_productsList);

        const button_verTodo = elem_category.querySelector(
          "[data-button='ver-todo']"
        );
        button_verTodo.addEventListener("click", () => {
          location.href = `/front-end/pages/category.html?categoryId=${category.id}`;
        });
      }
    });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      sectionProductos.innerHTML = "";
      sectionProductos.appendChild(createElemError());
    }
  }
})();
