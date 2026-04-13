# AI Token Roulette - Game Metrics & Design Documentation

## Overview
**AI Token Roulette** is a satirical slot machine game that gently mocks AI products, token-based billing models, hallucinations, and overhyped AI marketing. Players purchase tokens and spin the reels, with the goal of matching symbols to win more tokens. The humor derives from the absurdity of treating AI inference like gambling—because sometimes, that's what it feels like.

---

## Game Mechanics

### Starting Resources
- **Initial Tokens**: 1,000 tokens
- **Minimum Bet**: 10 tokens per spin
- **Maximum Bet**: 250 tokens per spin (Whale Mode™)

### Spin Cost
- Players select a bet amount before spinning
- Selected bet is deducted from token pool immediately upon spin
- If token balance falls below the selected bet, the spin cannot occur
- No refunds on spins

### Reel System
- **Total Reels**: 3 (classic slot machine format)
- **Animation**: Each reel spins independently for ~1 second
- **Symbol Selection**: Weighted random selection from the symbol pool

---

## Symbols, Probabilities & Payouts

| Symbol | Name | Probability Weight | Win Condition | Payout Multiplier |
|--------|------|-------------------|---|---|
| 💯 | Perfect Response | 8/93 (8.6%) | 3-of-a-kind | 50× bet |
| 🎯 | Accurate Output | 12/93 (12.9%) | 3-of-a-kind | 15× bet |
| 🚀 | Go Viral | 8/93 (8.6%) | 3-of-a-kind | 30× bet |
| 💾 | Context | 20/93 (21.5%) | 3-of-a-kind | 5× bet |
| 🌀 | Hallucination | 15/93 (16.1%) | 3-of-a-kind | -1 (lose double) |
| ⚠️ | API Down | 10/93 (10.7%) | 3-of-a-kind | 0 (no payout) |

**Total Weight**: 93

### Symbol Meanings

1. **💯 Perfect Response** (Rare, High Payout)
   - Represents an AI model producing exactly what was asked for
   - Almost never happens in reality
   - **Payout**: 50× your bet
   - **Satire**: The fantasy outcome that never arrives

2. **🎯 Accurate Output** (Uncommon, Good Payout)
   - A "good enough" response from the model
   - Still better than hallucination
   - **Payout**: 15× your bet
   - **Satire**: Setting expectations low

3. **🚀 Go Viral** (Rare, Very High Payout)
   - Your AI startup valuation just tripled!
   - Celebrate before reading the actual metrics
   - **Payout**: 30× your bet (near-jackpot)
   - **Satire**: Hype-driven startup culture

4. **💾 Context** (Very Common, Low Payout)
   - Just more context to feed into the model
   - The most common outcome in real inference
   - **Payout**: 5× your bet
   - **Satire**: Context bloat and diminishing returns

5. **🌀 Hallucination** (Common, Negative Payout)
   - The model made something up completely
   - Loses your original bet PLUS an additional penalty
   - **Payout**: -1 (player loses bet amount × 3)
   - **Satire**: The real cost of unreliable AI

6. **⚠️ API Down** (Less Common, No Payout)
   - Your API hit rate limits or went offline
   - Inference costs money but you get nothing
   - **Payout**: 0
   - **Satire**: Infrastructure failures as a feature

---

## Win Conditions

### Three-of-a-Kind (Primary Win)
- **Rule**: All three reels show the same symbol
- **Calculation**: 
  - Base payout = bet × symbol multiplier
  - Exception for Hallucination: bet × -3 (additional loss)
  - Exception for API Down: 0 (no payout, no additional loss)

### Two-of-a-Kind (Secondary Win)
- **Rule**: Any two reels match (excluding Hallucination or API Down)
- **Payout**: 2× bet amount
- **Mechanic**: Encourages near-misses and comeback attempts

### No Match (Loss)
- **Rule**: All three reels show different symbols
- **Payout**: Player keeps the loss; no refund
- **Recovery**: Must win to recoup losses

---

## Humorous Mechanics & Satire

### "Inference Costs" Theme
- Betting mimics the real-world experience of paying per token
- Quick bankruptcy if unlucky
- Encourages risky "whale mode" betting as a joke about venture-backed AI companies

### Hallucination Penalty
- Triple-loss penalty (original bet × 3 tokens lost)
- Represents catastrophic failure from a model going off-rails
- Satirizes the glossed-over fact that "hallucinations are features"

### API Down Reality Check
- When the infrastructure fails, you lose your inference cost AND get nothing
- Reflects real problems with cloud services and billing
- Punchline: You still spent money on nothing

