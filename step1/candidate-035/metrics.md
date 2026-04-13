# Inference Roulette - Design & Metrics

## The Economic Allegory
This app is a satirical representation of the "AI Gold Rush." The mechanics are designed to ensure that while the user might experience occasional wins (hallucinations of success), the system is optimized for token depletion.

## Core Metrics
- **Initial Capital:** 100 Tokens (Seed Funding)
- **Cost per Inference:** 5 Tokens
- **House Edge:** ~16.6% (Statistically favored to deplete the seed round).

### Probability Table
| Outcome | Probability | Payout | Satirical Meaning |
| :--- | :--- | :--- | :--- |
| **3x Robot** | ~0.46% | 200 | AGI Achieved (The Mythical Jackpot) |
| **3x Any Other** | ~2.31% | 50 | Model Convergence (Lucky Guess) |
| **2x Any** | ~34.7% | 10 | Partial Alignment (Participation Trophy) |
| **No Match** | ~62.5% | 0 | Hallucination / Inference Timeout |

## Design Assumptions
1. **Simulated Latency:** The JavaScript includes a randomized `setTimeout`. This mimics the non-deterministic response times of cloud-hosted LLMs.
2. **The "Pivot" Mechanic:** The reset button is labeled "Pivot," mocking the tech startup lifecycle of burning through funds and restarting with a fresh deck of slides.
3. **Symbolism:** 
    - 💸: The hidden costs of tokens.
    - 🎰: The gambling nature of prompt engineering.
    - 📈: Marketing charts that only go up.
    - 🤖: The promise of AGI.

## Technical Specs
- **Vanilla JS:** Uses `async/await` for state transitions and non-blocking latency.
- **CSS Grid/Flex:** Ensures the UI remains stable across different viewport sizes.
- **GPU Accel:** CSS animations use transforms to prevent UI jank during "inference."
