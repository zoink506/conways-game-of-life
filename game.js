// X = Active
// 0 = Disactive

Object.defineProperties(Array.prototype, {
  count: {
    value: function(query) {
      // counts the amount of occurrences of the given value in the array

      let n = 0;
      for(let i = 0; i < this.length; i++) {
        if(this[i] === query) {
          n++;
        }
      }
      return n;
    }
  }
});

function startGame() {
  const boardWidth = 8;
  const boardHeight = 8;

  let gameBoard = [];
  for(let i = 0; i < boardWidth; i++) {
    gameBoard[i] = [];

    for(let j = 0; j < boardHeight; j++) {
      // Start with randomly chosen cell state
      // Change to user input later
      if(Math.random() >= 0.5) {
        gameBoard[i][j] = "X";
      } else {
        gameBoard[i][j] = "O";
      }
    }
  }

  let boardHistory = [];
  boardHistory.push(gameBoard);
  displayBoard(gameBoard);
  //board = round(board);

  window.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') {
      console.log("arrow left");
      if(boardHistory.length > 1) {
        console.log("board reverting...");
        boardHistory.pop();
        gameBoard = boardHistory[boardHistory.length - 1];
        displayBoard(gameBoard);
      }

    } else if(e.key === 'ArrowRight') {
      gameBoard = nextRound(gameBoard);
      boardHistory.push(gameBoard);
      console.log(boardHistory);
    }
  });
}

function previousRound() {
  console.log('previousRound()');
}

function nextRound(board) {
  console.log("nextRound()");

  board = updateCells(board);
  displayBoard(board);
  console.log(board);
  return board;
}

function updateCells(board) {
  console.log("updateCells()");

  const newBoard = [];
  for(let i = 0; i < board.length; i++) {
    newBoard[i] = [];

    for(let j = 0; j < board[i].length; j++) {
      newBoard[i][j] = "O";
    }
  }

  for(let k = 0; k < board.length; k++) {
    for(let n = 0; n < board[k].length; n++) {
      newBoard[k][n] = updateCell(board, k, n);
    }
  }

  return newBoard;
}

function updateCell(board, cellY, cellX) {
  // check neighbouring cells
  const currentCell = board[cellY][cellX];
  console.log(`%cx: ${cellX}, y: ${cellY}`, 'font-weight: bold');
  console.log(currentCell);

  // use these variables to determine whether the current cell needs to be alive or dead according to the rules
  const neighbourCells = findNeighbourCells(board, cellX, cellY);
  console.log(neighbourCells);

  /*
    RULES:
      Populated Cells:
        > Each cell with one or no neighbors dies, as if by solitude
        > Each cell with four or more neighbors dies, as if by overpopulation
        > Each cell with two or three neighbors survives

      Unpopulated Cells:
        > Each cell with three neighbors becomes populated
  */

  if(currentCell === "X") {
    // Cell is active
    
    if(neighbourCells.count('X') <= 1) {
      return 'O';
    } else if(neighbourCells.count('X') >= 4) {
      return 'O';
    } else if(neighbourCells.count('X') === 2 || neighbourCells.count('X') === 3) {
      return 'X';
    }

  } else {
    // Cell is disactive
    if(neighbourCells.count('X') === 3 ) {
      return 'X';
    }

    return 'O';
  }
}

function findNeighbourCells(board, cellX, cellY) {
  // 8 neighbouring cells in an array
  // clockwise starting from the top left around to the middle left
  // first, check if the neighbouring cell is within the confines of the board
  // then, either assign the var to the neighbouring cell or keep it null (null represents outside of array bounds)

  let topLeft = null;
  if(cellY-1 in board && cellX-1 in board[cellY-1]) {
    topLeft = board[cellY-1][cellX-1];
  }

  let topMiddle = null;
  if(cellY-1 in board && cellX in board[cellY-1]) {
    topMiddle = board[cellY-1][cellX];
  }

  let topRight = null;
  if(cellY-1 in board && cellX+1 in board[cellY-1]) {
    topRight = board[cellY-1][cellX+1];
  }

  let middleRight = null;
  if(cellY in board && cellX+1 in board[cellY]) {
    middleRight = board[cellY][cellX+1];
  }

  let bottomRight = null;
  if(cellY+1 in board && cellX+1 in board[cellY+1]) {
    bottomRight = board[cellY+1][cellX+1];
  }
  
  let bottomMiddle = null;
  if(cellY+1 in board && cellX in board[cellY+1]) {
    bottomMiddle = board[cellY+1][cellX];
  }

  let bottomLeft = null;
  if(cellY+1 in board && cellX-1 in board[cellY+1]) {
    bottomLeft = board[cellY+1][cellX-1];
  }

  let middleLeft = null;
  if(cellY in board && cellX-1 in board[cellY]) {
    middleLeft = board[cellY][cellX-1];
  }

  const neighbours = [
    topLeft,       // top left      | 0
    topMiddle,     // top middle    | 1
    topRight,      // top right     | 2
    middleRight,   // middle right  | 3
    bottomRight,   // bottom right  | 4
    bottomMiddle,  // bottom middle | 5
    bottomLeft,    // bottom left   | 6
    middleLeft     // middle left   | 7
  ];
  
  return neighbours;
}

function displayBoard(board) {
  const gameBoardElement = document.getElementById("game-board");
  gameBoardElement.innerHTML = "";
  
  for(let i = 0; i < board.length; i++) {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.id = `row-${i}`;

    for(let j = 0; j < board[i].length; j++) {
      const newCell = document.createElement("div");
      newCell.classList.add("cell");
      newCell.id = `row-${i}-column-${j}`;

      if(board[i][j] == "X") {
        newCell.classList.add("active");
      } else {
        newCell.classList.add("disactive");
      }

      newRow.append(newCell);
    }

    // place newRow into #game-board div
    gameBoardElement.append(newRow);
  }
}

startGame();
