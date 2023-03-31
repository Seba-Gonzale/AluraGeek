import client_service from "../api/client_service.js";
import loader from "../util/loader.js";
import { validarImgUrl } from "../util/validarImgUrl.js";

const form = document.querySelector("[data-addProduct__form]");

const params = new URLSearchParams(location.search);
if (params.has("ok")) {
  form.style.border = "2px solid lightgreen";
  form.innerHTML +=
    "<p style='color: green; text-align: center; font-weight: bold'>Producto creado con exito!</p>";
} else if (params.has("err")) {
  form.style.border = "2px solid red";
  form.innerHTML +=
    "<p style='color: red; text-align: center; font-weight: bold'>No se pudo crear el producto!</p>";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const sectionAddProduct = document.querySelector("[data-addProduct]");
  loader.showIn(sectionAddProduct);

  const input_imgUrl = form.querySelector(".add-product__url");
  if (!validarImgUrl(input_imgUrl.value)) {
    input_imgUrl.setCustomValidity("La URL no es una imagen válida!");
    loader.removeFrom(sectionAddProduct);
    return;
  }
  const imgUrl = input_imgUrl.value;
  const name = form.querySelector(".add-product__name").value;
  const price = form.querySelector(".add-product__price").value;
  const description = form.querySelector(".add-product__description").value;

  client_service
    .createProduct(imgUrl, name, price, description)
    .then(async (res) => {
      loader.removeFrom(sectionAddProduct);
      location.href = "../pages/add-product.html?ok";
      form.reset();
    })
    .catch((err) => {
      console.log(err);
      loader.removeFrom(sectionAddProduct);
      location.href = "../pages/add-product.html?err";
    });
});
