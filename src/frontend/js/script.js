
//constants
const BOARD_SIZE = 15;
// const RACK_SIZE = 7;

const tileTypes = [
  'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-word', 'normal', 'normal',
  'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter',
  'triple-word', 'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal', 'triple-word',
  'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter',
  'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
  'double-word', 'normal', 'normal', 'normal', 'normal', 'normal', 'double-word',
  'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal',
  'triple-word', 'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal', 'triple-word',
  'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter',
  'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
  'double-word', 'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal', 'triple-word',
  'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter',
  'triple-word', 'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal', 'triple-word',
  'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter',
  'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
  'double-word', 'normal', 'normal', 'normal', 'normal', 'normal', 'double-word',
  'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal',
  'triple-word', 'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal', 'triple-word',
  'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter',
  'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
  'double-word', 'normal', 'normal', 'normal', 'normal', 'normal', 'double-word',
  'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal',
  'triple-word', 'normal', 'normal', 'triple-letter', 'normal', 'triple-letter', 'normal', 'normal', 'triple-letter', 'normal', 'triple-word',
  'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter',
  'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
  'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
  ];

//DOM elements
const board = document.querySelector('.board');

//state trackers
let player1Turn = true;

//helper functions
const abreviateType = (type) => {
  switch (type) {
    case 'double-letter':
      return '2L';
    case 'triple-letter':
      return '3L';
    case 'double-word':
      return '2W';
    case 'triple-word':
      return '3W';
    default:
      return '';
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

//set up board
for (let row = 0; row < BOARD_SIZE; row++) {

  const tr = document.createElement('tr');
  tr.classList.add('board-row');

  for (let col = 0; col < BOARD_SIZE; col++) {

    const type = tileTypes[row * BOARD_SIZE + col];
    const td = document.createElement('td');

    if (type !== 'normal') {
      const typeLabel = document.createElement('p');
      typeLabel.classList.add('type-label');
      typeLabel.innerText = abreviateType(type);
      td.appendChild(typeLabel);
    }



    td.classList.add('board-cell', type);
    td.addEventListener('click', () => addTile(td, 'W'));
    tr.appendChild(td);
  }
  board.appendChild(tr);
}
