import { describe, expect, test } from "vitest";
import {
  calculateStreakBonus,
  incrementStreak,
  resetStreak,
  updateLongestStreak
} from "../../prototype/src/scoring/streakLogic.js";
import { GAME_CONFIG } from "../../prototype/src/config.js";

const rules = GAME_CONFIG.scoring.streakBonuses;

describe("streakLogic — extended", () => {

  // --- incrementStreak ---

  describe("incrementStreak", () => {
    test("starts from 0 and increments correctly", () => {
      const stats = { currentStreak: 0, longestStreak: 0 };
      expect(incrementStreak(stats)).toBe(1);
      expect(incrementStreak(stats)).toBe(2);
    });

    test("does not affect longestStreak", () => {
      const stats = { currentStreak: 5, longestStreak: 10 };
      incrementStreak(stats);
      expect(stats.longestStreak).toBe(10);
    });
  });

  // --- resetStreak ---

  describe("resetStreak", () => {
    test("resets currentStreak to 0", () => {
      const stats = { currentStreak: 8, longestStreak: 8 };
      expect(resetStreak(stats)).toBe(0);
    });

    test("does not affect longestStreak when resetting", () => {
      const stats = { currentStreak: 5, longestStreak: 5 };
      resetStreak(stats);
      expect(stats.longestStreak).toBe(5);
    });
  });

  // --- updateLongestStreak ---

  describe("updateLongestStreak", () => {
    test("updates longestStreak when currentStreak is higher", () => {
      const stats = { currentStreak: 7, longestStreak: 3 };
      updateLongestStreak(stats);
      expect(stats.longestStreak).toBe(7);
    });

    test("does not lower longestStreak when currentStreak is lower", () => {
      const stats = { currentStreak: 2, longestStreak: 10 };
      updateLongestStreak(stats);
      expect(stats.longestStreak).toBe(10);
    });

    test("keeps longestStreak when streaks are equal", () => {
      const stats = { currentStreak: 5, longestStreak: 5 };
      updateLongestStreak(stats);
      expect(stats.longestStreak).toBe(5);
    });
  });

  // --- calculateStreakBonus ---

  describe("calculateStreakBonus — between and beyond thresholds", () => {
    test("streak of 1 gives no bonus", () => {
      expect(calculateStreakBonus(1, rules)).toBe(0);
    });

    test("streak of 2 gives no bonus", () => {
      expect(calculateStreakBonus(2, rules)).toBe(0);
    });

    test("streak of 4 gives no bonus (not a threshold)", () => {
      expect(calculateStreakBonus(4, rules)).toBe(0);
    });

    test("streak of 6 gives no bonus (between thresholds)", () => {
      expect(calculateStreakBonus(6, rules)).toBe(0);
    });

    test("streak of 9 gives no bonus (between thresholds)", () => {
      expect(calculateStreakBonus(9, rules)).toBe(0);
    });

    test("streak of 11 gives no bonus (beyond highest threshold)", () => {
      // only 3, 5, 10 are exact thresholds
      expect(calculateStreakBonus(11, rules)).toBe(0);
    });

    test("streak of 3 gives 10 bonus", () => {
      expect(calculateStreakBonus(3, rules)).toBe(10);
    });

    test("streak of 5 gives 25 bonus", () => {
      expect(calculateStreakBonus(5, rules)).toBe(25);
    });

    test("streak of 10 gives 50 bonus", () => {
      expect(calculateStreakBonus(10, rules)).toBe(50);
    });

    test("empty rules returns 0", () => {
      expect(calculateStreakBonus(5, [])).toBe(0);
    });
  });
});
