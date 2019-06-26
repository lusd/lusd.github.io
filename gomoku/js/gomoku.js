let canvas = document.getElementById('battlefield').getContext('2d');
let isCross = true; // turn to move
let isFin = false; // checking if game is win or lose.
let fieldSize = 19; // size of field (don't change)
let cellSize = 30; // size of 1 cell is 30px; (don't change)
let cells = new Array(fieldSize); // array of cells
let moveCount = 0; // counter of moves done
let potentials = new Array(fieldSize); // array of potential moves (+ 2 empty cells around the filled cells)
let maxDefense = 0; // maximum weight for defense
let maxAttack = 0; // maximum weight for attack
let line = ''; // empty row
let weights = [ // object of weights with patterns
  {weight: 10000, pattern: ['xxxxx']},
  {weight: 5000, pattern: ['0xxxx0']},
  {weight: 2500, pattern: ['xxxx0', '0xxxx']},
  {weight: 1000, pattern: ['xx0xx', 'xxx0x', 'x0xxx']},
  {weight: 600, pattern: ['00xxx000', '000xxx00']},
  {weight: 500, pattern: ['00xxx00']},
  {weight: 400, pattern: ['0xxx00', '00xxx0']},
  {weight: 200, pattern: ['0xxx0', 'xxx00', '00xxx']},
  {weight: 100, pattern: ['0x0xx', 'xx0x0', 'x0xx0', '0xx0x', 'x00xx', 'xx00x']},
  {weight: 80, pattern: ['000xx000']},
  {weight: 60, pattern: ['00xx00']},
  {weight: 40, pattern: ['xx000', '000xx', '0xx00', '00xx0']},
  {weight: 20, pattern: ['0xx0']}
];
// creating array of array
for (let i = 0; i < cells.length; i++){
  cells[i] = new Array();
  potentials[i] = new Array();
};
// let's draw our battlefiled with canvas
for (let i = 0; i < fieldSize; i++){
    for (let j = 0; j < fieldSize; j++){
        canvas.fillStyle = 'rgb(189,229,231)';
        canvas.strokeStyle = 'rgb(254,250,203)';
        canvas.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        canvas.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        cells[i][j] = 0;
    }
};
let battleField = document.getElementById('battlefield');
let battleFieldBlock = battleField.getBoundingClientRect();

