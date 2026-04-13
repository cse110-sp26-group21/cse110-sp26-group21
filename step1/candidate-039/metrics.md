# TokenBurner AI - Game Metrics

## The Economic Allegory
TokenBurner AI is a satirical representation of the "AI Gold Rush." While users believe they are one prompt away from wealth, the system is statistically weighted to ensure token depletion, mirroring high operational inference costs and the "burn rate" of AI startups.

## Core Mechanics
- **Initial Capital:** 100 Tokens (Seed Funding).
- **Cost per Inference:** 5 Tokens.
- **Probability of Outcome:** Each symbol has a 1/6 (approx 16.6%) chance.

### Payout Structure
| Outcome | Multiplier | Satirical Context |
| :--- | :--- | :--- |
| **3x Robot (🤖)** | 20x (100 tokens) | AGI Achieved - The Mythical Jackpot. |
| **3x Other Match** | 10x (50 tokens) | Successful Exit - Luck disguised as skill. |
| **2x Any Match** | 2x (10 tokens) | Partial Alignment - Just enough to keep you paying. |
| **No Match** | 0x (0 tokens) | Model Collapse / Hallucination. |

## Statistical Assumptions
- **Expected Value (EV):** The game is designed with a negative expected value over long play sessions. This mimics real-world token billing where the utility often doesn't match the cost of experimentation.
- **Win Frequency:** 
    - 3x Match: ~2.7% chance.
    - 2x Match: ~41.6% chance.
    - No Match: ~55.7% chance.

## Design Motifs
1. **Simulated Latency:** The JavaScript `setTimeout` mimics the non-deterministic response times of cloud-hosted models.
2. **The "Console" Hook:** Status messages are pulled from a randomized array to simulate the vague, over-confident, and often unhelpful error messages produced by modern AI APIs.
3. **Symbolism:** 
    - 🤖: The promise of AGI.
    - 💸: The reality of the cloud bill.
    - 🎰: The gambling nature of prompt engineering.
    - 📈: Overhyped marketing/metrics.
    - 🔮: Black-box predictions.
    - 💰: Venture Capital burn.

## Technical Implementation
- **Vanilla Stack:** No external dependencies. Uses CSS animations for the "spinning" effect and modern ES6 `async/await` for timing logic.
