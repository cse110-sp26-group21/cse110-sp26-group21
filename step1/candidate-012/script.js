// Game State
const gameState = {
    tokenBalance: 1000,
    currentBet: 100,
    totalWinnings: 0,
    totalLost: 0,
    isSpinning: false,
};

// Symbol configurations
const symbols = [
    '🧠 Hallucination',
    '🔥 Inference Burn',
    '💸 Token Drain',
    '📊 Bias',
    '🎲 Model Collapse',
    '🌀 Prompt Injection',
    '⚡ Latency Spike'
];

// Payout multipliers for matching symbols
const payoutMap = {
    '🧠 Hallucination': 50,    // 50x for three matches
    '🔥 Inference Burn': 50,   // 50x for three matches
    '💸 Token Drain': 100,     // 100x for three matches (highest!)
    '📊 Bias': 25,             // 25x for three matches
    '🎲 Model Collapse': 20,   // 20x for three matches
    '🌀 Prompt Injection': 15,  // 15x for three matches
    '⚡ Latency Spike': 10    // 10x for three matches
};

// Animation parameters
const SPIN_DURATION = 2000;  // 2 seconds spin duration
const SYMBOL_HEIGHT = 150;   // Height of each symbol in pixels

// Initialize game
function initGame() {
    updateUI();
}

// Update UI with current game state
function updateUI() {
    document.getElementById('tokenBalance').textContent = gameState.tokenBalance;
    document.getElementById('totalWinnings').textContent = `Total Won: ${gameState.totalWinnings}`;
    document.getElementById('totalLost').textContent = `Total Lost: ${gameState.totalLost}`;
    document.getElementById('currentBet').textContent = gameState.currentBet;
    
    // Disable spin button if not enough tokens
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = gameState.tokenBalance < gameState.currentBet || gameState.isSpinning;
    
    // Update message visibility
    if (gameState.tokenBalance <= 0) {
        document.getElementById('winMessage').textContent = '💔 BANKRUPT! Reset to play again.';
        spinButton.disabled = true;
    }
}

// Set bet amount
function setBetAmount(amount) {
    gameState.currentBet = amount;
    
    // Update active button styling
    const betButtons = document.querySelectorAll('.bet-btn');
    betButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    updateUI();
}

// Main spin function
function spin() {
    // Validate sufficient tokens
    if (gameState.tokenBalance < gameState.currentBet) {
        alert('Not enough tokens to spin!');
        return;
    }
    
    if (gameState.isSpinning) return;
    
    gameState.isSpinning = true;
    
    // Deduct bet from balance
    gameState.tokenBalance -= gameState.currentBet;
    gameState.totalLost += gameState.currentBet;
    
    // Generate winning symbols (pre-determined before animation)
    const results = generateResults();
    
    // Animate reels
    animateReels(results, () => {
        // Calculate and display results
        const payout = calculatePayout(results);
        displayResults(results, payout);
        
        // Update balance and UI
        gameState.tokenBalance += payout;
        if (payout > 0) {
            gameState.totalWinnings += payout;
        }
        
        gameState.isSpinning = false;
        updateUI();
    });
    
    updateUI();
}

// Generate random results or weighted results
function generateResults() {
    // Weighted probability for different outcomes
    const rand = Math.random();
    
    let results;
    
    if (rand < 0.65) {
        // 65% chance: complete loss (three different symbols)
        results = [
            getRandomSymbol(),
            getRandomSymbol(),
            getRandomSymbol()
        ];
    } else if (rand < 0.90) {
        // 25% chance: minor win (two matching symbols)
        const matchingSymbol = getRandomSymbol();
        results = [
            matchingSymbol,
            matchingSymbol,
            getRandomSymbol()
        ];
        // Shuffle to make it less obvious
        shuffleArray(results);
    } else if (rand < 0.98) {
        // 8% chance: good win (three matching symbols, but not token drain)
        const nonJackpotSymbols = symbols.filter(s => s !== '💸 Token Drain');
        const matchingSymbol = nonJackpotSymbols[Math.floor(Math.random() * nonJackpotSymbols.length)];
        results = [matchingSymbol, matchingSymbol, matchingSymbol];
    } else {
        // 2% chance: JACKPOT! (Token Drain triple)
        results = ['💸 Token Drain', '💸 Token Drain', '💸 Token Drain'];
    }
    
    return results;
}

