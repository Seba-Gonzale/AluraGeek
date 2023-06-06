import { validarImagen } from "../../utils/validaciones.js";

const elem_form = document.querySelector("[data-addProduct__form]");
const elem_inputFile = elem_form.querySelector(".add-product__file");
const elem_fieldFile = elem_form.querySelector(".add-product__item--file");

export default function validateImageField(submit) {
  const elem_fileLabel = elem_form.querySelector(".add-product__label--file");
  const elem_fileIcon = elem_form.querySelector(".add-product__dragIcon");
  elem_fileIcon.classList.add("add-product__dragIcon--withFile");
  console.log(elem_inputFile.validity.customError);
  if (!elem_inputFile.validity.customError) {
  }

  if (elem_inputFile.files[0]) {
    if (validarImagen(elem_inputFile.files[0].name)) {
      elem_fieldFile.style.backgroundColor = "#ebfaff";
      if (
        !elem_fileIcon.classList.contains("add-product__dragIcon--withFile")
      ) {
        elem_fileIcon.classList.add("add-product__dragIcon--withFile");
      }
      elem_fileLabel.textContent = `${elem_inputFile.files[0].name}`;
      elem_fileLabel.style.color = "var(--mainColor)";
      elem_inputFile.setCustomValidity();
      return true;
    } else {
      elem_fieldFile.style.backgroundColor = "#ffebeb";
      if (elem_fileIcon.classList.contains("add-product__dragIcon--withFile")) {
        elem_fileIcon.classList.remove("add-product__dragIcon--withFile");
      }
      elem_fileLabel.textContent = `Imagen no valida! intenta de nuevo`;
      elem_fileLabel.style.color = "red";
      elem_inputFile.setCustomValidity("Imagen no valida! intenta de nuevo");
    }
  } else {
    if (submit) {
      elem_fieldFile.style.backgroundColor = "#ffebeb";
      if (elem_fileIcon.classList.contains("add-product__dragIcon--withFile")) {
        elem_fileIcon.classList.remove("add-product__dragIcon--withFile");
      }
      elem_fileLabel.textContent = `Escoje una imagen`;
      elem_fileLabel.style.color = "red";
      elem_inputFile.setCustomValidity("Escoje una imagen");
    }
  }
  return false;
}

elem_fieldFile.addEventListener("dragenter", (e) => {
  e.preventDefault();
  e.stopPropagation();
  elem_fieldFile.style["background-color"] = "lightgray";
});
elem_fieldFile.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});
elem_fieldFile.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  elem_fieldFile.style["background-color"] = "";
  elem_inputFile.files = e.dataTransfer.files;
  validateImageField();
});
elem_fieldFile.addEventListener("click", (e) => {
  elem_inputFile.click();
  elem_inputFile.addEventListener("change", (e) => {
    validateImageField();
  });
});
