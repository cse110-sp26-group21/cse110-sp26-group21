// Game Constants
const SPIN_COST = 5;
const INITIAL_TOKENS = 100;
const SPIN_DURATION = 600; // milliseconds

// AI-themed symbols and their meanings
const SYMBOLS = [
    '💸',  // Inference Cost
    '🎰',  // Hallucination
    '📈',  // Overhyped Model
    '🔮',  // Prompt Injection
    '💰'   // Free Trial Expired
];

const SYMBOL_NAMES = {
    '💸': 'Inference Cost',
    '🎰': 'Hallucination',
    '📈': 'Overhyped Model',
    '🔮': 'Prompt Injection',
    '💰': 'Free Trial Expired'
};

// Payout structure (for three matches)
const PAYOUTS = {
    '💸': 50,
    '🎰': 100,
    '📈': 30,
    '🔮': 75,
    '💰': 200
};

const TWO_MATCH_PAYOUT = 10;
const NO_MATCH_PAYOUT = -5;

// Humorous messages for different outcomes
const WIN_MESSAGES = {
    '💸': "Even the 💵 Gods understand hidden fees!",
    '🎰': "🎉 JACKPOT! Your hallucination just won big!",
    '📈': "📊 This model DID actually work!",
    '🔮': "🔐 Your injection was successful!",
    '💰': "💳 The free trial blessing has arrived!"
};

const LOSS_MESSAGES = [
    "Maybe try a different prompt?",
    "The API gods have spoken... negatively.",
    "Token: Lost. Model: Confused. You: Broke.",
    "Your inference was too creative (aka wrong).",
    "That spin cost more than your inference budget.",
    "The fee structure has claimed another victim."
];

const TWO_MATCH_MESSAGES = [
    "Two out of three ain't bad, I guess?",
    "Your model is 66% confident in this payout.",
    "Partial credit!",
    "A broken clock is right twice a day..."
];

// Game State
let gameState = {
    tokens: INITIAL_TOKENS,
    spins: 0,
    totalWon: 0,
    isSpinning: false
};

// DOM Elements
const tokenDisplay = document.getElementById('tokenDisplay');
const spinButton = document.getElementById('spinButton');
const messageBox = document.getElementById('messageBox');
const resultMessage = document.getElementById('resultMessage');
const spinCountDisplay = document.getElementById('spinCount');
const totalWonDisplay = document.getElementById('totalWon');
const winRateDisplay = document.getElementById('winRate');
const resetButton = document.getElementById('resetButton');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

// Initialize event listeners
spinButton.addEventListener('click', handleSpin);
resetButton.addEventListener('click', resetGame);

// Load saved state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('slotMachineState');
    if (saved) {
        gameState = JSON.parse(saved);
        updateDisplay();
    }
}

// Save state to localStorage
function saveGameState() {
    localStorage.setItem('slotMachineState', JSON.stringify(gameState));
}

// Update all UI displays
function updateDisplay() {
    tokenDisplay.textContent = gameState.tokens;
    spinCountDisplay.textContent = gameState.spins;
    totalWonDisplay.textContent = gameState.totalWon;
    
    // Calculate win rate
    const winRate = gameState.spins > 0
        ? Math.round((gameState.totalWon / (gameState.spins * SPIN_COST)) * 100)
        : 0;
    winRateDisplay.textContent = Math.max(-100, Math.min(999, winRate)) + '%';
    
    // Update spin button state
    spinButton.disabled = gameState.tokens < SPIN_COST;
    
    // Update button text
    if (gameState.tokens < SPIN_COST) {
        spinButton.textContent = "NOT ENOUGH TOKENS 💔";
    } else if (gameState.isSpinning) {
        spinButton.textContent = "SPINNING... 🔄";
    } else {
        spinButton.textContent = "SPIN THE WHEEL 🎯";
    }
    
    saveGameState();
}

