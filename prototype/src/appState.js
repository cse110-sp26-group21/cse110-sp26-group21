import { createInitialSessionStats } from "./stats/sessionStats.js";
import { createDefaultLifetimeStats } from "./stats/lifetimeStats.js";

export function createLevelState(config) {
  return {
    spawnedAsteroids: 0,
    completedAsteroids: 0,
    targetAsteroids: config.gameplay.asteroidsPerLevel
  };
}

export function recordAsteroidSpawned(levelState) {
  levelState.spawnedAsteroids += 1;
  return levelState;
}

export function recordAsteroidCompleted(levelState) {
  levelState.completedAsteroids += 1;
  return levelState;
}

export function isLevelComplete(levelState) {
  return levelState.completedAsteroids >= levelState.targetAsteroids;
}

export function createInitialGameState(config) {
  return {
    selectedLanguage: config.languages[0],
    status: "home",
    livesRemaining: config.gameplay.startingLives,
    activeAsteroids: [],
    typedBuffer: "",
    sessionStats: createInitialSessionStats(),
    lifetimeStats: createDefaultLifetimeStats(),
    levelState: createLevelState(config),
    questions: [],
    lastSpawnTimeMs: 0,
    gameOverFinalized: false
  };
}

export function setSelectedLanguage(gameState, language) {
  gameState.selectedLanguage = language;
  return gameState;
}

export function resetGameStateForNewGame(gameState, selectedLanguage, config) {
  gameState.selectedLanguage = selectedLanguage;
  gameState.status = "playing";
  gameState.livesRemaining = config.gameplay.startingLives;
  gameState.activeAsteroids = [];
  gameState.typedBuffer = "";
  gameState.sessionStats = createInitialSessionStats();
  gameState.levelState = createLevelState(config);
  gameState.lastSpawnTimeMs = 0;
  gameState.gameOverFinalized = false;
  return gameState;
}
