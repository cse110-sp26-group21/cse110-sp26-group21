import { GAME_CONFIG } from "./config.js";
import { createInitialGameState, resetGameStateForNewGame } from "./appState.js";
import { initializeHomeScreen } from "./screens/homeScreen.js";
import { renderGameOverStats } from "./screens/gameOverScreen.js";
import { getCurrentScreen, showGameOverScreen, showHomeScreen, showPlayScreen } from "./screens/screenNavigation.js";
import { createPhaserGame, destroyPhaserGame } from "./phaser/phaserGame.js";
import { finalizeSessionStats } from "./stats/sessionStats.js";
import { loadLifetimeStats, saveLifetimeStats, updateLifetimeStats } from "./stats/lifetimeStats.js";
import { loadQuestions } from "./questions/questionBank.js";

const gameState = createInitialGameState(GAME_CONFIG);

function getStorage() {
  return window.localStorage;
}

function updateDebugInfo() {
  const languageLabel = document.getElementById("selected-language-label");
  const typedBufferLabel = document.getElementById("typed-buffer-label");
  const debugPanel = document.getElementById("debug-panel");
  const activeTargets = gameState.activeAsteroids.map((asteroid) => asteroid.targetText).join(", ") || "(none)";

  languageLabel.textContent = gameState.selectedLanguage;
  typedBufferLabel.textContent = gameState.typedBuffer || "(empty)";

  if (!GAME_CONFIG.debug.showTypedBuffer && !GAME_CONFIG.debug.showActiveTargets) {
    debugPanel.textContent = "";
    return;
  }

  debugPanel.textContent = [
    `Screen: ${getCurrentScreen()}`,
    GAME_CONFIG.debug.showTypedBuffer ? `Typed buffer: ${gameState.typedBuffer || "(empty)"}` : null,
    GAME_CONFIG.debug.showActiveTargets ? `Active targets: ${activeTargets}` : null,
    `Current streak: ${gameState.sessionStats.currentStreak}`,
    `Spawned: ${gameState.levelState.spawnedAsteroids}/${gameState.levelState.targetAsteroids}`
  ].filter(Boolean).join(" | ");
}

function finalizeGameOverData() {
  if (gameState.gameOverFinalized) {
    return;
  }

  finalizeSessionStats(gameState.sessionStats);
  const storage = getStorage();
  const lifetimeStats = loadLifetimeStats(storage, GAME_CONFIG.storage.lifetimeStatsKey);
  updateLifetimeStats(lifetimeStats, gameState.sessionStats);
  saveLifetimeStats(storage, GAME_CONFIG.storage.lifetimeStatsKey, lifetimeStats);
  gameState.lifetimeStats = lifetimeStats;
  gameState.gameOverFinalized = true;
}

function endGame() {
  gameState.status = "gameOver";
  destroyPhaserGame();
  finalizeGameOverData();
  renderGameOverStats(gameState.sessionStats, gameState.lifetimeStats);
  showGameOverScreen();
  updateDebugInfo();
}

function startGame(selectedLanguage) {
  resetGameStateForNewGame(gameState, selectedLanguage, GAME_CONFIG);
  showPlayScreen();
  updateDebugInfo();
  createPhaserGame(gameState, GAME_CONFIG, {
    onHudUpdate: updateDebugInfo,
    onGameOver: endGame
  });
  document.getElementById("phaser-root")?.focus();
  document.getElementById("play-screen")?.focus();
}

function restartGame() {
  startGame(gameState.selectedLanguage);
}

async function initializeApp() {
  gameState.questions = await loadQuestions();
  gameState.lifetimeStats = loadLifetimeStats(getStorage(), GAME_CONFIG.storage.lifetimeStatsKey);

  initializeHomeScreen(GAME_CONFIG, startGame);
  document.getElementById("play-again-button").addEventListener("click", restartGame);

  showHomeScreen();
  updateDebugInfo();
}

initializeApp();
