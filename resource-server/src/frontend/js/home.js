
//DOM elements
const gamesList = document.querySelector('.games-list');
const newGameButton = document.getElementById('new-game-button');
const loadGameButton = document.getElementById('load-game-button');

//event listeners
newGameButton.addEventListener('click', () => {
  window.location = '/game/';
});

const loadGame = (gameID) => {
  window.location = `/game/?id=${gameID}`;
};

const GAMES = [1,2,3,4];//TODO: get from BE

for (const index in GAMES) {
  const gameItem = document.createElement('li');
  const gameDescription = document.createElement('p');
  const gameButton = document.createElement('button');
  gameButton.innerText = `Game ${Number(index) + 1}`;
  gameDescription.innerText = `0 moves played`;//TODO: replace move number
  gameItem.addEventListener('click', () => loadGame(index));//TODO: use gameID not index

  gameItem.appendChild(gameButton);
  gameItem.appendChild(gameDescription);
  gamesList.appendChild(gameItem);
}