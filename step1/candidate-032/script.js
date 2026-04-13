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
        "Token limit reached. Buy more compute.",
        "Model hallucinated a loss. Realistic!",
        "Seed funding successfully burned."
    ],
    jackpot: "AGI ACHIEVED! (Or just a really good seed value)."
};

let state = {
    tokens: 100,
    totalSpent: 0
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
    burnEl.textContent = state.totalSpent;
    spinBtn.disabled = state.tokens < SPIN_COST;
}

async function runInference() {
    if (state.tokens < SPIN_COST) return;

    state.tokens -= SPIN_COST;
    state.totalSpent += SPIN_COST;
    updateUI();

    spinBtn.disabled = true;
    statusEl.textContent = "Processing neural weights...";
    reels.forEach(r => r.classList.add('spinning'));

    // Simulated latency for "authenticity"
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

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
        if (s1 === '🤖') {
            payout = 200;
            msg = MESSAGES.jackpot;
        } else {
            payout = 50;
            msg = MESSAGES.win[Math.floor(Math.random() * MESSAGES.win.length)];
        }
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        payout = 10;
        msg = "Partial alignment detected. Small compute refund issued.";
    } else {
        msg = MESSAGES.loss[Math.floor(Math.random() * MESSAGES.loss.length)];
    }

    state.tokens += payout;
    statusEl.textContent = msg;
    updateUI();
}

function resetGame() {
    state = { tokens: 100, totalSpent: 0 };
    statusEl.textContent = "Pivot successful. New seed round acquired.";
    updateUI();
}

spinBtn.addEventListener('click', runInference);
resetBtn.addEventListener('click', resetGame);
updateUI();
