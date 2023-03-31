import client_service from "../api/client_service.js";
import loader from "../util/loader.js";

const form = document.querySelector("[data-addProduct__form]");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const sectionAddProduct = document.querySelector("[data-addProduct]");
  loader.showIn(sectionAddProduct);

  const imgUrl = form.querySelector(".add-product__url").value;
  const name = form.querySelector(".add-product__name").value;
  const price = form.querySelector(".add-product__price").value;
  const description = form.querySelector(".add-product__description").value;

  client_service
    .createProduct(imgUrl, name, price, description)
    .then((res) => {
      loader.removeFrom(sectionAddProduct);
      form.style.border = "2px solid lightgreen";
      form.innerHTML +=
        "<p style='color: green; text-align: center; font-weight: bold'>Producto creado con exito!</p>";
    })
    .catch((err) => {
      console.log(err);
      loader.removeFrom(sectionAddProduct);
      form.style.border = "2px solid red";
      form.innerHTML +=
        "<p style='color: red; text-align: center; font-weight: bold'>No se pudo crear el producto!</p>";
    });
});
