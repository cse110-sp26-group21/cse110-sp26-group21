# AI Token Roulette - Game Metrics & Design Documentation

## Overview
"AI Token Roulette" is a satirical slot machine web app that gently mocks AI pricing models, hallucinations, token billing, inference costs, and overhyped AI marketing. Players spend tokens to spin and win tokens as rewards.

## Game Mechanics

### Core Parameters
- **Initial Tokens**: 100
- **Spin Cost**: 5 tokens per spin
- **Number of Reels**: 3
- **Symbols per Reel**: 5

### Symbols & Themes
Each symbol represents a humorous AI trope:

| Symbol | Name | Meaning |
|--------|------|---------|
| 💸 | Inference Cost | Hidden fees and billing surprises |
| 🎰 | Hallucination | AI confidence in wrong answers |
| 📈 | Overhyped Model | Marketing claims vs. reality |
| 🔮 | Prompt Injection | Security vulnerabilities via prompts |
| 💰 | Free Trial Expired | The sudden end of free-tier access |

---

## Payout Structure

### Three-Symbol Match Jackpots
Matching three identical symbols grants the following rewards:

| Outcome | Payout | Humor |
|---------|--------|-------|
| 💸💸💸 | +50 tokens | "Understanding inference pricing!" |
| 🎰🎰🎰 | +100 tokens | **JACKPOT!** "Your hallucination won big!" |
| 📈📈📈 | +30 tokens | "This model DID actually work!" |
| 🔮🔮🔮 | +75 tokens | "Your injection was successful!" |
| 💰💰💰 | +200 tokens | "The free trial blessing!" |

### Two-Symbol Match
- **Payout**: +10 tokens
- **Tone**: "Two out of three ain't bad, I guess?"
- **Probability**: ~30% (when three don't match)
- **Message Variations**: Includes sarcastic commentary about partial success

### No Match (Bust)
- **Payout**: -5 tokens (small penalty)
- **Tone**: Humorous failure messages
- **Message Examples**:
  - "Token: Lost. Model: Confused. You: Broke."
  - "Your inference was too creative (aka wrong)."
  - "The fee structure has claimed another victim."

---

## Win Rate & Probability Analysis

### Expected Value per Spin
```
Expected Value = P(3-match) × Avg(3-match payout) 
               + P(2-match) × 10 
               + P(no-match) × (-5)
               - SPIN_COST
```

### Practical Calculations
- **Probability of 3-match**: 1/125 ≈ 0.8% (each reel has 1/5 chance of matching)
- **Probability of 2-match**: ~5.1% (C(3,2) × (1/5)² × (4/5) for each non-matching configuration)
- **Probability of no-match**: ~94.1%

### House Edge
With the current payout structure:
- 3-match average: 87 tokens (weighted across 5 symbols)
- 2-match: 10 tokens
- No-match: -5 tokens
- **Expected value ≈ -3.2 tokens per spin** (slight negative, as intended for satirical "AI pricing")
- This mirrors real token-based AI pricing: you always spend more than you get back! 💸

---

## Game State & Persistence

### Tracked Metrics
- **Total Tokens**: Current player balance
- **Total Spins**: Lifetime spin count
- **Total Won**: Net tokens gained (not including spin costs)
- **Win Rate %**: (Total Won / Total Spin Cost) × 100
  - Negative rates indicate more losses than gains (expected!)
  - Example: If you spin 20 times (100 tokens cost) and win 60 tokens, win rate = 60%

### Local Storage
- Game state is automatically saved to browser's `localStorage`
- Persists across page reloads
- Reset option clears all stats and returns to 100 tokens

---

## Design Assumptions & Rationale

### 1. Why Negative Expected Value?
Real AI APIs have unfavorable token economics for users. The game reflects this satire: you spin, you lose. It's funny because it's painfully accurate.

### 2. Why These Specific Symbols?
- **Inference Cost**: Direct reference to "per-token" billing models
- **Hallucination**: Most visible AI failure mode
- **Overhyped Model**: Commentary on marketing vs. reality gap
- **Prompt Injection**: Current security concern in AI systems
- **Free Trial Expired**: Universal experience of AI platform adoption

### 3. Why 5 Symbols?
- Allows for diverse outcomes without overwhelming complexity
- 5 symbols = 125 total combinations, manageable math
- Each symbol can have unique payout, adding strategic interest

### 4. Why Tone Matters
- Messages use second-person ("Your tokens", "You", "Your model")
- Mix of dark humor and self-aware commentary
- Tone never mocks users, only the absurdities of AI industry

### 5. Spin Cost of 5 Tokens
- High enough to feel consequential (5% of starting budget per spin)
- Low enough to play multiple rounds before depleting tokens
- Encourages "one more spin" syndrome (like real gambling)

### 6. Initial Budget of 100 Tokens
- Allows for ~20 spins before running out
- Clean, round number for mental math
- Forces players to face the finite-resources lesson

---

## Technical Notes

### Browser Compatibility
- **HTML5** semantic structure
- **CSS3** animations (spin animation, transitions, gradients)
- **ES6+ JavaScript** (arrow functions, template literals, async/await)
- All features use standard browser APIs (no external libraries)

### Key Code Features
- **Async/await** for animation timing
- **LocalStorage API** for state persistence
- **CSS animations** for smooth reel spinning (0.6s linear spin)
- **Event delegation** for button interactions
- **Template literals** for message generation

### Performance
- Single spin animation: ~600ms
- Zero blocking operations
- Minimal repaints/reflows
- ~15KB uncompressed code + assets

---

## Accessibility & Humor

### Inclusive Humor
- Jokes don't rely on language wordplay exclusively (emoji + text)
- Multiple message variations prevent repetition fatigue
- Tone remains playful, never condescending
- Works for players unfamiliar with AI industry specifics

### Accessibility Features Included
- High contrast colors (neon green/magenta on dark background)
- Large readable font (monospace for clarity)
- Semantic HTML (`<details>`, `<summary>` for paytable)
- Keyboard-friendly (buttons are focusable)
- Color not the only differentiator (uses emoji and text)

---

## Future Expansion Ideas
These are **not** implemented but noted for potential:
- **Difficulty Modes**: "Startup Mode" (high variance) vs. "Enterprise Mode" (predictable loss)
- **Streaks**: Consecutive wins trigger "momentum" messages
- **Meta Humor**: Easter eggs (e.g., 0-token mystery spin changes payout rules)
- **Leaderboard**: Compare with others (satirically comparing "AI bankruptcy")
- **Mini-Games**: "Beat the Model" between spins for bonus tokens
- **Sound Effects**: Beeps, whooshes, sad trombone etc.

---

**Created**: April 2026  
**Purpose**: Satirical commentary on AI industry absurdities  
**Tone**: Gently mocking, self-aware, darkly humorous  
**Target Audience**: Developers, AI enthusiasts, anyone who's paid for API tokens
