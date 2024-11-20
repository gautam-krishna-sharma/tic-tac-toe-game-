const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const chooseXButton = document.getElementById('chooseX');
const chooseOButton = document.getElementById('chooseO');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let gameActive = true;
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let gameState = ['', '', '', '', '', '', '', '', ''];

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

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = `It's ${currentPlayer === 'X' ? player1 : player2}'s turn`;
};

const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Player ${currentPlayer === 'X' ? player1 : player2} has won!`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.innerHTML = `Game ended in a draw!`;
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handleCellClick = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('id').replace('cell-', ''));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

const handleRestartGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  player1 = '';
  player2 ='';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.innerHTML = '');
};

const handlePlayerSelection = (event) => {
  if (player1Input.value === '' || player2Input.value === '') {
    alert('Please enter names for both players!');
    return;
  }
  player1 = player1Input.value;
  player2 = player2Input.value;
  currentPlayer = event.target.id === 'chooseX' ? 'X' : 'O';
  statusDisplay.innerHTML = `It's ${currentPlayer === 'X' ? player1 : player2}'s turn`;
  chooseXButton.disabled = true;
  chooseOButton.disabled = true;
  player1Input.disabled = true;
  player2Input.disabled = true;
};

chooseXButton.addEventListener('click', handlePlayerSelection);
chooseOButton.addEventListener('click', handlePlayerSelection);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

statusDisplay.innerHTML = `Please enter player names and choose X or O to start the game.`;
