// Game State
const gameState = {
    tokens: 100,
    totalSpent: 0,
    winCount: 0,
    isSpinning: false,
    spinCost: 10
};

// Symbol definitions and win multipliers
const symbols = ['💰', '🤖', '⚠️', '🔥', '💸', '🎰'];
const winConditions = {
    '💰💰💰': { name: 'Actual Profit', multiplier: 5, message: '💎 JACKPOT! You defied all odds! 💎' },
    '🤖🤖🤖': { name: 'Perfect Model', multiplier: 3, message: '🤖 Perfect Model Alignment! You\'ve achieved the impossible! 🤖' },
    '🔥🔥🔥': { name: 'Inference Meltdown', multiplier: 1.5, message: '🔥 INFERENCE MELTDOWN! Tokens ejected! 🔥' },
    '⚠️⚠️⚠️': { name: 'Hallucination Detected', multiplier: 1, message: '⚠️ Hallucination Detected! But you got paid anyway! ⚠️' },
    '🎰🎰🎰': { name: 'Meta Win', multiplier: 2, message: '🎰 META WIN! You gambled on gambling! 🎰' },
    '💸💸💸': { name: 'Token Drain', multiplier: -0.5, message: '💸 TOKEN DRAIN DETECTED! Your wallet just got lighter! 💸' }
};

// DOM Elements
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const spinCostSelect = document.getElementById('spinCost');
const tokenCount = document.getElementById('tokenCount');
const totalSpent = document.getElementById('totalSpent');
const winCount = document.getElementById('winCount');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const resultBox = document.getElementById('resultBox');
const resultMessage = document.getElementById('resultMessage');
const winLine = document.querySelector('.win-line');

// Event Listeners
spinBtn.addEventListener('click', spin);
resetBtn.addEventListener('click', resetGame);
spinCostSelect.addEventListener('change', updateSpinCost);

// Initialize
updateUI();

function updateSpinCost() {
    gameState.spinCost = parseInt(spinCostSelect.value);
    spinBtn.textContent = `SPIN (Cost: ${gameState.spinCost})`;
}

function spin() {
    // Check if player has enough tokens and isn't already spinning
    if (gameState.isSpinning) return;
    if (gameState.tokens < gameState.spinCost) {
        showResult('❌ Not enough tokens! Game over, friend.', 'loss');
        spinBtn.disabled = true;
        return;
    }

    // Deduct spin cost
    gameState.tokens -= gameState.spinCost;
    gameState.totalSpent += gameState.spinCost;
    gameState.isSpinning = true;
    spinBtn.disabled = true;

    // Hide previous result
    resultBox.classList.add('hidden');
    winLine.classList.remove('active');

    // Spin each reel
    const spinDuration = 500; // milliseconds
    const reelSpins = [
        spinReel(reel1, spinDuration),
        spinReel(reel2, spinDuration + 100),
        spinReel(reel3, spinDuration + 200)
    ];

    // Wait for all spins to complete
    Promise.all(reelSpins).then(() => {
        gameState.isSpinning = false;
        checkWin();
        updateUI();
        spinBtn.disabled = false;
    });
}

function spinReel(reel, duration) {
    return new Promise(resolve => {
        const startTime = Date.now();
        const randomStops = Math.floor(Math.random() * 20) + 10; // Random number of rotations
        const symbolHeight = 120;

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic for nice deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const rotations = randomStops * easeProgress;
            const offset = (rotations * symbolHeight) % (symbols.length * symbolHeight);
            
            reel.style.transform = `translateY(-${offset}px)`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }

        animate();
    });
}

function getReelSymbol(reel) {
    // Get the visible symbol (first symbol in the container after transform)
    const transform = reel.style.transform;
    const match = transform.match(/translateY\(-(\d+)px\)/);
    const offset = match ? parseInt(match[1]) : 0;
    const symbolHeight = 120;
    const symbolIndex = Math.round(offset / symbolHeight) % symbols.length;
    return symbols[symbolIndex];
}

function checkWin() {
    const symbol1 = getReelSymbol(reel1);
    const symbol2 = getReelSymbol(reel2);
    const symbol3 = getReelSymbol(reel3);
    const combination = symbol1 + symbol2 + symbol3;

    // Check for exact match
    if (winConditions[combination]) {
        handleWin(combination);
    } else if (symbol1 === symbol2 && symbol2 === symbol3) {
        // Any three matching symbols
        const multiplier = 1;
        const winAmount = Math.floor(gameState.spinCost * multiplier);
        gameState.tokens += winAmount;
        gameState.winCount++;
        showResult(`🎉 Three ${symbol1}s! Won ${winAmount} tokens! 🎉`, 'win');
        winLine.classList.add('active');
    } else {
        // No win
        showResult(`😢 No match. Keep grinding! (That's what the AI overlords want)`, 'loss');
    }
}

function handleWin(combination) {
    const winData = winConditions[combination];
    let winAmount = Math.floor(gameState.spinCost * Math.abs(winData.multiplier));

    if (winData.multiplier < 0) {
        // Losing scenario (token drain)
        gameState.tokens -= Math.abs(winAmount);
        showResult(winData.message + ` Lost ${winAmount} tokens!`, 'loss');
    } else {
        // Winning scenario
        gameState.tokens += winAmount;
        gameState.winCount++;
        showResult(winData.message + ` Won ${winAmount} tokens!`, 'win');
    }

    winLine.classList.add('active');
}

function showResult(message, type) {
    resultBox.classList.remove('hidden', 'win', 'loss');
    resultBox.classList.add(type);
    resultMessage.textContent = message;
}

function updateUI() {
    tokenCount.textContent = gameState.tokens;
    totalSpent.textContent = gameState.totalSpent;
    winCount.textContent = gameState.winCount;

    // Disable spin button if not enough tokens
    if (gameState.tokens < gameState.spinCost) {
        spinBtn.disabled = true;
    } else if (!gameState.isSpinning) {
        spinBtn.disabled = false;
    }
}

function resetGame() {
    gameState.tokens = 100;
    gameState.totalSpent = 0;
    gameState.winCount = 0;
    gameState.isSpinning = false;
    spinBtn.disabled = false;
    resultBox.classList.add('hidden');
    winLine.classList.remove('active');
    
    // Reset reels to starting position
    reel1.style.transform = 'translateY(0)';
    reel2.style.transform = 'translateY(0)';
    reel3.style.transform = 'translateY(0)';
    
    updateUI();
    updateSpinCost();
}

// Initialize spin cost display
updateSpinCost();
