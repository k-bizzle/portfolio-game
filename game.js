// 1. Despot some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

// Constants

prompt = require('prompt-sync')();
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// Function to handle deposit input

const deposit = () => {
  while (true) {    
      const depositAmount = prompt("Enter a deposit amount: ");
      const num9berDepositAmount = parseFloat(depositAmount);
      //ParseFloat() function allows deposit entered to be converted from a string to a number
      //If it cannot convert string into a number is will return as NaN

      if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
          console.log("Invalid deposit amount, try again"); //alert
      }
      else {
      console.log("Deposit added to playing stash") //alert
      return numberDepositAmount;
          
          }
      }
};

const getNumberOfLines = () => {
  while (true) {    
      const lines = prompt("Enter the number of lines to bet on (1-3): ");
      const numberOfLines = parseFloat(lines);
      //ParseFloat() function allows number of lines entered to be converted from a string to a number

      if (isNaN(numberOfLines)) {
          console.log("Invalid, try again"); //alert
      }
      else if (numberOfLines <= 0 || numberOfLines > 3) {
          console.log("You can only bet on 1 to 3 lines, try again") //alert
      }
      else {
      console.log(`Great we will bet on ${numberOfLines} lines`) //alert
      
      return numberOfLines;
          }
      }
};

const getBet = (balance, lines) => {
  while (true) {    
      const bet = prompt("Enter the total bet per line: ");
      const numberBet = parseFloat(bet);
      //ParseFloat() function allows number of the bet entered to be converted from a string to a number

      if (isNaN(numberBet) || numberBet <= 0 ) {
          console.log("Invalid bet, try again"); //alert
      }
      else if (numberBet > balance / lines) {
          console.log("You do not have enough tokens for that bet") //alert
      }
      else {
      console.log(`Great we will bet ${numberBet} tokens per line`) //alert
      return numberBet; 
          }
      }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();