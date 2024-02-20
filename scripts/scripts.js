// Build the grid on screen DONE
// Clean up this mess
// Change get turn for click instead of alert prompts - DONE
// On click on a grid element, place it based on its index
// Remove old alert stuff

const gameBoard = (() => {
    // TEMPORARY
    //const gameboardArray = ['X','X','X','X','X','X','X','X','X'];
    const gameboardArray = ['','','','','','','','',''];

    const checkEmptySpace = (index) => {
        return gameboardArray[index] == '';
    }    

    const checkWinCondition = () => {
        let winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

        const CheckEqualSymbol = (x, y, z) => {
            return gameboardArray[x] == gameboardArray[y] && gameboardArray[y] == gameboardArray[z] && gameboardArray[x] != '';
        }
        
        for(let i = 0; i < winningCombinations.length; i++) {
            let [x, y, z] = winningCombinations[i];
            if(CheckEqualSymbol(x, y, z)) {
                return [true, gameboardArray[x]];
            }
        }
        return [false, null];

    };
   
    return { gameboardArray, checkEmptySpace, checkWinCondition };
})();

function createPlayer(symbol) {
    const getTurn = (callback) => {
        let clickableSquares = document.querySelectorAll(".tictactoe-square");
    
        clickableSquares.forEach((square, index) => {
            square.addEventListener('click', () => {
                callback(index);
            });
        });
    }    
    return { symbol, getTurn };
}

const gameFlow = (() => {
    const playerList = [createPlayer('X'), createPlayer('O')];

    let gameOver = false;

    const displayBoardArray = () => {
        let tictactoeGrid = document.querySelector('.tictactoe-container');
        tictactoeGrid.innerHTML = '';

        gameBoard.gameboardArray.forEach(element => {
            let tictactoeSquare = document.createElement('div');
            tictactoeSquare.textContent = element;
            tictactoeSquare.classList.add('tictactoe-square');
            tictactoeGrid.appendChild(tictactoeSquare);
        });
    }

    // Changed to recursive using callback instead of whatever i was doing
    const startGameLoop = () => {
        let winnerSymbol;
        let currentPlayerIndex = 0;
    
        const playTurn = () => {
            let player = gameFlow.playerList[currentPlayerIndex];
    
            getTurn((index) => {
                if (gameBoard.checkEmptySpace(index)) {
                    gameBoard.gameboardArray[index] = player.symbol;
                    displayBoardArray();
    
                    [gameOver, winnerSymbol] = gameBoard.checkWinCondition();
    
                    if (gameOver || gameBoard.gameboardArray.every(cell => cell !== '')) {
                        if (winnerSymbol) {
                            console.log(`${winnerSymbol} WINS!`);
                        } else {
                            console.log("It's a draw!");
                        }
                    } else {
                        currentPlayerIndex = (currentPlayerIndex + 1) % gameFlow.playerList.length;
                        playTurn(); // Recursive call for the next turn
                    }
                }
            });
        };
    
        playTurn(); // Start the first turn
    };

    return { playerList, startGameLoop, displayBoardArray };
})();

gameFlow.startGameLoop();