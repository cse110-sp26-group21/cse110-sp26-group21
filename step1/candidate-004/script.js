// Game State
const gameState = {
    tokens: 100,
    totalSpent: 0,
    totalWon: 0,
    isSpinning: false,
};

// Game Configuration
const CONFIG = {
    REEL_ITEMS: [
        '🤖 Model',
        '💬 Hallucination',
        '✨ Token',
        '📊 Embedding',
        '💸 Inference Cost',
        '🎯 Precision',
        '🤔 Uncertain',
        '⚡ Attention',
    ],
    SPIN_DURATION: 2000, // milliseconds
    SPIN_SPEED: 100, // milliseconds per rotation
    WINNING_MATCHES: {
        '✨ Token': { match: 3, multiplier: 5, message: '🎉 TOKEN JACKPOT! The AI finally generated value!' },
        '🤖 Model': { match: 3, multiplier: 3, message: '✅ THREE MODELS! Exponential growth imminent!' },
        '💸 Inference Cost': { match: 3, multiplier: 0, message: '💀 Oh no, the API costs have consumed your tokens!' },
        '💬 Hallucination': { match: 3, multiplier: 0, message: '🚨 HALLUCINATION DETECTED! The model made things up (again).' },
        ANY: { match: 1, multiplier: 1.5, message: '👍 Partial match. Participation trophy awarded!' },
    },
};

// DOM Elements
const tokenAmountEl = document.getElementById('tokenAmount');
const totalSpentEl = document.getElementById('totalSpent');
const totalWonEl = document.getElementById('totalWon');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const betAmountEl = document.getElementById('betAmount');
const resultMessageEl = document.getElementById('resultMessage');
const winAnimationEl = document.getElementById('winAnimation');
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3'),
];
const winLine = document.querySelector('.win-line');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    spinButton.addEventListener('click', spin);
    resetButton.addEventListener('click', resetGame);
    betAmountEl.addEventListener('change', () => {
        if (gameState.isSpinning) {
            betAmountEl.disabled = true;
        }
    });
});

function spin() {
    if (gameState.isSpinning) return;

    const betAmount = parseInt(betAmountEl.value);

    // Check if player has enough tokens
    if (gameState.tokens < betAmount) {
        showResult(`Not enough tokens! You have ${gameState.tokens}, but bet is ${betAmount}.`, 'loss');
        return;
    }

    // Deduct bet
    gameState.tokens -= betAmount;
    gameState.totalSpent += betAmount;
    updateDisplay();

    // Disable controls during spin
    gameState.isSpinning = true;
    spinButton.disabled = true;
    betAmountEl.disabled = true;
    winLine.classList.add('animate');

    // Spin each reel
    const spinPromises = reels.map((reel, index) => spinReel(reel, index));

    Promise.all(spinPromises).then(() => {
        gameState.isSpinning = false;
        spinButton.disabled = false;
        betAmountEl.disabled = false;
        winLine.classList.remove('animate');

        // Check for wins
        checkWins(betAmount);
    });
}

function spinReel(reel, index) {
    return new Promise((resolve) => {
        reel.classList.add('spin');

        // Random number of spins (3-8 full rotations)
        const randomRotations = 3 + Math.random() * 5;
        const randomOffset = Math.floor(Math.random() * CONFIG.REEL_ITEMS.length);

        setTimeout(() => {
            reel.classList.remove('spin');

            // Calculate the final scroll position
            const itemHeight = 120;
            const finalPosition = randomOffset * itemHeight;

            // Smoothly stop at the result
            reel.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            reel.style.transform = `translateY(-${finalPosition}px)`;

            setTimeout(() => {
                reel.style.transition = 'none';
                resolve();
            }, 500);
        }, CONFIG.SPIN_DURATION);
    });
}

function getReelResult(reel) {
    // Get the currently visible item (the one at the center of the display)
    const transform = reel.style.transform;
    const match = transform.match(/translateY\(-(\d+)px\)/);
    const offsetPx = match ? parseInt(match[1]) : 0;
    const itemHeight = 120;
    const index = (offsetPx / itemHeight) % CONFIG.REEL_ITEMS.length;
    return CONFIG.REEL_ITEMS[Math.round(index)];
}

