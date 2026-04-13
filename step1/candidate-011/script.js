// AI Token Slot Machine - Game Logic

class SlotMachine {
    constructor() {
        this.balance = 1000;
        this.spinCost = 50;
        this.jackpot = 1000;
        this.matchTwo = 250;
        this.matchOne = 100;
        this.isSpinning = false;
        this.lastWin = 0;

        this.balanceDisplay = document.getElementById('balance');
        this.spinButton = document.getElementById('spinButton');
        this.resultDisplay = document.getElementById('resultDisplay');
        this.lastWinDisplay = document.getElementById('lastWinText');
        this.wisdomDisplay = document.getElementById('wisdomText');

        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];

        this.aiWisdom = [
            "💭 Have you tried turning it off and on again?",
            "🤖 The future is now. It's also distributed computing.",
            "💰 We're disrupting the token economy! (Yours specifically)",
            "📈 Up and to the right! (Mostly our profits)",
            "🔮 Our AI predicted you'd lose. The AI was right.",
            "⚡ This model was trained on the entire internet. We're not sure what it learned.",
            "🚀 We went from startup to unicorn. You went from 1000 to 950 tokens.",
            "💬 Our AI is so smart, it once told a user to go put a coin in a floppy disk... it was a MacBook.",
            "🎯 Accuracy: 95%! (At generating creative excuses for outages)",
            "🌟 We're solving AI alignment! (Our alignment: your money → our servers)",
            "❌ Error 404 Your Winnings Not Found",
            "🎲 Completely random! Definitely not weighted. Probably.",
            "📊 Our analytics show you're probably going to keep spinning...",
            "💭 Have you considered using a different AI token slot machine?",
            "🔥 Our new transformer model burns through tokens at an unprecedented rate!",
            "🎪 Step right up! AI slot machines! We promise we're not just fancy number generators!",
            "🌈 100% ethically sourced tokens... just kidding, we made these up yesterday",
            "💎 This is not a casino. This is an 'AI investment opportunity'.",
            "🎭 The house always wins. We ARE the house.",
            "🌪️ A wild crypto bro is investing! He's creating a DAO!"
        ];

        this.symbols = ['🤖', '💬', '💰', '🚀', '📈', '🔮', '⚡', '🎯'];

        this.setupEventListeners();
        this.displayWisdom();
    }

    setupEventListeners() {
        this.spinButton.addEventListener('click', () => this.spin());
    }

    updateDisplay() {
        this.balanceDisplay.textContent = this.balance;
    }

    displayWisdom() {
        const randomWisdom = this.aiWisdom[Math.floor(Math.random() * this.aiWisdom.length)];
        this.wisdomDisplay.textContent = randomWisdom;
    }

    spin() {
        if (this.isSpinning) return;
        if (this.balance < this.spinCost) {
            this.resultDisplay.textContent = '💸 Insufficient tokens! Time to sell more personal data!';
            this.resultDisplay.classList.add('loss');
            this.resultDisplay.classList.remove('win');
            return;
        }

        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.balance -= this.spinCost;
        this.updateDisplay();

        // Spin animation duration in milliseconds
        const spinDuration = 500 + Math.random() * 500;
        const spinCount = Math.floor(spinDuration / 100);

        // Animate reels
        this.reels.forEach((reel, index) => {
            this.animateReel(reel, spinCount);
        });

        // Determine results
        setTimeout(() => {
            this.determineResults();
            this.isSpinning = false;
            this.spinButton.disabled = false;
            this.displayWisdom();
        }, spinDuration + 300);
    }

    animateReel(reel, spins) {
        const symbols = reel.querySelectorAll('.symbol');
        let currentPosition = 0;
        let spinsLeft = spins;

        const animate = () => {
            if (spinsLeft > 0) {
                currentPosition = (currentPosition + 1) % symbols.length;
                const offset = currentPosition * -60;
                reel.style.transform = `translateY(${offset}px)`;
                reel.classList.remove('spinning');
                void reel.offsetWidth; // Trigger reflow
                reel.classList.add('spinning');
                spinsLeft--;
                setTimeout(animate, 50);
            }
        };

        animate();
    }

    determineResults() {
        // Get the middle symbol (payline) from each reel
        const results = this.reels.map(reel => {
            const symbols = reel.querySelectorAll('.symbol');
            // The middle symbol is at position 1 (out of 0, 1, 2 in view)
            return symbols[1].textContent;
        });

        const [sym1, sym2, sym3] = results;

        let winAmount = 0;
        let resultMessage = '';

        // Check for wins
        if (sym1 === sym2 && sym2 === sym3) {
            // Three of a kind - JACKPOT
            winAmount = this.jackpot;
            resultMessage = `🎉 JACKPOT! ${sym1} ${sym1} ${sym1}! You won ${winAmount} tokens!`;
            this.resultDisplay.classList.add('win');
        } else if (sym1 === sym2 || sym2 === sym3 || sym1 === sym3) {
            // Two of a kind
            winAmount = this.matchTwo;
            resultMessage = `🎊 Two matches! You won ${winAmount} tokens!`;
            this.resultDisplay.classList.add('win');
        } else if (Math.random() < 0.15) {
            // Random bonus win (15% chance for one match compensation)
            winAmount = this.matchOne;
            resultMessage = `✨ Lucky break! One of your symbols paid out. You won ${winAmount} tokens!`;
            this.resultDisplay.classList.add('win');
        } else {
            // No win
            resultMessage = `😬 ${sym1} ${sym2} ${sym3} — Better luck next time! (Spoiler: there won't be)`;
            this.resultDisplay.classList.remove('win');
            this.resultDisplay.classList.add('loss');
        }

        this.balance += winAmount;
        this.lastWin = winAmount;
        this.updateDisplay();

        // Update displays
        this.resultDisplay.textContent = resultMessage;
        this.resultDisplay.classList.remove('loss');
        if (winAmount > 0) {
            this.lastWinDisplay.textContent = `🏆 Last win: +${winAmount} tokens`;
        } else {
            this.lastWinDisplay.textContent = `💔 Last spin: -${this.spinCost} tokens`;
        }

        // Check for game over
        if (this.balance < this.spinCost) {
            setTimeout(() => {
                this.gameOver();
            }, 1500);
        }
    }

    gameOver() {
        this.spinButton.disabled = true;
        this.resultDisplay.classList.remove('win', 'loss');
        this.resultDisplay.textContent = '🎰 GAME OVER! You\'ve successfully invested all your tokens. Here\'s a tax document for your trouble.';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const slotMachine = new SlotMachine();
    slotMachine.updateDisplay();
});
