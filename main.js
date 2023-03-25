
const cells = document.querySelectorAll('.cell');
const knopkaButton = document.querySelector('.knopka');
const playerTurn = document.querySelector('.natija div');
const movesList = document.querySelector('.natija ol');

let currentPlayer = 'X';
let moves = 0;

function checkForWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent && cells[a].textContent !== '') {
      return true;
    }
  }
  return false;
}

function handleMove(e) {
  if (e.target.textContent === '') {
    e.target.textContent = currentPlayer;
    moves++;
    movesList.innerHTML += `<li>MOVE ${moves}: ${currentPlayer} TO CELL ${Array.from(cells).indexOf(e.target)}</li>`;

    if (checkForWin()) {
      playerTurn.textContent = `${currentPlayer} - WINS!`;
      cells.forEach(cell => cell.removeEventListener('click', handleMove));
    } else if (moves === 9) {
      playerTurn.textContent = ``;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerTurn.textContent = `NEXT PLAYER: ${currentPlayer}`;
    }
  }
}

function knopkaGame() {
  currentPlayer = 'X';
  moves = 0;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleMove, {once: true});
  });
  playerTurn.textContent = `NEXT PLAYER: ${currentPlayer}`;
  movesList.innerHTML = `<li><button disabled="">GAME</button></li>`;
}

cells.forEach(cell => cell.addEventListener('click', handleMove));
knopkaButton.addEventListener('click', knopkaGame);
