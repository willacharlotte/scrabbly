
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
  return await fetchFromBackend(`/games/${id}`);
}

//TODO: get user token?
export async function postGame() {
  const response = await fetch('/games', {
    method: "POST",
  });

  const responseJson = await response.json();
  return responseJson;
}

export async function putMove(gameID, turnNumber, wordScore, placedTiles) {
  const response = await fetch(`/games/${gameID}/move`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        turn: turnNumber,
        score: wordScore,
        placedTiles
    }),
  });

  const responseJson = await response.json();
  return responseJson;
}