// snippets.js

/**
 * loads snippet JSON data
 * stores available snippets
 * returns random snippets
 * filters snippets by language/difficulty
 */

const DIFFICULTY_LEVELS = [
  'easy',
  'easy-medium',
  'medium',
  'medium-hard',
  'hard'
];

let currentDifficulty = 'easy';
let snippets = [];

/**
 * Stores the active difficulty used when selecting snippets.
 * TODO: Replace this temporary default with a frontend-driven selection.
 * @param {string} difficulty Difficulty bucket to use for snippet selection
 * @returns {string} Active difficulty after validation
 */
export function setCurrentDifficulty(difficulty = 'easy') {

  if (!DIFFICULTY_LEVELS.includes(difficulty)) {
    console.warn(
      `Unknown difficulty "${difficulty}". Falling back to easy.`
    );
    currentDifficulty = 'easy';
    return currentDifficulty;
  }

  currentDifficulty = difficulty;
  return currentDifficulty;

}

/**
 * Returns the difficulty currently used by the snippet loader.
 * TODO: Wire this up to the frontend once users can choose a difficulty.
 * @returns {string} Active difficulty bucket
 */
export function getCurrentDifficulty() {

  return currentDifficulty;

}

/**
 * Returns a random element from a non-empty array.
 * @param {Array} items Source array
 * @returns {*} Random array element
 */
function getRandomItem(items) {

  const randomIndex =
    Math.floor(
      Math.random() * items.length
    );

  return items[randomIndex];

}

/**
 * Generates an integer in the inclusive range [min, max].
 * @param {number} min Lowest allowed integer
 * @param {number} max Highest allowed integer
 * @returns {number} Random integer
 */
function randomInt(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

}

/**
 * Generates a decimal string using the requested bounds and precision.
 * Returning a string preserves trailing zeroes for CSS/HTML templates.
 * @param {number} [min=0] Lowest allowed numeric value
 * @param {number} [max=100] Highest allowed numeric value
 * @param {number} [precision=0] Number of decimal places
 * @returns {string} Formatted numeric value
 */
function randomNumber(min = 0, max = 100, precision = 0) {

  const factor =
    10 ** precision;

  const scaledMin =
    Math.ceil(min * factor);

  const scaledMax =
    Math.floor(max * factor);

  return (
    randomInt(scaledMin, scaledMax) / factor
  ).toFixed(precision);

}

/**
 * Picks a reusable code-friendly identifier for templated snippets.
 * @returns {string} Identifier token
 */
function randomIdentifier() {

  const identifiers = [
    'score',
    'health',
    'player',
    'asteroid',
    'gameArea',
    'isGameOver',
    'streak',
    'menu',
    'title',
    'duration',
    'message',
    'index',
    'target',
    'panel'
  ];

  return getRandomItem(identifiers);

}

/**
 * Picks a short display string for content and text placeholders.
 * @returns {string} Human-readable string value
 */
function randomString() {

  const strings = [
    'Start Game',
    'Game Over',
    'Astro Type',
    'Mission Ready',
    'Player Health',
    'Type Here',
    'Main Menu',
    'Retry',
    'Launch',
    'Battlefield'
  ];

  return getRandomItem(strings);

}

/**
 * Picks a color token for CSS-related placeholders.
 * @returns {string} CSS color value
 */
function randomColor() {

  const colors = [
    'red',
    'blue',
    'green',
    'orange',
    'white',
    'black',
    'cyan',
    'limegreen',
    'gold',
    '#ccc'
  ];

  return getRandomItem(colors);

}

/**
 * Resolves one blank definition into a concrete replacement value.
 * @param {Object} blank Placeholder metadata from a snippet template
 * @returns {string} Generated replacement value
 */
function generateBlankValue(blank) {

  switch (blank.type) {

    case 'number':
      return randomNumber(
        blank.min,
        blank.max,
        blank.precision ?? 0
      );

    case 'options':
      return getRandomItem(blank.values);

    case 'color':
      return randomColor();

    case 'identifier':
      return randomIdentifier();

    case 'string':
      return randomString();

    default:
      console.warn(
        `Unsupported blank type "${blank.type}".`
      );
      return '';
  }

}

/**
 * Fills a templated snippet and returns the generated question payload.
 * If the snippet has no blanks, the original snippet is returned unchanged.
 * @param {Object} template Snippet entry from the JSON data file
 * @returns {Object} Rendered snippet object with generated values attached
 */
function renderSnippet(template) {

  if (!Array.isArray(template.blanks)) {
    return {
      ...template,
      renderedSnippet: template.snippet
    };
  }

  const generatedValues = {};

  template.blanks.forEach((blank) => {
    generatedValues[blank.name] =
      generateBlankValue(blank);
  });

  const renderedSnippet =
    template.snippet.replace(
      /\{\{(\w+)\}\}/g,
      (_, blankName) => generatedValues[blankName] ?? ''
    );

  return {
    ...template,
    snippet: renderedSnippet,
    template: template.snippet,
    generatedValues
  };

}

/**
 * Converts either the legacy array format or the new difficulty-bucket
 * object format into the snippet list for the active difficulty.
 * @param {Object|Array} snippetData Parsed JSON snippet data
 * @returns {Object[]} Snippet template objects for the current difficulty
 */
function normalizeSnippets(snippetData) {

  if (Array.isArray(snippetData)) {
    return snippetData;
  }

  return snippetData[
    getCurrentDifficulty()
  ] ?? [];

}

/**
 * Loads snippets based on the selected game mode
 * @param {string} gameMode Current selected language/game mode
 * @returns {Promise<void>} Resolves after snippet data is loaded into memory
 */
export async function loadSnippets(gameMode) {
  let filePath;

  setCurrentDifficulty();

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
    const snippetData = await response.json();

    snippets =
      normalizeSnippets(snippetData);
  } catch (error) {
    console.error('Error loading snippets:', error);
  }

}


/**
 * Selects a random snippet template and returns a fully rendered question.
 * The returned object always includes a final `snippet` string that the rest
 * of the game can display and compare against player input.
 * @returns {Object} Rendered snippet question
 */
export function getRandomSnippet() {

  const snippetTemplate =
    getRandomItem(snippets);

  return renderSnippet(snippetTemplate);

}
