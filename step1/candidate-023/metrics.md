# AI Token Casino™ - Game Metrics & Design Documentation

## Overview
A satirical slot machine web application that parodies AI product marketing, token-based billing, hallucinations, and overhyped AI models. Players spend tokens to spin reels and win rewards based on matching AI-themed symbols.

---

## Game Mechanics

### Currency System
- **Starting Tokens**: 1,000
- **Cost per Spin**: 100 tokens
- **Minimum to Play**: 100 tokens

### Core Gameplay Loop
1. Player clicks "SPIN FOR MAGIC ✨" button
2. Three independent reels animate with random symbols
3. System checks if all three reels match
4. Win or loss is displayed with humorous commentary
5. Tokens are updated (added on win, subtracted on loss)

---

## Win Conditions & Payouts

### Win Combination Matrix

| Symbol | Payout | Notes | Humor Theme |
|--------|--------|-------|-------------|
| Hallucination | +250 | Most common win | AI confidently being wrong |
| Inference Cost | +500 | Best payout | Expensive computation = profit |
| Prompt Injection | +600 | Highest payout | Hacking the system |
| Marketing Hype | +200 | Medium win | Disruption theater |
| Context Window | +175 | Medium-low win | Model remembers something |
| Token Limit | +150 | Low-medium win | Brevity saves money |
| Training Data | +100 | Lowest regular payout | Plagiarism profit |
| Model Collapse | -500 | Catastrophic loss | Portfolio deletion |

### Losing Spin
- No tokens added or removed beyond the 100-token spin cost
- Random loss message from pool of 4 humorous remarks
- Encourages retry behavior

---

## Design Assumptions

### Player Psychology
- **Loss Aversion Softening**: Humorous messaging makes losses feel like shared jokes rather than defeats
- **Escalation Ladder**: Small wins (100-250 tokens) encourage continued play while big winners (500-600) feel achievable
- **Time to Ruin**: At 100 tokens/spin, new players get ~10 spins before needing a reset
- **Hope Mechanic**: Hallucination is weighted as most likely win, keeping spirits up

### Theme Strategy
- Satire targets AI industry excesses without being preachy
- Token-based economy mirrors real AI pricing models (OpenAI, Anthropic, etc.)
- Symbol names reference actual AI pain points developers experience
- Tone is affectionate teasing, not mean-spirited criticism

### Technical Assumptions
- **Reel System**: 8 symbols per reel, each symbol = 50px height
- **Animation Duration**: Each reel spins for 400-600ms at different rates
- **Probability**: Equal weight on all symbols (no algorithmic bias... ironically)
- **State Management**: Single game state object, no persistence to localStorage
- **Accessibility**: Keyboard controls via standard button interactions

---

## Content & Satire Notes

### AI Industry References
1. **Hallucinations** - Models confidently generating false information
2. **Token Limits** - Short context windows requiring expensive retrieval-augmented generation
3. **Prompt Injection** - Security vulnerability where users break system prompts
4. **Training Data** - Copyright concerns around web-scraped training corpora
5. **Model Collapse** - Recursive training on AI-generated outputs leading to degradation
6. **Inference Costs** - Per-token billing models that reward expensive computations
7. **Marketing Hype** - Overstated claims about AI capabilities and "disruption"
8. **Context Window** - Memory limitations in transformer models

### Humor Approach
- Gentle roasting rather than harsh critique
- Self-aware acknowledgment that this game IS marketing hype
- Running joke: "The odds were hallucinated by our AI"
- Irony: Betting on inference costs actually makes you money

---

## Game Flow States

```
[Start: 1000 tokens]
         ↓
[Spin Available: Tokens ≥ 100]
         ↓
    [Spinning...] (animation: 650ms)
         ↓
  [Check Match] → [Win] → [+reward tokens] → [Update Display]
                    ↓
                  [Loss] → [-0 tokens (cost already deducted)] → [Update Display]
         ↓
[Tokens ≥ 100?] → Yes → [Spin Available]
       ↓ No
[Game Over State - Offer Reset]
```

---

## Key Features

✨ **Reactive UI**: Token count updates instantly, win messages appear with context  
🎯 **Symbol Variety**: 8 themed symbols ensure each spin feels different  
⚡ **Fast Feedback**: 650ms total spin duration keeps momentum  
🎨 **Visual Theme**: Cyberpunk aesthetic with acid green on dark background  
📱 **Responsive**: Works on desktop and mobile devices  
🤖 **Satirical Commentary**: Every element gently mocks AI industry standards  

---

## Design Notes for Future Updates

### Could Add:
- Multiplier bonuses (3-symbol matches in special patterns)
- Progressive jackpot (small % from each spin pools into mega-prize)
- Daily spin free spins to reduce time-to-ruin
- Statistics tracking (total spins, biggest win, etc.)
- Leaderboard via localStorage or backend
- Sound effects / haptic feedback options
- Themed seasonal events ("Black Friday Model Sale", etc.)

### Intentionally Not Included:
- Real money integration (satire, not exploitation)
- Persistence/progression (stateless play, resets only way out)
- Skill elements (pure chance, mocking algorithmic fairness claims)
- Dark patterns (no "almost won" animations, no time pressure)
- P2W mechanics (everyone plays the same odds)

---

## Technical Specifications

**Platform**: Vanilla HTML5/CSS3/JavaScript (no frameworks)  
**Browser Compatibility**: Modern browsers with ES6 support  
**File Size**: ~15KB total (HTML + CSS + JS combined)  
**Performance**: Smooth 60fps animations on standard hardware  
**Accessibility**: Semantic HTML, readable color contrast, keyboard navigation  

---

*Created with satirical intent toward AI marketing practices. No actual tokens or AI models were hallucinating during development (probably).*
