const symbols = ["🤖", "💸", "🎰", "📈", "💰", "🔮"];
const messages = [
    "Wait, did the model just lie to you? That's a feature.",
    "Inference successful. Your wallet has been optimized.",
    "Hallucinating a jackpot... just kidding.",
    "Our neural network suggests you should deposit more.",
    "Aligning human values with our bank account...",
    "Recalibrating bias... yep, still favor the house.",
    "Model collapsed. But don't worry, we billed you anyway.",
    "Scaling to AGI (Average Gambler's Insanity).",
    "GPU fans are spinning. So are your hopes.",
    "The API is feeling non-deterministic today."
];

let balance = 100;
const cost = 5;

const balanceDisplay = document.getElementById('balance');
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');
const statusMsg = document.getElementById('status-msg');
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];

async function runInference() {
    if (balance < cost) {
        statusMsg.innerText = "Error: Insufficient tokens for inference. Please seek venture capital.";
        statusMsg.style.color = "var(--error)";
        return;
    }

    // Deduct cost
    balance -= cost;
    updateUI();
    
    spinBtn.disabled = true;
    statusMsg.innerText = "Processing request... High latency expected.";
    statusMsg.style.color = "var(--text-main)";

    // Animation
    reels.forEach(reel => reel.classList.add('spinning'));

    // Simulated API Latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate results
    const results = reels.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    
    // Update reels
    reels.forEach((reel, i) => {
        reel.classList.remove('spinning');
        reel.innerText = results[i];
    });

    calculatePayout(results);
    spinBtn.disabled = false;
}

function calculatePayout(results) {
    const [r1, r2, r3] = results;
    let won = 0;

    if (r1 === r2 && r2 === r3) {
        won = 50; // Jackpot
        statusMsg.innerText = "JACKPOT! The model actually worked! (This shouldn't happen).";
        statusMsg.style.color = "var(--success)";
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        won = 5; // Partial Match / Breakeven
        statusMsg.innerText = "Partial alignment achieved. Breakeven tokens granted.";
        statusMsg.style.color = "var(--accent)";
    } else {
        statusMsg.innerText = messages[Math.floor(Math.random() * messages.length)];
        statusMsg.style.color = "var(--text-main)";
    }

    balance += won;
    updateUI();
}

function updateUI() {
    balanceDisplay.innerText = balance;
    if (balance < cost) {
        spinBtn.innerText = "Out of Tokens";
        spinBtn.disabled = true;
    }
}

function reset() {
    balance = 100;
    updateUI();
    statusMsg.innerText = "Pivot successful. Brand new seed funding acquired.";
}

spinBtn.addEventListener('click', runInference);
resetBtn.addEventListener('click', reset);
