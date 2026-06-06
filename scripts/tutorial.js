// tutorial.js

/**
 * Handles the tutorial screen
 * Manages single asteroid that pauses twice
 * Explains typing mechanics
 * Shows score/streak updates
 * Returns to home screen
 */

const tutorialScreen = document.querySelector('#tutorial-screen');
const homeScreen = document.querySelector('#home-screen');
const tutorialTypingInput = document.querySelector('#tutorial-typing-input');
const tutorialScoreDisplay = document.querySelector('#tutorial-score');
const tutorialStreakDisplay = document.querySelector('#tutorial-streak');
const tutorialAsteroidCountDisplay = document.querySelector('#tutorial-asteroid-count');
const tutorialGameArea = document.querySelector('#tutorial-game-area');

let tutorialGameRunning = false;
let tutorialAsteroid = null;
let tutorialAnimationId = null;
let instructionOverlay = null;
let completionOverlay = null;

let firstInstructionShown = false;
let secondInstructionShown = false;

const CORRECT_CODE = 'let asteroid = 21;';
const FIRST_STOP_Y = -50;

const tutorialState = {
  score: 0,
  streak: 0,
  asteroidPaused: false,
  codeTyped: false
};

/**
 * Spawns the tutorial asteroid
 */
function spawnTutorialAsteroid() {
  const asteroidElement = document.createElement('div');
  asteroidElement.classList.add('asteroid');

  asteroidElement.innerHTML = `
    <img
      src="./assets/images/asteroid.png"
      alt="tutorial asteroid"
    >
    <p class="snippet">${CORRECT_CODE}</p>
  `;

  tutorialGameArea.appendChild(asteroidElement);

  const maxX = window.innerWidth - 250;
  const randomX = Math.random() * maxX;

  tutorialAsteroid = {
    snippet: CORRECT_CODE,
    x: randomX,
    y: -150,
    speed: 0.5,
    element: asteroidElement
  };

  tutorialAsteroid.element.style.left = `${tutorialAsteroid.x}px`;
  tutorialAsteroid.element.style.top = `${tutorialAsteroid.y}px`;

  return tutorialAsteroid;
}

/**
 * Updates tutorial asteroid position
 */
function moveTutorialAsteroid() {
  if (
    !tutorialAsteroid ||
    tutorialState.asteroidPaused ||
    tutorialState.codeTyped
  ) {
    return;
  }

  const secondStopY = window.innerHeight - 250;
  const nextY = tutorialAsteroid.y + tutorialAsteroid.speed;

  // First pause
  if (!firstInstructionShown && nextY >= FIRST_STOP_Y) {
    tutorialAsteroid.y = FIRST_STOP_Y;
    tutorialState.asteroidPaused = true;
    tutorialAsteroid.element.style.top = `${tutorialAsteroid.y}px`;

    firstInstructionShown = true;

    showInstructionOverlay(`
      Type the code snippet in the asteroid <br>
      before it falls across the screen!
    `);

    return;
  }

  // Second pause (if player still hasn't typed)
  if (!secondInstructionShown && nextY >= secondStopY) {
    tutorialAsteroid.y = secondStopY;
    tutorialState.asteroidPaused = true;
    tutorialAsteroid.element.style.top = `${tutorialAsteroid.y}px`;

    secondInstructionShown = true;

    showInstructionOverlay(
      `
        Make sure to type the code snippet exactly <br>
        into the text box below to destroy the asteroid!
      `,
      true
);

    return;
  }

  tutorialAsteroid.y = nextY;
  tutorialAsteroid.element.style.top = `${tutorialAsteroid.y}px`;
}

/**
 * Shows instruction overlay
 */
function showInstructionOverlay(message, finalPause = false) {
  instructionOverlay = document.createElement('div');
  instructionOverlay.classList.add('tutorial-instruction-overlay');

  instructionOverlay.innerHTML = `
    <div class="tutorial-instruction-card">
      <h3>${message}</h3>
      <button class="tutorial-continue-btn">Got it!</button>
    </div>
  `;

  tutorialGameArea.appendChild(instructionOverlay);

  const btn = instructionOverlay.querySelector(
    '.tutorial-continue-btn'
  );

  btn.addEventListener('click', () => {
    hideInstructionOverlay();

    if (!finalPause) {
      tutorialState.asteroidPaused = false;
    }
  });
}

/**
 * Hides and removes instruction overlay
 */
function hideInstructionOverlay() {
  if (instructionOverlay) {
    instructionOverlay.remove();
    instructionOverlay = null;
  }
}

