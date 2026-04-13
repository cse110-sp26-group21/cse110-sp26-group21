// AI Token Waster 3000 - Game Logic

const SYMBOLS = {
    robot: '🤖',
    storage: '💾',
    money: '💸',
    target: '🎯',
    stock: '📈',
    warning: '⚠️',
    fire: '🔥',
    skull: '💀'
};

const SPIN_COST = 10;
const ANIMATION_DURATION = 2500;

let gameState = {
    tokens: 1000,
    totalSpent: 0,
    hallucinations: 0,
    isSpinning: false
};

const elements = {
    tokenDisplay: document.getElementById('tokenDisplay'),
    totalSpent: document.getElementById('totalSpent'),
    hallucinations: document.getElementById('hallucinations'),
    reels: [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ],
    spinBtn: document.getElementById('spinBtn'),
    maxBetBtn: document.getElementById('maxBetBtn'),
    resetBtn: document.getElementById('resetBtn'),
    message: document.getElementById('message'),
    winMessage: document.getElementById('winMessage')
};

const messages = {
    spinning: [
        'Calculating... should work this time™',
        'Hallucinating the perfect combination...',
        'GPU cores melting 🔥',
        'Inference engine go brrr',
        'Downloading more tokens...',
        'Neural networks firing on all cylinders (or maybe none)'
    ],
    loss: [
        'The model was overfit on your wallet',
        'Your tokens were not in the training data',
        'A critical error occurred (it was a feature, not a bug)',
        'Server returned 500: Insufficient Tokens',
        'Alignment check failed. Your money is not aligned with our interests.',
        'Context window exceeded. Your tokens have left the building.'
    ],
    win: [
        'HALLUCINATION DETECTED - But it paid off!',
        'Plot twist: The AI actually worked.',
        'By pure luck (or overfitting)',
        'Somehow correct (please don\'t ask how)',
        'The probability gods have smiled upon you',
        'Your tokens have ascended to another dimension'
    ]
};

const payouts = {
    threeMatch: {
        name: 'Three of a Kind (Overfit)',
        payment: 500
    },
    twoMatch: {
        name: 'Partial Match (Working as intended™)',
        payment: 25
    },
    noMatch: {
        name: 'Complete System Failure',
        payment: -50
    }
};

function getRandomSymbol() {
    const symbolArray = Object.values(SYMBOLS);
    return symbolArray[Math.floor(Math.random() * symbolArray.length)];
}

function spinReel(element) {
    return new Promise(resolve => {
        element.classList.add('spinning');
        
        let rotations = 0;
        const maxRotations = 20 + Math.random() * 10;
        
        const spinInterval = setInterval(() => {
            const symbol = getRandomSymbol();
            element.querySelector('.symbol').textContent = symbol;
            rotations++;
            
            if (rotations > maxRotations) {
                clearInterval(spinInterval);
                element.classList.remove('spinning');
                resolve(element.querySelector('.symbol').textContent);
            }
        }, 100);
    });
}

async function spin() {
    if (gameState.isSpinning || gameState.tokens < SPIN_COST) {
        return;
    }

    gameState.isSpinning = true;
    gameState.tokens -= SPIN_COST;
    gameState.totalSpent += SPIN_COST;
    updateDisplay();
    
    elements.spinBtn.disabled = true;
    elements.maxBetBtn.disabled = true;

    // Show spinning message
    const spinningMessages = messages.spinning;
    elements.message.textContent = spinningMessages[
        Math.floor(Math.random() * spinningMessages.length)
    ];

    // Spin all reels concurrently
    const results = await Promise.all(
        elements.reels.map(reel => spinReel(reel))
    );

    setTimeout(() => {
        evaluateResults(results);
        gameState.isSpinning = false;
        elements.spinBtn.disabled = gameState.tokens < SPIN_COST;
        elements.maxBetBtn.disabled = gameState.tokens < SPIN_COST;
    }, 500);
}

