# AI Token Roulette - Design Metrics

## Economic Model
- **Initial Tokens:** 100
- **Spin Cost:** 5 Tokens
- **House Edge:** ~22%

The game is mathematically designed to mirror the venture capital burn rate. While users can win big, the average outcome results in token depletion, satirizing the high cost of running LLM inference compared to the actual value generated.

## Symbols & Meaning

| Symbol | Name | Satirical Meaning |
| :--- | :--- | :--- |
| 💸 | Inference Cost | Represents the inevitable drain of API credits. |
| 🎰 | Hallucination | The model is confident, but the output is pure gambling. |
| 📈 | Hype | Marketing claims of "Exponential Growth." |
| 🔮 | Black Box | No one knows how the model works, not even the devs. |
| 💰 | VC Funding | Temporary influx of cash before the next spin. |
| 🤖 | AGI | The "Jackpot" that is always just one more spin away. |

## Probability Analysis
- **3-of-a-kind (AGI):** 1 in 216 spins (The ultimate alignment).
- **3-of-a-kind (Any):** ~2.7% chance.
- **Any 2-of-a-kind:** ~41% chance (Partial alignment/Participation trophy).
- **Total Loss:** ~56% chance.

## Design Assumptions
1. **Simulated Latency:** The `spin()` function includes a deliberate 1.2s delay. This isn't for technical reasons; it's to simulate the "thinking" time of an LLM to make the player feel the "compute" happening.
2. **The "Pivot" Mechanic:** The reset button is labeled "Pivoting," mocking how startups restart when they burn through their initial token allotment.
3. **Negative Expected Value:** Just like real-world AI tokens, the more you use the service, the more likely you are to go bankrupt. 

## Technical Specs
- **Vanilla JS:** Uses `async/await` for animation timing and `classList` for state-based styling.
- **CSS Animations:** Uses CSS `keyframes` to handle reel blurring, keeping the main thread free for "heavy" logic calculations.
- **Responsive Design:** Flexbox-based layout ensures you can lose tokens on mobile or desktop equally effectively.