/**
 * Shows completion overlay
 */
function showCompletionOverlay() {
  completionOverlay = document.createElement('div');
  completionOverlay.classList.add(
    'tutorial-instruction-overlay'
  );

  completionOverlay.innerHTML = `
    <div class="tutorial-instruction-card">
      <h3>Congratulations!</h3>
      <p>
        Now you're ready to play and master your code typing skills.
      </p>
      <button class="tutorial-continue-btn">
        Return Home
      </button>
    </div>
  `;

  tutorialGameArea.appendChild(completionOverlay);

  const returnBtn = completionOverlay.querySelector(
    '.tutorial-continue-btn'
  );

  if (returnBtn) {
    returnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      returnToHome();
    });
  }
}

/**
 * Hides and removes completion overlay
 */
function hideCompletionOverlay() {
  if (completionOverlay) {
    completionOverlay.remove();
    completionOverlay = null;
  }
}

/**
 * Checks typed input against tutorial code
 */
function checkTutorialTyping() {
  const typedText = tutorialTypingInput.value;

  if (
    typedText === CORRECT_CODE &&
    !tutorialState.codeTyped
  ) {
    tutorialState.codeTyped = true;

    tutorialState.score += 1000;
    tutorialState.streak += 1;

    tutorialScoreDisplay.textContent =
      tutorialState.score;
    tutorialStreakDisplay.textContent =
      tutorialState.streak;
    tutorialAsteroidCountDisplay.textContent = '1';

    if (
      tutorialAsteroid &&
      tutorialAsteroid.element
    ) {
      tutorialAsteroid.element.remove();
    }

    hideInstructionOverlay();

    tutorialTypingInput.disabled = true;

    showCompletionOverlay();
  }
}

/**
 * Tutorial game loop
 */
function tutorialGameLoop() {
  if (!tutorialGameRunning) {
    return;
  }

  moveTutorialAsteroid();

  // If the player somehow lets it fall completely
  if (
    tutorialAsteroid &&
    tutorialAsteroid.y > window.innerHeight &&
    !tutorialState.codeTyped
  ) {
    tutorialState.codeTyped = true;
    tutorialAsteroid.element.remove();
    showCompletionOverlay();
  }

  tutorialAnimationId = requestAnimationFrame(
    tutorialGameLoop
  );
}

/**
 * Returns to home screen
 */
function returnToHome() {
  endTutorial();
  tutorialScreen.classList.add('hidden');
  homeScreen.classList.remove('hidden');
}

/**
 * Cleans up tutorial
 */
function endTutorial() {
  tutorialGameRunning = false;

  if (tutorialAnimationId) {
    cancelAnimationFrame(
      tutorialAnimationId
    );
  }

  if (
    tutorialAsteroid &&
    tutorialAsteroid.element
  ) {
    tutorialAsteroid.element.remove();
  }

  hideInstructionOverlay();
  hideCompletionOverlay();

  tutorialAsteroid = null;

  tutorialTypingInput.value = '';
  tutorialTypingInput.disabled = false;
  tutorialTypingInput.removeEventListener(
    'input',
    checkTutorialTyping
  );

  tutorialState.score = 0;
  tutorialState.streak = 0;
  tutorialState.asteroidPaused = false;
  tutorialState.codeTyped = false;

  tutorialScoreDisplay.textContent = '0';
  tutorialStreakDisplay.textContent = '0';
  tutorialAsteroidCountDisplay.textContent = '0';

  firstInstructionShown = false;
  secondInstructionShown = false;
}

/**
 * Starts the tutorial
 */
export function startTutorial() {
  if (tutorialGameRunning) {
    return;
  }

  tutorialState.score = 0;
  tutorialState.streak = 0;
  tutorialState.asteroidPaused = false;
  tutorialState.codeTyped = false;

  tutorialScoreDisplay.textContent = '0';
  tutorialStreakDisplay.textContent = '0';
  tutorialAsteroidCountDisplay.textContent = '0';

  tutorialTypingInput.value = '';
  tutorialTypingInput.disabled = false;

  tutorialGameArea.innerHTML = '';

  spawnTutorialAsteroid();

  firstInstructionShown = false;
  secondInstructionShown = false;

  tutorialTypingInput.addEventListener(
    'input',
    checkTutorialTyping
  );

  tutorialTypingInput.focus();

  tutorialGameRunning = true;
  tutorialAnimationId = requestAnimationFrame(
    tutorialGameLoop
  );
}