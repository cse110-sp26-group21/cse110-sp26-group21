import { populateAsteroid } from "../questions/questionBank.js";
import { createAsteroidId } from "../utils/idGenerator.js";
import { getRandomInt } from "../utils/random.js";

export function normalizeTargetText(targetText, options) {
  return options.caseSensitive ? targetText : targetText.toLowerCase();
}

export function createAsteroidData(language, config, questions = []) {
  const prompt = populateAsteroid(language, questions);
  const width = 220;
  const height = 110;
  return {
    id: createAsteroidId(),
    language,
    fullCode: prompt.fullCode,
    targetText: prompt.targetText,
    normalizedTargetText: normalizeTargetText(prompt.targetText, config.gameplay),
    x: getRandomInt(140, config.screen.width - 140),
    y: -height,
    width,
    height,
    speed: config.gameplay.asteroidSpeed,
    destroyed: false,
    missed: false,
    phaserObjects: {
      container: null,
      body: null,
      text: null,
      highlight: null
    }
  };
}
