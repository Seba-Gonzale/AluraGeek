import client_service from "../services/client_service.js";

(async function showProducts() {
  const response_Array = await client_service.getProductos(0);
})();

function htmlItemProduct(p_imgSrc, p_titulo, p_nombre, p_precio) {
  return ` 
    <div class="productos__listar-categoria">
      <div class="productos__box-titulo-button">
        <h3 class="productos__titulo">${p_titulo}</h3>
        <button class="productos__button-ver" type="button">
          Ver todo<span>&#9;➔</span>
        </button>
      </div>
      <ul class="productos__lista">
        <li class="productos__items">
          <img
            src=${p_imgSrc}
            alt="vaso de stormtroopers"
          />
          <p class="productos__nombre">${p_nombre}</p>
          <p class="productos__precio">$${p_precio}</p>
          <a class="productos__detalle" href="">
            Ver producto
          </a>
        </li>
      </ul>
    </div>
  `;
}
