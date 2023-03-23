export async function getProductos(p_id) {
  const response_JSON = await fetch(
    `http://localhost:3000/productos?id=${p_id}`
  );
  const response_JS = await response_JSON.json();
  return response_JS;
}

const client_service = { getProductos };
export default client_service;
