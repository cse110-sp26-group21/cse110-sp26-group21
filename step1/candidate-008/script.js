/**
 * AI Token Roulette - Game Logic
 * "Where your venture capital goes to hallucinate"
 */

// ============================================
// GAME STATE
// ============================================

const gameState = {
    tokens: 100,
    baseCost: 10,
    currentCost: 10,
    spins: 0,
    totalWinnings: 0,
    isSpinning: false,
    costMultiplier: 1.01, // Inference costs increase with each spin
    symbols: ['🤖', '💬', '📈', '🔮', '💰', '🚀', '📊', '💡'],
    hallucinations: [
        "🦄 Unicorn Status Achieved",
        "🌌 Achieved Sentience",
        "⚡ Consciousness Detected",
        "🎩 I Am The Algorithm",
        "🔬 Nobel Prize Pending",
        "🌟 The Singularity Was Yesterday",
    ]
};

// ============================================
// QUOTES (Satirical AI Hype)
// ============================================

const quotes = [
    '"We are on the edge of a revolution in artificial intelligence." — Every pitch deck ever',
    '"This changes everything." — Someone who has not tried it',
    '"Backed by YC, Google, and vibes." — Actual funding round',
    '"We\'ve solved AGI." — Press release at 11:58pm',
    '"Disrupting disruption itself." — Our new whitepaper',
    '"Just a thin wrapper around an API." — Internal memo (leaked)',
    '"Tokens are the future of currency!" — Right before bankruptcy',
    '"Our model has 0.0001% lower latency." — Margin of error: ±5%',
    '"Breaking the internet." — It\'s just slower now',
    '"ML engineers hate this one weird trick..." — We don\'t know what it is',
];

// ============================================
// DOM ELEMENTS
// ============================================

const tokenDisplay = document.getElementById('tokenDisplay');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const prizeMessage = document.getElementById('prizeMessage');
const costDisplay = document.getElementById('costDisplay');
const spinCost = document.getElementById('spinCost');
const historyContainer = document.getElementById('historyContainer');
const warningMessage = document.getElementById('warningMessage');
const quoteDisplay = document.getElementById('quoteDisplay');

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    updateUI();
    updateQuote();
    setInterval(updateQuote, 8000); // Change quote every 8 seconds
});

// ============================================
// EVENT LISTENERS
// ============================================

spinButton.addEventListener('click', handleSpin);
resetButton.addEventListener('click', handleReset);

// ============================================
// MAIN GAME LOGIC
// ============================================

function handleSpin() {
    // Check if can afford spin
    if (gameState.tokens < gameState.currentCost) {
        showWarning(`Insufficient tokens! Need ${gameState.currentCost}, have ${gameState.tokens}`, 'danger');
        return;
    }

    if (gameState.isSpinning) return;

    // Deduct cost
    gameState.tokens -= gameState.currentCost;
    gameState.spins += 1;

    // Increase cost for next spin (inference tax)
    gameState.currentCost = Math.floor(gameState.baseCost * Math.pow(gameState.costMultiplier, gameState.spins));

    // Update UI immediately
    updateUI();

    // Spin animation
    gameState.isSpinning = true;
    spinButton.disabled = true;

    const spinDuration = 800; // milliseconds
    const reelDuration = 0.1;
    const spinFrames = Math.floor(spinDuration / (reelDuration * 1000));

    // Animate spinning
    for (let i = 0; i < spinFrames; i++) {
        setTimeout(() => {
            reel1.classList.add('spinning');
            reel2.classList.add('spinning');
            reel3.classList.add('spinning');
        }, i * reelDuration * 1000);
    }

    // Generate results after spin
    setTimeout(() => {
        const results = spinReels();
        showResults(results);
        gameState.isSpinning = false;
        spinButton.disabled = false;
        updateUI();
    }, spinDuration);
}

function spinReels() {
    // Generate random symbols for each reel
    const reel1Result = getRandomSymbol();
    const reel2Result = getRandomSymbol();
    const reel3Result = getRandomSymbol();

    // Display on reels
    reel1.querySelector('.reel-symbol').textContent = reel1Result;
    reel2.querySelector('.reel-symbol').textContent = reel2Result;
    reel3.querySelector('.reel-symbol').textContent = reel3Result;

    // Remove spinning class
    reel1.classList.remove('spinning');
    reel2.classList.remove('spinning');
    reel3.classList.remove('spinning');

    return { reel1: reel1Result, reel2: reel2Result, reel3: reel3Result };
}

function getRandomSymbol() {
    return gameState.symbols[Math.floor(Math.random() * gameState.symbols.length)];
}

