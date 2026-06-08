// typing.js

/**
 * handles controlled typing input
 * only accepts valid next characters
 * hides incorrect characters from the bar
 * resolves shared prefixes across asteroids
 */

import {
  asteroids
} from './asteroids.js';

let typingInput = null;
let typingDisplay = null;
let activeDestroyCallback = null;

let committedText = '';
let incorrectCharacter = '';

/**
 * Focuses the live typing input without scrolling the page.
 */
export function focusTypingInput() {
  if (!typingInput) {
    return;
  }

  if (document.activeElement === typingInput) {
    return;
  }

  typingInput.focus({ preventScroll: true });
}

/**
 * Returns asteroids whose snippet starts with the current prefix.
 * @param {string} prefix Typed prefix to test
 * @param {Object[]} asteroidList Active asteroid list
 * @returns {Object[]} Matching asteroids
 */
export function getPrefixMatches(prefix, asteroidList = asteroids) {
  return asteroidList.filter((asteroid) => asteroid.snippet.startsWith(prefix));
}

/**
 * Returns the valid next characters for the current prefix.
 * @param {string} prefix Typed prefix to test
 * @param {Object[]} asteroidList Active asteroid list
 * @returns {string[]} Allowed next characters
 */
export function getValidNextCharacters(prefix, asteroidList = asteroids) {
  const nextCharacters = new Set();

  getPrefixMatches(prefix, asteroidList).forEach((asteroid) => {
    const nextCharacter = asteroid.snippet.charAt(prefix.length);

    if (nextCharacter) {
      nextCharacters.add(nextCharacter);
    }
  });

  return Array.from(nextCharacters);
}

/**
 * Returns the first asteroid exactly matching the committed text.
 * @param {string} text Fully typed text
 * @param {Object[]} asteroidList Active asteroid list
 * @returns {Object|null} Matching asteroid or null
 */
export function getCompletedAsteroid(text, asteroidList = asteroids) {
  return asteroidList.find((asteroid) => asteroid.snippet === text) || null;
}

/**
 * Resets the controlled typing state.
 */
export function resetTypingState() {
  committedText = '';
  incorrectCharacter = '';
  syncTypingUI();
}

/**
 * Trims the committed text back to a prefix that still matches
 * at least one live asteroid after the asteroid set changes.
 */
export function refreshTypingState() {
  while (
    committedText &&
    getPrefixMatches(committedText).length === 0
  ) {
    committedText = committedText.slice(0, -1);
  }

  incorrectCharacter = '';
  syncTypingUI();
}

/**
 * Returns the visible typing state for rendering/tests.
 * @returns {{ committedText: string, incorrectCharacter: string }}
 */
export function getTypingState() {
  return {
    committedText,
    incorrectCharacter
  };
}

/**
 * Initializes typing listener
 * @param {Function} onDestroy Callback function
 * when asteroid is destroyed
 */
export function initializeTyping(onDestroy) {
  const nextTypingInput = document.querySelector('#typing-input');
  const nextTypingDisplay = document.querySelector('#typing-display');
  activeDestroyCallback = onDestroy;

  if (typingInput && typingInput !== nextTypingInput) {
    typingInput.removeEventListener('keydown', handleKeydown);
    typingInput.removeEventListener('paste', handlePaste);
  }

  typingInput = nextTypingInput;
  typingDisplay = nextTypingDisplay;

  if (!typingInput) {
    return;
  }

  if (!typingInput.dataset.typingInitialized) {
    typingInput.addEventListener('keydown', handleKeydown);
    typingInput.addEventListener('paste', handlePaste);
    typingInput.dataset.typingInitialized = 'true';
  }

  resetTypingState();
}

/**
 * Handles paste by replaying each pasted character through the
 * same validation path as keyboard typing.
 * @param {ClipboardEvent} event Paste event
 */
function handlePaste(event) {
  event.preventDefault();

  const pastedText = event.clipboardData?.getData('text') || '';

  Array.from(pastedText).forEach((character) => {
    processCharacter(character);
  });
}

/**
 * Handles a key press for the controlled typing input.
 * @param {KeyboardEvent} event Keyboard event
 */
function handleKeydown(event) {
  if (!typingInput) {
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (event.key === 'Backspace') {
    event.preventDefault();
    handleBackspace();
    return;
  }

  if (event.key.length !== 1) {
    return;
  }

  event.preventDefault();
  processCharacter(event.key);
}

/**
 * Removes the current incorrect character or the last committed one.
 */
function handleBackspace() {
  if (incorrectCharacter) {
    incorrectCharacter = '';
  } else {
    committedText = committedText.slice(0, -1);
  }

  syncTypingUI();
}

/**
 * Applies a newly typed character against the active asteroid set.
 * @param {string} character User-entered character
 */
function processCharacter(character) {
  if (incorrectCharacter) {
    if (isValidNextCharacter(character)) {
      committedText += character;
      incorrectCharacter = '';
    } else {
      incorrectCharacter = character;
    }
  } else if (isValidNextCharacter(character)) {
    committedText += character;
  } else {
    incorrectCharacter = character;
  }

  syncTypingUI();
  handleCompletedMatch();
}

/**
 * Checks whether a character is valid for the current prefix.
 * @param {string} character User-entered character
 * @returns {boolean} True if the next character is allowed
 */
function isValidNextCharacter(character) {
  return getValidNextCharacters(committedText).includes(character);
}

/**
 * Destroys a completed asteroid and clears the typing state.
 */
function handleCompletedMatch() {
  if (incorrectCharacter || !activeDestroyCallback) {
    return;
  }

  const completedAsteroid = getCompletedAsteroid(committedText);

  if (!completedAsteroid) {
    return;
  }

  activeDestroyCallback(completedAsteroid);
  resetTypingState();
}

/**
 * Renders only the committed typing state into the input and overlay.
 */
function syncTypingUI() {
  if (typingInput) {
    typingInput.value = committedText;
  }

  if (!typingDisplay) {
    return;
  }

  typingDisplay.innerHTML = '';

  if (committedText) {
    const correctText = document.createElement('span');
    correctText.className = 'typing-correct';
    correctText.textContent = committedText;
    typingDisplay.appendChild(correctText);
  }

}
