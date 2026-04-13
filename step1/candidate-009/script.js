// Game state
const gameState = {
    tokens: 1000,
    totalSpent: 0,
    spinsPlayed: 0,
    spinsWon: 0,
    isSpinning: false,
};

// Game symbols and their properties
const symbols = [
    'HALLUCINATION',
    'INFERENCE',
    'TOKENS',
    'BIAS',
    'HYPE',
    'PROMPT'
];

// Win messages for different outcomes
const winMessages = {
    jackpot: [
        "🎉 THREE TOKENS! The house loses! (Ironically, you're still paying us)",
        "💰 TOKEN TRINITY! Congratulations on your lucky error in our favor!",
        "🚀 TOKENS TOKENS TOKENS! You beat the algorithm... or did it let you?"
    ],
    prompt: [
        "✨ Three PROMPTS! At least you tried.",
        "📝 PROMPT SYNC! Sometimes consistency pays off!",
        "🎯 Triple PROMPT! The jailbreak was worth it!"
    ],
    hype: [
        "📢 HYPE HYPE HYPE! Marketing majors win again!",
        "🚀 The narrative is strong with this one!",
        "💫 Three HYPES! Our investor relations team thanks you!"
    ],
    inference: [
        "⚙️ Three INFERENCES! Your prompt got computed!",
        "🧠 INFERENCE STACK! We processed something!",
        "💭 Inference Chain Activated! Probably correctly!"
    ],
    pair: [
        "🤝 Two Matching! A mercy reward from our CEO.",
        "👯 Pair Match! Not quite a breakthrough.",
        "🔗 Double luck! The neural net says 'meh'."
    ],
    loss: [
        "❌ No match. The AI remains unpredictable.",
        "🎰 That's rough, buddy. Token tax collected.",
        "📉 Market correction. Deflation event.",
        "⚡ Inference timeout. Please try again later.",
        "🤔 Your prompt was too vague. Hallucination incoming!"
    ]
};

// DOM Elements
const tokenDisplay = document.getElementById('tokenDisplay');
const totalSpentDisplay = document.getElementById('totalSpentDisplay');
const winRateDisplay = document.getElementById('winRateDisplay');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const resultMessage = document.getElementById('resultMessage');
const resultPayout = document.getElementById('resultPayout');
const resultPanel = document.getElementById('resultPanel');
const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

const SPIN_COST = 50;

// Initialize event listeners
spinButton.addEventListener('click', handleSpin);
resetButton.addEventListener('click', handleReset);

// Helper function to get random symbol
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Helper function to get random spin outcome (with some bias toward certain patterns)
function getSpinOutcome() {
    const outcome = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    return outcome;
}

// Calculate position of symbol in the reel
function getSymbolPosition(symbol) {
    return symbols.indexOf(symbol);
}

// Animate a single reel
async function spinReel(reelElement, targetSymbol) {
    return new Promise((resolve) => {
        const targetPosition = getSymbolPosition(targetSymbol);
        const spinDuration = 1500 + Math.random() * 500; // Variable spin time
        const itemHeight = 80;
        
        // Quick spin animation
        reelElement.classList.add('spinning');
        
        // Calculate how many times to spin and final position
        const fullRotations = 3;
        const totalDistance = fullRotations * itemHeight * symbols.length + (targetPosition * itemHeight);
        
        setTimeout(() => {
            reelElement.classList.remove('spinning');
            reelElement.style.transform = `translateY(-${targetPosition * itemHeight}px)`;
            reelElement.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                reelElement.style.transition = 'transform 0.1s linear';
                resolve();
            }, 550);
        }, spinDuration);
    });
}

// Check for winning combinations
function checkWin(outcome) {
    const [symbol1, symbol2, symbol3] = outcome;
    
    // Three of a kind
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        return {
            type: 'three',
            symbol: symbol1,
            payout: getThreeOfAKindPayout(symbol1)
        };
    }
    
    // Two of a kind
    if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
        return {
            type: 'pair',
            payout: 25
        };
    }
    
    // No win
    return {
        type: 'loss',
        payout: 0
    };
}

