const CONFIG = {
    INITIAL_TOKENS: 100,
    SPIN_COST: 5,
    SYMBOLS: ['💸', '🎰', '📈', '🔮', '💰'],
    SYMBOL_MAP: { '💸': 'Cost', '🎰': 'Hallucination', '📈': 'Hype', '🔮': 'Injection', '💰': 'Miracle' },
    PAYOUTS: { '💸💸💸': 50, '🎰🎰🎰': 100, '📈📈📈': 30, '🔮🔮🔮': 75, '💰💰💰': 200 },
    MESSAGES: [
        "Tokens optimized into thin air.",
        "Inference too creative (hallucination detected).",
        "GPU fans at 100%... result: null.",
        "VC funding depleted. Spin for Series A.",
        "Alignment failed. More RLHF required.",
        "Latency was high, but the bill is instant.",
        "Model collapsed. Please try a larger context window."
    ]
};

let balance = parseInt(localStorage.getItem('ai_roulette_tokens')) || CONFIG.INITIAL_TOKENS;

const elements = {
    reels: [document.getElementById('reel-1'), document.getElementById('reel-2'), document.getElementById('reel-3')],
    balance: document.getElementById('token-balance'),
    btn: document.getElementById('spin-button'),
    log: document.getElementById('status-log')
};

function updateUI() {
    elements.balance.textContent = balance;
    elements.btn.disabled = balance < CONFIG.SPIN_COST;
    localStorage.setItem('ai_roulette_tokens', balance);
    
    if (balance < CONFIG.SPIN_COST) {
        sendLog("Bankruptcy achieved. Refresh for more VC funding.", "danger");
    }
}

function sendLog(msg, type = "normal") {
    elements.log.textContent = `> ${msg}`;
    elements.log.style.color = type === "success" ? "#238636" : (type === "danger" ? "#da3633" : "#c9d1d9");
}

async function spin() {
    if (balance < CONFIG.SPIN_COST) return;

    balance -= CONFIG.SPIN_COST;
    updateUI();
    sendLog("Requesting inference from cluster...");
    
    elements.btn.disabled = true;
    elements.reels.forEach(r => r.classList.add('spinning'));
    
    // Satirical "Inference Latency"
    await new Promise(res => setTimeout(res, 1000 + Math.random() * 1000));
    
    const results = elements.reels.map(reel => {
        const symbol = CONFIG.SYMBOLS[Math.floor(Math.random() * CONFIG.SYMBOLS.length)];
        reel.classList.remove('spinning');
        reel.textContent = symbol;
        return symbol;
    });

    processResult(results);
}

function processResult(res) {
    const combo = res.join('');
    let win = 0;

    if (CONFIG.PAYOUTS[combo]) {
        win = CONFIG.PAYOUTS[combo];
        sendLog(`CRITICAL SUCCESS: ${CONFIG.SYMBOL_MAP[res[0]]} match! +${win} tokens`, "success");
    } else if (res[0] === res[1] || res[1] === res[2] || res[0] === res[2]) {
        win = 10;
        sendLog(`Partial Alignment: +10 tokens. Close enough for a demo.`, "success");
    } else {
        sendLog(CONFIG.MESSAGES[Math.floor(Math.random() * CONFIG.MESSAGES.length)]);
    }

    balance += win;
    elements.btn.disabled = false;
    updateUI();
    
    // Add extra "vibrate" on big win
    if (win >= 50) {
        document.querySelector('.container').style.transform = 'scale(1.02)';
        setTimeout(() => document.querySelector('.container').style.transform = 'scale(1)', 100);
    }
}

elements.btn.addEventListener('click', spin);

// Initialize UI
updateUI();
if (balance === 100) {
    sendLog("Ready for inference. 5 tokens/request.");
}
