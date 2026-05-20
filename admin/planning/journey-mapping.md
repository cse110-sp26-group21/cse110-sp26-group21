# User Journey Map
## Code Meteor — CSE 110 Group 21 
**Date:** May 9, 2026  


---

## Overview

This document maps the full product lifecycle from the perspective of our target user: a **young learner (ages 10–16)** with little to no programming experience and a shorter attention span, who wants to learn to code in a fun, game-like environment.

The journey is broken into six phases: **Awareness → Onboarding → First Session → Habitual Use → Plateau & Retention → Churn**.


## Phase 1: Awareness — "How did they find us?"

**User state:** Has no knowledge of the product yet.

### Discovery Channels
- Recommended by a teacher or parent looking for coding education tools
- Stumbles upon it via a link on a class website or school portal
- Word-of-mouth from a friend ("there's this game where you destroy meteors by typing code")
- Found while searching for games or coding tools online

### First Impression
- Lands on the app/website for the first time
- Sees a space-themed UI with meteors falling toward Earth
- Immediately understands the core loop: *type code → destroy meteor → save the world*
- The visual style and premise hook them before they even read anything

### User Questions at This Stage
- "Is this actually a game or just a boring tutorial?"
- "Do I need to know how to code already?"
- "Will this be too hard?"

### Design Goals
- Make the value proposition clear in under 5 seconds
- Visual design should communicate "game," not "homework"
- No account required to try the game (low friction entry)

---

## Phase 2: Onboarding — "Getting them started"

**User state:** Intrigued, willing to give it a try. Still skeptical.

### First Steps
- Clicks "Play" or "Start" — no signup wall bc it deters users
- Enters a tutorial level designed around HTML basics (the simplest language tier)
- A short animated intro sets the scene: meteors are incoming, only code can stop them. Give satisfaction from such
- A text block appears inside a meteor — the user is prompted to type it to destroy it

### Onboarding Design Principles
- **No jargon dump** — code is introduced in context, not explained abstractly
- **First meteor is easy** — a short, complete HTML tag (e.g., `<h1>Hello</h1>`)
- **Immediate feedback** — meteor explodes with a satisfying animation on correct input
- **Mistakes are forgiving** — wrong characters are highlighted but don't immediately penalize

### Emotional Arc
- Starts anxious or unsure → becomes confident after first successful meteor destruction
- "Oh wait, I can actually do this" moment is critical to retain and making it simple at the start

### Potential Drop-off Points
- If the first challenge feels too hard or too confusing, they leave immediately
- If the onboarding feels too long or lecture-y, they bounce

---

## Phase 3: First Session — "The first real play experience"

**User state:** Engaged, curious to see what the game actually is.

### Core Loop
1. Meteors fall containing short code snippets (HTML → CSS → JS depending on level)
2. User types the code snippet to destroy the meteor before it hits Earth
3. Meteors increase in speed and frequency as the round progresses
4. If a meteor reaches Earth → dramatic "world gets blown up" animation → round ends
5. Score is shown, streaks are tracked, level progress is displayed

### What Keeps Them Playing
- **Streak system:** Consecutive correct inputs trigger a multiplier or visual reward
- **Escalating difficulty:** Meteors start slow — gives them time to feel competent before things ramp up
- **Level tiers (HTML → CSS → JS):** Provide a clear sense of progression
- **Sound and animation feedback:** Every correct input feels satisfying

### What Frustrates Them
- Typos that feel unfair (especially on mobile) | Adding blocks like scratch?
- Code snippets that are too long or syntactically confusing
- No sense of progress after a failed round

### Design Goals
- Ensure the first session ends on a win or near-win, not a loss spiral
- Show them what's coming next (e.g., "Level 2: CSS unlocked at 500 points")
- Encourage a second session: "Try again?" prompt with their score vs. best score

---

## Phase 4: Habitual Use — "Coming back for more"

**User state:** Has played more than once. Developing a habit or routine.

