import { chooseRandomItem } from "../utils/random.js";

export function getFallbackQuestion() {
  return {
    fullCode: "a",
    targetText: "a"
  };
}

export async function loadQuestions() {
  try {
    const response = await fetch("./src/questions/questions.json");
    if (!response.ok) {
      return [getFallbackQuestion()];
    }
    return await response.json();
  } catch {
    return [getFallbackQuestion()];
  }
}

export function filterQuestionsByLanguage(questions, language) {
  return questions.filter((question) => question.language === language);
}

export function chooseRandomQuestion(questions) {
  return chooseRandomItem(questions);
}

export function populateAsteroid(language, questions = []) {
  const matchingQuestions = filterQuestionsByLanguage(questions, language);
  return chooseRandomQuestion(matchingQuestions) ?? getFallbackQuestion();
}
