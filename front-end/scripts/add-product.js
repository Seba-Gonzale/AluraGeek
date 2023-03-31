import client_service from "../api/client_service.js";
import loader from "../util/loader.js";
import { validarImgUrl } from "../util/validarImgUrl.js";

const form = document.querySelector("[data-addProduct__form]");

// Como luego del "POST" en el evento "submit" del formulario la pagina se recarga aunque utilice event.preventDefault()
// usamos la recarga de la pagina para pasar un parametro por URL y utilizarlo para dar un mensaje si el producto se puedo crear o no
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

// Insertamos el evento "submit" al formulario y la respectiva función a ejecutar
form.addEventListener("submit", (event) => {
  // prevenimos el envío de formulario y lo trabajamos nosotros
  event.preventDefault();

  const sectionAddProduct = document.querySelector("[data-addProduct]");
  // inserto un circulo de loading... en sectionAddProduct
  loader.showIn(sectionAddProduct);

  const input_imgUrl = form.querySelector(".add-product__url");
  // validamos con validarImgUrl() si el valor de la URL es una imagen valida con una expresion regular
  // si !no es valido, entra en el if, carga el mensaje en el input, remueve el circulo de loading... y sale de la funcion del evento
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
      // Al terminar la creación del producto pasamos por url un "ok", ya que la pagina se recargará sola
      location.href = "../pages/add-product.html?ok";
      form.reset();
    })
    .catch((err) => {
      console.log(err);
      loader.removeFrom(sectionAddProduct);
      // Al terminar la creación del producto pasamos por url un "err", ya que la pagina se recargará sola
      location.href = "../pages/add-product.html?err";
    });
});
