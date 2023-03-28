export function createElemCategory(p_categoryName) {
  const aux = document.createElement("aux");
  aux.innerHTML = `
      <div class="productos__listar-categoria">
        <div class="productos__box-titulo-button">
          <h3 class="productos__titulo">${p_categoryName}</h3>
          <button class="productos__button--agregar-producto" type="button">
            Agregar Producto
          </button>
        </div>
        <ul class="productos__lista">
        </ul>
        <button class="productos__button-ver productos__button--ver-mas" type="button">
            Ver mas<span>⌄</span>
        </button>
        <button class="productos__button-ver productos__button--ver-menos" type="button">
            Ver menos<span>🢑</span>
        </button>
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
        </li>
      `;
  return aux.children[0];
}

export function createElemError() {
  const aux = document.createElement("aux");
  const style = "text-align: center; font-weight: bold";
  aux.innerHTML = `
      <p style="${style}">¡no se pudo obtener los datos!</p>
    `;
  return aux.children[0];
}

export function createElemEmpty() {
  const aux = document.createElement("aux");
  const style = "text-align: center; font-weight: bold";
  aux.innerHTML = `
      <p style="${style}">~ no hay datos ~</p>
    `;
  return aux.children[0];
}
