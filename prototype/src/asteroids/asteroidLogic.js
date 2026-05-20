import { recordAsteroidMissed } from "../stats/sessionStats.js";
import { resetStreak } from "../scoring/streakLogic.js";

export function updateAsteroidPosition(asteroid, deltaTimeMs) {
  asteroid.y += asteroid.speed * (deltaTimeMs / 1000);
  return asteroid.y;
}

export function hasAsteroidReachedBottom(asteroid, screenHeight) {
  return asteroid.y + asteroid.height >= screenHeight;
}

export function removeAsteroidById(asteroidId, gameState) {
  gameState.activeAsteroids = gameState.activeAsteroids.filter((asteroid) => asteroid.id !== asteroidId);
  return gameState.activeAsteroids;
}

export function handleAsteroidMiss(asteroid, gameState) {
  if (asteroid.missed || gameState.livesRemaining <= 0) {
    return gameState.livesRemaining;
  }

  asteroid.missed = true;
  gameState.livesRemaining = Math.max(0, gameState.livesRemaining - 1);
  recordAsteroidMissed(gameState.sessionStats);
  resetStreak(gameState.sessionStats);
  return gameState.livesRemaining;
}

export function updateAllAsteroids(activeAsteroids, deltaTimeMs) {
  activeAsteroids.forEach((asteroid) => updateAsteroidPosition(asteroid, deltaTimeMs));
  return activeAsteroids;
}

export function getActiveAsteroids(gameState) {
  return gameState.activeAsteroids.filter((asteroid) => !asteroid.destroyed && !asteroid.missed);
}

export function cleanupInactiveAsteroids(gameState) {
  gameState.activeAsteroids = getActiveAsteroids(gameState);
  return gameState.activeAsteroids;
}
