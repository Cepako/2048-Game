const tiles = document.querySelectorAll('.game-panel__tile');
const colorPallet = {
  backgroundColor: [
    '#eee4d9',
    '#ede0c7',
    '#f7b478',
    '#fe9c62',
    '#ff875f',
    '#fe6a3a',
    '#efcd71',
    '#f0c85c',
    '#f0c54f',
    '#f2c13f',
    '#f9b902',
    '#49bb93',
    '#0d9664',
    '#13714f',
  ],
  fontColor: ['#7c6f65', '#7c6e5b', '#ffffff'],
};

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
    tiles[randomTileIndex].style.backgroundColor =
      colorPallet.backgroundColor[0];
    tiles[randomTileIndex].style.color = colorPallet.fontColor[0];
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
    tile.style.backgroundColor = '#cdc1b2';
    tile.style.color = '#7b7168';
  });
  randomTile();
  randomTile();
});
