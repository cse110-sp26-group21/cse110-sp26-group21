import { describe, expect, test } from "vitest";
import {
  canSpawnTargetText,
  findUniqueCompletedMatch,
  getMatchingAsteroids,
  getPrefixMatchingAsteroids,
  isAmbiguousMatch,
  reduceBufferToActivePrefix
} from "../src/typing/targetMatching.js";

const activeAsteroids = [
  { normalizedTargetText: "console" },
  { normalizedTargetText: "console.log" },
  { normalizedTargetText: "return" }
];

describe("targetMatching", () => {
  test("exact and prefix matching work", () => {
    expect(getMatchingAsteroids("console", activeAsteroids)).toHaveLength(1);
    expect(getPrefixMatchingAsteroids("console", activeAsteroids)).toHaveLength(2);
  });

  test("ambiguous prefix waits for more input", () => {
    expect(isAmbiguousMatch("console", activeAsteroids)).toBe(true);
    expect(findUniqueCompletedMatch("console", activeAsteroids)).toBe(null);
  });

  test("unique completed match is found", () => {
    expect(findUniqueCompletedMatch("return", activeAsteroids)).toEqual({
      normalizedTargetText: "return"
    });
  });

  test("duplicate active target text is rejected", () => {
    expect(canSpawnTargetText("console", activeAsteroids)).toBe(false);
    expect(canSpawnTargetText("const", activeAsteroids)).toBe(true);
  });

  test("buffer reduces to the longest valid active prefix", () => {
    expect(reduceBufferToActivePrefix("cconsole", activeAsteroids)).toBe("console");
    expect(reduceBufferToActivePrefix("consolex", activeAsteroids)).toBe("");
    expect(reduceBufferToActivePrefix("rreturn", activeAsteroids)).toBe("return");
  });
});
