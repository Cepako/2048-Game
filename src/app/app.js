let score, board;

function initGameBoard() {
  board = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [4, 4, 8, 8],
    [4, 4, 8, 8],
  ];

  const gamePanel = document.querySelector('.game-panel');
  for (let r = 0; r < board.length; r++)
    for (let c = 0; c < board[r].length; c++) {
      const div = document.createElement('div');
      div.classList.add('game-panel__tile');
      div.dataset.value = board[r][c];
      div.innerText = board[r][c];
      gamePanel.appendChild(div);
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
      break;
  }
}

document.addEventListener('keyup', moveTiles);

document.addEventListener('DOMContentLoaded', initGameBoard);
