/**
 * AI Token Casino™ - Slot Machine Game Logic
 * "Where your inference costs meet destiny"
 */

class SlotMachine {
    constructor() {
        // Game State
        this.tokens = 100;
        this.totalSpent = 0;
        this.totalWon = 0;
        this.isSpinning = false;
        this.currentBet = 10;

        // Symbols and their properties
        this.symbols = [
            { label: '💰 Token', multiplier: 2 },
            { label: '🌀 Hallucination', multiplier: -1 },
            { label: '📈 Model v2.5', multiplier: 1.5 },
            { label: '⚡ Inference', multiplier: 1 },
            { label: '🎲 Context Limit', multiplier: 0.5 },
            { label: '🚨 API Error', multiplier: 0 },
            { label: '✨ Just Works™', multiplier: 1.2 },
            { label: '🦆 Rubber Duck', multiplier: 1 }
        ];

        // Reel configurations
        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];

        // DOM elements
        this.spinButton = document.getElementById('spinButton');
        this.resetButton = document.getElementById('resetButton');
        this.tokenCountDisplay = document.getElementById('tokenCount');
        this.betAmountSelect = document.getElementById('betAmount');
        this.resultMessage = document.getElementById('resultMessage');
        this.totalSpentDisplay = document.getElementById('totalSpent');
        this.totalWonDisplay = document.getElementById('totalWon');

        // Event listeners
        this.spinButton.addEventListener('click', () => this.spin());
        this.resetButton.addEventListener('click', () => this.reset());
        this.betAmountSelect.addEventListener('change', (e) => {
            this.currentBet = parseInt(e.target.value);
        });

