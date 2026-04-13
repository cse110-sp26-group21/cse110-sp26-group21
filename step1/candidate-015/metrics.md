# AI Token Slot Machine - Game Metrics & Design

## Overview
A satirical slot machine web app themed around AI product industry tropes, token billing models, and LLM quirks. Players gamble with a token-based currency, experiencing the financial realities of AI inference costs and overhyped marketing promises.

## Game Mechanics

### Currency System
- **Starting Balance**: 1,000 tokens
- **Spin Cost**: 25 tokens per pull
- **Sustainability**: Players can theoretically sustain ~40 unprofitable spins before bankruptcy

### Symbols & Payouts
Six distinct symbols represent different aspects of the AI industry:

| Symbol | Meaning | Solo Payout | Pair Payout | Jackpot (×3) |
|--------|---------|-------------|-------------|--------------|
| 💭 Hallucination | LLM confabulation | 50 | 100 | 150 |
| 💰 Tokens | Revenue/billing | 200 | 400 | 600 |
| 🔧 Inference | Compute costs | 75 | 150 | 225 |
| 📈 AI Hype | Overvaluation | 150 | 300 | 450 |
| 🐛 Bug Fix | Model reliability | 100 | 200 | 300 |
| 🤥 LoRA | Fine-tuning workaround | 60 | 120 | 180 |

### Win Conditions
1. **Jackpot** (all 3 match): 3× symbol payout + animation/celebration
2. **Minor Win** (2 match): base payout, reduced celebration
3. **Loss**: no payout, satirical loss message

### Probability
- Each reel: 1 in 6 chance per symbol per spin
- Jackpot odds: (1/6)³ = 1 in 216 (~0.46%)
- Any pair odds: ≈ 4.63%
- House advantage: ~67% over time (only 25 tokens cost per turn vs. ~30% expected return)

## Design Philosophy

### Satirical Tone
The game gently mocks:
- **Token billing madness**: "Your tokens have been successfully invoiced."
- **Hallucinations**: Winning when you shouldn't
- **Inference costs**: Staggeringly high payouts for losses
- **LoRA/Fine-tuning**: Questionable workarounds presented as solutions
- **Marketing hyperbole**: "We're worth more than Apple, trust us bro."

### UI/UX Themes
- **Cyberpunk aesthetic**: Neon cyan/green on dark background, mimicking terminal/AI interfaces
- **Retro gaming**: Classic slot machine structure with digital twist
- **Financial transparency**: Stats dashboard shows accumulated losses/wins (usually net negative)
- **Warnings**: Token depletion warnings get progressively more dire

### Core Messages (Sample)
**Winning messages** (15 variations):
- "Finally! A hallucination that paid off!"
- "We promise this wasn't a training accident."
- "Tokens converted to venture capital debt."

**Losing messages** (15 variations):
- "The model has spoken... and it says 'no.'"
- "Your money goes brrrrr (away)."
- "Gradient descent into poverty."

**Critical warnings** (3 levels):
- 100+ tokens: none
- 50-99 tokens: "Critical token shortage detected!"
- <50 tokens: "Bankruptcy imminent. Pivoting to consulting."

## State Management
- Tokens: displayed in large, glowing text
- Total Spent: cumulative tokens wagered
- Total Won: cumulative tokens earned
- Spin Count: number of pulls
- Net Balance: (current tokens - 1000) with color coding (green if positive, red if negative)

## Technical Implementation

### Vanilla Stack
- **HTML5**: Semantic structure, no templating
- **CSS3**: Animations, gradients, flexbox/grid, transitions
- **Vanilla JavaScript (ES6)**: Class-based state management, no frameworks

### Key Features
- Reel animation using CSS keyframes
- Win detection logic with three-way matching
- Token validation before spin
- Responsive design (mobile-friendly down to 320px)
- No external dependencies

### Browser APIs Used
- DOM manipulation (querySelector, addEventListener, classList)
- CSS animations (animate spinning reels)
- Math.random() for symbol selection
- localStorage opportunity (not implemented; could save state)

## Design Assumptions

1. **Player expectations**: Users assume they'll win more than they lose (a common cognitive bias the game exploits)
2. **Engagement over fairness**: Win messages are more elaborate than loss messages, encouraging continued play
3. **Visible losses**: The stats board's "Net Balance" prominently displays cumulative losses
4. **Reset option**: Players can restart, creating a "one more try" loop
5. **No real money**: Purely entertainment; satirizes real AI products without actual stakes
6. **Accessibility**: All text is readable, high contrast colors, no animation required to understand

## Future Enhancement Ideas
- LocalStorage persistence (resume across sessions)
- Leaderboard (spins survived before bankruptcy)
- Difficulty modes (higher spin costs, lower payouts)
- Special events (e.g., "x2 week: double payouts")
- Sound effects (retro arcade beeps for spins)
- Multiplayer leaderboard via backend
- Model-specific symbols and unique flavor text

## Metaphor Mapping

| Slot Machine Element | AI Industry Parallel |
|----------------------|---------------------|
| Player's tokens | Company cash reserves / Customer budget |
| Spin cost | Inference API costs |
| Symbols | Different product features/problems |
| Jackpot | Viral consumer adoption |
| Repeated losses | VC funding rounds with declining returns |
| "House advantage" | Investor profits vs. user value |
| Reset button | Rebrand/pivot announcement |

---

*Created as a commentary on the AI industry's speculative nature and token-based pricing models. No actual AI products were harmed in the making of this game.*
