// ========================================
// AI Token Slot Machine - Game Logic
// ========================================

class SlotMachine {
    constructor() {
        this.symbols = [
            'GPT-5',
            'Hallucination',
            'Inference Cost',
            'Overhyped™',
            'Context Window',
            'Watermark',
            '⚠️ Error',
            'Token Limit'
        ];

        this.payouts = {
            'GPT-5': { multiplier: 50, message: '🎉 Triple GPT-5! The product that FINALLY ships next quarter!' },
            'Hallucination': { multiplier: 25, message: '✨ Three Hallucinations! (Did we really say that?)' },
            'Inference Cost': { multiplier: 15, message: '💰 Triple Inference Costs! Your wallet is screaming!' },
            'Overhyped™': { multiplier: 30, message: '📈 Three Overhyped™ Models! Market cap going UP!' },
            'Context Window': { multiplier: 20, message: '📚 Triple Context Windows! Remember it ALL!' },
            'Watermark': { multiplier: 7.5, message: '🏷️ Triple Watermarks! (Barely a win)' },
        };

        this.tokenBalance = 1000;
        this.currentBet = 10;
        this.sessionWins = 0;
        this.totalSpent = 0;
        this.spinning = false;

        this.initializeUI();
        this.attachEventListeners();
    }

    initializeUI() {
        this.tokenDisplay = document.getElementById('tokenDisplay');
        this.winsDisplay = document.getElementById('winsDisplay');
        this.spentDisplay = document.getElementById('spentDisplay');
        this.spinButton = document.getElementById('spinButton');
        this.resetButton = document.getElementById('resetButton');
        this.messageBox = document.getElementById('messageBox');
        this.payoutBox = document.getElementById('payoutBox');
        this.betSelector = document.getElementById('betAmount');
        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];

