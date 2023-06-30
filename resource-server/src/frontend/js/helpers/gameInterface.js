
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

//TODO: get user token
export async function postGame(token) {
  const response = await fetch('/games', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  const responseJson = await response.json();
  return responseJson;
}

//TODO: replace example data
export async function putMove(id) {
  const response = await fetch(`/games/${id}/move`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        turn: 3,//needed?
        score: 5,
        placedTiles: [
          {
            letter: 'a',
            location: 165,
            playerOne: true//needed?
          }
        ]
    }),
  });

  const responseJson = await response.json();
  return responseJson;
}