        this.updateDisplay();
    }

    spin() {
        // Check if player can afford to spin
        if (this.tokens < this.currentBet) {
            this.showMessage('Insufficient tokens! You belong in a smaller AI startup.', 'loss');
            return;
        }

        if (this.isSpinning) return;

        // Deduct bet
        this.tokens -= this.currentBet;
        this.totalSpent += this.currentBet;
        this.updateDisplay();

        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.resultMessage.textContent = '';
        this.resultMessage.classList.remove('show', 'win', 'loss');

        // Get random final positions for each reel
        const finalPositions = [
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length),
            Math.floor(Math.random() * this.symbols.length)
        ];

        // Animate each reel
        const spinPromises = this.reels.map((reel, index) =>
            this.spinReel(reel, finalPositions[index])
        );

        Promise.all(spinPromises).then(() => {
            this.checkWin(finalPositions);
            this.isSpinning = false;
            this.spinButton.disabled = false;
        });
    }

    spinReel(reel, finalPosition) {
        return new Promise((resolve) => {
            const spinDuration = 1000 + Math.random() * 500; // 1-1.5 seconds
            const totalRotations = 8 + finalPosition; // At least 8 full rotations
            const itemHeight = 200;
            const finalOffset = -(totalRotations * itemHeight) - (finalPosition * itemHeight);

            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / spinDuration, 1);

                // Ease-out cubic for deceleration effect
                const easeProgress = 1 - Math.pow(1 - progress, 3);

                reel.style.transform = `translateY(${finalOffset * easeProgress}px)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    reel.style.transform = `translateY(${finalOffset}px)`;
                    resolve();
                }
            };

            animate();
        });
    }

    checkWin(positions) {
        const resultSymbols = positions.map(pos => this.symbols[pos]);
        const resultLabels = resultSymbols.map(s => s.label);

        // Check for different winning conditions
        let payout = 0;
        let message = '';

        // Check for all three matching
        if (resultLabels[0] === resultLabels[1] && resultLabels[1] === resultLabels[2]) {
            const symbol = resultSymbols[0];

            // Special case: 3 Hallucinations (player loses more)
            if (symbol.label.includes('Hallucination')) {
                payout = -this.currentBet;
                message = `🌀 THREE HALLUCINATIONS! You lost ${this.currentBet} more tokens to logical inconsistencies!`;
            }
            // Special case: 3 API Errors (refund)
            else if (symbol.label.includes('API Error')) {
                payout = this.currentBet;
                message = `🚨 THREE ERRORS! Refund granted. Your tokens escaped the inference loop!`;
            }
            // 3 Tokens = biggest payout
            else if (symbol.label.includes('Token')) {
                payout = this.currentBet * 10;
                message = `🎉 JACKPOT! 3 TOKENS! The algorithm decided you're worthy!`;
            }
            // 3 Model versions
            else if (symbol.label.includes('Model')) {
                payout = this.currentBet * 8;
                message = `📈 MODEL ALIGNMENT! Three versions in perfect harmony! +${payout} tokens!`;
            }
            // Any other triple match
            else {
                payout = this.currentBet * 2;
                message = `✨ THREE IN A ROW! The universe aligned! Take ${payout} tokens!`;
            }
        }
        // Two matching
        else if (resultLabels[0] === resultLabels[1] || resultLabels[1] === resultLabels[2] || resultLabels[0] === resultLabels[2]) {
            payout = this.currentBet * 0.5;
            message = `Two matches... the training data failed. +${Math.floor(payout)} tokens.`;
        }
        // No match
        else {
            payout = 0;
            message = `❌ No match. Your inference cost a lot more than you'll ever get back.`;
        }

        // Apply payout
        if (payout > 0) {
            this.tokens += payout;
            this.totalWon += payout;
            this.resultMessage.classList.add('win');
            this.showMessage(message, 'win');
        } else if (payout < 0) {
            this.tokens -= Math.abs(payout);
            this.totalWon += payout;
            this.resultMessage.classList.add('loss');
            this.showMessage(message, 'loss');
        } else {
            this.resultMessage.classList.add('loss');
            this.showMessage(message, 'loss');
        }

        // Game Over
        if (this.tokens <= 0) {
            this.tokens = 0;
            this.showMessage(
                `🏁 GAME OVER! You've been deprecated. Total tokens lost: ${this.totalSpent}`,
                'loss'
            );
            this.spinButton.disabled = true;
        }

        this.updateDisplay();
    }

    showMessage(text, type) {
        this.resultMessage.textContent = text;
        this.resultMessage.classList.add('show');
    }

    updateDisplay() {
        this.tokenCountDisplay.textContent = this.tokens;
        this.totalSpentDisplay.textContent = this.totalSpent;
        this.totalWonDisplay.textContent = this.totalWon;

        // Disable spin button if insufficient tokens
        if (this.tokens < this.currentBet) {
            this.spinButton.disabled = true;
        } else if (!this.isSpinning) {
            this.spinButton.disabled = false;
        }

        // Change token color based on status
        if (this.tokens > 100) {
            this.tokenCountDisplay.style.color = '#00ff00';
        } else if (this.tokens < 25) {
            this.tokenCountDisplay.style.color = '#ff6b6b';
        } else {
            this.tokenCountDisplay.style.color = 'inherit';
        }
    }

    reset() {
        const confirmed = confirm(
            'Reset the game? Your tokens will be refunded to the blockchain (JK, they\'re gone).'
        );

        if (confirmed) {
            this.tokens = 100;
            this.totalSpent = 0;
            this.totalWon = 0;
            this.currentBet = 10;
            this.isSpinning = false;
            this.spinButton.disabled = false;
            this.resultMessage.textContent = '';
            this.resultMessage.classList.remove('show', 'win', 'loss');
            this.betAmountSelect.value = '10';

            // Reset reels to starting position
            this.reels.forEach(reel => {
                reel.style.transform = 'translateY(0)';
            });

            this.updateDisplay();
            this.showMessage('🔄 Game reset! Fresh tokens. Fresh dreams. Fresh disappointment awaits.', 'loss');
        }
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new SlotMachine();
});
