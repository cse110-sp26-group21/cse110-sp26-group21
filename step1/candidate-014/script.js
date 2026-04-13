// Game Configuration
const GAME_CONFIG = {
    STARTING_TOKENS: 1000,
    SPIN_COST: 10,
    SYMBOL_COUNT: 6,
    SPIN_DURATION: 600, // milliseconds
    SYMBOLS: ['🤖', '💰', '🐴', '❌', '📊', '💥']
};

// Paytable - Payouts for matching combinations
const PAYTABLE = {
    '🤖🤖🤖': 50,
    '💰💰💰': 200,
    '🐴🐴🐴': 75,
    '❌❌❌': 10,
    '📊📊📊': 60,
    '💥💥💥': 150
};

// Funny messages for different scenarios
const MESSAGES = {
    spinStart: [
        "Consulting the LLM gods...",
        "Spinning reality into hallucinations...",
        "Processing inference...",
        "Spinning with 99% confidence!",
        "Running on a potato GPU..."
    ],
    wins: [
        "Your scaling paid off! 🚀",
        "The token gods have smiled upon you!",
        "Bullish AI energy detected! 📈",
        "Critical hit! Tokens generated from thin air!",
        "You've achieved semantic alignment with profit!"
    ],
    jackpot: [
        "🎉 JACKPOT! Your model just went viral! 🎉",
        "🎉 SINGULARITY ACHIEVED - You got rich quick! 🎉",
        "🎉 This prediction market just paid out BIGLY! 🎉"
    ],
    losses: [
        "Market corrected. Much pain. Very loss.",
        "Your model overfit the casino. F to pay respects.",
        "Rate limited. Please try again later.",
        "Token outliers exceed maximum inference budget.",
        "Confidence: 100%. Accuracy: 0%."
    ],
    outOfTokens: [
        "You've become an unprofitable startup. Time to pivot!",
        "Out of tokens. Your VC funding has dried up.",
        "Bankrupt. Would you like to pivot to web3?",
        "Your API credits have expired. Subscribe to Token Premium+"
    ],
    hallucination: [
        "The model is very confident in this result (it's wrong)",
        "That didn't happen, but the AI swears it did",
        "Creative inference detected! 🎨"
    ]
};

// Game State
let gameState = {
    tokens: GAME_CONFIG.STARTING_TOKENS,
    sessionEarnings: 0,
    spinCount: 0,
    isSpinning: false,
    reelStates: [0, 0, 0]
};

// DOM Elements
const elements = {
    balance: document.getElementById('balance'),
    earnings: document.getElementById('earnings'),
    spinCount: document.getElementById('spinCount'),
    spinButton: document.getElementById('spinButton'),
    resetButton: document.getElementById('resetButton'),
    messageDisplay: document.getElementById('messageDisplay'),
    slots: [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')],
    reels: document.querySelectorAll('.reel')
};

// Initialize the game
function initGame() {
    updateDisplay();
    elements.spinButton.addEventListener('click', spinReels);
    elements.resetButton.addEventListener('click', resetSession);
}

// Update UI display
function updateDisplay() {
    elements.balance.textContent = gameState.tokens;
    elements.earnings.textContent = gameState.sessionEarnings;
    elements.spinCount.textContent = gameState.spinCount;
    
    // Disable spin button if not enough tokens
    if (gameState.tokens < GAME_CONFIG.SPIN_COST || gameState.isSpinning) {
        elements.spinButton.disabled = true;
    } else {
        elements.spinButton.disabled = false;
    }

    // Check if broke
    if (gameState.tokens === 0 && !gameState.isSpinning) {
        showMessage(getRandomMessage(MESSAGES.outOfTokens), 'loss');
    }
}

// Spin the reels
function spinReels() {
    if (gameState.isSpinning || gameState.tokens < GAME_CONFIG.SPIN_COST) {
        return;
    }

    gameState.isSpinning = true;
    gameState.tokens -= GAME_CONFIG.SPIN_COST;
    gameState.spinCount += 1;
    
    showMessage(getRandomMessage(MESSAGES.spinStart), 'default');
    
    // Animate spinning
    elements.slots.forEach((slot, index) => {
        slot.classList.add('spinning');
    });

    // Generate random outcomes after spin completes
    setTimeout(() => {
        stopReels();
    }, GAME_CONFIG.SPIN_DURATION);

    updateDisplay();
}

// Stop the reels and determine results
function stopReels() {
    const outcomes = [];
    
    elements.slots.forEach((slot, index) => {
        // Random symbol (0-5)
        const randomIndex = Math.floor(Math.random() * GAME_CONFIG.SYMBOL_COUNT);
        gameState.reelStates[index] = randomIndex;
        outcomes.push(GAME_CONFIG.SYMBOLS[randomIndex]);
        
        // Calculate the position to stop at
        const stopPosition = randomIndex * 150;
        const reel = elements.reels[index];
        reel.style.transform = `translateY(-${stopPosition}px)`;
        
        slot.classList.remove('spinning');
    });

    gameState.isSpinning = false;
    
    // Check for wins
    checkWinConditions(outcomes);
    updateDisplay();
}

// Check if we have a winning combination
function checkWinConditions(outcomes) {
    const outcomeString = outcomes.join('');
    
    // Check if all three match (jackpot)
    if (outcomes[0] === outcomes[1] && outcomes[1] === outcomes[2]) {
        const winAmount = PAYTABLE[outcomeString];
        
        if (winAmount >= 150) {
            // Jackpot!
            gameState.tokens += winAmount;
            gameState.sessionEarnings += winAmount;
            showMessage(`${getRandomMessage(MESSAGES.jackpot)} +${winAmount} tokens!`, 'jackpot');
        } else if (winAmount >= 75) {
            // Big win
            gameState.tokens += winAmount;
            gameState.sessionEarnings += winAmount;
            showMessage(`${getRandomMessage(MESSAGES.wins)} +${winAmount} tokens!`, 'win');
        } else if (winAmount === 10) {
            // Consolation prize
            gameState.tokens += winAmount;
            gameState.sessionEarnings += winAmount;
            showMessage(`Better luck next time? +${winAmount} tokens...`, 'win');
        }
    } else {
        // No match - loss
        showMessage(`${getRandomMessage(MESSAGES.losses)} (-${GAME_CONFIG.SPIN_COST} tokens)`, 'loss');
    }
}

// Display a message
function showMessage(text, type = 'default') {
    elements.messageDisplay.textContent = text;
    elements.messageDisplay.className = `message-display ${type}`;
    
    // Clear message after 4 seconds if not a jackpot
    if (type !== 'jackpot') {
        setTimeout(() => {
            elements.messageDisplay.className = 'message-display hidden';
        }, 4000);
    }
}

// Reset the session
function resetSession() {
    gameState = {
        tokens: GAME_CONFIG.STARTING_TOKENS,
        sessionEarnings: 0,
        spinCount: 0,
        isSpinning: false,
        reelStates: [0, 0, 0]
    };
    
    // Reset reel positions
    elements.reels.forEach(reel => {
        reel.style.transform = 'translateY(0px)';
    });
    
    showMessage("Session reset! Starting fresh with new tokens.", 'default');
    updateDisplay();
}

// Utility function to get random message
function getRandomMessage(messageArray) {
    return messageArray[Math.floor(Math.random() * messageArray.length)];
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