function calculateWinnings(results) {
    const { reel1, reel2, reel3 } = results;
    const allMatch = reel1 === reel2 && reel2 === reel3;
    const twoMatch = reel1 === reel2 || reel2 === reel3 || reel1 === reel3;

    // 20% chance of hallucination (absurd result)
    if (Math.random() < 0.2) {
        return {
            type: 'hallucination',
            winnings: Math.floor(gameState.currentCost * (Math.random() * 3 - 0.5)), // Can be negative
            message: gameState.hallucinations[Math.floor(Math.random() * gameState.hallucinations.length)]
        };
    }

    // 1% chance of VC Roulette jackpot
    if (Math.random() < 0.01) {
        return {
            type: 'jackpot',
            winnings: gameState.currentCost * 50,
            message: '🎉 VC ROULETTE JACKPOT! 🎉 "This funding round values us at $500M"'
        };
    }

    // Three in a row
    if (allMatch) {
        return {
            type: 'win-big',
            winnings: gameState.currentCost * 10,
            message: `🎊 THREE IN A ROW! All ${reel1} = MASSIVE TOKENS! 🎊`
        };
    }

    // Two in a row
    if (twoMatch) {
        const winAmount = Math.floor(gameState.currentCost * 2.5);
        return {
            type: 'win',
            winnings: winAmount,
            message: `✨ Two in a row! +${winAmount} tokens (barely profitable)`
        };
    }

    // No match - loss
    return {
        type: 'loss',
        winnings: 0,
        message: `❌ No match. Your inference was hallucinated. Tokens gone. 📉`
    };
}

function showResults(results) {
    const outcome = calculateWinnings(results);
    const { type, winnings, message } = outcome;

    // Update tokens
    gameState.tokens += winnings;
    gameState.totalWinnings += winnings;

    // Show message
    prizeMessage.textContent = message;
    prizeMessage.className = `prize-message prize-${type}`;

    // Add to history
    addToHistory(results, outcome);

    // Warning/success message
    if (winnings > 0) {
        showWarning(`+${winnings} tokens! (Total: ${gameState.totalWinnings})`, 'success');
    } else if (winnings < 0) {
        showWarning(`${winnings} tokens lost!`, 'danger');
    }

    // Game over check
    if (gameState.tokens <= 0) {
        prizeMessage.textContent = '💀 GAME OVER - You have been disrupted 💀';
        prizeMessage.className = 'prize-message prize-loss';
        spinButton.disabled = true;
        showWarning('Bankrupt! Reset to play again.', 'danger');
    }

    // Token low warning
    if (gameState.tokens > 0 && gameState.tokens <= gameState.currentCost) {
        showWarning('⚠️ Only one spin left!', 'danger');
    }
}

function addToHistory(results, outcome) {
    const symbols = `${results.reel1} ${results.reel2} ${results.reel3}`;
    const resultClass = outcome.winnings > 0 ? 'history-win' : outcome.winnings < 0 ? 'history-loss' : 'history-neutral';
    const resultText = outcome.winnings > 0 ? `+${outcome.winnings}` : outcome.winnings < 0 ? `${outcome.winnings}` : 'Break even';

    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <span class="history-symbols">${symbols}</span>
        <span class="history-result ${resultClass}">${resultText}</span>
    `;

    // Add to top of history
    if (historyContainer.querySelector('.history-empty')) {
        historyContainer.innerHTML = '';
    }

    historyContainer.insertBefore(historyItem, historyContainer.firstChild);

    // Keep only last 10 items
    while (historyContainer.children.length > 10) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

// ============================================
// RESET GAME
// ============================================

function handleReset() {
    gameState.tokens = 100;
    gameState.baseCost = 10;
    gameState.currentCost = 10;
    gameState.spins = 0;
    gameState.totalWinnings = 0;
    gameState.isSpinning = false;

    prizeMessage.textContent = '';
    prizeMessage.className = 'prize-message';
    historyContainer.innerHTML = '<p class="history-empty">No spins yet. Take a chance!</p>';
    warningMessage.textContent = '';
    warningMessage.className = '';

    reel1.querySelector('.reel-symbol').textContent = '🤖';
    reel2.querySelector('.reel-symbol').textContent = '💬';
    reel3.querySelector('.reel-symbol').textContent = '📈';

    updateUI();
    showWarning('Game reset! Starting with 100 tokens. May your hallucinations be profitable! 🎲', 'success');
}

// ============================================
// UI UPDATES
// ============================================

function updateUI() {
    tokenDisplay.textContent = gameState.tokens;
    costDisplay.textContent = gameState.currentCost;
    spinCost.textContent = `(-${gameState.currentCost})`;

    // Disable spin button if insufficient tokens
    if (gameState.tokens < gameState.currentCost) {
        spinButton.disabled = true;
    } else if (!gameState.isSpinning) {
        spinButton.disabled = false;
    }
}

function showWarning(message, type) {
    warningMessage.textContent = message;
    warningMessage.className = `warning-message warning-${type}`;

    // Clear after 5 seconds
    setTimeout(() => {
        warningMessage.textContent = '';
        warningMessage.className = '';
    }, 5000);
}

function updateQuote() {
    quoteDisplay.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// ============================================
// DEBUG HELPERS (for testing)
// ============================================

window.addTokens = (amount) => {
    gameState.tokens += amount;
    updateUI();
    console.log(`Added ${amount} tokens. Total: ${gameState.tokens}`);
};

window.viewGameState = () => {
    console.table(gameState);
};
