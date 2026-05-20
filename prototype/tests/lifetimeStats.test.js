import { describe, expect, test } from "vitest";
import {
  createDefaultLifetimeStats,
  loadLifetimeStats,
  resetLifetimeStats,
  saveLifetimeStats,
  updateLifetimeStats
} from "../src/stats/lifetimeStats.js";

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

describe("lifetimeStats", () => {
  test("missing or malformed storage returns defaults safely", () => {
    const storage = createStorage();
    expect(loadLifetimeStats(storage, "key")).toEqual(createDefaultLifetimeStats());
    storage.setItem("key", "{bad json");
    expect(loadLifetimeStats(storage, "key")).toEqual(createDefaultLifetimeStats());
  });

  test("saved stats can be loaded", () => {
    const storage = createStorage();
    const stats = createDefaultLifetimeStats();
    stats.bestScore = 50;
    saveLifetimeStats(storage, "key", stats);
    expect(loadLifetimeStats(storage, "key").bestScore).toBe(50);
  });

  test("lifetime stats update correctly", () => {
    const lifetimeStats = createDefaultLifetimeStats();
    updateLifetimeStats(lifetimeStats, { asteroidsDestroyed: 2, score: 80, longestStreak: 4, accuracy: 0.5 });
    expect(lifetimeStats.gamesPlayed).toBe(1);
    expect(lifetimeStats.lifetimeAsteroidsDestroyed).toBe(2);
    expect(lifetimeStats.bestScore).toBe(80);
    expect(lifetimeStats.bestStreak).toBe(4);
    expect(lifetimeStats.averageAccuracy).toBe(0.5);
  });

  test("resetLifetimeStats writes defaults", () => {
    const storage = createStorage();
    const result = resetLifetimeStats(storage, "key");
    expect(result).toEqual(createDefaultLifetimeStats());
  });
});
