# Inference Roulette - Design Metrics

## Core Economics
- **Starting Capital**: 100 Tokens ("Seed Round").
- **Cost Per Inference**: 10 Tokens.
- **House Edge**: ~18%. The math is rigged to simulate the burn rate of a typical AI startup.

## Probability Breakdown
- **Total Possible Outcomes**: 216 ($6 \times 6 \times 6$).
- **AGI Jackpot (🤖🤖🤖)**: 0.46% (1 in 216).
- **Any 3-of-a-Kind**: 2.7%.
- **Partial Alignment (2-of-a-Kind)**: 41.6%. 
- **Inference Failure (No Match)**: 55.6%.

## Satirical Design Assumptions
1. **Simulated Latency**: The `runInference` function introduces artificial delays (incremental reel stops) to mimic the "thinking" time of an LLM, even though the result is computed instantly.
2. **The "Pivot" Mechanic**: The reset button is labeled "Pivot," mocking the tendency of failed AI ventures to simply reset their branding after burning through capital.
3. **Negative Expected Value**: Just like real API usage, the player is mathematically guaranteed to run out of tokens over a long enough timeline, satirizing the high operational costs of AI inference.
4. **Terminology**: Using words like "Inference," "Alignment," and "Hallucination" frames typical slot machine wins/losses in tech-industry jargon.

## Symbol Legend
| Symbol | Meaning | Tone |
| :--- | :--- | :--- |
| 🤖 | AGI | The mythical jackpot that is always "just one model away." |
| 💰 | VC Seed | High payout; represents temporary liquidity. |
| 📈 | Hype | Medium payout; marketing success over technical merit. |
| 🎰 | Hallucination | The default failure state of the model. |
| 💸 | Inference Cost | Represents the inevitable drain of API credits. |
| 🔮 | Black Box | Represents the lack of explainability in results. |

## Technical Implementation
- **Vanilla Stack**: No libraries. Uses standard DOM API and CSS Transitions.
- **Animation**: Uses `cubic-bezier` for the reel "bounce" to give a professional mechanical feel.
