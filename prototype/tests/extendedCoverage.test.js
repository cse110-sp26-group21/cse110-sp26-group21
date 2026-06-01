import { describe, expect, test, beforeEach } from "vitest";

// asteroidLogic
import {
  cleanupInactiveAsteroids,
  getActiveAsteroids,
  handleAsteroidMiss,
  hasAsteroidReachedBottom,
  removeAsteroidById,
  updateAllAsteroids,
  updateAsteroidPosition
} from "../../prototype/src/asteroids/asteroidLogic.js";

// appState
import {
  createInitialGameState,
  createLevelState,
  isLevelComplete,
  recordAsteroidCompleted,
  recordAsteroidSpawned,
  resetGameStateForNewGame,
  setSelectedLanguage
} from "../../prototype/src/appState.js";

// questionBank
import {
  chooseRandomQuestion,
  filterQuestionsByLanguage,
  getFallbackQuestion,
  populateAsteroid
} from "../../prototype/src/questions/questionBank.js";

// utils
import { chooseRandomItem, getRandomInt } from "../../prototype/src/utils/random.js";

import { GAME_CONFIG } from "../../prototype/src/config.js";

// ─────────────────────────────────────────────
// asteroidLogic — extended
// ─────────────────────────────────────────────

describe("asteroidLogic — extended", () => {

  // --- updateAsteroidPosition ---

  describe("updateAsteroidPosition", () => {
    test("y increases proportional to speed and delta time", () => {
      const asteroid = { y: 0, speed: 60 };
      // speed=60 px/s, delta=500ms → should move 30px
      updateAsteroidPosition(asteroid, 500);
      expect(asteroid.y).toBeCloseTo(30);
    });

    test("delta of 0ms moves asteroid 0px", () => {
      const asteroid = { y: 100, speed: 60 };
      updateAsteroidPosition(asteroid, 0);
      expect(asteroid.y).toBe(100);
    });

    test("returns the new y value", () => {
      const asteroid = { y: 0, speed: 100 };
      const result = updateAsteroidPosition(asteroid, 1000);
      expect(result).toBe(100);
    });
  });

  // --- hasAsteroidReachedBottom ---

  describe("hasAsteroidReachedBottom", () => {
    test("returns false when asteroid is fully above the bottom", () => {
      expect(hasAsteroidReachedBottom({ y: 0, height: 50 }, 600)).toBe(false);
    });

    test("returns true when asteroid bottom edge equals screen height", () => {
      expect(hasAsteroidReachedBottom({ y: 550, height: 50 }, 600)).toBe(true);
    });

    test("returns true when asteroid has scrolled past screen height", () => {
      expect(hasAsteroidReachedBottom({ y: 700, height: 50 }, 600)).toBe(true);
    });
  });

  // --- updateAllAsteroids ---

  describe("updateAllAsteroids", () => {
    test("moves all asteroids in the array", () => {
      const asteroids = [
        { y: 0, speed: 100 },
        { y: 50, speed: 200 }
      ];
      updateAllAsteroids(asteroids, 1000);
      expect(asteroids[0].y).toBeCloseTo(100);
      expect(asteroids[1].y).toBeCloseTo(250);
    });

    test("empty array does not throw", () => {
      expect(() => updateAllAsteroids([], 500)).not.toThrow();
    });

    test("returns the same array reference", () => {
      const asteroids = [];
      const result = updateAllAsteroids(asteroids, 500);
      expect(result).toBe(asteroids);
    });
  });

  // --- handleAsteroidMiss ---

  describe("handleAsteroidMiss", () => {
    test("decrements livesRemaining by 1", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      const asteroid = {};
      handleAsteroidMiss(asteroid, gameState);
      expect(gameState.livesRemaining).toBe(0);
    });

    test("resets currentStreak to 0", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.sessionStats.currentStreak = 5;
      handleAsteroidMiss({}, gameState);
      expect(gameState.sessionStats.currentStreak).toBe(0);
    });

    test("increments asteroidsMissed stat", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      handleAsteroidMiss({}, gameState);
      expect(gameState.sessionStats.asteroidsMissed).toBe(1);
    });

    test("idempotent — marking the same asteroid missed twice does not deduct lives twice", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      const asteroid = {};
      handleAsteroidMiss(asteroid, gameState);
      handleAsteroidMiss(asteroid, gameState); // same object, already marked missed
      expect(gameState.livesRemaining).toBe(0);
      expect(gameState.sessionStats.asteroidsMissed).toBe(1);
    });

    test("does not deduct lives when livesRemaining is already 0", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.livesRemaining = 0;
      handleAsteroidMiss({}, gameState);
      expect(gameState.livesRemaining).toBe(0);
    });
  });

  // --- removeAsteroidById ---

  describe("removeAsteroidById", () => {
    test("removes only the matching asteroid", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.activeAsteroids = [{ id: "a" }, { id: "b" }, { id: "c" }];
      removeAsteroidById("b", gameState);
      expect(gameState.activeAsteroids.map((a) => a.id)).toEqual(["a", "c"]);
    });

    test("does nothing when id is not found", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.activeAsteroids = [{ id: "a" }];
      removeAsteroidById("z", gameState);
      expect(gameState.activeAsteroids).toHaveLength(1);
    });

    test("works on empty activeAsteroids", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      expect(() => removeAsteroidById("a", gameState)).not.toThrow();
      expect(gameState.activeAsteroids).toHaveLength(0);
    });
  });

  // --- getActiveAsteroids / cleanupInactiveAsteroids ---

  describe("getActiveAsteroids and cleanupInactiveAsteroids", () => {
    test("getActiveAsteroids filters out destroyed and missed", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.activeAsteroids = [
        { id: "1", destroyed: false, missed: false },
        { id: "2", destroyed: true, missed: false },
        { id: "3", destroyed: false, missed: true },
        { id: "4", destroyed: true, missed: true }
      ];
      expect(getActiveAsteroids(gameState)).toHaveLength(1);
      expect(getActiveAsteroids(gameState)[0].id).toBe("1");
    });

    test("cleanupInactiveAsteroids mutates activeAsteroids in place", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.activeAsteroids = [
        { id: "keep", destroyed: false, missed: false },
        { id: "drop", destroyed: true, missed: false }
      ];
      cleanupInactiveAsteroids(gameState);
      expect(gameState.activeAsteroids).toHaveLength(1);
      expect(gameState.activeAsteroids[0].id).toBe("keep");
    });
  });
});

