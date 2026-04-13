// AI Token Slots - Game Logic
// "Where your data goes to die"

const SYMBOLS = ['💰', '🚀', '📊', '🎱', '💭', '🤷'];

const SYMBOL_MEANINGS = {
    '💰': 'Profit?',
    '🚀': 'To the Moon',
    '📊': 'Fake Data',
    '🎱': 'Magic 8-Ball',
    '💭': 'Hallucination',
    '🤷': 'No Idea'
};

let gameState = {
    tokens: 100,
    spinCost: 10,
    sessionLosses: 0,
    isSpinning: false,
    currentReels: [null, null, null]
};

// Game results with AI-themed messages
const RESULTS = {
    hallucination: {
        payout: 0,
        message: '💭 💭 💭 — HALLUCINATION TRIPLE! You imagined you won. Model confidence: 87%',
        chance: 0.20
    },
    noIdea: {
        payout: 5,
        message: '🤷 🤷 🤷 — "We trained on this," our CEO says while loosening tie...',
        chance: 0.15
    },
    threeProfit: {
        payout: 150,
        message: '💰 💰 💰 — PROFIT MODE ACTIVATED! (taxes not included)',
        chance: 0.08
    },
    threeMoon: {
        payout: 120,
        message: '🚀 🚀 🚀 — TO THE MOON! (after we extract $50 in fees)',
        chance: 0.05
    },
    threeData: {
        payout: 100,
        message: '📊 📊 📊 — SYNTHETIC DATA JACKPOT! Peer review incoming... (spoiler: rejected)',
        chance: 0.07
    },
    threeMagic: {
        payout: 90,
        message: '🎱 🎱 🎱 — THE ORACLE HAS SPOKEN! (Ask again later)',
        chance: 0.06
    },
    twoMatching: {
        payout: 30,
        message: 'Two matching symbols... statistically insignificant, but you\'ll take it 😅',
        chance: 0.18
    },
    oneMatching: {
        payout: 3,
        message: 'One matching symbol. Better luck next spin... or don\'t bother.',
        chance: 0.15
    },
    noMatch: {
        payout: 0,
        message: 'No matches. The algorithm has spoken. Your tokens await the void. 🌑',
        chance: 0.10
    }
};

function initGame() {
    gameState = {
        tokens: 100,
        spinCost: 10,
        sessionLosses: 0,
        isSpinning: false,
        currentReels: [null, null, null]
    };
    updateDisplay();
    document.getElementById('resultDisplay').textContent = 'Ready to lose... I mean, WIN big! 🎰';
}

function spin() {
    if (gameState.isSpinning) return;
    if (gameState.tokens < gameState.spinCost) {
        document.getElementById('resultDisplay').textContent = '❌ Insufficient tokens. Please touch grass. 🌱';
        return;
    }

    gameState.isSpinning = true;
    document.getElementById('spinButton').disabled = true;

    // Deduct cost
    gameState.tokens -= gameState.spinCost;
    updateDisplay();

    // Spin animation
    const spinDuration = 800; // milliseconds
    spinReels(spinDuration);

    // Calculate result after animation
    setTimeout(() => {
        const result = calculateResult();
        applyResult(result);
        gameState.isSpinning = false;
        document.getElementById('spinButton').disabled = false;
    }, spinDuration);
}

function spinReels(duration) {
    const reels = document.querySelectorAll('.reel');
    reels.forEach((reel, index) => {
        reel.classList.add('spinning');

        // Random spin amount for natural look
        const spins = Math.floor(Math.random() * 10) + 15;
        const randomSymbol = Math.floor(Math.random() * SYMBOLS.length);

        setTimeout(() => {
            reel.style.transform = `translateY(-${randomSymbol * 50}px)`;
            gameState.currentReels[index] = SYMBOLS[randomSymbol];
            reel.classList.remove('spinning');
        }, duration);
    });
}

function calculateResult() {
    const [reel1, reel2, reel3] = gameState.currentReels;
    const rulesArray = [];

    // Check for three of a kind
    if (reel1 === reel2 && reel2 === reel3) {
        if (reel1 === '💭') return RESULTS.hallucination;
        if (reel1 === '🤷') return RESULTS.noIdea;
        if (reel1 === '💰') return RESULTS.threeProfit;
        if (reel1 === '🚀') return RESULTS.threeMoon;
        if (reel1 === '📊') return RESULTS.threeData;
        if (reel1 === '🎱') return RESULTS.threeMagic;
    }

    // Check for two of a kind
    if ((reel1 === reel2) || (reel2 === reel3) || (reel1 === reel3)) {
        return RESULTS.twoMatching;
    }

    // Check if any match (one matching pair)
    if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        return RESULTS.oneMatching;
    }

    // No matches - determine randomly with weights
    const random = Math.random();
    let cumulativeChance = 0;

    for (const [key, result] of Object.entries(RESULTS)) {
        cumulativeChance += result.chance;
        if (random < cumulativeChance && key !== 'threeProfit' && key !== 'threeMoon' && key !== 'threeData' && key !== 'threeMagic' && key !== 'hallucination' && key !== 'noIdea' && key !== 'twoMatching' && key !== 'oneMatching') {
            return result;
        }
    }

    return RESULTS.noMatch;
}

function applyResult(result) {
    const payout = result.payout;
    gameState.tokens += payout;

    if (payout === 0) {
        gameState.sessionLosses += gameState.spinCost;
    }

    // Update display with dramatic flair
    const displayMessage = `${result.message} | WIN: +${payout} 🎫`;
    document.getElementById('resultDisplay').textContent = displayMessage;

    updateDisplay();

    // Add celebration effect for wins
    if (payout > gameState.spinCost) {
        celebrate();
    }
}

function celebrate() {
    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.style.animation = 'none';
    setTimeout(() => {
        resultDisplay.style.animation = 'celebrate 0.6s ease-out';
    }, 10);
}

function updateDisplay() {
    document.getElementById('tokenDisplay').textContent = gameState.tokens;
    document.getElementById('costDisplay').textContent = gameState.spinCost;
    document.getElementById('lossDisplay').textContent = gameState.sessionLosses;

    // Update button state
    const spinButton = document.getElementById('spinButton');
    if (gameState.tokens < gameState.spinCost) {
        spinButton.disabled = true;
        spinButton.textContent = 'INSUFFICIENT TOKENS';
    } else if (gameState.isSpinning) {
        spinButton.disabled = true;
        spinButton.textContent = 'SPINNING...';
    } else {
        spinButton.disabled = false;
        spinButton.textContent = 'SPIN FOR GLORY';
    }
}

function resetGame() {
    if (confirm('Reset all tokens to 100? This action cannot be undone (just like deleting your data).')) {
        initGame();
        document.getElementById('resultDisplay').textContent = '🔄 Tokens reset. Let\'s pretend that never happened.';
    }
}

// Add celebrate animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0% {
            transform: scale(1) rotate(0deg);
            background-color: rgba(255, 0, 255, 0.1);
        }
        50% {
            transform: scale(1.1) rotate(5deg);
            background-color: rgba(0, 255, 136, 0.2);
        }
        100% {
            transform: scale(1) rotate(0deg);
            background-color: rgba(255, 0, 255, 0.1);
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initGame();

    // Keyboard support (spacebar to spin)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameState.isSpinning) {
            e.preventDefault();
            spin();
        }
    });
});
