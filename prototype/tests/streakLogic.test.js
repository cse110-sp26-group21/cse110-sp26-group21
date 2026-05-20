import { describe, expect, test } from "vitest";
import {
  calculateStreakBonus,
  incrementStreak,
  resetStreak,
  updateLongestStreak
} from "../src/scoring/streakLogic.js";
import { GAME_CONFIG } from "../src/config.js";

describe("streakLogic", () => {
  test("streak increments and resets", () => {
    const sessionStats = { currentStreak: 0, longestStreak: 0 };
    incrementStreak(sessionStats);
    incrementStreak(sessionStats);
    updateLongestStreak(sessionStats);
    expect(sessionStats.currentStreak).toBe(2);
    expect(sessionStats.longestStreak).toBe(2);
    resetStreak(sessionStats);
    expect(sessionStats.currentStreak).toBe(0);
  });

  test("bonus thresholds return configured values", () => {
    expect(calculateStreakBonus(3, GAME_CONFIG.scoring.streakBonuses)).toBe(10);
    expect(calculateStreakBonus(5, GAME_CONFIG.scoring.streakBonuses)).toBe(25);
    expect(calculateStreakBonus(10, GAME_CONFIG.scoring.streakBonuses)).toBe(50);
    expect(calculateStreakBonus(4, GAME_CONFIG.scoring.streakBonuses)).toBe(0);
  });
});