// ─────────────────────────────────────────────
// appState — extended
// ─────────────────────────────────────────────

describe("appState — extended", () => {

  // --- createLevelState / recordAsteroidSpawned / recordAsteroidCompleted ---

  describe("levelState tracking", () => {
    test("new level state has 0 spawned and 0 completed", () => {
      const level = createLevelState(GAME_CONFIG);
      expect(level.spawnedAsteroids).toBe(0);
      expect(level.completedAsteroids).toBe(0);
    });

    test("recordAsteroidSpawned increments spawnedAsteroids", () => {
      const level = createLevelState(GAME_CONFIG);
      recordAsteroidSpawned(level);
      recordAsteroidSpawned(level);
      expect(level.spawnedAsteroids).toBe(2);
    });

    test("recordAsteroidCompleted increments completedAsteroids", () => {
      const level = createLevelState(GAME_CONFIG);
      recordAsteroidCompleted(level);
      expect(level.completedAsteroids).toBe(1);
    });

    test("isLevelComplete returns false one short of target", () => {
      const level = createLevelState(GAME_CONFIG);
      for (let i = 0; i < GAME_CONFIG.gameplay.asteroidsPerLevel - 1; i++) {
        recordAsteroidSpawned(level);
        recordAsteroidCompleted(level);
      }
      expect(isLevelComplete(level)).toBe(false);
    });

    test("isLevelComplete returns true exactly at target", () => {
      const level = createLevelState(GAME_CONFIG);
      for (let i = 0; i < GAME_CONFIG.gameplay.asteroidsPerLevel; i++) {
        recordAsteroidSpawned(level);
        recordAsteroidCompleted(level);
      }
      expect(isLevelComplete(level)).toBe(true);
    });
  });

  // --- resetGameStateForNewGame ---

  describe("resetGameStateForNewGame", () => {
    test("resets lives to config default", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.livesRemaining = 0;
      resetGameStateForNewGame(gameState, "CSS", GAME_CONFIG);
      expect(gameState.livesRemaining).toBe(GAME_CONFIG.gameplay.startingLives);
    });

    test("clears typedBuffer", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.typedBuffer = "console";
      resetGameStateForNewGame(gameState, "JavaScript", GAME_CONFIG);
      expect(gameState.typedBuffer).toBe("");
    });

    test("sets selectedLanguage to the provided value", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      resetGameStateForNewGame(gameState, "CSS", GAME_CONFIG);
      expect(gameState.selectedLanguage).toBe("CSS");
    });

    test("status is set to playing", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      resetGameStateForNewGame(gameState, "HTML", GAME_CONFIG);
      expect(gameState.status).toBe("playing");
    });

    test("resets sessionStats to fresh zeroes", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      gameState.sessionStats.score = 9999;
      resetGameStateForNewGame(gameState, "HTML", GAME_CONFIG);
      expect(gameState.sessionStats.score).toBe(0);
    });

    test("returns the gameState object", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      const result = resetGameStateForNewGame(gameState, "HTML", GAME_CONFIG);
      expect(result).toBe(gameState);
    });
  });

  // --- setSelectedLanguage ---

  describe("setSelectedLanguage", () => {
    test("updates selectedLanguage correctly", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      setSelectedLanguage(gameState, "JavaScript");
      expect(gameState.selectedLanguage).toBe("JavaScript");
    });

    test("can change language multiple times", () => {
      const gameState = createInitialGameState(GAME_CONFIG);
      setSelectedLanguage(gameState, "CSS");
      setSelectedLanguage(gameState, "HTML");
      expect(gameState.selectedLanguage).toBe("HTML");
    });
  });
});

