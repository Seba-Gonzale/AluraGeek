import client_service from "../services/client_service.js";

(async function showProducts() {
  try {
    // Obtenemos la lista de categorías del servidor
    const categorys = await client_service.getServerData("/categorys");

    categorys.forEach(async (category) => {
      // Traemos la lista de productos de cada catgoría
      const products = await client_service.getServerData(
        `/products?categoryId=${category.id}`
      );
      const elementCategory = createElementCategory(category.name);
      const elementLista = elementCategory.querySelector(".productos__lista");
      products.forEach((_p) => {
        console.log(_p.id);
        const elementItem = createElementItem(_p.image, _p.name, _p.price);
        elementLista.appendChild(elementItem);
      });

      const sectionProductos = document.querySelector("[data-productos]");
      sectionProductos.appendChild(elementCategory);
    });
  } catch (err) {
    console.log(err);
  }
})();

function createElementCategory(p_categoryName) {
  const aux = document.createElement("aux");
  aux.innerHTML = `
    <div class="productos__listar-categoria">
      <div class="productos__box-titulo-button">
        <h3 class="productos__titulo">${p_categoryName}</h3>
        <button class="productos__button-ver" type="button">
          Ver todo<span>&#9;➔</span>
        </button>
      </div>
      <ul class="productos__lista">
      </ul>
    </div>
  `;
  return aux.children[0];
}

function createElementItem(p_imgSrc, p_name, p_price) {
  const aux = document.createElement("aux");
  aux.innerHTML = `
    <li class="productos__items">
      <img
        src=${p_imgSrc}
        alt="${p_name}"
      />
      <p class="productos__nombre">${p_name}</p>
      <p class="productos__precio">$${p_price}</p>
      <a class="productos__detalle" href="#">
        Ver producto
      </a>
    </li>
  `;
  return aux.children[0];
}
