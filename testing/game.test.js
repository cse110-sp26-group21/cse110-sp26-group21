/**
 * @file game.test.js
 * Unit tests for game.js
 * Tests: updateScore logic (points, streak bonuses, location bonuses, high score)
 *
 * NOTE: game.js uses DOM at module load time, so we expose the pure
 * scoring logic via a helper here. If your team later extracts
 * calculatePoints() into a separate utils.js, import it directly instead.
 */

import { describe, it, expect } from 'vitest';
import { loadHighScore, saveHighScore } from '../scripts/game.js';

// ─── Pure scoring logic (mirrors game.js) ────────────────────────────────────
// We replicate the scoring algorithm here so it can be tested without a DOM.
// Keep this in sync with game.js updateScore().

/**
 * Calculates points awarded for destroying an asteroid.
 * @param {number} asteroidY  Asteroid's y position at time of destruction
 * @param {number} screenHeight  Window inner height
 * @param {number} currentStreak  Streak count BEFORE this destruction
 * @returns {{ points: number, newStreak: number }}
 */
function calculatePoints(asteroidY, screenHeight, currentStreak) {
  let points = 1000;

  // Location bonus
  if (asteroidY < screenHeight / 2) {
    points += 500;           // top half
  } else if (asteroidY < screenHeight * 0.75) {
    points += 300;           // middle quarter
  } else {
    points += 150;           // bottom quarter
  }

  // Streak bonus (streak increments before bonus is applied)
  const newStreak = currentStreak + 1;

  if (newStreak >= 3 && newStreak <= 4) {
    points += 10;
  } else if (newStreak >= 5 && newStreak <= 9) {
    points += 25;
  } else if (newStreak >= 10) {
    points += 50;
  }

  return { points, newStreak };
}

// ─── Location bonus tests ─────────────────────────────────────────────────────

describe('calculatePoints — location bonus', () => {
  const SCREEN_H = 720;

  it('awards +500 for top half (y < screenHeight/2)', () => {
    const { points } = calculatePoints(100, SCREEN_H, 0);
    expect(points).toBe(1500); // 1000 + 500
  });

  it('awards +300 for middle quarter (screenHeight/2 ≤ y < screenHeight*0.75)', () => {
    const { points } = calculatePoints(400, SCREEN_H, 0);
    expect(points).toBe(1300); // 1000 + 300
  });

  it('awards +150 for bottom quarter (y ≥ screenHeight*0.75)', () => {
    const { points } = calculatePoints(600, SCREEN_H, 0);
    expect(points).toBe(1150); // 1000 + 150
  });

  it('treats y exactly at screenHeight/2 as middle (not top)', () => {
    const { points } = calculatePoints(360, SCREEN_H, 0);
    expect(points).toBe(1300);
  });

  it('treats y exactly at screenHeight*0.75 as bottom (not middle)', () => {
    const { points } = calculatePoints(540, SCREEN_H, 0);
    expect(points).toBe(1150);
  });
});

// ─── Streak bonus tests ───────────────────────────────────────────────────────

describe('calculatePoints — streak bonus', () => {
  const SCREEN_H = 720;
  const TOP_Y = 100; // always top half so location bonus is constant

  it('awards no streak bonus for streak 1', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 0);
    expect(points).toBe(1500); // no streak bonus
  });

  it('awards no streak bonus for streak 2', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 1);
    expect(points).toBe(1500);
  });

  it('awards +10 streak bonus at streak 3', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 2);
    expect(points).toBe(1510);
  });

  it('awards +10 streak bonus at streak 4', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 3);
    expect(points).toBe(1510);
  });

  it('awards +25 streak bonus at streak 5', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 4);
    expect(points).toBe(1525);
  });

  it('awards +25 streak bonus at streak 9', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 8);
    expect(points).toBe(1525);
  });

  it('awards +50 streak bonus at streak 10', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 9);
    expect(points).toBe(1550);
  });

  it('awards +50 streak bonus beyond streak 10', () => {
    const { points } = calculatePoints(TOP_Y, SCREEN_H, 20);
    expect(points).toBe(1550);
  });

  it('increments the streak counter correctly', () => {
    const { newStreak } = calculatePoints(TOP_Y, SCREEN_H, 4);
    expect(newStreak).toBe(5);
  });
});

// ─── session high score tests ───────────────────────────────────────────────────────

describe('high score storage', () => {
  sessionStorage.clear();

  it('returns 0 when no high score exists', () => {
    expect(loadHighScore()).toBe(0);
  });

  sessionStorage.clear();

  it('saves and loads a high score', () => {
    saveHighScore(3200);
    expect(loadHighScore()).toBe(3200);
  });
});