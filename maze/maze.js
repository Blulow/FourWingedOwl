const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');
let mazeWidth = 16;
let mazeHeight = 16;
canvas.width = (mazeWidth + 1) * 30;
canvas.height = (mazeWidth + 1) * 30;

function generateMaze(width, height) {
  // Make sure dimensions are odd
  if (width % 2 === 0) width++;
  if (height % 2 === 0) height++;

  const maze = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => 1) // fill with walls
  );

  function carve(x, y) {
    const directions = [
      [0, -2],
      [0, 2],
      [-2, 0],
      [2, 0]
    ].sort(() => Math.random() - 0.5);

    directions.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (ny > 0 && ny < height - 1 && nx > 0 && nx < width - 1 && maze[ny][nx] === 1) {
        maze[y + dy / 2][x + dx / 2] = 0;
        maze[ny][nx] = 0;
        carve(nx, ny);
      }
    });
  }

  // Carve the maze starting at (1,1)
  maze[1][1] = 0;
  carve(1, 1);

  // Create entrance and exit in walls
  maze[1][0] = 0; // Entrance on left wall
  maze[height - 2][width - 1] = 0; // Exit on right wall

  return maze;
}

const grid = generateMaze(mazeWidth + 1, mazeHeight + 1);
console.log(grid);

let pos = { x: 0, y: 1 };

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < mazeHeight + 1; y++) {
    for (let x = 0; x < mazeHeight + 1; x++) {
        ctx.fillStyle = grid[y][x] === 1 ? 'lime' : 'black';
        ctx.fillRect(x * 30, y * 30, 30, 30);
    }
    }
    ctx.fillStyle = 'lime';
    ctx.fillRect(pos.x * 30 + 5, pos.y * 30 + 5, 20, 20);
}

let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

let finished = false;

function update() {
    let moved = false;
    let nx = pos.x;
    let ny = pos.y;

    if (keys['ArrowUp']) ny--;
    if (keys['ArrowDown']) ny++;
    if (keys['ArrowLeft']) nx--;
    if (keys['ArrowRight']) nx++;

    if ((nx !== pos.x || ny !== pos.y) && grid[ny][nx] === 0) {
        pos.x = nx;
        pos.y = ny;
        moved = true;
    }

    if (moved) draw();

    // Check for win
    if (!finished && pos.x === 16 && pos.y === 15) {
        finished = true;
        localStorage.setItem('trial1Done', 'true');
        alert('Trial 1 complete! Next trial unlocked.');
        window.location.href = '../index.html';
    }
}

draw();
setInterval(update, 100); // every 100ms