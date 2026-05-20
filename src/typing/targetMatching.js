export function getMatchingAsteroids(buffer, activeAsteroids) {
  return activeAsteroids.filter((asteroid) => asteroid.normalizedTargetText === buffer);
}

export function getPrefixMatchingAsteroids(buffer, activeAsteroids) {
  return activeAsteroids.filter((asteroid) => asteroid.normalizedTargetText.startsWith(buffer));
}

export function isAmbiguousMatch(buffer, activeAsteroids) {
  const exactMatches = getMatchingAsteroids(buffer, activeAsteroids);
  if (exactMatches.length !== 1) {
    return false;
  }
  const longerPrefixMatches = activeAsteroids.filter(
    (asteroid) =>
      asteroid.normalizedTargetText.startsWith(buffer) &&
      asteroid.normalizedTargetText !== buffer
  );
  return longerPrefixMatches.length > 0;
}

export function findUniqueCompletedMatch(buffer, activeAsteroids) {
  const exactMatches = getMatchingAsteroids(buffer, activeAsteroids);
  if (exactMatches.length !== 1) {
    return null;
  }
  return isAmbiguousMatch(buffer, activeAsteroids) ? null : exactMatches[0];
}

export function canSpawnTargetText(targetText, activeAsteroids) {
  return !activeAsteroids.some((asteroid) => asteroid.normalizedTargetText === targetText);
}

export function reduceBufferToActivePrefix(buffer, activeAsteroids) {
  for (let startIndex = 0; startIndex < buffer.length; startIndex += 1) {
    const candidate = buffer.slice(startIndex);
    if (getPrefixMatchingAsteroids(candidate, activeAsteroids).length > 0) {
      return candidate;
    }
  }

  return "";
}
