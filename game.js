function startGame() {
  const boardWidth = 16;
  const boardHeight = 16;

  const gameBoard = [];
  for(let i = 0; i < boardWidth; i++) {
    gameBoard[i] = [];

    for(let j = 0; j < boardHeight; j++) {
      // Start with randomly chosen cell state
      // Change to user input later
      if(Math.random() >= 0.3) {
        gameBoard[i][j] = "X";
      } else {
        gameBoard[i][j] = "O";
      }
    }
  }

  console.log(gameBoard);
}

startGame();