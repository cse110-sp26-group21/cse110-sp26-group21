export function createInitialSessionStats() {
  return {
    score: 0,
    totalTypedCharacters: 0,
    correctTypedCharacters: 0,
    incorrectTypedCharacters: 0,
    asteroidsDestroyed: 0,
    asteroidsMissed: 0,
    currentStreak: 0,
    longestStreak: 0,
    accuracy: 0
  };
}

export function recordTypedCharacter(sessionStats, key) {
  if (key.length === 1 || key === " ") {
    sessionStats.totalTypedCharacters += 1;
  }
  return sessionStats.totalTypedCharacters;
}

export function recordCorrectTypedCharacters(sessionStats, targetText) {
  sessionStats.correctTypedCharacters += targetText.length;
  return sessionStats.correctTypedCharacters;
}

export function recordIncorrectTypedCharacter(sessionStats) {
  sessionStats.incorrectTypedCharacters += 1;
  return sessionStats.incorrectTypedCharacters;
}

export function recordAsteroidDestroyed(sessionStats) {
  sessionStats.asteroidsDestroyed += 1;
  return sessionStats.asteroidsDestroyed;
}

export function recordAsteroidMissed(sessionStats) {
  sessionStats.asteroidsMissed += 1;
  return sessionStats.asteroidsMissed;
}

export function calculateAccuracy(sessionStats) {
  if (sessionStats.totalTypedCharacters === 0) {
    return 0;
  }
  return sessionStats.correctTypedCharacters / sessionStats.totalTypedCharacters;
}

export function finalizeSessionStats(sessionStats) {
  sessionStats.accuracy = calculateAccuracy(sessionStats);
  return sessionStats;
}
