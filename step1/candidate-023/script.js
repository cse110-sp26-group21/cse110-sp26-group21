// ==========================================
// AI Token Casino™ - Slot Machine Logic
// ==========================================

const INITIAL_TOKENS = 1000;
const SPIN_COST = 100;
const SYMBOLS = [
    'Hallucination',
    'Inference Cost',
    'Token Limit',
    'Training Data',
    'Model Collapse',
    'Prompt Injection',
    'Marketing Hype',
    'Context Window'
];

// Game state
let gameState = {
    tokens: INITIAL_TOKENS,
    isSpinning: false,
    lastResult: '',
    totalSpins: 0
};

// DOM Elements
const tokenDisplay = document.getElementById('tokenDisplay');
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const lastWinDisplay = document.getElementById('lastWinDisplay');
const resultMessage = document.getElementById('resultMessage');
const resultDetails = document.getElementById('resultDetails');
const resultsPanel = document.getElementById('resultsPanel');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

// Win combinations (weighted for humor and game balance)
const winCombos = {
    'Hallucination': {
        payout: 250,
        message: "🤖 Three Hallucinations! The AI lied convincingly!",
        details: "The model was SO confident it was wrong. +250 tokens"
    },
    'Inference Cost': {
        payout: 500,
        message: "💰 Three Inference Costs! Your lambo fund grows!",
        details: "Each token spent on reasoning is a token earned. Ironic. +500 tokens"
    },
    'Marketing Hype': {
        payout: 200,
        message: "📢 Three Marketing Hype! We've disrupted disruption!",
        details: "This model will change everything... later. Maybe. +200 tokens"
    },
    'Token Limit': {
        payout: 150,
        message: "📏 Three Token Limits! Brevity is the soul of wit (and profit)!",
        details: "Can't generate more text? At least your wallet is safe. +150 tokens"
    },
    'Prompt Injection': {
        payout: 600,
        message: "🎯 Three Prompt Injections! You hacked the system!",
        details: "Security theater was always theater. +600 tokens"
    },
    'Training Data': {
        payout: 100,
        message: "📚 Three Training Data! Stolen content pays off!",
        details: "Plagiarism has never been more profitable. +100 tokens"
    },
    'Context Window': {
        payout: 175,
        message: "🪟 Three Context Windows! You remembered everything!",
        details: "For once, the model didn't forget why it was sad. +175 tokens"
    },
    'Model Collapse': {
        payout: -500,
        message: "💥 THREE MODEL COLLAPSES! YOUR ENTIRE PORTFOLIO IS GONE!",
        details: "It was all an elaborate hallucination. Your tokens: DELETED."
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    spinBtn.addEventListener('click', spin);
    resetBtn.addEventListener('click', resetGame);
});

// Spin the reels
function spin() {
    if (gameState.isSpinning) return;
    if (gameState.tokens < SPIN_COST) {
        resultMessage.textContent = "⚠️ Insufficient tokens. Your AI dreams are over.";
        resultDetails.textContent = "Start a new game or embrace the void.";
        return;
    }

    gameState.isSpinning = true;
    gameState.tokens -= SPIN_COST;
    gameState.totalSpins++;
    updateDisplay();
    spinBtn.disabled = true;

    // Animate each reel with different duration
    spinReel(reel1, 400);
    spinReel(reel2, 500);
    spinReel(reel3, 600);

    // After animation, check results
    setTimeout(checkResults, 650);
}

// Animate individual reel
function spinReel(reel, duration) {
    reel.classList.add('spinning');
    const randomSpins = Math.floor(Math.random() * 3) + 3; // 3-5 extra spins
    const totalDistance = randomSpins * 50; // 50px per symbol

    setTimeout(() => {
        reel.style.transform = `translateY(-${totalDistance}px)`;
        reel.classList.remove('spinning');
    }, 100);
}

