/**
 * Inference Roulette v4.0-turbo
 * Satirical AI Slot Machine Logic
 */

const SYMBOLS = ['💸', '🎰', '📈', '🤖', '🔮', '💰'];
const SPIN_COST = 5;

const MESSAGES = {
    win: [
        "Actual value generated? This is a statistical anomaly.",
        "Model converged! Enjoy your temporary credits.",
        "Disrupted the industry with a lucky guess.",
        "The black box smiled upon you. For now."
    ],
    loss: [
        "Inference too creative (aka wrong).",
        "Token limit reached. Please buy more compute.",
        "Model hallucinated a loss. Realistic!",
        "Seed funding successfully burned."
    ],
    processing: [
        "Quantizing model weights...",
        "Simulating alignment...",
        "Ignoring safety filters...",
        "Optimizing for VC metrics...",
        "Scraping the open web without consent..."
    ],
    jackpot: "AGI ACHIEVED! (Or just a really good seed value)."
};

let state = {
    tokens: 100,
    totalSpent: 0
};

// DOM Elements
const balanceEl = document.getElementById('token-balance');
const burnEl = document.getElementById('burn-rate');
const statusEl = document.getElementById('status-msg');
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');
const reels = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];

function updateUI() {
    balanceEl.textContent = state.tokens;
    burnEl.textContent = state.totalSpent;
    spinBtn.disabled = state.tokens < SPIN_COST;
}

async function runInference() {
    if (state.tokens < SPIN_COST) return;

    // Deduct tokens
    state.tokens -= SPIN_COST;
    state.totalSpent += SPIN_COST;
    updateUI();

    // Start Animation
    spinBtn.disabled = true;
    statusEl.className = "console-text";
    statusEl.textContent = MESSAGES.processing[Math.floor(Math.random() * MESSAGES.processing.length)];
    reels.forEach(r => r.classList.add('spinning'));

    // Simulated inference latency (800ms - 1800ms)
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

    const results = reels.map(r => {
        r.classList.remove('spinning');
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        r.textContent = symbol;
        return symbol;
    });

    evaluateResults(results);
}

function evaluateResults(results) {
    const [s1, s2, s3] = results;
    let payout = 0;
    let type = "console-text";

    if (s1 === s2 && s2 === s3) {
        payout = (s1 === '🤖') ? 200 : 50;
        statusEl.textContent = (s1 === '🤖') ? MESSAGES.jackpot : MESSAGES.win[Math.floor(Math.random() * MESSAGES.win.length)];
        type = "win";
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        payout = 10;
        statusEl.textContent = "Partial alignment detected. Small compute refund issued.";
        type = "win";
    } else {
        statusEl.textContent = MESSAGES.loss[Math.floor(Math.random() * MESSAGES.loss.length)];
        type = "error";
    }

    state.tokens += payout;
    statusEl.classList.add(type);
    updateUI();
}

spinBtn.addEventListener('click', runInference);
resetBtn.addEventListener('click', () => {
    state = { tokens: 100, totalSpent: 0 };
    statusEl.textContent = "Pivot successful. New seed round acquired.";
    updateUI();
});
