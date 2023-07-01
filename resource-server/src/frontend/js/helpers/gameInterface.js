
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

export async function getGames() {
  return await fetchFromBackend('/games');
}

export async function getGame(id) {//TODO: uncomment fetch, remove sample data
  return {
    id: 0,
    playerID: 1,
    gameState: {
      turn: 18,
      scores: {
        playerOne: 15,
        playerTwo: 28
      },
      racks: {
        playerOne: ['a', 'b', 'c', 'd', '_', 'a', 'z'],
        playerTwo: ['_', 'a', 'a', 'a', 'b', 'c', 'd']
      },
      bag: {
        _: 5,
        a: 0,
        b: 0,
        c: 0,
        d: 7,
        e: 2,
        f: 0,
        g: 8,
        h: 16,
        i: 0,
        j: 0,
        k: 9,
        l: 0,
        m: 0,
        n: 0,
        o: 0,
        p: 13,
        q: 0,
        r: 0,
        s: 0,
        t: 0,
        u: 0,
        v: 0,
        w: 4,
        x: 0,
        y: 18,
        z: 0
      },
      placedTiles: [
        {
          letter: 'a',
          location: 156,
          playerOne: true,
        },
        {
          letter: 'd',
          location: 16,
          playerOne: false,
        },
        {
          letter: '_',
          location: 218,
          playerOne: true,
        },
      ]
    }
  };
  // return await fetchFromBackend(`/games/${id}`);
}

//TODO: get user token?
export async function postGame() {//TODO: uncomment fetch, remove sample data
  // const response = await fetch('/games', {
  //   method: "POST",
  // });

  // const responseJson = await response.json();
  // return responseJson;
  return {
    id: 10,
  }
}

export async function putMove(gameID, playerOneTurn, turnNumber, wordScore, placedTiles) {
  const response = await fetch(`/games/${gameID}/move`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        player: playerOneTurn ? 1 : 0,
        turn: turnNumber,
        score: wordScore,
        placedTiles
    }),
  });

  const responseJson = await response.json();
  return responseJson;
}