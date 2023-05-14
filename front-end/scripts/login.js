import localStorageAvailable from "../utils/localStorageAvailable.js";
import loader from "../utils/loader.js";

function isTheUserLoggedIn() {
  if (localStorageAvailable()) {
    const sectionLogin = document.querySelector("[data-login]");
    const sectionProductos = document.querySelector("[data-productos]");
    const buttonLogIn = document.querySelector(".nav__button-login");
    if (localStorage.loginEmail !== undefined) {
      console.log(buttonLogIn);
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
