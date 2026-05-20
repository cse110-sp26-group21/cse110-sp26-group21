/* global Phaser */
import {
  cleanupInactiveAsteroids,
  getActiveAsteroids,
  handleAsteroidMiss,
  hasAsteroidReachedBottom,
  updateAllAsteroids
} from "../asteroids/asteroidLogic.js";
import { createAsteroidData } from "../asteroids/asteroidFactory.js";
import { destroyAsteroidVisuals, renderAsteroid, syncAsteroidVisuals } from "../asteroids/asteroidRenderer.js";
import {
  canSpawnTargetText,
  findUniqueCompletedMatch,
  getPrefixMatchingAsteroids,
  reduceBufferToActivePrefix
} from "../typing/targetMatching.js";
import { clearTypedBuffer, handleKeyPress, isSupportedTypingKey } from "../typing/typingLogic.js";
import { applyScore, calculateScoreFromY, getAsteroidMidpointY } from "../scoring/scoringLogic.js";
import { calculateStreakBonus, incrementStreak, updateLongestStreak } from "../scoring/streakLogic.js";
import {
  recordAsteroidDestroyed,
  recordCorrectTypedCharacters,
  recordIncorrectTypedCharacter,
  recordTypedCharacter
} from "../stats/sessionStats.js";
import { recordAsteroidCompleted, recordAsteroidSpawned } from "../appState.js";

export class PlayScene extends Phaser.Scene {
  constructor(gameState, config, hooks) {
    super({ key: "PlayScene" });
    this.gameState = gameState;
    this.config = config;
    this.hooks = hooks;
    this.keyHandler = null;
    this.focusHandler = null;
  }

  preload() {}

  create() {
    this.add.rectangle(450, 280, this.config.screen.width, this.config.screen.height, 0x23105f, 1);
    this.add.text(22, 18, "SCORE: 00000", { fontFamily: "monospace", fontSize: "26px" }).setName("scoreText");
    this.add.text(760, 18, "LIVES: 1", { fontFamily: "monospace", fontSize: "26px" }).setName("livesText");

    this.spawnAsteroid();
    this.gameState.lastSpawnTimeMs = this.time.now;
    this.setupFocusHandling();

    this.keyHandler = (event) => {
      if (this.gameState.status !== "playing") {
        return;
      }
      if (this.shouldIgnoreKeyboardEvent(event)) {
        return;
      }
      if (isSupportedTypingKey(event.key)) {
        event.preventDefault();
      }
      this.processKey(event.key);
    };
    document.addEventListener("keydown", this.keyHandler, true);
  }

  update(time, delta) {
    if (this.gameState.status !== "playing") {
      return;
    }

    if (this.shouldSpawnAsteroid(time)) {
      this.spawnAsteroid();
      this.gameState.lastSpawnTimeMs = time;
    }

    const activeAsteroids = getActiveAsteroids(this.gameState);
    updateAllAsteroids(activeAsteroids, delta);

    for (const asteroid of activeAsteroids) {
      syncAsteroidVisuals(asteroid);
      if (!asteroid.missed && hasAsteroidReachedBottom(asteroid, this.config.screen.height)) {
        handleAsteroidMiss(asteroid, this.gameState);
        destroyAsteroidVisuals(asteroid);
        cleanupInactiveAsteroids(this.gameState);
        this.refreshHud();
        if (this.gameState.livesRemaining <= 0) {
          this.hooks.onGameOver();
          return;
        }
      }
    }
  }

  shutdown() {
    if (this.keyHandler) {
      document.removeEventListener("keydown", this.keyHandler, true);
      this.keyHandler = null;
    }
    if (this.focusHandler) {
      document.getElementById("phaser-root")?.removeEventListener("pointerdown", this.focusHandler);
      this.focusHandler = null;
    }
  }

