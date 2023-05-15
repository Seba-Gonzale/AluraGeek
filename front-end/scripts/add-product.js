import client_service from "../api/client_service.js";
import loader from "../utils/loader.js";
import { validarImgUrl } from "../utils/validarImgUrl.js";

const form = document.querySelector("[data-addProduct__form]");
const elem_select = form.querySelector(".add-product__categorys");

async function createCategorysList(elem_select) {
  const categorys = await client_service.getServerData("/categorys");
  function newCategory(_new) {
    const itemNew = document.querySelector("[data-new-category]");
    if (_new) {
      itemNew.style.display = "flex";
      itemNew.style.border = "2px solid orange";
    } else if (itemNew.style.display !== "none") {
      itemNew.style.display = "none";
    }
  }

  categorys.unshift({ id: "", name: "Elija una categoría" });
  categorys.push({ id: true, name: "\u{1F528} Crear nueva categoría" });

  categorys.forEach((category) => {
    const elem_option = document.createElement("option");
    elem_option.textContent = category.name;
    elem_option.value = category.id;
    if (category.id === true) {
      elem_option.addEventListener("click", () => newCategory(true));
    } else {
      elem_option.addEventListener("click", () => newCategory(false));
    }
    elem_select.appendChild(elem_option);
  });
}

createCategorysList(elem_select);

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
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const sectionAddProduct = document.querySelector("[data-addProduct]");
  const input_imgUrl = form.querySelector(".add-product__url");
  const imgUrl = input_imgUrl.value;
  const name = form.querySelector(".add-product__name").value;
  const select_category = form.querySelector(".add-product__categorys");
  const price = form.querySelector(".add-product__price").value;
  const description = form.querySelector(".add-product__description").value;

  // inserto un circulo de loading... en sectionAddProduct
  loader.showIn(sectionAddProduct);
  // validamos con validarImgUrl() si el valor de la URL es una imagen valida con una expresion regular
  // si !no es valido, entra en el if, carga el mensaje en el input, remueve el circulo de loading... y sale de la funcion del evento
  if (!validarImgUrl(input_imgUrl.value)) {
    input_imgUrl.setCustomValidity("La URL no es una imagen válida!");
    loader.removeFrom(sectionAddProduct);
    return;
  }

  let categoryId = select_category.value;
  if (categoryId === "true") {
    select_category.setCustomValidity("");
    const categoryName = form.querySelector(
      "[data-input='new-category']"
    ).value;
    categoryId = await client_service.createCategory(categoryName);
  } else if (categoryId === "") {
    select_category.setCustomValidity("Elija una categoría");
    loader.removeFrom(sectionAddProduct);
    return;
  }

  client_service
    .createProduct({ imgUrl, name, categoryId, price, description })
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

// *********************************************

// const buttonAddFile = document.querySelector(".add-product__addFile");
// const imageFile = document.querySelector("[name='file']");
// console.log(imageFile);
// imageFile.addEventListener("change", (event) => {
//   const file = event.target.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       console.log(e.target);
//       const imagePath = e.target.result;
//       // console.log(imagePath);
//       const base64Data = imagePath.split(",")[1];
//       const fileSizeInBytes = window.atob(base64Data).length;
//       const fileSizeInMB = fileSizeInBytes / 1024;

//       // console.log("Tamaño en kilobytes:", fileSizeInMB);
//       form.insertAdjacentHTML("afterend", `<img src=${imagePath} alt="hola"/>`);
//     };

//     reader.readAsDataURL(file);
//   }
// });
