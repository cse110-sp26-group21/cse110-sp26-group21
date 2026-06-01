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
} from "../../prototype/src/stats/sessionStats.js";
import {
  createDefaultLifetimeStats,
  loadLifetimeStats,
  saveLifetimeStats,
  updateLifetimeStats
} from "../../prototype/src/stats/lifetimeStats.js";

// ─────────────────────────────────────────────
// sessionStats — extended
// ─────────────────────────────────────────────

describe("sessionStats — extended", () => {

  // --- recordTypedCharacter ---

  describe("recordTypedCharacter", () => {
    test("counts a regular character", () => {
      const stats = createInitialSessionStats();
      recordTypedCharacter(stats, "a");
      expect(stats.totalTypedCharacters).toBe(1);
    });

    test("counts a space character", () => {
      const stats = createInitialSessionStats();
      recordTypedCharacter(stats, " ");
      expect(stats.totalTypedCharacters).toBe(1);
    });

    test("does not count multi-char keys like Backspace", () => {
      const stats = createInitialSessionStats();
      recordTypedCharacter(stats, "Backspace");
      expect(stats.totalTypedCharacters).toBe(0);
    });

    test("does not count Enter", () => {
      const stats = createInitialSessionStats();
      recordTypedCharacter(stats, "Enter");
      expect(stats.totalTypedCharacters).toBe(0);
    });

    test("returns the updated total", () => {
      const stats = createInitialSessionStats();
      expect(recordTypedCharacter(stats, "x")).toBe(1);
    });
  });

  // --- recordCorrectTypedCharacters ---

  describe("recordCorrectTypedCharacters", () => {
    test("adds the length of the target text", () => {
      const stats = createInitialSessionStats();
      recordCorrectTypedCharacters(stats, "console.log");
      expect(stats.correctTypedCharacters).toBe(11);
    });

    test("empty string adds 0", () => {
      const stats = createInitialSessionStats();
      recordCorrectTypedCharacters(stats, "");
      expect(stats.correctTypedCharacters).toBe(0);
    });

    test("accumulates across multiple calls", () => {
      const stats = createInitialSessionStats();
      recordCorrectTypedCharacters(stats, "abc");
      recordCorrectTypedCharacters(stats, "de");
      expect(stats.correctTypedCharacters).toBe(5);
    });
  });

  // --- recordIncorrectTypedCharacter ---

  describe("recordIncorrectTypedCharacter", () => {
    test("increments by 1 each call", () => {
      const stats = createInitialSessionStats();
      recordIncorrectTypedCharacter(stats);
      recordIncorrectTypedCharacter(stats);
      expect(stats.incorrectTypedCharacters).toBe(2);
    });
  });

  // --- recordAsteroidDestroyed ---

  describe("recordAsteroidDestroyed", () => {
    test("increments asteroidsDestroyed", () => {
      const stats = createInitialSessionStats();
      recordAsteroidDestroyed(stats);
      recordAsteroidDestroyed(stats);
      expect(stats.asteroidsDestroyed).toBe(2);
    });

    test("returns the updated count", () => {
      const stats = createInitialSessionStats();
      expect(recordAsteroidDestroyed(stats)).toBe(1);
    });
  });

  // --- recordAsteroidMissed ---

  describe("recordAsteroidMissed", () => {
    test("increments asteroidsMissed", () => {
      const stats = createInitialSessionStats();
      recordAsteroidMissed(stats);
      recordAsteroidMissed(stats);
      expect(stats.asteroidsMissed).toBe(2);
    });
  });

  // --- calculateAccuracy ---

  describe("calculateAccuracy", () => {
    test("100% accuracy when all typed chars are correct", () => {
      const stats = createInitialSessionStats();
      stats.totalTypedCharacters = 10;
      stats.correctTypedCharacters = 10;
      expect(calculateAccuracy(stats)).toBe(1);
    });

    test("0% accuracy when no correct chars", () => {
      const stats = createInitialSessionStats();
      stats.totalTypedCharacters = 5;
      stats.correctTypedCharacters = 0;
      expect(calculateAccuracy(stats)).toBe(0);
    });

    test("returns 0 when totalTypedCharacters is 0 (no division by zero)", () => {
      const stats = createInitialSessionStats();
      expect(calculateAccuracy(stats)).toBe(0);
    });

    test("partial accuracy calculates correctly", () => {
      const stats = createInitialSessionStats();
      stats.totalTypedCharacters = 8;
      stats.correctTypedCharacters = 6;
      expect(calculateAccuracy(stats)).toBeCloseTo(0.75);
    });
  });

  // --- finalizeSessionStats ---

  describe("finalizeSessionStats", () => {
    test("writes calculated accuracy onto stats object", () => {
      const stats = createInitialSessionStats();
      stats.totalTypedCharacters = 4;
      stats.correctTypedCharacters = 2;
      finalizeSessionStats(stats);
      expect(stats.accuracy).toBe(0.5);
    });

    test("returns the stats object", () => {
      const stats = createInitialSessionStats();
      expect(finalizeSessionStats(stats)).toBe(stats);
    });
  });
});

