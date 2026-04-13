class AITokenSlotMachine {
    constructor() {
        // Game Constants
        this.SPIN_COST = 25;
        this.INITIAL_TOKENS = 1000;
        
        // Symbol win values (matching combos)
        this.PAYOUTS = {
            '💭 Hallucination': 50,
            '💰 Tokens': 200,
            '🔧 Inference': 75,
            '📈 AI Hype': 150,
            '🐛 Bug Fix': 100,
            '🤥 LoRA': 60
        };
        
        // Flavor text messages (satirical AI jokes)
        this.WIN_MESSAGES = [
            'Finally! A hallucination that paid off!',
            'Your tokens have been successfully invoiced.',
            'Inference costs: more than your house.',
            'This model definitely understands the assignment.',
            'We promise this wasn\'t a training accident.',
            'Tokens converted to venture capital debt.',
            'Your loss is our KPI gaining campaign.',
            'The AI is definitely not laughing at you.',
            'This is fine. Everything is fine.',
            'We have achieved alignment... with your wallet.',
            'Stochastic Parrot says: GIVE ME TOKENS',
            'Attention is all you need... to lose money.',
            'Transformer go brrrr (spending your cash)',
            'We\'re worth more than Apple, trust us bro.',
            'This success rate beats actual models!',
        ];
        
        this.LOSS_MESSAGES = [
            '*AI contemplates existence*',
            'The model has spoken... and it says "no."',
            'This inference was hallucinated.',
            'Tokens redistributed to shareholders.',
            'Your money goes brrrrr (away).',
            'The algorithm has decided: you lose.',
            'We\'re working on this issue (we\'re not).',
            'This is not financial advice.',
            'Error 404: Winning not found.',
            'The LLM took your tokens personally.',
            'Your LoRA adapter didn\'t attach.',
            'Batch size reduced to zero.',
            'CUDA out of memory (and tokens).',
            'Gradient descent into poverty.',
            'Temperature set too HIGH for your wallet.',
        ];
        
        this.NEAR_ZERO_MESSAGES = [
            '⚠️ Critical token shortage detected! Investor intervention incoming...',
            '⚠️ Token reserves depleted. Pivot detected. Rebranding as "Node" incoming.',
            '⚠️ Bankruptcy imminent. We\'re pivoting to consulting.',
        ];
        
        // State
        this.tokens = this.INITIAL_TOKENS;
        this.totalSpent = 0;
        this.totalWon = 0;
        this.spinCount = 0;
        this.isSpinning = false;
        
        // DOM Elements
        this.tokenCount = document.getElementById('tokenCount');
        this.spinButton = document.getElementById('spinButton');
        this.resetButton = document.getElementById('resetButton');
        this.resultMessage = document.getElementById('resultMessage');
        this.flavorText = document.getElementById('flavorText');
        this.warningMessage = document.getElementById('warningMessage');
        this.totalSpentEl = document.getElementById('totalSpent');
        this.totalWonEl = document.getElementById('totalWon');
        this.spinCountEl = document.getElementById('spinCount');
        this.netBalanceEl = document.getElementById('netBalance');
        
        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];
        
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        this.spinButton.addEventListener('click', () => this.spin());
        this.resetButton.addEventListener('click', () => this.reset());
    }
    
    spin() {
        if (this.isSpinning) return;
        if (this.tokens < this.SPIN_COST) {
            this.flavorText.textContent = 'Insufficient tokens for spin. The AI sympathizes.';
            return;
        }
        
        this.isSpinning = true;
        this.spinButton.disabled = true;
        
        // Deduct cost
        this.tokens -= this.SPIN_COST;
        this.totalSpent += this.SPIN_COST;
        this.spinCount += 1;
        
        // Animate reels spinning
        const spinDuration = 1500; // milliseconds
        const spinTime = Date.now();
        
        this.reels.forEach(reel => reel.classList.add('spinning'));
        
        setTimeout(() => {
            this.reels.forEach(reel => reel.classList.remove('spinning'));
            this.stopSpin();
        }, spinDuration);
    }
    
    stopSpin() {
        // Get random symbols for each reel
        const symbols = Object.keys(this.PAYOUTS);
        const result = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        // Set reel positions to show selected symbols
        result.forEach((symbol, index) => {
            const symbolIndex = symbols.indexOf(symbol);
            const offset = -(symbolIndex * 100);
            this.reels[index].style.transform = `translateY(${offset}px)`;
        });
        
        // Check for wins
        this.evaluateResult(result);
        
        this.isSpinning = false;
        this.spinButton.disabled = false;
        this.updateDisplay();
    }
    
    evaluateResult(result) {
        const messageZone = document.querySelector('.message-zone');
        messageZone.classList.remove('win-animation');
        
        // All three match = JACKPOT
        if (result[0] === result[1] && result[1] === result[2]) {
            const winAmount = this.PAYOUTS[result[0]] * 3;
            this.tokens += winAmount;
            this.totalWon += winAmount;
            this.resultMessage.textContent = `🎉 JACKPOT! +${winAmount} tokens! 🎉`;
            this.resultMessage.style.color = '#00ff00';
            this.flavorText.textContent = this.WIN_MESSAGES[Math.floor(Math.random() * this.WIN_MESSAGES.length)];
            messageZone.classList.add('win-animation');
        }
        // Two match = MINOR WIN
        else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
            let winAmount = 0;
            let matchedSymbol = '';
            
            if (result[0] === result[1]) {
                matchedSymbol = result[0];
                winAmount = this.PAYOUTS[matchedSymbol];
            } else if (result[1] === result[2]) {
                matchedSymbol = result[1];
                winAmount = this.PAYOUTS[matchedSymbol];
            } else {
                matchedSymbol = result[0];
                winAmount = this.PAYOUTS[matchedSymbol] / 2;
            }
            
            this.tokens += winAmount;
            this.totalWon += winAmount;
            this.resultMessage.textContent = `🎊 Minor Win! +${Math.floor(winAmount)} tokens`;
            this.resultMessage.style.color = '#ffff00';
            this.flavorText.textContent = this.WIN_MESSAGES[Math.floor(Math.random() * this.WIN_MESSAGES.length)];
            messageZone.classList.add('win-animation');
        }
        // No match = LOSS
        else {
            this.resultMessage.textContent = '❌ No Match. The House Wins.';
            this.resultMessage.style.color = '#ff6b6b';
            this.flavorText.textContent = this.LOSS_MESSAGES[Math.floor(Math.random() * this.LOSS_MESSAGES.length)];
        }
    }
    
    updateDisplay() {
        this.tokenCount.textContent = this.tokens;
        this.totalSpentEl.textContent = this.totalSpent;
        this.totalWonEl.textContent = this.totalWon;
        this.spinCountEl.textContent = this.spinCount;
        this.netBalanceEl.textContent = this.tokens - this.INITIAL_TOKENS;
        
        // Update net balance color
        const netBalance = this.tokens - this.INITIAL_TOKENS;
        if (netBalance > 0) {
            this.netBalanceEl.style.color = '#00ff00';
        } else if (netBalance < 0) {
            this.netBalanceEl.style.color = '#ff6b6b';
        } else {
            this.netBalanceEl.style.color = '#00d4ff';
        }
        
        // Check token levels for warnings
        this.updateWarnings();
        
        // Disable spin button if not enough tokens
        this.spinButton.disabled = this.tokens < this.SPIN_COST || this.isSpinning;
        
        // Update spin button text
        if (this.spinButton.disabled && this.tokens < this.SPIN_COST) {
            this.spinButton.textContent = 'INSUFFICIENT TOKENS';
        } else {
            this.spinButton.textContent = `SPIN (${this.SPIN_COST} tokens)`;
        }
    }
    
    updateWarnings() {
        this.warningMessage.textContent = '';
        
        if (this.tokens === 0) {
            this.warningMessage.textContent = this.NEAR_ZERO_MESSAGES[2];
            this.warningMessage.style.color = '#ff0000';
        } else if (this.tokens < 50) {
            this.warningMessage.textContent = this.NEAR_ZERO_MESSAGES[1];
            this.warningMessage.style.color = '#ff6b6b';
        } else if (this.tokens < 100) {
            this.warningMessage.textContent = this.NEAR_ZERO_MESSAGES[0];
            this.warningMessage.style.color = '#ffaa00';
        }
    }
    
    reset() {
        // Reset to initial state
        this.tokens = this.INITIAL_TOKENS;
        this.totalSpent = 0;
        this.totalWon = 0;
        this.spinCount = 0;
        this.isSpinning = false;
        
        // Reset reels to neutral position
        this.reels.forEach(reel => {
            reel.style.transform = 'translateY(0px)';
        });
        
        // Reset messages
        this.resultMessage.textContent = 'Ready to spin?';
        this.resultMessage.style.color = '#00ff00';
        this.flavorText.textContent = '*AI is actually in the building*';
        
        this.spinButton.disabled = false;
        
        this.updateDisplay();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AITokenSlotMachine();
});
