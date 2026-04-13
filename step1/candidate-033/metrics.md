# Inference Roulette - Game Metrics & Design

## Economic Model
- **Initial Capital:** 100 Tokens
- **Inference Cost:** 5 Tokens
- **House Edge:** ~18% (Algorithmically optimized for the provider)

The game is designed to mirror the venture capital burn rate typical of modern AI startups. While the "Jackpot" exists, the statistical reality is a steady depletion of tokens, satirizing the high cost of running LLM inference compared to the actual utility generated.

## Symbol Satire
| Symbol | Meaning |
| :--- | :--- |
| 💸 | Inference Cost: The inevitable drain of API credits. |
| 🎰 | Hallucination: Confidence in incorrect outputs as a gameplay feature. |
| 📈 | Hype Cycle: Marketing claims of exponential growth. |
| 🤖 | AGI: The mythical jackpot that is always "just one more spin" away. |
| 🔮 | Black Box: The lack of transparency in proprietary models. |
| 💰 | VC Seed: Temporary liquidity before the inevitable burn continues. |

## Design Assumptions
1. **Simulated Latency:** The `runInference()` function includes a randomized delay. This isn't a bug; it's to simulate the "thinking" time of a large language model.
2. **The "Pivot" Mechanic:** The reset button is labeled "Pivot," mocking the tech startup lifecycle of burning through funds and restarting with a fresh deck of slides.
3. **Negative Expected Value:** Just like real-world AI tokens, the more you use the service, the more the infrastructure provider wins.

## Technical Specs
- **Vanilla JS:** Uses `async/await` for timing and state management.
- **CSS Animations:** Keyframe-based blur effect to simulate "compute cycles."
- **Responsive:** Scales to terminal-sized windows or mobile dashboards.
