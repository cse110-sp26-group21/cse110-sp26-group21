// Game Constants
const SPIN_COST = 10;
const INITIAL_TOKENS = 1000;
const SYMBOLS = ['💰', '🚀', '🤖', '💾', '📈', '⚠️', '🔋', '🎰'];
const SPIN_DURATION = 2000; // milliseconds

// Game State
let gameState = {
    tokens: INITIAL_TOKENS,
    totalEarnings: 0,
    spins: 0,
    wins: 0,
    losses: 0,
    isSpinning: false,
    spinHistory: []
};

// AI Flavor messages
const aiMessages = [
    "Our models are SO confident right now! (Spoiler: they're not)",
    "Processing... hallucinating... recalibrating...",
    "Token efficiency is our middle name! (We have no other names)",
    "This spin was brought to you by inference costs. Many inference costs.",
    "The AI said: 'I am very sure this will work.' It was not sure.",
    "Watch your tokens get optimized away! ✨",
    "Synergizing blockchain-based luck algorithms...",
    "Our neural networks say you're a statistical anomaly. A financial one.",
    "Leveraging cutting-edge token redistribution technology!",
    "I'm feeling lucky! (I'm a language model, I don't have feelings)",
];

// Payout combinations and messages
const PAYOUTS = {
    '🤖🤖🤖': { payout: 100, message: 'THREE ROBOTS... Your AI overlords demand tribute!' },
    '💰💰💰': { payout: 150, message: 'JACKPOT! You won actual money! (We will convert it to tokens)' },
    '🚀🚀🚀': { payout: 80, message: 'TRIPLE ROCKETS! To the moon! (And down 90% shortly)' },
    '🎰🎰🎰': { payout: 200, message: 'ULTIMATE LUCK! The machine has accepted your sacrifice!' },
    '🔋🔋🔋': { payout: 50, message: 'TRIPLE BATTERIES! Your tokens are now... fully charged?' },
    '📈📈📈': { payout: 120, message: 'STONKS! The charts only go up! (Until they don\'t)' },
    'two-same': { payout: 15, message: 'TWO-OF-A-KIND! Participation trophy awarded!' },
};

// DOM Elements
const tokenDisplay = document.getElementById('tokenDisplay');
const earningsDisplay = document.getElementById('earningsDisplay');
const hallucinationRate = document.getElementById('hallucinationRate');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const resultMessage = document.getElementById('resultMessage');
const payoutMessage = document.getElementById('payoutMessage');
const flavorText = document.getElementById('flavorText');
const historyList = document.getElementById('historyList');
const machine = document.querySelector('.machine');

// Event Listeners
spinButton.addEventListener('click', spin);
resetButton.addEventListener('click', resetGame);

// Initialize the game
function init() {
    updateDisplay();
    updateFlavorText();
}

// Update all display elements
function updateDisplay() {
    tokenDisplay.textContent = gameState.tokens;
    earningsDisplay.textContent = gameState.totalEarnings > 0 ? '+' + gameState.totalEarnings : gameState.totalEarnings;
    
    // Calculate hallucination rate
    const hallucinationPercent = gameState.spins > 0 ? Math.floor((gameState.losses / gameState.spins) * 100) : 0;
    hallucinationRate.textContent = hallucinationPercent + '%';
    
    // Update button state
    spinButton.disabled = gameState.isSpinning || gameState.tokens < SPIN_COST;
}

// Update flavor text with random AI message
function updateFlavorText() {
    const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];
    flavorText.textContent = randomMessage;
}

// Get random reel position
function getRandomReelPosition() {
    // Return a random index from 0-7
    return Math.floor(Math.random() * SYMBOLS.length);
}

// Get symbol at specific position
function getSymbol(reelElement, position) {
    const symbols = reelElement.querySelectorAll('.reel-symbol');
    return symbols[position].textContent;
}

// Spin the reels
function spin() {
    if (gameState.isSpinning || gameState.tokens < SPIN_COST) return;

    // Deduct spin cost
    gameState.tokens -= SPIN_COST;
    gameState.spins++;
    gameState.isSpinning = true;

    // Clear previous results
    resultMessage.textContent = '';
    payoutMessage.textContent = '';

    // Update flavor text
    updateFlavorText();

    // Add spinning animation to all reels
    reel1.classList.add('spinning');
    reel2.classList.add('spinning');
    reel3.classList.add('spinning');

    // Generate random final positions
    const pos1 = getRandomReelPosition();
    const pos2 = getRandomReelPosition();
    const pos3 = getRandomReelPosition();

    // Spin each reel
    spinReel(reel1, pos1);
    spinReel(reel2, pos2);
    spinReel(reel3, pos3);

    // After spin duration, check results
    setTimeout(() => {
        reel1.classList.remove('spinning');
        reel2.classList.remove('spinning');
        reel3.classList.remove('spinning');

        const symbol1 = getSymbol(reel1, pos1);
        const symbol2 = getSymbol(reel2, pos2);
        const symbol3 = getSymbol(reel3, pos3);

        checkWin(symbol1, symbol2, symbol3);
    }, SPIN_DURATION);

    updateDisplay();
}

