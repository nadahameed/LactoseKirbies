$(document).ready(function() {
    var isRunning = false;
    var gameContainer = $('#game-container');
    var player = $('.player');
    var pointsBar = document.getElementById("pts");
    const roadHeight = 40;
    const movementInc = 40;
    const gameSpeed = 5;
    var roadInterval;
    var genInterval;
    var playerX = 160;
    var playerY = 320;
    var points = -8;
    var maxPoints = 0;

    var generateRoad = function() {
        // console.log("generating road...");
        var road = $('<div>').addClass('road').css('top', '0px');
        player.before(road);
    };

    var generateGrass = function() {
        var grass = $('<div>').addClass('grass').css('top', '0px');
        player.before(grass);
    }

    var generateCar = function() {
        // console.log("generating car...");
        var carPosition = (1 + Math.floor(Math.random() * 7)) * 40;
        var carDirection;
        if ((Math.floor(Math.random() * 2)) == 0) {
            carDirection = 1;
        } else {
            carDirection = 3;
        }
        var car = $('<img src="static/assets/Bell.png">').addClass('car').css('top', '0px').css('left', carPosition + 'px').css('font-weight', carDirection);
        player.before(car);
    };

    var moveRoads = function() {
        // console.log("moving road...");
        var roads = $('.road');
        roads.each(function() {
                var topPosition = parseInt($(this).css('top'));
                $(this).css('top', topPosition + gameSpeed + 'px');
                if (topPosition >= gameContainer.height() - roadHeight) {
                    $(this).remove();
            }
        });
    };

    var moveGrass = function() {
        // console.log("moving road...");
        var grass = $('.grass');
        grass.each(function() {
                var topPosition = parseInt($(this).css('top'));
                $(this).css('top', topPosition + gameSpeed + 'px');
                if (topPosition >= gameContainer.height() - roadHeight) {
                    $(this).remove();
            }
        });
    };

    var moveCars = function() {
        // console.log("moving car...");
        var cars = $('.car');
        cars.each(function() {
            var topPosition = parseInt($(this).css('top'));
            topPosition += gameSpeed;
            $(this).css('top', topPosition + 'px');
            if (topPosition >= gameContainer.height() - roadHeight) {
                $(this).remove();
            }

        var leftPosition = parseInt($(this).css('left'));
        var direction = parseInt($(this).css('font-weight')) -2;
        leftPosition += (gameSpeed * direction)
        if (direction == -1 && leftPosition < 20) {
            leftPosition = 300;
        } 
        if (direction == 1 && leftPosition > 300) {
            leftPosition = 20;
        }
        $(this).css('left', leftPosition + 'px');

        });
    };

    var movePlayer = function() {
        // console.log("moving player...");
        playerY += gameSpeed;
        player.css('top', playerY + 'px');
    };

   
    var newPos; //helper variable
    document.addEventListener('keydown', function(e) {
        if (e.key == "D" || e.key == "d") { // D
            newPos = playerX + movementInc;
            if (newPos < gameContainer.width() -20) {
                playerX = newPos;
                player.css('left', playerX + 'px');
            }
        } else if (e.key == "A" || e.key == "a") { // A
            newPos = playerX - movementInc;
            if (newPos > 20) {
                playerX = newPos;
                player.css('left', playerX + 'px');
            }
        } else if (e.key == "W" || e.key == "w") { // W
            newPos = playerY - movementInc;
            if (newPos > 40) {
                playerY = newPos;
                player.css('top', playerY + 'px');
                points += 1;
            }
        } else if (e.key == "S" || e.key == "s") { // S
            newPos = playerY + movementInc;
            if (newPos < gameContainer.height() - 40) {
                playerY = newPos;
                player.css('top', playerY + 'px');
                points -= 1;
            }
        }
    });

    var checkCollision = function() {
        var cars = $('.car');
        var playerTop = playerY;
        var playerBottom = playerY + player.height();
        var playerLeft = playerX;
        var playerRight = playerX + player.width();

        cars.each(function() {
            var carTop = parseInt($(this).css('top'));
            var carBottom = carTop + $(this).height();
            var carLeft = parseInt($(this).css('left'));
            var carRight = carLeft + $(this).width();

            if (
                (playerBottom > carTop && playerTop < carBottom) &&
                ((playerLeft > carLeft && playerLeft < carRight) ||
                (playerRight > carLeft && playerRight < carRight))
            ) {
                clearGame();
                alert('Game Over!');
            }
        });

        if (playerBottom >= gameContainer.height() - 1) {
            clearGame();
            alert('Game Over!');
        }
    };

    var updateScore = function() {
        if (maxPoints < points) {
            maxPoints = points;
            pointsBar.innerHTML = "Points: " + maxPoints;
        }
    }


    var clearGame = function() {
        console.log("clearing game...");
        clearInterval(roadInterval);
        location.reload();
        isRunning = false;
        startButton.innerHTML = "Start";
    };

    var startGame = function() {
        console.log("starting game...");
        roadInterval = setInterval(function() {
            updateScore();
            moveGrass();
            moveRoads();
            moveCars();
            movePlayer();
            checkCollision();
        }, 100);
        genInterval = setInterval(function() {
            if (Math.floor(Math.random() * 2) == 0) {
                generateRoad(); 
                generateCar();
            } else {
                generateGrass();
            }
        }, 800);
        isRunning = true;
        startButton.innerHTML = "Stop";
    };

    var run = function() {
        if (isRunning) {
            clearGame();
        } else {
            startGame();
        }
    };

    startButton = document.getElementById("startButton");
    startButton.addEventListener('click', run);

});