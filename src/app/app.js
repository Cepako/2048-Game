const tiles = [...document.querySelectorAll('.game-panel__tile')];

function randomTile() {
  let randomFlag = true,
    randomTileIndex,
    countUsedTiles = 0;
  tiles.forEach((tile) => {
    if (tile.innerText !== '') countUsedTiles++;
  });
  while (randomFlag) {
    randomTileIndex = Math.floor(Math.random() * tiles.length);
    if (tiles[randomTileIndex].innerText === '') randomFlag = !randomFlag;
    else if (countUsedTiles === tiles.length) randomFlag = !randomFlag;
  }
  if (countUsedTiles < tiles.length) {
    tiles[randomTileIndex].innerText = 2;
    tiles[randomTileIndex].dataset.value = 2;

    tiles[randomTileIndex].classList.add('tile-appear');

    tiles[randomTileIndex].addEventListener(
      'transitionend',
      function () {
        this.classList.remove('tile-appear');
      },
      { once: true }
    );
  }
}

document.querySelector('.header__reset').addEventListener('click', () => {
  tiles.forEach((tile) => {
    tile.innerText = '';
    tile.dataset.value = '';
  });
  randomTile();
  randomTile();
});

function changeTile(i, j, moveType) {
  if (moveType === 'move') {
    tiles[j].dataset.value = tiles[i].dataset.value;
    tiles[j].innerText = tiles[i].innerText;
    tiles[i].dataset.value = '';
    tiles[i].innerText = '';
  } else if (moveType === 'add') {
    tiles[j].dataset.value = tiles[j].dataset.value * 2;
    tiles[j].textContent = tiles[j].dataset.value;
    tiles[i].dataset.value = '';
    tiles[i].innerText = '';
  }
}

function moveUp() {
  let canGoUp = true;
  for (let i = 4; i < tiles.length; i++) {
    let j = i;
    while (j >= 4) {
      const currentTile = tiles[j],
        aboveTile = tiles[j - 4];
      if (aboveTile.dataset.value === '') {
        changeTile(j, j - 4, 'move');
      } else if (aboveTile.dataset.value === currentTile.dataset.value) {
        changeTile(j, j - 4, 'add');
        break;
      } else {
        canGoUp = !canGoUp;
        break;
      }
      j -= 4;
    }
  }
  if (canGoUp) randomTile();
}

function moveTiles(e) {
  switch (e.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      break;
    case 'ArrowRight':
      break;
    case 'ArrowLeft':
      break;
  }
}

document.addEventListener('keydown', moveTiles);

randomTile();
randomTile();
