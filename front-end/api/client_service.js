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

const client_service = { getServerData };
export default client_service;
