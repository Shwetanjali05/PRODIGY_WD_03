const board = document.getElementById('board');
const status = document.getElementById('status');
const modeSelect = document.getElementById('modeSelect');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'human'; // Default mode: human vs. human

// Function to handle cell clicks
function cellClicked(cellIndex) {
  if (!gameActive || gameState[cellIndex] !== '') return;

  gameState[cellIndex] = currentPlayer;
  document.getElementById(`cell${cellIndex}`).innerText = currentPlayer;
  
  checkGameStatus();
  
  if (gameMode === 'human') {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  } else {
    if (gameActive) {
      makeAIMove();
      checkGameStatus();
    }
  }
}

// Function to check game status (win/draw)
function checkGameStatus() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      status.innerText = `Player ${gameState[a]} wins!`;
      return;
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    status.innerText = "It's a draw!";
    return;
  }

  if (gameMode === 'ai' && currentPlayer === 'O' && gameActive) {
    makeAIMove();
    checkGameStatus();
  }

  status.innerText = `Player ${currentPlayer}'s turn`;
}

// Function to reset the game
function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.innerText = `Player ${currentPlayer}'s turn`;
  // Clear the board
  board.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

// Function to make a move for the AI
function makeAIMove() {
  let availableMoves = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === '') {
      availableMoves.push(i);
    }
  }

  // Choose a random available move for simplicity (you can implement a more advanced AI)
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  const aiMove = availableMoves[randomIndex];
  
  gameState[aiMove] = 'O'; // AI moves as 'O'
  document.getElementById(`cell${aiMove}`).innerText = 'O';
  currentPlayer = 'X'; // Switch back to human player
}

// Event listener for game mode selection
modeSelect.addEventListener('change', function(event) {
  gameMode = event.target.value;
  resetGame();
});

// Generate the game board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('id', `cell${i}`);
  cell.addEventListener('click', () => cellClicked(i));
  board.appendChild(cell);
}

status.innerText = `Player ${currentPlayer}'s turn`;
