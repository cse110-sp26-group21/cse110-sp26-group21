const symbols = ['🤖', '🎰', '💸', '📈', '🧠', '⚡'];
const SPIN_COST = 10;
let tokens = 100;
let totalBurned = 0;
let isSpinning = false;

const tokenDisplay = document.getElementById('token-count');
const burnDisplay = document.getElementById('burn-count');
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');
const statusMsg = document.getElementById('status-msg');
const reels = [
    document.getElementById('reel-1'),
    document.getElementById('reel-2'),
    document.getElementById('reel-3')
];

const messages = {
    win: ["Inference successful. Model achieved alignment... for now.", "Jackpot! Your VC just sent another $10M in compute credits.", "Emergent behavior detected: You actually won tokens."],
    loss: ["Hallucination detected. Output was pure noise.", "Model collapsed. It's just repeating 'banana' in 40 languages.", "Safety filters triggered. Tokens confiscated for 'protection'.", "Inference timeout. The GPU caught fire."],
    broke: "Bankrupt. Your startup has been acquired by a bigger hype-machine for $0."
};

function updateUI() {
    tokenDisplay.textContent = tokens;
    burnDisplay.textContent = totalBurned;
    spinBtn.disabled = tokens < SPIN_COST || isSpinning;
}

async function spin() {
    if (isSpinning || tokens < SPIN_COST) return;

    isSpinning = true;
    tokens -= SPIN_COST;
    totalBurned += SPIN_COST;
    updateUI();

    const processingTexts = ["Optimizing weights...", "Quantizing model...", "Searching for correlation...", "Ignoring edge cases...", "Burning venture capital..."];
    statusMsg.textContent = processingTexts[Math.floor(Math.random() * processingTexts.length)];
    statusMsg.className = "msg-system";
    spinBtn.disabled = true;
    resetBtn.disabled = true;

    // Start Animation
    reels.forEach(r => r.classList.add('spinning'));

    // Satirical Latency
    const latency = 1200 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, latency));

    const results = reels.map(r => {
        r.classList.remove('spinning');
        const res = symbols[Math.floor(Math.random() * symbols.length)];
        r.textContent = res;
        return res;
    });

    evaluate(results);
    isSpinning = false;
    spinBtn.disabled = tokens < SPIN_COST;
    resetBtn.disabled = false;
    updateUI();
}

function evaluate(res) {
    const [s1, s2, s3] = res;
    let win = 0;
    let msg = "";
    let type = "";

    if (s1 === s2 && s2 === s3) {
        win = s1 === '🤖' ? 150 : 75;
        msg = messages.win[Math.floor(Math.random() * messages.win.length)];
        type = "msg-win";
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        win = 15;
        msg = "Partial match. Your model is 66% confident this is a win.";
        type = "msg-win";
    } else {
        msg = messages.loss[Math.floor(Math.random() * messages.loss.length)];
        type = "msg-error";
    }

    tokens += win;
    if (tokens < SPIN_COST && win === 0) msg = messages.broke;
    
    statusMsg.textContent = msg;
    statusMsg.className = type;
}

function reset() {
    if (isSpinning) return;
    tokens = 100;
    totalBurned = 0;
    statusMsg.textContent = "Pivot complete. New seed funding secured.";
    statusMsg.className = "msg-system";
    updateUI();
}

spinBtn.addEventListener('click', spin);
resetBtn.addEventListener('click', reset);
