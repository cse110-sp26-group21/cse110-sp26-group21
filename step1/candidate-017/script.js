// ========================================
// AI Token Slots - Game Logic & Mechanics
// ========================================

const GAME_CONFIG = {
    INITIAL_TOKENS: 1000,
    SPIN_COST: 10,
    REEL_COUNT: 3,
    SYMBOLS: [
        'Hallucination',
        'Inference Cost',
        'Model X.0',
        'Token Billing',
        'Overhyped™',
        'Data Leak'
    ],
    SPIN_DURATION: 500, // milliseconds
    PAYOUTS: {
        'Hallucination': 50,
        'Inference Cost': 75,
        'Model X.0': 100,
        'Token Billing': -50,
        'Overhyped™': 200,
        'Data Leak': 500
    },
    MATCH_TWO_PAYOUT: 5
};

// Game State
let gameState = {
    tokens: GAME_CONFIG.INITIAL_TOKENS,
    isSpinning: false,
    reelPositions: [0, 0, 0]
};

// DOM Elements
const tokenCountEl = document.getElementById('tokenCount');
const statusTextEl = document.getElementById('statusText');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const windowDisplays = [
    document.getElementById('window1'),
    document.getElementById('window2'),
    document.getElementById('window3')
];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    gameState.tokens = GAME_CONFIG.INITIAL_TOKENS;
    gameState.isSpinning = false;
    gameState.reelPositions = [0, 0, 0];
    
    spinButton.addEventListener('click', handleSpin);
    resetButton.addEventListener('click', handleReset);
    
    updateDisplay();
    displayInitialResults();
}

function displayInitialResults() {
    windowDisplays.forEach((display, index) => {
        const symbol = GAME_CONFIG.SYMBOLS[gameState.reelPositions[index]];
        display.textContent = getSymbolEmoji(symbol);
        display.className = 'window-display result';
    });
}

function handleSpin() {
    // Check if game is already spinning
    if (gameState.isSpinning) {
        return;
    }

    // Check if player has enough tokens
    if (gameState.tokens < GAME_CONFIG.SPIN_COST) {
        updateStatus("Not enough tokens! Game Over. You're as broke as OpenAI's margins.", '#f87171');
        spinButton.disabled = true;
        return;
    }

    // Deduct spin cost
    gameState.tokens -= GAME_CONFIG.SPIN_COST;
    gameState.isSpinning = true;
    spinButton.disabled = true;
    
    updateStatus('Spinning...');
    
    // Add spinning animation to all reels and windows
    reels.forEach(reel => reel.classList.add('spinning'));
    windowDisplays.forEach(display => display.classList.add('spinning'));

    // Generate random positions for each reel
    const spinDuration = GAME_CONFIG.SPIN_DURATION;
    const startTime = Date.now();

    // Animate the spin
    const spinInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        
        if (elapsed >= spinDuration) {
            clearInterval(spinInterval);
            finishSpin();
        } else {
            // Update visual feedback during spin
            gameState.reelPositions.forEach((_, index) => {
                const randomPos = Math.floor(Math.random() * GAME_CONFIG.SYMBOLS.length);
                reels[index].style.transform = `translateY(-${randomPos * 80}px)`;
            });
        }
    }, 20);
}

function finishSpin() {
    // Generate final reel positions
    gameState.reelPositions = [
        Math.floor(Math.random() * GAME_CONFIG.SYMBOLS.length),
        Math.floor(Math.random() * GAME_CONFIG.SYMBOLS.length),
        Math.floor(Math.random() * GAME_CONFIG.SYMBOLS.length)
    ];

    // Get the symbols from the final positions
    const results = gameState.reelPositions.map(pos => GAME_CONFIG.SYMBOLS[pos]);

    // Update window displays with final results
    results.forEach((symbol, index) => {
        const display = windowDisplays[index];
        display.textContent = getSymbolEmoji(symbol);
        display.className = 'window-display result jackpot';
    });

    // Remove spinning animations
    reels.forEach(reel => {
        reel.classList.remove('spinning');
        const pos = gameState.reelPositions[reels.indexOf(reel)];
        reel.style.transform = `translateY(-${pos * 80}px)`;
    });
    
    windowDisplays.forEach(display => display.classList.remove('spinning'));

    // Check for winning combinations and calculate payout
    const payout = calculatePayout(results);
    
    // Apply payout
    gameState.tokens += payout;
    
    // Update UI
    gameState.isSpinning = false;
    spinButton.disabled = false;
    updateDisplay();
    
    // Display result message
    displayResult(results, payout);
}

