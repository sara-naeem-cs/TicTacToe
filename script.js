document.addEventListener('DOMContentLoaded', () => {
    //Function to update board on click.
    const startButton = document.getElementById('start-game-btn');
    const restartButton = document.getElementById('restart-btn');
  
  
  
    const PlayerFactory = (name, mark, turn) => {
      const getName = () => name;
      const getMark = () => mark;
      const getTurn = () => turn;
      const setTurn = (updatedTurn) => {
        //We set the player's turn as either true or false. 
        turn = updatedTurn
      };
      return {
        getName,
        getMark,
        getTurn,
        setTurn
      };
    };
  
    const p1 = PlayerFactory("p1", "X", true);
    const p2 = PlayerFactory("p2", "O", false);
    let currentPlayer = p1;
  
    const GameboardModule = (() => {
      //Define the player factory object inside Gameboard.
  
      //Define the gameboard qualities:
      let gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
  
      let totalTurns = gameboard.length * gameboard.length;
  
      const getGameboard = () => gameboard;
      const resetGameboard = () => {
        gameboard = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ];
      };
  
      const checkDiagonalThreeInRow = (matrix) => {
        const rows = matrix.length;
        const cols = matrix[0].length;
  
        // Check diagonals from top-left to bottom-right
        for (let i = 0; i < rows - 2; i++) {
          for (let j = 0; j < cols - 2; j++) {
            if (
              matrix[i][j] === matrix[i + 1][j + 1] &&
              matrix[i + 1][j + 1] === matrix[i + 2][j + 2] && matrix[i][j] != ""
            ) {
              return true;
            }
          }
        }
        return false;
      };
  
      const checkIdenticalThreeInRowOrColumn = (matrix) => {
        const rows = matrix.length;
        const cols = matrix[0].length;
  
        // Check rows
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols - 2; j++) {
            if (
              matrix[i][j] === matrix[i][j + 1] &&
              matrix[i][j + 1] === matrix[i][j + 2] && matrix[i][j] != ""
            ) {
              return true;
            }
          }
        }
  
        // Check columns
        for (let j = 0; j < cols; j++) {
          for (let i = 0; i < rows - 2; i++) {
            if (
              matrix[i][j] === matrix[i + 1][j] &&
              matrix[i + 1][j] === matrix[i + 2][j] && matrix[i][j] != ""
            ) {
              return true;
            }
          }
        }
  
        return false;
      };
  
      const win = () => {
        //We want to check to see if there's a win
        //check all diagonals, rows, and columns:
        return checkDiagonalThreeInRow(gameboard) || checkIdenticalThreeInRowOrColumn(gameboard);
  
        //Check to see if there's a draw. 
      };
  
      const updateTotalTurns = () => {
        totalTurns = totalTurns - 1;
        return totalTurns;
      };
  
      const updateBoard = (row, column, mark) => {
        //If we're given a row and column, and mark which we use to update the gamebaord. 
        gameboard[row][column] = mark
      };
  
      //Start game could be added here. 
  
      const renderBoard = () => {
        let boardHTML = "";
        const rows = gameboard.length;
        const cols = gameboard[0].length;
  
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            boardHTML += `<div class="square" id="square-${i}${j}">${gameboard[i][j]}</div>`
            //boardHTML += `<div class="square" id="square-${i}${j}">X</div>`
          }
        }
        document.getElementById("board").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
          square.addEventListener("click", handleClick);
        });
      };
  
      return {
        //List all the public functions here. 
        getGameboard,
        updateBoard,
        win,
        resetGameboard,
        renderBoard,
        updateTotalTurns
      };
    })();
  
  
    const handleClick = (event) => {
      //We need a way to keep track of which one we're clicking. 
      //We get info from event (ex. target gives us html element that's clicked)
      let index = event.target.id.split("-")[1];
      console.log(index);
      let row = index[0];
      let column = index[1];
      console.log(row, column);
  
  
      GameboardModule.updateBoard(row, column, currentPlayer.getMark());
      GameboardModule.renderBoard();
  
  
      let totalPlays = GameboardModule.updateTotalTurns();
      console.log("Total plays:", totalPlays);
      //Keep track of how many clicks have taken place. 
      if (totalPlays == 0) {
        console.log("Draw!");
        
        document.getElementById("game-status").innerHTML = "Draw! (You both lose!)";
        restartButton.style.display = 'block';
  
  
      } else if (GameboardModule.win()) {
        console.log("Win!");
        document.getElementById("game-status").innerHTML = "Player " + currentPlayer.getName() + " wins!";
        restartButton.style.display = 'block';
      }
  
      if (currentPlayer == p1) {
        currentPlayer = p2;
      } else {
        currentPlayer = p1;
      }
    }
  
  
    startButton.addEventListener('click', () => {
      // When there is a "click"
      // it shows an alert in the browser
      startButton.style.display = 'none';
      document.getElementById("board").style.display = 'grid';
      GameboardModule.renderBoard();
  
    });
  
  
    const restartGame = () => {
      GameboardModule.resetGameboard();
      GameboardModule.renderBoard();
      currentPlayer = p1;
      document.getElementById("board").style.display = 'none';
      restartButton.style.display = 'none';
      document.getElementById("game-status").innerHTML = "";
      startButton.style.display = 'block';
    };
  
    restartButton.addEventListener('click', restartGame);
  
  
  
  });
  