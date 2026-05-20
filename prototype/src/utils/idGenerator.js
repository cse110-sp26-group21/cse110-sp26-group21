let asteroidCount = 0;

export function createAsteroidId() {
  asteroidCount += 1;
  return `asteroid-${asteroidCount}`;
}
