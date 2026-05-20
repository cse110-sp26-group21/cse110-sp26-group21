import { describe, expect, test } from "vitest";
import {
  createInitialGameState,
  createLevelState,
  isLevelComplete,
  recordAsteroidCompleted,
  recordAsteroidSpawned,
  resetGameStateForNewGame,
  setSelectedLanguage
} from "../src/appState.js";
import { GAME_CONFIG } from "../src/config.js";

describe("appState", () => {
  test("initial game state uses config defaults", () => {
    const gameState = createInitialGameState(GAME_CONFIG);
    expect(gameState.livesRemaining).toBe(GAME_CONFIG.gameplay.startingLives);
    expect(gameState.selectedLanguage).toBe("HTML");
    expect(gameState.activeAsteroids).toEqual([]);
  });

  test("selected language can be set", () => {
    const gameState = createInitialGameState(GAME_CONFIG);
    setSelectedLanguage(gameState, "CSS");
    expect(gameState.selectedLanguage).toBe("CSS");
  });

  test("resetting game state clears active asteroids and typed buffer", () => {
    const gameState = createInitialGameState(GAME_CONFIG);
    gameState.activeAsteroids.push({ id: "1" });
    gameState.typedBuffer = "test";
    resetGameStateForNewGame(gameState, "JavaScript", GAME_CONFIG);
    expect(gameState.activeAsteroids).toEqual([]);
    expect(gameState.typedBuffer).toBe("");
    expect(gameState.selectedLanguage).toBe("JavaScript");
  });

  test("level state completes when completed asteroid target is reached", () => {
    const levelState = createLevelState(GAME_CONFIG);
    expect(isLevelComplete(levelState)).toBe(false);
    for (let index = 0; index < GAME_CONFIG.gameplay.asteroidsPerLevel; index += 1) {
      recordAsteroidSpawned(levelState);
      recordAsteroidCompleted(levelState);
    }
    expect(isLevelComplete(levelState)).toBe(true);
  });
});
