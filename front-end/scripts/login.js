import localStorageAvailable from "../utils/localStorageAvailable.js";
import loader from "../utils/loader.js";
import { validarEmail } from "../utils/validaciones.js";

const sectionLogin = document.querySelector("[data-login]");
const formLogin = sectionLogin.querySelector(".login__form");
const divLoginError = sectionLogin.querySelector(".login__form__loginError");
const buttonSubmit = sectionLogin.querySelector("[data-login__buttonSubmit]");
const spanVerPass = sectionLogin.querySelector(".login__password--ver");

function isTheUserLoggedIn() {
  if (localStorageAvailable()) {
    const sectionLogin = document.querySelector("[data-login]");
    const sectionProductos = document.querySelector("[data-productos]");
    const buttonLogIn = document.querySelector(".nav__button-login");
    if (localStorage.loginEmail !== undefined) {
      buttonLogIn.textContent = "Log out";
      buttonLogIn.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
      });
      sectionProductos.classList.toggle("displayNone");
      sectionLogin.classList.toggle("displayNone");
    }
    // else {
    //   sectionLogin.style.display = "block";
    //   sectionProductos.style.display = "";
    // }
  }
}

isTheUserLoggedIn();

spanVerPass.addEventListener("click", (e) => {
  const inputPass = sectionLogin.querySelector("[data-login='password']");
  if (inputPass.type === "password") {
    inputPass.type = "text";
    spanVerPass.classList.toggle("login__password--ocultar");
  } else {
    inputPass.type = "password";
    spanVerPass.classList.toggle("login__password--ocultar");
  }
});

formLogin.addEventListener("submit", (e) => e.preventDefault());
buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  loader.showIn(sectionLogin);

  const inputEmail = document.querySelector("[data-login='email']");
  const inputPassword = document.querySelector("[data-login='password']");

  if (!validarEmail(inputEmail.value.trim())) {
    inputEmail.setCustomValidity("Ingrese un email valido.");
    inputEmail.reportValidity();
    loader.removeFrom(sectionLogin);
    return;
  } else {
    inputEmail.setCustomValidity("");
  }

  if (inputPassword.value.trim() === "") {
    inputPassword.setCustomValidity("El campo no debe estar vacío.");
    inputPassword.reportValidity();
    loader.removeFrom(sectionLogin);
    return;
  } else {
    inputPassword.setCustomValidity("");
  }

  if (
    inputEmail.value.trim() === "admin@admin.com" &&
    inputPassword.value.trim() === "admin"
  ) {
    localStorage.setItem("loginEmail", inputEmail);
    localStorage.setItem("loginPassword", inputPassword);
    divLoginError.style.display = "";
    isTheUserLoggedIn();
  } else {
    sectionLogin.style["background-color"] = "pink";
    sectionLogin.style.border = "1px solid red";
    divLoginError.style.display = "block";
  }
  loader.removeFrom(sectionLogin);
});
