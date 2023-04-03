import client_service from "../api/client_service.js";
import {
  createElemItem,
  createElemCategory,
  createElemError,
  createElemProduct,
} from "../util/publicHtmlTemplates.js";
import loader from "../util/loader.js";

// TODO: terminar el boton "ver mas"

(async function showProduct() {
  const url = new URLSearchParams(window.location.search);
  const sectionProduct = document.querySelector("[data-product]");

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

    const moreProducts = await client_service.getServerData(
      `/products?categoryId=${product.categoryId}&id_ne=${product.id}&_limit=6`
    );

    moreProducts.forEach((p) => {
      const elem_item = createElemItem(p.image, p.name, p.price, p.id);
      elem_productsList.appendChild(elem_item);
    });

    const buttonVerTodo = elem_category.querySelector(".productos__button-ver");
    buttonVerTodo.addEventListener("click", (event) => {
      elem_productsList.classList.toggle("productos__lista--ver-todo");
    });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      sectionProduct.innerHTML = "";
      sectionProduct.appendChild(createElemError());
    }
  }
})();
