# AI Token Roulette - Design Metrics

## Core Parameters
- **Initial Tokens**: 100
- **Spin Cost**: 5 tokens (Simulates "Inference Cost")
- **Symbols (5)**: 💸 (Cost), 🎰 (Hallucination), 📈 (Hype), 🔮 (Injection), 💰 (Profit)

## Payout Structure
- **3-of-a-kind**: Weighted by rarity and satire (30 to 250 tokens).
- **2-of-a-kind**: 2 tokens (A "pity" rebate, still resulting in a net loss of 3 tokens).
- **No match**: 0 tokens.

## Statistical Breakdown
- **Total Combinations**: 5^3 = 125
- **3-Match Probability**: 5 / 125 = 4%
- **2-Match Probability**: (5 symbols * 3 positions * 4 remaining symbols) / 125 = 60 / 125 = 48%
- **Expected Value (EV)**:
  - Average 3-match win: 125 tokens
  - EV = (0.04 * 125) + (0.48 * 2) - 5
  - EV = 5 + 0.96 - 5 = **+0.96** (Slightly positive to keep players engaged, but the "logs" make them feel like they're losing ground).

## Design Assumptions
1. **Tone**: The "terminal" look and sarcastic logs target developers and tech-savvy users.
2. **Engagement**: By offering a 48% chance of a "partial match" that still loses tokens (net -3), we mirror the psychological trick of AI tools that feel productive but consume significant resources.
3. **Latency Simulation**: The JavaScript uses staggered `setTimeout` calls to simulate API inference latency, building tension while mocking slow model responses.

## Technical Rationale
- **Vanilla JS**: Zero dependencies for maximum performance and portability.
- **CSS Animations**: GPU-accelerated blur effects provide a "fast-spinning" feel without heavy assets.
- **State Management**: Ephemeral local state; refreshing the page simulates a "Startup Bankruptcy" (resetting to 100 tokens).
