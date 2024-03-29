let balance = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('depositButton').addEventListener('click', deposit);
    document.getElementById('spinButton').addEventListener('click', startSpin);
    document.getElementById('closeDialogue').addEventListener('click', function() {
        document.getElementById('dialogueBubble').classList.add('hidden');
    });
});

function showDialogue(message) {
    document.getElementById('dialogueText').innerText = message; // Set the text to the function name
    document.getElementById('dialogueBubble').classList.remove('hidden'); // Show the dialogue
}

function deposit() {
    showDialogue('Function: deposit');

    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Invalid deposit amount");
        return;
    }
    balance += depositAmount;
    updateBalanceDisplay();
}

function startSpin() {
    showDialogue('Function: startSpin');

    const numLines = parseInt(document.getElementById('numLines').value);
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    if (isNaN(numLines) || numLines <= 0 || numLines > 3) {
        alert("Invalid number of lines");
        return;
    }
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Invalid bet amount");
        return;
    }
    if (betAmount * numLines > balance) {
        alert("Insufficient balance");
        return;
    }

    balance -= betAmount * numLines;
    spinReels();  // Simulate the spin
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    showDialogue('Function: updateBalanceDisplay');
    document.getElementById('balanceDisplay').innerText = `Balance: $${balance.toFixed(2)}`;
}

function spinReels() {
    showDialogue('Function: spinReels');

    const symbols = ['A', 'B', 'C', 'D']; // Array of your symbols
    const resultReels = [[], [], []]; // Array to hold the result for each reel
    const reelsElements = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

    // Randomly assign symbols to each slot in each reel
    for (let i = 0; i < 3; i++) { // For each reel
        for (let j = 0; j < 3; j++) { // For each row in the reel
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            resultReels[i].push(randomSymbol);
        }
        // Update the reel display
        reelsElements[i].textContent = resultReels[i].join(' | ');
    }

    calculateWinnings(resultReels);  // Calculate any winnings after the spin
}

function calculateWinnings(reels) {
    showDialogue('Function: calculateWinnings');

    const numLines = parseInt(document.getElementById('numLines').value);
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    const SYMBOL_VALUES = {A: 5, B: 4, C: 3, D: 2};
    let totalWin = 0;

    // Check for winning lines (horizontal only for simplicity)
    for (let line = 0; line < numLines; line++) {
        const symbolsInLine = [reels[0][line], reels[1][line], reels[2][line]];
        if (symbolsInLine.every((val, i, arr) => val === arr[0])) { // Check if all symbols are the same
            totalWin += betAmount * SYMBOL_VALUES[symbolsInLine[0]];
        }
    }

    // Update the balance and display a message based on the winnings
    if (totalWin > 0) {
        balance += totalWin;
        document.getElementById('message').textContent = `Congratulations! You won $${totalWin.toFixed(2)}`;
    } else {
        document.getElementById('message').textContent = 'Try again!';
    }

    updateBalanceDisplay(); // Refresh the balance display
}