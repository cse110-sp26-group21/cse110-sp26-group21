// Game State
const gameState = {
    tokens: 1000,
    betAmount: 50,
    isSpinning: false,
    totalSpins: 0,
    totalWagered: 0,
    totalWon: 0
};

// Symbols with their meanings and weights (for probability)
const symbols = {
    '💯': { name: 'Perfect Response', weight: 8, payout: 50 },
    '🎯': { name: 'Accurate Output', weight: 12, payout: 15 },
    '🌀': { name: 'Hallucination', weight: 15, payout: -1 }, // Lose tokens!
    '⚠️': { name: 'API Down', weight: 10, payout: 0 },
    '🚀': { name: 'Go Viral', weight: 8, payout: 30 },
    '💾': { name: 'Context', weight: 20, payout: 5 }
};

// Humorous commentary based on results
const commentary = {
    startup: [
        "Ready to invest in your AI future 🚀",
        "The algorithm is warming up...",
        "Our state-of-the-art model awaits 🧠"
    ],
    spinning: [
        "Computing... computing... NOT ACTUALLY COMPUTING 🤖",
        "Processing with 500k parameters 💫",
        "Generating next token... 🎲"
    ],
    win: [
        "The algorithm has spoken favorably upon you! 🎉",
        "TOKENS ACQUIRED! Quick, reinvest them! 📈",
        "Our proprietary model declares you: LUCKY 🍀",
        "Inference costs paid! Profit achieved! 🎊"
    ],
    hallucination: [
        "Oh no! The model hallucinated... wait, that's not a real thing! 🌀",
        "The AI went off the rails! Your tokens vanished! 😱",
        "Critical: Model confidence exceeded actual accuracy 💥"
    ],
    apiDown: [
        "API timeout reached. Your bet is frozen in limbo... ⏳",
        "Server error 500. Nobody wins. Such is life. ⚠️",
        "Rate limit exceeded. Please try again next quarter."
    ],
    jackpot: [
        "🏆 JACKPOT! Three perfect predictions! Trust the algorithm! 🏆",
        "🤑 THE MODEL BECAME SENTIENT AND AWARDED YOU RICHES 🤑",
        "🌟 LEGENDARY INFERENCE SUCCESS! THIS IS THE FUTURE! 🌟",
        "💎 YOU'VE ACHIEVED TRUE AI ENLIGHTENMENT 💎"
    ],
    broke: [
        "💸 Out of tokens! Perhaps AI wasn't the investment you thought... 💸",
        "Game Over. That's what they call 'inference costs.' 📉"
    ]
};

// DOM Elements
const tokenCountElement = document.getElementById('tokenCount');
const spinButton = document.getElementById('spinBtn');
const betAmountSelect = document.getElementById('betAmount');
const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
const resultMessage = document.getElementById('resultMessage');
const commentaryElement = document.getElementById('commentary');
const spinCountElement = document.getElementById('spinCount');
const totalWageredElement = document.getElementById('totalWagered');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    betAmountSelect.addEventListener('change', (e) => {
        gameState.betAmount = parseInt(e.target.value);
        updateUI();
    });
    spinButton.addEventListener('click', spin);
    displayRandomCommentary(commentary.startup);
});

// Get a random symbol based on probability weights
function getRandomSymbol() {
    const symbolsList = Object.keys(symbols);
    const weights = symbolsList.map(s => symbols[s].weight);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    
    let random = Math.random() * totalWeight;
    for (let i = 0; i < symbolsList.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return symbolsList[i];
        }
    }
    return symbolsList[0];
}

// Spin the reels
async function spin() {
    // Check if we have enough tokens
    if (gameState.tokens < gameState.betAmount) {
        if (gameState.tokens === 0) {
            resultMessage.className = 'result-message loss';
            resultMessage.textContent = '💸 Game Over! You\'re out of tokens. That\'s the real AI experience!';
            displayRandomCommentary(commentary.broke);
        } else {
            resultMessage.className = 'result-message loss';
            resultMessage.textContent = `❌ Not enough tokens! You need ${gameState.betAmount} but only have ${gameState.tokens}.`;
        }
        return;
    }

    // Prevent multiple spins
    if (gameState.isSpinning) return;

    gameState.isSpinning = true;
    spinButton.disabled = true;
    displayRandomCommentary(commentary.spinning);

    // Deduct bet amount
    gameState.tokens -= gameState.betAmount;
    gameState.totalSpins++;
    gameState.totalWagered += gameState.betAmount;

    // Spin animation duration
    const spinDuration = 1000; // ms
    const reelSymbols = [];

    // Add spinning animation
    reels.forEach(reel => {
        reel.classList.add('spinning');
    });

    // Generate final symbols after spin
    await new Promise(resolve => {
        setTimeout(() => {
            reels.forEach((reel) => {
                const symbol = getRandomSymbol();
                reelSymbols.push(symbol);
                reel.querySelector('.reel-symbol').textContent = symbol;
                reel.classList.remove('spinning');
            });
            resolve();
        }, spinDuration);
    });

    // Check for wins
    const result = checkWin(reelSymbols);
    displayResult(result, reelSymbols);

    gameState.isSpinning = false;
    updateUI();

    // Re-enable button if they have tokens
    if (gameState.tokens >= gameState.betAmount) {
        spinButton.disabled = false;
    } else {
        spinButton.textContent = 'OUT OF TOKENS';
        spinButton.disabled = true;
    }
}

