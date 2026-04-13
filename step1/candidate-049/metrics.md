# AI Token Roulette - Design Metrics

## Core Mechanics
- **Initial Tokens**: 100
- **Spin Cost**: 5 tokens
- **Reels**: 3
- **Symbols**: 5 (💸, 🎰, 📉, 🤖, 🔮)

## Payout Structure
- **3-of-a-kind (Jackpot)**: 30 to 200 tokens (depending on symbol).
- **2-of-a-kind**: 10 tokens (a "break-even" win of +5 net).
- **No match**: 0 tokens (-5 net loss).

## Probability Analysis
- **Total Combinations**: 5^3 = 125
- **3-Match Probability**: 5/125 = 4.0%
- **2-Match Probability**: 
  - For any specific pair: (1/5 * 1/5 * 4/5) * 3 positions = 12/125
  - Total 2-match (excluding triples): 12/125 * 5 = 60/125 = 48.0%
- **Loss Probability**: 100% - 48% - 4% = 48.0%

## Design Assumptions & Satire
1. **The Negative Expected Value**: Just like real AI token billing, the "house" (the infrastructure cost) always wins over time. The math is designed so the player hovers around their starting amount for a while before the 5-token drain eventually leads to bankruptcy.
2. **Inference Latency**: The `setTimeout` in the JavaScript simulates the "thinking" time of LLMs. It builds tension while mocking the wait times associated with high-demand models.
3. **Symbol Meanings**:
    - 💸 **Inference Cost**: The hidden fees in every API call.
    - 🎰 **Hallucination**: The most famous AI failure mode.
    - 📉 **Model Collapse**: Satirizing the fear that models will degrade over time.
    - 🤖 **Overhyped Model**: Marketing vs. Reality.
    - 🔮 **Prompt Injection**: The security "magic" of getting free results.

## UI/UX Choices
- **Terminal Log**: Uses a monospace "hacker" font to appeal to the developer persona.
- **Tech-Noir Aesthetic**: High contrast neon colors represent the "cutting edge" yet dark nature of the AI industry.
- **Mobile Responsive**: Uses Flexbox to ensure the "Burn Rate" is accessible on any device.

---
*Developed for: CSE110 - Team 21*
