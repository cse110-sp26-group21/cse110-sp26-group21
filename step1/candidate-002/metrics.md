# AI Token Slots™ - Game Metrics & Design Documentation

## Overview
**AI Token Slots™** is a satirical slot machine web application that parodies the AI industry's obsession with token billing, overhyped products, hallucinations, and incomprehensible marketing language. The game is purely for entertainment and makes light of common industry practices.

## Game Mechanics

### Token Economy
- **Starting Tokens**: 100 🎫
- **Spin Cost**: 10 tokens per spin
- **Income**: 0 tokens naturally; players can only reduce losses by winning
- **Session Tracking**: Game tracks cumulative losses to show how much has been "burned" on inference costs

### The Six Symbols
Each symbol represents an AI industry archetype:

| Symbol | Meaning | Reference |
|--------|---------|-----------|
| 💰 | Profit? | The mythical profitability of AI ventures |
| 🚀 | To the Moon | Startup euphoria and unfounded optimism |
| 📊 | Definitely Not Fake Data | Synthetic data passing as "real" training data |
| 🎱 | Magic 8-Ball | Confidence without accuracy; black-box predictions |
| 💭 | Hallucination Alert! | Models confidently making up facts |
| 🤷 | "We Don't Know Either" | Transparent incompetence (rarest honesty in AI) |

## Win Conditions & Payouts

### Three of a Kind (Weighted Outcomes)
| Outcome | Symbols | Payout | Probability | Flavor Text |
|---------|---------|--------|------------|-------------|
| **Hallucination Triple** | 💭💭💭 | 0 tokens | 20% | "You imagined you won" (worst outcome, most likely) |
| **No Idea Triple** | 🤷🤷🤷 | 5 tokens | 15% | "We trained on this," CEO loosens tie |
| **Magic 8-Ball Triple** | 🎱🎱🎱 | 90 tokens | 6% | "The oracle has spoken (Ask again later)" |
| **Three Data** | 📊📊📊 | 100 tokens | 7% | Synthetic data jackpot; peer review incoming |
| **Three Moon** | 🚀🚀🚀 | 120 tokens | 5% | To the moon (after $50 in fees) |
| **Three Profit** | 💰💰💰 | 150 tokens | 8% | PROFIT MODE (taxes not included) |

### Two of a Kind
- **Payout**: 30 tokens
- **Probability**: 18%
- **Message**: "Statistically insignificant, but you'll take it 😅"

### One Matching Pair
- **Payout**: 3 tokens
- **Probability**: 15%
- **Message**: "Better luck next spin... or don't bother"

### No Matches
- **Payout**: 0 tokens
- **Probability**: 10%
- **Message**: "The algorithm has spoken. Your tokens await the void. 🌑"

## Expected Value Analysis
The game is **intentionally unfavorable** (like real token billing!):

- **Average Spin Cost**: 10 tokens
- **Weighted Average Payout**: ~8.5 tokens (calculated from all probabilities)
- **House Edge**: ~15% (players lose about 1.5 tokens per spin on average)
- **Design Philosophy**: Subtle enough to feel "fair" initially, but the math is rigged—just like AI pricing models

## Technical Implementation

### Technologies Used
- **HTML5**: Semantic markup, accessibility
- **CSS3**: Grid layout, animations, gradients, pseudo-elements
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation
- **Browser APIs**: localStorage-ready (current version doesn't persist, but easily extensible)

### Key Features
1. **Smooth Animations**: CSS transforms for reel spinning
2. **Keyboard Support**: Press spacebar to spin (accessibility + UX)
3. **Responsive Design**: Works on mobile, tablet, and desktop
4. **Real-time Stats**: Live token count, inference cost, session losses display
5. **Button State Management**: Disables spin button when insufficient tokens or spin in progress
6. **Visual Feedback**: Celebrate animation for wins, color-coded messages

### File Structure
```
slot-machine/
├── index.html      # Main game UI and structure
├── styles.css      # All styling and animations
├── script.js       # Game logic and state management
└── metrics.md      # This file
```

## Design Assumptions & Satirical Elements

### Why This Game?
The game satirizes:
1. **Token Billing**: AI companies charging by the token, obscuring true costs
2. **Hallucinations**: Models "confidently" producing nonsense
3. **Overhyped Marketing**: "To the moon," "revolutionary," "AGI in 5 years"
4. **Synthetic Data**: Training on machine-generated data to cut costs
5. **Black-Box Models**: 🎱 represents the "magic" nobody understands
6. **Data Privacy Concerns**: You're gambling away tokens (your data metaphor)

### Tone
- **Humorous**: Doesn't take AI seriously or itself seriously
- **Accessible**: No deep industry knowledge required to find jokes funny
- **Self-Aware**: Game openly admits it's rigged ("...we mean, 'algorithmically optimized'")
- **Lighthearted**: Not bitter or angry (yet)

### The "House Edge"
Just like casinos, the game is designed to extract tokens over time. This mirrors real AI companies:
- You think you're winning with each smart purchase
- You don't realize the total cost until you've lost a lot
- The odds are mathematically against you

## Future Enhancement Ideas (Not Implemented)
- LocalStorage persistence (save session between reloads)
- Leaderboard (who's lost the most?)
- "AI Model" difficulty selector (Easy = fair 50%, Medium = current 15% edge, Hard = 50% edge)
- Combo multipliers for consecutive three-of-a-kind wins
- Token shop (buy more tokens IRL? 👀)
- Sound effects (beeping, crash sounds for losses)
- Dark/light mode toggle
- Settings page for adjusting spin cost

## Accessibility Notes
- ✅ Semantic HTML structure
- ✅ Color contrast in "Courier New" monospace (high contrast on dark background)
- ✅ Keyboard navigation (spacebar support)
- ✅ Large touch targets for mobile
- ✅ Clear status messages (not relying solely on color)
- ⚠️ Could add ARIA labels for screen readers (enhancement)
- ⚠️ Sound would need mute/unmute controls

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6 (template literals, arrow functions, const/let)
- CSS uses modern grid and flexbox (IE 11 not supported, intentionally)

---

**Remember**: This is a parody. No real AI was hallucinated in the making of this game. Much. 😅
