import {
  getSquares,
} from './helpers/gameInterface.js';

//constants
const BOARD_SIZE = 15;
const SQUARES = await getSquares();

//DOM elements
const board = document.querySelector('.board');

//state trackers
let player1Turn = true;

//helper functions
const formatType = (type) => {
  switch (type) {
    case '2L':
      return 'double-letter';
    case '3L':
      return 'triple-letter';
    case '2W':
      return 'double-word';
    case '3W':
      return 'triple-word';
    default:
      return 'normal';
  }
};

const addTile = (td, letter) => {
  const tile = document.createElement('p');
  tile.classList.add('tile-label', player1Turn ? 'player-one' : 'player-two');
  tile.innerText = letter;
  td.appendChild(tile);
  td.classList.add(player1Turn ? 'player-one' : 'player-two');

  player1Turn = !player1Turn;
};

//set up game board
for (let row = 0; row < BOARD_SIZE; row++) {

  const tr = document.createElement('tr');
  tr.classList.add('board-row');

  for (let col = 0; col < BOARD_SIZE; col++) {

    const type = SQUARES[row * BOARD_SIZE + col].multiplier;
    const td = document.createElement('td');

    if (type !== 'N') {
      const typeLabel = document.createElement('p');
      typeLabel.classList.add('type-label');
      typeLabel.innerText = type;
      td.appendChild(typeLabel);
    }

    td.classList.add('board-cell', formatType(type));
    td.addEventListener('click', () => addTile(td, 'W'));
    tr.appendChild(td);
  }
  board.appendChild(tr);
}
