# AI Token Slot Machine - Game Metrics & Design

## Overview
A satirical slot machine game built with vanilla HTML, CSS, and JavaScript. Players spend tokens to spin a three-reel machine and win tokens based on matching symbol combinations. The theming gently satirizes AI products, token billing models, hallucinations, and overhyped marketing.

## Game Mechanics

### Starting State
- **Initial Tokens**: 1000 🪙
- **Minimum Bet**: 1 token
- **Maximum Bet**: 500 tokens (or current balance, whichever is lower)
- **Quick Bet Buttons**: 10, 50, 100 tokens

### Reel Symbols & Payouts

All triple-match payouts are calculated as: `bet_amount × multiplier`

| Symbol | Name | 3-Match Payout | Meaning |
|--------|------|---|---|
| 💡 | Eureka | 5x bet | Successful inference |
| 🚀 | To the Moon | 10x bet | Overhyped product launch |
| 👻 | Hallucinating | 3x bet | AI "creative" output |
| 🎯 | Accurate Output | 7x bet | Reliable inference |
| 💸 | Cost Overrun | -50% of bet | Surprise infrastructure costs |
| ❌ | Token Burned | -100% of bet | Critical failure / token consumed |

### Payout Scenarios

1. **All three reels match** (triple): Full payout multiplier applied
   - 🚀🚀🚀 = +10x (highest win)
   - 🎯🎯🎯 = +7x
   - 💡💡💡 = +5x
   - 👻👻👻 = +3x (humorous win)
   - 💸💸💸 = -50% (loss)
   - ❌❌❌ = -100% (total loss)

2. **Two reels match** (pair): +50% of bet (small win)

3. **No matches**: Lose the bet amount (token spent on "inference costs")

### Probability & House Edge
- **6 symbols total**: Each symbol has 1/6 (16.67%) probability per reel
- **Triple match probability**: ~4.63% per spin (1/216 combinations)
- **Any pair match probability**: ~11.57% per spin
- **No match probability**: ~83.8% per spin
- **Expected value**: Slightly negative for player (typical gambling scenario)

## Game Metrics

### Tracking
- **Current Balance**: Displayed in tokens 🪙
- **Total Lost**: Cumulative net losses across all spins
- **Bankrupt State**: Game ends when balance reaches 0

### Session Limitations
- No hard cap on spins (players can keep spinning while tokens exist)
- No time limit or arbitrary session end
- Reset button allows players to restart with fresh 1000 tokens

## Design Assumptions

### Player Experience
1. **Accessibility**: Large emoji symbols, simple controls, clear feedback
2. **Engagement**: Spinning animation, randomized AI comments, varied outcomes
3. **Humor**: Satirical AI comments that poke fun at:
   - Token-based billing models
   - Hallucinations and unreliable AI output
   - Overhyped marketing claims
   - Inference costs and computational expense
   - VC funding cycles

### Technical Constraints
- **Vanilla Stack**: HTML, CSS, JS only (no frameworks)
- **No Backend**: All logic runs client-side
- **No Persistence**: Progress lost on page refresh
- **Responsive Design**: Works on mobile and desktop

### AI Comment Types
- Victory comments (huge win, moderate, small)
- Loss comments (slight, bad, total loss)
- Special "hallucinating" comments when landing 👻
- Random contextual comments on page load

## File Structure
```
slot-machine/
├── index.html      # UI structure and layout
├── styles.css      # All styling and animations
├── script.js       # Game logic and interactions
└── metrics.md      # This file
```

## Future Enhancements (Out of Scope)
- LocalStorage persistence
- Leaderboards or high scores
- Multiplier bonuses for consecutive wins
- Special events or seasonal themes
- Sound effects or background music
- Mini-games or bonus rounds
- Animation tweaks per symbol
- Token shop (earn through gameplay interactions)
