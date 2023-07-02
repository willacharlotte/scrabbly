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

for (const index in GAMES) {
  const gameItem = document.createElement('li');
  const gameTitle = document.createElement('p');
  const playerOneScore = document.createElement('p');
  const playerTwoScore = document.createElement('p');
  gameTitle.innerText = `Game ${Number(index) + 1} - ${GAMES[index].move_count} moves played`;
  playerOneScore.innerText = `Player 1: ${GAMES[index].player_one_score} points`;
  playerTwoScore.innerText = `Player 2: ${GAMES[index].player_two_score} points`;

  gameItem.appendChild(gameTitle);
  gameItem.appendChild(playerOneScore);
  gameItem.appendChild(playerTwoScore);
  gamesList.appendChild(gameItem);
}