// Check for winning combinations
function checkWin(reelSymbols) {
    // Check for three of a kind
    if (reelSymbols[0] === reelSymbols[1] && reelSymbols[1] === reelSymbols[2]) {
        const symbol = reelSymbols[0];
        
        if (symbol === '🌀') {
            // Hallucination - lose additional tokens
            const lossAmount = Math.min(gameState.betAmount * 2, gameState.tokens);
            gameState.tokens -= lossAmount;
            return {
                type: 'hallucination',
                symbol: symbol,
                amount: -gameState.betAmount - lossAmount,
                isJackpot: false
            };
        } else if (symbol === '⚠️') {
            // API Down - no payout
            return {
                type: 'apiDown',
                symbol: symbol,
                amount: 0,
                isJackpot: false
            };
        } else {
            // Win!
            const payout = gameState.betAmount * symbols[symbol].payout;
            gameState.tokens += payout;
            gameState.totalWon += payout;
            return {
                type: 'win',
                symbol: symbol,
                amount: payout,
                isJackpot: symbols[symbol].payout >= 30
            };
        }
    }

    // Check for two of a kind (small win)
    if ((reelSymbols[0] === reelSymbols[1] || reelSymbols[1] === reelSymbols[2] || reelSymbols[0] === reelSymbols[2]) &&
        reelSymbols[0] !== '🌀' && reelSymbols[0] !== '⚠️' &&
        reelSymbols[1] !== '🌀' && reelSymbols[1] !== '⚠️' &&
        reelSymbols[2] !== '🌀' && reelSymbols[2] !== '⚠️') {
        
        const matchingSymbol = [reelSymbols[0], reelSymbols[1], reelSymbols[2]].filter((s, i, arr) => arr.indexOf(s) === i && arr.lastIndexOf(s) !== i)[0] ||
                              (reelSymbols[0] === reelSymbols[1] ? reelSymbols[0] : reelSymbols[1]);
        
        const payout = gameState.betAmount * 2; // 2x bet for two of a kind
        gameState.tokens += payout;
        gameState.totalWon += payout;
        return {
            type: 'partialWin',
            symbol: matchingSymbol,
            amount: payout,
            isJackpot: false
        };
    }

    // No win - loss
    return {
        type: 'loss',
        symbol: null,
        amount: -gameState.betAmount,
        isJackpot: false
    };
}

// Display result message
function displayResult(result, reelSymbols) {
    resultMessage.className = 'result-message';
    let message = '';
    let commentary_category = 'win';

    if (result.isJackpot) {
        resultMessage.classList.add('jackpot');
        message = `🏆 JACKPOT! Three ${symbols[result.symbol].name}s! You won ${result.amount} tokens! 🏆`;
        commentary_category = 'jackpot';
    } else if (result.type === 'win') {
        resultMessage.classList.add('win');
        message = `✅ Win! Three ${symbols[result.symbol].name}s! +${result.amount} tokens!`;
        commentary_category = 'win';
    } else if (result.type === 'partialWin') {
        resultMessage.classList.add('win');
        message = `✨ Partial win! Two matching symbols! +${result.amount} tokens!`;
        commentary_category = 'win';
    } else if (result.type === 'hallucination') {
        resultMessage.classList.add('loss');
        message = `🌀 OH NO! Hallucination! The model went completely off the rails! Lost extra tokens!`;
        commentary_category = 'hallucination';
    } else if (result.type === 'apiDown') {
        resultMessage.classList.add('loss');
        message = `⚠️ API Down! Server error 500. Your bet is frozen in the cloud, forever lost. ⚠️`;
        commentary_category = 'apiDown';
    } else {
        resultMessage.classList.add('loss');
        message = `❌ No match. The algorithm has decided: you lose. This is fine. 📉`;
        commentary_category = 'loss';
    }

    resultMessage.textContent = message;
    displayRandomCommentary(commentary[commentary_category]);
}

// Display random commentary
function displayRandomCommentary(options) {
    const randomComment = options[Math.floor(Math.random() * options.length)];
    commentaryElement.textContent = randomComment;
}

// Update UI elements
function updateUI() {
    tokenCountElement.textContent = gameState.tokens;
    spinCountElement.textContent = gameState.totalSpins;
    totalWageredElement.textContent = gameState.totalWagered;

    // Update button state
    if (gameState.tokens < gameState.betAmount) {
        spinButton.disabled = true;
        if (gameState.tokens === 0) {
            spinButton.textContent = 'OUT OF TOKENS - GAME OVER';
        } else {
            spinButton.textContent = `NOT ENOUGH TOKENS`;
        }
    } else {
        spinButton.disabled = false;
        spinButton.textContent = 'SPIN NOW →';
    }

    // Update bet selector - disable options that are too expensive
    Array.from(betAmountSelect.options).forEach(option => {
        option.disabled = parseInt(option.value) > gameState.tokens;
    });
}
