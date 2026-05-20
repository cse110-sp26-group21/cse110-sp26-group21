export function normalizeTypedInput(input, options) {
  return options.caseSensitive ? input : input.toLowerCase();
}

export function isSupportedTypingKey(key) {
  return key === "Backspace" || key === " " || (key.length === 1 && key !== "Tab");
}

export function updateTypedBuffer(currentBuffer, key, options) {
  if (!isSupportedTypingKey(key)) {
    return currentBuffer;
  }
  if (key === "Backspace") {
    return currentBuffer.slice(0, -1);
  }
  return normalizeTypedInput(`${currentBuffer}${key}`, options);
}

export function clearTypedBuffer(gameState) {
  gameState.typedBuffer = "";
  return gameState;
}

export function handleKeyPress(key, gameState, config) {
  gameState.typedBuffer = updateTypedBuffer(gameState.typedBuffer, key, config.gameplay);
  return gameState.typedBuffer;
}
