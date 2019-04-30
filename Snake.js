var isDead = true;
var isGamePaused = false;
var score = 0;

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
    requestAnimationFrame(loop);
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
      snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      snake.x = 0;
    }
    // wrap snake position vertically on edge of screen
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      snake.y = 0;
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
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
      // check collision with all cells after this one (modified bubble sort)
      for (var i = index + 1; i < snake.cells.length; i++) {
        // snake occupies same space as a body part. reset game
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          isDead = true;
          showGameOverView();
        }
      }
    });
  }

  // listen to keyboard events to move the snake
  document.addEventListener('keydown', function (e) {
    // prevent snake from backtracking on itself by checking that it's
    // not already moving on the same axis (pressing left while moving
    // left won't do anything, and pressing right while moving left
    // shouldn't let you collide with your own body)
    // left arrow key
    if (e.which === 37 && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    } // keyboard button "A"
    else if (e.which === 65 && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }// keyboard button "W"
    else if (e.which === 87 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }// keyboard button "D"
    else if (e.which === 68 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }// keyboard button "S"
    else if (e.which === 83 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });
}

// Play knappen saker
function onPlayBtnPress() {
  if(isDead === false)
    myFunction();
}
// 
function onScoreBtnPress() {

}

function myFunction() {
  requestAnimationFrame(loop);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function showStartMenu(){
  

}

function showGameOverView() {
  isDead = true;
  var playBtn = document.getElementById("btnGameOverStart");
  var gameOverDiv = document.getElementById("gameOverView");
  gameOverDiv.style.top = "300px";
  playBtn.onclick = function () {
    gameOverDiv.style.top = "-300px";
    myFunction();
  }
}