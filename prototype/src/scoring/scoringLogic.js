export function getAsteroidMidpointY(asteroid) {
  return asteroid.y + asteroid.height / 2;
}

export function calculateScoreFromY(midpointY, screenHeight, scoringZones) {
  const yPercent = midpointY / screenHeight;
  const zone = scoringZones.find((item) => yPercent <= item.maxPercent);
  return zone ? zone.points : 0;
}

export function applyScore(sessionStats, points) {
  sessionStats.score += points;
  return sessionStats.score;
}
