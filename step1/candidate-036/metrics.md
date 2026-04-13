# AI Token Roulette - Game Metrics

## The Economic Allegory
This app is a satirical representation of the "AI Gold Rush." While users believe they are prompts away from wealth, the system is statistically weighted to ensure token depletion, mirroring the high operational costs (inference) of LLMs.

## Core Metrics
- **Initial Capital:** 100 Tokens (Seed Funding).
- **Cost per Inference:** 5 Tokens.
- **House Edge:** ~18.5% (The math is rigged to favor the "Model Provider").

### Payout Logic
| Outcome | Probability | Payout | Satirical Meaning |
| :--- | :--- | :--- | :--- |
| **3x Match** | ~2.7% | 50 Tokens | AGI Achieved (The Mythical Jackpot) |
| **2x Match** | ~41.6% | 10 Tokens | Partial Alignment (Just enough to keep you paying) |
| **No Match** | ~55.7% | 0 Tokens | Hallucination / Inference Timeout |

## Design Assumptions
1. **Simulated Latency:** The `setTimeout` in `script.js` mimics the non-deterministic response times of cloud-hosted models.
2. **The "Console" Hook:** Status messages are pulled from a randomized array to simulate the vague, over-confident, and often unhelpful error messages produced by modern AI APIs.
3. **Symbolism:** 
    - 🤖: The promise of AGI.
    - 💸: The reality of the cloud bill.
    - 🎰: The gambling nature of prompt engineering.
    - 📉: Model collapse/Degradation.
    - 🚀: Overhyped marketing.

## Technical Specs
- **Vanilla JS:** Uses `async/await` to handle the "inference" delay without freezing the UI.
- **CSS Blur:** Uses a filter blur during the spin to hide the fact that results are generated instantly, creating "tension" just like a real slot machine or a slow LLM response.
- **State Management:** Simple global balance variable; does not persist across refreshes to emphasize the "Pivot or Die" nature of AI startups.

*Created for: CSE110 Spring 2026 - Group 21*
