// tutorial.js

/**
 * Handles the tutorial screen
 * Manages single asteroid that pauses halfway
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
let instructionShown = false;
const CORRECT_CODE = 'let asteroid = 21;';
const STOP_Y = -50; // Distance from top where asteroid stops

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
  if (!tutorialAsteroid || tutorialState.asteroidPaused || tutorialState.codeTyped) {
    return;
  }

  const nextY = tutorialAsteroid.y + tutorialAsteroid.speed;

  if (!instructionShown && nextY >= STOP_Y) {
    // Pause only on first time reaching STOP_Y
    tutorialAsteroid.y = STOP_Y;
    tutorialState.asteroidPaused = true;
    tutorialAsteroid.element.style.top = `${tutorialAsteroid.y}px`;
    
    // Show instruction overlay only once
    instructionShown = true;
    showInstructionOverlay();
  } else {
    tutorialAsteroid.y = nextY;
    tutorialAsteroid.element.style.top = `${tutorialAsteroid.y}px`;
  }
}

/**
 * Shows instruction overlay
 */
function showInstructionOverlay() {
  instructionOverlay = document.createElement('div');
  instructionOverlay.classList.add('tutorial-instruction-overlay');
  
  instructionOverlay.innerHTML = `
    <div class="tutorial-instruction-card">
      <h3>Type the code snippet in the asteroid <br>
      before it falls across the screen!</h3>
      <button class="tutorial-continue-btn">Continue</button>
    </div>
  `;
  
  tutorialGameArea.appendChild(instructionOverlay);
  
  // Add click handler to continue button
  const continueBtn = instructionOverlay.querySelector('.tutorial-continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleContinue();
    });
  }
}

/**
 * Handles continue button click
 */
function handleContinue() {
  hideInstructionOverlay();
  tutorialState.asteroidPaused = false;
  
  // Ensure game loop is running
  if (!tutorialGameRunning) {
    tutorialGameRunning = true;
    tutorialAnimationId = requestAnimationFrame(tutorialGameLoop);
  }
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
  completionOverlay.classList.add('tutorial-instruction-overlay');
  
  completionOverlay.innerHTML = `
    <div class="tutorial-instruction-card">
      <h3>🎉 Congratulations!</h3>
      <p style="margin: 15px 0; font-size: 0.95rem;">Now you're ready to play and master your code typing skills</p>
      <button class="tutorial-continue-btn">Return Home</button>
    </div>
  `;
  
  tutorialGameArea.appendChild(completionOverlay);
  
  // Add click handler to return home button
  const returnBtn = completionOverlay.querySelector('.tutorial-continue-btn');
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

  if (typedText === CORRECT_CODE && !tutorialState.codeTyped) {
    tutorialState.codeTyped = true;

    // Update score and streak
    tutorialState.score += 1000;
    tutorialState.streak += 1;

    // Update displays
    tutorialScoreDisplay.textContent = tutorialState.score;
    tutorialStreakDisplay.textContent = tutorialState.streak;
    tutorialAsteroidCountDisplay.textContent = '1';

    // Remove asteroid
    if (tutorialAsteroid && tutorialAsteroid.element) {
      tutorialAsteroid.element.remove();
    }

    // Hide instruction overlay
    hideInstructionOverlay();

    // Disable input
    tutorialTypingInput.disabled = true;

    // Show completion overlay
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

  // Check if asteroid fell off screen
  if (tutorialAsteroid && tutorialAsteroid.y > window.innerHeight && !tutorialState.codeTyped) {
    tutorialState.codeTyped = true; // Mark as done to prevent multiple completions
    tutorialAsteroid.element.remove();
    showCompletionOverlay();
  }

  tutorialAnimationId = requestAnimationFrame(tutorialGameLoop);
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
    cancelAnimationFrame(tutorialAnimationId);
  }

  if (tutorialAsteroid && tutorialAsteroid.element) {
    tutorialAsteroid.element.remove();
  }

  // Hide overlays
  hideInstructionOverlay();
  hideCompletionOverlay();

  tutorialAsteroid = null;

  // Reset UI
  tutorialTypingInput.value = '';
  tutorialTypingInput.disabled = false;
  tutorialTypingInput.removeEventListener('input', checkTutorialTyping);

  // Reset state
  tutorialState.score = 0;
  tutorialState.streak = 0;
  tutorialState.asteroidPaused = false;
  tutorialState.codeTyped = false;

  tutorialScoreDisplay.textContent = '0';
  tutorialStreakDisplay.textContent = '0';
  tutorialAsteroidCountDisplay.textContent = '0';
}

/**
 * Starts the tutorial
 */
export function startTutorial() {
  if (tutorialGameRunning) {
    return;
  }

  // Reset state
  tutorialState.score = 0;
  tutorialState.streak = 0;
  tutorialState.asteroidPaused = false;
  tutorialState.codeTyped = false;

  tutorialScoreDisplay.textContent = '0';
  tutorialStreakDisplay.textContent = '0';
  tutorialAsteroidCountDisplay.textContent = '0';
  tutorialTypingInput.value = '';
  tutorialTypingInput.disabled = false;

  // Clear game area
  tutorialGameArea.innerHTML = '';

  // Spawn asteroid
  spawnTutorialAsteroid();

  // Reset instruction flag
  instructionShown = false;

  // Set up event listeners
  tutorialTypingInput.addEventListener('input', checkTutorialTyping);
  tutorialTypingInput.focus();

  // Start game loop
  tutorialGameRunning = true;
  tutorialAnimationId = requestAnimationFrame(tutorialGameLoop);
}
