# AI Token Slot Machine™ - Game Metrics & Design Document

## Overview
A satirical slot machine web app that gamifies AI industry economics, token billing, and overhyped marketing claims. Players spin reels with AI-themed symbols to win or lose tokens.

## Game Mechanics

### Starting Conditions
- **Initial Token Balance**: 1000 tokens
- **Goal**: Accumulate tokens through winning spin combinations
- **Session Tracking**: Tracks wins and total tokens spent per session

### Spinning System
- **Bet Amounts**: 10, 25, 50 (Balanced Approach), or 100 tokens (Aggressive Model)
- **Spin Duration**: 0.6s to 1.2s per reel (staggered for visual effect)
- **Cost**: Fixed to the selected bet amount per spin
- **Frequency**: No spinning while a previous spin is in progress (prevents double-betting)

### Symbols (8 Total)
1. **GPT-5** - Rarest, most valuable. Represents eagerly-anticipated future products
2. **Hallucination** - Common. AI generating confidently incorrect information
3. **Inference Cost** - Very common. The financial burden of running models
4. **Overhyped™** - Rare. Represents marketing vs. reality gap
5. **Context Window** - Uncommon. AI's attempt to remember more context
6. **Watermark** - Common. Barely-detectible authenticity markers
7. **⚠️ Error** - Uncommon. Losing symbol; triggers penalties
8. **Token Limit** - Uncommon. Losing symbol; represents rate limitations

### Win Conditions

#### Three of a Kind Jackpots
| Symbol | Multiplier | Tokens Won (at 50 token bet) | Narrative |
|--------|-----------|------------------------------|-----------|
| GPT-5 | 50x | 2,500 | "Finally shipped—and it works!" |
| Hallucination | 25x | 1,250 | "We said something ridiculous, but investors loved it" |
| Overhyped™ | 30x | 1,500 | "Hype machine goes BRRRR" |
| Context Window | 20x | 1,000 | "Now it remembers EVERYTHING" |
| Inference Cost | 15x | 750 | "Our AWS bill is slightly less catastrophic" |
| Watermark | 7.5x | 375 | "Barely a win, like our watermark detection" |

#### Two of a Kind (Mixed Match)
- **Payout**: 5x the bet amount
- **Narrative**: "You got SOMETHING! (Participation trophy)"

#### No Match
- **Payout**: Lose bet amount
- **Narrative**: "Better luck with the next inference run!"

#### Losing Symbols (One or More)
- **Penalty**: Additional 2x bet loss on top of spin cost
- **⚠️ Error**: "RUNTIME ERROR! Your computation budget is exhausted!"
- **Token Limit**: "TOKEN LIMIT EXCEEDED! Model stopped mid-response!"
- **Total Cost Example**: Spin with 50 token bet → 50 lost + 100 penalty = 150 token loss

## Probability Weighting

### Symbol Drop Rates (Per Reel)
Based on weighted randomness to reflect AI industry cynicism:

| Symbol | Weight | Frequency | Rationale |
|--------|--------|-----------|-----------|
| **Watermark** | 12 | 19% | "We built this but nobody cares" |
| **Inference Cost** | 10 | 16% | "The unavoidable reality" |
| **Hallucination** | 8 | 12.8% | "It happens more often than we admit" |
| **⚠️ Error** | 8 | 12.8% | "Bugs are features" |
| **Token Limit** | 8 | 12.8% | "Rate limits hit the hardest" |
| **Context Window** | 6 | 9.6% | "A nice improvement, sometimes" |
| **Overhyped™** | 4 | 6.4% | "Rare, but loud when it appears" |
| **GPT-5** | 2 | 3.2% | "The unicorn, the chimera, the myth" |

**Total Weight: 62 items**

### Win Probability (Approximate)
- **Three of a Kind**: ~0.5% per symbol type = ~4% total
- **Two of a Kind**: ~8-10%
- **Lose**: ~86-88%
- **Game Over Event** (Error/Limit): ~2% per spin

This creates the "stay and keep spinning" incentive while maintaining a House Edge of **+16-20%** per spin on average (typical casino economics).

