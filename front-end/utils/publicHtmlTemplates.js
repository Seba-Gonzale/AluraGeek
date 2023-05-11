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

export function createElemItem(p_imgSrc, p_name, p_price, p_id) {
  const aux = document.createElement("aux");
  aux.innerHTML = `
      <li id="${p_id}" class="productos__items">
        <img
          src=${p_imgSrc}
          alt="${p_name}"
        />
        <p class="productos__nombre">${p_name}</p>
        <p class="productos__precio">$${p_price}</p>
        <a class="productos__detalle" href="./pages/product-details.html?id=${p_id}">
          Ver producto
        </a>
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
      <p style="${style}">~no hay datos~</p>
    `;
  return aux.children[0];
}

export function createElemProduct(p_product) {
  const aux = document.createElement("aux");
  const style = "text-align: center; font-weight: bold";
  aux.innerHTML = `
        <figure id="${
          p_product.id
        }" class="product__item product__item--main-product">
          <img class="product__img" src="${p_product.image}" alt="${
    p_product.name
  }" />
          <figcaption class="product__legend">
            <h3 class="product__title">${p_product.name}</h3>
            <div class="product__price">$${p_product.price}</div>
            <p class="product__paragraph">${
              p_product.description ?? "sin descripción"
            }</p>
          </figcaption>
        </figure>
        `;
  return aux.children[0];
}
