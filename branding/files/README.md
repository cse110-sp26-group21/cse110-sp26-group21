# Team 9+10 — Brand Guide
### CSE 110 Software Engineering · Group 21

> *"Always bet on 21."*

---

## Table of Contents
1. [Team Identity](#team-identity)
2. [Logo](#logo)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Mascot](#mascot)
6. [Taglines](#taglines)
7. [Usage Guidelines](#usage-guidelines)
8. [Presentation Templates](#presentation-templates)

---

## Team Identity

| Field | Value |
|---|---|
| **Team Name** | 9 + 10 |
| **Group Number** | 21 |
| **Course** | CSE 110 — Software Engineering |
| **Theme** | Blackjack / Casino |
| **Primary Tagline** | *Always bet on 21.* |

The name **9+10** is a direct reference to our group number (21) dressed up as a blackjack hand — clean, clever, and instantly memorable. Our brand leans into the casino aesthetic: sharp contrasts, gold accents, and the composure of a player who always knows their odds.

---

## Logo

### Primary Logo
![Team 9+10 Primary Logo](assets/logo-primary.png)

The primary logo features overlapping playing cards (an ace of spades in front) alongside the team wordmark. Use this on slide covers, documents, and anywhere you need the full brand presence.

### Badge Logo
![Team 9+10 Badge](assets/logo-badge.png)

The badge variant centers the number **21** in Casino Gold inside a circular ring with the four card suits at cardinal points. Use this as a compact icon — GitHub profile, document headers, footers, or anywhere space is tight.

### Logo Files
| File | Format | Use Case |
|---|---|---|
| `assets/logo-primary.svg` | SVG (vector) | Presentations, print, scaling |
| `assets/logo-primary.png` | PNG (2x) | Docs, GitHub, web |
| `assets/logo-badge.svg` | SVG (vector) | Icon use, compact spaces |
| `assets/logo-badge.png` | PNG (2x) | Profile pics, badges |

---

## Color Palette

![Team Color Palette](assets/color-palette.png)

| Name | Hex | Usage |
|---|---|---|
| **Felt Night** | `#1A1A1A` | Backgrounds, dark slides, primary surfaces |
| **Casino Gold** | `#D4AF37` | Accents, highlights, headings on dark bg |
| **Ace Red** | `#C0392B` | Emphasis, warnings, heart/diamond suits |
| **Card White** | `#FFFFFF` | Body text on dark, light backgrounds |
| **Smoke** | `#4A4A4A` | Secondary text, muted elements, borders |

### Color Usage Rules
- **Dark theme** (preferred for presentations): Felt Night bg + Casino Gold headings + Card White body
- **Light theme** (for documents/reports): Card White bg + Felt Night headings + Smoke body text
- Never place Ace Red text on a Felt Night background — low contrast
- Casino Gold should be used sparingly as an *accent*, not a primary background

---

## Typography

### Font Pairings

| Role | Font | Weight | Usage |
|---|---|---|---|
| **Display** | Georgia (serif) | Bold 700 | Slide titles, cover pages, team name |
| **Heading** | Georgia (serif) | Bold 700 | Section headers, doc titles |
| **Body** | System sans-serif | Regular 400 | Paragraphs, bullet points, captions |
| **Accent / Label** | System sans-serif | Medium 500 | Uppercase labels, tags, small caps |

### Accent Text Style
For callout labels and accent elements, use **uppercase + letter-spacing**:
```
font-weight: 500;
letter-spacing: 0.2em;
text-transform: uppercase;
color: #D4AF37;
```

### Suit Symbols as Decorative Elements
The four suits can be used as bullet replacements or section dividers:
- ♠ Spades — primary bullets / section headers
- ♥ Hearts — secondary bullets / highlights  
- ♦ Diamonds — tertiary / callouts
- ♣ Clubs — footnotes / misc

---

## Mascot

### The Dealer 🃏

The team mascot is **The Dealer** — a cool, composed card dealer who always knows the odds. Sharp suit, sharper code.

**Personality traits:**
- Calculated and methodical — never goes bust
- Confident but not arrogant — knows when to stand
- Always two sprints ahead — thinking about the next hand

**Mascot usage:**
- Slide cover pages as a decorative element
- Team bios / about section
- Sticker or pin design if the class does physical deliverables

---

## Taglines

| Tagline | Tone | Best Used For |
|---|---|---|
| *"Always bet on 21."* | Bold, confident | Primary tagline — slide covers, repo README |
| *"Hit, stand, ship."* | Dev-focused, punchy | Sprint demos, release notes |
| *"The house always codes."* | Playful | Casual slides, team intros |
| *"9 + 10. Never bust."* | Self-referential | Team bios, icebreaker slides |

---

## Usage Guidelines

### Do ✅
- Use the logo on every slide cover and major document header
- Apply Casino Gold sparingly as an accent color
- Use Georgia serif for all display/heading text in presentations
- Include the suit symbols (♠ ♥ ♦ ♣) as decorative accents or bullet replacements
- Keep slide backgrounds Felt Night (`#1A1A1A`) for a consistent look

### Don't ❌
- Don't stretch or distort the logo
- Don't use the logo on a background that makes it hard to read (check contrast)
- Don't use more than 2–3 colors on a single slide
- Don't use a different primary font for headings — keep Georgia for consistency
- Don't go overboard with the casino theme in technical content — keep it subtle

---

## Presentation Templates

### Slide Types

#### Title Slide
```
Background: #1A1A1A (Felt Night)
Logo: Top-left or centered
Title: Georgia Bold, 44pt, #FFFFFF
Subtitle: Sans-serif, 18pt, #D4AF37 (Casino Gold), letter-spaced
Footer: "CSE 110 · Group 21 · Team 9+10" in Smoke (#4A4A4A), 10pt
Decorative: Suit symbols ♠ ♥ ♦ ♣ in corners at low opacity
```

#### Content Slide
```
Background: #FFFFFF (Card White) or #1A1A1A (Felt Night)
Heading: Georgia Bold, 28pt
Body: Sans-serif Regular, 16pt
Accent line: 2px #D4AF37 rule under heading
Slide number: Bottom-right, Badge logo + number
```

#### Section Divider
```
Background: #1A1A1A
Large suit symbol: centered, #D4AF37, 80pt, low opacity (watermark)
Section title: Georgia Bold, 36pt, #FFFFFF, centered
```

### PowerPoint Color Codes (for Theme Editor)
When setting up a custom PowerPoint theme, use these exact values:

- **Dark 1:** `#1A1A1A`
- **Light 1:** `#FFFFFF`
- **Dark 2:** `#4A4A4A`
- **Light 2:** `#F5F5F5`
- **Accent 1:** `#D4AF37` ← Casino Gold (primary accent)
- **Accent 2:** `#C0392B` ← Ace Red
- **Accent 3:** `#2C2C2C`
- **Accent 4:** `#888888`
- **Hyperlink:** `#D4AF37`

---

## File Structure

```
team21-brand/
├── README.md              ← This file
├── assets/
│   ├── logo-primary.svg   ← Primary logo (vector)
│   ├── logo-primary.png   ← Primary logo (2x PNG)
│   ├── logo-badge.svg     ← Badge/icon logo (vector)
│   ├── logo-badge.png     ← Badge/icon logo (2x PNG)
│   └── color-palette.png  ← Color palette reference
```

---

*Team 9+10 · CSE 110 · Group 21 · Always bet on 21. ♠*
