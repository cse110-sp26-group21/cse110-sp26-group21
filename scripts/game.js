// game.js

/**
 * controls overall game flow
 * stores game state
 * updates score/streak
 * starts and stops game loop
 * handles game over
 */

import {
  spawnAsteroid,
  moveAsteroids,
  asteroids,
  destroyAsteroid
} from './asteroids.js';

import {
  initializeTyping,
  refreshTypingState,
  focusTypingInput
} from './typing.js';

import {
  getRandomSnippet
} from './snippets.js';


const gameState = {

  score: 0,

  streak: 0,

  longestStreak : 0,

  asteroidsDestroyed: 0,

  sessionHighScore: 0

};

const scoreElement =
  document.querySelector('#score');

const sessionHighScoreElement = 
  document.querySelector('#session-high-score');

const streakElement =
  document.querySelector('#streak');

// displays how many asteroids have spawned
const asteroidCountElement =
  document.querySelector('#asteroid-count');

// displays total asteroids for the level
const asteroidTotalElement =
  document.querySelector('#asteroid-total');

const finalScoreElement =
  document.querySelector('#final-score');

const destroyedCountElement =
  document.querySelector('#destroyed-count');

const longestStreakElement =
  document.querySelector('#longest-streak');

const gameScreen =
  document.querySelector('#game-screen');

const resultsScreen =
  document.querySelector('#results-screen');

// session high score key
const SESSION_HIGH_SCORE_KEY = 'sessionHighScore';

// total asteroids in full game
let totalAsteroids = 10;

// current spawned asteroid count
let asteroidsSpawned = 0;

// controls asteroid spawn timing
let lastSpawnTime = 0;

// prevents duplicate game loops
let gameRunning = false;


/**
 * Keeps the typing input focused during desktop play.
 */
function focusTypingBar() {
  if (isMobileDevice()) {
    return;
  }

  focusTypingInput();
}


/**
 * Checks if the device is mobile to handle asteroid spawning
 * @returns {boolean} True if mobile device
 */
function isMobileDevice() {
  return window.innerWidth <= 768;
}


/**
 * Starts the game loop
 */
export function startGame(asteroidCount) {

  if (gameRunning) {
    return;
  }
  totalAsteroids = asteroidCount;

  gameRunning = true;
  
  // initialize asteroid counter when game starts
  asteroidCountElement.textContent = asteroidsSpawned;
  asteroidTotalElement.textContent = totalAsteroids;

  initializeTyping(handleAsteroidDestroyed);
  focusTypingBar();

  requestAnimationFrame(gameLoop);

  // initialize session high score
  gameState.sessionHighScore = loadHighScore();

}


/**
 * Main game loop
 * @param {number} timestamp Current frame timestamp
 */
function gameLoop(timestamp) {

  moveAsteroids(handleMissedAsteroid);
  refreshTypingState();

  // asteroid spawning
  const maxAsteroids = isMobileDevice() ? 1 : 3;
  if (
    timestamp - lastSpawnTime > 7000 &&
    asteroids.length < maxAsteroids &&
    asteroidsSpawned < totalAsteroids
  ) {

    const snippetObject = getRandomSnippet();

    spawnAsteroid(snippetObject.snippet);
    refreshTypingState();
    focusTypingBar();

    // update asteroid counter after a new asteroid appears
    asteroidsSpawned++;

    asteroidCountElement.textContent = asteroidsSpawned;

    lastSpawnTime = timestamp;

  }


  // game over check
  if (
    asteroidsSpawned >= totalAsteroids &&
    asteroids.length === 0
  ) {

    endGame();

    return;
  }

  requestAnimationFrame(gameLoop);

}


/**
 * Handles asteroid destruction
 * @param {Object} asteroid Destroyed asteroid
 */
function handleAsteroidDestroyed(asteroid) {

  destroyAsteroid(asteroid);
  refreshTypingState();
  focusTypingBar();

  updateScore(asteroid);

  updateUI();

}


/**
 * Resets streak when asteroid
 * leaves screen without being destroyed
 */
function handleMissedAsteroid() {

  gameState.streak = 0;
  refreshTypingState();
  focusTypingBar();

  updateUI();

}


/**
 * Ends the game and shows results screen
 */
function endGame() {

  if (gameState.score > gameState.sessionHighScore) {
    gameState.sessionHighScore = gameState.score;
    saveHighScore();

    // update high score
    updateUI();
  }

  gameRunning = false;

  gameScreen.classList.add('hidden');

  resultsScreen.classList.remove('hidden');

}


gameScreen.addEventListener(
  'pointerdown',
  focusTypingBar
);


/**
 * Updates score based on:
 * - asteroid destruction
 * - asteroid position
 * - streak bonuses
 * @param {Object} asteroid Destroyed asteroid
 */
function updateScore(asteroid) {

  let points = 1000;

  // location bonus

  const screenHeight =
    window.innerHeight;

  const asteroidY =
    asteroid.y;

  /* top */
  if (asteroidY < screenHeight / 2) {

    points += 500;

  }

  /* middle */
  else if (
    asteroidY < screenHeight * 0.75
  ) {

    points += 300;

  }

  /* bottom */
  else {

    points += 150;

  }


  // streak bonus

  gameState.streak++;

  // update longest streak
  if (gameState.streak > gameState.longestStreak) {
    gameState.longestStreak = gameState.streak;
  }


  if (
    gameState.streak >= 3 &&
    gameState.streak <= 4
  ) {

    points += 10;

  }

  else if (
    gameState.streak >= 5 &&
    gameState.streak <= 9
  ) {

    points += 25;

  }

  else if (
    gameState.streak >= 10
  ) {

    points += 50;

  }

  gameState.score += points;
  gameState.asteroidsDestroyed++;
}

/**
 * Load session high score from sessionStorage
 * @returns session high score
 */
function loadHighScore() {
  return Number(sessionStorage.getItem(SESSION_HIGH_SCORE_KEY) || 0);
}

/**
 * Save new session high score
 */
function saveHighScore(highScore= gameState.sessionHighScore) {
  sessionStorage.setItem(SESSION_HIGH_SCORE_KEY, highScore.toString());
}

/**
 * Updates HUD and results screen
 */
function updateUI() {

  scoreElement.textContent =
    gameState.score;

  streakElement.textContent =
    gameState.streak;

  longestStreakElement.textContent =
    gameState.longestStreak;

  finalScoreElement.textContent =
    gameState.score;

  sessionHighScoreElement.textContent = 
    gameState.sessionHighScore;

  destroyedCountElement.textContent =
    gameState.asteroidsDestroyed;

}
