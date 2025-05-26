const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 32;
const MAP_ROWS = 16;
const MAP_COLS = 16;

// タイルマップ: 0=草, 1=木
const map = [
  [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
  [1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
  [0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0],
  [0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

const tileImage = new Image();
tileImage.src = 'assets/tiles.png';

const playerImage = new Image();
playerImage.src = 'assets/player.png';

const player = {
  x: 1,
  y: 1
};

function drawMap() {
  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      let tile = map[y][x];
      ctx.drawImage(
        tileImage,
        tile * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE,
        x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE
      );
    }
  }
}

function drawPlayer() {
  ctx.drawImage(
    playerImage,
    0, 0, TILE_SIZE, TILE_SIZE,
    player.x * TILE_SIZE,
    player.y * TILE_SIZE,
    TILE_SIZE, TILE_SIZE
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

// 移動処理（壁判定なし）
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp')    player.y = Math.max(0, player.y - 1);
  if (e.key === 'ArrowDown')  player.y = Math.min(MAP_ROWS - 1, player.y + 1);
  if (e.key === 'ArrowLeft')  player.x = Math.max(0, player.x - 1);
  if (e.key === 'ArrowRight') player.x = Math.min(MAP_COLS - 1, player.x + 1);
});

// 両方の画像が読み込まれてから開始
let assetsLoaded = 0;
function tryStartGame() {
  assetsLoaded++;
  if (assetsLoaded === 2) {
    gameLoop();
  }
}

tileImage.onload = tryStartGame;
playerImage.onload = tryStartGame;
