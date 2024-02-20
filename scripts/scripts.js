const gameBoard = (() => {
    const gameboardArray = ['', '', '', '', '', '', '', '', ''];

    const checkEmptySpace = (index) => {
        return gameboardArray[index] === '';
    }

    const checkWinCondition = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const checkEqualSymbol = (x, y, z) => {
            return gameboardArray[x] === gameboardArray[y] && gameboardArray[y] === gameboardArray[z] && gameboardArray[x] !== '';
        }

        for (const combination of winningCombinations) {
            const [x, y, z] = combination;
            if (checkEqualSymbol(x, y, z)) {
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
                console.log("CLICKED");
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

    const startGameLoop = () => {
        let winnerSymbol;
        let currentPlayerIndex = 0;
        displayBoardArray();

        const playTurn = () => {
            let player = gameFlow.playerList[currentPlayerIndex];

            player.getTurn((index) => {
                if (gameBoard.checkEmptySpace(index) && !gameOver) {
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

        playTurn();
    };

    return { playerList, startGameLoop, displayBoardArray };
})();

gameFlow.startGameLoop();
