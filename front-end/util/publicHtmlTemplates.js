export function createElemCategory(p_categoryName) {
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

export function createElemItem(p_imgSrc, p_name, p_price) {
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
