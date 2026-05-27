// main.js

/**
 * handles screen switching
 * starts the game
 * handles start/play again buttons
 * gets selected language
 * initializes game setup
 */

import { startGame } from './game.js';
import { loadSnippets } from './snippets.js';

const startBtn =
  document.querySelector('#start-btn');

const playAgainBtn =
  document.querySelector('#play-again-btn');

const languageSelect =
  document.querySelector('#language-select');

const homeScreen =
  document.querySelector('#home-screen');

const gameScreen =
  document.querySelector('#game-screen');

const resultsScreen =
  document.querySelector('#results-screen');



/**
 * Starts the game after loading snippets
 * based on the selected game mode
 */
async function handleStartGame() {

  const gameMode =
    languageSelect.value;

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


startBtn.addEventListener(
  'click',
  handleStartGame
);

playAgainBtn.addEventListener(
  'click',
  handlePlayAgain
);