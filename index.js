console.log("Connected...")

const gameBoard = (event) => {
  // here we want an array of places on the screen
  // give pieces an owner that way we track the winner
  console.log("making game board...")

};

const endGame = () => {
  // checks if there are three tiles horizontally, vertically, or diagonally
};

const addPiece = () => {
  // updates ownership of tiles in gameBoard object
};

const players = ((name) => {
  // players need--name, symbol, and turn
  this.add = function() {
    console.log("adding player...")
  }
  return {
    add
  }
})();

const domCache = () => {
  this.startGameButton = document.getElementById("new-game");
  this.gameBoardDisplay = document.getElementById("game-board");

  return {
    startGameButton,
    gameBoardDisplay
  };
}

const gameFlow = (() => {
  let playerOne = {};
  let playerTwo = {};

  const cached = domCache();

  //bindEvents
  cached.startGameButton.addEventListener("click", (e) => {
    e.preventDefault();
    players.add('player one')
    gameBoard();
  })

  //render

  // first get players
  // then display gameboard
  // bindevents
  // call endGame checker
  // clear board when game is over
})();
