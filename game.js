function startGame() {
  const boardWidth = 32;
  const boardHeight = 32;

  const gameBoard = [];
  for(let i = 0; i < boardWidth; i++) {
    gameBoard[i] = [];

    for(let j = 0; j < boardHeight; j++) {
      // Start with randomly chosen cell state
      // Change to user input later
      if(Math.random() >= 0.4) {
        gameBoard[i][j] = "X";
      } else {
        gameBoard[i][j] = "O";
      }
    }
  }

  console.log(gameBoard);
  displayBoard(gameBoard);
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