# AI Token Roulette - Game Metrics & Design

## Overview
**AI Token Roulette** is a satirical slot machine that critiques the "pay-per-token" model of modern AI APIs. It gamifies the uncertainty of inference, where costs are guaranteed but accuracy is a gamble.

## Game Mechanics

### Currency & Cost
- **Initial Tokens**: 100 (Your "Seed Round").
- **Inference Cost**: 5 tokens per spin.
- **Goal**: Stay solvent longer than the model's coherence.

### Symbol Legend
- 💰 **Free Trial**: Rare and rewarding.
- 🎰 **Hallucination**: High risk, high reward.
- 🔮 **Prompt Injection**: Bypassing the safety filters.
- 💸 **Inference Cost**: The inevitable drain.
- 📈 **Model Hype**: Marketing claims in emoji form.

## Payout Structure
| Result | Payout | Satirical Note |
| :--- | :--- | :--- |
| **3x 💰** | +100 tokens | "Free Trial Blessing" |
| **3x 🎰** | +50 tokens | "Useful Hallucination" |
| **3x 🔮** | +40 tokens | "Injection Success" |
| **3x 💸** | +20 tokens | "Predictable Pricing" |
| **3x 📈** | +15 tokens | "Model Actually Improved" |
| **2x Match** | +2 tokens | "Close enough for a demo" |
| **No Match** | 0 tokens | "Tokens evaporated in the cloud" |

## Probability Analysis
- **3-Symbol Match**: 4% chance per spin (5/125 outcomes).
- **2-Symbol Match**: 48% chance per spin (60/125 outcomes).
- **Expected Value (EV)**: ~2.76 tokens returned per 5-token spin.
- **House Edge**: ~45%. This reflects the reality of high-cost inference: you pay for the privilege of losing value over time.

## Technical Notes
- Built with vanilla HTML/CSS/JS to avoid "heavy model dependencies."
- Animations use CSS transforms to simulate "neural network processing time."
