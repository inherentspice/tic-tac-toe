const gameBoard = (() => {
  // here we want an array of places on the screen
  // give pieces an owner that way we track the winner
  const gameBoardHolder = [];

  const createBoardPart = (id, value, coordinate) => ({
    id,
    value,
    coordinate,
  });

  const initializeGameBoard = () => {
    let counter = 0;
    while (gameBoardHolder.length < 9) {
      const coordinate = [Math.floor(counter / 3), counter % 3];
      gameBoardHolder.push(createBoardPart(counter, " ", coordinate));
      counter += 1;
    }
  };

  const modifyBoardPart = (id, playerValue) => {
    const boardIndex = gameBoardHolder.findIndex((part) => part.id === id);
    if (gameBoardHolder[boardIndex].value !== "x" && gameBoardHolder[boardIndex].value !== "o") {
      gameBoardHolder[boardIndex].value = playerValue;
    }
  };

  const resetBoard = () => {
    let counter = gameBoardHolder.length - 1;
    while (counter >= 0) {
      gameBoardHolder[counter].value = " ";
      counter -= 1;
    }
  };

  return {
    gameBoardHolder,
    modifyBoardPart,
    initializeGameBoard,
    resetBoard,
  };
})();

const players = (input) => {
  // players need--name, symbol, and turn
  const name = input.value || "computer";
  const symbol = input.id === "player-two" ? "o" : "x";
  const isTurn = input.id !== "player-two";
  const wins = 0;

  return {
    name,
    symbol,
    isTurn,
    wins,
  };
};

const domCache = () => {
  const startGameButton = document.getElementById("new-game");
  const gameBoardDisplay = document.getElementById("game-board");
  const playerOneInput = document.getElementById("player-one");
  const playerTwoInput = document.getElementById("player-two");
  const messageDisplay = document.getElementById("game-message");

  return {
    startGameButton,
    gameBoardDisplay,
    playerOneInput,
    playerTwoInput,
    messageDisplay,
  };
};

const gameFlow = (() => {
  let playerOne;
  let playerTwo;

  const cached = domCache();
  const gb = gameBoard;

  function resetBoard() {
    while (cached.gameBoardDisplay.firstChild) {
      cached.gameBoardDisplay.removeChild(cached.gameBoardDisplay.firstChild);
    }
    while (cached.messageDisplay.firstChild) {
      cached.messageDisplay.removeChild(cached.messageDisplay.firstChild);
    }
  }

  function render() {
    // first clear the existing entries so that this function doesn't duplicate entries

    resetBoard();

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
    const newDiv = document.createElement("div");
    const playerOneResults = document.createElement("p");
    const playerTwoResults = document.createElement("p");
    playerOneResults.className = "results";
    playerOneResults.textContent = (`${playerOne.name} has ${playerOne.wins} wins`);
    playerTwoResults.textContent = (`${playerTwo.name || "computer"} has ${playerTwo.wins} wins`);
    newDiv.appendChild(playerOneResults);
    newDiv.appendChild(playerTwoResults);
    cached.messageDisplay.appendChild(newDiv);
    cached.messageDisplay.className = "game-message";
  }

  function createWinWindow() {
    const playerCheck = playerOne.isTurn
      ? playerOne.name : playerTwo.name;
    if (playerOne.isTurn) {
      playerOne.wins += 1;
    } else {
      playerTwo.wins += 1;
    }
    alert(`${playerCheck || "computer"} won this round.`);
  }

  function endGame() {
    gb.resetBoard();
    render();
    createWinWindow();
  }

  function checkEndGame() {
    const symbCheck = playerOne.isTurn
      ? playerOne.symbol : playerTwo.symbol;
    const tieCheck = gb.gameBoardHolder.filter((square) => square.value === " ");
    const filteredGameBoard = gb.gameBoardHolder.filter((square) => square.value === symbCheck);
    let checkResult = false;
    filteredGameBoard.forEach((square) => {
      const horizontal = filteredGameBoard.filter((secondSquare) => secondSquare.coordinate[0]
        === square.coordinate[0]);
      const vertical = filteredGameBoard.filter((secondSquare) => secondSquare.coordinate[1]
        === square.coordinate[1]);
      if (horizontal.length === 3 || vertical.length === 3) {
        checkResult = true;
      }
      if (square.coordinate[0] === 1 && square.coordinate[1] === 1 && square.value === symbCheck) {
        const topLeft = filteredGameBoard.find((squareDiagonal) => squareDiagonal.coordinate[0]
          === 0 && squareDiagonal.coordinate[1]
          === 0);
        const bottomRight = filteredGameBoard.find((squareDiagonal) => squareDiagonal.coordinate[0]
          === 2 && squareDiagonal.coordinate[1]
          === 2);
        const topRight = filteredGameBoard.find((squareDiagonal) => squareDiagonal.coordinate[0]
          === 0 && squareDiagonal.coordinate[1]
          === 2);
        const bottomLeft = filteredGameBoard.find((squareDiagonal) => squareDiagonal.coordinate[0]
          === 2 && squareDiagonal.coordinate[1]
          === 0);
        if ((topLeft && bottomRight) || (topRight && bottomLeft)) {
          checkResult = true;
        }
      }
      return 1;
    });
    if (checkResult) {
      endGame();
    } else if (!tieCheck.length) {
      gb.resetBoard();
    }
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

  function computerMove() {
    const freeSpaces = gb.gameBoardHolder.filter((square) => square.value === " ");
    const newMove = Math.floor(Math.random(0, freeSpaces.length - 1) * (freeSpaces.length - 1));
    addPiece(freeSpaces[newMove].id);
    render();
  }

  function gameBindEvents() {
    document.body.addEventListener("click", (event) => {
      if (event.target.className === "game-square") {
        const id = Number(event.target.id);
        addPiece(id);
        render();
        setTimeout(() => { computerMove(); }, 1000);
      }
    });
  }

  // login bindEvents
  cached.startGameButton.addEventListener("click", (e) => {
    e.preventDefault();
    playerOne = players(cached.playerOneInput);
    playerTwo = players(cached.playerTwoInput);
    gb.initializeGameBoard();
    gameBindEvents();
    render();
  });
});

gameFlow();
