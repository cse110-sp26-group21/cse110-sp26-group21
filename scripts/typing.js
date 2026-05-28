// typing.js

/**
 *  handles typing input
 * checks correct/incorrect characters
 * tracks typing progress
 * calculates accuracy
 * detects completed snippets
 */

import {
  asteroids
} from './asteroids.js';

const typingInput =
  document.querySelector('#typing-input');


/**
 * Initializes typing listener
 * @param {Function} onDestroy Callback function
 * when asteroid is destroyed
 */
export function initializeTyping(onDestroy) {

  typingInput.addEventListener(
    'input',
    () => handleTyping(onDestroy)
  );

}



/**
 * Checks typed input against snippets
 * @param {Function} onDestroy Callback
 */
function handleTyping(onDestroy) {

  const typedText = typingInput.value;

  asteroids.forEach((asteroid) => {

    if (typedText === asteroid.snippet) {

      onDestroy(asteroid);

      typingInput.value = '';

    }

  });

}