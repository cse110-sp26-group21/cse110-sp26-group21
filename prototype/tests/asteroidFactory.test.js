import { describe, expect, test } from "vitest";
import { createAsteroidData, normalizeTargetText } from "../src/asteroids/asteroidFactory.js";
import { GAME_CONFIG } from "../src/config.js";
import { getFallbackQuestion } from "../src/questions/questionBank.js";

describe("asteroidFactory", () => {
  test("placeholder question is available", () => {
    expect(getFallbackQuestion()).toEqual({ fullCode: "a", targetText: "a" });
  });

  test("createAsteroidData returns required fields", () => {
    const asteroid = createAsteroidData("HTML", GAME_CONFIG, []);
    expect(asteroid.id).toMatch(/^asteroid-/);
    expect(asteroid.language).toBe("HTML");
    expect(asteroid.speed).toBe(GAME_CONFIG.gameplay.asteroidSpeed);
    expect(asteroid.fullCode).toBe("a");
  });

  test("normalizeTargetText lowercases when caseSensitive is false", () => {
    expect(normalizeTargetText("Console.Log", { caseSensitive: false })).toBe("console.log");
  });

  test("normalizeTargetText preserves case when caseSensitive is true", () => {
    expect(normalizeTargetText("Console.Log", { caseSensitive: true })).toBe("Console.Log");
  });
});
