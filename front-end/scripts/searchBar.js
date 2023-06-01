import client_service from "../api/client_service.js";

const nav = document.querySelector(".nav");
const searchBar = document.querySelector(".nav__busqueda");
const inputSearchBar = document.querySelector(".nav__input-busqueda");

const table = document.createElement("table");
const tbody = document.createElement("tbody");

function blur() {
  table.style.display = "none";
}

table.appendChild(tbody);
table.classList.add("lookup-table");
nav.insertAdjacentElement("beforeend", table);

searchBar.addEventListener("click", () => {
  console.log("hola mundo");
});

inputSearchBar.addEventListener("click", (e) => {
  e.stopPropagation();
});

inputSearchBar.addEventListener("focus", (e) => {
  table.style.display = "block";
});

inputSearchBar.addEventListener("input", async (e) => {
  const response = await client_service.getServerData(
    `/products?name_like=${e.target.value}&_sort=name&_order=asc`
  );
  if (response.length !== 0) {
    tbody.innerHTML = "";
    response
      .map((res) => {
        const tr = document.createElement("tr");
        tr.classList.add("lookup-table__item");
        tr.innerHTML = `<tr>
            <td><img src="${res.image}" /></td>
            <td>${res.name}</td>
          </tr>`;
        tr.addEventListener("click", (e) => {
          location.href = `./pages/product-details.html?id=${res.id}`;
        });
        tbody.appendChild(tr);
      })
      .join("");
  } else {
    tbody.innerHTML = `<tr style="display: block; padding: 1rem; font-weight: 700; border-bottom: 3px solid red">
            <td style="display:block; text-align: center">Producto no encontrado!</td>
          </tr>`;
  }
});

table.addEventListener("mouseenter", (e) => {
  inputSearchBar.removeEventListener("blur", blur);
});
table.addEventListener("mouseleave", (e) => {
  inputSearchBar.focus();
  inputSearchBar.addEventListener("blur", blur);
});
