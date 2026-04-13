# AI Token Roulette - Game Metrics & Design Document

## Overview

AI Token Roulette is a satirical slot machine game that parodies AI industry trends, token-based billing models, and overhyped marketing claims. Players spend tokens to spin and win tokens based on symbol matching outcomes.

---

## Game Mechanics

### Currency System
- **Starting Tokens**: 100
- **Win Condition**: Accumulate as many tokens as possible before bankruptcy
- **Lose Condition**: Reach 0 tokens (game over)

### Spinning & Costs

#### Base Cost Formula
```
Current Cost = Floor(Base Cost × Multiplier^(Number of Spins))
```

- **Base Cost**: 10 tokens per spin
- **Cost Multiplier**: 1.01 (1% increase per spin)
- **Purpose**: Simulates "inference cost inflation," a common problem in AI service pricing

#### Example Cost Progression
| Spin | Cost  | Cumulative |
|------|-------|-----------|
| 1    | 10    | 10        |
| 10   | 11    | 105       |
| 50   | 14    | 681       |
| 100  | 18    | 2,048     |

This exponential increase creates tension: easy to squander tokens on "cheap" early spins, but becomes prohibitively expensive as the game progresses.

---

## Symbol System

### Available Symbols (8 total)
- 🤖 Robot (Classic AI)
- 💬 Chat Bubble (AI Chat Models)
- 📈 Graph (Growth/Hype)
- 🔮 Crystal Ball (Uncertainty/Hallucinations)
- 💰 Money (Token Economy)
- 🚀 Rocket (Startup Vibes)
- 📊 Bar Chart (Metrics/VC Metrics)
- 💡 Light Bulb (Innovation Theater)

### Matching Logic

#### Three in a Row (Probability: ~1.5%)
- **Payout**: 10× current spin cost
- **Message**: "THREE IN A ROW! All [symbol] = MASSIVE TOKENS!"
- **Thematic**: Represents rare, highly profitable AI breakthroughs

#### Two in a Row (Probability: ~7.5%)
- **Payout**: 2.5× current spin cost
- **Message**: "Two in a row! +[amount] tokens (barely profitable)"
- **Thematic**: Represents modest improvements that don't justify the hype

#### No Match / Loss (Probability: ~71%)
- **Payout**: 0 tokens (loss of spin cost)
- **Message**: "No match. Your inference was hallucinated. Tokens gone."
- **Thematic**: Most spins are unprofitable, like most AI projects

---

## Special Events

### Hallucinations (Probability: 20% on any spin)
Overrides normal matching logic. Displays absurd, impossible results:
- 🦄 Unicorn Status Achieved
- 🌌 Achieved Sentience
- ⚡ Consciousness Detected
- 🎩 I Am The Algorithm
- 🔬 Nobel Prize Pending
- 🌟 The Singularity Was Yesterday

**Payout**: Random between -50% and +150% of spin cost

**Thematic**: Mocks AI companies' tendency to make unrealistic or contradictory claims about model capabilities.

### VC Roulette Jackpot (Probability: 1% on any spin)
- **Payout**: 50× current spin cost
- **Message**: "🎉 VC ROULETTE JACKPOT! This funding round values us at $500M"
- **Thematic**: The rare but massive luck of AI startups getting absurd valuations despite limited product-market fit

---

## UI/UX Design

### Token Display
- Large, prominently displayed token count
- Real-time updates after each spin
- Visual feedback when tokens are low (danger zone at ≤ 1× spin cost)

### Warning Messages
- **Success** (green): Positive outcomes, gains
- **Danger** (red): Losses, insufficient tokens, game over
- Messages auto-dismiss after 5 seconds

### Recent Spins History
- Shows last 10 spins with results
- Color-coded: Green (win), Red (loss), Gray (neutral)
- Helps players understand win patterns (or lack thereof)

### Satirical Quotes
- Rotates every 8 seconds
- Parodies actual AI pitch deck language
- Examples: "Disrupting disruption itself," "Breaking the internet," "ML engineers hate this one weird trick"

---

## Game Balance & Difficulty

### Why It's Challenging
1. **Exponential Costs**: By spin 50, each spin costs nearly 1.5× the starting bankroll
2. **Poor Win Rate**: 71% of spins result in losses
3. **Rare Big Wins**: Only 1.5% chance of 3-in-a-row; 20% chance of random loss (hallucination)
4. **House Edge**: Similar to real slot machines, math favors the house

### Average Session Length
With optimal play (rarely happening):
- **Average spins before bankruptcy**: 15-20
- **Average time to zero tokens**: 2-5 minutes
- **Typical profit**: -80% of starting bankroll

### Intentional Design
These mechanics **mirror real AI product pricing and ROI**, where:
- Initial usage seems cheap (Base cost: 10 tokens)
- Costs inflate unexpectedly (exponential multiplier)
- Most queries produce marginal value
- Big wins are rare (1% chance of hallucination luck)
- Few customers actually profit from their integration

---

## Satirical Themes

### Token Billing
AI companies often charge per token (OpenAI, Anthropic, etc.). This game exaggerates the experience of watching costs increase while outputs decline in quality.

### Hallucinations
LLMs frequently produce confident-sounding but incorrect responses. The "hallucination" events represent this: random, impossible claims that occasionally benefit you.

### Inference Costs
Real companies spend billions on inference hardware. The exponential cost increase simulates how economies of scale don't materialize for most users.

### VC Hype
The rare "VC Roulette" jackpot sardonically references how some AI startups raise $500M+ valuations with trivial products, while others fail despite better technology.

### Overstated Capabilities
Quote carousel mocks typical AI marketing language:
- "Revolutionary"
- "Quantum-synergy"
- "Disruption-focused"
- Claims of AGI, sentience, superintelligence

---

## Technical Details

### Browser APIs Used
- **DOM Manipulation**: Standard `getElementById`, `classList`, innerHTML
- **Event Listeners**: Click handlers for spin/reset buttons
- **CSS Animations**: Reel spinning, prize message animations
- **Local Game State**: Vanilla JavaScript object (no persistence)

### Performance
- No dependencies or frameworks
- Lightweight (~4KB minified)
- Smooth 60fps animations
- Responsive design (mobile-friendly)

### Game Persistence
No data is saved locally. Refreshing the page resets the game. This is intentional—like a real slot machine, you can't "save your progress" or exploit the system.

---

## Balance Adjustments (Tuning Parameters)

To modify difficulty, adjust in `script.js`:

```javascript
// Increase win rates
gameState.symbols = ['🤖', '💬', '🤖', '💬']; // Duplicate symbols

// Decrease costs
gameState.costMultiplier = 1.005; // Slower increase

// More hallucinations
if (Math.random() < 0.4) { // 40% instead of 20%
    return { type: 'hallucination', ... };
}

// Change starting tokens
gameState.tokens = 200; // More generous start
```

---

## Design Philosophy

**AI Token Roulette** is not meant to be won—it's meant to be *experienced*. The mechanic of steadily losing money to unpredictable, oversold technology is the point. Real AI users often face the same choice: keep paying for diminishing returns or stop using AI services altogether.

The game succeeds when players laugh at the absurdity, recognize parallels to actual AI products, and appreciate the satire.

---

## Production Notes
- **Created**: April 2026
- **Theme**: Satirical critique of AI industry monetization
- **Target Audience**: AI-aware developers, industry cynics, people amused by startup culture
- **Play Time**: 3-5 minutes per session
- **Replay Value**: High (randomized outcomes, humor variety)