// Animate individual reel
function spinReel(reelElement, targetPosition) {
    const symbols = reelElement.querySelectorAll('.reel-symbol');
    const symbolHeight = 60; // Height of each symbol in pixels
    
    // Calculate how many rotations we need
    const rotations = 8; // Full rotations before landing
    const totalSpins = rotations * SYMBOLS.length + targetPosition;
    const finalPosition = -(totalSpins * symbolHeight);

    // Use CSS transform for animation
    reelElement.style.transition = `transform ${SPIN_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    reelElement.style.transform = `translateY(${finalPosition}px)`;
}

// Check if spin was a win
function checkWin(symbol1, symbol2, symbol3) {
    const combination = symbol1 + symbol2 + symbol3;
    let isWin = false;
    let payout = 0;
    let message = '';

    // Check for three-of-a-kind
    if (PAYOUTS[combination]) {
        isWin = true;
        payout = PAYOUTS[combination].payout;
        message = PAYOUTS[combination].message;
        gameState.wins++;
    }
    // Check for two-of-a-kind
    else if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
        isWin = true;
        payout = PAYOUTS['two-same'].payout;
        message = PAYOUTS['two-same'].message;
    } else {
        gameState.losses++;
        message = pickLossMessage(symbol1, symbol2, symbol3);
    }

    // Process winnings
    if (isWin) {
        gameState.tokens += payout;
        gameState.totalEarnings += payout;
        resultMessage.textContent = '🎉 WIN! 🎉';
        payoutMessage.innerHTML = `<span class="win">${message}<br>+${payout} tokens</span>`;
        machine.classList.add('win-animation');
        setTimeout(() => machine.classList.remove('win-animation'), 1800);
    } else {
        resultMessage.textContent = '❌ LOSS ❌';
        payoutMessage.innerHTML = `<span class="loss">${message}<br>-${SPIN_COST} tokens</span>`;
        gameState.totalEarnings -= SPIN_COST;
    }

    // Add to history
    addToHistory(symbol1, symbol2, symbol3, isWin, payout);

    // Finish spinning
    gameState.isSpinning = false;
    updateDisplay();
}

// Generate loss message based on symbols
function pickLossMessage(symbol1, symbol2, symbol3) {
    const lossMessages = [
        "Better luck next hallucination!",
        "The algorithm has spoken. It says: try harder.",
        "Your tokens have been reallocated to model training.",
        "This loss was brought to you by quantum randomness (it's not quantum).",
        "Error 404: Luck not found.",
        "Your prediction was wrong. The model was right. (It wasn't)",
        "Inference cost paid. Accuracy: 0%.",
        "The token Gods have spoken with a resounding 'nope'.",
        "Your statistical improbability has been noted.",
        "Congratulations! You've activated our loss multiplier.",
    ];
    return lossMessages[Math.floor(Math.random() * lossMessages.length)];
}

// Add spin to history
function addToHistory(s1, s2, s3, isWin, payout) {
    const result = isWin ? `✓ WIN (+${payout})` : '✗ LOSS';
    const timestamp = new Date().toLocaleTimeString();
    const historyEntry = `${timestamp} | ${s1}${s2}${s3} | ${result}`;

    gameState.spinHistory.unshift(historyEntry);
    
    // Keep only last 20 spins
    if (gameState.spinHistory.length > 20) {
        gameState.spinHistory.pop();
    }

    // Update history display
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    gameState.spinHistory.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Reset game
function resetGame() {
    gameState = {
        tokens: INITIAL_TOKENS,
        totalEarnings: 0,
        spins: 0,
        wins: 0,
        losses: 0,
        isSpinning: false,
        spinHistory: []
    };

    // Reset reel positions
    reel1.style.transition = 'none';
    reel2.style.transition = 'none';
    reel3.style.transition = 'none';
    reel1.style.transform = 'translateY(0)';
    reel2.style.transform = 'translateY(0)';
    reel3.style.transform = 'translateY(0)';

    // Clear results
    resultMessage.textContent = '';
    payoutMessage.textContent = '';
    historyList.innerHTML = '';

    updateDisplay();
    updateFlavorText();
}

// Initialize game on page load
init();
