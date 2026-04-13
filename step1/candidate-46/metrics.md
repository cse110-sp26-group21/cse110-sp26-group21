# AI Token Roulette: Metrics & Design

## Core Mechanics
- **Initial Tokens**: 100
- **Spin Cost**: 10 tokens
- **Reels**: 3 independent reels using weighted randomization.

## Symbol Distribution (Weighted)
1. **Neural Soup (🧠)**: Weight 6 - Common "trash" symbol.
2. **Inference Cost (💸)**: Weight 5 - Represents hidden fees; 3-of-a-kind actually *subtracts* tokens.
3. **Hallucination (🎰)**: Weight 4 - High confidence, zero payout.
4. **Hype (📈)**: Weight 3 - Standard high-tier symbol.
5. **AGI (🤖)**: Weight 1 - The elusive jackpot.

## Expected Value (EV)
The game is designed with a negative expected value to simulate the "burn rate" of AI startups.
- **3-Match Probability**: ~0.8% - 2% (depending on weights).
- **2-Match Probability**: ~15% - 20%.
- **House Edge**: Approximately 12-15% per spin, ensuring the player eventually reaches bankruptcy without the "AGI" jackpot.

## Design Assumptions
- **Latency Simulation**: The 1.2s delay in `script.js` is intentional to mimic API inference latency and build tension.
- **Satirical Tone**: The "Log" uses developer jargon (parameter tuning, model collapse, alignment) to contextualize standard slot machine outcomes.
- **Bankruptcy Path**: By making the "Inference Cost" 3-match a negative payout, the game subverts the expectation that three matching symbols are always good.

## UI/UX
- **Terminal Aesthetic**: Uses monospace fonts and dark background to appeal to the "coder" persona.
- **Mobile Responsive**: Flexbox-based layout ensures it works on small screens where AI "hype" is often consumed.

*Version: 4.0-beta (Internal Use Only)*
