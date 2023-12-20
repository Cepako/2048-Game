let score = 0,
  bestScore = 0,
  board,
  rows = 4,
  columns = 4;

const popUp = document.querySelector('.popUp'),
  container = document.querySelector('.container'),
  bestScr = document.querySelector('.best-score');

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

function newGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  score = 0;
  document.querySelector('span.live-score').innerText = score;
  randomTile();
  randomTile();
}

function isGameOver() {
  if (gameEnd()) {
    popUp.classList.add('active');
    container.classList.add('blur');
    document.querySelector('.score').innerText = score;
    score > bestScore
      ? (bestScr.innerText = score)
      : (bestScr.innerText = bestScore);
    bestScore = score;
  }
}

function gameEnd() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const currentTile = board[r][c];

      if (
        (r > 0 && currentTile === board[r - 1][c]) ||
        (r < rows - 1 && currentTile === board[r + 1][c]) ||
        (c > 0 && currentTile === board[r][c - 1]) ||
        (c < columns - 1 && currentTile === board[r][c + 1])
      ) {
        return false;
      }
    }
  }
  if (isAnyTileAvailable()) return false;

  return true;
}

function isAnyTileAvailable() {
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) if (board[r][c] === 0) return true;

  return false;
}

function randomTile() {
  let tileSet = !isAnyTileAvailable();

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
      score > bestScore
        ? (bestScr.innerText = score)
        : (bestScr.innerText = bestScore);
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

function copyBoardBefore() {
  return board.map((row) => row.map((tile) => tile));
}

function arraysAreEqual(ar1, ar2) {
  for (let r = 0; r < ar1.length; r++)
    for (let c = 0; c < ar1[r].length; c++)
      if (ar1[r][c] !== ar2[r][c]) return false;
  return true;
}

function moveUp() {
  let upRow;
  const boardBefore = copyBoardBefore();
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
  if (arraysAreEqual(board, boardBefore)) return;
  randomTile();
}

function moveDown() {
  let downRow;
  const boardBefore = copyBoardBefore();
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
  if (arraysAreEqual(board, boardBefore)) return;
  randomTile();
}

function moveRight() {
  const boardBefore = copyBoardBefore();
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
  if (arraysAreEqual(board, boardBefore)) return;

  randomTile();
}

function moveLeft() {
  const boardBefore = copyBoardBefore();
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
  if (arraysAreEqual(board, boardBefore)) return;

  randomTile();
}

function moveTiles(e) {
  switch (e.key) {
    case 'ArrowUp':
      moveUp();
      isGameOver();
      break;
    case 'ArrowDown':
      moveDown();
      isGameOver();
      break;
    case 'ArrowRight':
      moveRight();
      isGameOver();
      break;
    case 'ArrowLeft':
      moveLeft();
      isGameOver();
      break;
  }
}

document.addEventListener('keyup', moveTiles);

document.querySelector('.header__reset').addEventListener('click', newGame);

document.querySelector('.fa-x').addEventListener('click', () => {
  popUp.classList.remove('active');
  container.classList.remove('blur');
});

let clientX, clientY;

document.querySelector('.game-panel').addEventListener('touchstart', (e) => {
  clientX = e.touches[0].clientX;
  clientY = e.touches[0].clientY;
});
document.querySelector('.game-panel').addEventListener('touchend', (e) => {
  let deltaX = e.changedTouches[0].clientX - clientX,
    deltaY = e.changedTouches[0].clientY - clientY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) {
      moveLeft();
      isGameOver();
    } else {
      moveRight();
      isGameOver();
    }
  } else {
    if (deltaY < 0) {
      moveUp();
      isGameOver();
    } else {
      moveDown();
      isGameOver();
    }
  }
});

document.addEventListener('DOMContentLoaded', initGameBoard);
