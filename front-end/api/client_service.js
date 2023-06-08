const serverDomain = `http://192.168.1.23:3000`;
export const bugNames = { ErrorPostCategory: "ErrorPostCategory" };

async function getServerData(query) {
  const res_JSON = await fetch(`${serverDomain}${query}`);

  if (res_JSON.status < 400) {
    const res_JS = await res_JSON.json();
    return res_JS;
  } else {
    throw new Error(`\nstatus: ${res_JSON.status}\n error getting data`);
  }
}

async function createProduct(props) {
  const { image, name, categoryId, price, description } = props;

  const res_JSON = await fetch(`${serverDomain}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: uuid.v4(),
      image: image,
      name: name,
      price: price,
      categoryId: categoryId,
      description: description,
    }),
  });

  if (res_JSON.status < 400) {
    const res_JS = await res_JSON.json();
    return res_JS;
  } else {
    throw new Error(`\nstatus: ${res_JSON.status}\n could not post the data`);
  }
}

async function editProduct(props) {
  const { id_product, image, name, categoryId, price, description } = props;
  const res_JSON = await fetch(`${serverDomain}/products/${id_product}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: image,
      name: name,
      price: price,
      categoryId: categoryId,
      description: description,
    }),
  });
}

async function removeProduct(id) {
  const res_JSON = await fetch(`${serverDomain}/products/${id}`, {
    method: "DELETE",
  });
}

async function createCategory(categoryName) {
  const categorys = await getServerData("/categorys");
  const repeatedName = categorys.find((elem) => elem.name === categoryName);
  if (repeatedName === undefined) {
    const res_JSON = await fetch(`${serverDomain}/categorys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: categorys.length,
        name: categoryName,
      }),
    });

    if (res_JSON.status < 400) {
      const res_JS = await res_JSON.json();
      return categorys.length;
    } else {
      throw new Error(`\nstatus: ${res_JSON.status}\n could not post the data`);
    }
  } else {
    throw new Error(`Category already exists!`, bugNames.ErrorPostCategory);
  }
}

const client_service = {
  getServerData,
  createProduct,
  editProduct,
  removeProduct,
  createCategory,
};
export default client_service;
