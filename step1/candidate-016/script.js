// ============================================
// AI Token Slot Machine - Game Logic
// ============================================

const SYMBOLS = ['🎯', '💸', '🌪️', '⚡', '🎭', '🤖'];
const SYMBOL_NAMES = {
    '🎯': 'Perfect Inference',
    '💸': 'Inference Cost',
    '🌪️': 'Hallucination',
    '⚡': 'Power Spike',
    '🎭': 'Marketing Hype',
    '🤖': 'Token Sink'
};

const MULTIPLIERS = {
    '🎯': 3.0,
    '💸': 2.0,
    '🌪️': 0.5,
    '⚡': 2.5,
    '🎭': 1.5,
    '🤖': 0.1
};

const HUMOROUS_MESSAGES = {
    jackpot: [
        "🎉 THE AI FINALLY WORKED! (It won\'t happen again)",
        "🎊 PERFECT INFERENCE! (Check your math, we did)",
        "💎 HALLUCINATING GAINS! (They feel real)",
        "🚀 OVERFITTING VICTORY! (Test set passed!)"
    ],
    good: [
        "✨ Model performed adequately (for once)",
        "📈 The hype is worth something!",
        "⚡ Power spike detected (brief)",
        "💰 You beat the odds (this time)"
    ],
    neutral: [
        "🤔 Break even - like your investment portfolio",
        "➡️ Status quo achieved",
        "🎲 That\'s one way to not lose money",
        "😐 Technically not a loss"
    ],
    bad: [
        "💀 That hallucination cost you dearly",
        "🤖 Your tokens have been consumed by the algorithm",
        "📉 Inference costs strike again",
        "💧 Another liquidity event detected",
        "🌪️ Your money entered the void"
    ]
};

const EXPLANATIONS = {
    '🎯🎯🎯': "Perfect Inference Triple! The model worked exactly as promised (report this to management immediately).",
    '💸💸💸': "Triple Inference Cost! Your startup is now 3x deeper in NVIDIA contracts.",
    '🌪️🌪️🌪️': "Triple Hallucination! The model confidently invented an entire new feature.",
    '⚡⚡⚡': "Power Spike Triple! 10,000% accuracy on the test set (somehow).",
    '🎭🎭🎭': "Triple Hype! Prepare the press release—we\'re the next thing.",
    '🤖🤖🤖': "Triple Token Sink! Your wallet has achieved singularity.",
    'mixed': "Some symbols aligned. The market is confused."
};

let gameState = {
    tokens: 1000,
    totalSpent: 0,
    spinCost: 50,
    isSpinning: false
};

// ============================================
// DOM Elements
// ============================================

const tokenCountEl = document.getElementById('tokenCount');
const spentCountEl = document.getElementById('spentCount');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const costDisplayEl = document.getElementById('costDisplay');
const resultMessageEl = document.getElementById('resultMessage');
const resultMultiplierEl = document.getElementById('resultMultiplier');
const resultExplanationEl = document.getElementById('resultExplanation');

const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

// ============================================
// Initialization
// ============================================

function init() {
    updateUI();
    spinButton.addEventListener('click', handleSpin);
    resetButton.addEventListener('click', handleReset);
}

// ============================================
// UI Updates
// ============================================

function updateUI() {
    tokenCountEl.textContent = gameState.tokens;
    spentCountEl.textContent = gameState.totalSpent;
    
    if (gameState.tokens >= gameState.spinCost) {
        spinButton.disabled = false;
    } else {
        spinButton.disabled = true;
    }

    // Increase cost slightly as player accumulates tokens (inflation simulation)
    const baseMultiplier = 1 + (gameState.totalSpent / 5000);
    const currentCost = Math.ceil(gameState.spinCost * baseMultiplier);
    costDisplayEl.textContent = `Cost per spin: ${currentCost} tokens (inflation: ${(baseMultiplier * 100 - 100).toFixed(0)}%)`;

    if (gameState.tokens <= 0) {
        resultMessageEl.textContent = "💔 BANKRUPT";
        resultMessageEl.style.color = '#ff0055';
        spinButton.disabled = true;
    }
}

// ============================================
// Spin Mechanics
// ============================================

function handleSpin() {
    if (gameState.isSpinning || gameState.tokens < gameState.spinCost) {
        return;
    }

    gameState.isSpinning = true;
    spinButton.disabled = true;

    // Deduct cost
    const currentCost = Math.ceil(gameState.spinCost * (1 + gameState.totalSpent / 5000));
    gameState.tokens -= currentCost;
    gameState.totalSpent += currentCost;

    // Animate reels
    const spinDuration = 800;
    spinReel(reel1, spinDuration);
    spinReel(reel2, spinDuration + 100);
    spinReel(reel3, spinDuration + 200);

    // After spinning, calculate result
    setTimeout(() => {
        const result = calculateResult();
        displayResult(result);
        gameState.isSpinning = false;
        updateUI();
    }, spinDuration + 300);
}