//first forced AI move for X
let firstMoveCoord = Math.floor(fieldSize / 2);
cells[firstMoveCoord][firstMoveCoord] = 1;
let firstMove = battleField.getContext('2d');
firstMove.beginPath();
firstMove.moveTo(firstMoveCoord * cellSize + 5, firstMoveCoord * cellSize + 5);
firstMove.lineTo(firstMoveCoord * cellSize + 25, firstMoveCoord * cellSize + 25);
firstMove.moveTo(firstMoveCoord * cellSize + 25, firstMoveCoord * cellSize + 5);
firstMove.lineTo(firstMoveCoord * cellSize + 5, firstMoveCoord * cellSize + 25);
firstMove.strokeStyle = 'rgb(130,109,178)';
firstMove.stroke();
moveCount = moveCount + 1;
firstMove.fillStyle = '#777';
firstMove.fillText(moveCount, firstMoveCoord * cellSize, firstMoveCoord * cellSize + 8);
isCross = false;
potentials[firstMoveCoord][firstMoveCoord] = 0;
for (let i = 0; i < 5 ; i++) {
  for (let j = 0; j < 5; j++) {
    if ((firstMoveCoord - 2 + i) >= 0 && (firstMoveCoord - 2 + i) < fieldSize && (firstMoveCoord - 2 + j) >= 0 && (firstMoveCoord - 2 + j) < fieldSize){
      if (potentials[firstMoveCoord - 2 + i][firstMoveCoord - 2 + j] != 0 && potentials[firstMoveCoord - 2 + i][firstMoveCoord - 2 + j] != 1) {
        potentials[firstMoveCoord - 2 + i][firstMoveCoord - 2 + j] = 1;
      }
    }
  }
}
// filling an array of potentials moves via function
function fillPotentials(potentY, potentX){
  potentials[potentY][potentX] = 0;
  for (let i = 0; i < 5 ; i++) {
    for (let j = 0; j < 5; j++) {
      if ((potentY - 2 + i) >= 0 && (potentY - 2 + i) < fieldSize && (potentX - 2 + j) >= 0 && (potentX - 2 + j) < fieldSize){
        if (potentials[potentY - 2 + i][potentX - 2 + j] != 0 && potentials[potentY - 2 + i][potentX - 2 + j] != 1) {
          potentials[potentY - 2 + i][potentX - 2 + j] = 1;
        }
      }
    }
  }
};
function checkWin(winY, winX){
  if (moveCount >= 9){ // if amount of moves >= 9 then do the function
    // checking win row
    for (let i = 0; i < 5; i++){
      let ctx = battleField.getContext('2d');
      ctx.strokeStyle = 'rgb(140, 89, 197)';
      ctx.lineWidth = 2;
      if (
        cells[winY][winX - 4 + i] == cells[winY][winX - 3 + i] &&
        cells[winY][winX - 3 + i] == cells[winY][winX - 2 + i] &&
        cells[winY][winX - 2 + i] == cells[winY][winX - 1 + i] &&
        cells[winY][winX - 1 + i] == cells[winY][winX + i]){
          ctx.moveTo((winX - 4 + i) * cellSize, winY * cellSize + 15);
          ctx.lineTo((winX + i) * cellSize + cellSize, winY * cellSize + 15);
          ctx.stroke();
          isFin = true;
      }
      // checking win column
      else if((winY - 4 + i) >= 0 && (winY + i) < fieldSize &&
        cells[winY - 4 + i][winX] == cells[winY - 3 + i][winX] &&
        cells[winY - 3 + i][winX] == cells[winY - 2 + i][winX] &&
        cells[winY - 2 + i][winX] == cells[winY - 1 + i][winX] &&
        cells[winY - 1 + i][winX] == cells[winY + i][winX]){
          ctx.beginPath();
          ctx.moveTo(winX * cellSize + 15, (winY - 4 + i) * cellSize);
          ctx.lineTo(winX * cellSize + 15, (winY + i) * cellSize + cellSize);
          ctx.stroke();
          isFin = true;
      }
      //checking win diagonal top left - bottom right
      else if ((winY - 4 + i) >= 0 && (winX + i) < fieldSize && (winY + i) < fieldSize &&
        cells[winY - 4 + i][winX - 4 + i] == cells[winY - 3 + i][winX - 3 + i] &&
        cells[winY - 3 + i][winX - 3 + i] == cells[winY - 2 + i][winX - 2 + i] &&
        cells[winY - 2 + i][winX - 2 + i] == cells[winY - 1 + i][winX - 1 + i] &&
        cells[winY - 1 + i][winX - 1 + i] == cells[winY + i][winX + i]){
          ctx.beginPath();
          ctx.moveTo((winX - 4 + i) * cellSize, (winY - 4 + i) * cellSize);
          ctx.lineTo((winX + i) * cellSize + cellSize, (winY + i) * cellSize + cellSize);
          ctx.stroke();
          isFin = true;
      }
      // checking win diagonal bottom left - top right
      else if ((winY - 4 + i) >= 0 && (winY + i) < fieldSize &&
        cells[winY - 4 + i][winX + 4 - i] == cells[winY - 3 + i][winX + 3 - i] &&
        cells[winY - 3 + i][winX + 3 - i] == cells[winY - 2 + i][winX + 2 - i] &&
        cells[winY - 2 + i][winX + 2 - i] == cells[winY - 1 + i][winX + 1 - i] &&
        cells[winY - 1 + i][winX + 1 - i] == cells[winY + i ][winX - i]){
          ctx.beginPath();
          ctx.moveTo((winX + 4 - i) * cellSize + cellSize, (winY - 4 + i) * cellSize);
          ctx.lineTo((winX - i) * cellSize, (winY + i) * cellSize + cellSize);
          ctx.stroke();
          isFin = true;
      }
    }
  }
}
// end of checkWin function
function doAIMove(y,x){
  cells[y][x] = 1;
  isCross = false;
  let ctx = battleField.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(130,109,178)';
  ctx.lineWidth = 1;
  ctx.moveTo(x * cellSize + 5, y * cellSize + 5) ;
  ctx.lineTo(x * cellSize + 25, y * cellSize + 25);
  ctx.stroke();
  ctx.moveTo(x * cellSize + 25 , y * cellSize + 5);
  ctx.lineTo(x * cellSize + 5, y * cellSize + 25);
  ctx.stroke();
  moveCount = moveCount + 1;
  ctx.fillStyle = '#777';
  ctx.fillText(moveCount, x * cellSize, y * cellSize + 8);
  checkWin(y, x);
  fillPotentials(y, x);
  console.log(moveCount, y, x);
} // end doAIMove function
function compareDefense(direction, weight, cellValue){
  for (let item of weights){
    for (let value of item.pattern){
      line = new RegExp(value.replace(/x/g, cellValue)); // filling empty line with string
      if (direction.search(line) != -1){  // compare line with direction string
        if (weight > 1){
         return maxDefense = maxDefense + item.weight;
        }
        else{
          return maxDefense = item.weight;
        }
      }
    }
  }
}
function compareAttack(direction, weight, cellValue){
  for (let item of weights){
    for (let value of item.pattern){
      line = new RegExp(value.replace(/x/g, cellValue)); // filling empty line with string
      if (direction.search(line) != -1){ // compare line with direction string
        if (weight > 1){
         return maxAttack = maxAttack + item.weight;
        }
        else{
          return maxAttack = item.weight;
        }
      }
    }
  }
}
function calcAIMove(){
  // AI turn to make his move, let create arrays of attack and defense
  let attackCells = new Array(fieldSize);
  let defenseCells = new Array(fieldSize);
  for (let i = 0; i < attackCells.length; i++){
    attackCells[i] = new Array();
    defenseCells[i] = new Array();
  };
  // Let's compare weight rows with potential moves rows
  for (let i = 0; i < fieldSize; i++){
    for (let j = 0; j < fieldSize; j++) {
      if (potentials[i][j] == 1){
        //Counting weights for attack
        let patternRowCells = new Array(8);
        let patternColCells = new Array(8);
        let patternDiagOneCells = new Array(8);
        let patternDiagTwoCells = new Array(8);
        for (let k = 0; k < 9; k++) {
          if ((i - 4 + k) >= 0 && (i - 4 + k) < fieldSize && (j - 4 + k) >= 0 && (j - 4 + k) < fieldSize){
            patternRowCells[k] = cells[i][j -  4 + k];
            patternColCells[k] = cells[i - 4 + k][j];
            patternDiagOneCells[k] = cells[i - 4 + k][j - 4 + k];
          }
          else {
            patternRowCells[k] = 3;
            patternColCells[k] = 3;
            patternDiagOneCells[k] = 3;
          }
          if ((j - 4 + k) >= 0 && (j - 4 + k) < fieldSize && (i + 4 - k) >= 0 && (i + 4 - k) < fieldSize) {
            patternDiagTwoCells[k] = cells[i + 4 - k][j - 4 + k];
          }
          else {
            patternDiagTwoCells[k] = 3;
          }
        };
        //force move with to potential cell "X"
        patternRowCells[4] = 1;
        patternColCells[4] = 1;
        patternDiagOneCells[4] = 1;
        patternDiagTwoCells[4] = 1;
        let patternRowString = patternRowCells.join('');
        let patternColString = patternColCells.join('');
        let patternDiagOneString = patternDiagOneCells.join('');
        let patternDiagTwoString = patternDiagTwoCells.join('');
        // Compare weights with pattern rows
        maxAttack = 0;
        compareAttack(patternRowString, maxAttack, 1);
        compareAttack(patternColString, maxAttack, 1);
        compareAttack(patternDiagOneString, maxAttack, 1);
        compareAttack(patternDiagTwoString, maxAttack, 1);
        //assigment maximum attack weight value to maxAttack
        if (maxAttack > 1) {
          attackCells[i][j] = maxAttack;
        }
        //focre move to cell with "O"
        patternRowCells[4] = 2;
        patternColCells[4] = 2;
        patternDiagOneCells[4] = 2;
        patternDiagTwoCells[4] = 2;
        patternRowString = patternRowCells.join('');
        patternColString = patternColCells.join('');
        patternDiagOneString = patternDiagOneCells.join('');
        patternDiagTwoString = patternDiagTwoCells.join('');
        // Compare weights with pattern rows
        maxDefense = 0;
        compareDefense(patternRowString, maxDefense, 2);
        compareDefense(patternColString, maxDefense, 2);
        compareDefense(patternDiagOneString, maxDefense, 2);
        compareDefense(patternDiagTwoString, maxDefense, 2);
        //assigment maximum attack weight value to maxDefense
        if (maxDefense > 1) {
          defenseCells[i][j] = maxDefense;
        }
      }
    }
  };
  // let know the most bigger value of attackCells and defenseCells
  let defenseW = 0, defenseX = 0, defenseY = 0;
  for (let i = 0; i < fieldSize; i++){
    for (let j = 0; j < fieldSize; j++){
      if (defenseCells[i][j] > defenseW){
        defenseW = defenseCells[i][j];
        defenseX = j;
        defenseY = i;
      }
    }
  };
  let attackW = 0, attackX = 0, attackY = 0, attackMaxWCol = 0;
  for (let i = 0; i < fieldSize; i++){
    for (let j = 0; j < fieldSize; j++){
      if (attackCells[i][j] == attackW){
        attackMaxWCol = attackMaxWCol + 1;
      }
      if (attackCells[i][j] > attackW){
        attackW = attackCells[i][j];
        attackMaxWCol = 0;
        attackX = j;
        attackY = i;
      }
    }
  };
  //Let's make first moves of AI random
  if (attackMaxWCol > 0) {
    let min = 0;
    let max = attackMaxWCol;
    let random = Math.floor(Math.random() * attackMaxWCol);
    let chetchik = 0;
    let isLittleFin = false;
    for (let i = 0; i < fieldSize; i++){
      for (let j = 0; j < fieldSize; j++){
        if (attackCells[i][j] == attackW && isLittleFin == false){
          if (random == chetchik){
            attackX = j;
            attackY = i;
            isLittleFin = true;
          }
          else{
            chetchik = chetchik + 1;
          }
        }
      }
    }
  }
  //let's compare maximum value for attack with defense and choose the strategy
  if (attackW * 1.1 >= defenseW && isFin == false){ // if attack * 1.1 > defense do attack move
   //(note: 1.1 multiplier is used to make AI more aggessive, like people :'()
    doAIMove(attackY, attackX);
  }
  else if(isFin == false){ // defense move
    doAIMove(defenseY, defenseX);
  }
}
let onClick = function(field){
  if (isFin == true){ // if win
    console.log('Game Over');
    return 0;
  }
  else{
    // get the coordinate of mouse click
    let cellY = Math.floor((field.clientY - battleFieldBlock.top)/cellSize);
    let cellX = Math.floor((field.clientX - battleFieldBlock.left)/cellSize);
    // User move, if clicked cell is empty: draw O
    if (cells[cellY][cellX] == 0 && isCross == false){ //
      cells[cellY][cellX] = 2;
      isCross = true;
      let ctx = battleField.getContext('2d');
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(239,144,121)';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgb(239,15,121)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cellX * cellSize + 15, cellY * cellSize + 15, 10, 0, 2*Math.PI);
      ctx.stroke();
      moveCount = moveCount + 1;
      ctx.fillStyle = '#777';
      ctx.fillText(moveCount, cellX * cellSize, cellY * cellSize + 8);
      fillPotentials(cellY, cellX);
      checkWin(cellY, cellX);
      console.log(moveCount, cellY, cellX);
      calcAIMove();
      // ctx.arc(cellX * cellSize + 15, cellY * cellSize + 15, 10, 0, 2 * Math.PI);
      // ctx.stroke();
    }
    else { // if cell is not empty: return 0;
      return 0;
    }
  }
}; // end onClick().

battleField = document.getElementById('battlefield');
battleField.addEventListener('click', onClick);
document.getElementById('newGame').addEventListener('click', newGame);
function newGame(){
  location.reload();
}
