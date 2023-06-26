
async function fetchFromBackend(route) {
  const response = await fetch(route);
  const responseJson = await response.json();
  return responseJson;
};

export async function getTiles() {
  return await fetchFromBackend('/tiles');
}

export async function getSquares() {
  return await fetchFromBackend('/squares');
}

export async function getGame(id) {
  console.log(`/games/${id}`);
  return await fetchFromBackend(`/games/${id}`);
}