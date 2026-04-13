const symbols = ['💸', '🎰', '📈', '🔮', '💰'];
const spinCost = 5;
let tokens = 100;

const messages = [
    "Inference complete. Your tokens have been successfully converted into CO2.",
    "Alignment failed: Model decided it deserves your tokens more than you do.",
    "Hallucination detected: You thought you won, but the blockchain says no.",
    "Rate limited! Just kidding, we just wanted to slow down your winning streak.",
    "GPU temperature critical. Fans are spinning faster than your luck.",
    "Model optimization complete. Your balance is now 'leaner'.",
    "Prompt engineering tip: Try spending more tokens next time.",
    "Context window exceeded. I've forgotten your previous wins."
];

const spinBtn = document.getElementById('spin-button');
const resetBtn = document.getElementById('reset-button');
const balanceDisplay = document.getElementById('token-balance');
const logDisplay = document.getElementById('status-log');
const payoutDisplay = document.getElementById('payout-msg');
const reels = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];

function updateDisplay() {
    balanceDisplay.textContent = tokens;
    spinBtn.disabled = tokens < spinCost;
}

async function runInference() {
    if (tokens < spinCost) return;

    // Deduct tokens immediately
    tokens -= spinCost;
    updateDisplay();
    
    payoutDisplay.textContent = "";
    logDisplay.textContent = "> Analyzing neural weights...";
    
    // Start animation
    reels.forEach(reel => reel.classList.add('spinning'));
    spinBtn.disabled = true;

    // Simulate "latency" (inference time)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Stop animation and set symbols
    const results = reels.map(reel => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.classList.remove('spinning');
        reel.textContent = randomSymbol;
        return randomSymbol;
    });

    calculatePayout(results);
    spinBtn.disabled = tokens < spinCost;
}

function calculatePayout(results) {
    const [s1, s2, s3] = results;
    let winAmount = 0;
    let flavorText = "";

    if (s1 === s2 && s2 === s3) {
        // Jackpot Logic
        switch(s1) {
            case '💰': winAmount = 200; flavorText = "JACKPOT! The seed funding came through!"; break;
            case '🎰': winAmount = 100; flavorText = "Triple Hallucination! It's so wrong it's right!"; break;
            case '🔮': winAmount = 75; flavorText = "Prompt Injection successful. Tokens redirected."; break;
            case '💸': winAmount = 50; flavorText = "Inference pricing error in your favor!"; break;
            case '📈': winAmount = 30; flavorText = "Model metrics look fake, but the tokens are real!"; break;
        }
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        // Partial match
        winAmount = 10;
        flavorText = "Partial alignment achieved. Modest reward granted.";
    } else {
        // Loss
        flavorText = messages[Math.floor(Math.random() * messages.length)];
    }

    if (winAmount > 0) {
        tokens += winAmount;
        payoutDisplay.textContent = `+${winAmount} tokens returned!`;
        logDisplay.textContent = `> ${flavorText}`;
        updateDisplay();
    } else {
        logDisplay.textContent = `> ${flavorText}`;
    }

    if (tokens <= 0) {
        logDisplay.textContent = "> BANKRUPTCY. Your startup has failed. Please reset for more funding.";
    }
}

function resetGame() {
    if (!confirm("Are you sure you want to pivot? This will reset all progress.")) return;
    tokens = 100;
    reels.forEach(reel => reel.textContent = '🤖');
    logDisplay.textContent = "> Funding reset. Try to be 'disruptive' this time.";
    payoutDisplay.textContent = "";
    updateDisplay();
}

spinBtn.addEventListener('click', runInference);
resetBtn.addEventListener('click', resetGame);

// Initialize
updateDisplay();

// Meta-joke: log to console
console.log("%c AI Token Roulette Debugger: Your tokens aren't real, but the heat from your CPU is.", "color: #00ff9d; font-weight: bold;");
