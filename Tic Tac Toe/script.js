document.addEventListener("DOMContentLoaded", function () {
    let currentPlayer = 'X'; // Player X always starts
    let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 game board
    let gameActive = true;
    var gameStatus = document.getElementById('status');

    function updateGameState(clickedCellIndex) {
        const cellElement = document.querySelector(`.cell:nth-child(${clickedCellIndex + 1})`);
        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            cellElement.style.backgroundColor = 'red';
            return;
        }
        gameBoard[clickedCellIndex] = currentPlayer;
        cellElement.textContent = currentPlayer;
        cellElement.style.backgroundColor = '';
    }

    function handlePlayerTurn(clickedCellIndex) {
        updateGameState(clickedCellIndex);
        endGame();
        document.querySelector('.player').textContent = currentPlayer === 'X' ? 'Player O\'s turn' : 'Player X\'s turn';
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    // Using event delegation for performance improvement
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', event => {
            const clickedCellIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
            handlePlayerTurn(clickedCellIndex);
            endGame();
        });
    });

    function endGame() {
        if (checkWin()) {
            gameStatus.textContent = `Player ${currentPlayer} wins!`;
            resetGame();
        } else if (!gameBoard.includes('')) {
            gameStatus.textContent = `It's a draw!`;
            resetGame();
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        document.querySelector('.player').textContent = ''; // Clear game status message
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.backgroundColor = '#fff';
            cell.textContent = '';
        });
    }
    document.getElementById('resetButton').addEventListener('click', resetGame);
});