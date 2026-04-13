# AI Token Roulette - Game Metrics & Design Document

## Overview
A satirical slot machine web app that parodies AI product marketing, token billing, hallucinations, inference costs, and overhyped model scaling promises.

## Game Mechanics

### Currency System
- **Starting Balance**: 1,000 tokens
- **Spin Cost**: 10 tokens per spin
- **Goal**: Accumulate tokens through winning combinations

### Reel & Symbol System
- **Number of Slots**: 3 (standard slot machine configuration)
- **Symbols per Reel**: 6 symbols
- **Total Possible Outcomes**: 6³ = 216 combinations

### Symbols & AI Parody Meaning
| Symbol | Name | Satire Reference |
|--------|------|------------------|
| 🤖 | LLM | The mainstream AI model everyone's betting on |
| 💰 | Token | The billing unit that mysteriously multiplies |
| 🐴 | Hallucination | Confident, creative, and completely wrong |
| ❌ | Error | When the API decides it's rate-limited |
| 📊 | Inference | The mysterious black box that costs GPU hours |
| 💥 | Overfitting | Scale everything and pray it generalizes! |

## Paytable & Probabilities

### Winning Combinations (3-of-a-kind matches only)
| Combination | Payout | Probability | ROI |
|------------|--------|-------------|-----|
| 💰💰💰 (Tokens) | 200 | 1/216 (0.46%) | +1,900% |
| 💥💥💥 (Overfitting) | 150 | 1/216 (0.46%) | +1,400% |
| 🤖🤖🤖 (LLM) | 50 | 1/216 (0.46%) | +400% |
| 🐴🐴🐴 (Hallucination) | 75 | 1/216 (0.46%) | +650% |
| 📊📊📊 (Inference) | 60 | 1/216 (0.46%) | +500% |
| ❌❌❌ (Error) | 10 | 1/216 (0.46%) | 0% (break-even) |

### House Advantage
- **Total Winning Outcomes**: 6 (out of 216)
- **Win Probability**: 2.78%
- **Expected Payout per Spin**: (50+200+75+10+60+150) / 216 ≈ 3.10 tokens
- **Cost per Spin**: 10 tokens
- **House Edge**: ~69% (classic casino math!)

### Key Findings
- Only **2.78%** of spins result in a win
- Average player loses **6.90 tokens per spin**
- Without wins, players can spin ~100 times before going broke
- The token economy rewards optimism over mathematics
- Just like real AI companies! 📈

## Design Assumptions

### Player Motivation
1. **Appeal of "Free" Tokens**: Parodying "free tier" AI services that trap users
2. **Cognitive Bias**: Encouraging hopeful spinning despite negative EV (expected value)
3. **Escalation Fantasy**: Big jackpot (💰💰💰) as fantasy of unexpected riches
4. **Session Tracking**: Visual earnings counter to hook players on progress

### Humor & Satire Layers
- **Billing Language**: Tokens as both in-game currency AND mockery of API token pricing
- **Confidence Memes**: Phrases like "100% confidence (it's wrong)" reference AI hallucinations
- **Scaling Hype**: "Overfitting" symbol and "Scale Everything!" tagline mock ML trends
- **Startup Tropes**: Reset messages about "pivoting" and "VC funding" parody fundraising culture
- **Rate Limiting**: Error symbol acknowledges API quota exhaustion stress
- **Inference Costs**: GPU references to the increasingly expensive compute underlying AI

### UI/UX Philosophy
- **Neon Gradient**: Crypto/startup aesthetic (purple & gold) — intentional irony
- **Matrix Font**: Courier monospace evokes 1990s "hacker" vibes
- **Glowing Effects**: Exaggerated visual feedback mimics overhyped product demos
- **Real-time Stats**: Balance, earnings, spin count — treating slot machine as legitimate "investment"

## Technical Implementation

### Technology Stack
- **HTML**: Semantic structure, accessible symbol grid
- **CSS**: CSS Grid, Flexbox, animations, gradients, backdrop filters
- **JavaScript**: Game state management, RNG, DOM updates
- **Platform APIs**: Only standard browser APIs (no frameworks needed)

### Game Loop
1. Player clicks SPIN button (-10 tokens)
2. Reels animate for 600ms with spinning effect
3. RNG generates 3 random outcomes (0-5 per reel)
4. Reels stop at calculated positions
5. System checks paytable for matches
6. Display result message (win/loss/jackpot)
7. Update balances and stats

### Animation Timing
- **Spin Duration**: 600ms (fast enough to feel responsive, slow enough for drama)
- **Message Display**: 4 seconds (unless jackpot, which persists)
- **Reel Position Transition**: Smooth cubic-bezier easing simulates deceleration

## Expansion Ideas (Future)

### Joke Features
- 🎫 "Premium Pass" for faster spins (mock subscription model)
- 📱 "Mobile Exclusive" symbol (parody of app-store games)
- 🔮 "Predictive Reel" that shows the winner beforehand (0% accuracy)
- 💬 ChatGPT-styled reel predictor that confidently guesses wrong
- 🎓 "Training Mode" that costs twice as much but teaches nothing

### Analytics Mock
- "Inference Cost Ratio" — how much you spent vs earned (always negative)
- "Hallucination Frequency" — how many times you got the 🐴 error
- "Token Velocity" — how fast you're burning through balance
- Export data as fake "Model Performance Report"

### Sound & Effects (Optional)
- Slot machine "ka-chunk" sounds
- Dramatic pause audio before reel stop
- Win fanfare (different per payout tier)
- Loss sad trombone (wah-wah-wah)

## Satirical Messaging Examples

### Spin Start
- "Consulting the LLM gods..."
- "Spinning reality into hallucinations..."
- "Running on a potato GPU..."

### Win Messages
- "Your scaling paid off! 🚀"
- "Bullish AI energy detected! 📈"
- "You've achieved semantic alignment with profit!"

### Loss Messages
- "Market corrected. Much pain. Very loss." (doge reference)
- "Your model overfit the casino. F to pay respects."
- "Confidence: 100%. Accuracy: 0%."

### Out of Tokens
- "You've become an unprofitable startup. Time to pivot!"
- "Would you like to pivot to web3?"
- "Subscribe to Token Premium+ for more spins!"

## Conclusion
AI Token Roulette combines the accessibility of a fun game with biting satire about the AI industry. Every game mechanic, symbol, and message is an intentional joke about hype, scaling, costs, and the gap between marketing and reality.

**Remember**: This game has negative expected value, costs GPU hours to build, and probably won't go viral. Just like most AI startups! 🎰🤖📉
