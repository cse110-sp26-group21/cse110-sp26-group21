# ADR: Use Phaser.js for the Core Game Loop

## Status
Rejected

## Context
We need a reliable way to manage the core game loop, including rendering, player input, game state updates, timing, animations, and interactions between game objects.

## Decision
We will use Phaser.js for the core game loop.

## Consequences
Pros:
- Built specifically for browser-based games
- Handles rendering, input, timing, and game state updates
- Faster to implement than building a custom game loop
- Good documentation and community support

Cons:

- Adds an external dependency
- Team members may need time to learn Phaser.js
- Less control than building the game loop fully from scratch
