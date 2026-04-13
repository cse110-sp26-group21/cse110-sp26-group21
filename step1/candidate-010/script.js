/**
 * AI Token Casino - Slot Machine Logic
 * "Where your tokens go to find enlightenment (and lose their way)"
 */

// ========== Game Constants ==========
const SYMBOLS = [
    'Hallucination',
    'Inference Cost',
    'Model Collapse',
    'Token Drain™',
    'API Timeout',
    'Prompt Injection',
];

const BET_AMOUNT = 50;
const INITIAL_TOKENS = 1000;

// State
let playerTokens = INITIAL_TOKENS;
let isSpinning = false;
let totalSpins = 0;
let totalSpent = 0;
let lastWinAmount = 0;

// ========== DOM Elements ==========
const tokenCountEl = document.getElementById('tokenCount');
const spinBtn = document.getElementById('spinBtn');
const reel1El = document.getElementById('reel1');
const reel2El = document.getElementById('reel2');
const reel3El = document.getElementById('reel3');
const winIndicatorEl = document.getElementById('winIndicator');
const winMessageEl = document.getElementById('winMessage');
const lastResultEl = document.getElementById('lastResult');
const lastPayoutEl = document.getElementById('lastPayout');
const spinCountEl = document.getElementById('spinCount');
const totalSpentEl = document.getElementById('totalSpent');
const hintTextEl = document.getElementById('hintText');
const warningZoneEl = document.getElementById('warningZone');

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
    spinBtn.addEventListener('click', handleSpin);
    updateUI();
});

// ========== Main Game Logic ==========
function handleSpin() {
    // Validation
    if (isSpinning) return;
    if (playerTokens < BET_AMOUNT) {
        showMessage('INSUFFICIENT TOKENS - Your venture has reached its end.', 'lose');
        hintTextEl.textContent = 'Game Over. Time to invest more.';
        spinBtn.disabled = true;
        return;
    }

    // Deduct bet
    playerTokens -= BET_AMOUNT;
    totalSpent += BET_AMOUNT;
    totalSpins++;

    // Start spinning
    isSpinning = true;
    spinBtn.disabled = true;
    winIndicatorEl.classList.remove('show', 'lose');

    // Get results
    const reelResults = spinReels();

    // Calculate payout
    setTimeout(() => {
        const payout = calculatePayout(reelResults);
        playerTokens += payout;
        lastWinAmount = payout;

        // Show results
        displayResults(reelResults, payout);

        // Update UI
        updateUI();

        // Reset spinning state
        isSpinning = false;
        spinBtn.disabled = playerTokens < BET_AMOUNT;
    }, 2000);
}

function spinReels() {
    // Show spinning animation
    reel1El.classList.add('spinning');
    reel2El.classList.add('spinning');
    reel3El.classList.add('spinning');

    // Generate random results
    const result1 = Math.floor(Math.random() * SYMBOLS.length);
    const result2 = Math.floor(Math.random() * SYMBOLS.length);
    const result3 = Math.floor(Math.random() * SYMBOLS.length);

    // Stop animation and set final positions
    setTimeout(() => {
        reel1El.classList.remove('spinning');
        reel2El.classList.remove('spinning');
        reel3El.classList.remove('spinning');

        // Position reels to show winning symbol
        const offset1 = (result1 % SYMBOLS.length) * 60;
        const offset2 = (result2 % SYMBOLS.length) * 60;
        const offset3 = (result3 % SYMBOLS.length) * 60;

        // Scroll to position with smooth animation
        animateReelToPosition(reel1El, offset1);
        animateReelToPosition(reel2El, offset2);
        animateReelToPosition(reel3El, offset3);
    }, 500);

    return [result1, result2, result3];
}

