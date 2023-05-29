const nav = document.querySelector(".nav");
const searchBar = document.querySelector(".nav__busqueda");
const inputSearchBar = document.querySelector(".nav__input-busqueda");
console.log(nav);

inputSearchBar.addEventListener("click", (e) => {
  e.stopPropagation();
});
searchBar.addEventListener("click", () => {
  console.log("hola mundo");
});
inputSearchBar.addEventListener("input", (e) => {
  console.log(e.target.value);
  nav.insertAdjacentHTML(
    "beforeend",
    `<div style="position: absolute; top: 80%">Hola Mundo</div>`
  );
});
