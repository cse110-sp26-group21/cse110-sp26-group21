document.addEventListener('DOMContentLoaded', () => {
    // Core Parameters
    let tokens = 100;
    const spinCost = 5;
    const symbols = ['💸', '🎰', '📈', '🔮', '💰'];
    
    // Satirical Message Bank
    const messages = {
        spin: [
            "Optimizing hyperparameters...",
            "Running inference on H100s...",
            "Hallucinating a response...",
            "Calculating GPU depreciation...",
            "Harvesting user data for training..."
        ],
        win3: [
            "JACKPOT! This model is actually useful! (Unlikely)",
            "AGI ACHIEVED! (Marketing says so)",
            "Tokens generated. Valuation +$10B."
        ],
        win2: [
            "Partial match. We'll fix it in the next fine-tune.",
            "Two out of three. Better than GPT-3.5.",
            "Consolation tokens awarded. Keep spending."
        ],
        lose: [
            "Model collapsed. Tokens consumed.",
            "Refusal generated: 'As an AI, I cannot let you win.'",
            "Out of context window. Try again.",
            "Billing cycle complete. Thanks for the donation."
        ]
    };

    // DOM Elements
    const balanceEl = document.getElementById('token-balance');
    const reels = [
        document.getElementById('reel-1'),
        document.getElementById('reel-2'),
        document.getElementById('reel-3')
    ];
    const spinBtn = document.getElementById('spin-button');
    const logContent = document.getElementById('log-content');

    function updateLog(message) {
        const div = document.createElement('div');
        div.textContent = `> ${message}`;
        logContent.prepend(div);
    }

    async function spin() {
        if (tokens < spinCost) {
            updateLog("INSUFFICIENT FUNDS. PLEASE CONTACT SALES FOR ENTERPRISE TIER.");
            return;
        }

        // Deduct tokens
        tokens -= spinCost;
        balanceEl.textContent = tokens;
        spinBtn.disabled = true;
        
        updateLog(messages.spin[Math.floor(Math.random() * messages.spin.length)]);

        // Animate reels
        reels.forEach(reel => reel.classList.add('spinning'));

        // Wait for "Inference Latency"
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Calculate results
        const results = reels.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
        
        // Update UI
        reels.forEach((reel, i) => {
            reel.classList.remove('spinning');
            reel.textContent = results[i];
        });

        handleResults(results);
        spinBtn.disabled = false;
    }

    function handleResults(res) {
        const unique = new Set(res).size;
        let winAmount = 0;

        if (unique === 1) {
            // Three of a kind
            const symbol = res[0];
            const payouts = { '💸': 50, '🎰': 100, '📈': 30, '🔮': 75, '💰': 200 };
            winAmount = payouts[symbol];
            updateLog(messages.win3[Math.floor(Math.random() * messages.win3.length)]);
        } else if (unique === 2) {
            // Two of a kind
            winAmount = 10;
            updateLog(messages.win2[Math.floor(Math.random() * messages.win2.length)]);
        } else {
            updateLog(messages.lose[Math.floor(Math.random() * messages.lose.length)]);
        }

        if (winAmount > 0) {
            tokens += winAmount;
            balanceEl.textContent = tokens;
            updateLog(`CREDITED: +${winAmount} TOKENS.`);
        }

        if (tokens < spinCost) {
            updateLog("CRITICAL: BANKRUPTCY DETECTED. STARTUP FUNDING EXHAUSTED.");
            spinBtn.textContent = "FUNDING DEPLETED";
            spinBtn.disabled = true;
        }
    }

    spinBtn.addEventListener('click', spin);
});
