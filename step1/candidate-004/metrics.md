# AI Token Slot Machine - Game Metrics & Design

## Overview
**AI Token Slot Machine** is a satirical slot machine game that gently mocks AI product pricing, token economics, hallucinations, and overhyped AI marketing. Players spend tokens to spin and win tokens through various AI-themed symbol combinations.

## Game Mechanics

### Starting Conditions
- **Initial Tokens**: 100
- **Minimum Players Need to Play**: 1 token (to spin)
- **Game Ends When**: Players run out of tokens

### Betting System
- **Available Bets per Spin**: 1, 5, 10, or 20 tokens
- **Bet Deduction**: Tokens are deducted immediately when the spin button is clicked
- **Spin Duration**: 2 seconds (animated reel spinning)

### Reel Symbols (8 total)
1. 🤖 **Model** - Represents AI models and their promises
2. 💬 **Hallucination** - When AI makes things up
3. ✨ **Token** - The goal (currency in the game)
4. 📊 **Embedding** - AI technical jargon
5. 💸 **Inference Cost** - The API bills
6. 🎯 **Precision** - Accuracy claims
7. 🤔 **Uncertain** - When AI doesn't know
8. ⚡ **Attention** - Transformer attention mechanism

### Winning Combinations

#### Three-of-a-Kind Matches (Special Jackpots)

| Combination | Payout | Multiplier | Message |
|------------|--------|------------|---------|
| 3× ✨ Token | 5× bet | 5x | "TOKEN JACKPOT! The AI finally generated value!" |
| 3× 🤖 Model | 3× bet | 3x | "THREE MODELS! Exponential growth imminent!" |
| 3× 💸 Inference Cost | Loss | 0x | "The API costs have consumed your tokens!" |
| 3× 💬 Hallucination | **LOSE ALL** | 0x | "CATASTROPHIC HALLUCINATION! You've lost EVERYTHING!" |

#### Partial Matches (Any 2 of 3)
- **Payout**: 1.5× bet
- **Message**: "Partial match. Participation trophy awarded!"

#### No Match
- **Payout**: 0 (lose the bet)
- **Message**: "Better luck next inference cycle!"

### Game Statistics Tracked
- **Your Tokens**: Current balance
- **Total Spent**: Cumulative tokens wagered across all spins
- **Total Won**: Cumulative tokens won across all spins

## Satirical Elements & Themes

### Token Economy
The game satirizes AI product token billing:
- Players "buy" tokens (metaphorically by spinning)
- Each spin consumes tokens as an "inference cost"
- Winning tokens is the fantasy of getting value from AI services

### Hallucinations
- **Regular Hallucinations** (💬): Three in a row = catastrophic loss (lose ALL tokens)
- Represents the risk of AI systems confidently stating false information
- Most severe penalty in the game

### Inference Costs (💸)
- Symbol represents the hidden real-world API costs of AI services
- Getting three costs = players lose (ironic penalty for "winning")
- Satirizes how businesses end up paying more than expected

### Model Overhype (🤖)
- "Three Models! Exponential growth imminent!" - mocks marketing claims
- Moderate payout (3x) despite hype
- Represents unrealistic expectations vs. actual returns

### Marketing Language
- UI text uses corporate/AI-industry jargon:
  - "YOUR INFERENCE RESULTS" (instead of "Your Spin Results")
  - "SPIN & HALLUCINATE" (play on "spin to win")
  - "Participation trophy" (for minor wins)

## Design Assumptions

### Player Intent
- Understand the game is satire about AI industry
- Find humor in the satirical symbols and messaging
- Recognize parallels to real AI service billing models

### Balance Decisions
- **High loss probability**: ~60% chance to lose a spin (no match)
- **Moderate wins**: ~30% chance for partial match (1.5x payout)
- **Jackpot thresholds**: Three-of-a-kind events are rare but provide flavor
- **Catastrophic loss**: Hallucination triple = instant game over (rare but memorable)

### Player Psychology
- Early wins encourage continued play
- Token balance display creates sunk-cost bias (realistic to AI spending!)
- Small partial wins provide dopamine hits without significant gains
- Statistics tracking (Total Spent/Total Won) shows the losing trend

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Flexbox layout, animations (spin effect, winner glow)
- **Vanilla JavaScript**: Game state management, DOM manipulation
- **No Dependencies**: Uses only browser APIs

### Performance Considerations
- CSS animations (GPU-accelerated) for reel spinning
- Minimal DOM manipulation during gameplay
- State updates batched to single `updateDisplay()` call
- Smooth 60fps animations via CSS transitions

### Accessibility Notes
- Color contrast meets WCAG AA standards
- Clear, readable font sizes
- Semantic HTML labels
- Button states clearly indicated (enabled/disabled)

## Humor Intent

**Target**: Good-natured satire of:
1. AI product pricing opacity
2. "Token economy" marketing speak
3. AI hallucination problems (well-publicized issue)
4. Startup culture hype around AI models
5. Vague claims about "exponential growth"
6. Hidden API costs and "surprise bills"

**Tone**: Playful mockery, not mean-spirited. Acknowledges these are real problems in AI industry while keeping it light.

---

**Example Winning Flow**:
1. Player starts with 100 tokens
2. Bets 5 tokens (95 remaining, 5 spent)
3. Spins and gets 3× ✨ Token symbols
4. Wins 25 tokens (5 × 5 multiplier)
5. Now has 120 tokens, 5 spent, 25 won
6. *Repeat until tokens run out* 

**Most Likely Outcome**: Players will gradually lose tokens over time, mirroring real AI API spending patterns.
