// script.js
const grid = document.getElementById('grid');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X'; // Starting player
let gameActive = true; // Game state
let board = Array(9).fill(null); // Game board

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !gameActive) {
        return; // Ignore if cell is filled or game is over
    }

    makeMove(index); // Player makes a move
}

// Make a move
function makeMove(index) {
    board[index] = currentPlayer; // Update board
    cells[index].textContent = currentPlayer; // Display current player's mark
    checkWinner(); // Check for a winner

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
}

// Check for a winner
function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false; // End game
            statusDisplay.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!board.includes(null)) {
        gameActive = false; // End game on draw
        statusDisplay.textContent = "It's a draw!";
    }
}

// Reset game
function resetGame() {
    gameActive = true; // Reset game state
    currentPlayer = 'X'; // Reset current player
    board.fill(null); // Clear board
    statusDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell content
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);