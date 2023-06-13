<!DOCTYPE html>
<html>
<head>
    <title>Space Invaders</title>
    <style>
        #gameCanvas {
            background-color: black;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>

    <script>
        // Get the canvas and context
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Player properties
        const playerSize = 50;
        let playerX = canvas.width / 2 - playerSize / 2;
        const playerY = canvas.height - 10;

        // Projectile properties
        const projectileSize = 10;
        const projectileSpeed = 5;
        let projectiles = [];

        // Enemy properties
        const enemySize = 50;
        const enemySpeed = 2;
        let enemies = [];

        // Create enemies
        const numEnemies = 5;
        for (let i = 0; i < numEnemies; i++) {
            enemies.push({
                x: Math.random() * (canvas.width - enemySize),
                y: Math.random() * -200,
                speed: enemySpeed
            });
        }

        // Initialize score
        let score = 0;

        // Handle key press events
        const keyState = {};
        window.addEventListener('keydown', (event) => {
            keyState[event.keyCode] = true;
        });
        window.addEventListener('keyup', (event) => {
            keyState[event.keyCode] = false;
        });

        // Update player position
        function updatePlayer() {
            if (keyState[37]) { // Left arrow key
                playerX -= 5;
            }
            if (keyState[39]) { // Right arrow key
                playerX += 5;
            }

            // Bound player within the canvas
            if (playerX < 0) {
                playerX = 0;
            }
            if (playerX + playerSize > canvas.width) {
                playerX = canvas.width - playerSize;
            }

            // Shoot projectiles
            if (keyState[32]) { // Spacebar
                const projectileX = playerX + playerSize / 2 - projectileSize / 2;
                const projectileY = playerY - projectileSize;
                projectiles.push({ x: projectileX, y: projectileY });
            }
        }

        // Update projectile positions and check for collisions with enemies
        function updateProjectiles() {
            for (let i = 0; i < projectiles.length; i++) {
                projectiles[i].y -= projectileSpeed;

                // Check for collision with enemies
                for (let j = 0; j < enemies.length; j++) {
                    if (
                        projectiles[i].x < enemies[j].x + enemySize &&
                        projectiles[i].x + projectileSize > enemies[j].x &&
                        projectiles[i].y < enemies[j].y + enemySize &&
                        projectiles[i].y + projectileSize > enemies[j].y
                    ) {
                        score++;
                        projectiles.splice(i, 1);
                        enemies.splice(j, 1);
                        break;
                    }
                }

                // Remove projectiles that go off-screen
                if (projectiles[i] && projectiles[i].y < 0) {
                    projectiles.splice(i, 1);
                }
            }
        }

        // Update enemy positions
        function updateEnemies() {
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].y += enemies[i].speed;

                // Check if enemy reaches the bottom
                if (enemies[i].y > canvas.height) {
                    enemies[i].y = Math.random() * -200;
                    enemies[i].x = Math.random() * (canvas.width - enemySize);
                }
            }
        }

        // Draw player, enemies, projectiles, and score
        function draw() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw player
            ctx.fillStyle = 'pink';
            ctx.fillRect(playerX, playerY, playerSize, playerSize);

            // Draw enemies
            ctx.fillStyle = 'red';
            for (let i = 0; i < enemies.length; i++) {
                ctx.fillRect(enemies[i].x, enemies[i].y, enemySize, enemySize);
            }

            // Draw projectiles
            ctx.fillStyle = 'blue';
            for (let i = 0; i < projectiles.length; i++) {
                ctx.fillRect(projectiles[i].x, projectiles[i].y, projectileSize, projectileSize);
            }

            // Draw score
            ctx.font = '24px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('Score: ' + score, 10, 30);
        }

        // Game loop
        function gameLoop() {
            updatePlayer();
            updateProjectiles();
            updateEnemies();
            draw();

            requestAnimationFrame(gameLoop);
        }

        // Start the game loop
        gameLoop();
    </script>
</body>
</html>