  shouldSpawnAsteroid(currentTime) {
    const levelState = this.gameState.levelState;
    if (levelState.spawnedAsteroids >= levelState.targetAsteroids) {
      return false;
    }
    if (this.gameState.activeAsteroids.length >= this.config.gameplay.maxActiveAsteroids) {
      return false;
    }
    return currentTime - this.gameState.lastSpawnTimeMs >= this.config.gameplay.spawnIntervalMs;
  }

  spawnAsteroid() {
    let asteroid = createAsteroidData(this.gameState.selectedLanguage, this.config, this.gameState.questions);
    let attempts = 0;

    while (
      !canSpawnTargetText(asteroid.normalizedTargetText, this.gameState.activeAsteroids) &&
      attempts < 5
    ) {
      asteroid = createAsteroidData(this.gameState.selectedLanguage, this.config, this.gameState.questions);
      attempts += 1;
    }

    if (!canSpawnTargetText(asteroid.normalizedTargetText, this.gameState.activeAsteroids)) {
      return null;
    }

    renderAsteroid(this, asteroid);
    this.gameState.activeAsteroids.push(asteroid);
    recordAsteroidSpawned(this.gameState.levelState);
    this.refreshHud();
    return asteroid;
  }

  processKey(key) {
    if (!isSupportedTypingKey(key)) {
      return;
    }

    if (key !== "Backspace") {
      recordTypedCharacter(this.gameState.sessionStats, key);
    }

    handleKeyPress(key, this.gameState, this.config);
    const buffer = this.gameState.typedBuffer;
    const activeAsteroids = getActiveAsteroids(this.gameState);
    const matchedAsteroid = findUniqueCompletedMatch(buffer, activeAsteroids);

    if (matchedAsteroid) {
      this.handleAsteroidDestroyed(matchedAsteroid);
      return;
    }

    if (buffer.length > 0 && getPrefixMatchingAsteroids(buffer, activeAsteroids).length === 0) {
      recordIncorrectTypedCharacter(this.gameState.sessionStats);
      this.gameState.typedBuffer = reduceBufferToActivePrefix(buffer, activeAsteroids);
    }

    this.refreshHud();
  }

  handleAsteroidDestroyed(asteroid) {
    asteroid.destroyed = true;
    const basePoints = calculateScoreFromY(
      getAsteroidMidpointY(asteroid),
      this.config.screen.height,
      this.config.scoring.zones
    );
    const streak = incrementStreak(this.gameState.sessionStats);
    updateLongestStreak(this.gameState.sessionStats);
    const streakBonus = calculateStreakBonus(streak, this.config.scoring.streakBonuses);

    applyScore(this.gameState.sessionStats, basePoints + streakBonus);
    recordCorrectTypedCharacters(this.gameState.sessionStats, asteroid.targetText);
    recordAsteroidDestroyed(this.gameState.sessionStats);
    recordAsteroidCompleted(this.gameState.levelState);
    clearTypedBuffer(this.gameState);
    destroyAsteroidVisuals(asteroid);
    cleanupInactiveAsteroids(this.gameState);
    this.refreshHud();
  }

  refreshHud() {
    this.children.getByName("scoreText")?.setText(
      `SCORE: ${String(this.gameState.sessionStats.score).padStart(5, "0")}`
    );
    this.children.getByName("livesText")?.setText(`LIVES: ${this.gameState.livesRemaining}`);
    this.hooks.onHudUpdate();
  }

  setupFocusHandling() {
    const playScreen = document.getElementById("play-screen");
    const phaserRoot = document.getElementById("phaser-root");

    this.focusHandler = () => {
      phaserRoot?.focus();
      playScreen?.focus();
    };

    phaserRoot?.focus();
    playScreen?.focus();
    phaserRoot?.addEventListener("pointerdown", this.focusHandler);
  }

  shouldIgnoreKeyboardEvent(event) {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) {
      return true;
    }

    if (["Dead", "Unidentified", "Process"].includes(event.key)) {
      return true;
    }

    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    const interactiveTagNames = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"];
    return interactiveTagNames.includes(target.tagName) || target.isContentEditable;
  }
}
