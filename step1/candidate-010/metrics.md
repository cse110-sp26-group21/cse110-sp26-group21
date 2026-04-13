# AI Token Casino - Game Metrics & Design Documentation

## Overview
**AI Token Casino** is a satirical web-based slot machine game that pokes fun at AI product hype, token billing, hallucinations, and the abstract nature of "inference costs." Players spin reels featuring AI-themed symbols, betting tokens they manage throughout play.

---

## Game Mechanics

### Core Rules
- **Starting Balance**: 1,000 tokens
- **Spin Cost**: 50 tokens per spin
- **Win Conditions**:
  - **Three Matches** (Jackpot): 8× the bet (400 tokens won, 350 net profit)
  - **Two Matches**: 1.5× the bet (~75 tokens returned, 25 token loss after cost)
  - **No Matches**: 0 tokens returned (50-token loss)

### Symbols
Six AI-themed symbols rotate through the reels:
1. **Hallucination** - When the model confidently lies
2. **Inference Cost** - Your tokens burning in the cloud
3. **Model Collapse** - When everything breaks
4. **Token Drain™** - The feeling you get using the service
5. **API Timeout** - Waiting for enlightenment
6. **Prompt Injection** - Security vulnerability meets game mechanic

---

## Design Assumptions

### Player Behavior
- Players understand they're in a satirical game, not a real investment system
- Average session length: 10-30 spins before running out of tokens
- Some players will attempt the Konami code easter egg
- Most players will eventually lose all tokens (as intended)

### Balance Philosophy
- **Win Rate**: ~33% (3 matches ≈ 4-5%, 2 matches ≈ 28%)
- **Revenue** (in-game token flow): The house margin is approximately 110% (players lose ~50 tokens per spin on average)
- **Engagement**: Frequent wins (even small ones) keep engagement, consistent losses ensure tokens run out
- **No Real Spending**: All currencies are fictional; frustration is the only real cost

### Accessibility Features
- High contrast cyberpunk aesthetic (cyan/magenta on dark background) aids visibility
- Large, readable fonts and buttons for mobile
- Responsive design for all screen sizes
- Reduced-motion support for users with motion sensitivities
- Clear feedback and messaging for all game states

---

## Technical Implementation

### Architecture
- **Pure Vanilla JavaScript**: No frameworks or dependencies
- **Browser APIs Only**: CSS animations, DOM manipulation, local window state
- **No Persistence**: Game state resets on page refresh (intentional design)

### Key Components

#### Reel System
- Each reel displays 8 items (symbols repeated for seamless loop)
- Animation: Rapid spin (0.1s) to smooth deceleration (0.5s)
- Final position calculated from random index × 60px per item
- Visual "window" overlay marks the winning symbol zone

#### Win Detection
- Results array of 3 random indices (0-5)
- Check for exact matches: all three equal (jackpot), any two equal (near-win), none equal (loss)
- Payout calculated before animations complete

#### State Management
- Global variables: `playerTokens`, `isSpinning`, `totalSpins`, `totalSpent`
- No external storage—intentionally ephemeral
- UI updates reactive to state changes

---

## Satirical Elements

### Themes Mocked
1. **Token Billing**: Framing arbitrary charges as "inference costs"
2. **Hallucinations**: Making losing feel like the model is learning
3. **Marketing Hype**: Phrases like "Prophecy Fulfilled" for random wins
4. **Rugged Returns™**: Cryptocurrency vibes applied to AI
5. **Overfitting/Training**: Losing tokens is "necessary sacrifice" for model improvement
6. **Jargon Overload**: Mixing real AI terms with absurd gambling rhetoric

### Humor Devices
- Rebranding losses: "tokens evaporated," "quantum tunneled away"
- Needing wins to "nearly breakeven" (cost exceeds returns)
- Disclaimer: "tokens are not real currency" (they're already not real)
- Tagline: "Your tokens were always just probabilities anyway"

---

## Metrics & Balance Data

### Expected Session Statistics
| Metric | Value |
|--------|-------|
| Starting Tokens | 1,000 |
| Cost per Spin | 50 |
| Max Spins (if all losses) | 20 |
| Average Tokens Won per Spin (3-match) | +350 |
| Average Tokens Lost per Spin (no match) | -50 |
| Win Probability (all 3 match) | ~4% (1 in 216) |
| Win Probability (any 2 match) | ~28% |
| Overall House Margin | ~110% |

### Engagement Targets
- **Short Session**: 5-10 spins → Mild frustration → Quit
- **Medium Session**: 10-20 spins → Occasional win → Takes risk → Loses
- **Long Session**: 20+ spins → Pattern-seeking → Eventual loss
- **Cheat Code**: Adds 500 tokens (10 spins worth)—reward for engagement

---

## Easter Eggs

### Konami Code: B + A
- Unlocks "CHEAT MODE"
- Grants 500 bonus tokens (10 additional spins)
- Message displays: "⚠️ CHEAT MODE ACTIVATED - AI overlords have rewarded you"
- Rewards curious, engaged players without breaking gameplay

### Console Messaging
- Browser console (F12) displays satirical welcome message
- Styled cyan/magenta to match game aesthetic
- Encouraging players to investigate and play with code

---

## Accessibility & Performance

### Responsive Breakpoints
- **Desktop** (> 768px): Full 3-reel display, 120px reel width
- **Tablet** (481-768px): Medium reels, 100px width
- **Mobile** (< 480px): Compact reels, 85px width, stacked controls

### Performance
- No external API calls
- Animation FPS: ~60fps (CSS animations, not JS)
- Bundle size: ~3 files, <20KB total
- Load time: Instant (no network dependencies)

### Motion Support
- `prefers-reduced-motion` media query respected
- Falls back to instant transitions for users with vestibular issues

---

## Future Enhancement Ideas (Not Implemented)

- **Leaderboards**: Track best single-spin wins across sessions
- **Achievements**: Badges for hitting specific milestones
- **Sound Effects**: Muted by default, toggle in settings
- **Difficulty Modes**: Hard (higher costs), Easy (longer plays for demos)
- **Narrative Progression**: "Levels" of AI marketing hype to satirize
- **Custom Token Names**: Players rename currency (e.g., "Hallucination Bucks")

---

## Design Philosophy

The AI Token Casino is a **commentary disguised as entertainment**. Every element—from symbol names to payout odds—reinforces the joke that token-based AI pricing feels arbitrary, opaque, and unserious. Players should finish a session either laughing at the absurdity or frustrated in a way that mirrors real AI product frustration.

**Goal**: Make people think about tech spending through dark comedy. 🎰💸
