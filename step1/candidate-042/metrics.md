# AI Token Roulette - Design Metrics

## Core Mechanics
- **Initial Tokens**: 100
- **Spin Cost**: 5 tokens
- **Probability of 3-match**: 0.8% (1/125) per specific symbol, 4% total for any 3-match.
- **Probability of 2-match**: ~30% (Any two identical symbols).
- **Expected Value**: Designed to be slightly negative over long play sessions (-3.2 tokens per spin), mimicking the "burn rate" of AI startups.

## Symbols & Satirical Meaning
| Symbol | Name | Satirical Context |
|--------|------|-------------------|
| 💸 | Inference Cost | Represents the "hidden" fees in every API call. |
| 🎰 | Hallucination | The tendency for models to confidently output nonsense. |
| 📈 | Overhype | Reference to benchmarks that don't match real-world utility. |
| 🔮 | Prompt Injection | The security vulnerability of getting models to do what they shouldn't. |
| 💰 | Venture Capital | The rare moment where the system provides a return on investment. |

## Design Assumptions
1. **The Latency Trap**: The 1.2s delay in `script.js` is intentional. It mimics the "thinking" time of LLMs to build tension while reinforcing the theme of slow, expensive inference.
2. **Tone**: The "Terminal" output uses second-person perspective to make the player feel like they are interacting with a slightly condescending, profit-driven system.
3. **Economy**: 100 starting tokens allows for 20 failed spins. However, the high probability of 2-match wins (10 tokens) keeps the player in the "engagement loop" longer, even as their total balance trends toward zero.

## Technical Rationale
- **Vanilla JS**: Zero dependencies for maximum performance and portability.
- **CSS Animations**: Used `keyframes` with `filter: blur` to simulate movement without the complexity of sprite-sheets.
- **Persistence**: `localStorage` ensures that the player's "token debt" or "wealth" persists, creating a sense of a continuous session.

---
*Developed for the "Inference Era" | Version 1.0.0*
