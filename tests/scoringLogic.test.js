import { describe, expect, test } from "vitest";
import { GAME_CONFIG } from "../src/config.js";
import { applyScore, calculateScoreFromY, getAsteroidMidpointY } from "../src/scoring/scoringLogic.js";

describe("scoringLogic", () => {
  test("midpoint and score zones return configured values", () => {
    expect(getAsteroidMidpointY({ y: 90, height: 20 })).toBe(100);
    expect(calculateScoreFromY(100, 900, GAME_CONFIG.scoring.zones)).toBe(500);
    expect(calculateScoreFromY(450, 900, GAME_CONFIG.scoring.zones)).toBe(300);
    expect(calculateScoreFromY(800, 900, GAME_CONFIG.scoring.zones)).toBe(150);
  });

  test("applyScore adds points to session score", () => {
    const sessionStats = { score: 10 };
    applyScore(sessionStats, 50);
    expect(sessionStats.score).toBe(60);
  });
});
