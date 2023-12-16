let score,
  board,
  rows = 4,
  columns = 4;

function initGameBoard() {
  board = [
    [2, 2, 0, 0],
    [2, 2, 2, 2],
    [4, 4, 0, 8],
    [4, 0, 8, 8],
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
      score += row[c];
    }
  }
  row = filterZero(row);
  while (row.length < columns) row.push(0);
  return row;
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
}

function moveTiles(e) {
  switch (e.key) {
    case 'ArrowUp':
      break;
    case 'ArrowDown':
      break;
    case 'ArrowRight':
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
  }
}

document.addEventListener('keyup', moveTiles);

document.addEventListener('DOMContentLoaded', initGameBoard);
