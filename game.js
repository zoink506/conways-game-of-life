function startGame() {
  const boardWidth = 16;
  const boardHeight = 16;

  const gameBoard = [];
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

  game(gameBoard);
}

function game(startingBoard) {
  console.log("game()");

  let board = startingBoard;
  board = round(board);
}

function round(board) {
  console.log("round()");

  displayBoard(board);
  board = updateCells(board);
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

function updateCell(board, cellX, cellY) {
  console.log("updateCell()");
  return "test";
  // check neighbouring cells
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