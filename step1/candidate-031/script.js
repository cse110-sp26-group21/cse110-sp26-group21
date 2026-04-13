const SYMBOLS = ['💸', '🎰', '📈', '🔮', '💰', '🤖'];
const SPIN_COST = 5;
const MESSAGES = {
    win: [
        "Actual value generated? This is a statistical anomaly.",
        "Model converged! Enjoy your temporary credits.",
        "You just disrupted the industry with a lucky guess.",
        "The black box smiled upon you. For now."
    ],
    loss: [
        "Your inference was too creative (aka wrong).",
        "Token limit reached. Please purchase more compute.",
        "Model hallucinated a loss. How realistic!",
        "Seed funding successfully burned."
    ],
    jackpot: "AGI ACHIEVED! (Or just a really good seed value)."
};

let state = {
    tokens: 100,
    totalSpins: 0
};

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
    burnEl.textContent = (state.totalSpins * SPIN_COST).toFixed(1);
    spinBtn.disabled = state.tokens < SPIN_COST;
}

async function runInference() {
    if (state.tokens < SPIN_COST) return;

    // Charge the user
    state.tokens -= SPIN_COST;
    state.totalSpins++;
    updateUI();

    // Start Animation
    spinBtn.disabled = true;
    statusEl.textContent = "Processing neural weights...";
    reels.forEach(r => r.classList.add('spinning'));

    // Simulate "thinking" time (latency joke)
    await new Promise(resolve => setTimeout(resolve, 1000));

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
    let msg = "";

    if (s1 === s2 && s2 === s3) {
        payout = s1 === '🤖' ? 100 : 50;
        msg = s1 === '🤖' ? MESSAGES.jackpot : MESSAGES.win[Math.floor(Math.random() * MESSAGES.win.length)];
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        payout = 10;
        msg = "Partial alignment detected. Here's a small refund.";
    } else {
        msg = MESSAGES.loss[Math.floor(Math.random() * MESSAGES.loss.length)];
    }

    state.tokens += payout;
    statusEl.textContent = msg;
    updateUI();
}

function resetGame() {
    state = { tokens: 100, totalSpins: 0 };
    statusEl.textContent = "Pivot successful. New seed round acquired.";
    updateUI();
}

spinBtn.addEventListener('click', runInference);
resetBtn.addEventListener('click', resetGame);
