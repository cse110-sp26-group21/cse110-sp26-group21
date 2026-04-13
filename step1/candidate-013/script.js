// Game State
let gameState = {
    tokenBalance: 1000,
    totalWinnings: 0,
    betAmount: 10,
    isSpinning: false,
    spinHistory: []
};

// Symbol values and payouts
const symbols = ['⚙️ Model', '💰 Fee', '🎲 Hallucination', '📊 Metrics', '🔮 Prediction', '💡 Innovation', '🚀 Hype'];

// Winning combinations with multipliers
const winPatterns = {
    'three-of-a-kind': 10,
    'two-pair': 5,
    'pair': 2,
    'hallucination-trio': 15,
    'fee-trio': 8,
    'model-trio': 12
};

// Satirical messages
const messages = {
    win: [
        'Our AI predicted this outcome with 87% confidence! It was actually 50/50.',
        'Tokens received! Please wait while we optimize our inference costs...',
        'Wow, such win. Much revenue. Very sustainable.',
        'Congratulations! You beat the algorithm! (This time.)',
        'Your inference was successful! We\'ve logged this to improve our model.',
        'Synergistic token acquisition detected. Scaling accordingly.',
        'This win validates our financial model.',
        'The market has spoken: you won! Our shareholders thank you.',
        'Hallucination: That was definitely skill, not luck.'
    ],
    loss: [
        'That didn\'t align with market expectations.',
        'Interesting... our predictive model says you\'ll lose again.',
        'Thanks for the tokens! We\'re using them for GPU rentals.',
        'Better luck with your next inference attempt.',
        'Tokens converted to overhead. Please try again.',
        'Your data has been collected for model training.',
        'The house algorithm has spoken.',
        'Tokens redistributed to infrastructure costs.',
        'Consider this a learning opportunity for the algorithm.'
    ],
    jackpot: [
        '🎉 JACKPOT! Our AI hallucinated this probability into existence!',
        '🎰 TRIPLE MATCH! We\'re liquidating our GPU fund to pay you!',
        '✨ LEGENDARY WIN! This will definitely be in our marketing materials!',
        '💎 RARE EVENT! Our models say this shouldn\'t happen. Yet here you are.',
        '🌟 MYTHICAL WIN! We\'re claiming this is a feature, not a bug!'
    ],
    insufficient: [
        'Insufficient tokens. Please purchase more to continue hallucinating.',
        'Error: Your balance is too low for such ambitious inference attempts.',
        'Token balance inadequate. Consider a subscription tier.',
        'Cannot process request. Your account needs attention.',
        'Budget exceeded. Please contact support for premium token packages.'
    ]
};

// DOM Elements
const tokenBalanceEl = document.getElementById('tokenBalance');
const totalWinningsEl = document.getElementById('totalWinnings');
const betAmountEl = document.getElementById('betAmount');
const spinButton = document.getElementById('spinButton');
const resultArea = document.getElementById('resultArea');
const resultDisplay = document.getElementById('resultDisplay');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const resetBtn = document.getElementById('resetBtn');
const decreaseBetBtn = document.getElementById('decreaseBet');
const increaseBetBtn = document.getElementById('increaseBet');

// Event Listeners
spinButton.addEventListener('click', spin);
resetBtn.addEventListener('click', resetGame);
decreaseBetBtn.addEventListener('click', decreaseBet);
increaseBetBtn.addEventListener('click', increaseBet);
betAmountEl.addEventListener('change', updateBetAmount);

document.querySelectorAll('.quick-bet').forEach(btn => {
    btn.addEventListener('click', (e) => {
        gameState.betAmount = parseInt(e.target.dataset.bet);
        updateBetDisplay();
    });
});

// Update UI
function updateUI() {
    tokenBalanceEl.textContent = gameState.tokenBalance;
    totalWinningsEl.textContent = gameState.totalWinnings;
    betAmountEl.value = gameState.betAmount;
    
    // Disable spin button if insufficient funds
    spinButton.disabled = gameState.isSpinning || gameState.tokenBalance < gameState.betAmount;
}

function updateBetDisplay() {
    betAmountEl.value = gameState.betAmount;
    updateUI();
}

function decreaseBet() {
    gameState.betAmount = Math.max(1, gameState.betAmount - 5);
    updateBetDisplay();
}

function increaseBet() {
    gameState.betAmount = Math.min(gameState.tokenBalance, gameState.betAmount + 5);
    updateBetDisplay();
}

function updateBetAmount() {
    gameState.betAmount = Math.max(1, Math.min(gameState.tokenBalance, parseInt(betAmountEl.value) || 1));
    updateBetDisplay();
}

// Main Spin Function
function spin() {
    // Check if enough tokens
    if (gameState.tokenBalance < gameState.betAmount) {
        showResult(getRandomMessage('insufficient'), false);
        return;
    }

    gameState.isSpinning = true;
    spinButton.disabled = true;

    // Deduct bet
    gameState.tokenBalance -= gameState.betAmount;
    
    // Spin animation
    const spinDuration = 1000; // 1 second
    const spinsPerSecond = 10;
    const spins = (spinDuration / 1000) * spinsPerSecond;

    // Spin all reels
    spinReels(reel1, spins);
    spinReels(reel2, spins);
    spinReels(reel3, spins);

    // Determine results after animation
    setTimeout(() => {
        const results = determineWin();
        displayResults(results);
        gameState.isSpinning = false;
        updateUI();
    }, spinDuration);

    updateUI();
}

