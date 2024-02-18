// TODO list after brainstorming a bit
// 1. Create a 3x3 grid - done
// 2. Assign an empty value to the parts of the grid that don't have a value - done
// 3. Assign symbols for each player object X and O - done
// 4. Create a list of player objects - done
// 5. Make a loop for each player's turn
// 6. Player inserts index in the console
// 7. Check if the index is already inserted
// 8. If yes, ask to insert again
// 9. Their respective symbol is inserted in the grid
// 10. Check if any victory condition has been met
// 11. If not, continue the game
// 12. If yes, find out which symbol made the victory
// 13. Announce who won

let xIsUsed = false;

const gameboard = (() => {
    const gameboardArray = [['','',''], ['','',''], ['','','']];
    return { gameboardArray };
})();

function createPlayer(symbol) {
    const getTurn = () => {
        return window.prompt("TICTACTOE INDEX: ");
    }
    return { symbol };
}

// Placeholder until i understand what this is supposed to do
const gameFlow = (() => {
    const playerList = [createPlayer('X'), createPlayer('O')];
    let gameOver = false;
    const gameLoop = () => {
        while (!gameOver) {
            playerList.forEach(player => {
                
            });
        }
    };
    return { playerList, };
})();
