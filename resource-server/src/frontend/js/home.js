import { getGames } from "./helpers/gameInterface.js";

//DOM elements
const gamesList = document.querySelector('.games-list');
const newGameButton = document.getElementById('new-game-button');

//event listeners
newGameButton.addEventListener('click', () => {
  window.location = '/game/';
});

const username = window.sessionStorage.username;
const GAMES = await getGames(username);
// const GAMES = [
//   {
//     id: 0,
//     playerOneScore: 10,
//     playerTwoScore: 25,
//     moveCount: 12,
//   },
//   {
//     id: 1 ,
//     playerOneScore: 10,
//     playerTwoScore: 25,
//     moveCount: 12,
//   }
// ];

for (const index in GAMES) {
  const gameItem = document.createElement('li');
  const gameTitle = document.createElement('p');
  const playerOneScore = document.createElement('p');
  const playerTwoScore = document.createElement('p');
  gameTitle.innerText = `Game ${Number(index) + 1} - ${GAMES[index].moveCount} moves played`;
  playerOneScore.innerText = `Player 1: ${GAMES[index].playerOneScore} points`;
  playerTwoScore.innerText = `Player 2: ${GAMES[index].playerTwoScore} points`;

  gameItem.appendChild(gameTitle);
  gameItem.appendChild(playerOneScore);
  gameItem.appendChild(playerTwoScore);
  gamesList.appendChild(gameItem);
}