function calculatePayout(results) {
    const [reel1, reel2, reel3] = results;

    // Check for three of a kind (jackpot)
    if (reel1 === reel2 && reel2 === reel3) {
        const symbol = reel1;
        const payout = GAME_CONFIG.PAYOUTS[symbol] || 0;
        highlightSymbol(symbol);
        return payout;
    }

    // Check for two of a kind
    if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        return GAME_CONFIG.MATCH_TWO_PAYOUT;
    }

    // No match
    return 0;
}

function highlightSymbol(symbol) {
    // Add extra animation/highlight for jackpot
    windowDisplays.forEach((display, index) => {
        if (display.textContent === getSymbolEmoji(symbol)) {
            display.classList.add('highlight');
            setTimeout(() => display.classList.remove('highlight'), 600);
        }
    });
}

function displayResult(results, payout) {
    let message = '';
    
    // Check for three of a kind
    const [reel1, reel2, reel3] = results;
    
    if (reel1 === reel2 && reel2 === reel3) {
        const symbol = reel1;
        if (payout > 0) {
            message = getWinMessage(symbol, payout);
        } else {
            message = getLossMessage(symbol, payout);
        }
    } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        message = `Two matches! +${GAME_CONFIG.MATCH_TWO_PAYOUT} tokens 🎟️ (You'll take what you can get)`;
    } else {
        message = getNoMatchMessage();
    }

    const color = payout > 0 ? '#4ade80' : '#f87171';
    updateStatus(message, color);
}

function getWinMessage(symbol, payout) {
    const messages = {
        'Hallucination': `Triple Hallucination! +${payout} tokens! (At least we're honest about it)`,
        'Inference Cost': `Triple Inference! +${payout} tokens! (Your AWS bills approve)`,
        'Model X.0': `Triple Model X.0! +${payout} tokens! (Ask us in 3 months if they're real)`,
        'Token Billing': `OH NO! Token Billing struck! ${payout} tokens lost! (Surprise! This was their plan all along)`,
        'Overhyped™': `BIGLY Overhyped! +${payout} tokens! (We're definitely disrupting something today™)`,
        'Data Leak': `DATA LEAK JACKPOT! +${payout} tokens! (Privacy? Never heard of her)`
    };
    return messages[symbol] || `Won +${payout} tokens!`;
}

function getLossMessage(symbol, payout) {
    return `Double penalty with ${symbol}! ${payout} tokens! (Yikes!)`;
}

function getNoMatchMessage() {
    const messages = [
        'No match. The algorithm has spoken. (It\'s probably hallucinating)',
        'Better luck next time! Your training data is insufficient.',
        'No match. Have you considered buying more tokens? (We have)',
        'Spin again! Our inference costs must be paid.',
        'No match. This is exactly as our ML models predicted.',
        'Better luck next time! (Narrator: There won\'t be)')
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function getSymbolEmoji(symbol) {
    const emojis = {
        'Hallucination': '👻',
        'Inference Cost': '💸',
        'Model X.0': '🤖',
        'Token Billing': '🧾',
        'Overhyped™': '📈',
        'Data Leak': '🔓'
    };
    return emojis[symbol] || '❓';
}

function updateDisplay() {
    tokenCountEl.textContent = gameState.tokens;
    
    // Update button disabled state
    if (gameState.tokens < GAME_CONFIG.SPIN_COST && !gameState.isSpinning) {
        spinButton.disabled = true;
    } else if (!gameState.isSpinning) {
        spinButton.disabled = false;
    }

    // Update status for edge cases
    if (gameState.tokens === 0 && !gameState.isSpinning) {
        updateStatus('Broke! Game Over. Welcome to bankruptcy.', '#f87171');
    } else if (gameState.tokens > 500 && !gameState.isSpinning) {
        updateStatus('You\'re winning! (Statistically impossible)', '#4ade80');
    }
}

function updateStatus(message, color = '#60a5fa') {
    statusTextEl.textContent = message;
    statusTextEl.style.color = color;
}

function handleReset() {
    if (confirm('Start a new game? (Your winnings will be forgotten by our AI)')) {
        gameState.tokens = GAME_CONFIG.INITIAL_TOKENS;
        gameState.isSpinning = false;
        gameState.reelPositions = [0, 0, 0];
        
        // Reset visual state
        reels.forEach(reel => {
            reel.classList.remove('spinning');
            reel.style.transform = 'translateY(0)';
        });
        
        windowDisplays.forEach(display => {
            display.classList.remove('spinning', 'highlight', 'jackpot');
        });
        
        spinButton.disabled = false;
        updateDisplay();
        displayInitialResults();
        updateStatus('Game reset! Ready to lose money in style', '#60a5fa');
    }
}

// Keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !gameState.isSpinning && gameState.tokens >= GAME_CONFIG.SPIN_COST) {
        e.preventDefault();
        handleSpin();
    }
    if (e.code === 'KeyR') {
        handleReset();
    }
});
