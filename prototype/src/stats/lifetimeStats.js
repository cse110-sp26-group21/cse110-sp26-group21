export function createDefaultLifetimeStats() {
  return {
    gamesPlayed: 0,
    lifetimeAsteroidsDestroyed: 0,
    bestScore: 0,
    bestStreak: 0,
    cumulativeAccuracy: 0,
    averageAccuracy: 0
  };
}

export function loadLifetimeStats(storage, key) {
  try {
    const storedValue = storage.getItem(key);
    if (!storedValue) {
      return createDefaultLifetimeStats();
    }
    const parsed = JSON.parse(storedValue);
    return { ...createDefaultLifetimeStats(), ...parsed };
  } catch {
    return createDefaultLifetimeStats();
  }
}

export function saveLifetimeStats(storage, key, lifetimeStats) {
  storage.setItem(key, JSON.stringify(lifetimeStats));
}

export function updateLifetimeStats(lifetimeStats, sessionStats) {
  lifetimeStats.gamesPlayed += 1;
  lifetimeStats.lifetimeAsteroidsDestroyed += sessionStats.asteroidsDestroyed;
  lifetimeStats.bestScore = Math.max(lifetimeStats.bestScore, sessionStats.score);
  lifetimeStats.bestStreak = Math.max(lifetimeStats.bestStreak, sessionStats.longestStreak);
  lifetimeStats.cumulativeAccuracy += sessionStats.accuracy;
  lifetimeStats.averageAccuracy = lifetimeStats.cumulativeAccuracy / lifetimeStats.gamesPlayed;
  return lifetimeStats;
}

export function resetLifetimeStats(storage, key) {
  const defaults = createDefaultLifetimeStats();
  saveLifetimeStats(storage, key, defaults);
  return defaults;
}
