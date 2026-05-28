// snippets.js

/**
 * loads snippet JSON data
 * stores available snippets
 * returns random snippets
 * filters snippets by language/difficulty
 */


let snippets = [];

/**
 * Loads snippets based on the selected game mode
 * @param {string} gameMode Current selected language/game mode
 */
export async function loadSnippets(gameMode) {
  let filePath;

  switch (gameMode) {

    case 'javascript':
      filePath = './assets/snippets/javascript.json';
      break;
    case 'html':
      filePath = './assets/snippets/html.json';
      break;
    case 'css':
      filePath = './assets/snippets/css.json';
      break;
    default:
      filePath = './assets/snippets/javascript.json';
  }

  try {
    const response = await fetch(filePath);
    snippets = await response.json();
  } catch (error) {
    console.error('Error loading snippets:', error);
  }

}


/**
 * Returns a random snippet object
 * @returns {Object} Random snippet
 */
export function getRandomSnippet() {

  const randomIndex =
    Math.floor(
      Math.random() * snippets.length
    );

  return snippets[randomIndex];

}