console.log("Connected...");

const gameBoard = () => {
  // here we want an array of places on the screen
  // give pieces an owner that way we track the winner
  console.log("making game board...");
};

const endGame = () => {
  // checks if there are three tiles horizontally, vertically, or diagonally
  console.log("ending game...");
};

const addPiece = () => {
  // updates ownership of tiles in gameBoard object
  console.log("adding piece...");
};

const players = (() => {
  // players need--name, symbol, and turn
  const add = () => {
    console.log("adding player...");
  };
  return {
    add,
  };
})();

const domCache = () => {
  const startGameButton = document.getElementById("new-game");
  const gameBoardDisplay = document.getElementById("game-board");

  return {
    startGameButton,
    gameBoardDisplay,
  };
};

const gameFlow = (() => {
  const playerOne = {};
  const playerTwo = {};

  const cached = domCache();

  // bindEvents
  cached.startGameButton.addEventListener("click", (e) => {
    e.preventDefault();
    players.add("player one");
    gameBoard();
  });

  console.log(playerOne);
  console.log(playerTwo);
  addPiece();
  endGame();

  // render
  // first get players
  // then display gameboard
  // bindevents
  // call endGame checker
  // clear board when game is over
})();

gameFlow();
