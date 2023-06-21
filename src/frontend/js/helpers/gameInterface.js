
async function callBackend(route) {
  const response = await fetch(route);
  const responseJson = await response.json();
  return responseJson;
};

export async function getTiles() {
  return await callBackend('/tiles');
}

export async function getSquares() {
  return await callBackend('/squares');
}