// asteroids.js

/**
 * creates asteroids
 * moves asteroids across screen
 * removes destroyed asteroids
 * manages asteroid positions/speed
 * handles asteroid rendering
 */

const gameArea = document.querySelector('#game-area');

export const asteroids = [];

/* maximum asteroids allowed */
const MAX_ASTEROIDS = 10;


/**
 * Creates a new asteroid
 * @param {string} snippet Snippet text
 */
export function spawnAsteroid(snippet) {

  /* prevent too many asteroids */
  if (asteroids.length >= MAX_ASTEROIDS) {
    return null;
  }

  const asteroidElement = document.createElement('div');

  asteroidElement.classList.add('asteroid');

  asteroidElement.innerHTML = `
    <img
      src="./assets/images/asteroid.png"
      alt="asteroid"
    >

    <p class="snippet"></p>
  `;

  const snippetElement = asteroidElement.querySelector('.snippet');
  snippetElement.textContent = snippet;

  gameArea.appendChild(asteroidElement);

  const maxX = window.innerWidth - 250;

  const randomX = Math.random() * maxX;

  const asteroid = {

    snippet,

    x: randomX,

    /* start above screen */
    y: -150,

    /* slow downward movement */
    speed: 0.35,

    element: asteroidElement
  };

  asteroid.element.style.left = `${asteroid.x}px`;

  asteroid.element.style.top = `${asteroid.y}px`;

  asteroids.push(asteroid);

  return asteroid;

}


/**
 * Moves asteroids downward
 * @param {Function} onMiss Callback
 * when asteroid leaves screen
 */
export function moveAsteroids(onMiss) {

  for ( let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];

    /* move downward */
    asteroid.y += asteroid.speed;

    asteroid.element.style.top = `${asteroid.y}px`;


    /* asteroid missed */
    if (asteroid.y > window.innerHeight) {

      asteroid.element.remove();

      asteroids.splice(i, 1);

      /* notify game.js */
      onMiss();
    }

  }

}

/**
 * Removes destroyed asteroid
 * @param {Object} asteroid Asteroid object
 */
export function destroyAsteroid(asteroid) {

  showExplosion(asteroid);

  asteroid.element.remove();

  const index = asteroids.indexOf(asteroid);

  if (index !== -1) {
    asteroids.splice(index, 1);
  }

}

/**
 * Show explosion animation when asteroid is destroyed
 * @param {Object} asteroid Asteroid object
 */
function showExplosion(asteroid) {
  const explosion = document.createElement('div');
  explosion.classList.add('explosion');
  
  const explosionSize = 220;

  const centerX = asteroid.x + (asteroid.element.offsetWidth / 2) - (explosionSize / 2);
  const centerY = asteroid.y + (asteroid.element.offsetHeight / 2) - (explosionSize / 2);

  explosion.style.left = `${centerX}px`;
  explosion.style.top = `${centerY}px`;

  gameArea.appendChild(explosion);

  const removeExplosion = () => explosion.remove();

  explosion.addEventListener('animationend', removeExplosion, { once: true });
  setTimeout(removeExplosion, 1000);
}