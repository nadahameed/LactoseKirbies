$(document).ready(function() {
  var gameContainer = $('#game-container');
  var player = $('.player');
  const roadHeight = 60;
  const gameSpeed = 5;
  const movementInc = 60;
  var roadInterval;
  var playerX = 240;
  var playerY = 0;
  var cars = [];

  function clearGame() {

  }

  function generateRoad() {
    console.log("generating road...");
      var road = $('<div>').addClass('road').css('top', '-20px');
      gameContainer.append(road);
  }

  function generateCar() {
    console.log("generating car...");
      var carPosition = Math.floor(Math.random() * (gameContainer.width() - 40));
      var car = $('<div>').addClass('car').css('top', '-60px').css('left', carPosition + 'px');
      gameContainer.append(car);
      cars.push(car);
  }

  function moveRoads() {
    console.log("moving road...");
      var roads = $('.road');
      roads.each(function() {
          var topPosition = parseInt($(this).css('top'));
          $(this).css('top', topPosition + gameSpeed + 'px');
          if (topPosition >= gameContainer.height()) {
              $(this).remove();
          }
      });
  }

  function moveCars() {
    console.log("moving car...");
      for (var i = 0; i < cars.length; i++) {
          var car = cars[i];
          var topPosition = parseInt(car.css('top'));
          car.css('top', topPosition + gameSpeed + 'px');
          if (topPosition >= gameContainer.height()) {
              car.remove();
              cars.splice(i, 1);
              i--;
          }
      }
  }

  function movePlayer() {
    console.log("moving player...");
      $(document).keydown(function(e) {
          if (e.keyCode == 37) { // Left arrow key
              playerX -= movementInc;
              player.css('left', playerX + 'px');
          } else if (e.keyCode == 39) { // Right arrow key
              playerX += movementInc;
              player.css('left', playerX + 'px');
          } else if (e.keyCode == 38) { // Up arrow key
              playery
              player.css('bottom', '+=50px');
          } else if (e.keyCode == 40) { // Down arrow key
              player.css('bottom', '-=50px');
          }
      });
  }

  function checkCollision() {
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
              clearInterval(roadInterval);
              alert('Game Over!');
              location.reload();
          }
      });
  }

  roadInterval = setInterval(function() {
      generateRoad();
      generateCar();
      moveRoads();
      moveCars();
      movePlayer();
      checkCollision();
  }, 100);
});
