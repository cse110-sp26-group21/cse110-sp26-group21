import { describe, expect, test } from "vitest";
import {
  chooseRandomQuestion,
  filterQuestionsByLanguage,
  getFallbackQuestion,
  populateAsteroid
} from "../src/questions/questionBank.js";

const questions = [
  { language: "HTML", fullCode: "<h1>Hello</h1>", targetText: "h1" },
  { language: "JavaScript", fullCode: "console.log('hi')", targetText: "console.log" }
];

describe("questionBank", () => {
  test("questions filter by language", () => {
    expect(filterQuestionsByLanguage(questions, "HTML")).toEqual([questions[0]]);
  });

  test("random question returns an item from the list", () => {
    expect(questions).toContain(chooseRandomQuestion(questions));
  });

  test("empty question lists return the fallback", () => {
    expect(populateAsteroid("CSS", questions)).toEqual(getFallbackQuestion());
  });
});
