// Get the canvas element
const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

// Set up game variables
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const paddleWidth = 100;
const paddleHeight = 20;
let paddleX = (WIDTH - paddleWidth) / 2;
let paddleSpeed = 8; // Paddle movement speed
const ballRadius = 10;
let ballX = WIDTH / 2;
let ballY = HEIGHT / 2;
let ballSpeedX = 3; // Ball movement speed
let ballSpeedY = 3; // Ball movement speed
let score = 0;

const ballImage = new Image();
ballImage.src = "data/kirbyball.png"

const bgImage = new Image();
bgImage.src = "data/background.png"


// Block variables
const blockRowCount = 5;
const blockColumnCount = 8;
const blockWidth = 75;
const blockHeight = 20;
const blockPadding = 10;
const blockOffsetTop = 30;
const blockOffsetLeft = (WIDTH - (blockColumnCount * (blockWidth + blockPadding))) / 2;

// Create blocks
const blocks = [];
for (let column = 0; column < blockColumnCount; column++) {
  blocks[column] = [];
  for (let row = 0; row < blockRowCount; row++) {
    blocks[column][row] = { x: 0, y: 0, status: 1 };
  }
}

// Handle user input
let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.code === "ArrowLeft") {
    leftPressed = true;
  } else if (event.code === "ArrowRight") {
    rightPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.code === "ArrowLeft") {
    leftPressed = false;
  } else if (event.code === "ArrowRight") {
    rightPressed = false;
  }
}

// Update paddle position
function updatePaddle() {
  if (leftPressed) {
    paddleX -= paddleSpeed;
  }
  if (rightPressed) {
    paddleX += paddleSpeed;
  }

  // Limit paddle position within the canvas
  if (paddleX < 0) {
    paddleX = 0;
  } else if (paddleX + paddleWidth > WIDTH) {
    paddleX = WIDTH - paddleWidth;
  }
}

// Draw the paddle
function drawPaddle() {
  context.fillStyle = "purple";
  context.fillRect(paddleX, HEIGHT - paddleHeight, paddleWidth, paddleHeight);
}

// Draw the ball
function drawBall() {
  //context.fillStyle = "white";
  context.drawImage(ballImage, ballX, ballY, ballRadius*5, ballRadius*5)
  context.beginPath();
  //context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fill();
}

// Draw the blocks
function drawBlocks() {
  for (let column = 0; column < blockColumnCount; column++) {
    for (let row = 0; row < blockRowCount; row++) {
      if (blocks[column][row].status === 1) {
        const blockX = column * (blockWidth + blockPadding) + blockOffsetLeft;
        const blockY = row * (blockHeight + blockPadding) + blockOffsetTop;
        blocks[column][row].x = blockX;
        blocks[column][row].y = blockY;
        context.fillStyle = "purple";
        context.fillRect(blockX, blockY, blockWidth, blockHeight);
      }
    }
  }
}

// Collision detection
function collisionDetection() {
  for (let column = 0; column < blockColumnCount; column++) {
    for (let row = 0; row < blockRowCount; row++) {
      const block = blocks[column][row];
      if (block.status === 1) {
        if (
          ballX > block.x &&
          ballX < block.x + blockWidth &&
          ballY > block.y &&
          ballY < block.y + blockHeight
        ) {
          ballSpeedY *= -1;
          block.status = 0;
          score++;
          if (score === blockRowCount * blockColumnCount) {
            // All blocks destroyed
            alert("Congratulations! You won!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// Update game state
function update(progress) {
  // Update paddle position
  updatePaddle();

  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Handle ball collisions with walls
  if (ballX + ballRadius > WIDTH || ballX - ballRadius < 0) {
    ballSpeedX *= -1;
  }
  if (ballY - ballRadius < 0) {
    ballSpeedY *= -1;
  }

  // Handle ball collision with paddle
  if (
    ballY + ballRadius > HEIGHT - paddleHeight &&
    ballX + ballRadius > paddleX &&
    ballX - ballRadius < paddleX + paddleWidth
  ) {
    ballSpeedY *= -1;
  }

  // Handle ball collision with blocks
  collisionDetection();

  // Handle ball collision with bottom wall
  if (ballY + ballRadius > HEIGHT) {
    // Reset ball position
    ballX = WIDTH / 2;
    ballY = HEIGHT / 2;
    score = 0;
  }
}

// Render the game
function render() {
  // Clear the canvas
  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // Draw the paddle
  drawPaddle();

  // Draw the ball
  drawBall();

  // Draw the blocks
  drawBlocks();

  // Display the score
  context.fillStyle = "purple";
  context.font = "20px Cambria";
  context.fillText("Score: " + score, 10, 20);
}

// Game loop
function gameLoop(timestamp) {
  var progress = (timestamp - lastRender)
  update(progress)
  render()
  lastRender = timestamp
  window.requestAnimationFrame(gameLoop)
}

// Start the game loop
var lastRender = 0
window.requestAnimationFrame(gameLoop)
