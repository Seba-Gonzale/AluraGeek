import client_service from "../api/client_service.js";
import {
  createElemItem,
  createElemCategory,
  createElemError,
  createElemProduct,
} from "../utils/publicHtmlTemplates.js";

(async function showProduct() {
  const url = new URLSearchParams(window.location.search);
  const sectionProduct = document.querySelector("[data-product]");

  async function moreProducts(product, elem_productsList) {
    const moreProducts = await client_service.getServerData(
      `/products?categoryId=${product.categoryId}&id_ne=${product.id}`
    );

    moreProducts.forEach((p) => {
      const elem_item = createElemItem(p.image, p.name, p.price, p.id);
      elem_productsList.appendChild(elem_item);
    });
  }

  try {
    const [product] = await client_service.getServerData(
      `/products?id=${url.get("id")}`
    );
    const [category] = await client_service.getServerData(
      `/categorys?id=${product.categoryId}`
    );

    const elem_product = createElemProduct(product);
    const elem_category = createElemCategory(category.name);
    const elem_productsList = elem_category.querySelector(".productos__lista");
    sectionProduct.appendChild(elem_product);
    sectionProduct.appendChild(elem_category);

    moreProducts(product, elem_productsList);

    elem_productsList.classList.add("productos__lista--ver-todo");

    const buttonVerTodo = elem_category.querySelector(".productos__button-ver");
    buttonVerTodo.style.display = "none";
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      sectionProduct.innerHTML = "";
      sectionProduct.appendChild(createElemError());
    }
  }
})();