// Get random symbol
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Shuffle array in place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Animate the reels
function animateReels(results, callback) {
    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];
    
    const symbolPositions = {
        '🧠 Hallucination': 0,
        '🔥 Inference Burn': 1,
        '💸 Token Drain': 2,
        '📊 Bias': 3,
        '🎲 Model Collapse': 4,
        '🌀 Prompt Injection': 5,
        '⚡ Latency Spike': 6
    };
    
    let completedReels = 0;
    
    reels.forEach((reel, index) => {
        const targetSymbol = results[index];
        const targetPosition = symbolPositions[targetSymbol];
        
        // Add slight delay to each reel for effect (cascade)
        const delay = index * 150;
        
        setTimeout(() => {
            spinReel(reel, targetPosition, () => {
                completedReels++;
                if (completedReels === reels.length) {
                    callback();
                }
            });
        }, delay);
    });
}

// Spin individual reel
function spinReel(reel, targetPosition, callback) {
    const startPosition = Math.floor(Math.random() * 7);
    const spinsNeeded = 7 + targetPosition - startPosition;
    
    let currentSpin = 0;
    const spinInterval = setInterval(() => {
        currentSpin++;
        const translateY = -((startPosition + currentSpin) % 7) * SYMBOL_HEIGHT;
        reel.style.transform = `translateY(${translateY}px)`;
        
        if (currentSpin >= spinsNeeded) {
            clearInterval(spinInterval);
            // Final position adjustment
            const finalTranslateY = -(targetPosition * SYMBOL_HEIGHT);
            reel.style.transform = `translateY(${finalTranslateY}px)`;
            reel.style.transition = 'transform 0.3s ease-out';
            callback();
            reel.style.transition = 'transform 0.1s linear';
        }
    }, SPIN_DURATION / (spinsNeeded * 2));
}

// Calculate payout based on results
function calculatePayout(results) {
    // Check for three matching symbols
    if (results[0] === results[1] && results[1] === results[2]) {
        const symbol = results[0];
        const multiplier = payoutMap[symbol] || 0;
        return multiplier * gameState.currentBet;
    }
    
    // Check for two matching symbols
    if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
        return gameState.currentBet * 2; // 2x bet for two matches
    }
    
    // No match
    return 0;
}

// Display results message
function displayResults(results, payout) {
    const messageElement = document.getElementById('winMessage');
    let message = '';
    
    if (results[0] === results[1] && results[1] === results[2]) {
        // Three of a kind
        if (payout >= gameState.currentBet * 50) {
            message = `🎉 PERFECT HIT! ${results[0]} | Won: +${payout} tokens! 🎉`;
            messageElement.classList.add('jackpot');
        } else {
            message = `✨ TRIPLE MATCH! ${results[0]} | Won: +${payout} tokens!`;
            messageElement.classList.remove('jackpot');
        }
    } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
        // Two of a kind
        message = `💫 Two Match! Won: +${payout} tokens!`;
        messageElement.classList.remove('jackpot');
    } else {
        // Loss
        message = `😢 No match... Lost ${gameState.currentBet} tokens.`;
        messageElement.classList.remove('jackpot');
    }
    
    messageElement.textContent = message;
    messageElement.classList.add('show');
    
    // Remove animation after it completes
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 2000);
}

// Reset game
function resetGame() {
    if (confirm('🔄 Reset the game? You will lose all your tokens (if any).')) {
        gameState.tokenBalance = 1000;
        gameState.totalWinnings = 0;
        gameState.totalLost = 0;
        gameState.isSpinning = false;
        
        // Reset reels to initial position
        const reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];
        reels.forEach(reel => {
            reel.style.transform = 'translateY(0px)';
        });
        
        document.getElementById('winMessage').textContent = '';
        updateUI();
    }
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', initGame);
