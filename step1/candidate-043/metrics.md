# AI Token Roulette - Metrics & Design

## Core Concept
A satirical slot machine that mocks the "burn rate" of AI tokens. Every spin is framed as a "model inference," and the outcomes reflect common industry tropes.

## Game Mechanics
*   **Starting Tokens:** 100
*   **Cost per Spin:** 10 Tokens (Inference Cost)
*   **Symbols:** 6 (💸 Inference, 🎰 Hallucination, 📈 Hype, 🔮 Injection, 💰 Free Trial, 🤖 AGI)

## Payout Structure
| Outcome | Reward | Prob. | Satirical Context |
| :--- | :--- | :--- | :--- |
| 3 Matching | +100 Tokens | ~0.46% | "The Model actually works!" |
| 3 💰 (Money) | +250 Tokens | ~0.46% | "Series A Funding secured." |
| 2 Matching | +15 Tokens | ~41.6% | "Partial alignment / Participation trophy." |
| No Match | 0 Tokens | ~57.4% | "Hallucination / Token drain." |

## Probability Math
With 6 symbols and 3 reels:
*   Total combinations: 6^3 = 216
*   Ways to get 3-of-a-kind: 6 (1/36 or ~2.7% total, but split by symbol)
*   Ways to get 2-of-a-kind: (6 * 5 * 3) = 90 (90/216 or ~41.6%)
*   Ways to get no match: 6 * 5 * 4 = 120 (120/216 or ~55.5%)

## Expected Value (EV)
*   **EV per spin:** `(6/216 * 100) + (90/216 * 15) + (120/216 * 0) - 10`
*   `2.77 + 6.25 + 0 - 10 = -0.98`
*   The house (The AI Company) has a **9.8% edge**. This ensures that, much like real AI startups, you will eventually run out of tokens.

## Design Assumptions
1.  **Latency Mockery:** The `setTimeout` in the spin logic mimics the "thinking time" of LLMs, building tension while making fun of inference latency.
2.  **The Terminal:** Logs are presented in a monospace terminal font to appeal to the "developer" aesthetic prevalent in AI tools.
3.  **Bankruptcy:** Once tokens hit zero, the player is told they are a "True Startup Founder," implying that spending all your money on tokens is the final stage of the AI hype cycle.

## Technical Implementation
*   **Vanilla JS:** No frameworks to ensure zero "overhead" (mocking bloated AI wrappers).
*   **CSS Animations:** Uses a simple blur filter to simulate high-speed reel spinning without heavy assets.
*   **Responsive:** Works on mobile and desktop, because "AI is everywhere."

*Created for CSE110 - Team 21*
