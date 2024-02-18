// I need steve jobs on this code idk what im doing anymore 
const gameBoard = (() => {
    const gameboardArray = ['','','','','','','','',''];

    const checkEmptySpace = (index) => {
        return gameboardArray[index] == '';
    }    


    const checkWinCondition = () => {
        let winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

        const CheckEqualSymbol = (x, y, z) => {
            return gameBoard.gameboardArray[x] == gameBoard.gameboardArray[y] && gameBoard.gameboardArray[y] == gameBoard.gameboardArray[z];
        }
        
        for(let i = 0; i < winningCombinations.length; i++) {
            let [x, y, z] = winningCombinations[i];
            if(CheckEqualSymbol(x, y, z)) {
                return [true, gameBoard.gameboardArray[x]];
            }
        }
        return [false, null];

    };
   
    return { gameboardArray, checkEmptySpace, checkWinCondition };
})();

function createPlayer(symbol) {
    const getTurn = () => {
        return Number(window.prompt("TICTACTOE INDEX: "));
    }
    return { symbol, getTurn };
}

const gameFlow = (() => {
    const playerList = [createPlayer('X'), createPlayer('O')];

    let gameOver = false;

    // This is probably unoptimized
    const startGameLoop = () => {
        let winnerSymbol;
        while (!gameOver) {
            playerList.forEach(player => {

                // Check for valid move
                let playerChoice;
                do {
                    playerChoice = player.getTurn();
                }
                while (!gameBoard.checkEmptySpace(playerChoice));

                gameBoard.gameboardArray[playerChoice] = player.symbol;                                                                         

                console.log(gameBoard.gameboardArray);

                [gameOver, winnerSymbol] = gameBoard.checkWinCondition();
            });
        }
        return winnerSymbol;
    };

    return { playerList, startGameLoop };
})();

console.log(`${gameFlow.startGameLoop()} WINS!`);