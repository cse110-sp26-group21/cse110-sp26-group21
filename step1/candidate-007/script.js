/* ===========================
   TokenRush AI™ Game Logic
   Satirical Slot Machine Engine
   =========================== */

// Game State
const gameState = {
    tokens: 1000,
    spinCost: 10,
    totalSpins: 0,
    biggestWin: 0,
    isSpinning: false
};

// Symbol definitions with multipliers and humor
const SYMBOLS = {
    '🪙': { name: 'Token', multiplier: 2 },           // 2x reward
    '✨': { name: 'Hype', multiplier: 5 },             // 5x payout - overhyped AI
    '🤖': { name: 'Robot', multiplier: 3 },           // 3x payout
    '❌': { name: 'Loss', multiplier: 0 },            // No payout
    '💸': { name: 'Inference Cost', multiplier: 0 }, // Loss
    '🎲': { name: 'Gamble', multiplier: 1 },          // Break even
    '📈': { name: 'Fake Gains', multiplier: 0 },      // Loss (ironic)
    '⚠️': { name: 'Model Warning', multiplier: 0 }   // Loss
};

// Humorous messages for different outcomes
const MESSAGES = {
    // Win messages
    wins: [
        "🎉 AI actually worked! Congratulations on beating the odds!",
        "✨ Your model hallucinated... MONEY? Unprecedented!",
        "💵 Tokens acquired! Inference costs somehow went DOWN!",
        "🤑 The algorithm blessed you. Don't question it.",
        "🚀 You've achieved hyper-scalable wealth redistribution!",
        "🎯 Model confidence: 100% (it's wrong about everything)",
        "📈 This totally legitimate profit is totally sustainable!",
        "🌟 Your tokens have been 'optimized' into MORE tokens!"
    ],
    // Loss messages
    losses: [
        "❌ Model hallucinated your tokens away. Classic.",
        "💸 Inference costs consumed your entire portfolio.",
        "😅 The algorithm decided you don't deserve this.",
        "⚠️ Warning: Model trained on financial advice forums",
        "📉 Your gains have been 'adjusted' to losses.",
        "🤦 Token bankruptcy achieved. Try again?",
        "💥 The model ate your money. It's learning!",
        "🚫 This wasn't the inference result you wanted."
    ],
    // Break even
    breakEven: [
        "➡️ The model is confused... but you broke even!",
        "🎲 Perfectly balanced, as all things should be.",
        "🤷 Neither winning nor losing. Peak AI strategy.",
        "⚖️ Scales of justice say: basically nothing happened.",
        "🎪 The simulation spun to zero profit.",
        "🖇️ You managed to get exactly nowhere. Impressive."
    ],
    // Insufficient funds
    insufficient: [
        "💰 Not enough tokens! Your account has been suspended.",
        "⛔ Insufficient funds for this inference run.",
        "🚫 ERROR: Poverty detected. Please retry after funding.",
        "💀 Your token wallet is empty. Mission failed.",
        "📵 Can't afford to gamble anymore. Sad day."
    ],
    // Jackpot
    jackpot: [
        "🎊🎊🎊 TRIPLE HYPE! AI has achieved SINGULARITY (lol)!",
        "💎 YOU'VE WON THE GRAND PRIZE! (of hilarity)",
        "👑 All hype symbols aligned! The prophecy is fulfilled!",
        "🌟 LEGEND STATUS: You broke the algorithm!",
        "🚀 MOON TIME! Your tokens have escaped the planet!"
    ]
};

// DOM Elements
const tokenCountEl = document.getElementById('tokenCount');
const messageEl = document.getElementById('message');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const totalSpinsEl = document.getElementById('totalSpins');
const biggestWinEl = document.getElementById('biggestWin');
const confidenceEl = document.getElementById('confidence');
const spinCostEl = document.getElementById('spinCost');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    spinButton.addEventListener('click', handleSpin);
    resetButton.addEventListener('click', handleReset);
});

/**
 * Main spin handler - handles game logic
 */
function handleSpin() {
    // Check if already spinning
    if (gameState.isSpinning) return;

    // Check for insufficient funds
    if (gameState.tokens < gameState.spinCost) {
        showMessage('💀 Not enough tokens! Your account has been frozen by the algorithm.', 'loss');
        return;
    }

    // Begin spin
    gameState.isSpinning = true;
    spinButton.disabled = true;
    messageEl.textContent = '⏳ Model is inferencing...';

    // Deduct spin cost
    gameState.tokens -= gameState.spinCost;
    gameState.totalSpins++;

    // Generate random results for each reel
    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();

    // Animate reels
    animateReel(reel1, result1, 0);
    animateReel(reel2, result2, 200);
    animateReel(reel3, result3, 400);

    // After animation completes, calculate results
    setTimeout(() => {
        processResult(result1, result2, result3);
        gameState.isSpinning = false;
        spinButton.disabled = false;
        updateUI();
    }, 1500);
}

/**
 * Get a random symbol from the symbols in the reel
 */
function getRandomSymbol() {
    const symbols = ['🤖', '💸', '🎲', '❌', '✨', '📈', '🪙', '⚠️'];
    return symbols[Math.floor(Math.random() * symbols.length)];
}

/**
 * Animate individual reel spin
 */
