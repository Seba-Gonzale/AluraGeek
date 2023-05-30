import client_service from "../api/client_service.js";

const nav = document.querySelector(".nav");
const searchBar = document.querySelector(".nav__busqueda");
const inputSearchBar = document.querySelector(".nav__input-busqueda");
const table = document.createElement("table");

console.log(nav);
table.style.position = "absolute";
table.style.top = "100%";
table.style.left = "50%";
table.style.backgroundColor = "white";
table.style.width = "50%";
table.style.maxHeight = "50vh";
table.style.overflow = "auto";
table.style.transform = "translate(-50%, 0)";

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
    `/products?name_like=${e.target.value}`
  );
  // console.log(
  //   (table.innerHTML = response
  //     .map(
  //       (res) =>
  //         `<tr>
  //           <td><img style="width: 40px" src="${res.image}" /></td>
  //           <td>${res.name}</td>
  //         </tr>`
  //     )
  //     .join(""))
  // );
  // console.log(table);
  if (response.length !== 0) {
    // table.innerHTML = "";
    table.innerHTML =
      '<tbody style="border-spacing: 16px;">' +
      response
        .map(
          (res) =>
            `<tr>
          <td><img style="width: 40px" src="${res.image}" /></td>
          <td>${res.name}</td>
        </tr>`
        )
        .join("") +
      "</tbody>";
    nav.insertAdjacentElement("beforeend", table);
  }
});
inputSearchBar.addEventListener("blur", (e) => {
  table.style.display = "none";
});
