# AI Token Roulette - Design Metrics

## Economics & Probability
- **Starting Capital**: 100 tokens (The "Seed Round").
- **Inference Cost**: 5 tokens per spin.
- **Jackpot Probability**: (1/5)^3 = 0.8% (125:1 odds).
- **Partial Alignment (2-match)**: ~30% probability.
- **House Edge**: Calculated to be a slight negative expected value (~ -3.2 tokens/spin), mirroring real-world API token burn where the house (infrastructure) always wins.

## Satirical Symbol Logic
| Symbol | Meaning | Satirical Context |
|--------|---------|-------------------|
| 💸 | Inference Cost | Represents the hidden, complex billing of cloud GPUs. |
| 🎰 | Hallucination | The model is confidently wrong, which is the "Jackpot" of AI failure. |
| 📈 | Overhyped Model | A modest win representing a model that actually lived up to the PR. |
| 🔮 | Prompt Injection | Hacking the system for tokens. |
| 💰 | Free Trial | The rarest occurrence in the AI world: pure profit. |

## UI/UX Assumptions
1. **Simulated Latency**: The random delay in `script.js` (1s to 2s) is intentional. It builds tension while mocking the inference time of large language models.
2. **Persistence**: `localStorage` is used so that players feel the "sunk cost" of their tokens even after closing the tab.
3. **Terminal Aesthetic**: The dark theme and monospace fonts target the developer persona who interacts with these billing systems daily.

## Technical Implementation
- **Vanilla JS**: No frameworks. State is managed via a simple object and updated via DOM selectors.
- **CSS Animations**: Uses `filter: blur` and `translateY` to simulate high-speed spinning without complex sprite sheets.
- **Responsive**: Flexbox layout ensures the "Terminal" works on mobile devices.