// ─────────────────────────────────────────────
// questionBank — extended
// ─────────────────────────────────────────────

const mockQuestions = [
  { language: "HTML", fullCode: "<h1>Hello</h1>", targetText: "h1" },
  { language: "HTML", fullCode: "<p>World</p>", targetText: "p" },
  { language: "JavaScript", fullCode: "console.log('hi')", targetText: "console.log" },
  { language: "CSS", fullCode: "color: red;", targetText: "color" }
];

describe("questionBank — extended", () => {

  describe("filterQuestionsByLanguage", () => {
    test("returns all questions matching language", () => {
      expect(filterQuestionsByLanguage(mockQuestions, "HTML")).toHaveLength(2);
    });

    test("returns empty for language with no questions", () => {
      expect(filterQuestionsByLanguage(mockQuestions, "Python")).toHaveLength(0);
    });

    test("returns empty for empty question list", () => {
      expect(filterQuestionsByLanguage([], "HTML")).toHaveLength(0);
    });

    test("filter is case-sensitive", () => {
      expect(filterQuestionsByLanguage(mockQuestions, "html")).toHaveLength(0);
      expect(filterQuestionsByLanguage(mockQuestions, "HTML")).toHaveLength(2);
    });
  });

  describe("chooseRandomQuestion", () => {
    test("returns null for empty list", () => {
      expect(chooseRandomQuestion([])).toBeNull();
    });

    test("returns the only item from a one-element list", () => {
      expect(chooseRandomQuestion([mockQuestions[0]])).toBe(mockQuestions[0]);
    });

    test("always returns an item contained in the list", () => {
      for (let i = 0; i < 20; i++) {
        expect(mockQuestions).toContain(chooseRandomQuestion(mockQuestions));
      }
    });
  });

  describe("populateAsteroid", () => {
    test("returns a matching question for a valid language", () => {
      const result = populateAsteroid("JavaScript", mockQuestions);
      expect(result.language).toBe("JavaScript");
    });

    test("returns fallback when language has no questions", () => {
      expect(populateAsteroid("Python", mockQuestions)).toEqual(getFallbackQuestion());
    });

    test("returns fallback for empty question list", () => {
      expect(populateAsteroid("HTML", [])).toEqual(getFallbackQuestion());
    });
  });
});

// ─────────────────────────────────────────────
// utils/random — fully untested module
// ─────────────────────────────────────────────

describe("utils/random", () => {

  describe("chooseRandomItem", () => {
    test("returns null for empty array", () => {
      expect(chooseRandomItem([])).toBeNull();
    });

    test("returns the single item from a one-element array", () => {
      expect(chooseRandomItem(["only"])).toBe("only");
    });

    test("always returns an element contained in the array", () => {
      const items = [1, 2, 3, 4, 5];
      for (let i = 0; i < 30; i++) {
        expect(items).toContain(chooseRandomItem(items));
      }
    });

    test("works with non-primitive items", () => {
      const a = { id: 1 };
      const b = { id: 2 };
      const result = chooseRandomItem([a, b]);
      expect([a, b]).toContain(result);
    });
  });

  describe("getRandomInt", () => {
    test("returns an integer", () => {
      const val = getRandomInt(0, 10);
      expect(Number.isInteger(val)).toBe(true);
    });

    test("result is within [min, max] inclusive", () => {
      for (let i = 0; i < 50; i++) {
        const val = getRandomInt(5, 15);
        expect(val).toBeGreaterThanOrEqual(5);
        expect(val).toBeLessThanOrEqual(15);
      }
    });

    test("when min equals max, always returns that value", () => {
      for (let i = 0; i < 10; i++) {
        expect(getRandomInt(7, 7)).toBe(7);
      }
    });
  });
});
