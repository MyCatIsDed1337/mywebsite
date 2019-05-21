var isDead = false;
var isGamePaused = false;
var score = 0;
let gameLoop;

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var startMenuView = document.getElementById("startMenuView");
//canvas.appendChild(startMenuView);
startMenuView.style.top = "200px";
startMenuView.style.zIndex = "100000000";
var grid = 16;
var count = 0;
var snake = {
  x: 160,
  y: 160,
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,
  // keep track of all grids the snake body occupies
  cells: [],
  // length of the snake. grows when eating an apple
  maxCells: 1
};
var apple = {
  x: 320,
  y: 320
};

// Här ska allt i spelet ligga.
function game() {

  function loop() {
    gameLoop = requestAnimationFrame(loop);
    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 4) {
      return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    // move snake by it's velocity
    snake.x += snake.dx;
    snake.y += snake.dy;
    // wrap snake position horizontally on edge of screen
    if (snake.x < 0) {
      cancelAnimationFrame(gameLoop);
      //snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      cancelAnimationFrame(gameLoop);
      //snake.x = 0;
    }
    // wrap snake position vertically on edge of screen
    if (snake.y < 0) {
      cancelAnimationFrame(gameLoop);
      //snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      cancelAnimationFrame(gameLoop);
      //snake.y = 0;
    }
    // keep track of where snake has been. front of the array is always the head
    snake.cells.unshift({ x: snake.x, y: snake.y });
    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
    // draw apple
    context.fillStyle = '#D85757';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    // draw snake one cell at a time
    context.fillStyle = '#0CFF00';
    snake.cells.forEach(function (cell, index) {
      // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      // snake ate apple
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        score += 1;
        countScore.innerText = score;
        // canvas is 400x400 which is 25x25 grids
        apple.x = getRandomInt(0, canas.width/grid) * grid;
        apple.y = getRandomInt(0, canvas.height/grid) * grid;
      }
      // check collision with all cells after this one (modified bubble sort)
      for (var i = index + 1; i < snake.cells.length; i++) {
        // snake occupies same space as a body part. reset game
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          isDead = true;
          cancelAnimationFrame(gameLoop);
          showGameOverView();
        }
      }
    });
  }
}

// Play knappen saker
function onPlayBtnPress() {
  if (isDead === true)
    myFunction();
}
// 
function onScoreBtnPress() {

}

function pauseMenu() {
  isDead = true;
  onPlayBtnPress = function () {
    myFunction();
  }
}

function steeringControl() {
  document.addEventListener('keydown', function (event) {
    // "W" key or arrow up
    if ((e.which === 38 && snake.dy === 0) || (e.which === 87 && snake.dy === 0)) {
      snake.dy = -grid;
      snake.dx = 0;
      // "S" key or arrow down
    } else if ((e.which === 83 && snake.dy === 0) || (e.which === 40 && snake.dy === 0)) {
      snake.dy = grid;
      snake.dx = 0;
      // "A" ker or arrow left
    } else if ((e.which === 65 && snake.dx === 0) || (e.which === 37 && snake.dx === 0)) {
      snake.dx = -grid;
      snake.dy = 0;
      // "D" key or arrow right
    } else if ((e.which === 68 && snake.dx === 0) || (e.which === 39 && snake.dx === 0)) {
      snake.dx = grid;
      snake.dy = 0;
    }
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function showStartMenu() {
  isDead = true;
  document.getElementById(onPlayBtnPress) = function game() {
    startMenuView.style.top = "-400px";
  }

}

//function showGameOverView() {
  //isDead = true;
  //var playBtn = document.getElementById("btnGameOverStart");
  //var gameOverDiv = document.getElementById("gameOverView");
  //gameOverDiv.style.top = "300px";
  //playBtn.onclick = function () {
  //gameOverDiv.style.top = "-300px";
  //myFunction();
  //}
//}