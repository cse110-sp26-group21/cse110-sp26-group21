# AI Token Roulette - Game Metrics & Design

## Core Economics
- **Initial Tokens:** 100
- **Cost Per Inference:** 10 Tokens
- **House Edge:** ~25% (Mimics the unfavorable cost-to-value ratio of overhyped AI products).

## Symbol Payouts
| Combo | Payout | Satirical Meaning |
|-------|--------|-------------------|
| 🤖🤖🤖 | 150 | AGI Achieved: The perfect alignment. |
| Any 3 Match | 75 | Model Convergence: A lucky guess. |
| Any 2 Match | 15 | Partial Alignment: Hallucinating success. |
| ⚠️ (Any) | 0 | Hallucination: Confidence without accuracy. |

## Design Assumptions
1. **The Latency Joke:** The `spin()` function includes a random delay (1.2s to 2.2s) to simulate the "thinking" time of LLMs, even though the result is calculated instantly.
2. **Negative Expected Value:** Just like real API tokens, the math is weighted so the player eventually runs out of credits, reflecting the "burn rate" of AI startups.
3. **Terminology:** Use of words like "weights," "inference," "alignment," and "seed funding" anchors the theme in Silicon Valley culture.

## Probability Analysis
- **3-of-a-kind:** 1 in 36 spins (per specific symbol)
- **Any 3-of-a-kind:** ~2.7% chance
- **Any 2-of-a-kind:** ~41.6% chance
- **Total Loss (No Match):** ~55.5% chance

*Note: All values are for entertainment. This model does not actually use neural networks; it uses Math.random(), which is arguably more honest about its stochastic nature.*
