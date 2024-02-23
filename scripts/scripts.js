// I will return to this code later when i figure out how deal with player's names via form :(
// For now a alert is good enough i guess

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
    let name = '';
  
    const getTurn = (callback) => {
        let clickableSquares = document.querySelectorAll(".tictactoe-square");

        clickableSquares.forEach((square, index) => {
            square.addEventListener('click', () => {
                callback(index);
            });
        });
    }


    // FIX THIS LATER
    const setName = () => {
        const nameInput = document.querySelector(".name-input");
        const inputLegend = nameInput.querySelector("legend");
        const inputButton = nameInput.querySelector("button");
        const inputText = nameInput.querySelector("input");

        inputLegend.textContent = symbol;
        inputButton.addEventListener("click", () => {
            name = inputText.value;
            console.log(`Got name for ${name} - ${symbol}`);
            nameInput.style.display = 'none';
        });
    }
    // setName();
    return { symbol, name, getTurn };
}

const gameFlow = (() => {
    let playerList = [];

    const createPlayers = () => {
        playerList = [createPlayer('X'), createPlayer('O')];
        playerList.forEach(player => {
            player.name = window.prompt(`${player.symbol}'s name: `)
        });
    };

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
        let gameOver = false;
        const turn = document.querySelector(".turn");
        displayBoardArray();

        const playTurn = () => {
            let player = playerList[currentPlayerIndex];

            player.getTurn((index) => {
                if (gameBoard.checkEmptySpace(index) && !gameOver) {
                    gameBoard.gameboardArray[index] = player.symbol;
                    displayBoardArray();

                    [gameOver, winnerSymbol] = gameBoard.checkWinCondition();

                    if (gameOver || gameBoard.gameboardArray.every(cell => cell !== '')) {
                        const message = document.querySelector(".message");
                        message.style.display = "block";

                        if (winnerSymbol) {
                            message.textContent = `${player.name} WINS!`;
                            gameFlow.addResetButton();
        
                        } else {
                            message.textContent = "It's a draw!";
                            gameFlow.addResetButton();
                        }
                    } else {
                        currentPlayerIndex = (currentPlayerIndex + 1) % playerList.length;
                        turn.textContent = `${playerList[currentPlayerIndex].name}'s turn`;
                        displayBoardArray();
                        playTurn();
                    }
                }
            });
        };

        createPlayers();
        playTurn();
    };

    const addResetButton = () => {
        const message = document.querySelector(".message");
        const resetButton = document.createElement('button');
        resetButton.textContent = "Reset";

        resetButton.addEventListener('click', () => {
            // It ain't much but its honest work
            location.reload();
        });
        
        message.appendChild(resetButton);
    };


    return { playerList, startGameLoop, displayBoardArray, addResetButton };
})();

gameFlow.startGameLoop();
