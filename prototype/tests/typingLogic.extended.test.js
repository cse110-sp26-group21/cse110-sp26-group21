import { describe, expect, test } from "vitest";
import {
  clearTypedBuffer,
  handleKeyPress,
  isSupportedTypingKey,
  normalizeTypedInput,
  updateTypedBuffer
} from "../../prototype/src/typing/typingLogic.js";
import { GAME_CONFIG } from "../../prototype/src/config.js";

describe("typingLogic — extended", () => {

  // --- isSupportedTypingKey ---

  describe("isSupportedTypingKey", () => {
    test("accepts single printable characters", () => {
      expect(isSupportedTypingKey("a")).toBe(true);
      expect(isSupportedTypingKey("Z")).toBe(true);
      expect(isSupportedTypingKey("5")).toBe(true);
      expect(isSupportedTypingKey(".")).toBe(true);
    });

    test("accepts Backspace", () => {
      expect(isSupportedTypingKey("Backspace")).toBe(true);
    });

    test("accepts space", () => {
      expect(isSupportedTypingKey(" ")).toBe(true);
    });

    test("rejects Tab", () => {
      expect(isSupportedTypingKey("Tab")).toBe(false);
    });

    test("rejects arrow keys", () => {
      expect(isSupportedTypingKey("ArrowLeft")).toBe(false);
      expect(isSupportedTypingKey("ArrowRight")).toBe(false);
      expect(isSupportedTypingKey("ArrowUp")).toBe(false);
      expect(isSupportedTypingKey("ArrowDown")).toBe(false);
    });

    test("rejects Enter, Shift, Control, Alt", () => {
      expect(isSupportedTypingKey("Enter")).toBe(false);
      expect(isSupportedTypingKey("Shift")).toBe(false);
      expect(isSupportedTypingKey("Control")).toBe(false);
      expect(isSupportedTypingKey("Alt")).toBe(false);
    });
  });

  // --- updateTypedBuffer ---

  describe("updateTypedBuffer", () => {
    const opts = { caseSensitive: false };
    const optsCS = { caseSensitive: true };

    test("backspace on empty buffer stays empty", () => {
      expect(updateTypedBuffer("", "Backspace", opts)).toBe("");
    });

    test("backspace removes exactly one character", () => {
      expect(updateTypedBuffer("abc", "Backspace", opts)).toBe("ab");
    });

    test("Tab is ignored and buffer is unchanged", () => {
      expect(updateTypedBuffer("abc", "Tab", opts)).toBe("abc");
    });

    test("space appended and lowercased (caseSensitive=false)", () => {
      expect(updateTypedBuffer("abc", " ", opts)).toBe("abc ");
    });

    test("uppercase letter lowercased when caseSensitive=false", () => {
      expect(updateTypedBuffer("", "A", opts)).toBe("a");
    });

    test("uppercase letter preserved when caseSensitive=true", () => {
      expect(updateTypedBuffer("", "A", optsCS)).toBe("A");
    });

    test("building a multi-char buffer step by step", () => {
      let buf = "";
      for (const ch of "hello") {
        buf = updateTypedBuffer(buf, ch, opts);
      }
      expect(buf).toBe("hello");
    });
  });

  // --- normalizeTypedInput ---

  describe("normalizeTypedInput", () => {
    test("lowercases full string when caseSensitive=false", () => {
      expect(normalizeTypedInput("ABC.LOG()", { caseSensitive: false })).toBe("abc.log()");
    });

    test("preserves mixed case when caseSensitive=true", () => {
      expect(normalizeTypedInput("ABC.LOG()", { caseSensitive: true })).toBe("ABC.LOG()");
    });

    test("empty string is safe", () => {
      expect(normalizeTypedInput("", { caseSensitive: false })).toBe("");
    });
  });

  // --- clearTypedBuffer ---

  describe("clearTypedBuffer", () => {
    test("clears a non-empty buffer", () => {
      const state = { typedBuffer: "console.log" };
      clearTypedBuffer(state);
      expect(state.typedBuffer).toBe("");
    });

    test("clearing an already-empty buffer is safe", () => {
      const state = { typedBuffer: "" };
      clearTypedBuffer(state);
      expect(state.typedBuffer).toBe("");
    });

    test("returns the modified gameState", () => {
      const state = { typedBuffer: "abc" };
      const result = clearTypedBuffer(state);
      expect(result).toBe(state);
    });
  });

  // --- handleKeyPress ---

  describe("handleKeyPress", () => {
    test("appends a character to typedBuffer", () => {
      const state = { typedBuffer: "" };
      handleKeyPress("c", state, GAME_CONFIG);
      expect(state.typedBuffer).toBe("c");
    });

    test("backspace removes last character from typedBuffer", () => {
      const state = { typedBuffer: "abc" };
      handleKeyPress("Backspace", state, GAME_CONFIG);
      expect(state.typedBuffer).toBe("ab");
    });

    test("unsupported key does not change typedBuffer", () => {
      const state = { typedBuffer: "abc" };
      handleKeyPress("ArrowLeft", state, GAME_CONFIG);
      expect(state.typedBuffer).toBe("abc");
    });

    test("returns the new buffer string", () => {
      const state = { typedBuffer: "con" };
      const result = handleKeyPress("s", state, GAME_CONFIG);
      expect(result).toBe("cons");
    });

    test("respects caseSensitive=false from config", () => {
      // GAME_CONFIG.gameplay.caseSensitive is false
      const state = { typedBuffer: "" };
      handleKeyPress("C", state, GAME_CONFIG);
      expect(state.typedBuffer).toBe("c");
    });
  });
});