## Game States & Flow

```
[Start] 
   ↓
[Place Bet] ← Player selects bet amount
   ↓
[Spin Reels] ← Disable button during animation
   ↓
[Evaluate Result] ← Check winning conditions
   ├→ [Win] → Add payout + message ← Token balance increases
   ├→ [Partial Win] → 5x payout ← Mixed match reward
   ├→ [Bust] → 2x penalty ← Error/Limit penalty
   └→ [Loss] → Lose bet ← No match
   ↓
[Check Game Over] 
   ├→ Balance = 0? → Disable spin, show gameover
   ├→ Balance < Bet? → Disable spin, show warning
   └→ Continue? → Return to [Place Bet]
   ↓
[Reset Available] ← Restart with 1000 tokens
```

## UI/UX Features

### Display Elements
- **Token Counter**: Real-time balance display (prominent, large font)
- **Payline Indicator**: Green dashed line showing winning row (visual feedback)
- **Reels**: 200px height, showing 4 visible symbols per reel
- **Message Box**: Contextual feedback (wins, losses, jokes)
- **Payout Display**: Large, animated confirmation of gains/losses
- **Expandable Payoff Table**: Rules and multipliers on demand

### Animations
- **Spin Animation**: Each reel spins independently (0.6s-1.2s duration)
- **Win Pulse**: Payout box scales slightly on big wins
- **Color Feedback**: Green for wins, red for losses, blue for neutral info

### Accessibility
- **Semantic HTML**: Proper heading hierarchy, labels on inputs
- **Color Contrast**: High contrast between text and backgrounds
- **Disabled States**: Clear visual feedback when spin is unavailable
- **Mobile Responsive**: Single-column layout on small screens

## Design Assumptions

### Satirical Tone Elements
1. **Token Economy**: Mimics AI API token billing (OpenAI, Anthropic, etc.)
2. **Marketing Language**: "Cutting-Edge Probability™", "Overhyped™" brand
3. **Industry In-Jokes**: 
   - Hallucinations as slot symbols
   - Context window as victory condition
   - Watermarks as "barely working"
   - Inference costs as the eternal struggle
4. **Stakes Psychology**: Play-money creates engagement without real risk

### Balance Philosophy
- **Not Designed to Win**: House edge ensures long-term losses (realistic to actual gambling)
- **Compelling Payouts**: Big wins are rarer but more rewarding (classic slot design)
- **Session Length**: Average session = 10-15 spins before running out of tokens
- **Replayability**: Random seed ensures variety; reset allows infinite sessions

### Browser Requirements
- **No Backend**: Pure client-side JavaScript (no server needed)
- **Modern APIs Only**: 
  - CSS Grid and Flexbox for layout
  - ES6+ JavaScript classes and arrow functions
  - Promise-based async timing
  - Standard DOM manipulation
- **No Dependencies**: Zero external libraries or frameworks

## Metrics for Enhancement

### Possible Future Features (Not Implemented)
- **Leaderboard**: Track high scores across browser sessions (localStorage)
- **Animations**: Confetti on big wins, shake effect on losses
- **Sound Effects**: Win jingles, spin wheel sounds
- **Tournament Mode**: Limited tokens, race against high score
- **Progressive Jackpot**: Grows with each spin, resets on win
- **Achievement Badges**: "First Win", "Spent 5000 Tokens", etc.

### Analytics Hooks
- Track average tokens spent per session
- Measure win rate by symbol type
- Identify "rage quit" moments (multiple resets)
- Monitor most common bet amounts

## File Structure
```
slot-machine/
├── index.html          HTML structure
├── styles.css          All styling and animations
├── script.js           Game logic and interactions
└── metrics.md          This documentation
```

## Technical Notes
- **Game State**: Encapsulated in `SlotMachine` class
- **Event Handling**: Attached in constructor for cleaner code
- **Animation Timing**: Staggered reel spins use Promise.all for coordination
- **Random Generation**: Weighted randomness for realistic symbol distribution
- **DOM Updates**: Minimal updates; only display changes on spin completion
