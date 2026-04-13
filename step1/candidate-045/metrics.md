# AI Token Roulette - Metrics & Design

## Core Mechanics
- **Initial Budget**: 100 Tokens.
- **Spin Cost**: 10 Tokens.
- **Jackpots (3-match)**: Variable payouts (5 to 250 tokens).
- **Consolation (2-match)**: 15 tokens (a net gain of 5).

## Probability Analysis
With 6 symbols per reel:
- **Total Combinations**: 6³ = 216.
- **3-Match Probability**: 6 / 216 ≈ **2.7%**.
- **2-Match Probability**: (6 * 1 * 5 * 3) / 216 ≈ **41.6%**.
- **Loss Probability**: ≈ **55.7%**.

## Design Assumptions
1. **The "Inference Delay"**: The 1.5-second spin duration is an intentional design choice to mimic LLM latency. It builds tension while satirizing the time spent waiting for model outputs.
2. **Negative Expected Value**: Like many real-world AI subscription models, the house (the model provider) always wins in the long run. The payouts are mathematically weighted so the player eventually hits zero tokens.
3. **Hallucination Rate Stat**: This is a satirical metric calculated as the percentage of spins that aren't "Perfect Wins." It mocks how AI companies use opaque percentages to describe model reliability.

## Symbolism
| Symbol | Meaning | Satirical Context |
|---|---|---|
| 💸 | Inference Cost | Getting a jackpot of "Costs" pays out the least—because even when you win, you lose. |
| 🎰 | Hallucination | Represents the "randomness" we mistake for intelligence. |
| 📈 | Overhyped Model | Reference to misleading benchmarks. |
| 🤖 | AGI | The ultimate promise that is statistically unlikely to appear. |
| 💰 | Profit | The rarest symbol in the ecosystem. |

## Technical Rationale
- **Vanilla Stack**: Zero dependencies ensure the "burn rate" of the app itself is low (no npm bloat).
- **CSS Animations**: Uses `filter: blur` during spins to hide the fact that symbols are immediately selected, mimicking the way some models "confidentially" hide their lack of reasoning.

---
*Disclaimer: These tokens have no real-world value, much like the word count of a prompt-injected LLM response.*
