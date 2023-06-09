// Set up the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set up the paddle
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 10;
const paddleSpeed = 5;

// Set up the ball
const ballRadius = 10;
const ballImage = newImage()
ballImage.src = "data/kirbyball.png";
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = canvas.height / 2;
let ballDX = Math.random() > 0.5 ? -2 : 2;
let ballDY = -2;

// Set up blocks
const blockWidth = 50;
const blockHeight = 20;
const blockRows = 5;
const blockCols = 10;
const blockMargin = 10;
let blocks = [];
for (let row = 0; row < blockRows; row++) {
  for (let col = 0; col < blockCols; col++) {
    const blockX = col * (blockWidth + blockMargin) + blockMargin;
    const blockY = row * (blockHeight + blockMargin) + blockMargin;
    blocks.push({ x: blockX, y: blockY, width: blockWidth, height: blockHeight });
  }
}

const backgroundImage = new Image();
backgroundImage.src = "data/background.png"

let score = 0;

// Move the paddle
function movePaddle(e) {
  if (e.key === "ArrowLeft" && paddleX > 0) {
    paddleX -= paddleSpeed;
  } else if (e.key === "ArrowRight" && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
}

document.addEventListener("keydown", movePaddle);

// Game loop
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the ball
  ballX += ballDX;
  ballY += ballDY;

  // Draw the paddle
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

  //background
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.drawImage(pygame.transform.scale(ballImage,(40,40)), ballX - ballWidth / 2, ballY - ballHeight / 2, ballWidth, ballHeight);
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();

  // Draw the blocks
  ctx.fillStyle = "#0000FF";
  blocks.forEach((block) => {
    ctx.fillRect(block.x, block.y, block.width, block.height);
  });

  // Display the score
  ctx.fillStyle = "#0000FF";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Check ball collision with paddle
  if (
    ballY + ballRadius > paddleY &&
    ballX + ballRadius > paddleX &&
    ballX - ballRadius < paddleX + paddleWidth
  ) {
    ballDY = -ballDY;
  }

  // Check ball collision with blocks
  blocks.forEach((block, index) => {
    if (
      ballY - ballRadius < block.y + block.height &&
      ballX > block.x &&
      ballX < block.x + block.width
    ) {
      blocks.splice(index, 1);
      score++;
      ballDY = -ballDY;
    }
  });

  // Check ball collision with walls
  if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
    ballDX = -ballDX;
  }
  if (ballY - ballRadius < 0) {
    ballDY = -ballDY;
  } else if (ballY + ballRadius > canvas.height) {
    // Game over if ball hits the bottom
    document.removeEventListener("keydown", movePaddle);
    return;
  }

  requestAnimationFrame(draw);
}

draw();
