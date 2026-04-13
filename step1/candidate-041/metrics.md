# AI Token Roulette - Design Metrics

## Core Parameters
- **Initial Tokens**: 100
- **Spin Cost**: 10 tokens
- **Symbols**: 6 (🤖, 💸, 🎰, 📈, 🔮, 💰)
- **Combinations**: 216 ($6^3$)

## Payout Logic
- **3-Match**: 💰: +250 | 🎰: +150 | 📈: +50 | Others: +30
- **2-Match**: +10 tokens (Break even)
- **No-Match**: 0 tokens

## Probability & Expected Value (EV)
- **3-Match Probability**: $6 / 216 \approx 2.77\%$
- **2-Match Probability**: $90 / 216 \approx 41.67\%$
- **No-Match Probability**: $120 / 216 \approx 55.56\%$
- **Net EV per Spin**: $\approx -2.66 \text{ tokens}$
- **House Edge**: $\approx 26.6\%$

## Satirical Rationale
- **Latency**: The 1.2s spin delay simulates the time users spend waiting for API responses.
- **Jackpots**: The highest payout is the "Seed Round" (💰), mocking how fundraising is often more profitable than the AI itself.
- **Hallucinations**: The second highest payout is the "Hallucination" (🎰), satirizing the industry's pivot toward celebrating model creative "errors."
