// JavaScript code for game logic
const boardSize = 15;
const tileRackSize = 7;
const board = document.querySelector('.board');
const racks = {
  player1: document.querySelector('.rack.player1'),
  player2: document.querySelector('.rack.player2'),
};
const scoreCounters = {
  player1: document.getElementById('player1-score'),
  player2: document.getElementById('player2-score'),
};
const confirmWordBtn = document.getElementById('confirm-word');
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
'normal', 'normal', 'double-letter', 'normal', 'normal', 'normal', 'double-letter'
];
for (let row = 0; row < boardSize; row++) {
  const tr = document.createElement('tr');
  for (let col = 0; col < boardSize; col++) {
    const td = document.createElement('td');
    td.classList.add('cell', tileTypes[row * boardSize + col]);
    tr.appendChild(td);
  }
  board.appendChild(tr);
}
