const SYMBOLS = [
    { char: '🤖', name: 'AGI', weight: 1 },
    { char: '📈', name: 'Hype', weight: 3 },
    { char: '🎰', name: 'Hallucination', weight: 4 },
    { char: '💸', name: 'Inference Cost', weight: 5 },
    { char: '🧠', name: 'Neural Soup', weight: 6 }
];

const SPIN_COST = 10;
let tokens = 100;
let totalSpent = 0;

const spinBtn = document.getElementById('spin-button');
const tokenDisplay = document.getElementById('token-balance');
const spentDisplay = document.getElementById('total-spent');
const statusMsg = document.getElementById('status-message');
const logContainer = document.getElementById('log-container');
const reels = [document.getElementById('reel-1'), document.getElementById('reel-2'), document.getElementById('reel-3')];

function getRandomSymbol() {
    const totalWeight = SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
    let random = Math.random() * totalWeight;
    for (const symbol of SYMBOLS) {
        if (random < symbol.weight) return symbol;
        random -= symbol.weight;
    }
    return SYMBOLS[SYMBOLS.length - 1];
}

function addLog(text, type = 'meta') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerText = `> ${text}`;
    logContainer.prepend(entry);
}

async function spin() {
    if (tokens < SPIN_COST) {
        statusMsg.innerText = "Error: Token balance insufficient. Please contact sales for Enterprise Tier.";
        return;
    }

    // Deduct tokens
    tokens -= SPIN_COST;
    totalSpent += SPIN_COST;
    updateUI();

    spinBtn.disabled = true;
    statusMsg.innerText = "Requesting inference from cluster...";
    
    reels.forEach(r => r.classList.add('spinning'));

    // Mock "latency"
    await new Promise(resolve => setTimeout(resolve, 1200));

    const results = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    
    reels.forEach((reel, i) => {
        reel.classList.remove('spinning');
        reel.innerText = results[i].char;
    });

    calculateOutcome(results);
    spinBtn.disabled = false;
}

function calculateOutcome(results) {
    const chars = results.map(r => r.char);
    const unique = new Set(chars);
    let reward = 0;
    let message = "";
    let type = 'meta';

    if (unique.size === 1) {
        // Jackpot logic
        const symbol = results[0];
        if (symbol.char === '🤖') {
            reward = 500;
            message = "CRITICAL SUCCESS: AGI achieved. Your job is now obsolete. +500 tokens.";
        } else if (symbol.char === '🎰') {
            reward = 0;
            message = "HALLUCINATION: The model is 99% confident you won, but the tokens don't exist.";
        } else if (symbol.char === '💸') {
            tokens -= 50;
            message = "SURCHARGE: Excessive inference triggered a hidden fee. -50 tokens.";
            type = 'loss';
        } else {
            reward = 100;
            message = `MATCHED: ${symbol.name} alignment successful! +100 tokens.`;
        }
        if (reward > 0) type = 'win';
    } else if (unique.size === 2) {
        reward = 15;
        message = "Partial match: Parameter tuning needed, but here's a small grant. +15 tokens.";
        type = 'win';
    } else {
        message = "No match: Model collapsed. Optimization failed.";
        type = 'loss';
    }

    tokens += reward;
    statusMsg.innerText = message;
    addLog(message, type);
    updateUI();
    
    if (type === 'win') document.querySelector('.reels').classList.add('payout-glow');
    setTimeout(() => document.querySelector('.reels').classList.remove('payout-glow'), 1500);
}

function updateUI() {
    tokenDisplay.innerText = tokens;
    spentDisplay.innerText = totalSpent;
}

spinBtn.addEventListener('click', spin);
