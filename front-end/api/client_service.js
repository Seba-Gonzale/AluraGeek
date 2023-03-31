const serverDomain = `http://localhost:3000`;

async function getServerData(query) {
  const res_JSON = await fetch(`${serverDomain}${query}`);

  if (res_JSON.status < 400) {
    const res_JS = await res_JSON.json();
    return res_JS;
  } else {
    throw new Error(`\nstatus: ${res_JSON.status}\n error getting data`);
  }
}

async function createProduct(p_imgUrl, p_name, p_price, p_description) {
  const res_JSON = await fetch(`${serverDomain}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: uuid.v4(),
      image: p_imgUrl,
      name: p_name,
      price: p_price,
      description: p_description,
    }),
  });

  if (res_JSON.status < 400) {
    const res_JS = await res_JSON.json();
    return res_JSON;
  } else {
    throw new Error(`\nstatus: ${res_JSON.status}\n could not post the data`);
  }
}

const client_service = { getServerData, createProduct };
export default client_service;
