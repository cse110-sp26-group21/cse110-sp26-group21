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
  initializeTyping
} from './typing.js';

import {
  getRandomSnippet
} from './snippets.js';


const gameState = {

  score: 0,

  streak: 0,

  longestStreak : 0,

  asteroidsDestroyed: 0

};

const scoreElement =
  document.querySelector('#score');

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



// total asteroids in full game
const TOTAL_ASTEROIDS = 10;

// current spawned asteroid count
let asteroidsSpawned = 0;

// controls asteroid spawn timing
let lastSpawnTime = 0;

// prevents duplicate game loops
let gameRunning = false;



/**
 * Starts the game loop
 */
export function startGame() {

  if (gameRunning) {
    return;
  }

  gameRunning = true;
  
  // initialize asteroid counter when game starts
  asteroidCountElement.textContent = asteroidsSpawned;
  asteroidTotalElement.textContent = TOTAL_ASTEROIDS;

  initializeTyping(handleAsteroidDestroyed);

  requestAnimationFrame(gameLoop);

}


/**
 * Main game loop
 * @param {number} timestamp Current frame timestamp
 */
function gameLoop(timestamp) {

  moveAsteroids(handleMissedAsteroid);

  // asteroid spawning
  if (
    timestamp - lastSpawnTime > 7000 &&
    asteroids.length < 3 &&
    asteroidsSpawned < TOTAL_ASTEROIDS
  ) {

    const snippetObject = getRandomSnippet();

    spawnAsteroid(snippetObject.snippet);

    asteroidsSpawned++;

    asteroidCountElement.textContent = asteroidsSpawned;

    lastSpawnTime = timestamp;

  }


  // game over check
  if (
    asteroidsSpawned >= TOTAL_ASTEROIDS &&
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

  updateScore(asteroid);

  updateUI();

}


/**
 * Resets streak when asteroid
 * leaves screen without being destroyed
 */
function handleMissedAsteroid() {

  gameState.streak = 0;

  updateUI();

}


/**
 * Ends the game and shows results screen
 */
function endGame() {

  gameRunning = false;

  gameScreen.classList.add('hidden');

  resultsScreen.classList.remove('hidden');

}


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

  destroyedCountElement.textContent =
    gameState.asteroidsDestroyed;

}