### Retention Drivers
- **Streak tracking across sessions:** "You're on a 4-day streak — don't break it!"
- **Unlockable content:** New language packs (CSS, JS), new meteor themes, new visual environments
- **Leaderboards (optional):** Competing with friends or classmates adds social motivation
- **Progressive code complexity:** Returning users see longer, more meaningful code snippets, reinforcing learning
- **PWA / Offline support:** Can play during a commute, in class, or without Wi-Fi — lowers friction

### User Behavior Patterns
- Short sessions (5–10 minutes) during breaks or downtime
- Competes with themselves: trying to beat their own high score
- Tries new language packs once they've mastered HTML basics

### Learning Outcomes Emerging
- User starts to recognize HTML tags, CSS properties, and JS syntax from memory
- Pattern recognition develops — they're "reading" code, not just copying it
- Confidence grows: "I kind of know what this does"

---

## Phase 5: Plateau & Retention — "Keeping them engaged long-term"

**User state:** Has mastered the basics. Risk of boredom or feeling "done."

### Plateau Signals
- Score stops improving significantly
- They've cleared all three language tiers (HTML, CSS, JS)
- Playing feels repetitive — same snippets, same patterns

### Retention Strategies
- **Expanded syntax packs:** New content packs (e.g., Python basics, React JSX, Git commands) keep things fresh
- **Challenge modes:** Timed runs, hardcore mode (one miss = game over), or accuracy-only mode
- **Community / social features:** Share scores, challenge a friend, see how classmates rank
- **Seasonal content:** Special meteor themes or code challenges tied to events (hackathons, holidays)
- **Teacher/classroom integration:** If used in a school context, assignments or class leaderboards extend motivation

### Emotional Arc
- "I've beaten this" → "Oh, there's more?" → re-engagement loop

---

## Phase 6: Churn — "When and why they stop"

**User state:** No longer actively using the product.

### Common Churn Reasons
- **Content exhaustion:** They've seen all the code snippets and it feels repetitive
- **External pressure:** School, activities, or other games compete for attention
- **Difficulty spike:** The game becomes too hard too fast with no way to ease back in
- **Lost motivation:** No new goals, rewards, or social hooks to keep them returning
- **Platform friction:** Performance issues, mobile incompatibility, or no offline access

### Graceful Exit Design
- Don't punish absence — a long streak is preserved with a "redemption" mechanic (e.g., one free streak save per week)
- Re-engagement notifications (if opted in): "A new CSS pack just dropped — come destroy some meteors!"
- Easy re-entry: returning users should land exactly where they left off

### What We Learn from Churn
- If users churn early (Phase 2–3), onboarding or first session difficulty needs adjustment
- If users churn late (Phase 5–6), content depth and replayability need investment
- Track session length, return rate, and level completion to identify drop-off points

---

## Journey Summary Table

| Phase | User State | Key Goal | Biggest Risk |
|---|---|---|---|
| 1. Awareness | No knowledge of product | Hook them immediately | Looks too educational, not fun |
| 2. Onboarding | Skeptical, trying it out | Build confidence fast | Too hard or too long to start |
| 3. First Session | Engaged, curious | End on a win; show progression | Frustration from unfair difficulty |
| 4. Habitual Use | Returning regularly | Reinforce habit loop | Loses novelty without new content |
| 5. Plateau | Risk of boredom | Re-engage with new challenges | Feels "done" with nothing left |
| 6. Churn | No longer using | Graceful exit + re-entry | Permanent loss with no re-engagement path |

---

## Key Design Takeaways

- **Low friction entry** is critical — no account, no setup, immediate gameplay
- **First 60 seconds** determine whether they stay: make the first meteor feel winnable and satisfying
- **Progression must always be visible** — users need to feel they are moving somewhere
- **Addictiveness and education are aligned**, not opposed: the more fun the game is, the more code they type, the more they learn
- **Mobile support and offline mode** directly impact retention for a younger audience
- **Content depth** (more language packs, harder modes) is the long-term retention lever

---
