const gameBoard = (() => {
  // here we want an array of places on the screen
  // give pieces an owner that way we track the winner
  const gameBoardHolder = [];

  const createBoardPart = (id, value) => ({
    id,
    value,
  });

  const initializeGameBoard = () => {
    let counter = 0;
    while (gameBoardHolder.length < 9) {
      gameBoardHolder.push(createBoardPart(counter, " "));
      counter += 1;
    }
  };

  const modifyBoardPart = (id, playerValue) => {
    const boardIndex = gameBoardHolder.findIndex((part) => part.id === id);
    if (gameBoardHolder[boardIndex].value !== "x" && gameBoardHolder[boardIndex].value !== "o") {
      gameBoardHolder[boardIndex].value = playerValue;
    }
  };

  return {
    gameBoardHolder,
    modifyBoardPart,
    initializeGameBoard,
  };
})();

const endGame = () => {
  // checks if there are three tiles horizontally, vertically, or diagonally
  console.log("ending game...");
};

const Players = (input) => {
  // players need--name, symbol, and turn
  const name = input.value;
  const symbol = input.id === "player-two" ? "x" : "o";
  const isTurn = false;

  return {
    name,
    symbol,
    isTurn,
  };
};

const domCache = () => {
  const startGameButton = document.getElementById("new-game");
  const gameBoardDisplay = document.getElementById("game-board");
  const playerOneInput = document.getElementById("player-one");
  const playerTwoInput = document.getElementById("player-two");

  return {
    startGameButton,
    gameBoardDisplay,
    playerOneInput,
    playerTwoInput,
  };
};

const gameFlow = (() => {
  let playerOne;
  let playerTwo;

  const cached = domCache();
  const gb = gameBoard;

  function render() {
    // first clear the existing entries so that this function doesn't duplicate entries

    (function resetBoard() {
      while (cached.gameBoardDisplay.firstChild) {
        cached.gameBoardDisplay.removeChild(cached.gameBoardDisplay.firstChild);
      }
    }());

    gb.gameBoardHolder.map((square) => {
      const newDiv = document.createElement("div");
      newDiv.id = `${square.id}`;
      newDiv.className = "game-square";
      const symbol = document.createElement("p");
      symbol.className = "game-symbol";
      symbol.textContent = square.value;
      newDiv.appendChild(symbol);
      cached.gameBoardDisplay.appendChild(newDiv);

      return square;
    });
  }

  function checkEndGame() {
    console.log(gb.gameBoardHolder.slice(0, 3));
  }
  function addPiece(id) {
    gb.modifyBoardPart(
      id,
      playerOne.isTurn
        ? playerOne.symbol : playerTwo.symbol,
    );
    playerOne.isTurn = !playerOne.isTurn;
    playerTwo.isTurn = !playerTwo.isTurn;
    checkEndGame();
  }

  // game bindevents
  function gameBindEvents() {
    document.body.addEventListener("click", (event) => {
      if (event.target.className === "game-square") {
        addPiece(Number(event.target.id));
        render();
      }
    });
  }

  // login bindEvents
  cached.startGameButton.addEventListener("click", (e) => {
    e.preventDefault();
    playerOne = Players(cached.playerOneInput);
    playerTwo = Players(cached.playerTwoInput);
    gb.initializeGameBoard();
    gameBindEvents();
    render();
  });

  endGame();
})();
