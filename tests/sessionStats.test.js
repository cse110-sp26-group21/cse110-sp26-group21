import { describe, expect, test } from "vitest";
import {
  calculateAccuracy,
  createInitialSessionStats,
  finalizeSessionStats,
  recordAsteroidDestroyed,
  recordAsteroidMissed,
  recordCorrectTypedCharacters,
  recordIncorrectTypedCharacter,
  recordTypedCharacter
} from "../src/stats/sessionStats.js";

describe("sessionStats", () => {
  test("initial stats start at zero", () => {
    expect(createInitialSessionStats()).toEqual({
      score: 0,
      totalTypedCharacters: 0,
      correctTypedCharacters: 0,
      incorrectTypedCharacters: 0,
      asteroidsDestroyed: 0,
      asteroidsMissed: 0,
      currentStreak: 0,
      longestStreak: 0,
      accuracy: 0
    });
  });

  test("typed and asteroid stats update correctly", () => {
    const stats = createInitialSessionStats();
    recordTypedCharacter(stats, "a");
    recordCorrectTypedCharacters(stats, "abc");
    recordIncorrectTypedCharacter(stats);
    recordAsteroidDestroyed(stats);
    recordAsteroidMissed(stats);
    expect(stats.totalTypedCharacters).toBe(1);
    expect(stats.correctTypedCharacters).toBe(3);
    expect(stats.incorrectTypedCharacters).toBe(1);
    expect(stats.asteroidsDestroyed).toBe(1);
    expect(stats.asteroidsMissed).toBe(1);
  });

  test("accuracy handles division by zero and finalizes", () => {
    const stats = createInitialSessionStats();
    expect(calculateAccuracy(stats)).toBe(0);
    stats.totalTypedCharacters = 4;
    stats.correctTypedCharacters = 3;
    finalizeSessionStats(stats);
    expect(stats.accuracy).toBe(0.75);
  });
});
