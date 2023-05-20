import client_service from "../../api/client_service.js";
import loader from "../../utils/loader.js";
import { validarImgUrl, validarEmail } from "../../utils/validaciones.js";
import searchImageField from "./searchImageField.js";

const elem_form = document.querySelector("[data-addProduct__form]");
const elem_select = elem_form.querySelector(".add-product__categorys");

async function createCategorysList(elem_select) {
  const categorys = await client_service.getServerData("/categorys");

  function newCategory(_new) {
    const newField = document.querySelector("[data-new-category]");
    if (_new) {
      newField.style.display = "flex";
      newField.style.border = "2px solid orange";
    } else if (newField.style.display !== "none") {
      newField.style.display = "none";
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

// Insertamos el evento "submit" al formulario y la respectiva función a ejecutar
elem_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const sectionAddProduct = document.querySelector("[data-addProduct]");
  const file = elem_form.querySelector(".add-product__file").files[0];
  const name = elem_form.querySelector(".add-product__name").value;
  const select_category = elem_form.querySelector(".add-product__categorys");
  const price = elem_form.querySelector(".add-product__price").value;
  const description = elem_form.querySelector(
    ".add-product__description"
  ).value;

  // inserto un circulo de loading... en sectionAddProduct
  loader.showIn(sectionAddProduct);

  function transformToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  const image = await transformToDataUrl(file);

  let categoryId = select_category.value;
  if (categoryId === "true") {
    select_category.setCustomValidity("");
    const categoryName = elem_form.querySelector(
      "[data-input='new-category']"
    ).value;
    categoryId = await client_service.createCategory(categoryName);
  } else if (categoryId === "") {
    select_category.setCustomValidity("Elija una categoría");
    loader.removeFrom(sectionAddProduct);
    return;
  }

  try {
    await client_service.createProduct({
      image,
      name,
      categoryId,
      price,
      description,
    });
    loader.removeFrom(sectionAddProduct);
    // Al terminar la creación del producto pasamos por url un "ok", ya que la pagina se recargará sola
    location.href = "../pages/add-product.html?ok";
    elem_form.reset();
  } catch (err) {
    console.log(err);
    loader.removeFrom(sectionAddProduct);
    // Al terminar la creación del producto pasamos por url un "err", ya que la pagina se recargará sola
    location.href = "../pages/add-product.html?err";
  }
});

searchImageField(elem_form);
createCategorysList(elem_select);

// Como luego del "POST" en el evento "submit" del formulario la pagina se recarga aunque utilice event.preventDefault()
// usamos la recarga de la pagina para pasar un parametro por URL y utilizarlo para dar un mensaje si el producto se puedo crear o no
const params = new URLSearchParams(location.search);
if (params.has("ok")) {
  elem_form.style.border = "2px solid lightgreen";
  elem_form.innerHTML +=
    "<p style='color: green; text-align: center; font-weight: bold'>Producto creado con exito!</p>";
} else if (params.has("err")) {
  elem_form.style.border = "2px solid red";
  elem_form.innerHTML +=
    "<p style='color: red; text-align: center; font-weight: bold'>No se pudo crear el producto!</p>";
}

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
//       elem_form.insertAdjacentHTML("afterend", `<img src=${imagePath} alt="hola"/>`);
//     };

//     reader.readAsDataURL(file);
//   }
// });
