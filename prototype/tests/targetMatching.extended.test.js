import { describe, expect, test } from "vitest";
import {
  canSpawnTargetText,
  findUniqueCompletedMatch,
  getMatchingAsteroids,
  getPrefixMatchingAsteroids,
  isAmbiguousMatch,
  reduceBufferToActivePrefix
} from "../../prototype/src/typing/targetMatching.js";

const activeAsteroids = [
  { normalizedTargetText: "console" },
  { normalizedTargetText: "console.log" },
  { normalizedTargetText: "return" }
];

describe("targetMatching — extended", () => {

  // --- getMatchingAsteroids ---

  describe("getMatchingAsteroids", () => {
    test("returns empty array when no exact match", () => {
      expect(getMatchingAsteroids("con", activeAsteroids)).toHaveLength(0);
    });

    test("returns empty array for empty asteroid list", () => {
      expect(getMatchingAsteroids("console", [])).toHaveLength(0);
    });

    test("empty buffer does not match any asteroid", () => {
      expect(getMatchingAsteroids("", activeAsteroids)).toHaveLength(0);
    });

    test("returns correct asteroid for exact match", () => {
      const result = getMatchingAsteroids("return", activeAsteroids);
      expect(result).toHaveLength(1);
      expect(result[0].normalizedTargetText).toBe("return");
    });
  });

  // --- getPrefixMatchingAsteroids ---

  describe("getPrefixMatchingAsteroids", () => {
    test("empty buffer prefix-matches all asteroids", () => {
      // every string starts with ""
      expect(getPrefixMatchingAsteroids("", activeAsteroids)).toHaveLength(3);
    });

    test("partial prefix matches all that start with it", () => {
      expect(getPrefixMatchingAsteroids("con", activeAsteroids)).toHaveLength(2);
    });

    test("no match returns empty array", () => {
      expect(getPrefixMatchingAsteroids("xyz", activeAsteroids)).toHaveLength(0);
    });

    test("full exact string prefix-matches at least itself", () => {
      expect(getPrefixMatchingAsteroids("return", activeAsteroids)).toHaveLength(1);
    });

    test("returns empty array for empty asteroid list", () => {
      expect(getPrefixMatchingAsteroids("con", [])).toHaveLength(0);
    });
  });

  // --- isAmbiguousMatch ---

  describe("isAmbiguousMatch", () => {
    test("non-matching buffer is not ambiguous", () => {
      expect(isAmbiguousMatch("xyz", activeAsteroids)).toBe(false);
    });

    test("buffer matching only one asteroid with no longer prefix is not ambiguous", () => {
      // "return" matches exactly and nothing starts with "return" + more
      expect(isAmbiguousMatch("return", activeAsteroids)).toBe(false);
    });

    test("buffer with zero exact matches is not ambiguous", () => {
      // "con" has no exact match
      expect(isAmbiguousMatch("con", activeAsteroids)).toBe(false);
    });
  });

  // --- findUniqueCompletedMatch ---

  describe("findUniqueCompletedMatch", () => {
    test("returns null for no exact match", () => {
      expect(findUniqueCompletedMatch("xyz", activeAsteroids)).toBeNull();
    });

    test("returns null for ambiguous match (console vs console.log)", () => {
      expect(findUniqueCompletedMatch("console", activeAsteroids)).toBeNull();
    });

    test("returns the asteroid for an unambiguous exact match", () => {
      expect(findUniqueCompletedMatch("return", activeAsteroids)).toEqual({
        normalizedTargetText: "return"
      });
    });

    test("returns null for empty asteroid list", () => {
      expect(findUniqueCompletedMatch("return", [])).toBeNull();
    });

    test("returns null for empty buffer against any asteroids", () => {
      expect(findUniqueCompletedMatch("", activeAsteroids)).toBeNull();
    });
  });

  // --- canSpawnTargetText ---

  describe("canSpawnTargetText", () => {
    test("allows spawning text not in active list", () => {
      expect(canSpawnTargetText("const", activeAsteroids)).toBe(true);
      expect(canSpawnTargetText("let", activeAsteroids)).toBe(true);
    });

    test("blocks spawning text already in active list", () => {
      expect(canSpawnTargetText("console", activeAsteroids)).toBe(false);
      expect(canSpawnTargetText("return", activeAsteroids)).toBe(false);
    });

    test("always allows spawning into empty list", () => {
      expect(canSpawnTargetText("anything", [])).toBe(true);
    });

    test("empty string is allowed if no asteroid has empty normalizedTargetText", () => {
      expect(canSpawnTargetText("", activeAsteroids)).toBe(true);
    });
  });

  // --- reduceBufferToActivePrefix ---

  describe("reduceBufferToActivePrefix", () => {
    test("returns empty string when no prefix matches anywhere in buffer", () => {
      expect(reduceBufferToActivePrefix("xyz", activeAsteroids)).toBe("");
    });

    test("recovers from typo at the start", () => {
      expect(reduceBufferToActivePrefix("cconsole", activeAsteroids)).toBe("console");
    });

    test("recovers mid-word typo", () => {
      expect(reduceBufferToActivePrefix("rreturn", activeAsteroids)).toBe("return");
    });

    test("invalid trailing character returns empty string", () => {
      expect(reduceBufferToActivePrefix("consolex", activeAsteroids)).toBe("");
    });

    test("clean matching buffer returns itself", () => {
      expect(reduceBufferToActivePrefix("con", activeAsteroids)).toBe("con");
    });

    test("empty buffer with no asteroids returns empty string", () => {
      expect(reduceBufferToActivePrefix("", [])).toBe("");
    });
  });
});
