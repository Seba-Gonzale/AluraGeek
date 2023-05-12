import localStorageAvailable from "../utils/localStorageAvailable.js";
import loader from "../utils/loader.js";

function isTheUserLoggedIn() {
  if (localStorageAvailable()) {
    const sectionLogin = document.querySelector("[data-login]");
    const sectionProductos = document.querySelector("[data-productos]");
    if (localStorage.loginEmail !== undefined) {
      sectionProductos.style.display = "block";
      sectionLogin.style.display = "";
    } else {
      sectionLogin.style.display = "block";
      sectionProductos.style.display = "";
    }
  }
}

const sectionLogin = document.querySelector("[data-login]");
const buttonSubmit = document.querySelector("[data-login__buttonSubmit]");

isTheUserLoggedIn();
buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  loader.showIn(sectionLogin);

  const inputEmail = document.querySelector("[data-login='email']");
  const inputPassword = document.querySelector("[data-login='password']");
  localStorage.setItem("loginEmail", inputEmail);
  localStorage.setItem("loginPassword", inputPassword);
  isTheUserLoggedIn();
  loader.removeFrom(sectionLogin);
});
