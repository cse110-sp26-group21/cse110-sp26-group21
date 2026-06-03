// main.js

/**
 * handles screen switching
 * starts the game
 * handles start/play again buttons
 * gets selected language
 * initializes game setup
 */

import { startGame } from './game.js';
import { loadSnippets, setCurrentDifficulty } from './snippets.js';
import { startTutorial } from './tutorial.js';

const DIFFICULTY_OPTIONS = [
  'easy',
  'medium',
  'hard'
];

const startBtn =
  document.querySelector('#start-btn');

const playAgainBtn =
  document.querySelector('#play-again-btn');

const languageSelect =
  document.querySelector('#language-select');

const difficultySlider =
  document.querySelector('#difficulty-slider');

const difficultyValue =
  document.querySelector('#difficulty-value');

const homeScreen =
  document.querySelector('#home-screen');

const gameScreen =
  document.querySelector('#game-screen');

const resultsScreen =
  document.querySelector('#results-screen');

const tutorialScreen =
  document.querySelector('#tutorial-screen');

const tutorialBtn =
  document.querySelector('#tutorial-btn');


function getSelectedDifficulty() {

  return DIFFICULTY_OPTIONS[
    Number(difficultySlider.value)
  ] ?? DIFFICULTY_OPTIONS[0];

}


function updateDifficultyLabel() {

  const difficulty =
    getSelectedDifficulty();

  difficultyValue.textContent =
    difficulty.charAt(0).toUpperCase() +
    difficulty.slice(1);

}



/**
 * Starts the game after loading snippets
 * based on the selected game mode
 */
async function handleStartGame() {

  const gameMode =
    languageSelect.value;

  setCurrentDifficulty(
    getSelectedDifficulty()
  );

  await loadSnippets(gameMode);

  homeScreen.classList.add('hidden');

  resultsScreen.classList.add('hidden');

  gameScreen.classList.remove('hidden');

  startGame();

}


/**
 * Reloads the page to restart the game
 */
function handlePlayAgain() {

  window.location.reload();

}

/**
 * Starts the tutorial
 */
function handleTutorial() {

  homeScreen.classList.add('hidden');

  resultsScreen.classList.add('hidden');

  tutorialScreen.classList.remove('hidden');

  startTutorial();

}


updateDifficultyLabel();

difficultySlider.addEventListener(
  'input',
  updateDifficultyLabel
);


startBtn.addEventListener(
  'click',
  handleStartGame
);

playAgainBtn.addEventListener(
  'click',
  handlePlayAgain
);

if (tutorialBtn) {
  tutorialBtn.addEventListener(
    'click',
    handleTutorial
  );
}
