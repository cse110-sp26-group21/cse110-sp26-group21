# AI Token Waster 3000 - Game Metrics & Design Doc

## Overview

A satirical slot machine web application that gamifies the absurdity of AI token billing, inference costs, and overhyped AI marketing. Players spin reels composed of AI-related symbols and win/lose tokens based on matching outcomes.

## Game Metrics

### Economy

| Metric | Value | Rationale |
|--------|-------|-----------|
| Starting Tokens | 1,000 | Arbitrary but feels like enough rope to hang yourself with |
| Spin Cost | 10 tokens | Low friction encourages compulsive spinning |
| Three-Match Win | +500 tokens | Oversized payout encourages gambling addiction |
| Two-Match Win | +25 tokens | Participation trophy for partial success |
| No-Match Loss | -50 tokens | Extra penalty for complete failure (on top of spin cost) |
| Max Bet Spin Interval | 3,000 ms (3 sec) | Fast enough to feel exciting, slow enough to follow |

### Win Conditions

**Three of a Kind (Probability: ~12.5%)**
- All three reels match a symbol
- Represents overfitting to your wallet
- Awards 500 tokens (50x the spin cost)
- Increments "Hallucinations" counter

**Two of a Kind (Probability: ~42.2%)**
- Exactly two reels match
- Represents "partially working™" AI
- Awards 25 tokens (2.5x the spin cost)

**No Match (Probability: ~45.3%)**
- No reels match
- Represents complete system failure
- Costs additional 50 tokens (5% of spin cost on top of the 10 token spin cost)

### Bankrupt State

- Player hits bankruptcy when tokens ≤ 0
- All buttons disabled
- Displays "Game Over" message
- Game must be reset to continue

## Symbols & Themes

| Symbol | Meaning | Satirical Reference |
|--------|---------|---------------------|
| 🤖 | AI Model | The thing you're throwing tokens at |
| 💾 | Storage/Servers | "The cloud" (someone else's expensive computer) |
| 💸 | Money/Cost | Your wallet crying |
| 🎯 | Target/Goal | Rarely achieved |
| 📈 | Stock Market | Pump-and-dump schemes in the AI space |
| ⚠️ | Warning | This is a bad idea |
| 🔥 | Burning GPU | Inference costs go brrr |
| 💀 | Death | Your savings account |

## Design Assumptions

### Player Behavior

1. **Compulsive Gambling**: Players will spin repeatedly despite losing due to "just one more" psychology
2. **Loss Chasing**: Loss outcomes are immediately followed by player attempts to recover
3. **Attention to Marginal Improvements**: Two-match wins feel rewarding despite tiny payouts
4. **YOLO Strategy**: Max Bet feature encourages all-or-nothing plays

### Satirical Intent

1. **Token Billing Critique**: Mimics the abstract "token" billing system used by LLM APIs
2. **Inference Cost Absurdity**: Makes visible the hidden cost of AI queries
3. **Hallucination Humor**: "Hallucinations" counter pokes fun at AI limitations
4. **Marketing Overblown Claims**: UI language uses hyperbole ("Finally Works™", "Working as intended™")
5. **VC Startup Mentality**: Max Bet button encourages "yeet all tokens at once" behavior

### Tone

- **Gently satirical** rather than harsh - the joke is at AI hype, not users
- **Self-aware** - messages acknowledge the absurdity in-game
- **Lighthearted** - uses emojis, puns, and gaming language
- **Not preachy** - lets players discover the humor through gameplay

## Accessibility Features

- Keyboard support: SPACE bar to spin
- Color contrast: High contrast gradients and neon colors
- Large symbols: Emoji at 3.5em for visibility
- Responsive design: Works on mobile and desktop
- Clear button states: Disabled buttons visually distinct
- Semantic HTML: Proper form inputs and labels

## Technical Implementation

### State Management

- Single `gameState` object tracks: tokens, totalSpent, hallucinations, isSpinning
- Updates reflected immediately in DOM
- No external dependencies - vanilla JS only

### Animation

- Reel spin animation at 0.1s per frame (10 rotations/second)
- 20-30 random rotations per spin for randomness feel
- 2.5s total spin duration including evaluation
- Pulse animation for win/loss messages

### Browser APIs Used

- No external libraries
- Standard DOM APIs: `querySelector`, `addEventListener`, `classList`
- Promise-based async/await for animation sequencing
- `setTimeout` and `setInterval` for timing
- Standard CSS animations and transitions

## Future Enhancement Ideas

- Persistent high scores (localStorage)
- Sound effects (win/loss chimes, slot machine click)
- Multiplier mode (progressive stakes)
- Daily free spins
- Achievement system ("Broke in under 1 minute", "Won 10 in a row", etc.)
- Themed symbol sets (Crypto winter edition, OpenAI rollout edition, etc.)
- Leaderboard integration (who lost tokens fastest?)
- Accessibility: Screen reader support, ARIA labels
