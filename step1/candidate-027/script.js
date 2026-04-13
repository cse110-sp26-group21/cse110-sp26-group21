const symbols = ["💸", "🎰", "📈", "🔮", "💰"];
const payouts3 = {
    "💰": 100, // Free Trial Blessing
    "🎰": 50,  // Hallucination Jackpot
    "🔮": 40,  // Injection Success
    "💸": 20,  // Inference Pricing
    "📈": 15   // Model Performance
};

let tokens = 100;
let totalBurned = 0;

const tokenBalanceEl = document.getElementById('token-balance');
const totalBurnedEl = document.getElementById('total-burned');
const reelEls = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');
const eventLog = document.getElementById('event-log');

function log(message, type = 'system') {
    const entry = document.createElement('p');
    entry.className = `log-entry ${type}`;
    entry.textContent = `> ${message}`;
    eventLog.prepend(entry);
    
    if (eventLog.childNodes.length > 20) {
        eventLog.removeChild(eventLog.lastChild);
    }
}

async function spin() {
    if (tokens < 5) {
        log("ERROR: 402 Payment Required. Insufficient tokens for inference.", "loss");
        return;
    }

    // Deduct cost
    tokens -= 5;
    totalBurned += 5;
    updateStats();
    
    spinBtn.disabled = true;
    log("Inference running... Optimizing weights... Hallucinating results...");

    // Animation
    reelEls.forEach(el => el.classList.add('spinning'));
    
    // Simulation of "Latency"
    await new Promise(resolve => setTimeout(resolve, 800));

    const results = reelEls.map(el => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        el.classList.remove('spinning');
        el.textContent = symbol;
        return symbol;
    });

    // Evaluation
    let winAmount = 0;
    const [r1, r2, r3] = results;

    if (r1 === r2 && r2 === r3) {
        winAmount = payouts3[r1];
        log(`CRITICAL SUCCESS: [${r1}${r2}${r3}] Model converged! +${winAmount} tokens.`, "win");
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        winAmount = 2;
        log(`PARTIAL MATCH: [${r1}${r2}${r3}] "Good enough for a demo." +2 tokens.`, "win");
    } else {
        log(`FAILURE: [${r1}${r2}${r3}] Inference too creative. 0 tokens returned.`, "loss");
    }

    tokens += winAmount;
    updateStats();
    spinBtn.disabled = false;
}

function updateStats() {
    tokenBalanceEl.textContent = tokens;
    totalBurnedEl.textContent = totalBurned;
}

function reset() {
    tokens = 100;
    totalBurned = 0;
    updateStats();
    eventLog.innerHTML = '<p class="log-entry system">Ready for overhyped predictions...</p>';
    reelEls.forEach(el => el.textContent = "💸");
    log("Venture Capital secured. Token balance restored to 100.");
}

spinBtn.addEventListener('click', spin);
resetBtn.addEventListener('click', reset);
