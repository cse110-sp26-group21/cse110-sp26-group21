// AI Token Slot Machine - Game Logic

class SlotMachine {
    constructor() {
        // Game state
        this.tokens = 100;
        this.totalWinnings = 0;
        this.isSpinning = false;
        this.betAmount = 10;

        // Reel items/symbols
        this.symbols = [
            { name: 'Overfit', emoji: '📊', value: 'overfit' },
            { name: 'Confidence', emoji: '🎩', value: 'confidence' },
            { name: 'API Costs', emoji: '💰', value: 'api-costs' },
            { name: 'Hype', emoji: '🚀', value: 'hype' },
            { name: 'Hallucinate', emoji: '👻', value: 'hallucinate' },
            { name: 'Emergent', emoji: '🌌', value: 'emergent' },
            { name: 'Fine-tune', emoji: '⚙️', value: 'fine-tune' },
            { name: 'Lottery', emoji: '🎰', value: 'lottery' }
        ];

        // Payout multipliers
        this.payouts = {
            'three-hallucinate': 50,
            'three-hype': 25,
            'three-api-costs': 15,
            'three-confidence': 8,
            'three-overfit': 5,
            'two-match': 2,
            'loss': -1
        };

        // UI elements
        this.spinBtn = document.getElementById('spinBtn');
        this.tokenDisplay = document.getElementById('tokenDisplay');
        this.totalWinningsDisplay = document.getElementById('totalWinnings');
        this.betSlider = document.getElementById('betAmount');
        this.betDisplay = document.getElementById('betDisplay');
        this.resultMessage = document.getElementById('resultMessage');
        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];

        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        this.spinBtn.addEventListener('click', () => this.spin());
        this.betSlider.addEventListener('input', (e) => {
            this.betAmount = parseInt(e.target.value);
            this.betDisplay.textContent = this.betAmount;
        });
    }

    spin() {
        if (this.isSpinning) return;
        if (this.tokens < this.betAmount) {
            this.showMessage('Not enough tokens! Get a job at OpenAI. 💼', 'loss');
            return;
        }

        this.isSpinning = true;
        this.spinBtn.disabled = true;
        this.resultMessage.textContent = '';

        // Deduct tokens
        this.tokens -= this.betAmount;
        this.updateDisplay();

        // Spin animation
        this.spinReels();
    }

    spinReels() {
        const spinDuration = 500; // milliseconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            
            if (elapsed < spinDuration) {
                // Animate all reels
                this.reels.forEach((reel, index) => {
                    reel.classList.add('spinning');
                    const randomSymbol = Math.floor(Math.random() * this.symbols.length);
                    this.displaySymbol(reel, randomSymbol);
                });
                requestAnimationFrame(animate);
            } else {
                // Stop spinning - show final results
                this.stopSpinning();
            }
        };

        animate();
    }

    stopSpinning() {
        // Generate random results for each reel
        const results = [
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length)
        ];

        // Display final results
        results.forEach((symbolIndex, reelIndex) => {
            this.reels[reelIndex].classList.remove('spinning');
            this.displaySymbol(this.reels[reelIndex], symbolIndex);
        });

        // Calculate winnings
        const winAmount = this.calculateWinnings(results);
        this.displayResult(results, winAmount);

        this.isSpinning = false;
        this.spinBtn.disabled = false;
    }

    displaySymbol(reel, symbolIndex) {
        // Clear previous items
        reel.querySelectorAll('.reel-item').forEach(item => {
            item.classList.remove('active');
        });
        // Show the selected symbol
        const items = reel.querySelectorAll('.reel-item');
        items[symbolIndex].classList.add('active');
    }

    calculateWinnings(results) {
        const symbolValues = results.map(i => this.symbols[i].value);
        const [s1, s2, s3] = symbolValues;

        // Check for three of a kind
        if (s1 === s2 && s2 === s3) {
            const key = `three-${s1}`;
            if (this.payouts[key]) {
                return this.betAmount * this.payouts[key];
            }
        }

        // Check for two of a kind
        if (s1 === s2 || s2 === s3 || s1 === s3) {
            return this.betAmount * this.payouts['two-match'];
        }

        // No match - loss
        return 0;
    }

    displayResult(results, winAmount) {
        const symbolNames = results.map(i => this.symbols[i].name);
        const symbolEmojis = results.map(i => this.symbols[i].emoji);

        if (winAmount > 0) {
            this.tokens += winAmount;
            this.totalWinnings += winAmount;
            this.updateDisplay();

            // Check if jackpot
            const [s1, s2, s3] = results.map(i => this.symbols[i].value);
            if (s1 === s2 && s2 === s3) {
                const messageMap = {
                    'hallucinate': `🎯 JACKPOT! YOU'VE HALLUCINATED ${winAmount} TOKENS!\n"That didn't happen, but it DEFINITELY should have!" - The AI`,
                    'hype': `🚀 BIG WIN! ${symbolNames.join(' + ')} = ${winAmount} TOKENS!\n"Revolutionary. Paradigm-shifting. Tokenomics." - Marketing Dept`,
                    'api-costs': `💸 Your tokens multiplied like compute costs! Won ${winAmount} TOKENS!\n"It's not a bug, it's a feature." - Support Team`,
                    'confidence': `🎯 CONFIDENCE JACKPOT! You won ${winAmount} TOKENS!\n"I'm 87% sure you won. Probably." - The Model`,
                    'overfit': `📊 OVERFIT WIN! ${winAmount} TOKENS!\n"Training accuracy: 100%. Test accuracy: questionable."`,
                    'emergent': `🌌 EMERGENT BEHAVIOR DETECTED! Spontaneously generated ${winAmount} TOKENS!`,
                    'fine-tune': `⚙️ PERFECTLY TUNED! Extracted ${winAmount} TOKENS!\n"We've optimized it for THIS specific slot machine." - Data Scientist`,
                    'lottery': `🎰 PURE LUCK! You won ${winAmount} TOKENS!\n"Even a broken AI is right twice per epoch."`
                };

                const matchType = [s1, s2, s3][0];
                const message = messageMap[matchType] || `JACKPOT! ${symbolEmojis.join(' ')} = ${winAmount} TOKENS!`;
                this.showMessage(message, 'jackpot');
            } else {
                // Two of a kind
                this.showMessage(`✨ You got ${symbolEmojis.join(' ')} and won ${winAmount} TOKENS!\n"Better luck than most startups" - Anonymous VC`, 'win');
            }
        } else {
            this.showMessage(`❌ ${symbolEmojis.join(' ')} = NOTHING\n"As expected, the model doesn't understand edge cases." - You`, 'loss');
        }
    }

    showMessage(text, type) {
        this.resultMessage.textContent = '';
        this.resultMessage.className = `result-message ${type}`;

        // Support multi-line messages
        const lines = text.split('\n');
        lines.forEach((line, index) => {
            const lineEl = document.createElement('div');
            lineEl.textContent = line;
            this.resultMessage.appendChild(lineEl);
            if (index === 0) {
                lineEl.style.fontWeight = 'bold';
                lineEl.style.marginBottom = '5px';
            }
        });

        // Auto-hide after delay
        setTimeout(() => {
            if (!this.isSpinning) {
                this.resultMessage.classList.add('hidden');
            }
        }, 5000);
    }

    updateDisplay() {
        this.tokenDisplay.textContent = this.tokens;
        this.totalWinningsDisplay.textContent = this.totalWinnings;

        // Disable spin button if not enough tokens
        this.spinBtn.disabled = this.tokens < this.betAmount;
        
        if (this.tokens < this.betAmount) {
            this.spinBtn.textContent = '🚫 BROKE - Bankrupt Like Crypto 🚫';
        } else {
            this.spinBtn.textContent = '💰 SPIN FOR HALLUCINATIONS 🎪';
        }
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new SlotMachine();
});
