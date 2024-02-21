// Disable (or hide) the tictactoe grid before the names are inserted
// Get the name for each player 
// Record that in their respective objects
// hide the form after all the names are inserted
// Enable (or show) the tictactoe grid again
// Instead of saying X starts or X turn make it say their names
// Make it say the winner's name when they win
// IIRC thats it


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

function createPlayer(symbol, name) {
    const getTurn = (callback) => {
        let clickableSquares = document.querySelectorAll(".tictactoe-square");

        clickableSquares.forEach((square, index) => {
            square.addEventListener('click', () => {
                console.log("CLICKED");
                callback(index);
            });
        });
    }

    const getName = (inputSymbol) => {
        const nameInput = document.querySelector(".name-input");
        const inputLegend = nameInput.querySelector("legend");
        const inputButton = nameInput.querySelector("button");
        const inputText = nameInput.querySelector("input");

        inputLegend.textContent = inputSymbol;
        inputButton.addEventListener("click", () => {
            name = inputText.value;
            console.log(name);
            nameInput.style.display = 'none';
        });

        return name;
    }
    return { symbol, name , getTurn };
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
        const turn = document.querySelector(".turn");
        displayBoardArray();

        const playTurn = () => {
            let player = gameFlow.playerList[currentPlayerIndex];

            player.getTurn((index) => {
                if (gameBoard.checkEmptySpace(index) && !gameOver) {
                    gameBoard.gameboardArray[index] = player.symbol;
                    displayBoardArray();

                    [gameOver, winnerSymbol] = gameBoard.checkWinCondition();

                    if (gameOver || gameBoard.gameboardArray.every(cell => cell !== '')) {
                        // Game over message
                        const message = document.querySelector(".message");
                        message.style.display = "block";

                        if (winnerSymbol) {
                            message.textContent = `${winnerSymbol} WINS!`;
                        } else {
                            message.textContent = "It's a draw!";
                        }
                    } else {
                        currentPlayerIndex = (currentPlayerIndex + 1) % gameFlow.playerList.length;
                        turn.textContent = `${gameFlow.playerList[currentPlayerIndex].symbol}'s turn`; 
                        displayBoardArray();
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
