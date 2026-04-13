# AI Token Roulette - Game Metrics & Design Document

## Overview
**AI Token Roulette** is a satirical slot machine web app that parodies AI products, token billing models, and the hype surrounding artificial intelligence. Players spend virtual tokens to spin reels and win multiplied payouts based on AI-themed symbols.

---

## Game Mechanics

### Core Loop
1. Player selects bet amount (10, 50, 100, or 500 tokens)
2. Player clicks "SPIN YOUR FORTUNE AWAY" button
3. Tokens are deducted from balance
4. Reels spin with smooth animation (2 seconds total)
5. Results are evaluated and payouts are calculated
6. Balance is updated with winnings/losses

### Symbols (7 Total)
All symbols are AI-themed and satirical:

| Symbol | Theme | Notes |
|--------|-------|-------|
| 🧠 Hallucination | AI generates false information | Common & unreliable |
| 🔥 Inference Burn | GPU compute costs | Expensive! |
| 💸 Token Drain | Token billing model | HIGHEST PAYOUT (100x) |
| 📊 Bias | Model bias problems | Moderate payout (25x) |
| 🎲 Model Collapse | Training failures | Uncommon payout (20x) |
| 🌀 Prompt Injection | Security vulnerability | Moderate payout (15x) |
| ⚡ Latency Spike | Response delays | Low payout (10x) |

---

## Win Conditions & Payouts

### Three of a Kind (Primary Wins)
| Match | Multiplier | Payout Example (100 token bet) |
|-------|-----------|-------------------------------|
| 🧠🧠🧠 Hallucinations | 50x | 5,000 tokens |
| 🔥🔥🔥 Inference Burn | 50x | 5,000 tokens |
| 💸💸💸 Token Drain | 100x | 10,000 tokens ⭐ JACKPOT |
| 📊📊📊 Bias | 25x | 2,500 tokens |
| 🎲🎲🎲 Model Collapse | 20x | 2,000 tokens |
| 🌀🌀🌀 Prompt Injection | 15x | 1,500 tokens |
| ⚡⚡⚡ Latency Spike | 10x | 1,000 tokens |

### Two of a Kind
- Any two matching symbols: **2x bet** payout
- Example: 100 token bet = 200 tokens won

### No Match
- Loss: Player loses entire bet amount

---

## Probability & Odds

### Win Distribution (Algorithm)
The game uses weighted random selection to create realistic odds:

| Outcome | Probability | Description |
|---------|-------------|-------------|
| Complete Loss (no match) | 65% | Three different symbols |
| Minor Win (2 match) | 25% | Two identical symbols |
| Good Win (3 match, not jackpot) | 8% | Three matching non-jackpot symbols |
| **JACKPOT** (Token Drain × 3) | 2% | Rarest win - 100x multiplier |

### House Edge
- **Expected Loss per Spin**: ~12-15% of bet
- **Volatility**: High (typical slot machine style)
- **Player Return Rate (RTP)**: ~85-88%

---

## Game Balance Assumptions

### Starting Capital
- Players start with **1,000 tokens**
- Enough for ~10-15 spins at 100 token bet

### Bet Sizes
- Minimum: 10 tokens (microtransaction feel)
- Maximum offered: 500 tokens (high-risk premium)
- Default: 100 tokens (balanced middle ground)

### Token Economy Rationale
- **Satirizes token billing models** used by AI API providers
- Players experience "token drain" similar to ChatGPT Plus bills
- Occasional big wins provide dopamine hook (like real slots)
- Most players will gradually lose tokens (realistic gambling experience)

---

## Design Philosophy & Satire

### AI Theme
Every element mocks overhyped AI products:
- **"Hallucination" wins** = Funny payout for AI's most famous flaw
- **"Token Drain" Jackpot** = Real problem with API billing ($$$)
- **"Inference Burn" & "Latency Spike"** = Actual operational issues
- **"Model Collapse"** = Training disaster scenario
- **High payouts for "Bias"** = Ironic given real AI bias problems

### UI/UX Satire
- "Definitely Real Intelligence™" tagline
- "Definitely Legal Gambling Corp" footer
- Overly dramatic button: "SPIN YOUR FORTUNE AWAY"
- Warning about "responsible token spending"
- Payout table presented as legit financial instrument

### Tone
- Gentle mockery, not mean-spirited
- Self-aware humor about AI marketing
- References to real problems (hallucinations, token costs)
- Acknowledgment it's entertainment with fictional tokens

---

## Technical Implementation

### Architecture
- **Pure vanilla JavaScript** - No frameworks needed
- **CSS Grid/Flexbox** - Responsive design
- **CSS Animations** - Smooth reel spinning
- **LocalStorage-ready** - Could persist game state (not implemented)

### Key Functions
- `spin()` - Main game loop trigger
- `generateResults()` - Weighted random outcome generation
- `animateReels()` - Visual reel spinning with cascade effect
- `calculatePayout()` - Win/loss evaluation algorithm
- `updateUI()` - Balance and state display refresh

### Performance Notes
- Reels animate at ~60fps (browser dependent)
- Spin duration: 2 seconds (feels satisfying)
- Cascade delay: 150ms between reels (arcade feel)
- No lag on modern browsers (minimal computation)

---

## Accessibility & Inclusivity
- ✅ Semantic HTML structure
- ✅ Emoji + text labels (inclusive)
- ✅ High contrast colors (readable)
- ✅ Large touch targets (mobile-friendly)
- ✅ Responsive design (works on all screens)
- ⚠️ Could add: ARIA labels, keyboard navigation

---

## Future Enhancement Ideas
1. **Sound effects** - Reel spin sounds, win cha-ching
2. **Persistent storage** - LocalStorage for session resumption
3. **Leaderboard** - Daily high score tracking
4. **Animations** - Particle effects on big wins
5. **Mobile app** - PWA wrapper for App Store submission
6. **Additional symbols** - More AI topics (RAG, Fine-tuning, etc.)
7. **Themed variants** - "Crypto Casino" or "NFT Roulette"

---

## Disclaimer
This is a **satirical entertainment project** using fictional tokens. No real money is involved. The game is designed to gently mock AI industry trends and token-based billing models through humor and absurdity.

*"We may or may not actually pay you."* 💸
