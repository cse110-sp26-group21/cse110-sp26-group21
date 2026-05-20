export function incrementStreak(sessionStats) {
  sessionStats.currentStreak += 1;
  return sessionStats.currentStreak;
}

export function resetStreak(sessionStats) {
  sessionStats.currentStreak = 0;
  return sessionStats.currentStreak;
}

export function calculateStreakBonus(streakCount, streakRules) {
  const rule = streakRules.find((item) => item.streak === streakCount);
  return rule ? rule.bonus : 0;
}

export function updateLongestStreak(sessionStats) {
  sessionStats.longestStreak = Math.max(sessionStats.longestStreak, sessionStats.currentStreak);
  return sessionStats.longestStreak;
}
