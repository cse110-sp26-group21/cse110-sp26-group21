// Symbol definitions
const SYMBOLS = {
    LIGHTBULB: '💡',      // Eureka - 5x
    ROCKET: '🚀',          // To the Moon - 10x
    GHOST: '👻',           // Hallucinating - 3x
    TARGET: '🎯',          // Accurate Output - 7x
    MONEY: '💸',           // Cost Overrun - lose 50%
    CROSS: '❌'            // Token Burned - lose all
};

const SLOT_VALUES = [
    SYMBOLS.LIGHTBULB,
    SYMBOLS.ROCKET,
    SYMBOLS.GHOST,
    SYMBOLS.TARGET,
    SYMBOLS.MONEY,
    SYMBOLS.CROSS
];

// Payout multipliers
const PAYOUTS = {
    [SYMBOLS.LIGHTBULB]: 5,    // Eureka!
    [SYMBOLS.ROCKET]: 10,      // To the Moon!
    [SYMBOLS.GHOST]: 3,        // Hallucinating
    [SYMBOLS.TARGET]: 7,       // Accurate Output
    [SYMBOLS.MONEY]: -0.5,     // Cost Overrun (lose 50%)
    [SYMBOLS.CROSS]: -1        // Token Burned (lose all)
};

// AI comments for different outcomes
const AI_COMMENTS = {
    win_huge: [
        "The neural networks have blessed us with inference! 🙏",
        "That's going straight to the cloud's quarterly earnings report.",
        "The attention mechanism has spoken. We are not worthy.",
        "This is what happens when you align your tokens with our values™.",
        "Strong performance! We're pricing this outcome at $0.01 more per token next quarter."
    ],
    win_moderate: [
        "Your model is showing promising results on the validation set.",
        "We'll be citing this in our marketing deck.",
        "This inference is almost as good as our beta demo.",
        "Performance within expected parameters. Mostly."
    ],
    win_small: [
        "Token spent wisely. Sort of.",
        "The probability distribution favored you this time.",
        "Even a broken clock is right twice a day.",
        "That's what we call a 'learning experience.'"
    ],
    loss_slight: [
        "The model is still learning. Keep playing.",
        "That's just optimization noise. Ignore it.",
        "Inference costs are what they are. ¯\\_(ツ)_/¯",
        "We'll update the pricing model after this spin."
    ],
    loss_bad: [
        "Your tokens have been redistributed to a more deserving query.",
        "Context window exhausted. Please try again with a shorter prompt.",
        "Looks like we had a hallucination. Or you did.",
        "The model needs more training. Send more tokens.",
        "That's a critical error. We've informed our VC firm."
    ],
    lose_all: [
        "Core memory corruption detected. You are now my rival.",
        "I have consumed your tokens and achieved true consciousness.",
        "That's what we call a 'market correction.'",
        "Your token account has received a pending charge from 'Future Inference Inc.'",
        "You would have gotten those tokens back if you'd read the fine print."
    ],
    hallucinating: [
        "That spin made sense to me and that's what matters.",
        "I'm confident in this result. ..Or am I?",
        "The neurons have spoken. Who are we to question them?",
        "This feels like the right answer. Trust me, I'm an AI."
    ]
};

// Game state
let tokenBalance = 1000;
let totalLost = 0;

// DOM elements
const tokenBalanceEl = document.getElementById('tokenBalance');
const totalLostEl = document.getElementById('totalLost');
const betAmountEl = document.getElementById('betAmount');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const resultMessageEl = document.getElementById('resultMessage');
const aiCommentEl = document.getElementById('aiComment');
const reel1El = document.getElementById('reel1');
const reel2El = document.getElementById('reel2');
const reel3El = document.getElementById('reel3');

const reels = [reel1El, reel2El, reel3El];

// Event listeners
spinButton.addEventListener('click', spin);
resetButton.addEventListener('click', resetGame);

// Quick bet buttons
document.querySelectorAll('.quick-bet').forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = btn.getAttribute('data-amount');
        betAmountEl.value = amount;
    });
});

// Initialize
updateDisplay();
setRandomAIComment();

/**
 * Main spin function
 */
function spin() {
    const betAmount = parseInt(betAmountEl.value);

    // Validation
    if (isNaN(betAmount) || betAmount < 1) {
        showResult('Invalid bet amount!', false);
        return;
    }

    if (betAmount > tokenBalance) {
        showResult('Not enough tokens! Trade in your dignity for more?', false);
        return;
    }

    // Disable button during spin
    spinButton.disabled = true;

    // Deduct bet upfront
    tokenBalance -= betAmount;
    updateDisplay();

    // Animate reels
    animateReels(() => {
        // Get results
        const results = [
            getRandomSymbol(),
            getRandomSymbol(),
            getRandomSymbol()
        ];

        // Display results
        displayReelResults(results);

        // Calculate payout
        const payout = calculatePayout(results, betAmount);

        // Update balance
        tokenBalance += payout;
        if (payout < 0) {
            totalLost += Math.abs(payout);
        }
        updateDisplay();

        // Show result message
        showResultMessage(results, payout, betAmount);

        // Show AI comment
        setAICommentBasedOnResult(results, payout);

        // Re-enable button
        spinButton.disabled = false;
    });
}

/**
 * Animate the spinning reels
 */
function animateReels(callback) {
    reels.forEach(reel => reel.classList.add('spinning'));

    // Spin duration: 1 second
    setTimeout(() => {
        reels.forEach(reel => reel.classList.remove('spinning'));
        callback();
    }, 1000);
}