// Check for winning combinations
function checkResults() {
    const result1 = getReelResult(reel1);
    const result2 = getReelResult(reel2);
    const result3 = getReelResult(reel3);

    // Check if all three match
    if (result1 === result2 && result2 === result3) {
        handleWin(result1);
    } else {
        handleLoss(result1, result2, result3);
    }

    gameState.isSpinning = false;
    spinBtn.disabled = gameState.tokens < SPIN_COST;
}

// Get the current symbol from a reel
function getReelResult(reel) {
    const transform = window.getComputedStyle(reel).transform;
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (!matrix) return SYMBOLS[0];

    const values = matrix[1].split(', ');
    const translateY = parseFloat(values[5]);
    const symbolIndex = Math.round(Math.abs(translateY) / 50) % SYMBOLS.length;

    return SYMBOLS[symbolIndex];
}

// Handle winning spin
function handleWin(symbol) {
    const combo = winCombos[symbol];
    if (!combo) return handleLoss('?', '?', '?');

    // Special case: Model Collapse removes tokens
    if (symbol === 'Model Collapse') {
        gameState.tokens = 0;
        resultMessage.textContent = combo.message;
        resultDetails.textContent = combo.details;
        lastWinDisplay.textContent = '-500 (RIP)';
    } else {
        gameState.tokens += combo.payout;
        resultMessage.textContent = combo.message;
        resultDetails.textContent = combo.details;
        lastWinDisplay.textContent = `+${combo.payout}`;
    }

    // Flash animation
    resultsPanel.classList.remove('win');
    setTimeout(() => {
        resultsPanel.classList.add('win');
    }, 10);

    gameState.lastResult = symbol;
    updateDisplay();
}

// Handle losing spin
function handleLoss(r1, r2, r3) {
    const losses = [
        {
            message: "❌ No match. The model was also confused.",
            details: `You got ${r1}, ${r2}, and ${r3}. Sometimes diversity isn't celebrated.`
        },
        {
            message: "🎪 Close, but not close enough. The bar is low, but you limbo'd under it.",
            details: "Better luck with your next inference run."
        },
        {
            message: "😅 The algorithm has spoken: better luck next time.",
            details: "At least it was consistent about being inconsistent."
        },
        {
            message: "🤔 The odds were definitely in favor of someone... just not you.",
            details: "Remember: the house (AI) always wins."
        }
    ];

    const randomLoss = losses[Math.floor(Math.random() * losses.length)];
    resultMessage.textContent = randomLoss.message;
    resultDetails.textContent = randomLoss.details;
    lastWinDisplay.textContent = '-100';

    gameState.lastResult = 'loss';
    updateDisplay();
}

// Update UI
function updateDisplay() {
    tokenDisplay.textContent = gameState.tokens;

    // Disable spin button if insufficient tokens
    if (gameState.tokens < SPIN_COST) {
        spinBtn.disabled = true;
        spinBtn.textContent = 'INSUFFICIENT TOKENS';
    } else {
        spinBtn.disabled = false;
        spinBtn.textContent = 'SPIN FOR MAGIC ✨';
    }

    // Game over state
    if (gameState.tokens === 0 && gameState.totalSpins > 0) {
        resultMessage.textContent = "💀 GAME OVER - Your portfolio has been hallucinated away.";
        resultDetails.textContent = "Start a new game to pretend this never happened.";
    }
}

// Reset game
function resetGame() {
    gameState.tokens = INITIAL_TOKENS;
    gameState.isSpinning = false;
    gameState.lastResult = '';
    gameState.totalSpins = 0;

    // Reset reel positions
    reel1.style.transform = 'translateY(0)';
    reel2.style.transform = 'translateY(0)';
    reel3.style.transform = 'translateY(0)';

    // Clear results
    resultMessage.textContent = '';
    resultDetails.textContent = '';
    lastWinDisplay.textContent = '--';

    // Remove animation class
    resultsPanel.classList.remove('win');

    updateDisplay();
}
