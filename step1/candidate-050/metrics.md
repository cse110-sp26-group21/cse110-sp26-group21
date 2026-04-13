# AI Token Roulette - Metrics & Design Documentation

## Core Mechanics
- **Initial Tokens**: 100
- **Spin Cost**: 5 tokens
- **Symbols**: 5 distinct AI-themed emojis.

## Payout Structure
The game is designed with a negative expected value to simulate the "burn rate" of AI infrastructure and the reality of token billing.

| Result | Payout | Frequency (Approx) | Satirical Context |
|--------|--------|-------------------|-------------------|
| 3 Match | Variable | ~0.8% | High valuation/AGI claims |
| 2 Match | 10 Tokens | ~30% | "Consolation" for bad output |
| 0 Match | 0 Tokens | ~69% | Model collapse/Refusal |

### Detailed 3-Match Payouts
- 💸 (Inference Cost): 50 tokens
- 🎰 (Hallucination): 100 tokens (The biggest win is ironically a lie)
- 📈 (Overhyped Model): 30 tokens
- 🔮 (Prompt Injection): 75 tokens
- 💰 (Free Trial): 200 tokens (The rarest and most valuable)

## Design Assumptions
1. **Simulated Latency**: The 1.5s delay during spinning is intentional. It mimics the "thinking time" or inference latency of LLMs to build tension and reinforce the theme.
2. **Terminal Aesthetics**: The use of monospace fonts and a "System Log" appeals to the developer persona, making the "billing" feel like a technical failure.
3. **Negative EV**: Over 1,000 spins, the house (the AI platform) will always win. This is a commentary on how users often spend more on API tokens than they generate in tangible value.

## Symbol Meanings
- 💸 **Inference Cost**: The hidden price of every prompt.
- 🎰 **Hallucination**: High confidence, zero accuracy.
- 📈 **Overhyped Model**: Marketing benchmarks vs. reality.
- 🔮 **Prompt Injection**: Security vulnerabilities disguised as "jailbreaking."
- 💰 **Free Trial**: The only time you actually feel like you're winning.

## Technical Implementation
- **Vanilla JS**: No frameworks. Uses standard `setTimeout` and `Promise` for animation timing.
- **CSS Animations**: Uses a keyframe blur animation to simulate the "spinning" of reels without complex sprite sheets.
- **State Management**: Simple local variables. Persistence is not implemented to emphasize the "ephemeral" nature of startup funding (losing it all on refresh).

---
*Developed as a satirical commentary on the 2024-2026 AI Hype Cycle.*
