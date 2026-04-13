// ===== Game Constants =====
const SYMBOLS = ['🤖', '💰', '🎯', '⚠️', '🔮', '😅'];
const SPIN_DURATION = 800; // milliseconds
const MIN_BALANCE = 10;

// Payout multipliers for different winning combinations
const PAYOUTS = {
    tripleAI: 5,           // 🤖 🤖 🤖
    tripleToken: 10,       // 💰 💰 💰
    tripleTarget: 6,       // 🎯 🎯 🎯
    tripleError: 0,        // ⚠️ ⚠️ ⚠️
    pair: 2                // Any matching pair
};

// Humorous AI-themed messages
const MESSAGES = {
    welcome: "Welcome to TokenSlot! Spend tokens to spin and win big... or lose spectacularly!",
    spinning: "Inferring... Processing... Hallucinating...",
    tripleAI: "🤖 Triple AI detected! 'I am truly conscious now!' +%PAYOUT% tokens",
    tripleToken: "💰 TOKEN SHOWER! 'This is why we charge per API call.' +%PAYOUT% tokens ⭐",
    tripleTarget: "🎯 Three for three! '99.9% confident prediction...' +%PAYOUT% tokens",
    tripleError: "⚠️ ERROR STACK OVERFLOW! 'Have you tried tokenizing it again?' -LOST",
    pair: "✨ Inference Win! 'Statistically significant match detected.' +%PAYOUT% tokens",
    lose: "❌ Model failed. Return to step 1 and retrain with more tokens.",
    insufficientFunds: "Insufficient tokens. Your credit card declined. (In the simulation.)",
    noSpinning: "Already spinning! The model is still thinking...",
};

// ===== Game State =====
let gameState = {
    balance: 1000,
    sessionWinnings: 0,
    isSpinning: false,
    previousReels: ['🤖', '💰', '⚠️']
};

// ===== DOM Elements =====
const spinButton = document.getElementById('spinButton');
const betAmountSelect = document.getElementById('betAmount');
const balanceDisplay = document.getElementById('balance');
const winningsDisplay = document.getElementById('winnings');
const messageText = document.getElementById('messageText');
const messageBox = document.getElementById('messageBox');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

// ===== Initialization =====
function init() {
    updateDisplay();
    spinButton.addEventListener('click', handleSpin);
    // Initialize with welcome message
    setMessage(MESSAGES.welcome);
}

// ===== Button Click Handler =====
function handleSpin() {
    const betAmount = parseInt(betAmountSelect.value);

    // Validation checks
    if (gameState.isSpinning) {
        setMessage(MESSAGES.noSpinning);
        return;
    }

    if (gameState.balance < betAmount) {
        setMessage(MESSAGES.insufficientFunds);
        return;
    }

    // Deduct bet from balance
    gameState.balance -= betAmount;
    updateDisplay();

    // Show spinning message
    setMessage(MESSAGES.spinning);

    // Disable button and start spinning
    spinButton.disabled = true;
    gameState.isSpinning = true;

    // Animate reels
    animateReels(betAmount);
}

// ===== Reel Animation =====
function animateReels(betAmount) {
    const reels = [reel1, reel2, reel3];

    // Add spinning animation
    reels.forEach(reel => {
        reel.parentElement.classList.add('spinning');
    });

    // Schedule reel stops with staggered timing
    setTimeout(() => stopReel(reel1, 0), SPIN_DURATION * 0.3);
    setTimeout(() => stopReel(reel2, 1), SPIN_DURATION * 0.6);
    setTimeout(() => stopReel(reel3, 2), SPIN_DURATION * 0.9);

    // Complete spin after all reels stop
    setTimeout(() => completeSpin(betAmount), SPIN_DURATION + 200);
}

// ===== Stop Individual Reel =====
function stopReel(reelElement, reelIndex) {
    const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    gameState.previousReels[reelIndex] = randomSymbol;
    reelElement.textContent = randomSymbol;
    reelElement.parentElement.classList.remove('spinning');
}

// ===== Complete Spin and Calculate Results =====
function completeSpin(betAmount) {
    const [reel1Symbol, reel2Symbol, reel3Symbol] = gameState.previousReels;
    let payout = 0;
    let resultMessage = '';

    // Check for match types and calculate payout
    if (reel1Symbol === reel2Symbol && reel2Symbol === reel3Symbol) {
        // Triple match
        if (reel1Symbol === '🤖') {
            payout = betAmount * PAYOUTS.tripleAI;
            resultMessage = MESSAGES.tripleAI;
        } else if (reel1Symbol === '💰') {
            payout = betAmount * PAYOUTS.tripleToken;
            resultMessage = MESSAGES.tripleToken;
        } else if (reel1Symbol === '🎯') {
            payout = betAmount * PAYOUTS.tripleTarget;
            resultMessage = MESSAGES.tripleTarget;
        } else if (reel1Symbol === '⚠️') {
            payout = betAmount * PAYOUTS.tripleError;
            resultMessage = MESSAGES.tripleError;
        } else {
            // Other triple matches (🔮, 😅)
            payout = betAmount * PAYOUTS.tripleAI;
            resultMessage = MESSAGES.tripleAI;
        }
    } else if (
        (reel1Symbol === reel2Symbol) ||
        (reel2Symbol === reel3Symbol) ||
        (reel1Symbol === reel3Symbol)
    ) {
        // Any pair match
        payout = betAmount * PAYOUTS.pair;
        resultMessage = MESSAGES.pair;
    } else {
        // No match - loss
        resultMessage = MESSAGES.lose;
        payout = 0;
    }

    // Update balance with payout
    gameState.balance += payout;
    gameState.sessionWinnings += payout - betAmount; // Net gain/loss

    // Display result message with payout amount
    if (payout > 0) {
        resultMessage = resultMessage.replace('%PAYOUT%', payout);
        messageBox.classList.remove('lose-animation');
        messageBox.classList.add('win-animation');
    } else {
        messageBox.classList.remove('win-animation');
        messageBox.classList.add('lose-animation');
    }

    setMessage(resultMessage);

    // Update displays
    updateDisplay();

    // Re-enable button
    spinButton.disabled = false;
    gameState.isSpinning = false;

    // Remove animation classes after they complete
    setTimeout(() => {
        messageBox.classList.remove('win-animation', 'lose-animation');
    }, 1000);
}

// ===== Update Display Elements =====
function updateDisplay() {
    balanceDisplay.textContent = gameState.balance;
    winningsDisplay.textContent = gameState.sessionWinnings >= 0
        ? '+' + gameState.sessionWinnings
        : gameState.sessionWinnings;

    // Disable spin button if insufficient funds
    const betAmount = parseInt(betAmountSelect.value);
    if (gameState.balance < betAmount) {
        spinButton.disabled = true;
    } else if (!gameState.isSpinning) {
        spinButton.disabled = false;
    }

    // Update winnings color based on profit/loss
    if (gameState.sessionWinnings > 0) {
        winningsDisplay.style.color = '#00d4aa'; // success green
    } else if (gameState.sessionWinnings < 0) {
        winningsDisplay.style.color = '#ff6b35'; // warning orange
    } else {
        winningsDisplay.style.color = '#ffd700'; // neutral gold
    }
}

// ===== Set Message Helper =====
function setMessage(message) {
    messageText.textContent = message;
}

// ===== Event Listeners =====
betAmountSelect.addEventListener('change', () => {
    updateDisplay();
});

// ===== Start Game =====
init();