// Get a random symbol
function getRandomSymbol() {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

// Spin a single reel and return the result
function spinReel() {
    return getRandomSymbol();
}

// Handle the spin button click
async function handleSpin() {
    if (gameState.isSpinning || gameState.tokens < SPIN_COST) {
        return;
    }
    
    gameState.isSpinning = true;
    updateDisplay();
    
    // Deduct spin cost
    gameState.tokens -= SPIN_COST;
    gameState.spins += 1;
    
    // Animate reels
    reel1.classList.add('spinning');
    reel2.classList.add('spinning');
    reel3.classList.add('spinning');
    
    // Get results
    const result1 = spinReel();
    const result2 = spinReel();
    const result3 = spinReel();
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, SPIN_DURATION));
    
    // Stop animation and set results
    reel1.classList.remove('spinning');
    reel2.classList.remove('spinning');
    reel3.classList.remove('spinning');
    
    // Position reels to show the winning symbols
    setReelResult(reel1, result1);
    setReelResult(reel2, result2);
    setReelResult(reel3, result3);
    
    // Determine payout
    const { payout, message, messageClass } = determineOutcome(result1, result2, result3);
    
    // Apply payout
    gameState.tokens += payout;
    if (payout > 0) {
        gameState.totalWon += payout;
    }
    
    // Display result
    displayResult(message, messageClass);
    
    gameState.isSpinning = false;
    updateDisplay();
}

// Set a reel to show a specific result
function setReelResult(reel, symbol) {
    const symbols = reel.querySelectorAll('.symbol');
    const symbolIndex = SYMBOLS.indexOf(symbol);
    const offset = -(symbolIndex * 60);
    reel.style.transform = `translateY(${offset}px)`;
}

// Determine the outcome and payout
function determineOutcome(symbol1, symbol2, symbol3) {
    let payout = 0;
    let message = '';
    let messageClass = 'loss';
    
    // Check for three matches
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        payout = PAYOUTS[symbol1];
        message = `🏆 THREE ${SYMBOL_NAMES[symbol1]}S! ${WIN_MESSAGES[symbol1]} +${payout} tokens!`;
        messageClass = 'win';
    }
    // Check for two matches
    else if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
        payout = TWO_MATCH_PAYOUT;
        const twoMatchMessage = TWO_MATCH_MESSAGES[Math.floor(Math.random() * TWO_MATCH_MESSAGES.length)];
        message = `🤔 Two Match! ${twoMatchMessage} +${payout} tokens!`;
        messageClass = 'win';
    }
    // No matches
    else {
        payout = NO_MATCH_PAYOUT;
        const lossMessage = LOSS_MESSAGES[Math.floor(Math.random() * LOSS_MESSAGES.length)];
        message = `❌ No Match. ${lossMessage} ${payout} tokens.`;
        messageClass = 'loss';
    }
    
    return { payout, message, messageClass };
}

// Display the result message
function displayResult(message, messageClass) {
    messageBox.className = 'message-box ' + messageClass;
    resultMessage.textContent = message;
    
    // Add a little animation/shake effect
    messageBox.style.animation = 'none';
    setTimeout(() => {
        messageBox.style.animation = 'pulse 0.3s ease-in-out';
    }, 10);
}

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);

// Reset the game
function resetGame() {
    if (confirm('🤖 Totally reset your tokens and stats? No undo!')) {
        gameState = {
            tokens: INITIAL_TOKENS,
            spins: 0,
            totalWon: 0,
            isSpinning: false
        };
        
        // Reset reels
        reel1.style.transform = 'translateY(0)';
        reel2.style.transform = 'translateY(0)';
        reel3.style.transform = 'translateY(0)';
        
        messageBox.className = 'message-box';
        resultMessage.textContent = 'Game reset! Ready for a fresh start.';
        
        updateDisplay();
    }
}

// Initialize the game on page load
loadGameState();
updateDisplay();
resultMessage.textContent = 'Place your tokens and spin! Cost: ' + SPIN_COST + ' tokens per spin.';
