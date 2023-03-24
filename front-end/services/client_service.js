const serverDomain = `http://localhost:3000`;

async function getServerData(parameter) {
  const response_JSON = await fetch(`${serverDomain}${parameter}`);
  const response_JS = await response_JSON.json();
  return response_JS;
}

const client_service = { getServerData };
export default client_service;
