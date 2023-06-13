$(document).ready(function() {
    var isRunning = false;
    var gameContainer = $('#game-container');
    var player = $('.player');
    const roadHeight = 40;
    const movementInc = 40;
    const gameSpeed = 5;
    var roadInterval;
    var playerX = 240;
    var playerY = gameContainer.height() - roadHeight;
    var cars = [];

    var generateRoad = function() {
        // console.log("generating road...");
            var road = $('<div>').addClass('road').css('top', '0px');
            gameContainer.append(road);
    };

    var generateCar = function() {
        // console.log("generating car...");
        var carPosition = Math.floor(Math.random() * (gameContainer.width() - 40));
        var car = $('<div>').addClass('car').css('top', '-60px').css('left', carPosition + 'px');
        gameContainer.append(car);
        cars.push(car);
    };

    var moveRoads = function() {
        // console.log("moving road...");
        var roads = $('.road');
        roads.each(function() {
                var topPosition = parseInt($(this).css('top'));
                $(this).css('top', topPosition + gameSpeed + 'px');
                if (topPosition >= gameContainer.height()) {
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
            var carPosition = parseInt(car.css('left'));
            car.css('top', carPosition + gameSpeed + 'px');

        };
    };

    var movePlayer = function() {
        // console.log("moving player...");
        $(document).keydown(function(e) {
            if (e.keyCode == 65) { // D
                    playerX -= movementInc;
                    player.css('left', playerX + 'px');
            } else if (e.keyCode == 68) { // A
                    playerX += movementInc;
                    player.css('left', playerX + 'px');
            } else if (e.keyCode == 87) { // W
                    playerY -= movementInc;
                    player.css('bottom', playerY + 'px');
            } else if (e.keyCode == 83) { // S
                    playerY += movementInc;
                    player.css('bottom', playerY + 'px');
            }
        });
    }

    var checkCollision = function() {
        // var roads = $('.road');
        var cars = $('.car');
        var playerTop = playerY + player.height();
        var playerBottom = playerY;
        var playerLeft = playerX;
        var playerRight = playerX + player.width();

        // roads.each(function() {
        //     var roadTop = parseInt($(this).css('top'));
        //     var roadBottom = roadTop + roadHeight;

        //     if (playerBottom >= roadTop && playerTop <= roadBottom) {
        //         var roadLeft = 0;
        //         var roadRight = gameContainer.width();

        //         if (
        //             (playerLeft >= roadLeft && playerLeft <= roadRight) ||
        //             (playerRight >= roadLeft && playerRight <= roadRight)
        //         ) {
        //             clearInterval(roadInterval);
        //             alert('Game Over!');
        //             location.reload();
        //         }
        //     }
        // });

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
    };


    var clearGame = function() {
        console.log("clearing game...");
        clearInterval(roadInterval);
        location.reload();
        isRunning = false;
    };

    var startGame = function() {
        console.log("starting game...");
        roadInterval = setInterval(function() {
            generateRoad(); 
            //   generateCar();
            moveRoads();
            //   moveCars();
            movePlayer();
            checkCollision();
        }, 100);
        isRunning = true;
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