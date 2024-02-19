// I need steve jobs on this code idk what im doing anymore 
const gameBoard = (() => {
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

    // This is probably unoptimized
    const startGameLoop = () => {
        let winnerSymbol;
        while (!gameOver) {
            for (let i = 0; i < playerList.length; i++) {
                let player = playerList[i];
                // Check for valid move
                let playerChoice;
                do {
                    playerChoice = player.getTurn();
                }
                while (!gameBoard.checkEmptySpace(playerChoice));

                gameBoard.gameboardArray[playerChoice] = player.symbol;                                                                         

                console.table(gameBoard.gameboardArray);

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

    return { playerList, startGameLoop };
})();

gameFlow.startGameLoop();