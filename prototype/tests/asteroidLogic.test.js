import { describe, expect, test } from "vitest";
import {
  cleanupInactiveAsteroids,
  getActiveAsteroids,
  handleAsteroidMiss,
  hasAsteroidReachedBottom,
  removeAsteroidById,
  updateAsteroidPosition
} from "../src/asteroids/asteroidLogic.js";
import { createInitialGameState } from "../src/appState.js";
import { GAME_CONFIG } from "../src/config.js";

describe("asteroidLogic", () => {
  test("asteroid y-position increases after update", () => {
    const asteroid = { y: 0, speed: 100 };
    updateAsteroidPosition(asteroid, 500);
    expect(asteroid.y).toBe(50);
  });

  test("bottom detection works", () => {
    expect(hasAsteroidReachedBottom({ y: 100, height: 50 }, 200)).toBe(false);
    expect(hasAsteroidReachedBottom({ y: 150, height: 50 }, 200)).toBe(true);
  });

  test("missed asteroid decrements lives", () => {
    const gameState = createInitialGameState(GAME_CONFIG);
    handleAsteroidMiss({}, gameState);
    expect(gameState.livesRemaining).toBe(0);
    expect(gameState.sessionStats.asteroidsMissed).toBe(1);
  });

  test("missed asteroids do not increment stats after lives reach zero", () => {
    const gameState = createInitialGameState(GAME_CONFIG);
    handleAsteroidMiss({}, gameState);
    handleAsteroidMiss({}, gameState);
    expect(gameState.livesRemaining).toBe(0);
    expect(gameState.sessionStats.asteroidsMissed).toBe(1);
  });

  test("removeAsteroidById removes the asteroid from state", () => {
    const gameState = createInitialGameState(GAME_CONFIG);
    gameState.activeAsteroids = [{ id: "a" }, { id: "b" }];
    removeAsteroidById("a", gameState);
    expect(gameState.activeAsteroids).toEqual([{ id: "b" }]);
  });

  test("cleanupInactiveAsteroids removes destroyed and missed asteroids", () => {
    const gameState = createInitialGameState(GAME_CONFIG);
    gameState.activeAsteroids = [
      { id: "a", destroyed: false, missed: false },
      { id: "b", destroyed: true, missed: false },
      { id: "c", destroyed: false, missed: true }
    ];
    cleanupInactiveAsteroids(gameState);
    expect(getActiveAsteroids(gameState)).toEqual([{ id: "a", destroyed: false, missed: false }]);
  });
});
