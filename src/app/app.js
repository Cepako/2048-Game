let score = 0,
  board,
  rows = 4,
  columns = 4;

function initGameBoard() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const gamePanel = document.querySelector('.game-panel');
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement('div');
      tile.id = `${r}-${c}`;
      tile.classList.add('game-panel__tile');
      let num = board[r][c];
      updateTile(tile, num);
      gamePanel.appendChild(tile);
    }
  randomTile();
  randomTile();
}

function randomTile() {
  let tileSet = false;
  while (!tileSet) {
    let randomRow = Math.floor(Math.random() * rows),
      randomCol = Math.floor(Math.random() * columns);

    let tileNum = board[randomRow][randomCol];

    if (tileNum === 0) {
      let tile = document.getElementById(`${randomRow}-${randomCol}`);
      board[randomRow][randomCol] = 2;
      updateTile(tile, 2);

      tileSet = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = '';
  tile.dataset.value = num;
  if (num > 0) tile.innerText = num;
}

function filterZero(row) {
  return row.filter((value) => value !== 0);
}

function slide(row) {
  row = filterZero(row);
  for (let c = 0; c < columns - 1; c++) {
    if (row[c] === row[c + 1]) {
      row[c] *= 2;
      row[c + 1] = 0;
      score += isNaN(row[c]) ? 0 : row[c];
      document.querySelector('span.live-score').innerText = score;
    }
  }
  row = filterZero(row);
  while (row.length < columns) row.push(0);
  return row;
}

function fixNaN() {
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) if (isNaN(board[r][c])) board[r][c] = 0;
}

function moveUp() {
  let upRow;
  for (let c = 0; c < columns; c++) {
    upRow = [];
    for (let r = rows - 1; r >= 0; r--) {
      upRow.push(board[r][c]);
    }
    upRow = slide(upRow.reverse());
    for (let r = 0; r < rows; r++) {
      board[r][c] = upRow[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  fixNaN();
}

function moveDown() {
  let downRow;
  for (let c = 0; c < columns; c++) {
    downRow = [];
    for (let r = 0; r < rows; r++) {
      downRow.push(board[r][c]);
    }
    downRow = slide(downRow.reverse());
    downRow = downRow.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = downRow[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  fixNaN();
}

function moveRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row.reverse());
    board[r] = row.reverse();
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  fixNaN();
}

function moveLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  fixNaN();
}

function moveTiles(e) {
  switch (e.key) {
    case 'ArrowUp':
      moveUp();
      randomTile();
      break;
    case 'ArrowDown':
      moveDown();
      randomTile();
      break;
    case 'ArrowRight':
      moveRight();
      randomTile();
      break;
    case 'ArrowLeft':
      moveLeft();
      randomTile();
      break;
  }
}

document.addEventListener('keyup', moveTiles);

document.addEventListener('DOMContentLoaded', initGameBoard);
