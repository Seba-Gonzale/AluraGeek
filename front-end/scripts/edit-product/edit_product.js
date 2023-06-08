import client_service from "../../api/client_service.js";
import loader from "../../utils/loader.js";
import validateImageField from "./validateImageField.js";

const elem_form = document.querySelector("[data-addProduct__form]");
const elem_select = elem_form.querySelector(".add-product__categorys");
// const sectionAddProduct = document.querySelector("[data-addProduct]");
// const file = elem_form.querySelector(".add-product__file").files[0];
const name = elem_form.querySelector(".add-product__name");
const select_category = elem_form.querySelector(".add-product__categorys");
const price = elem_form.querySelector(".add-product__price");
const description = elem_form.querySelector(".add-product__description");
const icon = elem_form.querySelector(".add-product__dragIcon");
const params = new URLSearchParams(location.search);
const id_product = params.get("id");

async function insertData(id) {
  const res = await client_service.getServerData(`/products/${id}`);
  name.value = res.name;
  select_category.value = res.categoryId;
  price.value = res.price;
  description.value = res.description;
  icon.src = res.image;
}

// Creación de lista de categorias a seleccionar en la creacion del nuevo producto
async function createCategorysList(elem_select) {
  const categorys = await client_service.getServerData("/categorys");
  // ƒ(x): Si escoje "crear nueva categoría" se procede a pedir el nombre de la nueva categoria con un <input/>
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

createCategorysList(elem_select);

// Como luego del "POST" en el evento "submit" del formulario la pagina se recarga aunque utilice event.preventDefault()
// usamos la recarga de la pagina para pasar un parametro por URL y utilizarlo para dar un mensaje si el producto se puedo crear o no
if (id_product) {
  insertData(id_product);
}

if (params.has("ok")) {
  elem_form.style.border = "2px solid lightgreen";
  elem_form.innerHTML =
    "<p style='color: green; text-align: center; font-weight: bold'>Producto editado con exito.</p>";
  // const ul = document.querySelector(".add-product__lista");
  // ul.style.display = "none";
} else if (params.has("err")) {
  elem_form.style.border = "2px solid red";
  elem_form.innerHTML +=
    "<p style='color: red; text-align: center; font-weight: bold'>Ocurrio un error!</p>";
}

// Evento "submit" del formulario y la ƒ(x) a ejecutar
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
  // ƒ(x): transforma la imagen en un url de datos (string)
  function transformToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  let image;
  if (!validateImageField()) {
    image = icon.src;
  }

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
    await client_service.editProduct({
      id_product,
      image,
      name,
      categoryId,
      price,
      description,
    });
    loader.removeFrom(sectionAddProduct);
    // Al terminar la creación del producto pasamos por url un "ok", ya que la pagina se recargará sola
    location.href = "../pages/edit-product.html?ok";
    elem_form.reset();
  } catch (err) {
    console.log(err);
    loader.removeFrom(sectionAddProduct);
    // Al terminar la creación del producto pasamos por url un "err", ya que la pagina se recargará sola
    location.href = `../pages/edit-product.html?err&id=${id_product}`;
  }
});