function animateReelToPosition(reelEl, offset) {
    const items = reelEl.querySelectorAll('.reel-item');
    items.forEach((item, index) => {
        item.style.transform = `translateY(${-offset}px)`;
        item.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
}

function calculatePayout(results) {
    const [r1, r2, r3] = results;

    // Three matches - JACKPOT! (But still satirical)
    if (r1 === r2 && r2 === r3) {
        const multiplier = 8;
        return BET_AMOUNT * multiplier;
    }

    // Two matches - "invest more"
    if (r1 === r2 || r2 === r3 || r1 === r3) {
        const multiplier = 1.5;
        return Math.floor(BET_AMOUNT * multiplier);
    }

    // No matches - loss
    return 0;
}

function displayResults(results, payout) {
    const symbolNames = results.map(idx => SYMBOLS[idx % SYMBOLS.length]);
    const resultText = symbolNames.join(' | ');

    lastResultEl.textContent = resultText;

    if (payout > BET_AMOUNT) {
        // Three-match win
        const profit = payout - BET_AMOUNT;
        lastPayoutEl.textContent = `+${profit} 🎉`;
        lastPayoutEl.style.color = '#00ff00';
        showMessage(
            `PROPHECY FULFILLED!\n+${profit} tokens materialized from the void\nYour model predicted correctly!`,
            'win'
        );
        triggerWinAnimation();
    } else if (payout > 0) {
        // Two-match win
        const profit = payout - BET_AMOUNT;
        lastPayoutEl.textContent = `${profit} tokens (nearly breakeven)`;
        lastPayoutEl.style.color = '#ffff00';
        showMessage(
            `PARTIAL CONVERGENCE\n${profit} tokens returned\nThe algorithm is learning™`,
            'near-win'
        );
    } else {
        // Loss
        lastPayoutEl.textContent = `-${BET_AMOUNT} (quantum tunneled away)`;
        lastPayoutEl.style.color = '#ff3333';
        showMessage(
            `TOKENS EVAPORATED\nThey're definitely being used for training\nYour sacrifice was necessary`,
            'lose'
        );
    }

    spinCountEl.textContent = totalSpins;
    totalSpentEl.textContent = totalSpent;
}

function showMessage(message, type) {
    winMessageEl.textContent = message;
    winIndicatorEl.classList.add('show');

    if (type === 'lose') {
        winIndicatorEl.classList.add('lose');
    } else {
        winIndicatorEl.classList.remove('lose');
    }
}

function triggerWinAnimation() {
    // Add some visual feedback for big wins
    spinBtn.style.animation = 'none';
    setTimeout(() => {
        spinBtn.style.animation = 'pulse 0.5s ease-out';
    }, 10);
}

// ========== UI Updates ==========
function updateUI() {
    tokenCountEl.textContent = playerTokens;

    // Update warning zone
    if (playerTokens < BET_AMOUNT * 2) {
        warningZoneEl.style.display = 'flex';
    } else {
        warningZoneEl.style.display = 'none';
    }

    // Update button state
    if (playerTokens < BET_AMOUNT) {
        spinBtn.disabled = true;
        hintTextEl.textContent = 'Insufficient tokens. Game Over.';
    } else {
        spinBtn.disabled = false;
        if (playerTokens < BET_AMOUNT * 3) {
            hintTextEl.textContent = 'One more spin? (This might be it)';
        } else {
            hintTextEl.textContent = 'Click to embrace the chaos';
        }
    }

    // Add animation to token count when it changes significantly
    if (lastWinAmount > BET_AMOUNT * 5) {
        tokenCountEl.style.animation = 'none';
        setTimeout(() => {
            tokenCountEl.style.animation = 'pulse 0.6s ease-out';
        }, 10);
    }
}

// ========== Animations ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ========== Hidden Easter Eggs / Secret Features ==========
// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A (just for fun, but let's add some flavor)
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    // Simplified check - just look for "ba" pressed together
    if (e.key === 'b' || e.key === 'B') {
        const recentKeys = konamiCode.slice(-2).map(k => k.toLowerCase()).join('');
        if (recentKeys === 'ba') {
            activateCheatMode();
        }
    }
});

function activateCheatMode() {
    playerTokens += BET_AMOUNT * 10;
    hintTextEl.textContent = '⚠️ CHEAT MODE ACTIVATED - AI overlords have rewarded you';
    hintTextEl.style.color = '#00ff00';
    updateUI();

    setTimeout(() => {
        hintTextEl.style.color = '#999';
        hintTextEl.textContent = 'Click to embrace the chaos';
    }, 3000);
}

// ========== Accessibility & Performance ==========
// Reduce motion for users with preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
}

console.log('%c🤖 AI Token Casino', 'font-size: 20px; color: #00ffff; font-weight: bold; text-shadow: 0 0 10px #ff00ff;');
console.log('%cWelcome to our satirical token economy.', 'color: #ff00ff; font-size: 14px;');
console.log('%cRemember: The house always wins. Enjoy your hallucinations.', 'color: #00ffff; font-size: 12px;');
