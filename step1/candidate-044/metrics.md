# AI Token Roulette - Metrics & Design

## Concept
A satirical slot machine parodying the high-cost, high-variance world of AI startups and token-based billing.

## Core Mechanics
- **Starting Balance**: 100 tokens.
- **Spin Cost**: 10 tokens (Inference Cost).
- **Symbols (6)**: 
  - 🤖 (Model), 💸 (Cost), 🎰 (Hallucination), 📈 (Hype), 🔮 (Injection), 💰 (Funding).

## Payout Structure
| Match Type | Payout | Description |
| :--- | :--- | :--- |
| **3 of a Kind** | +100 Tokens | "Full Alignment" - rare success. |
| **2 of a Kind** | +15 Tokens | "Partial Convergence" - small return. |
| **No Match** | 0 Tokens | "Model Collapse" - loss of inference cost. |

## Probability Analysis
With 6 symbols and 3 reels:
- **Total Combinations**: 6^3 = 216
- **3-of-a-kind Probability**: 6 / 216 ≈ **2.78%**
- **2-of-a-kind Probability**: (6 symbols) * (3 positions for odd symbol) * (5 possible odd symbols) = 90. 90 / 216 ≈ **41.67%**
- **No Match Probability**: 6 * 5 * 4 = 120. 120 / 216 ≈ **55.55%**

### Expected Value (EV) per Spin
`EV = (Prob(3) * 100) + (Prob(2) * 15) + (Prob(0) * 0) - Cost`
`EV = (0.0278 * 100) + (0.4167 * 15) - 10 = -0.97`

The house (the AI infrastructure provider) has a **9.7% edge**, ensuring players eventually go bankrupt—mimicking the "burn rate" of AI startups.

## Design Assumptions
1. **Mock Latency**: The 1.2s spin delay simulates the "thinking" time of LLMs to build tension.
2. **The Terminal**: Monospace logs reinforce the developer-centric nature of modern AI tools.
3. **Bankruptcy Tone**: Reaching 0 tokens suggests a "Pivot to Web4," mocking tech industry trend-hopping.