function spinReel(reel, duration) {
    reel.style.transition = 'none';
    reel.style.transform = 'translateY(0)';
    
    // Force reflow to restart animation
    void reel.offsetHeight;
    
    reel.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
    const randomRotation = Math.floor(Math.random() * SYMBOLS.length) * 50;
    reel.style.transform = `translateY(-${randomRotation}px)`;
}

// ============================================
// Result Calculation
// ============================================

function calculateResult() {
    // Get current visible symbols
    const symbols1 = getVisibleSymbol(reel1);
    const symbols2 = getVisibleSymbol(reel2);
    const symbols3 = getVisibleSymbol(reel3);

    const symbolArray = [symbols1, symbols2, symbols3];
    const symbolKey = symbolArray.join('');

    // Calculate multiplier
    const multipliers = symbolArray.map(s => MULTIPLIERS[s]);
    const baseMultiplier = multipliers.reduce((a, b) => a * b, 1);
    
    // Apply variance
    const variance = 0.9 + Math.random() * 0.2;
    const finalMultiplier = baseMultiplier * variance;

    const currentCost = Math.ceil(gameState.spinCost * (1 + (gameState.totalSpent - currentCost) / 5000));
    const winAmount = Math.round(currentCost * finalMultiplier);
    const netWin = winAmount - currentCost;

    gameState.tokens += winAmount;

    return {
        symbols: symbolArray,
        symbolKey,
        multiplier: finalMultiplier.toFixed(2),
        winAmount,
        netWin,
        baseMultiplier: baseMultiplier.toFixed(2),
        isBigWin: finalMultiplier >= 3.0,
        isLoss: netWin < 0
    };
}

function getVisibleSymbol(reel) {
    // Get the current transform value and calculate which symbol is visible
    const transform = reel.style.transform;
    const match = transform.match(/translateY\(-(\d+)px\)/);
    const translateYValue = match ? parseInt(match[1]) : 0;
    
    // 50px per symbol
    const symbolIndex = (translateYValue / 50) % SYMBOLS.length;
    const roundedIndex = Math.round(symbolIndex);
    
    return SYMBOLS[roundedIndex % SYMBOLS.length];
}

// ============================================
// Result Display
// ============================================

function displayResult(result) {
    const symbols = result.symbols;
    const allSame = symbols[0] === symbols[1] && symbols[1] === symbols[2];
    
    // Determine message type
    let messageType;
    if (result.isBigWin) {
        messageType = 'jackpot';
    } else if (result.multiplier >= 2.0) {
        messageType = 'good';
    } else if (result.multiplier >= 1.0) {
        messageType = 'neutral';
    } else {
        messageType = 'bad';
    }

    // Get random message from category
    const messages = HUMOROUS_MESSAGES[messageType];
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Get explanation
    let explanation = EXPLANATIONS[result.symbolKey];
    if (!explanation) {
        if (allSame) {
            explanation = `Three ${SYMBOL_NAMES[symbols[0]]}s in a row! The universe has aligned.`;
        } else {
            explanation = EXPLANATIONS['mixed'];
        }
    }

    // Display results with animation
    resultMessageEl.classList.remove('pulse');
    resultMultiplierEl.classList.remove('pulse');
    resultExplanationEl.classList.remove('pulse');

    void resultMessageEl.offsetHeight; // Force reflow

    resultMessageEl.classList.add('pulse');
    resultMultiplierEl.classList.add('pulse');
    resultExplanationEl.classList.add('pulse');

    resultMessageEl.textContent = message;
    resultMessageEl.style.color = result.isLoss ? '#ff0055' : '#00ff88';

    const winText = result.netWin >= 0 ? '+' : '';
    resultMultiplierEl.textContent = 
        `${result.baseMultiplier}x multiplier → ${result.winAmount} tokens won (${winText}${result.netWin})`;
    resultMultiplierEl.style.color = result.isLoss ? '#ff0055' : '#00ff88';

    resultExplanationEl.textContent = explanation;
}

// ============================================
// Reset Game
// ============================================

function handleReset() {
    gameState.tokens = 1000;
    gameState.totalSpent = 0;
    gameState.isSpinning = false;

    // Reset reels to starting position
    reel1.style.transition = 'none';
    reel2.style.transition = 'none';
    reel3.style.transition = 'none';
    
    reel1.style.transform = 'translateY(0)';
    reel2.style.transform = 'translateY(0)';
    reel3.style.transform = 'translateY(0)';

    // Clear results
    resultMessageEl.textContent = '';
    resultMessageEl.style.color = '#00ff88';
    resultMultiplierEl.textContent = '';
    resultMultiplierEl.style.color = '#ff00ff';
    resultExplanationEl.textContent = '';

    updateUI();
}

// ============================================
// Initialize Game
// ============================================

document.addEventListener('DOMContentLoaded', init);
