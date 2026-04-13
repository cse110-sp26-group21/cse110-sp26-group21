const symbols = ['🤖', '💸', '🎰', '📈', '🔮', '💰'];
const spinCost = 10;
let balance = 100;

const spinBtn = document.getElementById('spin-btn');
const balanceDisplay = document.getElementById('token-balance');
const statusLog = document.getElementById('status-log');
const reels = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];

const messages = {
    win: [
        "Convergence achieved. Payout allocated.",
        "Model successfully overfitted to your luck.",
        "Series A funding secured. Tokens injected.",
        "Hallucination accepted as fact. Jackpot!"
    ],
    loss: [
        "Inference failed. Tokens consumed.",
        "Model collapsed. Try more compute.",
        "Data drift detected. Accuracy: 0%.",
        "Prompt rejected by safety filter."
    ]
};

function addLog(text, type = '') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `> ${text}`;
    statusLog.prepend(entry);
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

async function spin() {
    if (balance < spinCost) {
        addLog("Error: Insufficient capital for inference.", "log-loss");
        return;
    }

    // Deduct cost
    balance -= spinCost;
    updateUI();
    spinBtn.disabled = true;
    addLog("Running inference...", "");

    // Start animation
    reels.forEach(reel => reel.classList.add('spinning'));

    // Artificial latency (simulating model "thinking" time)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Results
    const results = reels.map(() => getRandomSymbol());

    // Stop animation and update symbols
    reels.forEach((reel, i) => {
        reel.classList.remove('spinning');
        reel.textContent = results[i];
    });

    calculateResult(results);
    spinBtn.disabled = false;
}

function calculateResult(res) {
    const unique = new Set(res);
    let winAmount = 0;
    let msg = "";
    let type = "";

    if (unique.size === 1) {
        // 3 of a kind
        winAmount = 100;
        msg = `JACKPOT! ${messages.win[Math.floor(Math.random() * messages.win.length)]} +${winAmount}`;
        type = "log-win";
    } else if (unique.size === 2) {
        // 2 of a kind
        winAmount = 15;
        msg = `Partial match. ${messages.win[Math.floor(Math.random() * messages.win.length)]} +${winAmount}`;
        type = "log-win";
    } else {
        // Loss
        winAmount = 0;
        msg = messages.loss[Math.floor(Math.random() * messages.loss.length)];
        type = "log-loss";
    }

    balance += winAmount;
    updateUI();
    addLog(msg, type);

    if (balance <= 0) {
        addLog("SYSTEM CRITICAL: Bankrupt. Pivot to Web4 required.", "log-loss");
        spinBtn.disabled = true;
    }
}

function updateUI() {
    balanceDisplay.textContent = balance;
}

spinBtn.addEventListener('click', spin);
