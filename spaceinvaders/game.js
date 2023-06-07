// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the game variables
const windowWidth = 800;
const windowHeight = 600;
let playerX = windowWidth / 2;
const playerY = windowHeight - 50;
const playerWidth = 50;
const playerHeight = 50;
let enemies = [];
let score = 0;
const winningScore = 20;
let gameRunning = true;
let enemyTimer = 0;
const enemyInterval = 1000; // milliseconds

// Event listeners for keyboard input
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= 5;
  } else if (event.key === "ArrowRight" && playerX < windowWidth - playerWidth) {
    playerX += 5;
  }
});

// Enemy class
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = 1;
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Game loop
function gameLoop() {
  if (!gameRunning) {
    console.log("Game Over");
    return;
  }

  // Update
  enemyTimer += 16; // milliseconds
  if (enemyTimer >= enemyInterval) {
    createEnemy();
    enemyTimer = 0;
  }

  enemies.forEach((enemy, index) => {
    enemy.update();

    // Collision detection
    if (
      playerX + playerWidth >= enemy.x &&
      playerX <= enemy.x + enemy.width &&
      playerY + playerHeight >= enemy.y &&
      playerY <= enemy.y + enemy.height
    ) {
      score++;
      console.log("Score: " + score);
      enemies.splice(index, 1);
    }

    // Remove enemy if it goes off the screen
    if (enemy.y > windowHeight) {
      enemies.splice(index, 1);
    }
  });

  // Check winning condition
  if (score >= winningScore) {
    console.log("You Win!");
    gameRunning = false;
  }

  // Render
  ctx.clearRect(0, 0, windowWidth, windowHeight);
  drawPlayer();
  enemies.forEach((enemy) => {
    enemy.draw();
  });

  requestAnimationFrame(gameLoop);
}

// Create enemy
function createEnemy() {
  const x = Math.random() * (windowWidth - 30);
  const y = 0;
  const enemy = new Enemy(x, y);
  enemies.push(enemy);
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Start the game loop
gameLoop();
