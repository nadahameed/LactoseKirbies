<!DOCTYPE html>
<html>
  <head>
    <title>Snake Game</title>
    <style>
      canvas {
        background-color: #ddd;
        display: block;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script>
      const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");

      // Snake block size and speed
      const blockSize = 50;
      const snakeSpeed = 200;

      // Initial position of the snake
      let x = (canvas.width / 2);
      let y = (canvas.height / 2);

      // Change in position
      let dx = blockSize;
      let dy = 0;

      // Create the snake
      let snake = [];
      let snakeLength = 1;

      // Position of the food
      let food = {
        x: getRandomCoordinate(canvas.width),
        y: getRandomCoordinate(canvas.height)
      };

      let score = 0;

      function getRandomCoordinate(max) {
        return Math.floor(Math.random() * max / blockSize) * blockSize;
      }

      function drawSnake() {
        snake.forEach(function(block,index) {
            const img = new Image();
            img.src = 'data/kirby.gif';
            ctx.drawImage(pygame.transform.scale(img,(50,50)),block.x, block.y, blockSize, blockSize);
        });
      }

      
      function drawFood() {
        // Load your custom image
        const img = new Image();
        img.src = "data/watermelon.png";
        ctx.drawImage(pygame.transform.scale(img,(50,50)), food.x, food.y, blockSize, blockSize);
      }

      function displayScore() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 30);
      }

      function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update position of the snake
        x += dx;
        y += dy;

        // Check for collision with boundaries
        if (x >= canvas.width || x < 0 || y >= canvas.height || y < 0) {
          gameOver();
        }

        // Check for snake collision with itself
        snake.forEach(function (block, index) {
          if (index !== 0 && x === block.x && y === block.y) {
            gameOver();
          }
        });

        // Update the game canvas
        drawFood();
        drawSnake();
        displayScore();

        snake.unshift({ x: x, y: y });
        if (snake.length > snakeLength) {
          snake.pop();
        }

        // Check if snake has eaten the food
        if (x === food.x && y === food.y) {
            food.x = getRandomCoordinate(canvas.width - blockSize);
            food.y = getRandomCoordinate(canvas.height - blockSize);
            snakeLength++;
            score++;

          // Increase snake speed every 5 points
          if (score % 5 === 0) {
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, snakeSpeed - (score * 10));
          }
        }
      }

      function gameOver() {
        clearInterval(gameInterval);
        alert("Game Over! Score: " + score);
        window.location.reload();
      }

      document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft" && dx !== blockSize) {
          dx = -blockSize;
          dy = 0;
        } else if (event.key === "ArrowRight" && dx !== -blockSize) {
          dx = blockSize;
          dy = 0;
        } else if (event.key === "ArrowUp" && dy !== blockSize) {
          dx = 0;
          dy = -blockSize;
        } else if (event.key === "ArrowDown" && dy !== -blockSize) {
          dx = 0;
          dy = blockSize;
        }
      });

      let gameInterval = setInterval(gameLoop, snakeSpeed);
    </script>
  </body>
</html>
