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
    var playerY = 400;
    var cars = [];
    var points = 0;

    var generateRoad = function() {
        // console.log("generating road...");
        var road = $('<div>').addClass('road').css('top', '-0px');
        player.before(road);
    };

    var generateCar = function() {
        // console.log("generating car...");
        var carPosition = Math.floor(Math.random() * (gameContainer.width() - 40));
        var car = $('<div>').addClass('car').css('top', '0px').css('left', carPosition + 'px');
        gameContainer.append(car);
        cars.push(car);
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

    var moveCars = function() {
        // console.log("moving car...");
        for (var i = 0; i < cars.length; i++) {
            var car = cars[i];
            var topPosition = parseInt(car.css('top'));
            car.css('top', topPosition + gameSpeed + 'px');
            if (topPosition >= gameContainer.height()) {
                car.remove();
                cars.splice(i, 1);
                i--;
            }
            var leftPosition = parseInt(car.css('left'));
            car.css('top', leftPosition + gameSpeed + 'px');

        };
    };

    var movePlayer = function() {
        // console.log("moving player...");
       
    }

    document.addEventListener('keydown', function(e) {
        if (e.key == "D" || e.key == "d") { // D
                playerX += movementInc;
                player.css('left', playerX + 'px');
        } else if (e.key == "A" || e.key == "a") { // A
                playerX -= movementInc;
                player.css('left', playerX + 'px');
        } else if (e.key == "W" || e.key == "w") { // W
                playerY -= movementInc;
                player.css('top', playerY + 'px');
                points += 1;
        } else if (e.key == "S" || e.key == "s") { // S
                playerY += movementInc;
                player.css('top', playerY + 'px');
                points -= 1;
        }
    });

    var checkCollision = function() {
        // var roads = $('.road');
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
                (playerBottom >= carTop && playerTop <= carBottom) &&
                ((playerLeft >= carLeft && playerLeft <= carRight) ||
                (playerRight >= carLeft && playerRight <= carRight))
            ) {
                clearGame();
                alert('Game Over!');
            }
        });

        if (playerBottom >= gameContainer.height() + player.height()) {
            clearGame();
            alert('Game Over!');
        }
    };

    var updateScore = function() {
        pointsBar.innerHTML = "Points: " + points;
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
            moveRoads();
            //   moveCars();
            movePlayer();
            checkCollision();
        }, 100);
        genInterval = setInterval(function() {
            generateRoad(); 
            //   generateCar();
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