        this.updateDisplay();
    }

    attachEventListeners() {
        this.spinButton.addEventListener('click', () => this.handleSpin());
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.betSelector.addEventListener('change', (e) => {
            this.currentBet = parseInt(e.target.value);
        });
    }

    handleSpin() {
        if (this.spinning) return;
        if (this.tokenBalance < this.currentBet) {
            this.showMessage('Insufficient tokens! Reduce your bet or reset the game.', 'error');
            return;
        }

        this.spinning = true;
        this.spinButton.disabled = true;

        // Deduct bet
        this.tokenBalance -= this.currentBet;
        this.totalSpent += this.currentBet;

        // Spin reels with staggered timing
        this.spinReels().then(() => {
            this.evaluateResult();
            this.spinning = false;
            this.spinButton.disabled = false;
        });

        this.clearMessages();
    }

    spinReels() {
        return Promise.all([
            this.spinReel(this.reels[0], 0.6),
            this.spinReel(this.reels[1], 0.8),
            this.spinReel(this.reels[2], 1.0)
        ]);
    }

    spinReel(reel, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                reel.classList.add('spinning');
                
                // Random spin duration between 0.8s and 1.2s
                const spinDuration = 0.8 + Math.random() * 0.4;
                
                setTimeout(() => {
                    reel.classList.remove('spinning');
                    resolve();
                }, spinDuration * 1000);
            }, delay * 1000);
        });
    }

    getWinningSymbol() {
        // Weighted randomness: higher chance of getting some symbols
        const weights = {
            'GPT-5': 2,
            'Hallucination': 8,
            'Inference Cost': 10,
            'Overhyped™': 4,
            'Context Window': 6,
            'Watermark': 12,
            '⚠️ Error': 8,
            'Token Limit': 8
        };

        let totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;

        for (const [symbol, weight] of Object.entries(weights)) {
            random -= weight;
            if (random <= 0) return symbol;
        }
        return 'Watermark';
    }

    displayResult(results) {
        const display = (reel, symbol, index) => {
            const position = this.symbols.indexOf(symbol);
            reel.style.transform = `translateY(-${position * 50}px)`;
            reel.innerHTML = '';
            // Create visible symbols (3 before and 3 after the winning symbol)
            for (let i = -3; i <= 3; i++) {
                const idx = (position + i + this.symbols.length) % this.symbols.length;
                const div = document.createElement('div');
                div.className = 'symbol';
                div.textContent = this.symbols[idx];
                if (i === 0) div.style.fontWeight = '900';
                reel.appendChild(div);
            }
        };

        results.forEach((symbol, index) => {
            display(this.reels[index], symbol, index);
        });
    }

    evaluateResult() {
        const results = [this.getWinningSymbol(), this.getWinningSymbol(), this.getWinningSymbol()];
        this.displayResult(results);

        const [symbol1, symbol2, symbol3] = results;

        // Check for losing symbols
        if (symbol1.includes('Error') || symbol1.includes('Token Limit') ||
            symbol2.includes('Error') || symbol2.includes('Token Limit') ||
            symbol3.includes('Error') || symbol3.includes('Token Limit')) {
            this.handleLoss(results);
            return;
        }

        // Check for three of a kind
        if (symbol1 === symbol2 && symbol2 === symbol3) {
            this.handleWin(symbol1);
            return;
        }

        // Check for any match (participation trophy)
        if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
            this.handleMixedWin(results);
            return;
        }

        // No match
        this.handleNoMatch(results);
        this.updateDisplay();
    }

    handleWin(symbol) {
        const payout = this.payouts[symbol];
        if (!payout) {
            console.error('Unknown symbol:', symbol);
            return;
        }

        const winAmount = this.currentBet * payout.multiplier;
        this.tokenBalance += winAmount;
        this.sessionWins++;

        this.showMessage(payout.message, 'win');
        this.showPayout(`+${winAmount} tokens!`, 'win');
        this.updateDisplay();
    }

    handleMixedWin(results) {
        const winAmount = this.currentBet * 5; // Participation trophy
        this.tokenBalance += winAmount;

        const emoji = this.getRandomEmoji();
        this.showMessage(`${emoji} You got... something! (Two of a kind = ${winAmount} tokens)`, 'info');
        this.showPayout(`+${winAmount} tokens`, 'win');
        this.updateDisplay();
    }

    handleNoMatch(results) {
        this.showMessage('❌ No match! Better luck with the next inference run!', 'info');
        this.showPayout('-' + this.currentBet + ' tokens', 'lose');
        this.updateDisplay();
    }

    handleLoss(results) {
        const errorSymbol = results.find(s => s.includes('Error') || s.includes('Token Limit'));
        const lossMessage = errorSymbol.includes('Error') 
            ? '💥 RUNTIME ERROR! Your computation budget is exhausted!' 
            : '⏹️ TOKEN LIMIT EXCEEDED! Model stopped mid-response!';

        this.showMessage(lossMessage, 'error');
        this.showPayout(`-${this.currentBet * 2} token penalty for unexpected behavior`, 'lose');
        this.tokenBalance -= this.currentBet * 2;
        this.updateDisplay();
    }

    showMessage(message, type = 'info') {
        this.messageBox.className = 'message-box ' + type;
        this.messageBox.textContent = message;
    }

    showPayout(message, type = 'info') {
        this.payoutBox.className = 'payout-box ' + type;
        this.payoutBox.textContent = message;
    }

    clearMessages() {
        this.messageBox.className = 'message-box hidden';
        this.payoutBox.className = 'payout-box hidden';
    }

    updateDisplay() {
        this.tokenDisplay.textContent = this.tokenBalance;
        this.winsDisplay.textContent = this.sessionWins;
        this.spentDisplay.textContent = this.totalSpent;

        if (this.tokenBalance <= 0) {
            this.spinButton.disabled = true;
            this.showMessage('🎰 GAME OVER! You ran out of tokens. Reset to play again.', 'error');
        } else if (this.tokenBalance < this.currentBet) {
            this.spinButton.disabled = true;
            this.showMessage('⚠️ Not enough tokens for this bet. Choose a lower bet or reset.', 'info');
        } else {
            this.spinButton.disabled = false;
        }
    }

    resetGame() {
        this.tokenBalance = 1000;
        this.sessionWins = 0;
        this.totalSpent = 0;
        this.currentBet = 10;
        this.spinning = false;
        this.spinButton.disabled = false;
        this.betSelector.value = '10';
        this.clearMessages();
        this.resetReels();
        this.updateDisplay();
    }

    resetReels() {
        this.reels.forEach(reel => {
            reel.style.transform = 'translateY(0)';
            reel.innerHTML = '';
            this.symbols.forEach(symbol => {
                const div = document.createElement('div');
                div.className = 'symbol';
                div.textContent = symbol;
                reel.appendChild(div);
            });
        });
    }

    getRandomEmoji() {
        const emojis = ['🎊', '✨', '🌟', '💫', '⭐', '🎉'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SlotMachine();
});
