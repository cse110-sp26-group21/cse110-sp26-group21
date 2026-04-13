# AI Token Roulette - Design Metrics & Assumptions

## Core Mechanics
- **Initial Tokens**: 100
- **Spin Cost**: 5 tokens
- **Probability of 3-match**: 0.8% (1/125) per symbol, 4% total for any 3-match.
- **Probability of 2-match**: ~48% (Any two identical symbols).
- **Expected Value**: Designed to be slightly negative over long play sessions, mimicking the "burn rate" of AI startups.

## Symbols & Satirical Meaning
| Symbol | Meaning | Satirical Context |
|--------|---------|-------------------|
| 💸 | Inference Cost | Represents the "hidden" fees in every API call. |
| 🎰 | Hallucination | The tendency for models to confidently output nonsense. |
| 📈 | Overhyped Model | Reference to "benchmarks" that don't match real-world utility. |
| 🔮 | Prompt Injection | The security vulnerability of getting models to do what they shouldn't. |
| 💰 | Free Trial | The rare moment where the AI actually provides a return on investment. |

## Design Assumptions
1. **The "Wait" Period**: The `setTimeout` in the spin logic is intentional. It mimics the "thinking" time (latency) of LLMs to build tension and reinforce the theme.
2. **Tone**: The "Terminal" output uses second-person perspective to make the player feel like they are interacting with a slightly condescending AI system.
3. **Economy**: 100 starting tokens allows for 20 failed spins. However, the high probability of 2-match wins (10 tokens) keeps the player in the "engagement loop" longer, even as their total balance slowly trends toward zero.

## Technical Rationale
- **Vanilla JS**: No frameworks were used to ensure maximum performance and zero dependency overhead.
- **CSS Animations**: Used `keyframes` with `filter: blur` to simulate movement without the complexity of an actual sprite-sheet or high-frequency DOM manipulation.
- **Responsiveness**: The app uses a centered flex-box container to ensure it works equally well on mobile devices (where many users engage with "hype" tech) and desktops.

## Implementation Notes
- **State Management**: Handled via simple global variables. Persistence could be added via `localStorage`, but for a satirical "startup" simulation, losing everything on a page refresh adds to the "transient nature of AI hype."
- **Accessibility**: High contrast colors (neon on black) ensure readability, though the blinking "spinning" animation should be noted for photosensitive users.

---
*Developed for: CSE110 - Team 21*
*Version: 1.0.0 (Pre-AGI Edition)*
