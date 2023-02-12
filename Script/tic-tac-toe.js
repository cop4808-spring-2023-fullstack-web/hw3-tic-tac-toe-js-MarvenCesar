const statusDisplay = document.querySelector('.status');

let gameActive = true;
//Random Player Pick
let currentPlayer = Math.random() < 0.5 ? 'X' :'O';

const xScoreDisplay = document.querySelector('.Playerscore');
const oScoreDisplay = document.querySelector('.Computerscore');
let xScore = 0;
let oScore = 0;


let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();
//document.getElementById("Playerscore").innerHTML = xScore;
//document.getElementById("Computerscore").innerHTML = oScore

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

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
   
}

function handlePlayerChange() {
  
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function checkwin(){
    let roundWon = false;
    let winningSquares = [];
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningSquares = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        for (let i = 0; i < 3; i++) {
            let square = document.querySelector(`[data-cell-index="${winningSquares[i]}"]`);
            square.style.backgroundColor = "rgb(251,100,204)";}
            if (currentPlayer === "X") {
                xScore++;
                document.getElementById("Playerscore").innerHTML = xScore;
               // xScoreDisplay.innerHTML = `X: ${xScore}`;
            } else {
                oScore++;
                document.getElementById("Computerscore").innerHTML = oScore

               // oScoreDisplay.innerHTML = `O: ${oScore}`;
            }
    
            return;
        }
    

    
    
}
    

     

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
       
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
    }






function handleResultValidation() {
    
   checkwin();
   handlePlayerChange();
if (gameActive){
  handleComputerMove();
}

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
// Verifies if cell is available or not and if game is still active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    if (Math.random() < 0.5) {
        currentPlayer = "X";
      } else {
        currentPlayer = "O";
      }
      statusDisplay.innerHTML = currentPlayerTurn();
   // currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "rgb(255, 255, 255)");
   
    }


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
handlePlayerChange();


function handleComputerMove(){
   
    pickComputerMove();
    checkwin();
    handlePlayerChange();
}
function pickComputerMove(){

    while(true){
        //finds first available spot
        var m=Math.floor(Math.random()*8);
        if (gameState[m] =='') // looking for an empty slot
          break;

    }
    // m makes the move
    gameState[m]=currentPlayer;
    document.getElementById(m).innerHTML=currentPlayer;
    
}


