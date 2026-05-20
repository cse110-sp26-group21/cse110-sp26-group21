import { describe, expect, test } from "vitest";
import {
  clearTypedBuffer,
  isSupportedTypingKey,
  normalizeTypedInput,
  updateTypedBuffer
} from "../src/typing/typingLogic.js";

describe("typingLogic", () => {
  test("typing appends characters and spaces", () => {
    const options = { caseSensitive: false };
    expect(updateTypedBuffer("", "A", options)).toBe("a");
    expect(updateTypedBuffer("a", " ", options)).toBe("a ");
  });

  test("backspace removes one character", () => {
    expect(updateTypedBuffer("ab", "Backspace", { caseSensitive: false })).toBe("a");
  });

  test("unsupported keys are ignored", () => {
    expect(isSupportedTypingKey("ArrowLeft")).toBe(false);
    expect(updateTypedBuffer("a", "ArrowLeft", { caseSensitive: false })).toBe("a");
  });

  test("normalization respects case sensitivity", () => {
    expect(normalizeTypedInput("Ab", { caseSensitive: false })).toBe("ab");
    expect(normalizeTypedInput("Ab", { caseSensitive: true })).toBe("Ab");
  });

  test("buffer can be cleared", () => {
    const gameState = { typedBuffer: "abc" };
    clearTypedBuffer(gameState);
    expect(gameState.typedBuffer).toBe("");
  });
});