// Get payout for three of a kind
function getThreeOfAKindPayout(symbol) {
    const payouts = {
        'TOKENS': 500,
        'PROMPT': 200,
        'HYPE': 150,
        'INFERENCE': 100,
        'HALLUCINATION': 75,
        'BIAS': 50
    };
    return payouts[symbol] || 50;
}

// Get message for win result
function getResultMessage(result) {
    if (result.type === 'three') {
        const symbol = result.symbol;
        const messagePool = winMessages[symbol.toLowerCase()] || winMessages['pair'];
        return messagePool[Math.floor(Math.random() * messagePool.length)];
    } else if (result.type === 'pair') {
        return winMessages.pair[Math.floor(Math.random() * winMessages.pair.length)];
    } else {
        return winMessages.loss[Math.floor(Math.random() * winMessages.loss.length)];
    }
}

// Update UI displays
function updateDisplay() {
    tokenDisplay.textContent = gameState.tokens;
    totalSpentDisplay.textContent = gameState.totalSpent;
    
    const winRate = gameState.spinsPlayed > 0 
        ? Math.round((gameState.spinsWon / gameState.spinsPlayed) * 100)
        : 0;
    winRateDisplay.textContent = winRate + '%';
    
    spinButton.disabled = gameState.tokens < SPIN_COST;
    if (gameState.tokens === 0) {
        spinButton.textContent = 'BANKRUPTCY ACHIEVED';
    } else {
        spinButton.textContent = `SPIN (Costs ${SPIN_COST} tokens)`;
    }
}

// Main spin handler
async function handleSpin() {
    if (gameState.isSpinning || gameState.tokens < SPIN_COST) {
        return;
    }
    
    gameState.isSpinning = true;
    spinButton.disabled = true;
    resultMessage.textContent = '';
    resultPayout.textContent = '';
    
    // Deduct spin cost
    gameState.tokens -= SPIN_COST;
    gameState.totalSpent += SPIN_COST;
    gameState.spinsPlayed += 1;
    updateDisplay();
    
    // Get spin outcome
    const outcome = getSpinOutcome();
    
    // Animate reels
    const spinPromises = reels.map((reel, index) => spinReel(reel, outcome[index]));
    await Promise.all(spinPromises);
    
    // Check for win
    const result = checkWin(outcome);
    
    // Display result
    const message = getResultMessage(result);
    resultMessage.textContent = message;
    resultMessage.classList.toggle('lost', result.type === 'loss');
    
    if (result.payout > 0) {
        gameState.tokens += result.payout;
        gameState.spinsWon += 1;
        resultPayout.textContent = `+${result.payout} tokens!`;
        resultPayout.classList.add('jackpot');
        resultPayout.classList.remove('lost');
    } else {
        resultPayout.textContent = 'No tokens won.';
        resultPayout.classList.remove('jackpot');
        resultPayout.classList.add('lost');
    }
    
    updateDisplay();
    
    // Re-enable spin button
    setTimeout(() => {
        gameState.isSpinning = false;
        spinButton.disabled = gameState.tokens < SPIN_COST;
        resultPayout.classList.remove('jackpot');
    }, 500);
}

// Reset game
function handleReset() {
    gameState.tokens = 1000;
    gameState.totalSpent = 0;
    gameState.spinsPlayed = 0;
    gameState.spinsWon = 0;
    gameState.isSpinning = false;
    
    resultMessage.textContent = '';
    resultPayout.textContent = '';
    resultMessage.classList.remove('lost');
    resultPayout.classList.remove('lost');
    
    // Reset reel positions
    reels.forEach(reel => {
        reel.style.transform = 'translateY(0)';
        reel.style.transition = 'transform 0.1s linear';
    });
    
    updateDisplay();
    spinButton.disabled = false;
}

// Initialize the game
updateDisplay();
