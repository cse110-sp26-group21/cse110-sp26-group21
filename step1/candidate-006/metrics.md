# AI Token Casino™ - Game Metrics & Design Documentation

## Overview
A satirical slot machine web application that parodies AI token billing, inference costs, hallucinations, and overhyped AI product marketing. Players spend tokens to spin virtual reels decorated with AI-themed symbols and win rewards based on matching combinations.

---

## Game Mechanics

### Starting State
- **Initial Tokens**: 100 tokens
- **Minimum Bet**: 1 token
- **Maximum Bet**: 25 tokens (selectable in increments)
- **Default Bet**: 10 tokens

### Win Conditions

#### Three Matching Symbols (Primary Wins)
- **3x Tokens** → 10x bet multiplier (JACKPOT)
  - Example: 10 token bet = 100 token win
  - Rarest win condition, maximum reward
  
- **3x Model v2.5** → 8x bet multiplier
  - Represents "stable model releases"
  - High payout reflecting belief in new versions
  
- **3x Any Other Symbol** → 2x bet multiplier (Base Triple Match)
  - Catch-all for matching three non-special symbols
  - Reliable win, moderate reward

#### Special Cases
- **3x API Error** → 1x bet refund (no loss, break even)
  - Represents service failures resulting in refunds
  - Players pay to spin but get exactly that back
  
- **3x Hallucination** → -1x bet multiplier (ADDITIONAL LOSS)
  - Players lose their bet PLUS an additional bet amount
  - Example: 10 token bet = 20 total tokens lost
  - Satirizes how hallucinations compound problems

#### Two Matching Symbols
- **Any Two Match** → 0.5x bet multiplier
- Partial payout for near-misses
- Example: 10 token bet = 5 token win

#### No Matches
- **Three Different Symbols** → 0 payout (total loss)
- No refund, no reward
- Message indicates wasted "inference cost"

---

## Symbol Set

| Symbol | Emoji | Theme | Multiplier Role |
|--------|-------|-------|-----------------|
| Token | 💰 | Literal currency - desired outcome | Jackpot (10x) |
| Hallucination | 🌀 | AI errors, false outputs | Penalty (-1x) |
| Model v2.5 | 📈 | Product versioning, marketing | High (8x) |
| Inference | ⚡ | Computing process | Neutral (1x) |
| Context Limit | 🎲 | Token limits, constraints | Low (0.5x) |
| API Error | 🚨 | Service failures | Break-even refund (1x) |
| Just Works™ | ✨ | Marketing hype ("just works") | Neutral (1.2x) |
| Rubber Duck | 🦆 | Debugging aid, outside help | Neutral (1x) |

**Total Symbols**: 8

---

## Mathematical Model

### Expected Value Analysis

**Probability Calculation** (8 symbols, 3 reels):
- Probability of any specific symbol on all 3 reels: (1/8)³ = 1/512 ≈ 0.195%
- Probability of any triple match: 8 × (1/512) = 8/512 ≈ 1.56%
- Probability of at least 2 matching: ~3.5%

**House Edge** (on 10 token bet):
- Total possible outcomes: 512
- Assuming uniform distribution:
  - Jackpots (3x Token): 1 outcome × 100 tokens = 100 tokens
  - 3x Model: 1 outcome × 80 tokens = 80 tokens
  - 3x Other (6 symbols): 6 outcomes × 20 tokens = 120 tokens
  - 3x Hallucination: 1 outcome × -20 tokens = -20 tokens (penalty)
  - 3x API Error: 1 outcome × 10 tokens = 10 tokens
  - Two matches: ~18 outcomes × 5 tokens = 90 tokens
  - No matches: ~485 outcomes × 0 tokens = 0 tokens
  
- **Theoretical Return**: (~390 tokens per 512 spins) / (512 spins × 10 tokens) ≈ 76% RTP
- **House Edge**: ~24%

**Note**: This is NOT a real gambling simulation and was designed for entertainment. The mathematical model is intentionally designed to be "just worse enough" to satirize paid AI services without being predatory.

---

## Game Duration Metrics

### Spin Animation Timing
- **Reel Spin Duration**: 1.0–1.5 seconds per reel (randomized)
- **Easing Function**: Cubic ease-out (deceleration effect)
- **Rotation Amount**: 8+ full rotations before landing

### Session Tracking
- **Total Spent**: Cumulative tokens used across all spins
- **Total Won**: Cumulative tokens earned from wins (including negative payouts)
- **Net Change**: `totalWon - totalSpent`

---

## User Flow

1. **Game Initialization**
   - Player starts with 100 tokens
   - Default bet selected (10 tokens)
   - Spin button enabled

2. **Betting Round**
   - Player selects bet amount (1, 5, 10, or 25 tokens)
   - Player clicks "SPIN FOR YOUR FUTURE 🎰"
   - Tokens immediately deducted from balance

3. **Spinning Phase**
   - All three reels spin with randomized durations
   - Visual feedback: reels rotate multiple times
   - Spinning phase lasts 1–1.5 seconds

4. **Win Evaluation**
   - Game checks matching patterns
   - Payout calculated from payout table
   - Result message displayed with animation
   - Tokens updated in real-time

5. **End Condition**
   - Game continues until tokens reach 0
   - Player can reset anytime to restart with 100 tokens
   - Reset confirmation prevents accidental resets

---

## Satirical Elements

### On AI Hype
- "Model v2.5" symbol represents constant versioning cycles
- "Just Works™" symbol parodies marketing language
- Tagline: "For the cost of a small GPU, you could've had a Tesla"

### On Token Billing
- Literal "Token" symbol as currency, central to narrative
- Payout table highlights how token costs ≠ value received
- Disclaimer warns of poor ROI

### On Hallucinations
- "Hallucination" symbol penalizes players EXTRA (not just loss)
- Reflects how AI errors often compound problems

### On Inference Costs
- Players "spend" tokens to "spin" (compute)
- Often lose money on each spin despite optimism
- "Inference cost a lot more than you'll ever get back" message

### On Overhyping
- "Context Limit" symbol = constraint marketing as feature
- API errors give refunds (sarcasm about customer support)
- Rubber Duck symbol = debugging aid (ironic: need help from toy)

---

## Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure, form elements
- **CSS3**: Gradients, animations, flexbox, CSS Grid
- **JavaScript (ES6+)**: Class-based architecture, Promise-based animations, requestAnimationFrame

### Key Features
- **No External Dependencies**: Pure vanilla web technologies
- **Responsive Design**: Works on mobile and desktop
- **Smooth Animations**: requestAnimationFrame for 60fps rendering
- **Accessible UI**: Semantic HTML, color contrast, keyboard support
- **State Management**: Centralized game state in SlotMachine class

### Animation Techniques
- **Easing**: Cubic ease-out for reel deceleration
- **Pulse Animation**: Header pulse effect (2s loop)
- **Bounce Animation**: Win message bounce feedback
- **Transitions**: Smooth color and scale transitions on buttons

---

## Design Philosophy

This game was designed to be:
1. **Entertaining First**: Engaging animations and feedback
2. **Satirical**: Every element mocks AI product industry tropes
3. **Educational**: Demonstrates poor ROI of AI token systems
4. **Accessible**: Simple rules, clear feedback, colorblind-friendly emoji
5. **Lightweight**: Single-file deployable (3 files), minimal asset requirements

The humor is gentle and self-aware, targeting the AI industry rather than AI itself or its users.