function evaluateResults(results) {
    const [r1, r2, r3] = results;
    
    // Clear previous messages
    elements.message.textContent = '';
    elements.winMessage.textContent = '';

    // Check for matches
    const allMatch = r1 === r2 && r2 === r3;
    const twoMatch = (r1 === r2 || r2 === r3 || r1 === r3);

    let payout = 0;
    let resultMessage = '';

    if (allMatch) {
        payout = payouts.threeMatch.payment;
        resultMessage = `🎉 ${payouts.threeMatch.name}! +${payout} tokens`;
        gameState.hallucinations++;
    } else if (twoMatch) {
        payout = payouts.twoMatch.payment;
        resultMessage = `✨ ${payouts.twoMatch.name}! +${payout} tokens`;
    } else {
        payout = payouts.noMatch.payment;
        resultMessage = `😅 ${payouts.noMatch.name}: ${payout} tokens`;
    }

    gameState.tokens += payout;
    updateDisplay();

    // Display result message with appropriate style
    if (payout > 0) {
        elements.winMessage.textContent = resultMessage;
        elements.message.textContent = messages.win[
            Math.floor(Math.random() * messages.win.length)
        ];
    } else {
        elements.message.textContent = messages.loss[
            Math.floor(Math.random() * messages.loss.length)
        ];
        elements.winMessage.textContent = resultMessage;
        elements.winMessage.style.color = '#ff6b6b';
    }

    // Check for game over
    if (gameState.tokens <= 0) {
        elements.message.textContent = 'BANKRUPTCY: Your GPU rental bill has been processed.';
        elements.spinBtn.disabled = true;
        elements.maxBetBtn.disabled = true;
        elements.winMessage.textContent = 'Game Over - You ran out of tokens!';
        elements.winMessage.style.color = '#ff0000';
    } else if (gameState.tokens < SPIN_COST) {
        elements.spinBtn.disabled = true;
        elements.maxBetBtn.disabled = true;
    }
}

function updateDisplay() {
    elements.tokenDisplay.textContent = gameState.tokens;
    elements.totalSpent.textContent = gameState.totalSpent;
    elements.hallucinations.textContent = gameState.hallucinations;

    // Update button states
    const canSpin = gameState.tokens >= SPIN_COST && !gameState.isSpinning;
    elements.spinBtn.disabled = !canSpin;
    elements.maxBetBtn.disabled = !canSpin;
}

function maxBet() {
    if (gameState.isSpinning || gameState.tokens < SPIN_COST) {
        return;
    }

    // Spin multiple times rapidly
    const spinsToPerform = Math.floor(gameState.tokens / SPIN_COST);
    elements.message.textContent = `🚀 YOLO MODE: Betting all ${spinsToPerform} spins! Tokens go brrrrrr...`;
    elements.spinBtn.disabled = true;
    elements.maxBetBtn.disabled = true;

    let spinCount = 0;
    const spinInterval = setInterval(async () => {
        if (spinCount >= spinsToPerform || gameState.tokens < SPIN_COST) {
            clearInterval(spinInterval);
            elements.spinBtn.disabled = gameState.tokens < SPIN_COST;
            elements.maxBetBtn.disabled = gameState.tokens < SPIN_COST;
            
            if (gameState.tokens <= 0) {
                elements.winMessage.textContent = 'YOLO went wrong. You\'re bankrupt.';
                elements.winMessage.style.color = '#ff0000';
                elements.spinBtn.disabled = true;
                elements.maxBetBtn.disabled = true;
            }
            return;
        }

        await spin();
        spinCount++;
    }, 3000); // 3 seconds between spins for auto-play
}

function reset() {
    if (confirm('Are you sure? This will reset all your tokens to 1000.')) {
        gameState = {
            tokens: 1000,
            totalSpent: 0,
            hallucinations: 0,
            isSpinning: false
        };
        elements.message.textContent = '🔄 Game Reset. Fresh tokens, same poor decisions.';
        elements.winMessage.textContent = '';
        
        // Reset reels to initial state
        elements.reels.forEach(reel => {
            reel.querySelector('.symbol').textContent = '🎲';
        });
        
        updateDisplay();
    }
}

// Event listeners
elements.spinBtn.addEventListener('click', spin);
elements.maxBetBtn.addEventListener('click', maxBet);
elements.resetBtn.addEventListener('click', reset);

// Keyboard support
document.addEventListener('keypress', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        spin();
    }
});

// Initialize display
updateDisplay();
elements.message.textContent = 'Welcome to the AI Token Waster 3000™! Press SPIN or hit SPACE to waste money like a VC-funded startup.';
