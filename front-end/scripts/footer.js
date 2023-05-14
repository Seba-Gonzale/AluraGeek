const form = document.querySelector("[data-footer='AluraGeek']");
const buttonSubmit = form.querySelector(".footer-AluraGeek__button--submit");

form.addEventListener("submit", (e) => e.preventDefault());
buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const inputName = form.querySelector("[data-input--name]");
  const textareaMessage = form.querySelector("[data-textarea--message]");
  function validacion(elem) {
    if (elem.value.trim() === "") {
      elem.setCustomValidity("El campo no debe estar vacío!");
      elem.reportValidity();
    } else {
      elem.setCustomValidity("");
    }
  }

  validacion(inputName);
  validacion(textareaMessage);
});