function animateReel(reel, targetSymbol, delay) {
    setTimeout(() => {
        reel.classList.add('spinning');
        const items = reel.querySelectorAll('.reel-item');
        
        // Find the target symbol's position
        let targetIndex = 0;
        items.forEach((item, index) => {
            if (item.textContent === targetSymbol) {
                targetIndex = index;
            }
        });

        // Calculate final position
        const offset = targetIndex * 70; // 70px per item
        setTimeout(() => {
            reel.style.transform = `translateY(-${offset}px)`;
            reel.classList.remove('spinning');
        }, 50);
    }, delay);
}

/**
 * Process the spin results and determine win/loss
 */
function processResult(symbol1, symbol2, symbol3) {
    // Check for all three matching (jackpot/big win)
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        handleJackpot(symbol1);
        return;
    }

    // Check for any two matching
    let payout = 0;
    let matchMessage = '';

    if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
        // Find the matching pair
        let matchingSymbol = symbol1 === symbol2 ? symbol1 : (symbol2 === symbol3 ? symbol2 : symbol3);
        const multiplier = SYMBOLS[matchingSymbol].multiplier;
        
        payout = gameState.spinCost * multiplier;
        matchMessage = ` (${SYMBOLS[matchingSymbol].name} streak!)`;
    }

    // Apply payout
    if (payout > 0) {
        gameState.tokens += payout;
        gameState.biggestWin = Math.max(gameState.biggestWin, payout);
        const msg = getRandomFromArray(MESSAGES.wins) + matchMessage;
        showMessage(`${msg}\n💰 Won ${payout} tokens!`, 'win');
        updateConfidence('Accurate');
    } else if (payout === 0 && ((symbol1 === symbol2 && symbol2 === symbol3) === false)) {
        // Check if all three are the same but loss symbol
        let isAllSame = symbol1 === symbol2 && symbol2 === symbol3;
        
        if (isAllSame && SYMBOLS[symbol1].multiplier === 0) {
            showMessage('🎪 Three losses in a row. At least you\'re consistent!', 'loss');
        } else {
            // No matches, random result-based message
            const randomMessage = Math.random() > 0.5 
                ? getRandomFromArray(MESSAGES.losses)
                : getRandomFromArray(MESSAGES.breakEven);
            showMessage(randomMessage, 'loss');
        }
        updateConfidence('Hallucinating');
    } else {
        showMessage(getRandomFromArray(MESSAGES.breakEven), 'warning');
        updateConfidence('Uncertain');
    }

    // Check for loss conditions
    if (gameState.tokens <= 0) {
        gameState.tokens = 0;
        gameState.isSpinning = true;
        spinButton.disabled = true;
        showMessage('💀 BANKRUPTCY! Your account has been liquidated. Game Over.', 'loss');
    }
}

/**
 * Handle the special jackpot win when all three reels match
 */
function handleJackpot(symbol) {
    let multiplier = SYMBOLS[symbol].multiplier;
    
    // Special hype boost for hype symbols
    if (symbol === '✨') {
        multiplier = 10; // Hype gets extra multiplier!
    }
    
    const payout = gameState.spinCost * multiplier * 3; // Triple multiplier for jackpot
    gameState.tokens += payout;
    gameState.biggestWin = Math.max(gameState.biggestWin, payout);

    const msg = getRandomFromArray(MESSAGES.jackpot);
    showMessage(`${msg}\n💎💎💎 JACKPOT PAYOUT: ${payout} TOKENS!`, 'win');
    updateConfidence('OVERFIT');
}

/**
 * Show a message to the user
 */
function showMessage(text, type = 'info') {
    messageEl.textContent = text;
    messageEl.classList.remove('message-win', 'message-loss');
    
    if (type === 'win') {
        messageEl.classList.add('message-win');
    } else if (type === 'loss') {
        messageEl.classList.add('message-loss');
    }
}

/**
 * Update the confidence stat display
 */
function updateConfidence(value) {
    confidenceEl.textContent = value;
}

/**
 * Update all UI elements
 */
function updateUI() {
    tokenCountEl.textContent = gameState.tokens.toLocaleString();
    totalSpinsEl.textContent = gameState.totalSpins;
    biggestWinEl.textContent = gameState.biggestWin.toLocaleString();
    spinCostEl.textContent = gameState.spinCost;
    
    // Disable button if can't afford spin
    spinButton.disabled = gameState.tokens < gameState.spinCost || gameState.isSpinning;
}

/**
 * Reset the game
 */
function handleReset() {
    if (confirm('🔄 Are you sure? This will reset your account balance to 1000 tokens.')) {
        gameState.tokens = 1000;
        gameState.totalSpins = 0;
        gameState.biggestWin = 0;
        gameState.isSpinning = false;
        
        // Reset reel positions
        reel1.style.transform = 'translateY(0)';
        reel2.style.transform = 'translateY(0)';
        reel3.style.transform = 'translateY(0)';
        
        updateUI();
        showMessage('✨ Account reset! Fresh tokens acquired. Ready to lose them again?', 'info');
        updateConfidence('N/A');
        spinButton.disabled = false;
    }
}

/**
 * Helper function to get random element from array
 */
function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Add some easter egg cheats (just for fun)
window.addEventListener('keydown', (e) => {
    // Press 'T' to add 100 tokens (for testing)
    if (e.key.toLowerCase() === 't' && e.ctrlKey) {
        gameState.tokens += 100;
        updateUI();
        showMessage('🎁 Testing tokens awarded! (Ctrl+T)', 'win');
    }
    
    // Press 'L' to lose all tokens (for testing)
    if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
        gameState.tokens = 0;
        updateUI();
        showMessage('💀 All tokens lost! (Ctrl+L)', 'loss');
    }
});
