
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

export async function getGames(username) {
  return await fetchFromBackend(`/games/${username}`);
}

export async function getGame(id) {
  return await fetchFromBackend(`/games/${id}`);
}

export async function postGame(username) {
  const response = await fetch('/games', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        username
    }),
  });

  const responseJson = await response.json();
  return responseJson;
}

export async function putGame(gameID, turnNumber, scores) {
  const response = await fetch(`/games/${gameID}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        moveCount: turnNumber,
        playerOneScore: scores[0],
        playerTwoScore: scores[1],
    }),
  });

  const responseJson = await response.json();
  return responseJson;
}