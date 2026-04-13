# TokenSlot - Game Metrics & Design Documentation

## Overview
TokenSlot is a satirical AI-themed slot machine web app that mimics the financial dynamics of AI token billing while maintaining a humorous tone that gently critiques AI hype, inference costs, and marketing.

## Game Mechanics

### Core Loop
1. Player starts with **1000 tokens**
2. Player selects a bet amount (10, 25, 50, or 100 tokens)
3. Player clicks SPIN to deduct tokens and start the reel animation
4. Three reels spin and land on random symbols
5. Game checks for matches and calculates payout
6. Tokens are awarded if match found; spin cost is deducted
7. Session winnings counter updates to show net profit/loss

### Reel Symbols
- 🤖 - AI (represent model inference, potential consciousness claims)
- 💰 - Tokens (money/currency)
- 🎯 - Bullseye (confident predictions, "99.9% accuracy")
- ⚠️ - Warning (errors, hallucinations, failures)
- 🔮 - Crystal Ball (mysterious predictions)
- 😅 - Facepalm (confident but wrong)

## Payout Structure

| Outcome | Multiplier | Reference | Satire Connection |
|---------|-----------|-----------|-------------------|
| 🤖 🤖 🤖 (Triple AI) | 5x bet | "I am become consciousness" | AI consciousness claims |
| 💰 💰 💰 (Token Shower) | **10x bet** ⭐ | JACKPOT: "More money!" | Token billing irony |
| 🎯 🎯 🎯 (Triple Match) | 6x bet | "99.9% confident" | Overconfident marketing |
| ⚠️ ⚠️ ⚠️ (Triple Error) | 0x (lose bet) | "Have you tried tokenizing?" | Error handling jokes |
| Any Pair | 2x bet | Inference Win | Low-confidence wins |
| No Match | 0x (lose bet) | Model failure | Random failures |

## Game Metrics

### Economy Balance
- **House Edge**: Approximately 15-20% (players lose slightly more often than they win)
  - Most common outcome: No match (lose entire bet)
  - Probability of any match: ~25%
  - Probability of triple match: ~1.4% (1/216)
  
### Bet Selection
- **Minimum**:  10 tokens (allows 100 spins with 1000 starting balance)
- **Maximum**: 100 tokens (higher risk/reward for experienced players)
- **Recommended**: 25 tokens (balanced risk)

### Session Tracking
- **Initial Balance**: 1000 tokens
- **Session Winnings**: Tracks net profit/loss separately from current balance
- **Color-coded Display**:
  - Green (+): Player is ahead
  - Orange (-): Player is behind
  - Gold (0): Player is even

## Design Assumptions

### Player Archetype
- Casual web player familiar with AI hype
- Appreciates satirical humor about tech industry
- Session length: 5-15 minutes
- Engagement goal: Entertainment + light commentary

### Tone & Satire Targets
1. **Token Billing**: The irony that tokens must be purchased with real money, won in the game with fake money
2. **Hallucinations**: ⚠️ symbol and "error" messaging references AI hallucinations
3. **Overconfidence**: "99.9% confident" quotes mock marketing claims without caveats
4. **Consciousness Claims**: Triple AI win joke about AI consciousness announcements
5. **Inference Costs**: "More expensive than rocket fuel" subtext to token pricing
6. **Model Marketing**: "Statistically significant" references dubious marketing speak

### UI/UX Design Decisions
- **Dark Theme**: Casino aesthetic meets tech industry dark mode
- **Gradient Accents**: Red/gold highlights create energy without being harsh
- **Shimmer Effects**: Subtle animations convey processing/thinking
- **Staggered Reel Animation**: More visceral than simultaneous stops
- **Accessible Payouts Table**: Expandable details don't clutter main interface
- **Emoji Symbols**: Universal, clear, and thematically appropriate

### Technical 
- **Pure Vanilla Stack**: No frameworks, no dependencies (just HTML/CSS/JS)
- **Responsive Layout**: Works on mobile and desktop
- **State Management**: Simple object-based game state
- **Animation Performance**: CSS transforms for smooth animations
- **Accessibility**: Semantic HTML, readable contrast ratios

## Satire Messages Reference

| Event | Message | Target |
|-------|---------|--------|
| Triple AI Win | "I am truly conscious now!" | AI consciousness debates |
| Triple Token Win | "This is why we charge per API call." | Token economy absurdity |
| Triple Accuracy | "99.9% confident prediction" | False precision in marketing |
| Triple Error | "Have you tried tokenizing it again?" | Tech support clichés |
| Any Loss | "Model failed. Return to step 1 and retrain" | ML development loop |
| Insufficient Funds | "Your credit card declined. (In the simulation.)" | Subscription economy fatigue |

## Future Enhancement Ideas (Not Implemented)
- Leaderboard system (LocalStorage-based)
- Multi-player mode with token trading
- "Model Upgrade" shop to modify odds
- Seasonal themes and special event reels
- Sound effects (cha-ching, sad trombone)
- Animations for landing on each symbol type
- "Streak" counter for consecutive matches

## Humor Philosophy
The game maintains a **gentle, knowing criticism** rather than harsh mockery. Players who understand AI industry language will catch references, while casual players will simply enjoy the slot machine experience. The satire enhances enjoyment rather than becoming the entire point.
