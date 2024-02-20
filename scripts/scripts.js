// Build the grid on screen DONE
// Clean up this mess
// Change get turn for click instead of alert prompts
// On click on a grid element, place it based on its index
// Remove old alert stuff

const gameBoard = (() => {
    // TEMPORARY
    const gameboardArray = ['X','X','X','X','X','X','X','X','X'];
    // const gameboardArray = ['','','','','','','','',''];

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
    const getTurn = () => {
        let playerMove;
        do {
            playerMove = Number(window.prompt("TICTACTOE INDEX: ")); 
        }
        while(playerMove > gameBoard.gameboardArray.length || playerMove < 0);

        return playerMove;
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

    // This is probably unoptimized
    const startGameLoop = () => {
        let winnerSymbol;
        while (!gameOver) {
            for (let i = 0; i < playerList.length; i++) {
                let player = playerList[i];
                // Check for valid move
                let playerChoice;
                do {
                    // temporary
                     // playerChoice = player.getTurn();
                     break;
                }
                while (!gameBoard.checkEmptySpace(playerChoice));

                gameBoard.gameboardArray[playerChoice] = player.symbol;                                                                         

                console.table(gameBoard.gameboardArray);
                displayBoardArray();

                [gameOver, winnerSymbol] = gameBoard.checkWinCondition();
                
                // I forgot about the existence of the 'every' function
                if (gameOver || gameBoard.gameboardArray.every(cell => cell !== '')) {
                    break;
                }
            };
        }
        if (winnerSymbol) {
            console.log(`${winnerSymbol} WINS!`);
        }
        else {
            if (gameBoard.gameboardArray.every(cell => cell !== '')) {
                console.log("It's a draw!");
            }
        } 
    };

    return { playerList, startGameLoop, displayBoardArray };
})();

gameFlow.startGameLoop();