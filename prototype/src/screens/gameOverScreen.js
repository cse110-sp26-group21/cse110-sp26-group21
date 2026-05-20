function renderStatsList(container, statsMap, doc = document) {
  container.innerHTML = "";
  Object.entries(statsMap).forEach(([label, value]) => {
    const term = doc.createElement("dt");
    term.textContent = label;
    const description = doc.createElement("dd");
    description.textContent = value;
    container.append(term, description);
  });
}

export function renderGameOverStats(sessionStats, lifetimeStats, doc = document) {
  const sessionList = doc.getElementById("session-stats-list");
  const lifetimeList = doc.getElementById("lifetime-stats-list");

  renderStatsList(sessionList, {
    "Final Score": sessionStats.score,
    Accuracy: `${Math.round(sessionStats.accuracy * 100)}%`,
    "Longest Streak": sessionStats.longestStreak,
    "Asteroids Destroyed": sessionStats.asteroidsDestroyed,
    "Asteroids Missed": sessionStats.asteroidsMissed
  }, doc);

  renderStatsList(lifetimeList, {
    "Games Played": lifetimeStats.gamesPlayed,
    "Lifetime Destroyed": lifetimeStats.lifetimeAsteroidsDestroyed,
    "Best Score": lifetimeStats.bestScore,
    "Best Streak": lifetimeStats.bestStreak,
    "Average Accuracy": `${Math.round(lifetimeStats.averageAccuracy * 100)}%`
  }, doc);
}
