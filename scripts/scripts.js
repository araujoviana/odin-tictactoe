// TODO list after brainstorming a bit
// 1. Create a 3x3 grid - done
// 2. Assign an empty value to the parts of the grid that don't have a value - done
// 3. Assign symbols for each player object X and O - done
// 4. Create a list of player objects - done
// 5. Make a loop for each player's turn - done
// 6. Player inserts index in the console - done
// 7. Check if the index is already inserted
// 8. If yes, ask to insert again
// 9. Their respective symbol is inserted in the grid
// 10. Check if any victory condition has been met
// 11. If not, continue the game
// 12. If yes, find out which symbol made the victory
// 13. Announce who won

let xIsUsed = false;

const gameBoard = (() => {
    const gameboardArray = ['','','','','','','','',''];

    const checkEmptySpace = (index) => {
        return gameboardArray[index] == '';
    }    

    return { gameboardArray, checkEmptySpace };
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
        
        while (!gameOver) {
            playerList.forEach(player => {

                let playerChoice;
                do {
                    playerChoice = player.getTurn();
                }
                while (gameBoard.checkEmptySpace(playerChoice));

                gameBoard.gameboardArray[playerChoice] = player.symbol;
                
                // Check here for a win condition
            });
        }
    };

    return { playerList, startGameLoop };
})();
