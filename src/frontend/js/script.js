import {
  getSquares,
  getTiles,
} from './helpers/gameInterface.js';

//constants
const BOARD_SIZE = 15;
const RACK_SIZE = 7;
const SQUARES = await getSquares();
const TILES = await getTiles();

//DOM elements
const board = document.querySelector('.board');
const playerOneRack = document.querySelector('.rack-row.player-one');
const playerTwoRack = document.querySelector('.rack-row.player-two');

//state trackers
let player1Turn = true;
let numTilesRemaining = 100;

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

const getRandomTile = () => {
  if (numTilesRemaining === 0) {
    return '';
  }

  let tileNumber = Math.floor(Math.random() * numTilesRemaining) + 1;

  for (const index in TILES) {

    if (tileNumber <= TILES[index].amount) {
      numTilesRemaining--;
      TILES[index] = {
        ...TILES[index],
        amount: TILES[index].amount - 1,
      };
      return TILES[index].letter;
    }
    tileNumber -= TILES[index].amount;
  }

  return '';
};

//set up game board
for (let row = 0; row < BOARD_SIZE; row++) {

  const boardRow = document.createElement('tr');
  boardRow.classList.add('board-row');

  for (let col = 0; col < BOARD_SIZE; col++) {

    const type = SQUARES[row * BOARD_SIZE + col].multiplier;
    const boardCell = document.createElement('td');

    if (type !== 'N') {
      const typeLabel = document.createElement('p');
      typeLabel.classList.add('type-label');
      typeLabel.innerText = type;
      boardCell.appendChild(typeLabel);
    }

    boardCell.classList.add('board-cell', formatType(type));
    boardCell.addEventListener('click', () => addTile(boardCell, 'W'));
    boardRow.appendChild(boardCell);
  }
  board.appendChild(boardRow);
}

//set up player racks
for (let tile = 0; tile < RACK_SIZE; tile++) {
  const playerOneRackCell = document.createElement('td');
  const playerOneTile = document.createElement('p');

  playerOneTile.classList.add('tile-label', 'player-one');
  playerOneTile.innerText = getRandomTile();
  playerOneRackCell.appendChild(playerOneTile);
  playerOneRackCell.classList.add('player-one');

  playerOneRack.appendChild(playerOneRackCell);

  const playerTwoRackCell = document.createElement('td');
  const playerTwoTile = document.createElement('p');

  playerTwoTile.classList.add('tile-label', 'player-two');
  playerTwoTile.innerText = getRandomTile();
  playerTwoRackCell.appendChild(playerTwoTile);
  playerTwoRackCell.classList.add('player-two');

  playerTwoRack.appendChild(playerTwoRackCell);
}