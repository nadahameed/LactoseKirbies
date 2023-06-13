// Snake game variables
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var gridSize = 20;
var snake = [{x: gridSize, y: gridSize}];
var food = {x: 0, y: 0};
var direction = "right";
var score = 0;

// Generate random food position
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

// Update snake position and check for collisions
function updateSnake() {
  var newHead = {x: snake[0].x, y: snake[0].y};

  // Update head position based on direction
  if (direction === "right") newHead.x += gridSize;
  else if (direction === "left") newHead.x -= gridSize;
  else if (direction === "up") newHead.y -= gridSize;
  else if (direction === "down") newHead.y += gridSize;

  // Check for collisions with food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Increase score and generate new food
    score++;
    generateFood();
  } else {
    // Remove the tail if no food was eaten
    snake.pop();
  }

  // Check for collisions with walls or itself
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= canvas.width ||
    newHead.y >= canvas.height ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    // Game over
    alert("Game over!");
    resetGame();
    return;
  }

  // Add the new head to the snake
  snake.unshift(newHead);
}

// Reset the game state
function resetGame() {
  snake = [{x: gridSize, y: gridSize}];
  direction = "right";
  score = 0;
  generateFood();
}

// Handle keyboard input
document.addEventListener("keydown", function (event) {
  var key = event.keyCode;
  if (key === 37 && direction !== "right") direction = "left";
  else if (key === 38 && direction !== "down") direction = "up";
  else if (key === 39 && direction !== "left") direction = "right";
  else if (key === 40 && direction !== "up") direction = "down";
});

// Main game loop
function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update snake and food
  updateSnake();

  // Draw snake
  context.fillStyle = "green";
  snake.forEach(function (segment) {
    context.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  // Draw food
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, gridSize, gridSize);

  // Draw score
  context.fillStyle = "black";
  context.fillText("Score: " + score, 10, 20);

  // Repeat the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game
generateFood();
gameLoop();
