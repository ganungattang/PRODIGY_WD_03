// script.js
const grid = document.getElementById('grid');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X'; 
let gameActive = true; 
let board = Array(9).fill(null); 

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

    makeMove(index); 
}

// Make a move
function makeMove(index) {
    board[index] = currentPlayer; 
    cells[index].textContent = currentPlayer; 
    checkWinner(); 

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
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
    gameActive = true; 
    currentPlayer = 'X'; 
    board.fill(null); 
    statusDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = ''; 
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);