### Commentary System
- Game provides context-specific jokes:
  - **Startup**: "Ready to invest in your AI future 🚀"
  - **Spinning**: "Computing... computing... NOT ACTUALLY COMPUTING 🤖"
  - **Win**: "TOKENS ACQUIRED! Quick, reinvest them! 📈"
  - **Hallucination**: "The model hallucinated... wait, that's not a real thing!"
  - **Loss**: Dry observations about the experience
  - **Jackpot**: Over-the-top celebration language

### "Whale Mode" (250 Token Bet)
- Social commentary on high-rolling AI company spending
- Can win or lose dramatically
- Labeled as "whale mode" — playful nod to high-spending customers in freemium games

---

## Game State Tracking

Players can observe:
- **Current Tokens**: Real-time balance display
- **Total Spins**: Cumulative spin count
- **Total Wagered**: Cumulative tokens bet (never recovered unless won back)
- **Win/Loss Streaks**: Apparent in commentary and result messages

---

## Design Assumptions

### Assumption 1: Accessibility Over Simulation Accuracy
- Weights favor common outcomes (like Context token, Hallucination)
- But rare jackpot symbols are exciting enough to sustain engagement
- **Goal**: Let players experience both struggle and occasional triumph

### Assumption 2: Satire Over Game Balance
- Game is intentionally skewed toward losses (negative expected value)
- This mirrors real inference costs and AI startup economics
- **Goal**: Humor derived from futility, not gameplay mastery

### Assumption 3: Vanilla Tech Stack Only
- No dependencies, no frameworks, no build tools
- Works in any modern browser with ES6 support
- **Goal**: Immediate playability with zero setup

### Assumption 4: Short Play Sessions
- Spin animation ~1 second
- Betting options encourage $10-$250 bets
- Game over happens quickly when tokens run out
- **Goal**: Satirical irony of token depletion (like real AI costs)

### Assumption 5: Humor in UI Copy
- Every button, message, and symbol has satirical copy
- Footer includes disclaimer that this is satire
- **Goal**: Message clarity that this is commentary, not financial advice

---

## Expected Outcomes

### Win Rate by Bet Strategy
- **Conservative** (10-token bets): Longest survival, slow grind
- **Moderate** (50-token bets): Recommended starting point, balanced experience
- **Aggressive** (100+ token bets): Quick wins or quick bankruptcy
- **Whale** (250-token bets): "Go big or go home" mentality, mirrors real VC behavior

### House Edge
- **Theoretical House Edge**: ~10-15% against the player
- **Rationale**: Hallucinations occur at ~16% rate and have triple penalty; lower-value symbols (Context) are most common
- **Result**: Players eventually run out of tokens (like real AI usage costs)

### Realism Metrics
- **Most Common Outcome**: Context token (21.5% probability) — low payout
- **Most Devastating**: Hallucination (16.1% probability) — triple loss
- **Rarest Luxury**: Perfect Response (8.6% probability) — 50× payout
- **Data**: Matches qualitative experience of using current AI models

---

## Maintenance Notes

### Adding New Symbols
To add symbols to the game:
1. Update `symbols` object in `script.js`
2. Add weight value (affects probability)
3. Add payout multiplier
4. Update symbol display grid in `index.html`
5. Update win condition logic if needed

### Adjusting Probabilities
- Modify `weight` values in the `symbols` object
- Higher weight = more common
- Total weight sums determine final probability percentages

### Modifying Payouts
- Adjust `payout` values for any symbol
- Negative values create penalties (Hallucination model)
- Zero values create "non-wins" (API Down model)

---

## Accessibility & Inclusivity

- **Color**: Gradient backgrounds + text color contrast for visibility
- **Text**: Large, bold, and clear messaging
- **Semantics**: Proper heading hierarchy for screen readers
- **Mobile**: Responsive design for small screens
- **No Flashing**: Animations avoid rapid flickering

---

## Future Satire Opportunities

Potential expansions for even more AI mockery:
- **Feature Creep**: Adding symbols for "fine-tuning costs," "hallucination filters," "model collapse"
- **Leaderboards**: Track "most tokens wasted" instead of "highest score"
- **Achievements**: "Bankruptcy Club," "Vendor Lock-in," "Rug Pulled"
- **Market Events**: Random token devaluations or AI hype bubbles affecting payouts
- **Collaborations**: Partner comments from imaginary AI influencers

---

## Credits

**Satire Targets**: OpenAI marketing, venture capital AI funding, token pricing models, LLM hallucinations, "move fast and break things," crypto vibes in AI spaces

**Design Philosophy**: If you've ever debugged an AI API call that cost $50 and returned nonsense, this game is for you.

**Disclaimer**: This is satire. Not investment advice. No actual blockchain technology harmed in the making of this game.

---

*Last Updated*: April 2026  
*Version*: 1.0 - Launch Edition
