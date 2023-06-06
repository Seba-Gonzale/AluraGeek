import client_service from "../../api/client_service.js";

function addDeleteAndEdit(item) {
  const imgDelete = document.createElement("img");
  const imgEdit = document.createElement("img");

  imgEdit.src = "../public/edit.png";
  imgEdit.classList.add("js__productos__items__edit");
  item.appendChild(imgEdit);

  imgDelete.src = "../public/garbage.png";
  imgDelete.classList.add("js__productos__items__delete");
  item.appendChild(imgDelete);

  imgDelete.addEventListener("click", (e) => {
    if (confirm("Eliminar producto?")) {
      client_service.removeProduct(item.id);
    }
  });
  imgEdit.addEventListener("click", (e) => {
    location.href = `${location.origin}/front-end/pages/edit-product.html?id=${item.id}`;
  });
}

export default addDeleteAndEdit;