function checkWins(betAmount) {
    const result1 = getReelResult(reels[0]);
    const result2 = getReelResult(reels[1]);
    const result3 = getReelResult(reels[2]);

    // Clear previous result message
    resultMessageEl.innerHTML = '';
    resultMessageEl.classList.add('hidden');

    // Check for hallucination jackpot (instant loss)
    if (result1 === result2 && result2 === result3 && result3 === '💬 Hallucination') {
        const lossAmount = gameState.tokens; // Lose all remaining tokens
        gameState.tokens = 0;
        const message = `🚨 CATASTROPHIC HALLUCINATION! The AI completely made up the results.\n\nYou've lost EVERYTHING! ${lossAmount} tokens vaporized!`;
        showResult(message, 'jackpot');
        updateDisplay();
        return;
    }

    // Check for three-of-a-kind wins
    if (result1 === result2 && result2 === result3) {
        const matchInfo = CONFIG.WINNING_MATCHES[result3];
        if (matchInfo && matchInfo.multiplier > 0) {
            const winAmount = Math.floor(betAmount * matchInfo.multiplier);
            gameState.tokens += winAmount;
            gameState.totalWon += winAmount;
            showResult(matchInfo.message + ` You won ${winAmount} tokens! 💸`, 'jackpot');
            animateWin(winAmount);
            updateDisplay();
            return;
        }
    }

    // Check for any two-of-a-kind
    const matches = [
        result1 === result2,
        result2 === result3,
        result1 === result3,
    ];

    if (matches.some(m => m)) {
        const winAmount = Math.floor(betAmount * CONFIG.WINNING_MATCHES.ANY.multiplier);
        gameState.tokens += winAmount;
        gameState.totalWon += winAmount;
        showResult(CONFIG.WINNING_MATCHES.ANY.message + ` You won ${winAmount} tokens!`, 'win');
        animateWin(winAmount);
        updateDisplay();
        return;
    }

    // No match - loss
    showResult('❌ No match. Better luck next inference cycle! Your tokens have been redistributed to the cloud.', 'loss');
}

function showResult(message, type) {
    resultMessageEl.textContent = message;
    resultMessageEl.classList.remove('hidden', 'win', 'loss', 'jackpot');
    resultMessageEl.classList.add(type);

    // Auto-hide after a delay
    setTimeout(() => {
        resultMessageEl.classList.add('hidden');
    }, 5000);
}

function animateWin(amount) {
    // Create floating token animation
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    winAnimationEl.textContent = `+${amount}`;
    winAnimationEl.classList.remove('hidden');
    winAnimationEl.style.left = centerX + 'px';
    winAnimationEl.style.top = centerY + 'px';

    // Trigger animation
    winAnimationEl.offsetHeight; // Force reflow
    winAnimationEl.classList.add('hidden');
}

function updateDisplay() {
    tokenAmountEl.textContent = gameState.tokens;
    totalSpentEl.textContent = `Total Spent: ${gameState.totalSpent} tokens`;
    totalWonEl.textContent = `Total Won: ${gameState.totalWon} tokens`;

    // Show game over message
    if (gameState.tokens === 0 && gameState.isSpinning === false) {
        spinButton.disabled = true;
        if (gameState.totalSpent > 0) {
            showResult('💔 Game Over! Out of tokens. Great job supporting the model providers!', 'loss');
        }
    } else if (gameState.tokens > 0) {
        spinButton.disabled = false;
    }
}

function resetGame() {
    gameState.tokens = 100;
    gameState.totalSpent = 0;
    gameState.totalWon = 0;
    gameState.isSpinning = false;

    // Reset reels
    reels.forEach(reel => {
        reel.style.transform = 'translateY(0px)';
        reel.style.transition = 'none';
        reel.classList.remove('spin');
    });

    // Clear results
    resultMessageEl.classList.add('hidden');
    winAnimationEl.classList.add('hidden');

    // Re-enable controls
    spinButton.disabled = false;
    betAmountEl.disabled = false;

    updateDisplay();
}
