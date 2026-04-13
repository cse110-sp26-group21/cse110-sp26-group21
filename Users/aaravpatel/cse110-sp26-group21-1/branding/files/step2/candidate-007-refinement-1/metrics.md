# TokenRush AI™ - Game Metrics & Design Document

## Overview
TokenRush AI™ is a satirical slot machine web app that parodies AI industry practices, particularly focusing on token-based billing, inference costs, marketing hype, and model hallucinations. Players spend tokens to spin a slot machine and win larger token payouts based on matching symbols.

---

## Game Balance Metrics

### Starting Resources
- **Initial Token Balance**: 1,000 tokens
- **Cost Per Spin**: 10 tokens
- **Spins Available** (without winning): 100 spins before bankruptcy

### Symbol Payout Structure

| Symbol | Name | Multiplier | Payout (2-match) | Meaning |
|--------|------|-----------|------------------|---------|
| 🪙 | Token | 2x | 20 tokens | One token makes two (the dream) |
| ✨ | Hype | 5x (10x jackpot) | 50 tokens | Overhyped AI products |
| 🤖 | Robot | 3x | 30 tokens | The algorithm provides |
| ❌ | Loss | 0x | 0 tokens | Model hallucination |
| 💸 | Inference Cost | 0x | 0 tokens | Money disappears to cloud |
| 🎲 | Gamble | 1x | 10 tokens | Break even |
| 📈 | Fake Gains | 0x | 0 tokens | Ironic chart goes down |
| ⚠️ | Model Warning | 0x | 0 tokens | Red flag ignored |

### Win Conditions

#### Two Symbols Matching
- **Probability**: ~8-12% per spin (depends on distribution)
- **Base Payout**: Spin cost (10) × Symbol multiplier
- **Example**: Two 🪙 symbols = 10 × 2 = 20 tokens gained (net +10 after spin cost)

#### Three Symbols Matching (Jackpot)
- **Probability**: ~3-5% per spin
- **Payout Multiplier**: 3× (for all-three bonus)
- **Base Multiplier Applied**: Symbol's base multiplier
- **Special Rule**: ✨ (Hype) gets 10× base multiplier on jackpot instead of 5×
- **Max Jackpot**: 300 tokens (all Hype symbols: 10 × 10 × 3)

#### Most Common Outcomes
- **Loss/No Match**: ~80-85% of spins
- **Break Even (~1x)**: ~5% of spins
- **Minor Win (2-3x)**: ~10-12% of spins
- **Major Win (5x+ or Jackpot)**: ~2-5% of spins

---

## Game Progression Theory

### Expected Value Analysis
- **Spin Cost**: -10 tokens
- **Average Win per Spin**: ~0.5-1.5 tokens (negative)
- **Long-term Outcome**: Gradual bankruptcy (as God intended for gambling)
- **Session Length**: Approximately 100-150 spins until bankruptcy (varies with luck)

### Player Psychology (Satirically)
1. **Phase 1: Optimism** (Spins 1-20)
   - Player believes they can beat the odds
   - Confidence: "This algorithm can't be THAT rigged"

2. **Phase 2: Doubt** (Spins 40-80)
   - Losses are mounting
   - Confidence: "The model is clearly hallucinating"

3. **Phase 3: Acceptance** (Spins 100+)
   - Token bankruptcy imminent
   - Confidence: "Just as expected, even the casino is trained on bad data"

---

## Design Assumptions & Humor

### AI Industry Satire Elements
- **Token Billing**: Players spend tokens (mimicking ChatGPT, Claude, etc. token billing)
- **Inference Costs**: Spin = running inference; costs money; may hallucinate results
- **Model Hallucination**: ❌ and 💸 symbols represent wrong answers that cost money
- **Hype Culture**: ✨ symbol has inflated payouts despite no actual value
- **Marketing BS**: Tagline includes caveats about hallucinations and accuracy
- **Fake Gains**: 📈 symbol ironically loses money (pump & dump schemes)

### Randomization Fairness
- All 8 symbols weighted equally (12.5% chance each)
- No house bias (honestly; most real casinos aren't honest)
- Results appear random due to human perception bias

### Edge Cases Handled
- **Insufficient Funds**: Player cannot spin if balance < 10 tokens
- **Bankruptcy**: Game ends with message when balance = 0
- **Integer Overflow**: Using JavaScript's safe integers (up to 2^53)

---

## Engagement Metrics

### Tracked Statistics
| Stat | Purpose |
|------|---------|
| Total Tokens | Primary metric of success/failure |
| Total Spins | Engagement measure (sessions typically 100-150 spins) |
| Biggest Win | Best-case scenario witness |
| Model Confidence | Humorous commentary on recent outcomes |

### Messages
- **56 unique dynamic messages** across different outcome types
- Randomized message selection prevents repetition fatigue
- Tone: Satirical, gently mocking AI hype

---

## Platform API Usage

### Browser APIs Used
- **DOM API**: For element manipulation and updates
- **CSS Animations**: For reel spinning visual feedback
- **LocalStorage**: Could be added for persistent storage (optional)
- **No Framework**: Pure vanilla JavaScript (as requested)

### Accessibility Considerations
- Semantic HTML structure
- Keyboard support (Ctrl+T to add tokens, Ctrl+L to lose all for testing)
- Color contrast: Gold/white on purple/red gradients
- Button focus states and disabled states clear

---

## Future Enhancement Ideas (Beyond Scope)

- **LocalStorage Persistence**: Save game state across sessions
- **Sound Effects**: Slot machine sounds, win/loss audio cues
- **Multiplier Progression**: Unlock better odds as you unlock achievements
- **Leaderboards**: Compare biggest wins with others (would need backend)
- **Dark Mode Toggle**: For those with light-sensitive eyes
- **Mobile Touch Support**: Swipe animations for spin
- **Difficulty Settings**: "Training Run", "Inference", "Production" modes with different odds

---

## Final Notes

TokenRush AI™ is explicitly **not a financial product**, **not actual machine learning**, and **not endorsed by any AI company**. It's a humorous commentary on the AI industry's current hype cycle, token-based billing models, and the widespread use of LLMs for everything, regardless of usefulness.

**Disclaimer**: Results may be hallucinated. Inference costs not guaranteed. Model accuracy not included.

---

**Version**: 1.0  
**Created**: 2026  
**License**: Satirical (use responsibly at parties to annoy ML researchers)
