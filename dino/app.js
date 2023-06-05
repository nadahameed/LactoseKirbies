// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the game variables
const windowWidth = 800;
const windowHeight = 400;
let dinoY = windowHeight - 50;
let isJumping = false;
let jumpCount = 10;
let gameRunning = true;
let obstacles = [];
let obstacleTimer = 0;
const obstacleInterval = 1000; // milliseconds

// Event listener for keyboard input
document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    if (!isJumping) {
      isJumping = true;
    }
  }
});

// Obstacle class
class Obstacle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  update() {
    this.x -= this.speed;
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
  if (isJumping) {
    if (jumpCount >= -10) {
      const neg = jumpCount < 0 ? -1 : 1;
      dinoY -= (jumpCount ** 2) * 0.5 * neg;
      jumpCount -= 1;
    } else {
      isJumping = false;
      jumpCount = 10;
    }
  }

  obstacleTimer += 16; // milliseconds
  if (obstacleTimer >= obstacleInterval) {
    createObstacle();
    obstacleTimer = 0;
  }

  obstacles.forEach((obstacle, index) => {
    obstacle.update();

    // Collision detection
    if (
      dinoY + 50 >= windowHeight - obstacle.height &&
      dinoY <= windowHeight &&
      obstacle.x <= 150 &&
      obstacle.x + obstacle.width >= 100
    ) {
      gameRunning = false;
    }

    // Remove obstacle if it goes off the screen
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1);
    }
  });

  // Render
  ctx.clearRect(0, 0, windowWidth, windowHeight);
  drawDino();
  obstacles.forEach((obstacle) => {
    obstacle.draw();
  });

  requestAnimationFrame(gameLoop);
}

// Create obstacle
function createObstacle() {
  const x = windowWidth;
  const y = windowHeight - 50;
  const width = 30;
  const height = Math.floor(Math.random() * (80 - 20 + 1) + 20);
  const speed = 5;
  const obstacle = new Obstacle(x, y, width, height, speed);
  obstacles.push(obstacle);
}

// Draw dino
function drawDino() {
  ctx.fillStyle = "white";
  ctx.fillRect(100, dinoY, 50, 50);
}

// Start the game loop
gameLoop();