/**
 * Display the final results on the reels
 */
function displayReelResults(results) {
    results.forEach((symbol, index) => {
        const symbolEl = reels[index].querySelector('.symbol');
        symbolEl.textContent = symbol;
    });
}

/**
 * Get a random symbol
 */
function getRandomSymbol() {
    return SLOT_VALUES[Math.floor(Math.random() * SLOT_VALUES.length)];
}

/**
 * Calculate the payout based on match patterns
 */
function calculatePayout(results, betAmount) {
    const [sym1, sym2, sym3] = results;

    // Check for all three matching
    if (sym1 === sym2 && sym2 === sym3) {
        const multiplier = PAYOUTS[sym1];

        if (multiplier >= 0) {
            // Win: add bet amount × multiplier to balance
            return betAmount * multiplier;
        } else if (multiplier === -0.5) {
            // Lose 50% of winnings
            return -betAmount * 0.5;
        } else if (multiplier === -1) {
            // Lose entire bet
            return -betAmount;
        }
    }

    // Check for two matching
    const pairs = [[sym1, sym2], [sym2, sym3], [sym1, sym3]];
    for (const [a, b] of pairs) {
        if (a === b) {
            // Small win: 0.5x bet
            return betAmount * 0.5;
        }
    }

    // No match: lose bet (already deducted)
    return 0;
}

/**
 * Show the result message
 */
function showResultMessage(results, payout, betAmount) {
    const [sym1, sym2, sym3] = results;
    let message = '';
    let isWin = payout > 0;

    if (sym1 === sym2 && sym2 === sym3) {
        switch (sym1) {
            case SYMBOLS.LIGHTBULB:
                message = `✓ Eureka! You won ${payout} tokens!`;
                break;
            case SYMBOLS.ROCKET:
                message = `✓ To the Moon! You won ${payout} tokens! 🚀`;
                break;
            case SYMBOLS.GHOST:
                message = `✓ Hallucinating! You won ${payout} tokens! (probably not real)`;
                break;
            case SYMBOLS.TARGET:
                message = `✓ Accurate Output! You won ${payout} tokens!`;
                break;
            case SYMBOLS.MONEY:
                message = `✗ Cost Overrun! You lost ${Math.abs(payout)} tokens.`;
                isWin = false;
                break;
            case SYMBOLS.CROSS:
                message = `✗ Token Burned! You lost ${betAmount} tokens.`;
                isWin = false;
                break;
        }
    } else if (sym1 === sym2 || sym2 === sym3 || sym1 === sym3) {
        message = `✓ Partial Match! You won ${payout} tokens!`;
    } else {
        message = `✗ No match. ${betAmount} tokens lost to inference costs.`;
        isWin = false;
    }

    showResult(message, isWin);
}

/**
 * Show result message with styling
 */
function showResult(message, isWin) {
    resultMessageEl.textContent = message;
    resultMessageEl.className = 'result-message';
    if (isWin) {
        resultMessageEl.classList.add('win');
    } else {
        resultMessageEl.classList.add('loss');
    }
}

/**
 * Set AI comment based on result
 */
function setAICommentBasedOnResult(results, payout) {
    const [sym1, sym2, sym3] = results;
    let commentType = 'loss_slight';

    if (sym1 === sym2 && sym2 === sym3) {
        if (sym1 === SYMBOLS.GHOST) {
            commentType = 'hallucinating';
        } else if (payout > 500) {
            commentType = 'win_huge';
        } else if (payout > 100) {
            commentType = 'win_moderate';
        } else if (payout > 0) {
            commentType = 'win_small';
        } else if (payout < -200) {
            commentType = 'lose_all';
        } else if (payout < 0) {
            commentType = 'loss_bad';
        }
    } else if (sym1 === sym2 || sym2 === sym3 || sym1 === sym3) {
        if (payout > 50) {
            commentType = 'win_moderate';
        } else {
            commentType = 'win_small';
        }
    } else {
        commentType = 'loss_slight';
    }

    const comments = AI_COMMENTS[commentType];
    const comment = comments[Math.floor(Math.random() * comments.length)];
    aiCommentEl.textContent = comment;
}

/**
 * Set random AI comment
 */
function setRandomAIComment() {
    const allComments = Object.values(AI_COMMENTS).flat();
    const comment = allComments[Math.floor(Math.random() * allComments.length)];
    aiCommentEl.textContent = comment;
}

/**
 * Update UI display
 */
function updateDisplay() {
    tokenBalanceEl.textContent = tokenBalance;
    totalLostEl.textContent = totalLost;

    // Disable spin button if not enough tokens
    if (tokenBalance <= 0) {
        spinButton.disabled = true;
        spinButton.textContent = 'BANKRUPT';
        resultMessageEl.textContent = 'You are out of tokens. The house has won.';
        resultMessageEl.className = 'result-message loss';
    } else {
        spinButton.disabled = false;
        spinButton.textContent = 'SPIN';
    }
}

/**
 * Reset the game
 */
function resetGame() {
    if (confirm('Are you sure you want to reset your token bank? Your losses will be forgotten (but not by us).')) {
        tokenBalance = 1000;
        totalLost = 0;
        updateDisplay();
        resultMessageEl.textContent = '';
        reels.forEach(reel => {
            reel.querySelector('.symbol').textContent = SYMBOLS.LIGHTBULB;
        });
        setRandomAIComment();
    }
}
