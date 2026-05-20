export const GAME_CONFIG = {
  screen: {
    width: 900,
    height: 560
  },
  gameplay: {
    startingLives: 1,
    asteroidsPerLevel: 10,
    asteroidSpeed: 55,
    spawnIntervalMs: 2200,
    caseSensitive: false,
    countSpaces: true,
    requireIndentation: false,
    maxActiveAsteroids: 4
  },
  scoring: {
    zones: [
      { maxPercent: 0.33, points: 500 },
      { maxPercent: 0.66, points: 300 },
      { maxPercent: 1, points: 150 }
    ],
    streakBonuses: [
      { streak: 3, bonus: 10 },
      { streak: 5, bonus: 25 },
      { streak: 10, bonus: 50 }
    ]
  },
  debug: {
    showTypedBuffer: true,
    showActiveTargets: true
  },
  languages: ["HTML", "CSS", "JavaScript"],
  storage: {
    lifetimeStatsKey: "astro-type-lifetime-stats"
  }
};
