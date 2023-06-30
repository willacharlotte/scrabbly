
//DOM elements
const newGameButton = document.getElementById('new-game-button');
const loadGameButton = document.getElementById('load-game-button');

//event listeners
newGameButton.addEventListener('click', () => {
  window.location = '/game/';
});

loadGameButton.addEventListener('click', () => {
  window.location = '/game/?id=0';
});
