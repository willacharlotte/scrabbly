import { getGames } from "./helpers/gameInterface.js";

//DOM elements
const gamesList = document.querySelector('.games-list');
const newGameButton = document.getElementById('new-game-button');

//event listeners
newGameButton.addEventListener('click', () => {
  window.location = '/game/';
});

const loadGame = (gameID) => {
  window.location = `/game/?id=${gameID}`;
};


// const GAMES = await getGames();//TODO: uncomment fetch, remove sample data
const GAMES = [
  {
    id: 0,
    playerID: 1,
    gameState: {
      turn: 18,
      scores: {
        playerOne: 15,
        playerTwo: 28
      },
      racks: {
        playerOne: ['a', 'b', 'c', 'd', '_', '', ''],
        playerTwo: ['_', '', '', 'a', 'b', 'c', 'd']
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
  },
];

for (const index in GAMES) {
  const gameItem = document.createElement('li');
  const gameDescription = document.createElement('p');
  const gameButton = document.createElement('button');
  gameButton.innerText = `Game ${Number(index) + 1}`;
  gameDescription.innerText = `${GAMES[index].gameState.turn} moves played`;
  gameItem.addEventListener('click', () => loadGame(GAMES[index].id));

  gameItem.appendChild(gameButton);
  gameItem.appendChild(gameDescription);
  gamesList.appendChild(gameItem);
}