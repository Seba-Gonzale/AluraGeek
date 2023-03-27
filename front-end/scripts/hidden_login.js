const sectionLogin = document.querySelector("[data-login]");
const buttonSubmit = document.querySelector("[data-login__buttonSubmit]");
const loader = document.querySelector(".loader");

buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  loader.classList.toggle("loader-visible");
});