// ─────────────────────────────────────────────
// lifetimeStats — extended
// ─────────────────────────────────────────────

function createStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, value);
    }
  };
}

describe("lifetimeStats — extended", () => {

  // --- updateLifetimeStats ---

  describe("updateLifetimeStats", () => {
    test("bestScore only updates when session score is higher", () => {
      const lifetime = createDefaultLifetimeStats();
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 500, longestStreak: 0, accuracy: 0 });
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 200, longestStreak: 0, accuracy: 0 });
      expect(lifetime.bestScore).toBe(500);
    });

    test("bestStreak only updates when session streak is higher", () => {
      const lifetime = createDefaultLifetimeStats();
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 8, accuracy: 0 });
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 3, accuracy: 0 });
      expect(lifetime.bestStreak).toBe(8);
    });

    test("lifetimeAsteroidsDestroyed accumulates across games", () => {
      const lifetime = createDefaultLifetimeStats();
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 5, score: 0, longestStreak: 0, accuracy: 0 });
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 7, score: 0, longestStreak: 0, accuracy: 0 });
      expect(lifetime.lifetimeAsteroidsDestroyed).toBe(12);
    });

    test("averageAccuracy is correctly calculated over multiple games", () => {
      const lifetime = createDefaultLifetimeStats();
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 0, accuracy: 1.0 });
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 0, accuracy: 0.5 });
      // (1.0 + 0.5) / 2 = 0.75
      expect(lifetime.averageAccuracy).toBeCloseTo(0.75);
    });

    test("gamesPlayed increments with each call", () => {
      const lifetime = createDefaultLifetimeStats();
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 0, accuracy: 0 });
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 0, accuracy: 0 });
      updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 0, accuracy: 0 });
      expect(lifetime.gamesPlayed).toBe(3);
    });

    test("returns the updated lifetime stats", () => {
      const lifetime = createDefaultLifetimeStats();
      const result = updateLifetimeStats(lifetime, { asteroidsDestroyed: 0, score: 0, longestStreak: 0, accuracy: 0 });
      expect(result).toBe(lifetime);
    });
  });

  // --- saveLifetimeStats / loadLifetimeStats ---

  describe("save and load round-trip", () => {
    test("complex stats survive a JSON round-trip", () => {
      const storage = createStorage();
      const lifetime = createDefaultLifetimeStats();
      lifetime.bestScore = 9999;
      lifetime.bestStreak = 12;
      lifetime.gamesPlayed = 7;
      saveLifetimeStats(storage, "key", lifetime);
      const loaded = loadLifetimeStats(storage, "key");
      expect(loaded.bestScore).toBe(9999);
      expect(loaded.bestStreak).toBe(12);
      expect(loaded.gamesPlayed).toBe(7);
    });

    test("stored object missing fields gets default values merged in", () => {
      const storage = createStorage();
      // manually write an incomplete object
      storage.setItem("key", JSON.stringify({ bestScore: 42 }));
      const loaded = loadLifetimeStats(storage, "key");
      expect(loaded.bestScore).toBe(42);
      expect(loaded.gamesPlayed).toBe(0); // default
    });
  });
});
