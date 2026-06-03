import { describe, expect, test } from "vitest";
import { GAME_CONFIG } from "../src/config.js";
import {
  applyScore,
  calculateScoreFromY,
  getAsteroidMidpointY
} from "../src/scoring/scoringLogic.js";

describe("scoringLogic — extended", () => {

  // --- getAsteroidMidpointY ---

  describe("getAsteroidMidpointY", () => {
    test("midpoint is y + height/2", () => {
      expect(getAsteroidMidpointY({ y: 0, height: 110 })).toBe(55);
      expect(getAsteroidMidpointY({ y: 200, height: 60 })).toBe(230);
    });

    test("works when y is negative (asteroid partially above screen)", () => {
      expect(getAsteroidMidpointY({ y: -50, height: 110 })).toBe(5);
    });

    test("works with zero height", () => {
      expect(getAsteroidMidpointY({ y: 100, height: 0 })).toBe(100);
    });
  });

  // --- calculateScoreFromY ---

  describe("calculateScoreFromY — zone boundaries", () => {
    const zones = GAME_CONFIG.scoring.zones;
    const screenHeight = 600;

    test("y=0 is in the top zone (500 pts)", () => {
      expect(calculateScoreFromY(0, screenHeight, zones)).toBe(500);
    });

    test("y exactly at 33% boundary falls in top zone", () => {
      // maxPercent 0.33 → 0.33 * 600 = 198; yPercent = 198/600 = 0.33 → <= 0.33 → top zone
      expect(calculateScoreFromY(198, screenHeight, zones)).toBe(500);
    });

    test("y just past 33% boundary falls in middle zone", () => {
      expect(calculateScoreFromY(199, screenHeight, zones)).toBe(300);
    });

    test("y exactly at 66% boundary falls in middle zone", () => {
      expect(calculateScoreFromY(396, screenHeight, zones)).toBe(300);
    });

    test("y just past 66% boundary falls in bottom zone", () => {
      expect(calculateScoreFromY(397, screenHeight, zones)).toBe(150);
    });

    test("y at full screenHeight falls in bottom zone", () => {
      expect(calculateScoreFromY(600, screenHeight, zones)).toBe(150);
    });

    test("y beyond screenHeight returns 0 (no zone matches)", () => {
      // yPercent > 1.0 — no zone has maxPercent >= that value
      expect(calculateScoreFromY(700, screenHeight, zones)).toBe(0);
    });

    test("empty zones array returns 0", () => {
      expect(calculateScoreFromY(100, screenHeight, [])).toBe(0);
    });
  });

  // --- applyScore ---

  describe("applyScore", () => {
    test("adds points to existing score", () => {
      const stats = { score: 0 };
      applyScore(stats, 500);
      expect(stats.score).toBe(500);
    });

    test("accumulates across multiple calls", () => {
      const stats = { score: 0 };
      applyScore(stats, 1000);
      applyScore(stats, 300);
      applyScore(stats, 10);
      expect(stats.score).toBe(1310);
    });

    test("adding zero does not change score", () => {
      const stats = { score: 999 };
      applyScore(stats, 0);
      expect(stats.score).toBe(999);
    });

    test("returns the new score total", () => {
      const stats = { score: 100 };
      expect(applyScore(stats, 50)).toBe(150);
    });
  });
});