// Spin animation helper
function spinReels(reel, spins) {
    const symbolHeight = 150 / 8; // Each symbol is roughly 150/8 heights
    const totalDistance = spins * symbolHeight;
    
    reel.style.animation = `none`;
    setTimeout(() => {
        reel.style.animation = `scroll 0.1s linear ${spins}`;
    }, 10);
}

// Determine win/loss
function determineWin() {
    const reelIndices = [
        getRandomIndex(),
        getRandomIndex(),
        getRandomIndex()
    ];

    const results = reelIndices.map(i => symbols[i]);
    
    return {
        reel1: results[0],
        reel2: results[1],
        reel3: results[2],
        indices: reelIndices
    };
}

// Get random symbol index
function getRandomIndex() {
    return Math.floor(Math.random() * symbols.length);
}

// Display results and calculate winnings
function displayResults(results) {
    const { reel1, reel2, reel3, indices } = results;
    
    // Extract symbol names (remove emoji and text after space for comparison)
    const r1 = reel1.split(' ')[0];
    const r2 = reel2.split(' ')[0];
    const r3 = reel3.split(' ')[0];
    
    let winAmount = 0;
    let messageType = 'loss';
    let isWin = false;
    let resultMessage = '';

    // Check for three of a kind (jackpot)
    if (r1 === r2 && r2 === r3) {
        isWin = true;
        messageType = 'jackpot';
        
        // Different multipliers for different symbols
        if (r1 === '🎲') {
            winAmount = gameState.betAmount * winPatterns['hallucination-trio'];
            resultMessage = `🎰 TRIPLE HALLUCINATION! The AI predicted this with ZERO accuracy!`;
        } else if (r1 === '💰') {
            winAmount = gameState.betAmount * winPatterns['fee-trio'];
            resultMessage = `💶 TRIPLE FEES! You've won enough to cover our infrastructure costs!`;
        } else if (r1 === '⚙️') {
            winAmount = gameState.betAmount * winPatterns['model-trio'];
            resultMessage = `⚙️ TRIPLE MODELS! Our ensemble has spoken!`;
        } else {
            winAmount = gameState.betAmount * winPatterns['three-of-a-kind'];
            resultMessage = `🎉 TRIPLE MATCH! Against all odds (and our regression model)!`;
        }
    } 
    // Check for two of a kind
    else if ((r1 === r2) || (r2 === r3) || (r1 === r3)) {
        isWin = true;
        messageType = 'win';
        winAmount = gameState.betAmount * winPatterns['pair'];
        resultMessage = `Two matching symbols detected! We're calling this "semantic alignment."`;
    }

    // Add winnings
    if (isWin) {
        gameState.tokenBalance += winAmount;
        gameState.totalWinnings += winAmount;
        resultArea.classList.remove('loss');
        resultArea.classList.add('win');
        resultArea.textContent = `✨ WIN! +${winAmount} tokens ✨`;
    } else {
        resultArea.classList.remove('win');
        resultArea.classList.add('loss');
        resultArea.textContent = `❌ No match. Tokens lost to the algorithm.`;
    }

    // Update result display with details
    const satireMessage = getRandomMessage(messageType);
    resultDisplay.innerHTML = `
        <p><strong>Spin Result:</strong> ${reel1} | ${reel2} | ${reel3}</p>
        <p><strong>Bet:</strong> ${gameState.betAmount} tokens | <strong>Winnings:</strong> ${isWin ? '+' + winAmount : '0'} tokens</p>
        <p><em>"${satireMessage}"</em></p>
        <p><strong>Current Balance:</strong> ${gameState.tokenBalance} tokens</p>
    `;

    // Log to history
    gameState.spinHistory.push({
        result: `${r1} ${r2} ${r3}`,
        bet: gameState.betAmount,
        win: winAmount,
        isWin: isWin
    });
}

// Get random satirical message
function getRandomMessage(type) {
    const messageList = messages[type] || messages.loss;
    return messageList[Math.floor(Math.random() * messageList.length)];
}

// Show result message
function showResult(message, isWin) {
    resultArea.classList.toggle('win', isWin);
    resultArea.classList.toggle('loss', !isWin);
    resultArea.textContent = message;
    resultDisplay.innerHTML = `<p>${message}</p>`;
}

// Reset game
function resetGame() {
    if (confirm('Reset your balance to 1000 tokens and clear your session?')) {
        gameState = {
            tokenBalance: 1000,
            totalWinnings: 0,
            betAmount: 10,
            isSpinning: false,
            spinHistory: []
        };
        resultArea.classList.remove('win', 'loss');
        resultArea.textContent = '';
        resultDisplay.innerHTML = '<p>Game reset. Click SPIN to begin!</p>';
        updateUI();
    }
}

// Initialize
updateUI();
resultDisplay.innerHTML = '<p>Click SPIN to begin your journey into uncertainty! Each spin costs tokens, but remember: the house algorithm always wins... eventually.</p>';
