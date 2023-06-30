
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

//TODO: update to send current user's username (endpoint should also be updated to only accept one user)
export async function postGame() {
  const response = await fetch('/games', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
      [
        {"username":"name","games":[]},
        {"username":"another","games":[]}
      ]),
  });

  const responseJson = await response.json();
  return responseJson;
}

//TODO: send correct move info
export async function putMove(id) {
  const response = await fetch(`/games/${id}/move`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        "playerNumber": 1,
        "turn": 1,
        "word": "(W)ORD",
        "firstLetterPosition": {
            "row": 8,
            "col": "B"
        },
        "direction": "DOWN",
        "score": 4,
        "cumulativeScore": 5
    }),
  });

  const responseJson = await response.json();
  return responseJson;
}